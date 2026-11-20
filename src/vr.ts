// VR dress-up (WebXR): the fitting room's main act, per mi's
// direction — "VRできせかえできるのが主". The user stands in
// the room in front of the life-size person on the podium and
// points a controller ray at the dress-up panel beside the
// clothing rack: pick a garment, a color, a pose, a saved look,
// and the person changes on the spot. The flat screen remains
// the companion experience; everything the panel offers is the
// same state the flat UI edits (one Outfit, one sanitize gate).
//
// This module is split in three layers:
//  - pure logic (categories from the outfit catalogs, action
//    ids, outfit patches, snap-turn math) — unit-tested without
//    a renderer;
//  - the 3D panel (canvas-textured buttons on a fixed board);
//  - the controller rig (rays, select events, thumbstick snap
//    turn), wired to a host interface main.ts implements.
// The person being dressed is always the app's current outfit,
// which only ever reaches the stage through update()'s
// sanitize gate in main.ts — VR adds no state path of its own.

import * as THREE from 'three';
import { t, type I18nKey } from './i18n';
import {
  ACCESSORIES,
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  GLASSES,
  HATS,
  OUTER_COLORS,
  OUTER_STYLES,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  type Outfit,
} from './outfit';

// ----------------------------------------------------------------
// Pure logic: categories, actions, patches, snap turn
// ----------------------------------------------------------------

/** One dress-up category on the panel: a row of item chips and,
 *  for the categories that have them, a row of color swatches.
 *  Built from the outfit catalogs (outfit.ts) — when a category
 *  or an option joins the catalogs, it joins the panel with no
 *  panel changes. */
export interface VrCategory {
  id: string;
  /** Which panel page the category lives on (0 = clothes,
   *  1 = extras & pose). */
  page: 0 | 1;
  labelKey: I18nKey;
  /** The outfit field the item chips set. */
  field: 'topStyle' | 'outerStyle' | 'bottomStyle' | 'shoeStyle' | 'hat' | 'glasses' | 'accessory' | 'pose';
  /** i18n prefix for item labels (`top.tee`, `bottom.skirt`…);
   *  the value 'none' always reads through 'item.none'. */
  itemPrefix: string;
  items: readonly string[];
  colorField?: 'topColor' | 'outerColor' | 'bottomColor' | 'shoeColor';
  colors?: readonly string[];
}

export function buildVrCategories(): VrCategory[] {
  return [
    {
      id: 'tops', page: 0, labelKey: 'cat.tops', field: 'topStyle', itemPrefix: 'top',
      items: TOP_STYLES, colorField: 'topColor', colors: TOP_COLORS,
    },
    {
      id: 'outer', page: 0, labelKey: 'cat.outer', field: 'outerStyle', itemPrefix: 'outer',
      items: OUTER_STYLES, colorField: 'outerColor', colors: OUTER_COLORS,
    },
    {
      id: 'bottoms', page: 0, labelKey: 'cat.bottoms', field: 'bottomStyle', itemPrefix: 'bottom',
      items: BOTTOM_STYLES, colorField: 'bottomColor', colors: BOTTOM_COLORS,
    },
    {
      id: 'shoes', page: 0, labelKey: 'cat.shoes', field: 'shoeStyle', itemPrefix: 'shoe',
      items: SHOE_STYLES, colorField: 'shoeColor', colors: SHOE_COLORS,
    },
    { id: 'hat', page: 1, labelKey: 'cat.hat', field: 'hat', itemPrefix: 'hat', items: HATS },
    {
      id: 'glasses', page: 1, labelKey: 'cat.glasses', field: 'glasses',
      itemPrefix: 'glasses', items: GLASSES,
    },
    {
      id: 'accessory', page: 1, labelKey: 'cat.accessory', field: 'accessory',
      itemPrefix: 'accessory', items: ACCESSORIES,
    },
    { id: 'pose', page: 1, labelKey: 'cat.pose', field: 'pose', itemPrefix: 'pose', items: POSES },
  ];
}

export function vrItemLabelKey(category: VrCategory, value: string): I18nKey {
  return (value === 'none' ? 'item.none' : `${category.itemPrefix}.${value}`) as I18nKey;
}

/** Everything a panel press can mean. Field/color actions turn
 *  into an outfit patch; the rest are host-level intents. */
export type VrAction =
  | { type: 'field'; field: VrCategory['field']; value: string }
  | { type: 'color'; field: 'topColor' | 'outerColor' | 'bottomColor' | 'shoeColor'; value: string }
  | { type: 'look'; id: string }
  | { type: 'photo' }
  | { type: 'turn'; dir: 1 | -1 }
  | { type: 'page'; page: 0 | 1 };

/** Serialize an action into the id carried by a panel button.
 *  The encoding is deliberately plain (`f:topStyle:dress`) so
 *  headless verification can press buttons by name. */
export function vrActionId(action: VrAction): string {
  switch (action.type) {
    case 'field':
      return `f:${action.field}:${action.value}`;
    case 'color':
      return `c:${action.field}:${action.value}`;
    case 'look':
      return `look:${action.id}`;
    case 'photo':
      return 'photo';
    case 'turn':
      return `turn:${action.dir}`;
    case 'page':
      return `page:${action.page}`;
  }
}

const FIELD_NAMES: ReadonlySet<string> = new Set([
  'topStyle', 'outerStyle', 'bottomStyle', 'shoeStyle', 'hat', 'glasses', 'accessory', 'pose',
]);
const COLOR_FIELD_NAMES: ReadonlySet<string> = new Set(['topColor', 'outerColor', 'bottomColor', 'shoeColor']);

/** Parse a panel button id back into an action. Syntax only —
 *  whether the value is a real catalog entry is decided by
 *  outfitPatchForAction / the host, so a stale or hand-made id
 *  degrades to a no-op rather than a bad state. */
export function parseVrActionId(id: string): VrAction | null {
  if (id === 'photo') return { type: 'photo' };
  if (id.startsWith('look:')) {
    const lookId = id.slice('look:'.length);
    return lookId ? { type: 'look', id: lookId } : null;
  }
  if (id === 'turn:1') return { type: 'turn', dir: 1 };
  if (id === 'turn:-1') return { type: 'turn', dir: -1 };
  if (id === 'page:0') return { type: 'page', page: 0 };
  if (id === 'page:1') return { type: 'page', page: 1 };
  const parts = id.split(':');
  if (parts.length === 3 && parts[0] === 'f' && FIELD_NAMES.has(parts[1])) {
    return { type: 'field', field: parts[1] as VrCategory['field'], value: parts[2] };
  }
  if (parts.length === 3 && parts[0] === 'c' && COLOR_FIELD_NAMES.has(parts[1])) {
    return {
      type: 'color',
      field: parts[1] as 'topColor' | 'outerColor' | 'bottomColor' | 'shoeColor',
      value: parts[2],
    };
  }
  return null;
}

/** The outfit patch a field/color action asks for, validated
 *  against the catalogs: an action naming a value outside its
 *  category (or a host-level action) yields null. The patch is
 *  still only ever applied through the host's update path, so
 *  the sanitize gate sees it like any other edit. */
export function outfitPatchForAction(action: VrAction, categories: VrCategory[]): Partial<Outfit> | null {
  if (action.type === 'field') {
    const category = categories.find((c) => c.field === action.field);
    if (!category || !category.items.includes(action.value)) return null;
    return { [action.field]: action.value } as Partial<Outfit>;
  }
  if (action.type === 'color') {
    const category = categories.find((c) => c.colorField === action.field);
    if (!category || !category.colors || !category.colors.includes(action.value)) return null;
    return { [action.field]: action.value } as Partial<Outfit>;
  }
  return null;
}

/** Snap turn: one press rotates the viewpoint 45° around the
 *  podium, so a user in a small play space can walk the view
 *  around the person (front → side → back) without walking.
 *  The position orbits the pivot by the same angle the yaw
 *  gains, which keeps the person centered in view. */
export const SNAP_TURN_RADIANS = Math.PI / 4;

export interface TurnTransform {
  x: number;
  z: number;
  yaw: number;
}

export function snapTurnTransform(
  cur: TurnTransform,
  dir: 1 | -1,
  pivot: { x: number; z: number } = { x: 0, z: 0 },
): TurnTransform {
  const angle = dir * SNAP_TURN_RADIANS;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = cur.x - pivot.x;
  const dz = cur.z - pivot.z;
  // three.js rotation about +Y: x' = x·cos + z·sin,
  // z' = −x·sin + z·cos. The viewpoint position takes the same
  // rotation as the yaw, around the podium.
  return {
    x: pivot.x + dx * cos + dz * sin,
    z: pivot.z - dx * sin + dz * cos,
    yaw: cur.yaw + angle,
  };
}

// ----------------------------------------------------------------
// XR quality ladder (WORLD-CLASS.md M2): the static reductions
// (pixel ratio 1 on session start, the mirror at XR size, fixed
// foveation) are the floor; this is the dynamic part. While
// presenting, the stage feeds windowed average frame times in;
// sustained over-budget windows step quality down — mirror
// resolution, mirror off, foveation up, shadows off, in the
// order WORLD-CLASS prescribes — before the frame rate breaks,
// and sustained headroom steps back up. The band between the
// two thresholds is a hold zone, so the level cannot oscillate
// around a single boundary.
// ----------------------------------------------------------------

export interface XrQualityStep {
  /** Mirror reflection resolution in px; null = mirror off. */
  mirrorPx: number | null;
  /** Fixed foveation (0..1; higher trims more of the periphery). */
  foveation: number;
  /** Whether the key light casts shadows. */
  shadows: boolean;
}

export const XR_QUALITY_STEPS: readonly XrQualityStep[] = [
  // Step 0 is the session-start state; its mirror size is
  // scene.ts's MIRROR_XR_PX (the two must agree).
  { mirrorPx: 512, foveation: 0.5, shadows: true },
  { mirrorPx: 256, foveation: 0.5, shadows: true },
  { mirrorPx: null, foveation: 0.65, shadows: true },
  { mirrorPx: null, foveation: 0.85, shadows: false },
];

/** The frame budget the ladder defends: 72 Hz, the Quest 2
 *  baseline frame rate (WORLD-CLASS.md M1). */
export const XR_FRAME_BUDGET_MS = 1000 / 72;
/** Quality is restored only with real headroom, not at the edge. */
export const XR_RECOVER_MS = XR_FRAME_BUDGET_MS * 0.62;

/** One ladder decision from a windowed average frame time. */
export function nextXrQualityLevel(current: number, avgFrameMs: number): number {
  const clamped = Math.min(Math.max(current, 0), XR_QUALITY_STEPS.length - 1);
  if (avgFrameMs > XR_FRAME_BUDGET_MS) {
    return Math.min(clamped + 1, XR_QUALITY_STEPS.length - 1);
  }
  if (avgFrameMs < XR_RECOVER_MS) {
    return Math.max(clamped - 1, 0);
  }
  return clamped;
}

// ----------------------------------------------------------------
// The panel: a fixed board beside the clothing rack
// ----------------------------------------------------------------

/** Where the panel stands: beside the clothing rack (which sits
 *  at (-2.35, 0, -1.15)), within reach of a ray from the spawn
 *  point in front of the podium, angled to face that spawn. It
 *  never follows the user's head — it is furniture. */
export const VR_PANEL_POSITION = new THREE.Vector3(-1.62, 1.34, -0.5);
export const VR_PANEL_FACE_TARGET = new THREE.Vector3(0, 1.3, 2.2);
export const VR_PANEL_WIDTH = 1.06;
/** Board height: sized so the clothes page fits every wardrobe
 *  category (tops / outer / bottoms / shoes, each with its color
 *  row) above the saved-looks shelf — the outer category joined
 *  at the re-centering integration (DESIGN.md §21/§22.8) and
 *  the stack outgrew the original 1.5 m board. */
export const VR_PANEL_HEIGHT = 1.85;
/** How many saved looks the panel lists (the shelf's first
 *  entries — the store itself keeps more). */
export const VR_LOOKS_SHOWN = 6;

export interface VrLookEntry {
  id: string;
  name: string;
}

export interface VrPanelState {
  outfit: Outfit;
  looks: VrLookEntry[];
  page: 0 | 1;
}

const PANEL_INNER_WIDTH = VR_PANEL_WIDTH - 0.12;
const CHIP_HEIGHT = 0.105;
const CHIP_GAP = 0.02;
const LABEL_HEIGHT = 0.052;
const SWATCH_HEIGHT = 0.062;
const ROW_GAP = 0.022;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A canvas texture for one button: label text shrunk to fit,
 *  brass when selected, dark walnut otherwise. Drawn with
 *  device fonts only — no font assets ship with the app. */
function buttonTexture(label: string, selected: boolean, wide: boolean): THREE.CanvasTexture {
  const cw = wide ? 1024 : 512;
  const ch = 128;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  ctx.fillStyle = selected ? '#b08d57' : '#38302a';
  roundedRect(ctx, 3, 3, cw - 6, ch - 6, 26);
  ctx.fill();
  ctx.strokeStyle = selected ? '#e8cf9f' : '#6d5c44';
  ctx.lineWidth = 3;
  roundedRect(ctx, 3, 3, cw - 6, ch - 6, 26);
  ctx.stroke();
  ctx.fillStyle = selected ? '#221a12' : '#f2e9da';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let size = 52;
  const font = (s: number) => `600 ${s}px "Hiragino Sans", "Noto Sans JP", sans-serif`;
  ctx.font = font(size);
  while (size > 22 && ctx.measureText(label).width > cw - 44) {
    size -= 4;
    ctx.font = font(size);
  }
  ctx.fillText(label, cw / 2, ch / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function labelTexture(text: string): THREE.CanvasTexture {
  const cw = 1024;
  const ch = 56;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  ctx.fillStyle = '#e9dfc9';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  let size = 38;
  const font = (s: number) => `600 ${s}px "Hiragino Sans", "Noto Sans JP", sans-serif`;
  ctx.font = font(size);
  while (size > 20 && ctx.measureText(text).width > cw - 16) {
    size -= 3;
    ctx.font = font(size);
  }
  ctx.fillText(text, 4, ch / 2 + 1);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export class VrPanel {
  readonly group = new THREE.Group();
  private content = new THREE.Group();
  private hitMeshes: THREE.Object3D[] = [];
  private hovered: THREE.Object3D | null = null;
  private readonly categories = buildVrCategories();

  constructor() {
    this.group.position.copy(VR_PANEL_POSITION);
    this.group.lookAt(VR_PANEL_FACE_TARGET);
    // The board itself: a dark walnut slab with a brass edge,
    // in the room's materials language (scene.ts props).
    const backing = new THREE.Mesh(
      new THREE.BoxGeometry(VR_PANEL_WIDTH, VR_PANEL_HEIGHT, 0.035),
      new THREE.MeshStandardMaterial({ color: '#2c241d', roughness: 0.6, envMapIntensity: 0.4 }),
    );
    backing.position.z = -0.02;
    this.group.add(backing);
    const frameMat = new THREE.MeshStandardMaterial({
      color: '#b08d57', roughness: 0.3, metalness: 1, envMapIntensity: 1.2,
    });
    const frameGeoH = new THREE.BoxGeometry(VR_PANEL_WIDTH + 0.03, 0.028, 0.045);
    const frameGeoV = new THREE.BoxGeometry(0.028, VR_PANEL_HEIGHT + 0.03, 0.045);
    for (const sy of [-1, 1]) {
      const bar = new THREE.Mesh(frameGeoH, frameMat);
      bar.position.set(0, sy * (VR_PANEL_HEIGHT / 2 + 0.008), -0.02);
      this.group.add(bar);
    }
    for (const sx of [-1, 1]) {
      const bar = new THREE.Mesh(frameGeoV, frameMat);
      bar.position.set(sx * (VR_PANEL_WIDTH / 2 + 0.008), 0, -0.02);
      this.group.add(bar);
    }
    this.group.add(this.content);
  }

  /** Objects a controller ray can press, in scene order. */
  get targets(): readonly THREE.Object3D[] {
    return this.hitMeshes;
  }

  private addButton(
    label: string,
    selected: boolean,
    actionId: string,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const tex = buttonTexture(label, selected, w > 0.4);
    const mat = new THREE.MeshBasicMaterial({ map: tex });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(x, y, 0.012);
    mesh.userData.actionId = actionId;
    mesh.userData.baseScale = 1;
    this.content.add(mesh);
    this.hitMeshes.push(mesh);
  }

  private addLabel(text: string, x: number, y: number, w: number): void {
    const tex = labelTexture(text);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, LABEL_HEIGHT), mat);
    mesh.position.set(x, y, 0.01);
    this.content.add(mesh);
  }

  private addSwatch(hex: string, selected: boolean, actionId: string, x: number, y: number, w: number): void {
    if (selected) {
      const frame = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.014, SWATCH_HEIGHT + 0.014),
        new THREE.MeshBasicMaterial({ color: '#e8cf9f' }),
      );
      frame.position.set(x, y, 0.011);
      this.content.add(frame);
    }
    const mat = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.55, envMapIntensity: 0.5 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, SWATCH_HEIGHT), mat);
    mesh.position.set(x, y, 0.012);
    mesh.userData.actionId = actionId;
    mesh.userData.baseScale = 1;
    this.content.add(mesh);
    this.hitMeshes.push(mesh);
  }

  /** Rebuild the board's buttons from the current state. Called
   *  whenever the outfit, the looks, the page or the language
   *  changes — presses are discrete events, so a rebuild per
   *  change is cheap and keeps exactly one source of truth. */
  refresh(state: VrPanelState): void {
    for (const child of [...this.content.children]) {
      this.content.remove(child);
      child.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.MeshBasicMaterial | undefined;
        if (mat) {
          mat.map?.dispose();
          mat.dispose();
        }
      });
    }
    this.hitMeshes = [];
    this.hovered = null;

    const { outfit, page } = state;
    let cursorY = VR_PANEL_HEIGHT / 2 - 0.075; // top inner edge (row centers walk down)

    // Title + page tabs.
    this.addLabel(t('vr.panelTitle'), -PANEL_INNER_WIDTH / 2 + 0.47, cursorY, 0.94);
    cursorY -= 0.075;
    const tabW = (PANEL_INNER_WIDTH - CHIP_GAP) / 2;
    const pages: Array<{ page: 0 | 1; key: I18nKey }> = [
      { page: 0, key: 'vr.pageClothes' },
      { page: 1, key: 'vr.pageExtras' },
    ];
    pages.forEach((p, i) => {
      const x = -PANEL_INNER_WIDTH / 2 + tabW / 2 + i * (tabW + CHIP_GAP);
      this.addButton(t(p.key), page === p.page, vrActionId({ type: 'page', page: p.page }), x, cursorY, tabW, 0.085);
    });
    cursorY -= 0.085 / 2 + ROW_GAP + 0.03;

    const chipRow = (labels: Array<{ label: string; selected: boolean; actionId: string }>, y: number): void => {
      const n = labels.length;
      const w = (PANEL_INNER_WIDTH - (n - 1) * CHIP_GAP) / n;
      labels.forEach((item, i) => {
        const x = -PANEL_INNER_WIDTH / 2 + w / 2 + i * (w + CHIP_GAP);
        this.addButton(item.label, item.selected, item.actionId, x, y, w, CHIP_HEIGHT);
      });
    };

    for (const category of this.categories) {
      if (category.page !== page) continue;
      cursorY -= LABEL_HEIGHT / 2;
      this.addLabel(t(category.labelKey), -PANEL_INNER_WIDTH / 2 + 0.47, cursorY, 0.94);
      cursorY -= LABEL_HEIGHT / 2 + 0.012 + CHIP_HEIGHT / 2;
      chipRow(
        category.items.map((value) => ({
          label: t(vrItemLabelKey(category, value)),
          selected: outfit[category.field] === value,
          actionId: vrActionId({ type: 'field', field: category.field, value }),
        })),
        cursorY,
      );
      cursorY -= CHIP_HEIGHT / 2;
      if (category.colors && category.colorField) {
        const colorField = category.colorField;
        cursorY -= 0.012 + SWATCH_HEIGHT / 2;
        const n = category.colors.length;
        const w = (PANEL_INNER_WIDTH - (n - 1) * 0.012) / n;
        category.colors.forEach((hex, i) => {
          const x = -PANEL_INNER_WIDTH / 2 + w / 2 + i * (w + 0.012);
          this.addSwatch(
            hex,
            outfit[colorField] === hex,
            vrActionId({ type: 'color', field: colorField, value: hex }),
            x,
            cursorY,
            w,
          );
        });
        cursorY -= SWATCH_HEIGHT / 2;
      }
      cursorY -= ROW_GAP + 0.012;
    }

    if (page === 0) {
      // Saved looks: the fitting room's other rail. Pressing one
      // re-dresses the person in that look in one action.
      cursorY -= LABEL_HEIGHT / 2;
      this.addLabel(t('vr.looks'), -PANEL_INNER_WIDTH / 2 + 0.47, cursorY, 0.94);
      cursorY -= LABEL_HEIGHT / 2 + 0.012;
      const looks = state.looks.slice(0, VR_LOOKS_SHOWN);
      if (looks.length === 0) {
        cursorY -= 0.03;
        this.addLabel(t('vr.noLooks'), -PANEL_INNER_WIDTH / 2 + 0.47, cursorY, 0.94);
        cursorY -= 0.03;
      } else {
        for (let rowStart = 0; rowStart < looks.length; rowStart += 2) {
          cursorY -= CHIP_HEIGHT / 2;
          chipRow(
            looks.slice(rowStart, rowStart + 2).map((look) => ({
              label: look.name,
              selected: false,
              actionId: vrActionId({ type: 'look', id: look.id }),
            })),
            cursorY,
          );
          cursorY -= CHIP_HEIGHT / 2 + ROW_GAP;
        }
      }
    } else {
      // Actions: the share-card photo and the snap-turn buttons
      // (the thumbstick also turns; the buttons are the
      // discoverable, testable path).
      cursorY -= 0.01 + CHIP_HEIGHT / 2;
      chipRow(
        [{ label: t('ui.savePhoto'), selected: false, actionId: vrActionId({ type: 'photo' }) }],
        cursorY,
      );
      cursorY -= CHIP_HEIGHT / 2 + ROW_GAP + CHIP_HEIGHT / 2;
      chipRow(
        [
          { label: t('vr.turnLeft'), selected: false, actionId: vrActionId({ type: 'turn', dir: -1 }) },
          { label: t('vr.turnRight'), selected: false, actionId: vrActionId({ type: 'turn', dir: 1 }) },
        ],
        cursorY,
      );
      cursorY -= CHIP_HEIGHT / 2 + ROW_GAP + 0.03;
      this.addLabel(t('vr.hint'), -PANEL_INNER_WIDTH / 2 + 0.47, cursorY, 0.94);
    }
  }

  /** Tint/scale the hovered button (called per frame from the
   *  rig's raycasts). Pass null when nothing is hovered. */
  setHovered(target: THREE.Object3D | null): void {
    if (this.hovered === target) return;
    if (this.hovered) {
      const prev = this.hovered as THREE.Mesh;
      prev.scale.setScalar((prev.userData.baseScale as number) ?? 1);
      const mat = prev.material as THREE.MeshBasicMaterial;
      if (mat && 'color' in mat) mat.color.setRGB(1, 1, 1);
    }
    this.hovered = target;
    if (this.hovered) {
      const mesh = this.hovered as THREE.Mesh;
      mesh.scale.setScalar(1.06);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat && 'color' in mat) mat.color.setRGB(1.3, 1.18, 0.95);
    }
  }
}

// ----------------------------------------------------------------
// The controller rig: rays, select, thumbstick snap turn
// ----------------------------------------------------------------

export interface VrHost {
  getOutfit(): Outfit;
  /** Apply an outfit patch through the app's one update path
   *  (sanitize gate included). */
  applyPatch(patch: Partial<Outfit>): void;
  getLooks(): VrLookEntry[];
  applyLook(id: string): void;
  takePhoto(): void;
}

export interface VrRig {
  panel: VrPanel;
  /** Run one action through the same dispatch a controller
   *  select uses (verification presses buttons through here). */
  press(actionId: string): boolean;
  /** Rebuild the panel from the host's current state. */
  refreshPanel(): void;
  /** Per-frame work while presenting: hover raycast and
   *  thumbstick snap turn. A no-op on the flat screen. */
  update(): void;
  /** The action most recently dispatched (for verification). */
  readonly lastAction: VrAction | null;
}

interface StageLike {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  player: THREE.Group;
}

const SNAP_COOLDOWN_MS = 300;
const STICK_DEADZONE = 0.35;
const STICK_TRIGGER = 0.7;

export function createVrRig(stage: StageLike, host: VrHost): VrRig {
  const panel = new VrPanel();
  stage.scene.add(panel.group);

  const categories = buildVrCategories();
  let page: 0 | 1 = 0;
  let lastAction: VrAction | null = null;

  const raycaster = new THREE.Raycaster();
  const rayOrigin = new THREE.Vector3();
  const rayDir = new THREE.Vector3();
  const rotMatrix = new THREE.Matrix4();

  function refreshPanel(): void {
    panel.refresh({ outfit: host.getOutfit(), looks: host.getLooks(), page });
  }

  function dispatch(action: VrAction): void {
    lastAction = action;
    switch (action.type) {
      case 'field':
      case 'color': {
        const patch = outfitPatchForAction(action, categories);
        if (patch) host.applyPatch(patch);
        break;
      }
      case 'look':
        host.applyLook(action.id);
        break;
      case 'photo':
        host.takePhoto();
        break;
      case 'turn': {
        const player = stage.player;
        const next = snapTurnTransform(
          { x: player.position.x, z: player.position.z, yaw: player.rotation.y },
          action.dir,
        );
        player.position.x = next.x;
        player.position.z = next.z;
        player.rotation.y = next.yaw;
        break;
      }
      case 'page':
        page = action.page;
        break;
    }
    refreshPanel();
  }

  function press(actionId: string): boolean {
    const action = parseVrActionId(actionId);
    if (!action) return false;
    dispatch(action);
    return true;
  }

  /** Raycast one controller against the panel; returns the hit
   *  button (and where the ray landed) or null. */
  function castFrom(source: THREE.Object3D): { target: THREE.Object3D; point: THREE.Vector3 } | null {
    rotMatrix.identity().extractRotation(source.matrixWorld);
    rayOrigin.setFromMatrixPosition(source.matrixWorld);
    rayDir.set(0, 0, -1).applyMatrix4(rotMatrix);
    raycaster.set(rayOrigin, rayDir);
    const hits = raycaster.intersectObjects(panel.targets as THREE.Object3D[], false);
    if (hits.length === 0) return null;
    return { target: hits[0].object, point: hits[0].point };
  }

  // Controllers: a brass-tipped ray each, parented to the
  // player rig so their poses compose with the dolly transform
  // (the same space the camera lives in).
  const controllers: THREE.Object3D[] = [];
  const hitDots: THREE.Mesh[] = [];
  for (let i = 0; i < 2; i++) {
    const controller = stage.renderer.xr.getController(i);
    const rayGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -5),
    ]);
    const ray = new THREE.Line(
      rayGeo,
      new THREE.LineBasicMaterial({ color: 0xe8cf9f, transparent: true, opacity: 0.55 }),
    );
    ray.name = 'vr-ray';
    controller.add(ray);
    controller.addEventListener('select', () => {
      const hit = castFrom(controller);
      if (hit) {
        const actionId = hit.target.userData.actionId as string | undefined;
        if (actionId) press(actionId);
      }
    });
    stage.player.add(controller);
    controllers.push(controller);

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 10, 8),
      new THREE.MeshBasicMaterial({ color: 0xe8cf9f }),
    );
    dot.visible = false;
    stage.scene.add(dot);
    hitDots.push(dot);
  }

  // Thumbstick snap turn: edge-triggered per input source, so
  // holding the stick turns in steps instead of spinning.
  const stickState = new Map<string, { armed: boolean; lastAt: number }>();

  function pollThumbsticks(now: number): void {
    const session = stage.renderer.xr.getSession();
    if (!session) return;
    for (const source of session.inputSources) {
      const gamepad = source.gamepad;
      if (!gamepad || gamepad.axes.length < 2) continue;
      // xr-standard mapping: axes[2] is the thumbstick X when a
      // thumbstick exists; axes[0] is the touchpad/thumbstick X
      // otherwise.
      const x = gamepad.axes.length >= 4 ? gamepad.axes[2] : gamepad.axes[0];
      const key = `${source.handedness}`;
      let state = stickState.get(key);
      if (!state) {
        state = { armed: true, lastAt: 0 };
        stickState.set(key, state);
      }
      if (Math.abs(x) < STICK_DEADZONE) {
        state.armed = true;
        continue;
      }
      if (state.armed && Math.abs(x) > STICK_TRIGGER && now - state.lastAt > SNAP_COOLDOWN_MS) {
        state.armed = false;
        state.lastAt = now;
        dispatch({ type: 'turn', dir: x > 0 ? 1 : -1 });
      }
    }
  }

  function update(): void {
    if (!stage.renderer.xr.isPresenting) {
      panel.setHovered(null);
      for (const dot of hitDots) dot.visible = false;
      return;
    }
    let hovered: THREE.Object3D | null = null;
    controllers.forEach((controller, i) => {
      const hit = castFrom(controller);
      const dot = hitDots[i];
      if (hit) {
        dot.visible = true;
        dot.position.copy(hit.point);
        if (!hovered) hovered = hit.target;
      } else {
        dot.visible = false;
      }
    });
    panel.setHovered(hovered);
    pollThumbsticks(performance.now());
  }

  refreshPanel();

  return {
    panel,
    press,
    refreshPanel,
    update,
    get lastAction() {
      return lastAction;
    },
  };
}
