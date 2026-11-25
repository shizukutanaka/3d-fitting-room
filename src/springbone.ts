// Single source of truth for spring secondary motion (hair and
// flowing garment hems). Pure data and math — no renderer or DOM —
// so the VRM 1.0 VRMC_springBone exporter (src/export3d.ts) and the
// in-app Verlet solver (src/avatar.ts) share the exact same chain
// topology, joint parameters, and body colliders.

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
