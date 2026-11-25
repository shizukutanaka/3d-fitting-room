// The fitting mannequin.
//
// The figure is no longer assembled from primitives. It is a sculpted
// CC0 base mesh (Blender Studio "Human Base Meshes", see
// tools/avatar-pipeline/) retopologised to ~12k triangles with a 1K
// normal and AO bake, a 22-bone humanoid skeleton, and a wardrobe of
// garments cut from the body surface in the same pipeline, skinned to
// the same skeleton. Garments therefore follow every pose and every
// Body Scale Calibration change without clipping.
//
// Style: a boutique display mannequin (sculpted face, satin finish,
// no hair or painted eyes). The body is the jig that holds the
// clothes; the clothes are what the user came to see.
//
// LEGAL-ETHICS.md: adult proportions only, no gender label (figures
// are "A"/"B"), chest and groin detail smoothed away in the bake, and
// the opaque base layer (G_base) is always visible (J-04 / J-10).

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  describeLength,
  landmarks,
  mapSourceHeight,
  solveBoneScales,
  type BoneScales,
  type LegRatio,
  type LengthLabel,
  type SourceJoints,
} from './bodyscale';
import { skinColorForTone, type CharacterParams } from './character';
import { isDress, type BottomStyle, type OuterStyle, type PoseId, type ShoeStyle, type TopStyle } from './outfit';
import { fabricTextures, leatherTextures, ribbedBump } from './textures';

export type FigureId = 'a' | 'b';
export const FIGURES: readonly FigureId[] = ['a', 'b'];

/** Inseam height of each source mesh as a fraction of its stature
 *  (measured in tools/avatar-pipeline/build_body.py). */
const CROTCH_FRAC: Record<FigureId, number> = { a: 0.467, b: 0.463 };

/** Hem height of each garment on the source mannequin, as a fraction
 *  of stature (tools/avatar-pipeline/garments.py). */
export const GARMENT_HEM: Record<TopStyle | OuterStyle | BottomStyle, number> = {
  tee: 0.535,
  blouse: 0.545,
  hoodie: 0.505,
  dress: 0.33,
  dressLong: 0.1,
  jacket: 0.5,
  cardigan: 0.475,
  coat: 0.26,
  pants: 0.06,
  shorts: 0.36,
  skirt: 0.36,
  skirtLong: 0.1,
  none: 0,
};

export interface WornGarments {
  top: TopStyle;
  topColor: string;
  outer: OuterStyle;
  outerColor: string;
  bottom: BottomStyle;
  bottomColor: string;
  shoes: ShoeStyle;
  shoeColor: string;
}

export interface GarmentLength {
  slot: 'top' | 'outer' | 'bottom';
  style: TopStyle | OuterStyle | BottomStyle;
  label: LengthLabel;
}

export interface AccessoryFit {
  /** Front-most z (rest pose, world) of the body and visible garments near (x, y). */
  frontZ(x: number, y: number): number;
  /** Rest-pose world point to the neck / bag anchor's local space. */
  toNeck(v: THREE.Vector3): THREE.Vector3;
  toBag(v: THREE.Vector3): THREE.Vector3;
  /** The neck cross-section where a scarf wraps (rest pose, world). */
  neck: { y: number; z: number; rx: number; rz: number };
  /** Neck bone, hips bone, and shoulder-top height (rest pose, world). */
  neckY: number;
  hipsY: number;
  shoulderTopY: number;
}

export interface AvatarRig {
  root: THREE.Group;
  /** Head pivot (rides the head bone): the focus target for the
   *  face close-up and the parent of hat / glasses anchors. */
  head: THREE.Group;
  hatAnchor: THREE.Group;
  glassesAnchor: THREE.Group;
  neckAnchor: THREE.Group;
  bagAnchor: THREE.Group;
  /** Kept for API compatibility; garments are skinned meshes now,
   *  so nothing is built under these anchors. */
  torsoAnchor: THREE.Group;
  bottomAnchor: THREE.Group;
  shoesAnchor: THREE.Group;
  /** The current top's material (recolored by the outfit). */
  topMaterial: THREE.MeshPhysicalMaterial;
  /** Rest-pose body and worn-garment surface, for draping the
   *  neck / bag accessories; null until the figure has loaded. */
  fit(): AccessoryFit | null;
  /** Called after the figure (re)loads or is recalibrated, so fitted accessories can be rebuilt. */
  onMount?: () => void;
  /** Resolves when the current figure's mesh has loaded. */
  ready: Promise<void>;
  figure(): FigureId;
  applyPose(pose: PoseId): void;
  setCharacter(next: CharacterParams): void;
  /** Switch figure A/B and the calibration leg ratio. */
  setBody(figure: FigureId, legRatio: LegRatio): Promise<void>;
  setGarments(worn: WornGarments): void;
  /** Hem lengths of the worn garments relative to body landmarks. */
  garmentLengths(): GarmentLength[];
  /** Verification: while on, the figure is drawn flat black except
   *  the triangles under worn garments — the body's in magenta (they
   *  are left out in normal drawing) and the base layer's in cyan
   *  (they are drawn) — so a pixel count says how much pokes through. */
  probeLeaks(on: boolean): void;
  /** How many body triangles are currently left out as covered. */
  maskedTriangles(): number;
  tick(timeSec: number, gazeTarget?: THREE.Vector3): void;
}

// ---------- materials ----------

interface FabricSpec {
  roughness: number;
  sheen: number;
  sheenRoughness: number;
  repeat: number;
  bump: number;
  kind?: 'knit' | 'leather';
  clearcoat?: number;
}

const FABRIC: Record<string, FabricSpec> = {
  tee: { roughness: 0.88, sheen: 0.35, sheenRoughness: 0.8, repeat: 14, bump: 0.25 },
  hoodie: { roughness: 0.95, sheen: 0.65, sheenRoughness: 0.9, repeat: 10, bump: 0.35 },
  blouse: { roughness: 0.42, sheen: 0.45, sheenRoughness: 0.35, repeat: 18, bump: 0.12 },
  dress: { roughness: 0.62, sheen: 0.4, sheenRoughness: 0.5, repeat: 16, bump: 0.15 },
  dressLong: { roughness: 0.55, sheen: 0.45, sheenRoughness: 0.45, repeat: 16, bump: 0.15 },
  jacket: { roughness: 0.78, sheen: 0.45, sheenRoughness: 0.7, repeat: 12, bump: 0.3 },
  coat: { roughness: 0.86, sheen: 0.6, sheenRoughness: 0.8, repeat: 10, bump: 0.35 },
  cardigan: { roughness: 0.96, sheen: 0.7, sheenRoughness: 0.9, repeat: 1, bump: 0.6, kind: 'knit' },
  pants: { roughness: 0.84, sheen: 0.25, sheenRoughness: 0.8, repeat: 14, bump: 0.35 },
  shorts: { roughness: 0.84, sheen: 0.25, sheenRoughness: 0.8, repeat: 14, bump: 0.35 },
  skirt: { roughness: 0.7, sheen: 0.4, sheenRoughness: 0.6, repeat: 6, bump: 0.2 },
  skirtLong: { roughness: 0.6, sheen: 0.45, sheenRoughness: 0.5, repeat: 6, bump: 0.15 },
  shoesLow: { roughness: 0.42, sheen: 0, sheenRoughness: 0.5, repeat: 4, bump: 0.25, kind: 'leather', clearcoat: 0.35 },
  sneakers: { roughness: 0.7, sheen: 0.2, sheenRoughness: 0.7, repeat: 8, bump: 0.3 },
  boots: { roughness: 0.4, sheen: 0, sheenRoughness: 0.5, repeat: 4, bump: 0.3, kind: 'leather', clearcoat: 0.4 },
};

const texCache = new Map<string, { map?: THREE.Texture; bump: THREE.Texture }>();
function fabricMaps(spec: FabricSpec): { map?: THREE.Texture; bump: THREE.Texture } {
  const key = `${spec.kind ?? 'woven'}:${spec.repeat}`;
  let t = texCache.get(key);
  if (!t) {
    if (spec.kind === 'knit') t = { bump: ribbedBump([22, 16]) };
    else if (spec.kind === 'leather') t = leatherTextures();
    else t = fabricTextures([spec.repeat, spec.repeat]);
    for (const tex of [t.map, t.bump]) {
      if (!tex) continue;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.flipY = false;
    }
    texCache.set(key, t);
  }
  return t;
}

function garmentMaterial(name: string): THREE.MeshPhysicalMaterial {
  const spec = FABRIC[name] ?? FABRIC.tee;
  const maps = fabricMaps(spec);
  return new THREE.MeshPhysicalMaterial({
    name,
    color: '#ffffff',
    map: maps.map ?? null,
    bumpMap: maps.bump,
    bumpScale: spec.bump,
    roughness: spec.roughness,
    metalness: 0,
    sheen: spec.sheen,
    sheenRoughness: spec.sheenRoughness,
    sheenColor: new THREE.Color('#ffffff'),
    clearcoat: spec.clearcoat ?? 0,
    clearcoatRoughness: 0.5,
    envMapIntensity: 0.55,
    side: THREE.DoubleSide,
  });
}

const MANNEQUIN_BASE = new THREE.Color('#e7e1d7');

// ---------- asset loading ----------

interface FigureAsset {
  scene: THREE.Group;
  normal: THREE.Texture | null;
  ao: THREE.Texture | null;
  cover: CoverMap;
}

const assetCache = new Map<FigureId, Promise<FigureAsset>>();
function loadFigure(id: FigureId): Promise<FigureAsset> {
  let p = assetCache.get(id);
  if (!p) {
    const base = `${import.meta.env.BASE_URL}models/mannequin-${id}`;
    const tl = new THREE.TextureLoader();
    const tex = (url: string, srgb: boolean) =>
      tl.loadAsync(url).then((t) => {
        t.flipY = false;
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        return t;
      }).catch(() => null);
    p = Promise.all([
      new GLTFLoader().loadAsync(`${base}.glb`),
      tex(`${base}-normal.webp`, false),
      tex(`${base}-ao.webp`, false),
    ]).then(([gltf, normal, ao]) => {
      keepGarmentsOutside(gltf.scene);
      return { scene: gltf.scene, normal, ao, cover: coveredByGarments(gltf.scene) };
    });
    assetCache.set(id, p);
  }
  return p;
}

const PODIUM_TOP = 0.12;
/** Plantar flexion of the foot in pumps (rad); the toes stay flat. */
const PUMP_FLEX = 0.3;
const FOOT_BONES = ['leftFoot', 'rightFoot', 'leftToes', 'rightToes'];
const TOP_IDS = new Set(['tee', 'blouse', 'hoodie', 'dress', 'dressLong']);
const OUTER_IDS = new Set(['jacket', 'cardigan', 'coat']);
/** Gaps (m) above the base layer: legwear keeps at least
 *  UNDER_OVER_BASE over the legs, and a top worn under an outer layer
 *  is drawn in to it; the outer layer keeps at least OUTER_OVER_BASE. */
const UNDER_OVER_BASE = 0.004;
const OUTER_OVER_BASE = 0.011;

/** Minimum gap (m) between each garment and the body surface. */
function garmentClearance(id: string): number {
  if (id === 'base' || id.startsWith('shoes') || id === 'sneakers' || id === 'boots') return 0.003;
  if (OUTER_IDS.has(id)) return 0.008;
  return 0.005;
}

/** Extra gap (m) for clothes where the cloth sits tight over a part
 *  that moves under it, by the body's skinning bone: with the 5 mm
 *  (8 mm outer) minimum, fitted parts get 5-10 mm. */
const LEG_EXTRA = 0.002;
const PART_EXTRA: [RegExp, number][] = [
  [/Shoulder|UpperArm/, 0.003],
  [/UpperLeg/, LEG_EXTRA],
  [/[cC]hest/, 0.001],
];
const MAX_CLEARANCE = 0.01;

/** The pipeline smooths each garment after cutting it from the body,
 *  which pulls convex areas (hips, shoulders, toes) inside the skin.
 *  Push every garment vertex back out along the nearest body normal
 *  so the body never shows through, in bind pose (the garments share
 *  the body's weights, so the gap holds when posed or calibrated). */
export function keepGarmentsOutside(scene: THREE.Object3D): void {
  scene.updateMatrixWorld(true);
  const CELL = 0.04;
  const grid = new Map<string, number[]>();
  const bp: number[] = [];
  const bn: number[] = [];
  const bx: number[] = [];
  const garments: [THREE.Mesh, string][] = [];
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  const nm = new THREE.Matrix3();
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const gname = o.name.startsWith('G_') ? o.name : o.parent?.name.startsWith('G_') ? o.parent.name : null;
    if (gname) {
      garments.push([m, gname.slice(2)]);
      return;
    }
    const pos = m.geometry.getAttribute('position');
    const nor = m.geometry.getAttribute('normal');
    if (!nor) return;
    nm.getNormalMatrix(m.matrixWorld);
    const si = m.geometry.getAttribute('skinIndex');
    const sw = m.geometry.getAttribute('skinWeight');
    const extra = ((m as THREE.SkinnedMesh).skeleton?.bones ?? []).map(
      (b) => PART_EXTRA.find(([re]) => re.test(b.name))?.[1] ?? 0,
    );
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      n.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize();
      const k = bp.length / 3;
      bp.push(v.x, v.y, v.z);
      bn.push(n.x, n.y, n.z);
      // Weighted by the skin weights, so the gap blends between parts.
      let x = 0;
      if (si && sw) for (let c = 0; c < 4; c++) x += sw.getComponent(i, c) * (extra[si.getComponent(i, c)] ?? 0);
      bx.push(x);
      const key = `${Math.floor(v.x / CELL)},${Math.floor(v.y / CELL)},${Math.floor(v.z / CELL)}`;
      const cell = grid.get(key);
      if (cell) cell.push(k);
      else grid.set(key, [k]);
    }
  });
  let minY = Infinity;
  let maxY = -Infinity;
  for (let k = 1; k < bp.length; k += 3) {
    if (bp[k] < minY) minY = bp[k];
    if (bp[k] > maxY) maxY = bp[k];
  }
  const tall = maxY - minY;
  const inv = new THREE.Matrix4();
  const w = new THREE.Vector3();
  const cellOf = (x: number, y: number, z: number) => [Math.floor(x / CELL), Math.floor(y / CELL), Math.floor(z / CELL)];
  // The opaque base layer's thickness per cell, so the layers above it can
  // be ordered: base < top drawn in under an outer layer < outer layer.
  const baseGap = new Map<string, number>();
  const baseAround = (x: number, y: number, z: number) => {
    const [cx, cy, cz] = cellOf(x, y, z);
    let g = 0;
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dz = -1; dz <= 1; dz++) g = Math.max(g, baseGap.get(`${cx + dx},${cy + dy},${cz + dz}`) ?? 0);
    return g;
  };
  garments.sort(([, a], [, b]) => Number(b === 'base') - Number(a === 'base'));
  for (const [m, id] of garments) {
    const isBase = id === 'base';
    const isOuter = OUTER_IDS.has(id);
    const pos = m.geometry.getAttribute('position') as THREE.BufferAttribute;
    const clothes = !isBase && !/^(shoes|sneakers|boots)/.test(id);
    const bottom = clothes && !isOuter && !TOP_IDS.has(id);
    if (!/^(shoes|sneakers|boots)/.test(id)) collapseSpikes(m.geometry);
    inv.copy(m.matrixWorld).invert();
    const layered = TOP_IDS.has(id);
    const under = layered ? new Float32Array(pos.count * 3) : null;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      const [cx, cy, cz] = cellOf(v.x, v.y, v.z);
      let bi = -1;
      let nx = 0;
      let ny = 0;
      let nz = 0;
      let gap = 0;
      // A push can bring another body vertex nearest: look again.
      for (let pass = 0; pass < 3; pass++) {
        const [px, py, pz] = cellOf(v.x, v.y, v.z);
        let best = Infinity;
        bi = -1;
        for (let dx = -1; dx <= 1; dx++)
          for (let dy = -1; dy <= 1; dy++)
            for (let dz = -1; dz <= 1; dz++) {
              const cell = grid.get(`${px + dx},${py + dy},${pz + dz}`);
              if (!cell) continue;
              for (const k of cell) {
                const ex = v.x - bp[3 * k];
                const ey = v.y - bp[3 * k + 1];
                const ez = v.z - bp[3 * k + 2];
                const d = ex * ex + ey * ey + ez * ez;
                if (d < best) {
                  best = d;
                  bi = k;
                }
              }
            }
        if (bi < 0) break;
        nx = bn[3 * bi];
        ny = bn[3 * bi + 1];
        nz = bn[3 * bi + 2];
        gap = (v.x - bp[3 * bi]) * nx + (v.y - bp[3 * bi + 1]) * ny + (v.z - bp[3 * bi + 2]) * nz;
        // Legwear clears the base layer's leg hems too; higher up it
        // stays close, under the hem of the top.
        const overBase = isOuter ? OUTER_OVER_BASE : bottom && bx[bi] >= LEG_EXTRA / 2 ? UNDER_OVER_BASE : -Infinity;
        const clear = clothes
          ? Math.max(Math.min(garmentClearance(id) + bx[bi], MAX_CLEARANCE), baseAround(v.x, v.y, v.z) + overBase + bx[bi])
          : garmentClearance(id);
        if (gap >= clear) break;
        const push = clear - gap;
        v.set(v.x + nx * push, v.y + ny * push, v.z + nz * push);
        gap = clear;
        pos.setXYZ(i, ...w.copy(v).applyMatrix4(inv).toArray());
      }
      if (bi < 0) continue;
      if (isBase) {
        const key = `${cx},${cy},${cz}`;
        baseGap.set(key, Math.max(baseGap.get(key) ?? 0, gap));
      }
      const target = under ? baseAround(v.x, v.y, v.z) + UNDER_OVER_BASE : Infinity;
      if (under && gap > target) {
        // Under a jacket/coat the top is drawn in between the base layer and
        // the outer layer so the cloth layers never cross; the skirt of a
        // dress below the outer hem keeps its flare.
        const t = THREE.MathUtils.smoothstep((v.y - minY) / tall, 0.45, 0.5);
        const pull = (target - gap) * t;
        w.set(v.x + nx * pull, v.y + ny * pull, v.z + nz * pull).applyMatrix4(inv);
        under[3 * i] = w.x - pos.getX(i);
        under[3 * i + 1] = w.y - pos.getY(i);
        under[3 * i + 2] = w.z - pos.getZ(i);
      }
    }
    pos.needsUpdate = true;
    if (under) {
      m.geometry.morphAttributes.position = [new THREE.BufferAttribute(under, 3)];
      m.geometry.morphTargetsRelative = true;
      m.updateMorphTargets();
    }
    m.geometry.computeBoundingSphere();
  }
}

/** How far (m) out along its normal a body vertex looks for the
 *  garment that covers it, and how far in from a garment's open edge
 *  (hem, cuff, neckline) the body stays drawn, so nothing is missing
 *  where one can look in. */
const COVER_REACH = 0.05;
const COVER_DEPTH = 0.015;
const COVER_EDGE = 0.06;

/** Per garment id, the vertices of the body ('body') and of the base
 *  layer ('base') that the garment hides. */
export type CoverMap = Record<'body' | 'base', Map<string, Uint8Array>>;

/** Which body and base-layer vertices each garment covers, in bind
 *  pose (garments share the body's weights, so it holds when posed).
 *  A vertex counts as covered when its normal meets, within
 *  COVER_REACH, a garment triangle skinned to one of the vertex's own
 *  bones, and no open edge of that garment is within COVER_EDGE. */
export function coveredByGarments(scene: THREE.Object3D): CoverMap {
  scene.updateMatrixWorld(true);
  const out: CoverMap = { body: new Map(), base: new Map() };
  const targets: ['body' | 'base', THREE.Mesh][] = [];
  const garments: [string, THREE.Mesh][] = [];
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const gname = o.name.startsWith('G_') ? o.name : o.parent?.name.startsWith('G_') ? o.parent.name : null;
    if (gname) garments.push([gname.slice(2), m]);
    if (gname === 'G_base') targets.push(['base', m]);
    else if (!gname && (m.material as THREE.Material).name === 'mannequin') targets.push(['body', m]);
  });
  const cell = (x: number) => Math.floor(x / COVER_EDGE);
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  const nm = new THREE.Matrix3();
  const ray = new THREE.Ray();
  const hit = new THREE.Vector3();
  const [a, b, c] = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  for (const [id, g] of garments) {
    const gp = g.geometry.getAttribute('position');
    const gi = g.geometry.getAttribute('skinIndex');
    const gw = g.geometry.getAttribute('skinWeight');
    const index = g.geometry.getIndex();
    if (!gi || !gw || !index) continue;
    const world = new Float32Array(gp.count * 3);
    const bone = new Uint16Array(gp.count);
    // Vertices split along UV and normal seams share a position:
    // weld them, or every seam would read as an open edge.
    const weld = new Uint32Array(gp.count);
    const first = new Map<string, number>();
    for (let i = 0; i < gp.count; i++) {
      v.fromBufferAttribute(gp, i);
      const at = `${Math.round(v.x * 1e5)},${Math.round(v.y * 1e5)},${Math.round(v.z * 1e5)}`;
      weld[i] = first.get(at) ?? i;
      if (weld[i] === i) first.set(at, i);
      v.applyMatrix4(g.matrixWorld).toArray(world, 3 * i);
      let top = 0;
      for (let k = 1; k < 4; k++) if (gw.getComponent(i, k) > gw.getComponent(i, top)) top = k;
      bone[i] = gi.getComponent(i, top);
    }
    // Triangles by grid cell, and the vertices on an open edge
    // (an edge used by one triangle only).
    const tris = new Map<string, number[]>();
    const edges = new Map<number, number>();
    for (let f = 0; f < index.count; f += 3) {
      const lo = [Infinity, Infinity, Infinity];
      const hi = [-Infinity, -Infinity, -Infinity];
      for (let e = 0; e < 3; e++) {
        const p = index.getX(f + e);
        const q = index.getX(f + ((e + 1) % 3));
        const key = Math.min(weld[p], weld[q]) * gp.count + Math.max(weld[p], weld[q]);
        edges.set(key, (edges.get(key) ?? 0) + 1);
        for (let d = 0; d < 3; d++) {
          lo[d] = Math.min(lo[d], world[3 * p + d]);
          hi[d] = Math.max(hi[d], world[3 * p + d]);
        }
      }
      for (let x = cell(lo[0]); x <= cell(hi[0]); x++)
        for (let y = cell(lo[1]); y <= cell(hi[1]); y++)
          for (let z = cell(lo[2]); z <= cell(hi[2]); z++) {
            const key = `${x},${y},${z}`;
            const list = tris.get(key);
            if (list) list.push(f);
            else tris.set(key, [f]);
          }
    }
    const open: number[] = [];
    for (const [key, uses] of edges) if (uses === 1) open.push(Math.floor(key / gp.count), key % gp.count);
    for (const [kind, t] of targets) {
      if (g === t) continue;
      const pos = t.geometry.getAttribute('position');
      const nor = t.geometry.getAttribute('normal');
      const si = t.geometry.getAttribute('skinIndex');
      const sw = t.geometry.getAttribute('skinWeight');
      if (!nor || !si || !sw) continue;
      nm.getNormalMatrix(t.matrixWorld);
      const flag = new Uint8Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(t.matrixWorld);
        n.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize();
        const mine = (bn: number) => [0, 1, 2, 3].some((k) => si.getComponent(i, k) === bn && sw.getComponent(i, k) > 0.2);
        // Start under the surface, so a vertex that pokes through
        // the garment still counts as under it.
        ray.origin.copy(v).addScaledVector(n, -COVER_DEPTH);
        ray.direction.copy(n);
        const seen = new Set<number>();
        search: for (let x = -1; x <= 1; x++)
          for (let y = -1; y <= 1; y++)
            for (let z = -1; z <= 1; z++)
              for (const f of tris.get(`${cell(v.x) + x},${cell(v.y) + y},${cell(v.z) + z}`) ?? []) {
                if (seen.has(f)) continue;
                seen.add(f);
                const [p, q, r] = [index.getX(f), index.getX(f + 1), index.getX(f + 2)];
                if (!mine(bone[p]) && !mine(bone[q]) && !mine(bone[r])) continue;
                a.fromArray(world, 3 * p);
                b.fromArray(world, 3 * q);
                c.fromArray(world, 3 * r);
                if (ray.intersectTriangle(a, b, c, false, hit) && hit.distanceTo(ray.origin) < COVER_REACH) {
                  flag[i] = 1;
                  break search;
                }
              }
        if (!flag[i]) continue;
        for (const p of open) {
          if (v.distanceToSquared(a.fromArray(world, 3 * p)) < COVER_EDGE * COVER_EDGE) {
            flag[i] = 0;
            break;
          }
        }
      }
      out[kind].set(id, flag);
    }
  }
  return out;
}

/** Fold back stray vertices left by the pipeline's bisect/join steps:
 *  a vertex whose every edge is long (> 10 cm, against a 1–2 cm
 *  garment mesh) is a spike, so it moves to the centroid of its
 *  neighbours and its triangles collapse. */
function collapseSpikes(geo: THREE.BufferGeometry): void {
  const index = geo.getIndex();
  if (!index) return;
  const pos = geo.getAttribute('position') as THREE.BufferAttribute;
  const minEdge = new Float32Array(pos.count).fill(Infinity);
  const nbrs: number[][] = Array.from({ length: pos.count }, () => []);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  for (let t = 0; t < index.count; t += 3) {
    const tri = [index.getX(t), index.getX(t + 1), index.getX(t + 2)];
    for (let e = 0; e < 3; e++) {
      const i = tri[e];
      const j = tri[(e + 1) % 3];
      const l = a.fromBufferAttribute(pos, i).distanceTo(b.fromBufferAttribute(pos, j));
      if (l < minEdge[i]) minEdge[i] = l;
      if (l < minEdge[j]) minEdge[j] = l;
      nbrs[i].push(j);
      nbrs[j].push(i);
    }
  }
  for (let i = 0; i < pos.count; i++) {
    if (!(minEdge[i] > 0.1) || minEdge[i] === Infinity) continue;
    a.set(0, 0, 0);
    for (const j of nbrs[i]) a.add(b.fromBufferAttribute(pos, j));
    a.divideScalar(nbrs[i].length);
    pos.setXYZ(i, a.x, a.y, a.z);
  }
}

// ---------- pose ----------

type Vec3 = [number, number, number];
interface JointAngles {
  /** Shoulder: [flexion about world X (negative = forward), 0,
   *  abduction from hanging (rad)]. */
  ls: Vec3;
  rs: Vec3;
  le: Vec3;
  re: Vec3;
  head: Vec3;
}

function poseTargets(pose: PoseId): JointAngles {
  const t: JointAngles = {
    ls: [0, 0, 0.1],
    rs: [0, 0, 0.1],
    le: [-0.08, 0, 0],
    re: [-0.08, 0, 0],
    head: [0, 0, 0],
  };
  switch (pose) {
    case 'wave':
      t.rs = [0, 0, 2.45];
      t.re = [-0.15, 0, 0];
      t.head = [0, 0, -0.05];
      break;
    case 'cheer':
      t.ls = [0, 0, 2.45];
      t.rs = [0, 0, 2.45];
      t.le = [0, 0, 0];
      t.re = [0, 0, 0];
      t.head = [-0.05, 0, 0];
      break;
    case 'peace':
      t.rs = [0, 0, 2.35];
      t.re = [-0.35, 0, 0];
      t.ls = [-0.2, 0, 0.3];
      t.le = [-0.5, 0, 0];
      t.head = [0, 0, -0.06];
      break;
    case 'relax':
      t.ls = [0.08, 0, 0.18];
      t.rs = [0.08, 0, 0.18];
      t.le = [-0.25, 0, 0];
      t.re = [-0.25, 0, 0];
      t.head = [0.04, 0.12, 0];
      break;
    case 'stand':
      break;
  }
  return t;
}

const AX = new THREE.Vector3(1, 0, 0);
const AY = new THREE.Vector3(0, 1, 0);
const AZ = new THREE.Vector3(0, 0, 1);

interface Joint {
  bone: THREE.Bone;
  rest: THREE.Quaternion;
  /** World X/Y/Z axes expressed in the bone's rest frame. */
  ax: THREE.Vector3;
  ay: THREE.Vector3;
  az: THREE.Vector3;
}

function makeJoint(bone: THREE.Bone): Joint {
  const inv = bone.getWorldQuaternion(new THREE.Quaternion()).invert();
  return {
    bone,
    rest: bone.quaternion.clone(),
    ax: AX.clone().applyQuaternion(inv),
    ay: AY.clone().applyQuaternion(inv),
    az: AZ.clone().applyQuaternion(inv),
  };
}

const qa = new THREE.Quaternion();
const qb = new THREE.Quaternion();
/** Set a joint to its rest orientation rotated about world axes. */
function setJoint(j: Joint, x: number, y: number, z: number): void {
  j.bone.quaternion.copy(j.rest);
  if (z) j.bone.quaternion.multiply(qa.setFromAxisAngle(j.az, z));
  if (x) j.bone.quaternion.multiply(qb.setFromAxisAngle(j.ax, x));
  if (y) j.bone.quaternion.multiply(qa.setFromAxisAngle(j.ay, y));
}

// ---------- rest-pose surface queries (accessory fitting) ----------

const SURF_CELL = 0.02;

interface RestSurface {
  pos: Float32Array;
  delta: Float32Array | null;
  grid: Map<string, number[]>;
}

function restMesh(m: THREE.Mesh, into?: RestSurface): RestSurface {
  const out: RestSurface = into ?? { pos: new Float32Array(0), delta: null, grid: new Map() };
  const p = m.geometry.getAttribute('position');
  const d = m.geometry.morphAttributes.position?.[0];
  const base = out.pos.length / 3;
  const pos = new Float32Array(out.pos.length + p.count * 3);
  pos.set(out.pos);
  const delta = d ? new Float32Array(p.count * 3) : out.delta;
  const lin = new THREE.Matrix3().setFromMatrix4(m.matrixWorld);
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
    pos.set([v.x, v.y, v.z], 3 * (base + i));
    if (d && delta) {
      v.fromBufferAttribute(d, i).applyMatrix3(lin);
      delta.set([v.x, v.y, v.z], 3 * i);
    }
    const key = `${Math.floor(v.x / SURF_CELL)},${Math.floor(v.y / SURF_CELL)}`;
    const k = base + i;
    const cell = out.grid.get(key);
    if (cell) cell.push(k);
    else out.grid.set(key, [k]);
  }
  out.pos = pos;
  out.delta = delta;
  return out;
}

function restSurface(f: { group: THREE.Object3D }, garments: boolean): RestSurface {
  let s: RestSurface = { pos: new Float32Array(0), delta: null, grid: new Map() };
  f.group.traverse((o) => {
    const m = o as THREE.SkinnedMesh;
    if (!m.isSkinnedMesh) return;
    const g = o.name.startsWith('G_') || o.parent?.name.startsWith('G_');
    if (Boolean(g) === garments) s = restMesh(m, s);
  });
  return s;
}

function posedSurface(meshes: THREE.SkinnedMesh[], frame: THREE.Object3D): RestSurface {
  let n = 0;
  for (const m of meshes) n += m.geometry.getAttribute('position').count;
  const pos = new Float32Array(n * 3);
  const grid = new Map<string, number[]>();
  const toFrame = new THREE.Matrix4();
  const v = new THREE.Vector3();
  let k = 0;
  for (const m of meshes) {
    toFrame.copy(frame.matrixWorld).invert().multiply(m.matrixWorld);
    const count = m.geometry.getAttribute('position').count;
    for (let i = 0; i < count; i++, k++) {
      m.getVertexPosition(i, v).applyMatrix4(toFrame);
      pos[3 * k] = v.x;
      pos[3 * k + 1] = v.y;
      pos[3 * k + 2] = v.z;
      const key = `${Math.floor(v.x / SURF_CELL)},${Math.floor(v.y / SURF_CELL)}`;
      const cell = grid.get(key);
      if (cell) cell.push(k);
      else grid.set(key, [k]);
    }
  }
  return { pos, delta: null, grid };
}

function frontOf(s: RestSurface, x: number, y: number, morph = 0, r = 0.012): number {
  let z = -Infinity;
  const reach = Math.ceil(r / SURF_CELL);
  const cx = Math.floor(x / SURF_CELL);
  const cy = Math.floor(y / SURF_CELL);
  for (let dx = -reach; dx <= reach; dx++)
    for (let dy = -reach; dy <= reach; dy++)
      for (const k of s.grid.get(`${cx + dx},${cy + dy}`) ?? []) {
        if (Math.abs(s.pos[3 * k] - x) > r || Math.abs(s.pos[3 * k + 1] - y) > r) continue;
        z = Math.max(z, s.pos[3 * k + 2] + (s.delta && morph ? s.delta[3 * k + 2] * morph : 0));
      }
  return z;
}

function topOf(s: RestSurface, x: number, yMax: number): number {
  let y = -Infinity;
  for (let k = 0; k < s.pos.length / 3; k++) {
    const py = s.pos[3 * k + 1];
    if (py < yMax && Math.abs(s.pos[3 * k] - x) < 0.012 && Math.abs(s.pos[3 * k + 2]) < 0.05) y = Math.max(y, py);
  }
  return y;
}

/** Extent of the body's horizontal slice at height y (|x| < maxX). */
function slice(s: RestSurface, y: number, dy: number, maxX: number, maxZ = Infinity) {
  const out = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity };
  for (let k = 0; k < s.pos.length / 3; k++) {
    const x = s.pos[3 * k];
    const z = s.pos[3 * k + 2];
    if (Math.abs(s.pos[3 * k + 1] - y) > dy || Math.abs(x) > maxX || z > maxZ) continue;
    out.minX = Math.min(out.minX, x);
    out.maxX = Math.max(out.maxX, x);
    out.minZ = Math.min(out.minZ, z);
    out.maxZ = Math.max(out.maxZ, z);
  }
  return out;
}

// ---------- the rig ----------

interface LoadedFigure {
  id: FigureId;
  group: THREE.Group;
  bones: Map<string, THREE.Bone>;
  src: SourceJoints;
  joints: Record<'lua' | 'rua' | 'lla' | 'rla' | 'head', Joint>;
  /** Rest abduction of each upper arm (the source is an A-pose). */
  restAbd: { l: number; r: number };
  body: THREE.MeshPhysicalMaterial;
  garments: Map<string, THREE.SkinnedMesh>;
  materials: Map<string, THREE.MeshPhysicalMaterial>;
  /** The body and base-layer meshes whose covered triangles are
   *  left out, with their full triangle lists. */
  masked: { mesh: THREE.SkinnedMesh; full: ArrayLike<number>; cover: Map<string, Uint8Array> }[];
}

/** Give a mesh its own index over the shared vertex data, so one
 *  rig can leave triangles out without touching another rig. */
function ownIndex(m: THREE.SkinnedMesh): ArrayLike<number> | null {
  const src = m.geometry;
  if (!src.index) return null;
  const geo = new THREE.BufferGeometry();
  for (const [name, attr] of Object.entries(src.attributes)) geo.setAttribute(name, attr);
  geo.setIndex(src.index.clone());
  geo.boundingSphere = src.boundingSphere;
  m.geometry = geo;
  return src.index.array;
}

const PROBE_HIDDEN = new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.DoubleSide });
const PROBE_BODY = new THREE.MeshBasicMaterial({ color: '#ff00ff', toneMapped: false });
const PROBE_BASE = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide });

export function buildAvatar(
  initial: CharacterParams,
  figure: FigureId = 'a',
  legRatio: LegRatio = 'standard',
  /** Leave out the body surface under worn garments (off for export:
   *  an exported figure keeps its whole body). */
  maskBody = true,
): AvatarRig {
  const root = new THREE.Group();
  root.name = 'avatar';
  const head = new THREE.Group();
  head.name = 'head';
  const hatAnchor = new THREE.Group();
  const glassesAnchor = new THREE.Group();
  const neckAnchor = new THREE.Group();
  const bagAnchor = new THREE.Group();
  const torsoAnchor = new THREE.Group();
  const bottomAnchor = new THREE.Group();
  const shoesAnchor = new THREE.Group();
  head.add(hatAnchor, glassesAnchor);
  root.add(head, neckAnchor, bagAnchor, torsoAnchor, bottomAnchor, shoesAnchor);
  // The stage podium's top surface sits at y=0.12 (see scene.ts).
  root.position.y = PODIUM_TOP;

  let character = initial;
  let leg = legRatio;
  let current: LoadedFigure | null = null;
  let standY = 0;
  const footRest = new Map<string, THREE.Quaternion>();
  const heels = new THREE.Group();
  heels.name = 'pump-heels';
  root.add(heels);
  let worn: WornGarments | null = null;
  let scales: BoneScales | null = null;
  let fitCache: AccessoryFit | null = null;
  let probing = false;
  let maskedCount = 0;
  let target = poseTargets('stand');
  const now: JointAngles = poseTargets('stand');
  let gazeYaw = 0;
  let gazePitch = 0;

  const rig: AvatarRig = {
    root,
    head,
    hatAnchor,
    glassesAnchor,
    neckAnchor,
    bagAnchor,
    torsoAnchor,
    bottomAnchor,
    shoesAnchor,
    topMaterial: garmentMaterial('tee'),
    fit: () => (current ? (fitCache ??= measureFit(current)) : null),
    ready: Promise.resolve(),
    figure: () => current?.id ?? figure,
    applyPose(pose) {
      target = poseTargets(pose);
    },
    setCharacter(next) {
      character = next;
      applyCharacter();
    },
    setBody(fig, nextLeg) {
      leg = nextLeg;
      if (current && current.id === fig) {
        applyCharacter();
        return Promise.resolve();
      }
      figure = fig;
      rig.ready = mount(fig);
      return rig.ready;
    },
    setGarments(next) {
      worn = next;
      applyGarments();
    },
    garmentLengths() {
      if (!current || !scales || !worn) return [];
      const lm = landmarks(character.height, leg);
      const out: GarmentLength[] = [];
      const add = (slot: GarmentLength['slot'], style: GarmentLength['style']) => {
        if (style === 'none' || !current || !scales) return;
        const y = mapSourceHeight(current.src, scales, GARMENT_HEM[style] * current.src.height);
        out.push({ slot, style, label: describeLength(y, lm) });
      };
      add('top', worn.top);
      add('outer', worn.outer);
      if (!isDress(worn.top)) add('bottom', worn.bottom);
      return out;
    },
    probeLeaks(on) {
      if (!current) return;
      probing = on;
      for (const [id, m] of current.garments) m.material = on ? (id === 'base' ? PROBE_BASE : PROBE_HIDDEN) : current.materials.get(id)!;
      for (const { mesh } of current.masked) if (mesh !== current.garments.get('base')) mesh.material = on ? PROBE_BODY : current.body;
      applyMask();
    },
    maskedTriangles: () => maskedCount,
    tick,
  };

  async function mount(fig: FigureId): Promise<void> {
    const asset = await loadFigure(fig);
    if (figure !== fig) return;
    const loaded = prepare(fig, asset);
    if (current) {
      // Re-home anchors before the old figure is dropped.
      for (const a of [head, neckAnchor, bagAnchor, torsoAnchor, bottomAnchor, shoesAnchor]) root.add(a);
      root.remove(current.group);
    }
    current = loaded;
    root.add(loaded.group);
    attachAnchors(loaded);
    applyCharacter();
    applyGarments();
    rig.onMount?.();
  }

  function prepare(fig: FigureId, asset: FigureAsset): LoadedFigure {
    // Clone per rig so the export path can build a throwaway rig
    // without disturbing the live one.
    const group = cloneSkinned(asset.scene);
    group.name = `mannequin-${fig}`;
    group.updateMatrixWorld(true);
    const bones = new Map<string, THREE.Bone>();
    const garments = new Map<string, THREE.SkinnedMesh>();
    const materials = new Map<string, THREE.MeshPhysicalMaterial>();
    const body = new THREE.MeshPhysicalMaterial({
      name: 'mannequin',
      color: MANNEQUIN_BASE.clone(),
      roughness: 0.46,
      metalness: 0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
      normalMap: asset.normal,
      aoMap: asset.ao,
      aoMapIntensity: 0.85,
      envMapIntensity: 0.7,
    });
    const box = new THREE.Box3();
    let eyeBox: THREE.Box3 | null = null;
    const masked: LoadedFigure['masked'] = [];
    const mask = (m: THREE.SkinnedMesh, kind: 'body' | 'base') => {
      const full = maskBody ? ownIndex(m) : null;
      if (full) masked.push({ mesh: m, full, cover: asset.cover[kind] });
    };
    group.traverse((o) => {
      if ((o as THREE.Bone).isBone) bones.set(o.name, o as THREE.Bone);
      const m = o as THREE.SkinnedMesh;
      if (!m.isSkinnedMesh) return;
      m.frustumCulled = false;
      m.castShadow = true;
      m.receiveShadow = true;
      const matName = (m.material as THREE.Material).name;
      if (o.name.startsWith('G_') || o.parent?.name.startsWith('G_')) {
        const id = (o.name.startsWith('G_') ? o.name : o.parent!.name).slice(2);
        const mat = id === 'base' ? baseMaterial() : garmentMaterial(id);
        m.material = mat;
        materials.set(id, mat);
        garments.set(id, m);
        m.visible = id === 'base';
        if (id === 'base') mask(m, 'base');
      } else {
        if (matName === 'mannequin') mask(m, 'body');
        m.material = body;
        m.geometry.computeBoundingBox();
        const b = m.geometry.boundingBox!.clone().applyMatrix4(m.matrixWorld);
        box.union(b);
        if (matName === 'eye') eyeBox = b;
      }
    });
    const bone = (n: string) => {
      const b = bones.get(n);
      if (!b) throw new Error(`mannequin bone missing: ${n}`);
      return b;
    };
    const wp = (n: string) => bone(n).getWorldPosition(new THREE.Vector3());
    const height = box.max.y;
    const hand = wp('leftHand');
    const lower = wp('leftLowerArm');
    const upper = wp('leftUpperArm');
    const src: SourceJoints = {
      height,
      ankle: wp('leftFoot').y,
      knee: wp('leftLowerLeg').y,
      hipJoint: wp('leftUpperLeg').y,
      spine: wp('spine').y,
      shoulderJoint: upper.y,
      head: wp('head').y,
      crotch: CROTCH_FRAC[fig] * height,
      upperArmLen: upper.distanceTo(lower),
      // forearm + hand (wrist to fingertip ≈ 0.096 H)
      lowerArmLen: lower.distanceTo(hand) + 0.096 * height,
    };
    const abd = (side: 'left' | 'right') => {
      const d = wp(`${side}LowerArm`).sub(wp(`${side}UpperArm`));
      return Math.atan2(Math.abs(d.x), -d.y);
    };
    const loaded: LoadedFigure = {
      id: fig,
      group,
      bones,
      src,
      joints: {
        lua: makeJoint(bone('leftUpperArm')),
        rua: makeJoint(bone('rightUpperArm')),
        lla: makeJoint(bone('leftLowerArm')),
        rla: makeJoint(bone('rightLowerArm')),
        head: makeJoint(bone('head')),
      },
      restAbd: { l: abd('left'), r: abd('right') },
      body,
      garments,
      materials,
      masked,
    };
    (loaded as LoadedFigure & { eyeBox: THREE.Box3 | null; box: THREE.Box3 }).eyeBox = eyeBox;
    (loaded as LoadedFigure & { box: THREE.Box3 }).box = box;
    return loaded;
  }

  function attachAnchors(f: LoadedFigure): void {
    // Anchors are placed at rest (identity root, unscaled bones) in
    // world space and then attached, so they inherit pose and
    // calibration from their bone.
    const g = f.group;
    const saved = { p: root.position.clone(), q: root.quaternion.clone(), s: root.scale.clone() };
    root.position.set(0, 0, 0);
    root.quaternion.identity();
    root.scale.set(1, 1, 1);
    g.position.set(0, 0, 0);
    g.scale.set(1, 1, 1);
    for (const b of f.bones.values()) b.scale.set(1, 1, 1);
    for (const j of Object.values(f.joints)) j.bone.quaternion.copy(j.rest);
    footRest.clear();
    for (const n of FOOT_BONES) {
      const bone = f.bones.get(n);
      if (bone) footRest.set(n, bone.quaternion.clone());
    }
    root.updateMatrixWorld(true);
    const ext = f as LoadedFigure & { eyeBox: THREE.Box3 | null; box: THREE.Box3 };
    const body = restSurface(f, false);
    const headBone = f.bones.get('head')!;
    const hb = headBone.getWorldPosition(new THREE.Vector3());
    const eye = ext.eyeBox ?? new THREE.Box3(new THREE.Vector3(-0.04, hb.y + 0.09, hb.z + 0.05), new THREE.Vector3(0.04, hb.y + 0.11, hb.z + 0.09));
    const place = (a: THREE.Object3D, parent: THREE.Object3D, x: number, y: number, z: number) => {
      root.add(a);
      a.position.set(x, y, z);
      a.quaternion.identity();
      a.scale.set(1, 1, 1);
      a.updateMatrixWorld(true);
      parent.attach(a);
    };
    place(head, headBone, 0, hb.y, hb.z);
    // hat and glasses are children of head: local offsets
    // The hats were modelled on a cranium centred 0.12 m below the
    // anchor with radii (0.079, 0.072, 0.096); fit that to this head.
    const top = ext.box.max.y;
    const sliceY = top - 0.08;
    const cran = slice(body, sliceY, 0.01, 0.12);
    const crz = (cran.maxZ - cran.minZ) / 2;
    const sx = (cran.maxX + 0.003) / 0.079;
    const sy = (top - sliceY + 0.003) / 0.072;
    const sz = (crz + 0.003) / 0.096;
    hatAnchor.scale.set(sx, sy, sz);
    hatAnchor.position.set(0, sliceY - hb.y + 0.12 * sy, (cran.minZ + cran.maxZ) / 2 - hb.z + 0.002 * sz);
    glassesAnchor.position.set(0, (eye.min.y + eye.max.y) / 2 - hb.y, eye.max.z - hb.z + 0.006);
    const neck = f.bones.get('neck')!.getWorldPosition(new THREE.Vector3());
    place(neckAnchor, f.bones.get('upperChest')!, 0, neck.y - 0.005, neck.z + 0.005);
    const hips = f.bones.get('hips')!.getWorldPosition(new THREE.Vector3());
    place(bagAnchor, f.bones.get('hips')!, hips.x, hips.y, hips.z);
    place(torsoAnchor, f.bones.get('chest')!, 0, f.bones.get('chest')!.getWorldPosition(new THREE.Vector3()).y, 0);
    place(bottomAnchor, f.bones.get('hips')!, 0, hips.y, 0);
    place(shoesAnchor, g, 0, 0, 0);
    fitCache = null;
    root.position.copy(saved.p);
    root.quaternion.copy(saved.q);
    root.scale.copy(saved.s);
  }

  /** Body and worn-cloth surfaces as they stand now (calibrated,
   *  posed, morphed), in the avatar root's frame, for fitting
   *  accessories that drape over them. */
  function measureFit(f: LoadedFigure): AccessoryFit {
    root.updateMatrixWorld(true);
    const bodyMeshes: THREE.SkinnedMesh[] = [];
    f.group.traverse((o) => {
      const m = o as THREE.SkinnedMesh;
      if (m.isSkinnedMesh && !o.name.startsWith('G_') && !o.parent?.name.startsWith('G_')) bodyMeshes.push(m);
    });
    const body = posedSurface(bodyMeshes, root);
    const clothes = posedSurface([...f.garments.values()].filter((m) => m.visible), root);
    const at = (name: string) => root.worldToLocal(f.bones.get(name)!.getWorldPosition(new THREE.Vector3()));
    const neck = at('neck');
    const hips = at('hips');
    const shoulderX = at('leftUpperArm').x * 0.75;
    // Just above the neck joint, clear of the shoulders and under the chin.
    const neckRing = slice(body, neck.y + 0.03, 0.006, 0.08, frontOf(body, 0, neck.y, 0, 0.02) + 0.008);
    // The front surface over whatever is worn. The search widens where
    // the mesh is sparse; a hit far behind the body means it only
    // found the back, so it widens further.
    const frontZ = (x: number, y: number) => {
      for (const r of [0.012, 0.024, 0.04]) {
        const z = Math.max(frontOf(body, x, y, 0, r), frontOf(clothes, x, y, 0, r));
        if (z > neck.z - 0.04) return z;
      }
      return neck.z + 0.06;
    };
    const into = (a: THREE.Object3D) => (v: THREE.Vector3) => a.worldToLocal(root.localToWorld(v.clone()));
    return {
      frontZ,
      toNeck: into(neckAnchor),
      toBag: into(bagAnchor),
      neck: {
        y: neck.y + 0.03,
        z: (neckRing.minZ + neckRing.maxZ) / 2,
        rx: Math.max(-neckRing.minX, neckRing.maxX),
        rz: (neckRing.maxZ - neckRing.minZ) / 2,
      },
      neckY: neck.y,
      hipsY: hips.y,
      shoulderTopY: topOf(body, shoulderX, neck.y + 0.02),
    };
  }

  function applyCharacter(): void {
    if (!current) return;
    const f = current;
    const s = solveBoneScales(f.src, character.height, leg);
    scales = s;
    const b = (n: string) => f.bones.get(n);
    f.group.scale.setScalar(s.root);
    // Feet stay on the floor: the pelvis rises by the leg change.
    const hipT = landmarks(character.height, leg).crotch + (f.src.hipJoint - f.src.crotch) * s.root;
    fitCache = null;
    standY = hipT - f.src.hipJoint * s.root;
    f.group.position.y = standY;
    for (const side of ['left', 'right']) {
      b(`${side}UpperLeg`)?.scale.setScalar(s.upperLeg);
      b(`${side}LowerLeg`)?.scale.setScalar(s.lowerLeg);
      b(`${side}Foot`)?.scale.setScalar(s.foot);
      b(`${side}Shoulder`)?.scale.setScalar(s.shoulder);
      b(`${side}UpperArm`)?.scale.setScalar(s.upperArm);
      b(`${side}LowerArm`)?.scale.setScalar(s.lowerArm);
      b(`${side}Hand`)?.scale.setScalar(s.hand);
    }
    b('spine')?.scale.setScalar(s.spine);
    b('neck')?.scale.setScalar(s.neck);
    b('head')?.scale.setScalar(s.head);
    // The satin finish takes a hint of the chosen tone.
    f.body.color.copy(MANNEQUIN_BASE).lerp(new THREE.Color(skinColorForTone(character.skinTone)), 0.35);
    applyHeels();
    rig.onMount?.();
  }

  /** Pumps raise the heel: the feet flex at the ankle with the toes
   *  flat, the figure rises so the balls of the feet stay on the
   *  floor, and a heel post fills the gap under each heel. */
  function applyHeels(): void {
    if (!current) return;
    const f = current;
    for (const [n, q] of footRest) f.bones.get(n)?.quaternion.copy(q);
    f.group.position.y = standY;
    for (const c of [...heels.children]) {
      heels.remove(c);
      (c as THREE.Mesh).geometry.dispose();
    }
    const mat = f.materials.get('shoesLow');
    if (!worn || worn.shoes !== 'pumps' || !mat) return;
    root.updateMatrixWorld(true);
    const ball = (side: string) => f.bones.get(`${side}Toes`)!.getWorldPosition(new THREE.Vector3()).y;
    const before = ball('left') + ball('right');
    const across = new THREE.Vector3(1, 0, 0).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion()));
    const flex = (bone: THREE.Bone, angle: number) => {
      const parentQ = bone.parent!.getWorldQuaternion(new THREE.Quaternion()).invert();
      bone.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(across.clone().applyQuaternion(parentQ), angle));
      bone.updateMatrixWorld(true);
    };
    for (const side of ['left', 'right']) {
      flex(f.bones.get(`${side}Foot`)!, PUMP_FLEX);
      flex(f.bones.get(`${side}Toes`)!, -PUMP_FLEX);
    }
    const drop = (before - ball('left') - ball('right')) / 2;
    f.group.position.y = standY + drop / root.getWorldScale(new THREE.Vector3()).y;
    root.updateMatrixWorld(true);
    // Each post stands under the back of the posed shoe's sole.
    const shoe = f.garments.get('shoesLow')!;
    const pos = shoe.geometry.getAttribute('position');
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      pts.push(root.worldToLocal(shoe.localToWorld(shoe.getVertexPosition(i, new THREE.Vector3()))));
    }
    for (const side of ['left', 'right']) {
      const fx = root.worldToLocal(f.bones.get(`${side}Foot`)!.getWorldPosition(new THREE.Vector3())).x;
      const mine = pts.filter((p) => Math.abs(p.x - fx) < 0.06);
      if (!mine.length) continue;
      const back = Math.min(...mine.map((p) => p.z));
      const heel = mine.filter((p) => p.z < back + 0.03);
      const top = heel.reduce((lo, p) => (p.y < lo.y ? p : lo));
      if (top.y < 0.01) continue;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.005, top.y + 0.004, 14), mat);
      post.position.set(top.x, (top.y + 0.004) / 2, back + 0.016);
      post.castShadow = true;
      heels.add(post);
    }
  }

  /** Leave out the body triangles whose three corners are all under
   *  a worn garment (the always-worn base layer included), by
   *  collapsing them in the index. The base layer itself is always
   *  drawn whole (LEGAL-ETHICS J-10). The probe draws the opposite
   *  body triangles and marks the covered base-layer vertices. */
  function applyMask(): void {
    if (!current) return;
    if (!probing) maskedCount = 0;
    for (const { mesh, full, cover } of current.masked) {
      const isBase = mesh === current.garments.get('base');
      const index = mesh.geometry.index!;
      const out = index.array;
      const flags = [...current.garments].filter(([id, g]) => g.visible && cover.has(id)).map(([id]) => cover.get(id)!);
      const covered = (i: number) => flags.some((f) => f[i]);
      if (isBase) {
        if (!probing) continue;
        const count = mesh.geometry.getAttribute('position').count;
        const color = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) if (covered(i)) color.set([0, 1, 1], 3 * i);
        mesh.geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
        continue;
      }
      for (let t = 0; t < full.length; t += 3) {
        const hidden = covered(full[t]) && covered(full[t + 1]) && covered(full[t + 2]);
        const drop = probing ? !hidden : hidden;
        if (hidden && !probing) maskedCount++;
        out[t] = full[t];
        out[t + 1] = drop ? full[t] : full[t + 1];
        out[t + 2] = drop ? full[t] : full[t + 2];
      }
      index.needsUpdate = true;
    }
  }

  function applyGarments(): void {
    if (!current || !worn) return;
    const show = new Set<string>(['base', worn.top]);
    if (worn.outer !== 'none') show.add(worn.outer);
    if (!isDress(worn.top) && worn.bottom !== 'none') show.add(worn.bottom);
    const shoe = worn.shoes === 'sneakers' ? 'sneakers' : worn.shoes === 'boots' ? 'boots' : 'shoesLow';
    show.add(shoe);
    for (const [id, m] of current.garments) {
      m.visible = show.has(id);
      if (m.morphTargetInfluences) m.morphTargetInfluences[0] = worn.outer !== 'none' && TOP_IDS.has(id) ? 1 : 0;
    }
    const color = (id: string, c: string) => {
      const mat = current!.materials.get(id);
      if (!mat) return;
      mat.color.set(c);
      mat.sheenColor.set(c).lerp(new THREE.Color('#ffffff'), 0.35);
    };
    color(worn.top, worn.topColor);
    if (worn.outer !== 'none') color(worn.outer, worn.outerColor);
    if (worn.bottom !== 'none') color(worn.bottom, worn.bottomColor);
    color(shoe, worn.shoeColor);
    fitCache = null;
    applyMask();
    const shoeMat = current.materials.get('shoesLow');
    if (shoeMat) {
      // Pumps are patent; flats are a softer leather.
      const pumps = worn.shoes === 'pumps';
      shoeMat.roughness = pumps ? 0.16 : FABRIC.shoesLow.roughness;
      shoeMat.clearcoat = pumps ? 1 : (FABRIC.shoesLow.clearcoat ?? 0);
    }
    applyHeels();
    const top = current.materials.get(worn.top);
    if (top) rig.topMaterial = top;
  }

  function tick(timeSec: number, gazeTarget?: THREE.Vector3): void {
    if (!current) return;
    const k = 0.12;
    const ease = (a: Vec3, b: Vec3) => {
      for (let i = 0; i < 3; i++) a[i] += (b[i] - a[i]) * k;
    };
    ease(now.ls, target.ls);
    ease(now.rs, target.rs);
    ease(now.le, target.le);
    ease(now.re, target.re);
    ease(now.head, target.head);
    const j = current.joints;
    // Breathing and a slow weight shift keep the figure alive.
    const breath = Math.sin(timeSec * 1.6) * 0.012;
    setJoint(j.lua, now.ls[0], 0, now.ls[2] - current.restAbd.l + breath);
    setJoint(j.rua, now.rs[0], 0, -(now.rs[2] - current.restAbd.r + breath));
    setJoint(j.lla, now.le[0], 0, 0);
    setJoint(j.rla, now.re[0], 0, 0);
    if (gazeTarget) {
      const hp = head.getWorldPosition(new THREE.Vector3());
      const d = gazeTarget.clone().sub(hp);
      const yaw = THREE.MathUtils.clamp(Math.atan2(d.x, d.z), -0.45, 0.45);
      const pitch = THREE.MathUtils.clamp(-Math.atan2(d.y, Math.hypot(d.x, d.z)), -0.2, 0.2);
      gazeYaw += (yaw * 0.6 - gazeYaw) * 0.05;
      gazePitch += (pitch * 0.5 - gazePitch) * 0.05;
    } else {
      gazeYaw *= 0.95;
      gazePitch *= 0.95;
    }
    setJoint(j.head, now.head[0] + gazePitch, now.head[1] + gazeYaw, now.head[2]);
    current.group.rotation.y = Math.sin(timeSec * 0.31) * 0.015;
  }

  rig.ready = mount(figure);
  return rig;
}

function baseMaterial(): THREE.MeshPhysicalMaterial {
  const maps = fabricMaps({ roughness: 0.8, sheen: 0, sheenRoughness: 0.5, repeat: 16, bump: 0.2 });
  return new THREE.MeshPhysicalMaterial({
    name: 'base',
    color: '#2f2b29',
    bumpMap: maps.bump,
    bumpScale: 0.2,
    roughness: 0.78,
    sheen: 0.4,
    sheenRoughness: 0.7,
    sheenColor: new THREE.Color('#6b6560'),
    envMapIntensity: 0.4,
    side: THREE.DoubleSide,
  });
}

/** Deep-clone a glTF scene, re-binding every SkinnedMesh to the cloned
 *  bones (Object3D.clone keeps the original skeleton). */
function cloneSkinned(src: THREE.Object3D): THREE.Group {
  const map = new Map<THREE.Object3D, THREE.Object3D>();
  const clone = src.clone(true);
  const a: THREE.Object3D[] = [];
  const b: THREE.Object3D[] = [];
  src.traverse((o) => a.push(o));
  clone.traverse((o) => b.push(o));
  a.forEach((o, i) => map.set(o, b[i]));
  clone.traverse((o) => {
    const m = o as THREE.SkinnedMesh;
    if (!m.isSkinnedMesh) return;
    const sk = m.skeleton;
    const bones = sk.bones.map((bone) => map.get(bone) as THREE.Bone);
    m.bind(new THREE.Skeleton(bones, sk.boneInverses), m.bindMatrix);
  });
  return clone as THREE.Group;
}
