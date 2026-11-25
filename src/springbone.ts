// Single source of truth for spring secondary motion (hair and
// flowing garment hems). Pure data and math — no renderer or DOM —
// so the VRM 1.0 VRMC_springBone exporter (src/export3d.ts) and the
// in-app Verlet solver (src/avatar.ts) share the exact same chain
// topology, joint parameters, and body colliders.

import * as THREE from 'three';
import type { HairStyleId } from './character';

export type Vec3Tuple = [number, number, number];

export interface SpringJointSpec {
  name: string;
  /** Local translation from its parent bone/joint (meters, export/rest frame). */
  localOffset: Vec3Tuple;
  hitRadius: number;
  stiffness: number;
  gravityPower: number;
  gravityDir: Vec3Tuple;
  dragForce: number;
}

export interface SpringChainSpec {
  name: string;
  category: 'hair' | 'hem';
  /** Humanoid bone name the root joint attaches to (e.g. 'head', 'hips'). */
  parentBone: string;
  colliderGroups: string[];
  /** Ordered root-to-tip joints; length >= 2 per VRMC_springBone 1.0. */
  joints: SpringJointSpec[];
  /** Azimuth around +Y (0 = +Z front, PI/2 = +X left) for radial hem chains. */
  azimuth?: number;
  /** Rest-pose world Y bounds of the hem region this chain drives. */
  hemTopY?: number;
  hemBottomY?: number;
}

export type SpringColliderShape =
  | { sphere: { offset: Vec3Tuple; radius: number } }
  | { capsule: { offset: Vec3Tuple; radius: number; tail: Vec3Tuple } };

export interface SpringColliderSpec {
  id: string;
  bone: string;
  shape: SpringColliderShape;
}

export interface SpringColliderGroupSpec {
  name: string;
  colliderIds: string[];
}

export interface SpringBoneRigSpec {
  colliders: SpringColliderSpec[];
  colliderGroups: SpringColliderGroupSpec[];
  chains: SpringChainSpec[];
}

export interface FlowingHemBounds {
  topY: number;
  bottomY: number;
  radiusX: number;
  radiusZ: number;
}

export interface SpringBoneSpecInput {
  hairStyle: HairStyleId;
  flowingHem?: FlowingHemBounds | null;
  /** World-space T-pose / rest positions of the humanoid bones (meters). */
  bones: Record<string, Vec3Tuple>;
  /** Character stature in meters (1.7 is reference). */
  height: number;
}

/** Garment IDs whose lower hem moves as a flowing cloth skirt/coat. */
export const FLOWING_HEM_GARMENTS: ReadonlySet<string> = new Set([
  'skirt',
  'skirtLong',
  'dress',
  'dressLong',
  'coat',
  'cardigan',
]);

export function garmentIdFromMeshName(name: string): string {
  return name.startsWith('G_') ? name.slice(2) : name;
}

export function isFlowingHemGarment(name: string): boolean {
  return FLOWING_HEM_GARMENTS.has(garmentIdFromMeshName(name));
}

const GRAVITY_DOWN: Vec3Tuple = [0, -1, 0];

function sub3(a: Vec3Tuple, b: Vec3Tuple): Vec3Tuple {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale3(v: Vec3Tuple, s: number): Vec3Tuple {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

interface HairPreset {
  segments: number;
  length: number;
  stiffness: number;
  dragForce: number;
  gravityPower: number;
  hitRadius: number;
  chains: Array<{ name: string; rootOffset: Vec3Tuple; dir: Vec3Tuple }>;
}

const HAIR_PRESETS: Record<HairStyleId, HairPreset> = {
  long: {
    segments: 2,
    length: 0.34,
    stiffness: 0.85,
    dragForce: 0.45,
    gravityPower: 0.35,
    hitRadius: 0.025,
    chains: [
      { name: 'hairBack', rootOffset: [0, 0.04, -0.09], dir: [0, -0.98, -0.2] },
      { name: 'hairLeft', rootOffset: [0.075, 0.03, -0.02], dir: [0.12, -0.99, -0.05] },
      { name: 'hairRight', rootOffset: [-0.075, 0.03, -0.02], dir: [-0.12, -0.99, -0.05] },
    ],
  },
  bob: {
    segments: 2,
    length: 0.18,
    stiffness: 1.35,
    dragForce: 0.5,
    gravityPower: 0.25,
    hitRadius: 0.022,
    chains: [
      { name: 'hairBack', rootOffset: [0, 0.04, -0.085], dir: [0, -0.98, -0.2] },
      { name: 'hairLeft', rootOffset: [0.075, 0.03, -0.01], dir: [0.1, -0.99, -0.05] },
      { name: 'hairRight', rootOffset: [-0.075, 0.03, -0.01], dir: [-0.1, -0.99, -0.05] },
    ],
  },
  ponytail: {
    segments: 3,
    length: 0.36,
    stiffness: 0.7,
    dragForce: 0.4,
    gravityPower: 0.4,
    hitRadius: 0.028,
    chains: [
      { name: 'hairPonytail', rootOffset: [0, 0.06, -0.1], dir: [0, -0.94, -0.34] },
    ],
  },
  short: {
    segments: 1,
    length: 0.09,
    stiffness: 2.0,
    dragForce: 0.6,
    gravityPower: 0.15,
    hitRadius: 0.02,
    chains: [
      { name: 'hairBack', rootOffset: [0, 0.04, -0.085], dir: [0, -0.95, -0.3] },
      { name: 'hairSide', rootOffset: [0.065, 0.04, 0.01], dir: [0.2, -0.98, 0] },
    ],
  },
  bun: {
    segments: 1,
    length: 0.08,
    stiffness: 2.2,
    dragForce: 0.6,
    gravityPower: 0.12,
    hitRadius: 0.03,
    chains: [
      { name: 'hairBun', rootOffset: [0, 0.11, -0.085], dir: [0, -0.7, -0.71] },
    ],
  },
};

function buildColliders(bones: Record<string, Vec3Tuple>, scale: number): {
  colliders: SpringColliderSpec[];
  colliderGroups: SpringColliderGroupSpec[];
} {
  const colliders: SpringColliderSpec[] = [];
  const headIds: string[] = [];
  const torsoIds: string[] = [];
  const legIds: string[] = [];

  if (bones.head) {
    colliders.push({
      id: 'col_head',
      bone: 'head',
      shape: { sphere: { offset: [0, 0.07 * scale, 0.005 * scale], radius: 0.095 * scale } },
    });
    headIds.push('col_head');
  }
  if (bones.upperChest) {
    colliders.push({
      id: 'col_upperChest',
      bone: 'upperChest',
      shape: { sphere: { offset: [0, 0.02 * scale, 0], radius: 0.125 * scale } },
    });
    torsoIds.push('col_upperChest');
  }
  if (bones.hips) {
    colliders.push({
      id: 'col_hips',
      bone: 'hips',
      shape: { sphere: { offset: [0, -0.02 * scale, 0], radius: 0.115 * scale } },
    });
    legIds.push('col_hips');
  }

  for (const side of ['left', 'right'] as const) {
    const up = bones[`${side}UpperLeg`];
    const low = bones[`${side}LowerLeg`];
    const foot = bones[`${side}Foot`];
    if (up && low) {
      const id = `col_${side}UpperLeg`;
      colliders.push({
        id,
        bone: `${side}UpperLeg`,
        shape: {
          capsule: {
            offset: [0, 0, 0],
            tail: sub3(low, up),
            radius: 0.072 * scale,
          },
        },
      });
      legIds.push(id);
    }
    if (low && foot) {
      const id = `col_${side}LowerLeg`;
      colliders.push({
        id,
        bone: `${side}LowerLeg`,
        shape: {
          capsule: {
            offset: [0, 0, 0],
            tail: sub3(foot, low),
            radius: 0.052 * scale,
          },
        },
      });
      legIds.push(id);
    }
  }

  const colliderGroups: SpringColliderGroupSpec[] = [];
  if (headIds.length) colliderGroups.push({ name: 'head', colliderIds: headIds });
  if (torsoIds.length) colliderGroups.push({ name: 'torso', colliderIds: torsoIds });
  if (legIds.length) colliderGroups.push({ name: 'legs', colliderIds: legIds });

  return { colliders, colliderGroups };
}

function buildHairChains(
  hairStyle: HairStyleId,
  bones: Record<string, Vec3Tuple>,
  scale: number,
  groupNames: Set<string>,
): SpringChainSpec[] {
  if (!bones.head) return [];
  const preset = HAIR_PRESETS[hairStyle] ?? HAIR_PRESETS.bob;
  const step = (preset.length * scale) / preset.segments;
  const groups = ['head', 'torso'].filter((g) => groupNames.has(g));

  return preset.chains.map((def) => {
    const joints: SpringJointSpec[] = [];
    for (let i = 0; i <= preset.segments; i++) {
      const t = i / preset.segments;
      const localOffset: Vec3Tuple =
        i === 0 ? scale3(def.rootOffset, scale) : scale3(def.dir, step);
      joints.push({
        name: i === preset.segments ? `${def.name}_tip` : `${def.name}_${i}`,
        localOffset,
        hitRadius: preset.hitRadius * scale,
        stiffness: preset.stiffness * (1 - 0.25 * t),
        gravityPower: preset.gravityPower,
        gravityDir: [...GRAVITY_DOWN],
        dragForce: preset.dragForce,
      });
    }
    return {
      name: def.name,
      category: 'hair',
      parentBone: 'head',
      colliderGroups: groups,
      joints,
    };
  });
}

const HEM_DIRECTIONS: ReadonlyArray<{ name: string; azimuth: number; sx: number; sz: number }> = [
  { name: 'hemFront', azimuth: 0, sx: 0, sz: 1 },
  { name: 'hemBack', azimuth: Math.PI, sx: 0, sz: -1 },
  { name: 'hemLeft', azimuth: Math.PI / 2, sx: 1, sz: 0 },
  { name: 'hemRight', azimuth: -Math.PI / 2, sx: -1, sz: 0 },
];

function buildHemChains(
  hem: FlowingHemBounds,
  bones: Record<string, Vec3Tuple>,
  scale: number,
  groupNames: Set<string>,
): SpringChainSpec[] {
  const hips = bones.hips;
  if (!hips) return [];
  const drop = hem.topY - hem.bottomY;
  if (drop < 0.06 * scale) return [];

  const isLong = drop > 0.55 * scale;
  const stiffness = isLong ? 0.75 : 1.1;
  const dragForce = isLong ? 0.45 : 0.5;
  const gravityPower = isLong ? 0.35 : 0.25;
  const hitRadius = 0.025 * scale;
  const groups = ['legs'].filter((g) => groupNames.has(g));
  const segY = -drop / 2;
  const flare = 0.018 * scale;

  return HEM_DIRECTIONS.map((dir) => {
    const rx = Math.max(0.08 * scale, hem.radiusX);
    const rz = Math.max(0.07 * scale, hem.radiusZ);
    const rootOffset: Vec3Tuple = [
      dir.sx * rx,
      hem.topY - hips[1],
      dir.sz * rz,
    ];
    const segOffset: Vec3Tuple = [dir.sx * flare, segY, dir.sz * flare];
    const joints: SpringJointSpec[] = [
      {
        name: `${dir.name}_0`,
        localOffset: rootOffset,
        hitRadius,
        stiffness,
        gravityPower,
        gravityDir: [...GRAVITY_DOWN],
        dragForce,
      },
      {
        name: `${dir.name}_1`,
        localOffset: segOffset,
        hitRadius,
        stiffness: stiffness * 0.85,
        gravityPower,
        gravityDir: [...GRAVITY_DOWN],
        dragForce,
      },
      {
        name: `${dir.name}_tip`,
        localOffset: segOffset,
        hitRadius,
        stiffness: stiffness * 0.7,
        gravityPower,
        gravityDir: [...GRAVITY_DOWN],
        dragForce,
      },
    ];
    return {
      name: dir.name,
      category: 'hem',
      parentBone: 'hips',
      colliderGroups: groups,
      joints,
      azimuth: dir.azimuth,
      hemTopY: hem.topY,
      hemBottomY: hem.bottomY,
    };
  });
}

/** Build the complete spring-bone specification (colliders, groups,
 *  hair chains, and flowing-hem chains) for a character + outfit. */
export function buildSpringBoneSpec(input: SpringBoneSpecInput): SpringBoneRigSpec {
  const scale = clamp(input.height / 1.7, 0.75, 1.35);
  const { colliders, colliderGroups } = buildColliders(input.bones, scale);
  const groupNames = new Set(colliderGroups.map((g) => g.name));
  const chains: SpringChainSpec[] = [
    ...buildHairChains(input.hairStyle, input.bones, scale, groupNames),
    ...(input.flowingHem ? buildHemChains(input.flowingHem, input.bones, scale, groupNames) : []),
  ];
  return { colliders, colliderGroups, chains };
}

/** Serialize a SpringBoneRigSpec into the VRM 1.0 `VRMC_springBone`
 *  glTF root extension payload. Throws if any referenced bone node
 *  is missing from `nodeIndexByName`. */
export function buildVrmcSpringBoneExtension(
  spec: SpringBoneRigSpec,
  nodeIndexByName: ReadonlyMap<string, number>,
): Record<string, unknown> {
  const requireNode = (name: string): number => {
    const idx = nodeIndexByName.get(name);
    if (idx === undefined) throw new Error(`VRMC_springBone: missing node for bone "${name}"`);
    return idx;
  };

  const colliderIndex = new Map<string, number>();
  const colliders = spec.colliders.map((c, i) => {
    colliderIndex.set(c.id, i);
    const shape =
      'sphere' in c.shape
        ? { sphere: { offset: [...c.shape.sphere.offset], radius: c.shape.sphere.radius } }
        : {
            capsule: {
              offset: [...c.shape.capsule.offset],
              radius: c.shape.capsule.radius,
              tail: [...c.shape.capsule.tail],
            },
          };
    return { node: requireNode(c.bone), shape };
  });

  const groupIndex = new Map<string, number>();
  const colliderGroups = spec.colliderGroups.map((g, i) => {
    groupIndex.set(g.name, i);
    return {
      name: g.name,
      colliders: g.colliderIds.map((id) => {
        const idx = colliderIndex.get(id);
        if (idx === undefined) throw new Error(`VRMC_springBone: missing collider "${id}"`);
        return idx;
      }),
    };
  });

  const springs = spec.chains.map((chain) => {
    if (chain.joints.length < 2) {
      throw new Error(`VRMC_springBone: chain "${chain.name}" needs at least 2 joints`);
    }
    const spring: Record<string, unknown> = {
      name: chain.name,
      joints: chain.joints.map((j) => ({
        node: requireNode(j.name),
        hitRadius: j.hitRadius,
        stiffness: j.stiffness,
        gravityPower: j.gravityPower,
        gravityDir: [...j.gravityDir],
        dragForce: j.dragForce,
      })),
    };
    const groups = chain.colliderGroups
      .map((name) => groupIndex.get(name))
      .filter((idx): idx is number => idx !== undefined);
    if (groups.length > 0) spring.colliderGroups = groups;
    return spring;
  });

  const ext: Record<string, unknown> = {
    specVersion: '1.0',
    springs,
  };
  if (colliders.length > 0) ext.colliders = colliders;
  if (colliderGroups.length > 0) ext.colliderGroups = colliderGroups;
  return ext;
}

/** Blend flowing-hem vertex skinning weights onto the radial hem
 *  spring bones so external VRM runtimes deform the hem mesh directly.
 *  Preserves T-pose geometry (bind pose is unchanged) and keeps each
 *  vertex's 4 weights normalized to 1. */
export function reweightHemVertices(
  positions: ArrayLike<number>,
  skinJoints: Uint8Array,
  skinWeights: Float32Array,
  hemChains: readonly SpringChainSpec[],
  jointIndexByName: ReadonlyMap<string, number>,
  centerX: number,
  centerZ: number,
): void {
  if (hemChains.length === 0) return;
  const topY = hemChains[0].hemTopY;
  const bottomY = hemChains[0].hemBottomY;
  if (topY === undefined || bottomY === undefined || topY <= bottomY) return;

  const resolved = hemChains
    .map((c) => {
      const j0 = jointIndexByName.get(c.joints[0]?.name ?? '');
      const j1 = jointIndexByName.get(c.joints[1]?.name ?? '');
      if (j0 === undefined || j1 === undefined || c.azimuth === undefined) return null;
      return { j0, j1, sx: Math.sin(c.azimuth), sz: Math.cos(c.azimuth) };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  if (resolved.length === 0) return;

  const span = topY - bottomY;
  const vertexCount = positions.length / 3;

  for (let i = 0; i < vertexCount; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    if (y >= topY) continue;

    // Smoothly ramp spring influence from 0 at waist/hips to 0.65 at the hem.
    const t = clamp((topY - y) / span, 0, 1);
    const springWeight = 0.65 * t * t;
    if (springWeight < 0.01) continue;

    // Pick the radial hem chain closest to this vertex's horizontal direction.
    const dx = x - centerX;
    const dz = z - centerZ;
    const len = Math.hypot(dx, dz) || 1;
    const nx = dx / len;
    const nz = dz / len;
    let best = resolved[0];
    let bestDot = -Infinity;
    for (const c of resolved) {
      const dot = nx * c.sx + nz * c.sz;
      if (dot > bestDot) {
        bestDot = dot;
        best = c;
      }
    }

    // Upper half of hem follows joint 0; lower half follows joint 1.
    const springJoint = t > 0.5 ? best.j1 : best.j0;
    const base = i * 4;
    const keepScale = 1 - springWeight;

    // Check if the spring joint is already in a slot, else replace the smallest slot.
    let targetSlot = -1;
    let minSlot = 0;
    let minWeight = skinWeights[base];
    for (let k = 0; k < 4; k++) {
      if (skinJoints[base + k] === springJoint && skinWeights[base + k] > 0) {
        targetSlot = k;
        break;
      }
      if (skinWeights[base + k] < minWeight) {
        minWeight = skinWeights[base + k];
        minSlot = k;
      }
    }
    const slot = targetSlot >= 0 ? targetSlot : minSlot;
    for (let k = 0; k < 4; k++) {
      if (k === slot) continue;
      skinWeights[base + k] *= keepScale;
    }
    skinJoints[base + slot] = springJoint;
    skinWeights[base + slot] = targetSlot >= 0 ? skinWeights[base + slot] * keepScale + springWeight : springWeight;

    // Renormalize to guarantee exact sum = 1.
    let sum = 0;
    for (let k = 0; k < 4; k++) sum += skinWeights[base + k];
    if (sum > 0) {
      for (let k = 0; k < 4; k++) skinWeights[base + k] /= sum;
    }
  }
}

// ---------- in-app Verlet runtime (shared with VRMC_springBone spec) ----------

interface RuntimeCollider {
  bone: THREE.Object3D;
  kind: 'sphere' | 'capsule';
  offset: THREE.Vector3;
  tail: THREE.Vector3;
  radius: number;
}

interface RuntimeSegment {
  chainName: string;
  bone: THREE.Bone;
  child: THREE.Bone;
  restLocalPos: THREE.Vector3;
  restDirLocal: THREE.Vector3;
  restLength: number;
  initialLocalQuat: THREE.Quaternion;
  hitRadius: number;
  stiffness: number;
  dragForce: number;
  gravityPower: number;
  gravityDir: THREE.Vector3;
  colliders: RuntimeCollider[];
  prevTail: THREE.Vector3;
  currentTail: THREE.Vector3;
  initialized: boolean;
}

export interface SpringBoneRuntime {
  readonly spec: SpringBoneRigSpec;
  readonly bones: ReadonlyMap<string, THREE.Bone>;
  readonly segmentCount: number;
  /** Advance the Verlet simulation by `dt` seconds (clamped for stability). */
  step(dt: number): void;
  /** Snap all spring joints back to their rest pose and clear velocity. */
  reset(): void;
  /** Maximum angular deflection (radians) across all spring joints. */
  maxDeflectionRad(): number;
}

const _vBonePos = new THREE.Vector3();
const _vBoneScale = new THREE.Vector3();
const _vParentQuat = new THREE.Quaternion();
const _vInvParentQuat = new THREE.Quaternion();
const _vInertia = new THREE.Vector3();
const _vRestDir = new THREE.Vector3();
const _vNextTail = new THREE.Vector3();
const _vToDir = new THREE.Vector3();
const _vColPos = new THREE.Vector3();
const _vColQuat = new THREE.Quaternion();
const _vColScale = new THREE.Vector3();
const _vColHead = new THREE.Vector3();
const _vColTail = new THREE.Vector3();
const _vSeg = new THREE.Vector3();
const _vClosest = new THREE.Vector3();
const _vPush = new THREE.Vector3();
const _qDelta = new THREE.Quaternion();

/** Attach the spring-bone hierarchy described by `spec` onto a live
 *  rig's humanoid bones and return a Verlet solver driven by the
 *  exact same parameters written into `VRMC_springBone`. */
export function createSpringBoneRuntime(
  spec: SpringBoneRigSpec,
  humanoidBones: ReadonlyMap<string, THREE.Bone>,
): SpringBoneRuntime {
  const springBones = new Map<string, THREE.Bone>();
  const colliderById = new Map<string, RuntimeCollider>();

  for (const c of spec.colliders) {
    const bone = humanoidBones.get(c.bone);
    if (!bone) continue;
    if ('sphere' in c.shape) {
      colliderById.set(c.id, {
        bone,
        kind: 'sphere',
        offset: new THREE.Vector3(...c.shape.sphere.offset),
        tail: new THREE.Vector3(),
        radius: c.shape.sphere.radius,
      });
    } else {
      colliderById.set(c.id, {
        bone,
        kind: 'capsule',
        offset: new THREE.Vector3(...c.shape.capsule.offset),
        tail: new THREE.Vector3(...c.shape.capsule.tail),
        radius: c.shape.capsule.radius,
      });
    }
  }

  const groupColliders = new Map<string, RuntimeCollider[]>();
  for (const g of spec.colliderGroups) {
    const list: RuntimeCollider[] = [];
    for (const id of g.colliderIds) {
      const col = colliderById.get(id);
      if (col) list.push(col);
    }
    groupColliders.set(g.name, list);
  }

  const segments: RuntimeSegment[] = [];

  for (const chain of spec.chains) {
    const parentHumanoid = humanoidBones.get(chain.parentBone);
    if (!parentHumanoid || chain.joints.length < 2) continue;

    // Convert export/world-space offsets into the parent humanoid bone's
    // local coordinate frame (so calibration scales/rotations are respected).
    parentHumanoid.updateMatrixWorld(true);
    const invParentWorld = parentHumanoid.matrixWorld.clone().invert();
    const parentWorldPos = parentHumanoid.getWorldPosition(new THREE.Vector3());

    const chainBones: THREE.Bone[] = [];
    let prevWorld = parentWorldPos.clone();
    let parentObj: THREE.Object3D = parentHumanoid;

    for (const j of chain.joints) {
      const b = new THREE.Bone();
      b.name = j.name;
      const nextWorld = prevWorld.clone().add(new THREE.Vector3(...j.localOffset));
      if (parentObj === parentHumanoid) {
        const localPos = nextWorld.clone().applyMatrix4(invParentWorld);
        b.position.copy(localPos);
      } else {
        parentObj.updateMatrixWorld(true);
        const invPrev = parentObj.matrixWorld.clone().invert();
        b.position.copy(nextWorld.clone().applyMatrix4(invPrev));
      }
      parentObj.add(b);
      b.updateMatrixWorld(true);
      springBones.set(j.name, b);
      chainBones.push(b);
      prevWorld = nextWorld;
      parentObj = b;
    }

    const colliders: RuntimeCollider[] = [];
    for (const gName of chain.colliderGroups) {
      const list = groupColliders.get(gName);
      if (list) colliders.push(...list);
    }

    for (let i = 0; i < chainBones.length - 1; i++) {
      const bone = chainBones[i];
      const child = chainBones[i + 1];
      const specJoint = chain.joints[i];
      const restLocalPos = child.position.clone();
      const restLength = restLocalPos.length();
      if (restLength < 1e-5) continue;
      segments.push({
        chainName: chain.name,
        bone,
        child,
        restLocalPos,
        restDirLocal: restLocalPos.clone().divideScalar(restLength),
        restLength,
        initialLocalQuat: bone.quaternion.clone(),
        hitRadius: specJoint.hitRadius,
        stiffness: specJoint.stiffness,
        dragForce: specJoint.dragForce,
        gravityPower: specJoint.gravityPower,
        gravityDir: new THREE.Vector3(...specJoint.gravityDir),
        colliders,
        prevTail: new THREE.Vector3(),
        currentTail: new THREE.Vector3(),
        initialized: false,
      });
    }
  }

  function resolveColliders(
    nextTail: THREE.Vector3,
    bonePos: THREE.Vector3,
    worldLen: number,
    seg: RuntimeSegment,
  ): void {
    for (const col of seg.colliders) {
      col.bone.matrixWorld.decompose(_vColPos, _vColQuat, _vColScale);
      const colScale = (_vColScale.x + _vColScale.y + _vColScale.z) / 3;
      const minDist = (col.radius + seg.hitRadius) * colScale;

      _vColHead.copy(col.offset).multiplyScalar(colScale).applyQuaternion(_vColQuat).add(_vColPos);
      if (col.kind === 'sphere') {
        _vClosest.copy(_vColHead);
      } else {
        _vColTail.copy(col.tail).multiplyScalar(colScale).applyQuaternion(_vColQuat).add(_vColPos);
        _vSeg.subVectors(_vColTail, _vColHead);
        const lenSq = _vSeg.lengthSq();
        if (lenSq > 1e-10) {
          const t = clamp(_vPush.subVectors(nextTail, _vColHead).dot(_vSeg) / lenSq, 0, 1);
          _vClosest.copy(_vColHead).addScaledVector(_vSeg, t);
        } else {
          _vClosest.copy(_vColHead);
        }
      }

      _vPush.subVectors(nextTail, _vClosest);
      const d = _vPush.length();
      if (d < minDist) {
        if (d > 1e-6) {
          nextTail.copy(_vClosest).addScaledVector(_vPush, minDist / d);
        } else {
          nextTail.copy(_vClosest).add(new THREE.Vector3(0, 0, minDist));
        }
        // Re-apply bone length constraint after collision push-out.
        _vPush.subVectors(nextTail, bonePos);
        const len = _vPush.length();
        if (len > 1e-6) nextTail.copy(bonePos).addScaledVector(_vPush, worldLen / len);
      }
    }
  }

  function reset(): void {
    for (const seg of segments) {
      seg.bone.quaternion.copy(seg.initialLocalQuat);
      seg.bone.updateMatrixWorld(true);
      seg.child.getWorldPosition(seg.currentTail);
      seg.prevTail.copy(seg.currentTail);
      seg.initialized = true;
    }
  }

  function step(dt: number): void {
    const stepDt = clamp(dt, 0, 0.05);
    for (const seg of segments) {
      if (!seg.initialized) {
        seg.bone.quaternion.copy(seg.initialLocalQuat);
        seg.bone.updateMatrixWorld(true);
        seg.child.getWorldPosition(seg.currentTail);
        seg.prevTail.copy(seg.currentTail);
        seg.initialized = true;
        continue;
      }
      if (stepDt <= 0) continue;

      const parent = seg.bone.parent;
      if (!parent) continue;
      parent.matrixWorld.decompose(_vColPos, _vParentQuat, _vBoneScale);
      seg.bone.getWorldPosition(_vBonePos);
      const boneScale = (_vBoneScale.x + _vBoneScale.y + _vBoneScale.z) / 3;
      const worldLen = seg.restLength * boneScale;
      if (worldLen < 1e-6) continue;

      // Verlet integration (VRM 1.0 VRMC_springBone algorithm).
      _vInertia.subVectors(seg.currentTail, seg.prevTail).multiplyScalar(1 - seg.dragForce);
      _vRestDir
        .copy(seg.restDirLocal)
        .applyQuaternion(seg.initialLocalQuat)
        .applyQuaternion(_vParentQuat);

      _vNextTail
        .copy(seg.currentTail)
        .add(_vInertia)
        .addScaledVector(_vRestDir, seg.stiffness * stepDt)
        .addScaledVector(seg.gravityDir, seg.gravityPower * stepDt);

      // Length constraint
      _vPush.subVectors(_vNextTail, _vBonePos);
      const dist = _vPush.length();
      if (dist > 1e-6) {
        _vNextTail.copy(_vBonePos).addScaledVector(_vPush, worldLen / dist);
      } else {
        _vNextTail.copy(_vBonePos).addScaledVector(_vRestDir, worldLen);
      }

      resolveColliders(_vNextTail, _vBonePos, worldLen, seg);

      seg.prevTail.copy(seg.currentTail);
      seg.currentTail.copy(_vNextTail);

      // Rotate bone from rest direction to simulated direction in parent local frame.
      _vInvParentQuat.copy(_vParentQuat).invert();
      _vToDir.subVectors(_vNextTail, _vBonePos).normalize().applyQuaternion(_vInvParentQuat);
      _vRestDir.copy(seg.restDirLocal).applyQuaternion(seg.initialLocalQuat).normalize();
      _qDelta.setFromUnitVectors(_vRestDir, _vToDir);
      seg.bone.quaternion.copy(_qDelta).multiply(seg.initialLocalQuat);
      seg.bone.updateMatrixWorld(true);
    }
  }

  function maxDeflectionRad(): number {
    let max = 0;
    for (const seg of segments) {
      const a = seg.bone.quaternion.angleTo(seg.initialLocalQuat);
      if (a > max) max = a;
    }
    return max;
  }

  return {
    spec,
    bones: springBones,
    segmentCount: segments.length,
    step,
    reset,
    maxDeflectionRad,
  };
}

