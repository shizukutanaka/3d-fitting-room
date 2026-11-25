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
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { getLang, t, type I18nKey } from './i18n';
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
// Meta Web Launch: send an HTTPS experience link from a phone or
// desktop browser straight to the Meta Quest Browser via the
// official open_url handoff (`?url=<encoded-https-url>`).
// ----------------------------------------------------------------

export const META_WEB_LAUNCH_BASE = 'https://www.oculus.com/open_url/';

export type VrSupport = 'unknown' | 'supported' | 'unsupported';

/** Build a Meta Web Launch URL for an HTTPS target page, or null
 *  when the target is not HTTPS (Meta's Web Launch endpoint only
 *  accepts HTTPS links, so local http:// dev URLs are excluded). */
export function buildWebLaunchUrl(targetHref: string): string | null {
  let target: URL;
  try {
    target = new URL(targetHref);
  } catch {
    return null;
  }
  if (target.protocol !== 'https:') return null;
  const launch = new URL(META_WEB_LAUNCH_BASE);
  launch.searchParams.set('url', target.toString());
  return launch.toString();
}

/** Return the Web Launch URL when the current browser cannot enter
 *  immersive-vr directly and the page is served over HTTPS. */
export function shouldOfferWebLaunch(vrSupport: VrSupport, targetHref: string): string | null {
  if (vrSupport !== 'unsupported') return null;
  return buildWebLaunchUrl(targetHref);
}

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
  | { type: 'diag' }
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
    case 'diag':
      return 'diag';
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
  if (id === 'diag') return { type: 'diag' };
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
  /** Shadow map edge (px) and filter: soft = PCFSoft, else PCF. */
  shadowPx: number;
  shadowSoft: boolean;
}

export const XR_QUALITY_STEPS: readonly XrQualityStep[] = [
  // Step 0 is the session-start state; its mirror size is
  // scene.ts's MIRROR_XR_PX (the two must agree).
  { mirrorPx: 512, foveation: 0.5, shadows: true, shadowPx: 2048, shadowSoft: true },
  // The standalone-headset step (Quest): a quarter of the shadow
  // texels and the cheaper PCF filter, everything else intact.
  // Standalone headsets start here (xrStartLevel) and never climb
  // above it.
  { mirrorPx: 512, foveation: 0.5, shadows: true, shadowPx: 1024, shadowSoft: false },
  { mirrorPx: 256, foveation: 0.5, shadows: true, shadowPx: 1024, shadowSoft: false },
  { mirrorPx: null, foveation: 0.65, shadows: true, shadowPx: 1024, shadowSoft: false },
  { mirrorPx: null, foveation: 0.85, shadows: false, shadowPx: 1024, shadowSoft: false },
];

/** The ladder level a session starts at, which is also the best
 *  level it may recover to. Standalone (mobile-GPU) headsets start
 *  on the 1024 px / PCF step; a PC-driven headset starts at 0. */
export function xrStartLevel(userAgent: string): number {
  return /OculusBrowser|Quest|Pico|Mobile VR/i.test(userAgent) ? 1 : 0;
}

/** The frame budget the ladder defends: 72 Hz, the Quest 2
 *  baseline frame rate (WORLD-CLASS.md M1). */
export const XR_FRAME_BUDGET_MS = 1000 / 72;
/** Quality is restored only with real headroom, not at the edge. */
export const XR_RECOVER_MS = XR_FRAME_BUDGET_MS * 0.62;

/** One ladder decision from a windowed average frame time. */
export function nextXrQualityLevel(current: number, avgFrameMs: number, floor = 0): number {
  const clamped = Math.min(Math.max(current, floor), XR_QUALITY_STEPS.length - 1);
  if (avgFrameMs > XR_FRAME_BUDGET_MS) {
    return Math.min(clamped + 1, XR_QUALITY_STEPS.length - 1);
  }
  if (avgFrameMs < XR_RECOVER_MS) {
    return Math.max(clamped - 1, floor);
  }
  return clamped;
}

// ----------------------------------------------------------------
// XR dynamic resolution: the first thing to give when frames run
// long is render resolution, adjusted continuously through
// XRView.requestViewportScale; the ladder above only steps down
// once the scale is at its minimum, and only steps back up once
// the scale is back at 1.
// ----------------------------------------------------------------

/** The smallest viewport scale asked for (per axis: a quarter of
 *  the pixels at 0.5). */
export const XR_VIEWPORT_SCALE_MIN = 0.5;
/** The most the scale rises in one decision. */
export const XR_VIEWPORT_SCALE_RISE = 0.05;

/** One viewport-scale decision from a windowed average frame time.
 *  The browser's XRView.recommendedViewportScale wins when it gives
 *  one (it sees GPU load; the frame time here is CPU-side). Without
 *  it: over budget, the scale drops by the square root of the
 *  overrun, since cost follows the pixel count; with real headroom
 *  it rises a step at a time; in between it holds. */
export function nextXrViewportScale(current: number, avgFrameMs: number, recommended?: number | null): number {
  const clamp = (x: number) => Math.min(Math.max(x, XR_VIEWPORT_SCALE_MIN), 1);
  if (typeof recommended === 'number' && Number.isFinite(recommended) && recommended > 0) return clamp(recommended);
  const scale = clamp(current);
  if (avgFrameMs > XR_FRAME_BUDGET_MS) return clamp(scale * Math.sqrt(XR_FRAME_BUDGET_MS / avgFrameMs));
  if (avgFrameMs < XR_RECOVER_MS) return clamp(scale + XR_VIEWPORT_SCALE_RISE);
  return scale;
}

/** The ladder decision with dynamic resolution in front of it: no
 *  step down until the viewport scale is at its minimum, no step up
 *  until it is back at 1. */
export function nextXrQualityLevelAfterScale(current: number, avgFrameMs: number, floor: number, viewportScale: number): number {
  const next = nextXrQualityLevel(current, avgFrameMs, floor);
  const held = Math.min(Math.max(current, floor), XR_QUALITY_STEPS.length - 1);
  if (next > held && viewportScale > XR_VIEWPORT_SCALE_MIN) return held;
  if (next < held && viewportScale < 1) return held;
  return next;
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
  /** Whether the diagnostics board is showing (its chip reads selected). */
  diagOn?: boolean;
}

const PANEL_INNER_WIDTH = VR_PANEL_WIDTH - 0.12;
const CHIP_HEIGHT = 0.105;
const CHIP_GAP = 0.02;
const LABEL_HEIGHT = 0.052;
const SWATCH_HEIGHT = 0.062;
const ROW_GAP = 0.022;

/** Objects on this layer are drawn by the main camera (and the
 *  XR eyes, which inherit its mask) but not by the mirror's
 *  reflection camera, which stays on layer 0: the reflection pass
 *  shows the person and the room, not the panel, the mirror's own
 *  frame or the controller rays. Layers 1 and 2 are three.js's
 *  left/right eye layers. */
export const NO_MIRROR_LAYER = 3;

/** The panel face is one canvas texture on one quad (one draw
 *  call for every label, button and swatch). Canvas pixels per
 *  meter: 1024 px across the board, which is at or above the
 *  headset's angular resolution from the spawn point. */
const FACE_PX_W = 1024;
const FACE_SCALE = FACE_PX_W / VR_PANEL_WIDTH;
const FACE_PX_H = Math.round(VR_PANEL_HEIGHT * FACE_SCALE);

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

/** Device font stack for panel text: the Japanese families the
 *  panel started with, plus Simplified-Chinese, Korean and
 *  Windows fallbacks so all eight languages (M8) draw with the
 *  headset/browser system fonts — no font assets ship. */
const FONT_STACK =
  '"Hiragino Sans", "Noto Sans JP", "Noto Sans SC", "Noto Sans KR", "Malgun Gothic", "Microsoft YaHei", sans-serif';

/** One button drawn into the face canvas (pixel rect): label text
 *  shrunk to fit, brass when selected, dark walnut otherwise.
 *  Drawn with device fonts only — no font assets ship with the app. */
function drawButton(
  ctx: CanvasRenderingContext2D,
  label: string,
  selected: boolean,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const r = h * 0.2;
  ctx.fillStyle = selected ? '#b08d57' : '#38302a';
  roundedRect(ctx, x + 2, y + 2, w - 4, h - 4, r);
  ctx.fill();
  ctx.strokeStyle = selected ? '#e8cf9f' : '#6d5c44';
  ctx.lineWidth = 2.5;
  roundedRect(ctx, x + 2, y + 2, w - 4, h - 4, r);
  ctx.stroke();
  ctx.fillStyle = selected ? '#221a12' : '#f2e9da';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let size = Math.round(h * 0.4);
  const font = (s: number) => `600 ${s}px ${FONT_STACK}`;
  ctx.font = font(size);
  while (size > 14 && ctx.measureText(label).width > w - 24) {
    size -= 2;
    ctx.font = font(size);
  }
  ctx.fillText(label, x + w / 2, y + h / 2 + 1);
}

function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number): void {
  ctx.fillStyle = '#e9dfc9';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  let size = Math.round(h * 0.68);
  const font = (s: number) => `600 ${s}px ${FONT_STACK}`;
  ctx.font = font(size);
  while (size > 16 && ctx.measureText(text).width > w - 12) {
    size -= 2;
    ctx.font = font(size);
  }
  ctx.fillText(text, x + 4, y + h / 2 + 1);
}

/** Wrap a paragraph into lines that fit `maxWidth`: word by word
 *  for spaced scripts, character by character for CJK (which has
 *  no spaces). A single over-long word is hard-split. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const tokens: string[] = [];
  let word = '';
  for (const ch of text) {
    if (ch === ' ') {
      if (word) tokens.push(word);
      word = '';
      tokens.push(' ');
    } else if (/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(ch)) {
      if (word) tokens.push(word);
      word = '';
      tokens.push(ch);
    } else {
      word += ch;
    }
  }
  if (word) tokens.push(word);
  const lines: string[] = [];
  let line = '';
  for (const token of tokens) {
    if (token === ' ' && line === '') continue;
    const next = line + token;
    if (ctx.measureText(next).width <= maxWidth || line === '') {
      line = next;
    } else {
      lines.push(line.trimEnd());
      line = token === ' ' ? '' : token;
    }
  }
  if (line.trim() !== '') lines.push(line.trimEnd());
  return lines;
}

/** A wrapped paragraph (the principle note) drawn into the face
 *  canvas with its top-left at (x, y): smaller, dimmer type than
 *  the labels, as many lines as the text needs. Returns the height
 *  it consumed, in pixels. */
function drawNote(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number): number {
  const pad = 14;
  const fontSize = 27;
  const lineHeight = 39;
  ctx.font = `500 ${fontSize}px ${FONT_STACK}`;
  const lines = wrapText(ctx, text, w - pad * 2);
  ctx.fillStyle = '#cfc2a8';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => {
    ctx.fillText(line, x + pad, y + pad / 2 + i * lineHeight);
  });
  return lines.length * lineHeight + pad;
}

export class VrPanel {
  readonly group = new THREE.Group();
  private content = new THREE.Group();
  private hitMeshes: THREE.Object3D[] = [];
  private hovered: THREE.Object3D | null = null;
  private readonly categories = buildVrCategories();
  /** The adult/fictional principle note (M9) as currently rendered
   *  on the board, or null while the board shows the page without
   *  it. Read by the verification bridge. */
  noteText: string | null = null;
  private readonly faceCanvas: HTMLCanvasElement;
  private readonly faceTexture: THREE.CanvasTexture;
  private readonly highlight: THREE.Mesh;
  /** Press targets are invisible unit quads (raycast only, never
   *  drawn), scaled to each button's size. */
  private readonly hitGeometry = new THREE.PlaneGeometry(1, 1);
  private readonly hitMaterial = new THREE.MeshBasicMaterial();
  private ctx: CanvasRenderingContext2D | null = null;
  private lastRenderKey = '';

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
    // The four frame bars never move: one merged mesh.
    const frameGeoH = new THREE.BoxGeometry(VR_PANEL_WIDTH + 0.03, 0.028, 0.045);
    const frameGeoV = new THREE.BoxGeometry(0.028, VR_PANEL_HEIGHT + 0.03, 0.045);
    const bars = [
      ...[-1, 1].map((sy) => frameGeoH.clone().translate(0, sy * (VR_PANEL_HEIGHT / 2 + 0.008), -0.02)),
      ...[-1, 1].map((sx) => frameGeoV.clone().translate(sx * (VR_PANEL_WIDTH / 2 + 0.008), 0, -0.02)),
    ];
    const frame = new THREE.Mesh(mergeGeometries(bars, false)!, frameMat);
    for (const g of [frameGeoH, frameGeoV, ...bars]) g.dispose();
    this.group.add(frame);
    // The face: every label, button and swatch is painted into
    // one canvas, shown on one transparent quad over the backing.
    this.faceCanvas = document.createElement('canvas');
    this.faceCanvas.width = FACE_PX_W;
    this.faceCanvas.height = FACE_PX_H;
    this.faceTexture = new THREE.CanvasTexture(this.faceCanvas);
    this.faceTexture.colorSpace = THREE.SRGBColorSpace;
    this.faceTexture.anisotropy = 4;
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(VR_PANEL_WIDTH, VR_PANEL_HEIGHT),
      new THREE.MeshBasicMaterial({ map: this.faceTexture, transparent: true }),
    );
    face.position.z = 0.01;
    this.group.add(face);
    // Hover feedback: one translucent quad moved over the hovered
    // button, drawn only while something is hovered.
    this.highlight = new THREE.Mesh(
      this.hitGeometry,
      new THREE.MeshBasicMaterial({ color: '#e8cf9f', transparent: true, opacity: 0.3, depthWrite: false }),
    );
    this.highlight.visible = false;
    this.highlight.renderOrder = 1;
    this.group.add(this.highlight);
    for (const m of [backing, frame, face, this.highlight]) m.layers.set(NO_MIRROR_LAYER);
    this.group.add(this.content);
  }

  /** Objects a controller ray can press, in scene order. */
  get targets(): readonly THREE.Object3D[] {
    return this.hitMeshes;
  }

  private addTarget(actionId: string, x: number, y: number, w: number, h: number): void {
    const mesh = new THREE.Mesh(this.hitGeometry, this.hitMaterial);
    mesh.position.set(x, y, 0.012);
    mesh.scale.set(w, h, 1);
    mesh.visible = false;
    mesh.userData.actionId = actionId;
    this.content.add(mesh);
    this.hitMeshes.push(mesh);
  }

  /** Panel meters (center + size) to a face-canvas pixel rect. */
  private px(x: number, y: number, w: number, h: number): [number, number, number, number] {
    return [
      (x - w / 2 + VR_PANEL_WIDTH / 2) * FACE_SCALE,
      (VR_PANEL_HEIGHT / 2 - y - h / 2) * FACE_SCALE,
      w * FACE_SCALE,
      h * FACE_SCALE,
    ];
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
    if (this.ctx) drawButton(this.ctx, label, selected, ...this.px(x, y, w, h));
    this.addTarget(actionId, x, y, w, h);
  }

  private addLabel(text: string, x: number, y: number, w: number): void {
    if (this.ctx) drawLabel(this.ctx, text, ...this.px(x, y, w, LABEL_HEIGHT));
  }

  /** A wrapped paragraph pinned with its top edge at `topY`;
   *  returns the height it consumed. Not a press target. */
  private addNote(text: string, topY: number, w: number): number {
    if (!this.ctx) return 0;
    const [px, py, pw] = this.px(0, topY, w, 0);
    return drawNote(this.ctx, text, px, py, pw) / FACE_SCALE;
  }

  private addSwatch(hex: string, selected: boolean, actionId: string, x: number, y: number, w: number): void {
    if (this.ctx) {
      if (selected) {
        this.ctx.fillStyle = '#e8cf9f';
        this.ctx.fillRect(...this.px(x, y, w + 0.014, SWATCH_HEIGHT + 0.014));
      }
      this.ctx.fillStyle = hex;
      this.ctx.fillRect(...this.px(x, y, w, SWATCH_HEIGHT));
    }
    this.addTarget(actionId, x, y, w, SWATCH_HEIGHT);
  }

  /** Fingerprint of everything actually drawn on the current page.
   *  Body/height/skin/name edits do not appear on the VR board, so
   *  comparing this key avoids repainting & re-uploading the 1024px
   *  CanvasTexture on every slider drag. */
  private renderKey(state: VrPanelState): string {
    const parts: string[] = [getLang(), String(state.page)];
    for (const category of this.categories) {
      if (category.page !== state.page) continue;
      parts.push(String(state.outfit[category.field]));
      if (category.colorField) parts.push(String(state.outfit[category.colorField]));
    }
    if (state.page === 0) {
      for (const look of state.looks.slice(0, VR_LOOKS_SHOWN)) {
        parts.push(look.id, look.name);
      }
    } else {
      parts.push(state.diagOn === true ? '1' : '0');
    }
    return parts.join('\u001f');
  }

  /** Rebuild the board's buttons from the current state. Called
   *  whenever the outfit, the looks, the page or the language
   *  changes — presses are discrete events, so a rebuild per
   *  change is cheap and keeps exactly one source of truth. */
  refresh(state: VrPanelState): void {
    const key = this.renderKey(state);
    if (key === this.lastRenderKey) return;
    this.lastRenderKey = key;
    this.content.clear();
    this.highlight.visible = false;
    this.ctx = this.faceCanvas.getContext('2d');
    this.ctx?.clearRect(0, 0, FACE_PX_W, FACE_PX_H);
    this.hitMeshes = [];
    this.hovered = null;
    this.noteText = null;

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
        [
          { label: t('ui.savePhoto'), selected: false, actionId: vrActionId({ type: 'photo' }) },
          // Performance diagnostics board (diagnostics.ts): off by
          // default, shown on demand for real-device measurement.
          { label: t('vr.diag'), selected: state.diagOn === true, actionId: vrActionId({ type: 'diag' }) },
        ],
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
      // M9: the adult/fictional principle, readable inside VR —
      // this page is one press from the clothes page, so the note
      // is never more than two actions away (enter VR, open this
      // page). It is text, not a button: nothing to press, just
      // there to be read.
      const note = t('principle.note');
      cursorY -= LABEL_HEIGHT / 2 + 0.035;
      this.addNote(note, cursorY, PANEL_INNER_WIDTH);
      this.noteText = note;
    }
    this.faceTexture.needsUpdate = true;
  }

  /** Highlight the hovered button (called per frame from the
   *  rig's raycasts). Pass null when nothing is hovered. */
  setHovered(target: THREE.Object3D | null): void {
    if (this.hovered === target) return;
    this.hovered = target;
    this.highlight.visible = target !== null;
    if (target) {
      this.highlight.position.set(target.position.x, target.position.y, 0.013);
      this.highlight.scale.copy(target.scale).multiplyScalar(1.04);
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
  /** Show/hide the diagnostics overlay (optional host feature). */
  toggleDiagnostics?(): void;
  diagnosticsOn?(): boolean;
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
  /** Draw these lines on the diagnostics board above the panel;
   *  null hides the board (no draw call, no texture upload). */
  setDiagLines(lines: string[] | null): void;
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
    panel.refresh({ outfit: host.getOutfit(), looks: host.getLooks(), page, diagOn: host.diagnosticsOn?.() === true });
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
      case 'diag':
        host.toggleDiagnostics?.();
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
    ray.layers.set(NO_MIRROR_LAYER);
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
    dot.layers.set(NO_MIRROR_LAYER);
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

  // The diagnostics board: a small text plane above the panel,
  // created on first use and redrawn only when new lines arrive
  // (once per log window), so it costs nothing while hidden.
  let diagBoard: { mesh: THREE.Mesh; ctx: CanvasRenderingContext2D; tex: THREE.CanvasTexture } | null = null;
  function setDiagLines(lines: string[] | null): void {
    if (!lines) {
      if (diagBoard) diagBoard.mesh.visible = false;
      return;
    }
    if (!diagBoard) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 384;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(VR_PANEL_WIDTH, VR_PANEL_WIDTH * (384 / 1024)),
        new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
      );
      mesh.name = 'vr-diag-board';
      mesh.layers.set(NO_MIRROR_LAYER);
      mesh.position.set(0, VR_PANEL_HEIGHT / 2 + (VR_PANEL_WIDTH * (384 / 1024)) / 2 + 0.03, 0);
      panel.group.add(mesh);
      diagBoard = { mesh, ctx, tex };
    }
    const { ctx, tex, mesh } = diagBoard;
    ctx.fillStyle = '#16130f';
    ctx.fillRect(0, 0, 1024, 384);
    ctx.fillStyle = '#e8e0d0';
    ctx.font = '36px ui-monospace, Menlo, Consolas, monospace';
    ctx.textBaseline = 'middle';
    lines.forEach((line, i) => ctx.fillText(line, 28, 48 + i * 64, 968));
    tex.needsUpdate = true;
    mesh.visible = true;
  }

  refreshPanel();

  return {
    panel,
    press,
    refreshPanel,
    update,
    setDiagLines,
    get lastAction() {
      return lastAction;
    },
  };
}
