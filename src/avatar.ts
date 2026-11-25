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
import {
  FIT_PART_COUNT,
  applyFitField,
  computePartOffsets,
  fitPartForBone,
  fitPartIndex,
  type GarmentFitField,
} from './fitoffset';
import { isDress, type BottomStyle, type OuterStyle, type PoseId, type ShoeStyle, type TopStyle } from './outfit';
import {
  buildSpringBoneSpec,
  createSpringBoneRuntime,
  isFlowingHemGarment,
  reweightHemVertices,
  type FlowingHemBounds,
  type SpringBoneRuntime,
  type Vec3Tuple,
} from './springbone';
import { fabricTextures, garmentNormalTexture, leatherTextures, ribbedBump } from './textures';

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
  /** Current Verlet spring-bone state (active segments and max deflection). */
  springState(): { segments: number; maxDeflectionRad: number };
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
  /** Strength of the wrinkle and hem normal map (normalScale);
   *  absent = the item has none (footwear). */
  crease?: number;
}

const FABRIC: Record<string, FabricSpec> = {
  tee: { roughness: 0.88, sheen: 0.35, sheenRoughness: 0.8, repeat: 14, bump: 0.25, crease: 0.8 },
  hoodie: { roughness: 0.95, sheen: 0.65, sheenRoughness: 0.9, repeat: 10, bump: 0.35, crease: 0.9 },
  blouse: { roughness: 0.42, sheen: 0.45, sheenRoughness: 0.35, repeat: 18, bump: 0.12, crease: 1.0 },
  dress: { roughness: 0.62, sheen: 0.4, sheenRoughness: 0.5, repeat: 16, bump: 0.15, crease: 0.9 },
  dressLong: { roughness: 0.55, sheen: 0.45, sheenRoughness: 0.45, repeat: 16, bump: 0.15, crease: 0.9 },
  jacket: { roughness: 0.78, sheen: 0.45, sheenRoughness: 0.7, repeat: 12, bump: 0.3, crease: 0.6 },
  coat: { roughness: 0.86, sheen: 0.6, sheenRoughness: 0.8, repeat: 10, bump: 0.35, crease: 0.6 },
  cardigan: { roughness: 0.96, sheen: 0.7, sheenRoughness: 0.9, repeat: 1, bump: 0.6, kind: 'knit', crease: 0.8 },
  pants: { roughness: 0.84, sheen: 0.25, sheenRoughness: 0.8, repeat: 14, bump: 0.35, crease: 0.8 },
  shorts: { roughness: 0.84, sheen: 0.25, sheenRoughness: 0.8, repeat: 14, bump: 0.35, crease: 0.7 },
  skirt: { roughness: 0.7, sheen: 0.4, sheenRoughness: 0.6, repeat: 6, bump: 0.2, crease: 0.8 },
  skirtLong: { roughness: 0.6, sheen: 0.45, sheenRoughness: 0.5, repeat: 6, bump: 0.15, crease: 0.9 },
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

/** A garment's open edges (hems, cuffs, neckline, front opening) in
 *  UV space, four numbers per edge. Vertices are welded by position
 *  first, so a UV or normal seam does not count as an edge. */
export function openEdgeUvs(geometry: THREE.BufferGeometry): number[] {
  const pos = geometry.getAttribute('position');
  const uv = geometry.getAttribute('uv');
  const index = geometry.getIndex();
  if (!uv || !index) return [];
  const welded = new Map<string, number>();
  const id = (i: number) => {
    const key = `${Math.round(pos.getX(i) * 1e5)},${Math.round(pos.getY(i) * 1e5)},${Math.round(pos.getZ(i) * 1e5)}`;
    let w = welded.get(key);
    if (w === undefined) welded.set(key, (w = welded.size));
    return w;
  };
  const edges = new Map<string, { a: number; b: number; uses: number }>();
  for (let t = 0; t < index.count; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = index.getX(t + k);
      const b = index.getX(t + ((k + 1) % 3));
      const wa = id(a);
      const wb = id(b);
      if (wa === wb) continue;
      const key = wa < wb ? `${wa}_${wb}` : `${wb}_${wa}`;
      const edge = edges.get(key);
      if (edge) edge.uses += 1;
      else edges.set(key, { a, b, uses: 1 });
    }
  }
  const out: number[] = [];
  for (const { a, b, uses } of edges.values()) {
    if (uses === 1) out.push(uv.getX(a), uv.getY(a), uv.getX(b), uv.getY(b));
  }
  return out;
}

// One wrinkle-and-hem normal map per garment geometry; rigs (and the
// export rig) share it.
const creaseCache = new Map<string, THREE.Texture>();
function creaseNormalMap(id: string, geometry: THREE.BufferGeometry): THREE.Texture {
  let tex = creaseCache.get(geometry.uuid);
  if (!tex) {
    let seed = 7;
    for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
    // A garment whose UVs span more than one tile (long skirts, the
    // open-front shells) is squeezed into one, so a hem cannot wrap
    // round and show up across the middle of the cloth.
    const uv = geometry.getAttribute('uv');
    const box = new THREE.Box2();
    for (let i = 0; i < uv.count; i++) box.expandByPoint(new THREE.Vector2(uv.getX(i), uv.getY(i)));
    const repeat = new THREE.Vector2(1 / Math.max(1, box.max.x - box.min.x), 1 / Math.max(1, box.max.y - box.min.y));
    const offset = new THREE.Vector2(repeat.x < 1 ? -box.min.x * repeat.x : 0, repeat.y < 1 ? -box.min.y * repeat.y : 0);
    const edges = openEdgeUvs(geometry).map((x, i) => (i % 2 === 0 ? x * repeat.x + offset.x : x * repeat.y + offset.y));
    tex = garmentNormalTexture(edges, seed);
    tex.repeat.copy(repeat);
    tex.offset.copy(offset);
    creaseCache.set(geometry.uuid, tex);
  }
  return tex;
}

/** three.js reads either a normal map or a bump map, never both.
 *  Garments need both: the weave stays on the tiled bump map and the
 *  wrinkles and hems come from the normal map, so the bump is applied
 *  on top of the mapped normal. Throws if the chunk changed shape. */
const BUMP_BRANCH = '#elif defined( USE_BUMPMAP )';
export function creaseNormalChunk(): string {
  const chunk = THREE.ShaderChunk.normal_fragment_maps;
  if (chunk.split(BUMP_BRANCH).length !== 2) throw new Error('crease normals: bump branch not found');
  return chunk.replace(BUMP_BRANCH, '#endif\n#if defined( USE_BUMPMAP )');
}

function garmentMaterial(name: string, geometry?: THREE.BufferGeometry): THREE.MeshPhysicalMaterial {
  const spec = FABRIC[name] ?? FABRIC.tee;
  const maps = fabricMaps(spec);
  const mat = garmentMaterialBase(name, spec, maps);
  if (spec.crease && geometry) {
    mat.normalMap = creaseNormalMap(name, geometry);
    mat.normalScale.setScalar(spec.crease);
    const chunk = creaseNormalChunk();
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', chunk);
    };
    mat.customProgramCacheKey = () => 'crease-normals';
  }
  return mat;
}

function garmentMaterialBase(
  name: string,
  spec: FabricSpec,
  maps: { map?: THREE.Texture; bump: THREE.Texture },
): THREE.MeshPhysicalMaterial {
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

// ---- hair material design rule (backlog #17) ----
// All hair materials MUST render as alpha-tested cutout (`alphaTest`,
// glTF `alphaMode: "MASK"`), NEVER transparent alpha blending
// (`transparent: true` / glTF `"BLEND"`). Layered hair cards with
// alpha blending cause severe overdraw and sort-order artefacts on
// mobile/standalone XR GPUs (Quest). Always construct hair materials
// through `createHairMaterial` or normalize imported ones through
// `applyHairCutoutRule`.
export const HAIR_ALPHA_TEST = 0.5;

/** Enforce cutout (alphaTest) rendering on a hair material: disables
 *  alpha blending, writes depth, and sets the standard alphaTest
 *  cutoff so overlapping hair layers avoid transparency overdraw. */
export function applyHairCutoutRule<T extends THREE.Material>(material: T): T {
  material.transparent = false;
  material.alphaTest = HAIR_ALPHA_TEST;
  material.depthWrite = true;
  material.side = THREE.DoubleSide;
  material.needsUpdate = true;
  return material;
}

/** Build a standard cutout hair material following the alphaTest
 *  design rule (no transparent blending). */
export function createHairMaterial(
  color: THREE.ColorRepresentation,
  maps?: { map?: THREE.Texture | null; bump?: THREE.Texture | null; alphaMap?: THREE.Texture | null },
): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    name: 'hair',
    color,
    map: maps?.map ?? null,
    bumpMap: maps?.bump ?? null,
    bumpScale: maps?.bump ? 0.015 : 0,
    alphaMap: maps?.alphaMap ?? null,
    roughness: 0.55,
    metalness: 0,
    sheen: 0.35,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color('#ffffff'),
    envMapIntensity: 0.55,
  });
  return applyHairCutoutRule(mat);
}

function isHairMesh(obj: THREE.Object3D, matName: string): boolean {
  return obj.name.startsWith('H_') || !!obj.parent?.name.startsWith('H_') || /hair/i.test(matName);
}

// ---- skin wrap lighting ----
// A cheap stand-in for subsurface scattering, on the body material
// only: direct diffuse light wraps past the terminator instead of
// cutting off at 90 degrees, and the band where the light grazes the
// surface takes a reddish tint. Specular, clearcoat and indirect
// light are untouched. No extra texture, pass or uniform.
/** How far past the terminator the diffuse term reaches (0 = Lambert). */
export const SKIN_WRAP = 0.25;
/** Linear tint at the centre of the grazing band. */
export const SKIN_SCATTER_TINT = new THREE.Color(1, 0.42, 0.32);
const SKIN_DIFFUSE_LINE = 'reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );';

/** The physical lighting chunk with the direct diffuse line swapped
 *  for the wrapped one. Throws if three.js no longer has that line,
 *  so an upgrade cannot silently drop the effect. */
export function skinWrapLightingChunk(): string {
  const chunk = THREE.ShaderChunk.lights_physical_pars_fragment;
  if (chunk.split(SKIN_DIFFUSE_LINE).length !== 2) throw new Error('skin wrap: direct diffuse line not found');
  const t = SKIN_SCATTER_TINT;
  return chunk.replace(
    SKIN_DIFFUSE_LINE,
    `float skinNL = dot( geometryNormal, directLight.direction );
	float skinWrap = saturate( ( skinNL + ${SKIN_WRAP.toFixed(3)} ) / ${(1 + SKIN_WRAP).toFixed(3)} );
	float skinGraze = smoothstep( 0.0, 0.5, skinWrap ) * ( 1.0 - smoothstep( 0.25, 0.75, skinWrap ) );
	vec3 skinTint = mix( vec3( 1.0 ), vec3( ${t.r.toFixed(3)}, ${t.g.toFixed(3)}, ${t.b.toFixed(3)} ), skinGraze );
	reflectedLight.directDiffuse += skinWrap * skinTint * directLight.color * BRDF_Lambert( material.diffuseColor );`,
  );
}

/** Give a skin material the wrapped diffuse term. */
export function applySkinWrap(material: THREE.MeshPhysicalMaterial): void {
  const chunk = skinWrapLightingChunk();
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_physical_pars_fragment>', chunk);
  };
  material.customProgramCacheKey = () => 'skin-wrap';
}

// ---------- asset loading ----------

interface FigureAsset {
  scene: THREE.Group;
  normal: THREE.Texture | null;
  ao: THREE.Texture | null;
  cover: CoverMap;
  fitOffsets: Map<string, GarmentFitField>;
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
      const fitOffsets = keepGarmentsOutside(gltf.scene);
      return { scene: gltf.scene, normal, ao, cover: coveredByGarments(gltf.scene), fitOffsets };
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
export function keepGarmentsOutside(scene: THREE.Object3D): Map<string, GarmentFitField> {
  scene.updateMatrixWorld(true);
  const CELL = 0.04;
  const grid = new Map<string, number[]>();
  const bp: number[] = [];
  const bn: number[] = [];
  const bx: number[] = [];
  const bw: number[] = [];
  const fitFields = new Map<string, GarmentFitField>();
  const defaultPartIdx = fitPartIndex('default');
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
    const bones = (m as THREE.SkinnedMesh).skeleton?.bones ?? [];
    const extra = bones.map((b) => PART_EXTRA.find(([re]) => re.test(b.name))?.[1] ?? 0);
    const boneParts = bones.map((b) => fitPartIndex(fitPartForBone(b.name)));
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      n.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize();
      const k = bp.length / 3;
      bp.push(v.x, v.y, v.z);
      bn.push(n.x, n.y, n.z);
      // Weighted by the skin weights, so the gap and part weights blend between parts.
      let x = 0;
      const wStart = bw.length;
      for (let p = 0; p < FIT_PART_COUNT; p++) bw.push(0);
      let wSum = 0;
      if (si && sw) {
        for (let c = 0; c < 4; c++) {
          const wt = sw.getComponent(i, c);
          if (wt <= 0) continue;
          const bIdx = si.getComponent(i, c);
          x += wt * (extra[bIdx] ?? 0);
          bw[wStart + (boneParts[bIdx] ?? defaultPartIdx)] += wt;
          wSum += wt;
        }
      }
      if (wSum > 0) {
        for (let p = 0; p < FIT_PART_COUNT; p++) bw[wStart + p] /= wSum;
      } else {
        bw[wStart + defaultPartIdx] = 1;
      }
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
    const fitRest = clothes ? new Float32Array(pos.count * 3) : null;
    const fitNorm = clothes ? new Float32Array(pos.count * 3) : null;
    const fitWeights = clothes ? new Float32Array(pos.count * FIT_PART_COUNT) : null;
    const fitInward = clothes ? new Float32Array(pos.count) : null;
    const invLin = new THREE.Matrix3().setFromMatrix4(inv);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      const [cx, cy, cz] = cellOf(v.x, v.y, v.z);
      let bi = -1;
      let nx = 0;
      let ny = 0;
      let nz = 0;
      let gap = 0;
      let minClear = 0;
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
        minClear = clear;
        if (gap >= clear) break;
        const push = clear - gap;
        v.set(v.x + nx * push, v.y + ny * push, v.z + nz * push);
        gap = clear;
        pos.setXYZ(i, ...w.copy(v).applyMatrix4(inv).toArray());
      }
      if (fitRest && fitNorm && fitWeights && fitInward) {
        fitRest[3 * i] = pos.getX(i);
        fitRest[3 * i + 1] = pos.getY(i);
        fitRest[3 * i + 2] = pos.getZ(i);
        if (bi >= 0) {
          w.set(nx, ny, nz).applyMatrix3(invLin);
          fitNorm[3 * i] = w.x;
          fitNorm[3 * i + 1] = w.y;
          fitNorm[3 * i + 2] = w.z;
          const bwBase = bi * FIT_PART_COUNT;
          const fwBase = i * FIT_PART_COUNT;
          for (let p = 0; p < FIT_PART_COUNT; p++) fitWeights[fwBase + p] = bw[bwBase + p];
          fitInward[i] = Math.max(0, gap - minClear);
        }
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
    if (fitRest && fitNorm && fitWeights && fitInward) {
      fitFields.set(id, {
        id,
        isOuter,
        restPos: fitRest,
        localNormal: fitNorm,
        partWeights: fitWeights,
        maxInward: fitInward,
      });
    }
    m.geometry.computeBoundingSphere();
  }
  return fitFields;
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
  /** Body-linked fit-offset fields per clothing garment (backlog #12). */
  fitFields: Map<string, GarmentFitField>;
  /** Live Verlet spring-bone solver sharing the VRMC_springBone spec. */
  springs?: SpringBoneRuntime;
}

/** Shallow-clone a BufferGeometry shell sharing all attributes/index/morphs
 *  with the source so callers can replace individual attributes per rig. */
function cloneGeometryShell(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  for (const [name, attr] of Object.entries(src.attributes)) geo.setAttribute(name, attr);
  if (src.index) geo.setIndex(src.index);
  if (src.morphAttributes && Object.keys(src.morphAttributes).length > 0) {
    geo.morphAttributes = src.morphAttributes;
    geo.morphTargetsRelative = src.morphTargetsRelative;
  }
  geo.boundingBox = src.boundingBox;
  geo.boundingSphere = src.boundingSphere;
  return geo;
}

function ownSkinning(m: THREE.SkinnedMesh): { skinJoints: Uint8Array; skinWeights: Float32Array } {
  const src = m.geometry;
  const geo = cloneGeometryShell(src);
  const si = src.getAttribute('skinIndex');
  const sw = src.getAttribute('skinWeight');
  const count = src.getAttribute('position').count;
  const skinJoints = new Uint8Array(count * 4);
  const skinWeights = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    for (let k = 0; k < 4; k++) {
      skinJoints[i * 4 + k] = si.getComponent(i, k);
      skinWeights[i * 4 + k] = sw.getComponent(i, k);
    }
  }
  geo.setAttribute('skinIndex', new THREE.BufferAttribute(skinJoints, 4));
  geo.setAttribute('skinWeight', new THREE.BufferAttribute(skinWeights, 4));
  m.geometry = geo;
  return { skinJoints, skinWeights };
}

function attachSprings(
  group: THREE.Group,
  bones: Map<string, THREE.Bone>,
  garments: Map<string, THREE.SkinnedMesh>,
  height: number,
): SpringBoneRuntime | undefined {
  group.updateMatrixWorld(true);
  const bonesMap: Record<string, Vec3Tuple> = {};
  const tmp = new THREE.Vector3();
  for (const [name, b] of bones) {
    b.getWorldPosition(tmp);
    bonesMap[name] = [tmp.x, tmp.y, tmp.z];
  }
  const hips = bonesMap.hips;
  if (!hips) return undefined;

  let flowingHem: FlowingHemBounds | null = null;
  for (const [id, mesh] of garments) {
    if (!isFlowingHemGarment(id)) continue;
    const pos = mesh.geometry.getAttribute('position');
    if (!pos || pos.count === 0) continue;
    let minY = Infinity;
    let maxRx = 0;
    let maxRz = 0;
    for (let i = 0; i < pos.count; i++) {
      tmp.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
      if (tmp.y < minY) minY = tmp.y;
      if (tmp.y <= hips[1] + 0.02) {
        maxRx = Math.max(maxRx, Math.abs(tmp.x - hips[0]));
        maxRz = Math.max(maxRz, Math.abs(tmp.z - hips[2]));
      }
    }
    if (minY < hips[1] - 0.06) {
      if (!flowingHem) {
        flowingHem = { topY: hips[1], bottomY: minY, radiusX: maxRx, radiusZ: maxRz };
      } else {
        flowingHem.bottomY = Math.min(flowingHem.bottomY, minY);
        flowingHem.radiusX = Math.max(flowingHem.radiusX, maxRx);
        flowingHem.radiusZ = Math.max(flowingHem.radiusZ, maxRz);
      }
    }
  }

  const spec = buildSpringBoneSpec({
    flowingHem,
    bones: bonesMap,
    height,
  });
  if (spec.chains.length === 0) return undefined;

  const runtime = createSpringBoneRuntime(spec, bones);
  group.updateMatrixWorld(true);

  const hemChains = spec.chains.filter((c) => c.category === 'hem');
  const hemBones: THREE.Bone[] = [];
  for (const c of hemChains) {
    for (const j of c.joints) {
      const b = runtime.bones.get(j.name);
      if (b) hemBones.push(b);
    }
  }

  if (hemBones.length > 0) {
    const hemInverses = hemBones.map((b) => b.matrixWorld.clone().invert());
    for (const [id, mesh] of garments) {
      if (!isFlowingHemGarment(id)) continue;
      const sk = mesh.skeleton;
      const extendedBones = [...sk.bones, ...hemBones];
      const extendedInverses = [...sk.boneInverses.map((m) => m.clone()), ...hemInverses.map((m) => m.clone())];
      const idxMap = new Map<string, number>();
      extendedBones.forEach((b, idx) => idxMap.set(b.name, idx));

      const pos = mesh.geometry.getAttribute('position');
      const worldPos = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        tmp.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
        worldPos[i * 3] = tmp.x;
        worldPos[i * 3 + 1] = tmp.y;
        worldPos[i * 3 + 2] = tmp.z;
      }

      const { skinJoints, skinWeights } = ownSkinning(mesh);
      reweightHemVertices(worldPos, skinJoints, skinWeights, hemChains, idxMap, hips[0], hips[2]);
      mesh.geometry.getAttribute('skinIndex').needsUpdate = true;
      mesh.geometry.getAttribute('skinWeight').needsUpdate = true;
      mesh.bind(new THREE.Skeleton(extendedBones, extendedInverses), mesh.bindMatrix);
    }
  }

  return runtime;
}

/** Give a mesh its own index over the shared vertex data, so one
 *  rig can leave triangles out without touching another rig. */
function ownIndex(m: THREE.SkinnedMesh): ArrayLike<number> | null {
  const src = m.geometry;
  if (!src.index) return null;
  const geo = cloneGeometryShell(src);
  geo.setIndex(src.index.clone());
  m.geometry = geo;
  return src.index.array;
}

/** Give a garment mesh its own position attribute over the shared
 *  vertex data so body-linked fit offsets never mutate assetCache. */
function ownPosition(m: THREE.SkinnedMesh): void {
  const src = m.geometry;
  const pos = src.getAttribute('position');
  if (!pos) return;
  const geo = cloneGeometryShell(src);
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos.array), 3));
  m.geometry = geo;
  if (Object.keys(geo.morphAttributes).length > 0) m.updateMorphTargets();
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
  let lastTickSec: number | null = null;

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
    springState: () => ({
      segments: current?.springs?.segmentCount ?? 0,
      maxDeflectionRad: current?.springs?.maxDeflectionRad() ?? 0,
    }),
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
    applySkinWrap(body);
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
        const mat = id === 'base' ? baseMaterial() : garmentMaterial(id, m.geometry);
        m.material = mat;
        materials.set(id, mat);
        garments.set(id, m);
        m.visible = id === 'base';
        if (id === 'base') mask(m, 'base');
        else if (asset.fitOffsets.has(id)) ownPosition(m);
      } else if (isHairMesh(o, matName)) {
        if (Array.isArray(m.material)) {
          for (const mat of m.material) applyHairCutoutRule(mat);
        } else {
          applyHairCutoutRule(m.material);
        }
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
      fitFields: asset.fitOffsets,
      springs: maskBody ? attachSprings(group, bones, garments, height) : undefined,
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
    applyFitOffsets();
    applyHeels();
    root.updateMatrixWorld(true);
    f.springs?.reset();
    rig.onMount?.();
  }

  /** Shift clothing vertices along body normals in proportion to
   *  regional body-shape changes (backlog #12). */
  function applyFitOffsets(): void {
    if (!current || !scales) return;
    for (const [id, field] of current.fitFields) {
      const m = current.garments.get(id);
      if (!m) continue;
      const pos = m.geometry.getAttribute('position') as THREE.BufferAttribute;
      const offsets = computePartOffsets(character, scales, field.isOuter);
      applyFitField(field, offsets, pos.array as Float32Array);
      pos.needsUpdate = true;
    }
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

  const tickHeadPos = new THREE.Vector3();
  const tickGazeDiff = new THREE.Vector3();
  function easeVec3(a: Vec3, b: Vec3, k: number): void {
    a[0] += (b[0] - a[0]) * k;
    a[1] += (b[1] - a[1]) * k;
    a[2] += (b[2] - a[2]) * k;
  }

  function tick(timeSec: number, gazeTarget?: THREE.Vector3): void {
    if (!current) return;
    const k = 0.12;
    easeVec3(now.ls, target.ls, k);
    easeVec3(now.rs, target.rs, k);
    easeVec3(now.le, target.le, k);
    easeVec3(now.re, target.re, k);
    easeVec3(now.head, target.head, k);
    const j = current.joints;
    // Breathing and a slow weight shift keep the figure alive.
    const breath = Math.sin(timeSec * 1.6) * 0.012;
    setJoint(j.lua, now.ls[0], 0, now.ls[2] - current.restAbd.l + breath);
    setJoint(j.rua, now.rs[0], 0, -(now.rs[2] - current.restAbd.r + breath));
    setJoint(j.lla, now.le[0], 0, 0);
    setJoint(j.rla, now.re[0], 0, 0);
    if (gazeTarget) {
      head.getWorldPosition(tickHeadPos);
      tickGazeDiff.copy(gazeTarget).sub(tickHeadPos);
      const yaw = THREE.MathUtils.clamp(Math.atan2(tickGazeDiff.x, tickGazeDiff.z), -0.45, 0.45);
      const pitch = THREE.MathUtils.clamp(
        -Math.atan2(tickGazeDiff.y, Math.hypot(tickGazeDiff.x, tickGazeDiff.z)),
        -0.2,
        0.2,
      );
      gazeYaw += (yaw * 0.6 - gazeYaw) * 0.05;
      gazePitch += (pitch * 0.5 - gazePitch) * 0.05;
    } else {
      gazeYaw *= 0.95;
      gazePitch *= 0.95;
    }
    setJoint(j.head, now.head[0] + gazePitch, now.head[1] + gazeYaw, now.head[2]);
    current.group.rotation.y = Math.sin(timeSec * 0.31) * 0.015;
    if (current.springs) {
      const dt = lastTickSec === null ? 0 : Math.min(0.05, Math.max(0, timeSec - lastTickSec));
      lastTickSec = timeSec;
      root.updateMatrixWorld(true);
      current.springs.step(dt);
    }
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
