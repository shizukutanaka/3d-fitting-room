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
    ]).then(([gltf, normal, ao]) => ({ scene: gltf.scene, normal, ao }));
    assetCache.set(id, p);
  }
  return p;
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
}

export function buildAvatar(initial: CharacterParams, figure: FigureId = 'a', legRatio: LegRatio = 'standard'): AvatarRig {
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

  let character = initial;
  let leg = legRatio;
  let current: LoadedFigure | null = null;
  let worn: WornGarments | null = null;
  let scales: BoneScales | null = null;
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
      } else {
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
    root.updateMatrixWorld(true);
    const ext = f as LoadedFigure & { eyeBox: THREE.Box3 | null; box: THREE.Box3 };
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
    hatAnchor.position.set(0, ext.box.max.y - hb.y - 0.006, -0.012);
    glassesAnchor.position.set(0, (eye.min.y + eye.max.y) / 2 - hb.y, eye.max.z - hb.z + 0.006);
    const neck = f.bones.get('neck')!.getWorldPosition(new THREE.Vector3());
    place(neckAnchor, f.bones.get('upperChest')!, 0, neck.y - 0.005, neck.z + 0.005);
    const hips = f.bones.get('hips')!.getWorldPosition(new THREE.Vector3());
    place(bagAnchor, f.bones.get('hips')!, -0.235, hips.y - 0.02, hips.z + 0.02);
    place(torsoAnchor, f.bones.get('chest')!, 0, f.bones.get('chest')!.getWorldPosition(new THREE.Vector3()).y, 0);
    place(bottomAnchor, f.bones.get('hips')!, 0, hips.y, 0);
    place(shoesAnchor, g, 0, 0, 0);
    root.position.copy(saved.p);
    root.quaternion.copy(saved.q);
    root.scale.copy(saved.s);
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
    f.group.position.y = hipT - f.src.hipJoint * s.root;
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
  }

  function applyGarments(): void {
    if (!current || !worn) return;
    const show = new Set<string>(['base', worn.top]);
    if (worn.outer !== 'none') show.add(worn.outer);
    if (!isDress(worn.top) && worn.bottom !== 'none') show.add(worn.bottom);
    const shoe = worn.shoes === 'sneakers' ? 'sneakers' : worn.shoes === 'boots' ? 'boots' : 'shoesLow';
    show.add(shoe);
    for (const [id, m] of current.garments) m.visible = show.has(id);
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
