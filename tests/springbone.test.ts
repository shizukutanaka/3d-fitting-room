import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_CHARACTER } from '../src/character';
import { parseGlb } from '../src/glb';
import { DEFAULT_OUTFIT, type Outfit } from '../src/outfit';
import {
  buildSpringBoneSpec,
  buildVrmcSpringBoneExtension,
  reweightHemVertices,
  type Vec3Tuple,
} from '../src/springbone';

// Stub DOM canvas + model fetch so exportVrm/exportGlb run against the
// real mannequin GLB in Node (same harness as tests/wardrobe.test.ts).
const canvasStub = { width: 0, height: 0, style: {}, getContext: () => ctxStub };
const ctxStub: unknown = new Proxy(function () {}, {
  get: (_t, prop) => (prop === 'canvas' ? canvasStub : ctxStub),
  set: () => true,
  apply: () => ctxStub,
});
(globalThis as { document?: unknown }).document = {
  createElement: (tag: string) => (tag === 'canvas' ? canvasStub : {}),
};
vi.stubEnv('BASE_URL', 'http://test.invalid/');
(globalThis as { ProgressEvent?: unknown }).ProgressEvent ??= class extends Event {
  lengthComputable = false;
  loaded = 0;
  total = 0;
};
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const m = /\/models\/(.+)$/.exec(url);
  if (!m) return realFetch(input);
  const buf = readFileSync(new URL(`../public/models/${m[1]}`, import.meta.url));
  return new Response(buf, { status: 200 });
}) as typeof fetch;

const { exportGlb, exportVrm } = await import('../src/export3d');

const SAMPLE_BONES: Record<string, Vec3Tuple> = {
  hips: [0, 0.92, 0],
  upperChest: [0, 1.32, 0],
  head: [0, 1.56, 0],
  leftUpperLeg: [0.09, 0.88, 0],
  leftLowerLeg: [0.09, 0.48, 0],
  leftFoot: [0.09, 0.08, 0],
  rightUpperLeg: [-0.09, 0.88, 0],
  rightLowerLeg: [-0.09, 0.48, 0],
  rightFoot: [-0.09, 0.08, 0],
};

describe('VRMC_springBone spec builder', () => {
  it('returns an empty spec when no flowing hem is present (no unskinned hair ghost bones)', () => {
    const spec = buildSpringBoneSpec({
      flowingHem: null,
      bones: SAMPLE_BONES,
      height: 1.7,
    });
    expect(spec.chains).toHaveLength(0);
    expect(spec.colliders).toHaveLength(0);
    expect(spec.colliderGroups).toHaveLength(0);
  });

  it('adds 4 radial hem chains and leg colliders when a flowing hem is present', () => {
    const spec = buildSpringBoneSpec({
      flowingHem: { topY: 0.92, bottomY: 0.2, radiusX: 0.16, radiusZ: 0.14 },
      bones: SAMPLE_BONES,
      height: 1.7,
    });
    expect(spec.chains.map((c) => c.name)).toEqual(['hemFront', 'hemBack', 'hemLeft', 'hemRight']);
    for (const c of spec.chains) {
      expect(c.parentBone).toBe('hips');
      expect(c.joints).toHaveLength(3);
      expect(c.colliderGroups).toContain('legs');
    }
    expect(spec.colliders.length).toBe(5);
  });

  it('reweightHemVertices shifts lower hem vertices to spring joints while keeping weights normalized', () => {
    const spec = buildSpringBoneSpec({
      flowingHem: { topY: 0.9, bottomY: 0.3, radiusX: 0.15, radiusZ: 0.14 },
      bones: SAMPLE_BONES,
      height: 1.7,
    });
    const hemChains = spec.chains;
    const idxMap = new Map<string, number>([['hips', 0]]);
    let next = 1;
    for (const c of hemChains) for (const j of c.joints) idxMap.set(j.name, next++);

    // Two vertices: one above waist (untouched), one at front hem bottom (reweighted).
    const positions = new Float32Array([
      0, 1.0, 0.15,
      0, 0.3, 0.18,
    ]);
    const skinJoints = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const skinWeights = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0]);

    reweightHemVertices(positions, skinJoints, skinWeights, hemChains, idxMap, 0, 0);

    // Waist vertex untouched
    expect(skinJoints[0]).toBe(0);
    expect(skinWeights[0]).toBeCloseTo(1, 5);
    // Front hem bottom vertex has weight on hemFront_1
    const front1 = idxMap.get('hemFront_1')!;
    const slots = [0, 1, 2, 3].map((k) => ({ j: skinJoints[4 + k], w: skinWeights[4 + k] }));
    const springSlot = slots.find((s) => s.j === front1);
    expect(springSlot).toBeDefined();
    expect(springSlot!.w).toBeGreaterThan(0.5);
    const total = slots.reduce((acc, s) => acc + s.w, 0);
    expect(total).toBeCloseTo(1, 5);
  });

  it('fails loudly if a referenced bone node is missing', () => {
    const spec = buildSpringBoneSpec({
      flowingHem: { topY: 0.92, bottomY: 0.2, radiusX: 0.16, radiusZ: 0.14 },
      bones: SAMPLE_BONES,
      height: 1.7,
    });
    expect(() => buildVrmcSpringBoneExtension(spec, new Map())).toThrow(/missing node/);
  });
});

describe('VRM export VRMC_springBone integration', { timeout: 60000 }, () => {
  it('writes VRMC_springBone with hem springs and reweighted skirt mesh', async () => {
    const outfit: Outfit = {
      ...DEFAULT_OUTFIT,
      topStyle: 'tee',
      bottomStyle: 'skirtLong',
      outerStyle: 'none',
      character: { ...DEFAULT_CHARACTER },
    };
    const { bytes } = await exportVrm(outfit, 'a', 'standard');
    const parsed = parseGlb(bytes)!;
    expect(parsed).not.toBeNull();
    const json = parsed.json as any;

    expect(json.extensionsUsed).toContain('VRMC_vrm');
    expect(json.extensionsUsed).toContain('VRMC_springBone');
    const sb = json.extensions.VRMC_springBone;
    expect(sb.specVersion).toBe('1.0');
    expect(sb.colliders.length).toBeGreaterThan(0);
    expect(sb.colliderGroups.length).toBeGreaterThan(0);

    const springNames: string[] = sb.springs.map((s: any) => s.name);
    expect(springNames).toEqual(['hemFront', 'hemBack', 'hemLeft', 'hemRight']);

    // Every spring joint node must exist in skin.joints and form a parent-child chain.
    const skinJointSet = new Set<number>(json.skins[0].joints);
    for (const spring of sb.springs) {
      expect(spring.joints.length).toBeGreaterThanOrEqual(2);
      for (let i = 0; i < spring.joints.length; i++) {
        const nodeIdx: number = spring.joints[i].node;
        expect(skinJointSet.has(nodeIdx)).toBe(true);
        if (i + 1 < spring.joints.length) {
          const nextIdx: number = spring.joints[i + 1].node;
          expect(json.nodes[nodeIdx].children).toContain(nextIdx);
        }
      }
    }

    // Skirt mesh must reference at least one hem spring joint in JOINTS_0.
    const skirtMesh = json.meshes.find((m: any) => m.name === 'G_skirtLong');
    expect(skirtMesh).toBeDefined();
    const prim = skirtMesh.primitives[0];
    const jointsAcc = json.accessors[prim.attributes.JOINTS_0];
    const jView = json.bufferViews[jointsAcc.bufferView];
    const jData = new Uint8Array(
      parsed.bin.buffer,
      parsed.bin.byteOffset + jView.byteOffset,
      jointsAcc.count * 4,
    );
    const hemJointIndices = new Set<number>();
    for (const spring of sb.springs) {
      if (spring.name.startsWith('hem')) {
        for (const j of spring.joints) hemJointIndices.add(j.node);
      }
    }
    let weightedToHem = 0;
    for (let i = 0; i < jData.length; i++) {
      if (hemJointIndices.has(jData[i])) weightedToHem++;
    }
    expect(weightedToHem).toBeGreaterThan(0);
  });

  it('omits VRMC_springBone when wearing non-flowing bottoms and in plain GLB', async () => {
    const outfit: Outfit = {
      ...DEFAULT_OUTFIT,
      topStyle: 'tee',
      bottomStyle: 'pants',
      outerStyle: 'none',
    };
    const vrm = parseGlb((await exportVrm(outfit, 'a', 'standard')).bytes)!.json as any;
    expect(vrm.extensionsUsed).toContain('VRMC_vrm');
    expect(vrm.extensionsUsed).not.toContain('VRMC_springBone');
    expect(vrm.extensions?.VRMC_springBone).toBeUndefined();
    expect(vrm.skins[0].joints).toHaveLength(22);

    const glb = parseGlb((await exportGlb(outfit, 'a', 'standard')).bytes)!.json as any;
    expect(glb.extensions?.VRMC_springBone).toBeUndefined();
    expect(glb.skins[0].joints).toHaveLength(22);
  });
});
