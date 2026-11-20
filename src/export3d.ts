// Export the current person + outfit as a portable 3D file —
// glTF binary (.glb) or VRM 1.0 (.vrm). This is the product's
// discovery engine (docs/PERSPECTIVES.md viewpoint 4): file-based
// characters historically spread not by their creator's posts but
// by being adopted as *material* in other people's works (UTAU,
// MMD), so the export is designed for adoption — (a) format
// correctness first (a real humanoid bone mapping, a true T-pose,
// no scale inside the bone hierarchy), (b) the usage terms stated
// in the metadata, (c) a named-parameter JSON bundled with the
// file so any tool or LLM can read the person without a seed
// decoder (viewpoint 5: self-describing artifacts).
//
// How it works: a throwaway rig is built from the outfit (never
// added to the stage), posed into the VRM T-pose, and snapshotted.
// Every mesh's world transform is baked into its geometry, and
// each part is rigidly bound to one bone of a minimal humanoid
// skeleton constructed at export time — the avatar itself has no
// bone rig (it is built from anchors and groups), so the skeleton
// exists only in the exported file. Bone positions come from the
// rig's real joint anchors (shoulders, elbows, wrists, head) and
// from the body's design constants (hips, spine, legs), all in
// export space: feet at y=0, meters, facing +Z.
//
// Honest limits (docs/DESIGN.md §17): the binding is rigid (one
// bone per part — no smooth skinning, no fingers, no facial
// bones), and the procedural canvas textures are not embedded.
// What travels is the silhouette, the colors and a correct
// humanoid skeleton. The texture maps are near-neutral by design
// (textures.ts), so the material color that tints them is the
// visible identity of each part; surface relief does not travel.

import * as THREE from 'three';
import { buildAvatar, type AvatarRig } from './avatar';
import { applyOutfit } from './items';
import type { Outfit } from './outfit';
import {
  buildGlb,
  type GlbJointDef,
  type GlbMaterialDef,
  type GlbPartDef,
  type GlbSkinDef,
} from './glb';
import { encodeSeed } from './seed';

/** The license the exported files are released under. The terms
 *  mandated for the export — free use as material in anyone's
 *  works — are exactly CC0's terms, so the deed URL of CC0 1.0 is
 *  the honest licenseUrl (VRMC_vrm meta requires one). This
 *  string is data written into exported files; the app never
 *  fetches it. It is the single non-loopback URL in the shipped
 *  source, excepted deliberately and narrowly in
 *  tests/invariants.test.ts — see docs/DESIGN.md §17. */
export const EXPORT_LICENSE_URL = 'https://creativecommons.org/publicdomain/zero/1.0/';

const TERMS_EN =
  'This character is fictional. You may use this file freely as material in your own works — including commercial works — and may modify and redistribute it. No credit is required. (CC0 1.0)';
const TERMS_JA =
  'このキャラクターは架空のものです。このファイルは、商用を含む自分の作品の素材として自由に使うことができ、改変・再配布もできます。クレジット表記は不要です。（CC0 1.0）';

export interface ExportedFile {
  bytes: Uint8Array;
  /** Number of mesh parts written. */
  parts: number;
  /** The seed recorded in the file's extras. */
  seed: string;
}

/** Frame-space height bands for the body group's parts (the body
 *  is built in avatar.ts from lathes and capsules whose centers
 *  sit at known heights). x-sign splits the legs; the center parts
 *  (pelvis, torso, neck) have centroid x = 0. */
function bodyRegion(frameY: number, x: number): string {
  const side = x < -0.01 ? '.L' : x > 0.01 ? '.R' : '';
  if (frameY >= 1.38) return 'neck';
  if (frameY >= 1.0) return 'torso';
  if (frameY >= 0.7) return 'hips';
  if (frameY >= 0.52) return `upperLeg${side}`;
  if (frameY >= 0.14) return `lowerLeg${side}`;
  return `foot${side}`;
}

interface ArmGroups {
  side: 'L' | 'R';
  shoulder: THREE.Group;
  elbow: THREE.Group | null;
  hand: THREE.Group | null;
}

/** An arm subtree: the shoulder group holds the upper arm, its
 *  child group is the elbow (forearm), and the elbow's child is
 *  the hand. Regions follow that nesting. */
function armRegions(shoulder: THREE.Group): Map<THREE.Object3D, string> {
  const side = shoulder.position.x < 0 ? 'L' : 'R';
  const regions = new Map<THREE.Object3D, string>();
  regions.set(shoulder, `upperArm.${side}`);
  for (const child of shoulder.children) {
    if (child instanceof THREE.Group) {
      regions.set(child, `forearm.${side}`);
      for (const grand of child.children) {
        if (grand instanceof THREE.Group) regions.set(grand, `hand.${side}`);
      }
    }
  }
  return regions;
}

function findArmGroups(shoulder: THREE.Group): ArmGroups {
  const side = shoulder.position.x < 0 ? 'L' : 'R';
  let elbow: THREE.Group | null = null;
  let hand: THREE.Group | null = null;
  for (const child of shoulder.children) {
    if (child instanceof THREE.Group) {
      elbow = child;
      for (const grand of child.children) {
        if (grand instanceof THREE.Group) hand = grand;
      }
    }
  }
  return { side, shoulder, elbow, hand };
}

interface SnapshotPart extends GlbPartDef {
  region: string;
}

interface Snapshot {
  parts: SnapshotPart[];
  materials: GlbMaterialDef[];
  /** World positions of the arm joints and head, in export space. */
  jointWorld: {
    head: THREE.Vector3;
    arms: ArmGroups[];
  };
  frameScale: { x: number; y: number };
  rig: AvatarRig;
}

/** Build a throwaway rig for the outfit, pose it into the VRM
 *  T-pose, and snapshot every mesh with baked world transforms. */
function snapshotOutfit(outfit: Outfit): Snapshot {
  const rig = buildAvatar(outfit.character);
  applyOutfit(rig, outfit);
  const root = rig.root;
  const frame = root.children[0];
  const frameScale = { x: frame?.scale.x || 1, y: frame?.scale.y || 1 };

  // Region lookup: anchors name their subtree; the frame's direct
  // group children that are neither anchors nor the head are the
  // body group and the two arm shoulders.
  const anchorRegion = new Map<THREE.Object3D, string>([
    [rig.head, 'head'],
    [rig.hatAnchor, 'hat'],
    [rig.glassesAnchor, 'glasses'],
    [rig.torsoAnchor, 'top'],
    [rig.bottomAnchor, 'bottom'],
    [rig.neckAnchor, 'neck-item'],
    [rig.bagAnchor, 'bag'],
    [rig.shoesAnchor, 'shoes'],
  ]);
  const armRegion = new Map<THREE.Object3D, string>();
  const arms: ArmGroups[] = [];
  let bodyGroup: THREE.Object3D | null = null;
  if (frame) {
    for (const child of frame.children) {
      if (anchorRegion.has(child) || !(child instanceof THREE.Group)) continue;
      const hasGroupChild = child.children.some((c) => c instanceof THREE.Group);
      if (hasGroupChild) {
        for (const [obj, region] of armRegions(child)) armRegion.set(obj, region);
        arms.push(findArmGroups(child));
      } else {
        bodyGroup = child;
      }
    }
  }

  // ---- VRM T-pose ----
  // The fresh rig stands in the app's neutral pose (arms hanging,
  // slight elbow bend). The T-pose raises only the upper arms to
  // horizontal and straightens the elbows — done directly on the
  // throwaway rig's joint groups, so the baked geometry, the
  // joint positions and the skeleton all describe the same pose.
  for (const arm of arms) {
    arm.shoulder.rotation.set(0, 0, arm.side === 'L' ? -Math.PI / 2 : Math.PI / 2);
    arm.elbow?.rotation.set(0, 0, 0);
  }

  const materials: GlbMaterialDef[] = [];
  const materialIndex = new Map<THREE.Material, number>();
  const materialFor = (mat: THREE.Material): number => {
    const known = materialIndex.get(mat);
    if (known !== undefined) return known;
    const std = mat as THREE.MeshStandardMaterial;
    const color = std.color;
    const def: GlbMaterialDef = {
      name: `material-${materials.length}`,
      baseColorFactor: color
        ? [color.r, color.g, color.b, std.opacity ?? 1]
        : [1, 1, 1, std.opacity ?? 1],
      roughnessFactor: std.roughness ?? 1,
      metallicFactor: std.metalness ?? 0,
      alphaMode: std.transparent ? 'BLEND' : 'OPAQUE',
      doubleSided: std.side === THREE.DoubleSide,
    };
    materials.push(def);
    materialIndex.set(mat, materials.length - 1);
    return materials.length - 1;
  };

  const parts: SnapshotPart[] = [];
  const regionCounts = new Map<string, number>();
  const center = new THREE.Vector3();

  const emit = (mesh: THREE.Mesh, region: string): void => {
    const geo = mesh.geometry.clone();
    geo.applyMatrix4(mesh.matrixWorld);
    const position = geo.getAttribute('position');
    if (!position || position.count === 0) return;
    const normal = geo.getAttribute('normal');
    const uv = geo.getAttribute('uv');
    const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    const n = (regionCounts.get(region) ?? 0) + 1;
    regionCounts.set(region, n);
    parts.push({
      name: `${region}-${n}`,
      region,
      positions: position.array,
      normals: normal ? normal.array : new Float32Array(position.count * 3),
      uvs: uv ? uv.array : undefined,
      indices: geo.index ? geo.index.array : undefined,
      material: materialFor(material),
    });
  };

  const centroidOf = (mesh: THREE.Mesh): THREE.Vector3 => {
    mesh.geometry.computeBoundingBox();
    const bb = mesh.geometry.boundingBox;
    if (!bb) return center.set(0, 0, 0);
    return center.copy(bb.getCenter(new THREE.Vector3())).applyMatrix4(mesh.matrixWorld);
  };

  const regionOf = (mesh: THREE.Mesh, inherited: string): string => {
    if (inherited === 'shoes') {
      const c = centroidOf(mesh);
      return c.x < 0 ? 'shoe.L' : 'shoe.R';
    }
    if (inherited === 'body') {
      const c = centroidOf(mesh);
      return bodyRegion(c.y / frameScale.y, c.x);
    }
    if (inherited === 'neck-item') {
      // The necklace drapes onto the chest; the scarf wraps the
      // neck. Both arrive through the neck anchor — the centroid
      // height is what separates them.
      const c = centroidOf(mesh);
      return c.y / frameScale.y >= 1.4 ? 'neck' : 'chest';
    }
    return inherited;
  };

  const walk = (obj: THREE.Object3D, inherited: string): void => {
    let region = inherited;
    const anchored = anchorRegion.get(obj);
    if (anchored) region = anchored;
    const armed = armRegion.get(obj);
    if (armed) region = armed;
    if (obj === bodyGroup) region = 'body';
    if (obj instanceof THREE.Mesh) emit(obj, regionOf(obj, region));
    for (const child of obj.children) walk(child, region);
  };

  // Zero the podium offset so the exported figure stands on y=0
  // (the fresh rig was never ticked, so there is no sway to undo).
  root.position.y = 0;
  root.updateMatrixWorld(true);
  walk(root, 'part');

  const jointWorld = {
    head: rig.head.getWorldPosition(new THREE.Vector3()),
    arms,
  };
  return { parts, materials, jointWorld, frameScale, rig };
}

/** Release the throwaway rig's geometries, materials and canvas
 *  textures after a snapshot. */
function disposeRig(rig: AvatarRig): void {
  const materials = new Set<THREE.Material>();
  rig.root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) materials.add(m);
    }
  });
  for (const m of materials) {
    const std = m as THREE.MeshStandardMaterial;
    std.map?.dispose();
    std.bumpMap?.dispose();
    m.dispose();
  }
}

// ---- the skeleton ----
// Joint indices are fixed by this table; the VRM humanoid mapping
// below refers to the same order.
const JOINT = {
  hips: 0,
  spine: 1,
  chest: 2,
  neck: 3,
  head: 4,
  leftUpperArm: 5,
  leftLowerArm: 6,
  leftHand: 7,
  rightUpperArm: 8,
  rightLowerArm: 9,
  rightHand: 10,
  leftUpperLeg: 11,
  leftLowerLeg: 12,
  leftFoot: 13,
  rightUpperLeg: 14,
  rightLowerLeg: 15,
  rightFoot: 16,
} as const;

function jointForRegion(region: string): number {
  switch (region) {
    case 'head':
    case 'hat':
    case 'glasses':
      return JOINT.head;
    case 'neck':
      return JOINT.neck;
    case 'chest':
    case 'top':
    case 'bag':
      return JOINT.chest;
    case 'torso':
      return JOINT.spine;
    case 'hips':
    case 'bottom':
      return JOINT.hips;
    case 'upperLeg.L':
      return JOINT.leftUpperLeg;
    case 'lowerLeg.L':
      return JOINT.leftLowerLeg;
    case 'foot.L':
    case 'shoe.L':
      return JOINT.leftFoot;
    case 'upperLeg.R':
      return JOINT.rightUpperLeg;
    case 'lowerLeg.R':
      return JOINT.rightLowerLeg;
    case 'foot.R':
    case 'shoe.R':
      return JOINT.rightFoot;
    case 'upperArm.L':
      return JOINT.leftUpperArm;
    case 'forearm.L':
      return JOINT.leftLowerArm;
    case 'hand.L':
      return JOINT.leftHand;
    case 'upperArm.R':
      return JOINT.rightUpperArm;
    case 'forearm.R':
      return JOINT.rightLowerArm;
    case 'hand.R':
      return JOINT.rightHand;
    default:
      return JOINT.hips;
  }
}

/** Construct the minimal humanoid skeleton in export space.
 *  Trunk and leg joints sit at the body's design constants (scaled
 *  by the frame); arm and head joints are read from the T-posed
 *  rig's real anchors. No rotations, no scales anywhere in the
 *  hierarchy — the frame scale is baked into the geometry and the
 *  joint positions instead, as the VRM T-pose spec recommends. */
function buildSkin(snap: Snapshot): GlbSkinDef {
  const sx = snap.frameScale.x;
  const sy = snap.frameScale.y;
  const v = (x: number, y: number, z: number): THREE.Vector3 => new THREE.Vector3(x, y, z);
  const world: THREE.Vector3[] = new Array(17);
  world[JOINT.hips] = v(0, 0.92 * sy, 0);
  world[JOINT.spine] = v(0, 1.08 * sy, 0);
  world[JOINT.chest] = v(0, 1.26 * sy, 0);
  world[JOINT.neck] = v(0, 1.44 * sy, 0);
  world[JOINT.head] = snap.jointWorld.head.clone();
  world[JOINT.leftUpperLeg] = v(-0.096 * sx, 0.8 * sy, 0);
  world[JOINT.leftLowerLeg] = v(-0.096 * sx, 0.47 * sy, 0);
  world[JOINT.leftFoot] = v(-0.096 * sx, 0.1 * sy, 0);
  world[JOINT.rightUpperLeg] = v(0.096 * sx, 0.8 * sy, 0);
  world[JOINT.rightLowerLeg] = v(0.096 * sx, 0.47 * sy, 0);
  world[JOINT.rightFoot] = v(0.096 * sx, 0.1 * sy, 0);
  for (const arm of snap.jointWorld.arms) {
    const upper = arm.side === 'L' ? JOINT.leftUpperArm : JOINT.rightUpperArm;
    const lower = arm.side === 'L' ? JOINT.leftLowerArm : JOINT.rightLowerArm;
    const hand = arm.side === 'L' ? JOINT.leftHand : JOINT.rightHand;
    world[upper] = arm.shoulder.getWorldPosition(new THREE.Vector3());
    if (arm.elbow) world[lower] = arm.elbow.getWorldPosition(new THREE.Vector3());
    if (arm.hand) world[hand] = arm.hand.getWorldPosition(new THREE.Vector3());
    // Fallbacks keep the chain well-formed even if a group was
    // not found (defensive; the current rig always has all three).
    if (!world[lower]) world[lower] = world[upper].clone().add(v(arm.side === 'L' ? -0.27 * sx : 0.27 * sx, 0, 0));
    if (!world[hand]) world[hand] = world[lower].clone().add(v(arm.side === 'L' ? -0.26 * sx : 0.26 * sx, 0, 0));
  }

  const defs: Array<{ name: string; parent: number }> = [
    { name: 'hips', parent: -1 },
    { name: 'spine', parent: JOINT.hips },
    { name: 'chest', parent: JOINT.spine },
    { name: 'neck', parent: JOINT.chest },
    { name: 'head', parent: JOINT.neck },
    { name: 'leftUpperArm', parent: JOINT.chest },
    { name: 'leftLowerArm', parent: JOINT.leftUpperArm },
    { name: 'leftHand', parent: JOINT.leftLowerArm },
    { name: 'rightUpperArm', parent: JOINT.chest },
    { name: 'rightLowerArm', parent: JOINT.rightUpperArm },
    { name: 'rightHand', parent: JOINT.rightLowerArm },
    { name: 'leftUpperLeg', parent: JOINT.hips },
    { name: 'leftLowerLeg', parent: JOINT.leftUpperLeg },
    { name: 'leftFoot', parent: JOINT.leftLowerLeg },
    { name: 'rightUpperLeg', parent: JOINT.hips },
    { name: 'rightLowerLeg', parent: JOINT.rightUpperLeg },
    { name: 'rightFoot', parent: JOINT.rightLowerLeg },
  ];
  const joints: GlbJointDef[] = defs.map((def, i) => {
    const parentWorld = def.parent >= 0 ? world[def.parent] : new THREE.Vector3();
    const local = world[i].clone().sub(parentWorld);
    return { name: def.name, parent: def.parent, translation: [local.x, local.y, local.z] };
  });
  // Bones carry translations only, so each inverse bind matrix is
  // the negated world translation (column-major).
  const inverseBindMatrices = new Float32Array(joints.length * 16);
  world.forEach((p, i) => {
    inverseBindMatrices.set(
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -p.x, -p.y, -p.z, 1],
      i * 16,
    );
  });
  return { joints, inverseBindMatrices };
}

/** The self-description bundled into every exported file: the
 *  seed (the exact recipe, decodable by this app), the full
 *  named-parameter state as plain JSON (readable by any tool or
 *  LLM with no decoder), and the usage terms. */
function fittingRoomExtras(outfit: Outfit, seed: string): Record<string, unknown> {
  return {
    fittingRoomSeed: seed,
    fittingRoomCharacter: 'fictional',
    fittingRoomLicenseUrl: EXPORT_LICENSE_URL,
    fittingRoomTerms: TERMS_EN,
    fittingRoomTermsJa: TERMS_JA,
    fittingRoomParams: outfit,
  };
}

const GENERATOR = '3D Fitting Room (working title) — on-device glTF/VRM exporter';

function buildExport(outfit: Outfit, vrm: boolean): ExportedFile {
  const snap = snapshotOutfit(outfit);
  try {
    const skin = buildSkin(snap);
    const parts: GlbPartDef[] = snap.parts.map((part) => ({
      ...part,
      joint: jointForRegion(part.region),
    }));
    const seed = encodeSeed(outfit);
    const extras = fittingRoomExtras(outfit, seed);
    if (!vrm) {
      const bytes = buildGlb(parts, snap.materials, { generator: GENERATOR, extras, skin });
      return { bytes, parts: parts.length, seed };
    }
    const humanBones: Record<string, { node: number }> = {};
    for (const [name, idx] of Object.entries(JOINT)) humanBones[name] = { node: idx };
    const bytes = buildGlb(parts, snap.materials, {
      generator: GENERATOR,
      extras,
      skin,
      extensionsUsed: ['VRMC_vrm'],
      extensions: {
        VRMC_vrm: {
          specVersion: '1.0',
          meta: {
            name: 'Fitting Room Character',
            version: '1.0',
            authors: ['3D Fitting Room (working title)'],
            copyrightInformation:
              'A fictional character, generated procedurally on-device by the 3D Fitting Room app. Free to use as material in your own works under CC0 1.0 (see licenseUrl).',
            licenseUrl: EXPORT_LICENSE_URL,
            // Some tools (e.g. the Blender VRM addon) surface otherLicenseUrl
            // rather than licenseUrl; mirror the same CC0 deed so the terms
            // travel in whichever field the reader displays (§23).
            otherLicenseUrl: EXPORT_LICENSE_URL,
            avatarPermission: 'everyone',
            commercialUsage: 'corporation',
            creditNotation: 'unnecessary',
            allowRedistribution: true,
            modification: 'allowModificationRedistribution',
            allowExcessivelyViolentUsage: false,
            allowExcessivelySexualUsage: false,
            allowPoliticalOrReligiousUsage: false,
            allowAntisocialOrHateUsage: false,
          },
          humanoid: { humanBones },
        },
      },
    });
    return { bytes, parts: parts.length, seed };
  } finally {
    disposeRig(snap.rig);
  }
}

/** The person + outfit as a glTF binary file: T-posed, boned,
 *  self-describing. */
export function exportGlb(outfit: Outfit): ExportedFile {
  return buildExport(outfit, false);
}

/** The person + outfit as a VRM 1.0 file: the same payload plus
 *  the VRMC_vrm humanoid mapping and license metadata. */
export function exportVrm(outfit: Outfit): ExportedFile {
  return buildExport(outfit, true);
}
