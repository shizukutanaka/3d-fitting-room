// Export the current person + outfit as a portable 3D file —
// glTF binary (.glb) or VRM 1.0 (.vrm). This is the product's
// discovery engine (docs/PERSPECTIVES.md viewpoint 4): file-based
// characters spread by being adopted as *material* in other
// people's works, so the export is designed for adoption — (a)
// format correctness first (a real humanoid bone mapping, a true
// T-pose, no scale inside the bone hierarchy), (b) the usage terms
// stated in the metadata, (c) a named-parameter JSON bundled with
// the file (viewpoint 5: self-describing artifacts).
//
// How it works: a throwaway mannequin rig is built from the outfit
// (never added to the stage), calibrated to the person's height
// (Body Scale Calibration moves the joints), posed into the VRM
// T-pose, and snapshotted. Skinned vertices are evaluated through
// the posed skeleton and baked; the exported skeleton has the same
// named bones as the mannequin, translation-only, so the file's
// bind pose is the T-pose and every vertex keeps its smooth
// four-bone weights. Accessories are rigidly bound to the bone
// they hang from. Export space: feet at y=0, meters, facing +Z.
//
// Honest limits (docs/DESIGN.md §17): no fingers or facial bones,
// and the baked normal/AO maps and fabric textures are not
// embedded — what travels is the sculpted silhouette, the garment
// cut, the colors and a correct, smoothly-weighted skeleton.
// Only the app's own CC0 mannequins are exported; nothing a user
// imports is ever written into these files.

import * as THREE from 'three';
import { buildAvatar, type AvatarRig, type FigureId } from './avatar';
import type { LegRatio } from './bodyscale';
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

// Bones written to the file, in this order. The mannequin's tip
// bones (hand/toe ends) carry no weight and are not humanoid
// bones, so they stay out of the file.
const JOINT_NAMES = [
  'hips', 'spine', 'chest', 'upperChest', 'neck', 'head',
  'leftShoulder', 'leftUpperArm', 'leftLowerArm', 'leftHand',
  'rightShoulder', 'rightUpperArm', 'rightLowerArm', 'rightHand',
  'leftUpperLeg', 'leftLowerLeg', 'leftFoot', 'leftToes',
  'rightUpperLeg', 'rightLowerLeg', 'rightFoot', 'rightToes',
] as const;
const JOINT_INDEX = new Map<string, number>(JOINT_NAMES.map((n, i) => [n, i]));

/** Nearest exported joint at or above `obj`. */
function jointOf(obj: THREE.Object3D | null): number {
  for (let o = obj; o; o = o.parent) {
    const j = JOINT_INDEX.get(o.name);
    if (j !== undefined) return j;
  }
  return 0;
}

/** Rotate a bone (in world terms) so the direction from it to
 *  `child` points along `dir`. */
function aim(bone: THREE.Object3D, child: THREE.Object3D, dir: THREE.Vector3): void {
  bone.updateWorldMatrix(true, true);
  const a = bone.getWorldPosition(new THREE.Vector3());
  const b = child.getWorldPosition(new THREE.Vector3());
  const from = b.sub(a).normalize();
  const delta = new THREE.Quaternion().setFromUnitVectors(from, dir);
  const world = bone.getWorldQuaternion(new THREE.Quaternion());
  const parentWorld = bone.parent ? bone.parent.getWorldQuaternion(new THREE.Quaternion()) : new THREE.Quaternion();
  bone.quaternion.copy(parentWorld.invert().multiply(delta.multiply(world)));
  bone.updateWorldMatrix(false, true);
}

/** Visible all the way up to `top`. */
function shown(obj: THREE.Object3D, top: THREE.Object3D): boolean {
  for (let o: THREE.Object3D | null = obj; o && o !== top.parent; o = o.parent) if (!o.visible) return false;
  return true;
}

interface Snapshot {
  parts: GlbPartDef[];
  materials: GlbMaterialDef[];
  skin: GlbSkinDef;
  rig: AvatarRig;
}

async function snapshotOutfit(outfit: Outfit, figure: FigureId, leg: LegRatio): Promise<Snapshot> {
  const rig = buildAvatar(outfit.character, figure, leg, false);
  applyOutfit(rig, outfit);
  await rig.ready;
  const root = rig.root;
  // The fresh rig was never ticked: it stands in its rest pose,
  // calibrated. Zero the podium offset and raise the arms.
  root.position.set(0, 0, 0);
  root.quaternion.identity();
  root.updateMatrixWorld(true);
  const bone = (n: string) => root.getObjectByName(n);
  for (const [side, x] of [['left', 1], ['right', -1]] as const) {
    const dir = new THREE.Vector3(x, 0, 0);
    const up = bone(`${side}UpperArm`);
    const low = bone(`${side}LowerArm`);
    const hand = bone(`${side}Hand`);
    if (up && low) aim(up, low, dir);
    if (low && hand) aim(low, hand, dir);
  }
  root.updateMatrixWorld(true);

  const world = JOINT_NAMES.map((n) => {
    const b = bone(n);
    return b ? b.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3();
  });
  const joints: GlbJointDef[] = JOINT_NAMES.map((n, i) => {
    const b = bone(n);
    let parent = -1;
    for (let o = b?.parent ?? null; o; o = o.parent) {
      const j = JOINT_INDEX.get(o.name);
      if (j !== undefined) {
        parent = j;
        break;
      }
    }
    const local = world[i].clone().sub(parent >= 0 ? world[parent] : new THREE.Vector3());
    return { name: n, parent, translation: [local.x, local.y, local.z] };
  });
  // Translation-only bones: each inverse bind matrix is the
  // negated world translation (column-major).
  const inverseBindMatrices = new Float32Array(joints.length * 16);
  world.forEach((p, i) => {
    inverseBindMatrices.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -p.x, -p.y, -p.z, 1], i * 16);
  });

  const materials: GlbMaterialDef[] = [];
  const materialIndex = new Map<THREE.Material, number>();
  const materialFor = (mat: THREE.Material): number => {
    const known = materialIndex.get(mat);
    if (known !== undefined) return known;
    const std = mat as THREE.MeshStandardMaterial;
    const color = std.color;
    const alphaMode: GlbMaterialDef['alphaMode'] = std.transparent
      ? 'BLEND'
      : std.alphaTest > 0
        ? 'MASK'
        : 'OPAQUE';
    materials.push({
      name: mat.name || `material-${materials.length}`,
      baseColorFactor: color ? [color.r, color.g, color.b, std.opacity ?? 1] : [1, 1, 1, std.opacity ?? 1],
      roughnessFactor: std.roughness ?? 1,
      metallicFactor: std.metalness ?? 0,
      alphaMode,
      ...(alphaMode === 'MASK' ? { alphaCutoff: std.alphaTest } : {}),
      doubleSided: std.side === THREE.DoubleSide,
    });
    materialIndex.set(mat, materials.length - 1);
    return materials.length - 1;
  };

  const parts: GlbPartDef[] = [];
  const v = new THREE.Vector3();
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh) || !shown(obj, root)) return;
    const src = obj.geometry as THREE.BufferGeometry;
    const pos = src.getAttribute('position');
    if (!pos || pos.count === 0) return;
    const material = materialFor(Array.isArray(obj.material) ? obj.material[0] : obj.material);
    const uv = src.getAttribute('uv');
    const name = obj.name || `part-${parts.length + 1}`;
    if (obj instanceof THREE.SkinnedMesh) {
      const baked = new THREE.BufferGeometry();
      const out = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        obj.getVertexPosition(i, v).applyMatrix4(obj.matrixWorld);
        out.set([v.x, v.y, v.z], i * 3);
      }
      baked.setAttribute('position', new THREE.BufferAttribute(out, 3));
      if (src.index) baked.setIndex(src.index.clone());
      baked.computeVertexNormals();
      const si = src.getAttribute('skinIndex');
      const sw = src.getAttribute('skinWeight');
      const skinJoints = new Uint8Array(pos.count * 4);
      const skinWeights = new Float32Array(pos.count * 4);
      for (let i = 0; i < pos.count; i++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          const w = sw.getComponent(i, k);
          if (w <= 0) continue;
          skinJoints[i * 4 + k] = jointOf(obj.skeleton.bones[si.getComponent(i, k)]);
          skinWeights[i * 4 + k] = w;
          sum += w;
        }
        if (sum > 0) for (let k = 0; k < 4; k++) skinWeights[i * 4 + k] /= sum;
        else skinWeights[i * 4] = 1;
      }
      parts.push({
        name,
        positions: out,
        normals: baked.getAttribute('normal').array,
        uvs: uv ? uv.array : undefined,
        indices: src.index ? src.index.array : undefined,
        material,
        skinJoints,
        skinWeights,
      });
      baked.dispose();
    } else {
      const geo = src.clone();
      geo.applyMatrix4(obj.matrixWorld);
      const normal = geo.getAttribute('normal');
      parts.push({
        name,
        positions: geo.getAttribute('position').array,
        normals: normal ? normal.array : new Float32Array(pos.count * 3),
        uvs: uv ? uv.array : undefined,
        indices: geo.index ? geo.index.array : undefined,
        material,
        joint: jointOf(obj),
      });
      geo.dispose();
    }
  });
  return { parts, materials, skin: { joints, inverseBindMatrices }, rig };
}

/** Release the throwaway rig. Skinned meshes share geometry and
 *  baked maps with the live mannequin (avatar.ts asset cache), so
 *  only their per-rig materials go; accessories are fully owned. */
function disposeRig(rig: AvatarRig): void {
  rig.root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    if (!(obj instanceof THREE.SkinnedMesh)) {
      obj.geometry.dispose();
      for (const m of mats) {
        const std = m as THREE.MeshStandardMaterial;
        std.map?.dispose();
        std.bumpMap?.dispose();
      }
    }
    for (const m of mats) m.dispose();
  });
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

async function buildExport(outfit: Outfit, vrm: boolean, figure: FigureId, leg: LegRatio): Promise<ExportedFile> {
  const snap = await snapshotOutfit(outfit, figure, leg);
  try {
    const { parts, materials, skin } = snap;
    const seed = encodeSeed(outfit);
    const extras = fittingRoomExtras(outfit, seed);
    if (!vrm) {
      const bytes = buildGlb(parts, materials, { generator: GENERATOR, extras, skin });
      return { bytes, parts: parts.length, seed };
    }
    const humanBones: Record<string, { node: number }> = {};
    JOINT_NAMES.forEach((name, idx) => {
      humanBones[name] = { node: idx };
    });
    const bytes = buildGlb(parts, materials, {
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
              'A fictional adult character, built on-device by the 3D Fitting Room app from its CC0 mannequins. Free to use as material in your own works under CC0 1.0 (see licenseUrl).',
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

/** The person + outfit as a glTF binary file: T-posed, smoothly
 *  skinned, self-describing. */
export function exportGlb(outfit: Outfit, figure: FigureId = 'a', leg: LegRatio = 'standard'): Promise<ExportedFile> {
  return buildExport(outfit, false, figure, leg);
}

/** The person + outfit as a VRM 1.0 file: the same payload plus
 *  the VRMC_vrm humanoid mapping and license metadata. */
export function exportVrm(outfit: Outfit, figure: FigureId = 'a', leg: LegRatio = 'standard'): Promise<ExportedFile> {
  return buildExport(outfit, true, figure, leg);
}
