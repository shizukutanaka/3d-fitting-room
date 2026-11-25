import { describe, expect, it } from 'vitest';
import {
  buildGlb,
  extractSeedFromGlb,
  parseGlb,
  type GlbMaterialDef,
  type GlbPartDef,
  type GlbSkinDef,
} from '../src/glb';

// The GLB writer/reader (src/glb.ts) is pure byte code, tested
// here without a DOM or a renderer: structure, accessor layout,
// and the seed that rides in the root extras. The full round-trip
// through a real glTF loader is covered by the headless run
// (tools/verify-export.cjs).

const MATERIALS: GlbMaterialDef[] = [
  { name: 'mat-a', baseColorFactor: [1, 0.5, 0.25, 1], roughnessFactor: 0.8, metallicFactor: 0 },
  {
    name: 'mat-b',
    baseColorFactor: [0.1, 0.2, 0.3, 0.5],
    roughnessFactor: 0.2,
    metallicFactor: 0.9,
    alphaMode: 'BLEND',
    doubleSided: true,
  },
];

// One indexed quad-ish part (two triangles, with uvs) and one
// non-indexed triangle without uvs.
const PARTS: GlbPartDef[] = [
  {
    name: 'part-a',
    positions: new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]),
    normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint16Array([0, 1, 2, 0, 2, 3]),
    material: 0,
  },
  {
    name: 'part-b',
    positions: new Float32Array([-1, 2, 0.5, 0, 3, 0.5, 1, 2, 0.5]),
    normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]),
    material: 1,
  },
];

const SEED = 'FR4-DGVzdCBzZWVk';

function build() {
  return buildGlb(PARTS, MATERIALS, {
    generator: 'test-generator',
    extras: { fittingRoomSeed: SEED },
  });
}

describe('GLB writer', () => {
  it('writes a well-formed GLB v2 container', () => {
    const bytes = build();
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    expect(view.getUint32(0, true)).toBe(0x46546c67); // 'glTF'
    expect(view.getUint32(4, true)).toBe(2);
    expect(view.getUint32(8, true)).toBe(bytes.length);
    expect(view.getUint32(16, true)).toBe(0x4e4f534a); // JSON chunk first
    const jsonLength = view.getUint32(12, true);
    expect(jsonLength % 4).toBe(0);
    const binHeader = 20 + jsonLength;
    expect(view.getUint32(binHeader + 4, true)).toBe(0x004e4942); // BIN chunk second
    expect(view.getUint32(binHeader, true) % 4).toBe(0);
  });

  it('describes every part as a node + mesh with a root', () => {
    const parsed = parseGlb(build())!;
    const json = parsed.json as any;
    expect(json.asset.version).toBe('2.0');
    expect(json.asset.generator).toBe('test-generator');
    expect(json.meshes).toHaveLength(2);
    expect(json.nodes).toHaveLength(3); // 2 parts + root
    expect(json.scenes[0].nodes).toEqual([2]);
    expect(json.nodes[2].children).toEqual([0, 1]);
    expect(json.nodes[0].name).toBe('part-a');
    expect(json.meshes[0].primitives[0].material).toBe(0);
    expect(json.meshes[1].primitives[0].material).toBe(1);
    // the non-indexed part has no indices accessor
    expect(json.meshes[1].primitives[0].indices).toBeUndefined();
    expect(json.meshes[0].primitives[0].indices).toBeDefined();
  });

  it('records material factors, blend and double-sided flags', () => {
    const json = parseGlb(build())!.json as any;
    const [a, b] = json.materials;
    expect(a.pbrMetallicRoughness.baseColorFactor).toEqual([1, 0.5, 0.25, 1]);
    expect(a.pbrMetallicRoughness.roughnessFactor).toBe(0.8);
    expect(a.alphaMode).toBeUndefined(); // opaque is the default: not written
    expect(a.doubleSided).toBeUndefined();
    expect(b.alphaMode).toBe('BLEND');
    expect(b.doubleSided).toBe(true);
    expect(b.pbrMetallicRoughness.metallicFactor).toBe(0.9);
  });

  it('computes POSITION min/max and keeps buffer views 4-byte aligned', () => {
    const json = parseGlb(build())!.json as any;
    const posA = json.accessors[json.meshes[0].primitives[0].attributes.POSITION];
    expect(posA.min).toEqual([0, 0, 0]);
    expect(posA.max).toEqual([1, 1, 0]);
    const posB = json.accessors[json.meshes[1].primitives[0].attributes.POSITION];
    expect(posB.min).toEqual([-1, 2, 0.5]);
    expect(posB.max).toEqual([1, 3, 0.5]);
    for (const view of json.bufferViews) {
      expect(view.byteOffset % 4).toBe(0);
    }
    const declared = json.buffers[0].byteLength;
    const parsed = parseGlb(build())!;
    expect(parsed.bin.length).toBeGreaterThanOrEqual(declared);
    expect(parsed.bin.length - declared).toBeLessThan(4); // padding only
  });

  it('the binary payload round-trips the vertex data', () => {
    const parsed = parseGlb(build())!;
    const json = parsed.json as any;
    const prim = json.meshes[0].primitives[0];
    const posAccessor = json.accessors[prim.attributes.POSITION];
    const posView = json.bufferViews[posAccessor.bufferView];
    const floats = new Float32Array(
      parsed.bin.buffer,
      parsed.bin.byteOffset + posView.byteOffset,
      posAccessor.count * 3,
    );
    expect([...floats]).toEqual(Array.from(PARTS[0].positions));
    const idxAccessor = json.accessors[prim.indices];
    expect(idxAccessor.componentType).toBe(5123); // small model: uint16
    const idxView = json.bufferViews[idxAccessor.bufferView];
    const indices = new Uint16Array(
      parsed.bin.buffer,
      parsed.bin.byteOffset + idxView.byteOffset,
      idxAccessor.count,
    );
    expect([...indices]).toEqual([0, 1, 2, 0, 2, 3]);
  });

  it('uses uint32 indices when a part exceeds 65535 vertices', () => {
    const n = 70000;
    const positions = new Float32Array(n * 3);
    const normals = new Float32Array(n * 3);
    const indices = new Uint32Array(n);
    for (let i = 0; i < n; i++) indices[i] = i;
    const bytes = buildGlb(
      [{ name: 'big', positions, normals, indices, material: 0 }],
      MATERIALS,
      { generator: 'test' },
    );
    const json = parseGlb(bytes)!.json as any;
    const idxAccessor = json.accessors[json.meshes[0].primitives[0].indices];
    expect(idxAccessor.componentType).toBe(5125);
    expect(idxAccessor.count).toBe(n);
  });

  it('fails loudly on structurally invalid input', () => {
    expect(() => buildGlb([], MATERIALS, { generator: 't' })).toThrow();
    expect(() =>
      buildGlb(
        [{ name: 'x', positions: new Float32Array(0), normals: new Float32Array(0), material: 0 }],
        MATERIALS,
        { generator: 't' },
      ),
    ).toThrow();
    expect(() =>
      buildGlb(
        [
          {
            name: 'x',
            positions: new Float32Array([0, 0, 0]),
            normals: new Float32Array([0, 0]),
            material: 0,
          },
        ],
        MATERIALS,
        { generator: 't' },
      ),
    ).toThrow();
    expect(() =>
      buildGlb(
        [
          {
            name: 'x',
            positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
            normals: new Float32Array(9),
            indices: new Uint16Array([0, 1, 9]),
            material: 0,
          },
        ],
        MATERIALS,
        { generator: 't' },
      ),
    ).toThrow();
  });
});

describe('GLB skin and extensions', () => {
  // A two-joint chain (root joint + one child) and one part
  // rigidly bound to the child joint.
  const SKIN: GlbSkinDef = {
    joints: [
      { name: 'hips', parent: -1, translation: [0, 0.9, 0] },
      { name: 'head', parent: 0, translation: [0, 0.6, 0] },
    ],
    inverseBindMatrices: new Float32Array([
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.9, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1.5, 0, 1,
    ]),
  };
  const SKINNED: GlbPartDef[] = [
    { ...PARTS[0], joint: 1 },
    { ...PARTS[1] }, // unskinned part alongside
  ];

  it('emits bone nodes first, nested by parent, then part nodes under one root', () => {
    const json = parseGlb(buildGlb(SKINNED, MATERIALS, { generator: 't', skin: SKIN }))!.json as any;
    expect(json.nodes[0].name).toBe('hips');
    expect(json.nodes[0].translation).toEqual([0, 0.9, 0]);
    expect(json.nodes[0].children).toEqual([1]);
    expect(json.nodes[1].name).toBe('head');
    const root = json.nodes[json.nodes.length - 1];
    expect(root.name).toBe('character');
    expect(root.children).toEqual([0, 2, 3]); // root bone + both part nodes
    expect(json.nodes[2].skin).toBe(0);
    expect(json.nodes[3].skin).toBeUndefined();
    expect(json.scenes[0].nodes).toEqual([json.nodes.length - 1]);
  });

  it('writes the skin with joint node indices and a MAT4 inverse-bind accessor', () => {
    const json = parseGlb(buildGlb(SKINNED, MATERIALS, { generator: 't', skin: SKIN }))!.json as any;
    expect(json.skins).toHaveLength(1);
    expect(json.skins[0].joints).toEqual([0, 1]);
    expect(json.skins[0].skeleton).toBe(0);
    const ibm = json.accessors[json.skins[0].inverseBindMatrices];
    expect(ibm.type).toBe('MAT4');
    expect(ibm.componentType).toBe(5126);
    expect(ibm.count).toBe(2);
  });

  it('binds every vertex of a jointed part to that joint with weight 1', () => {
    const parsed = parseGlb(buildGlb(SKINNED, MATERIALS, { generator: 't', skin: SKIN }))!;
    const json = parsed.json as any;
    const prim = json.meshes[0].primitives[0];
    const jointsAcc = json.accessors[prim.attributes.JOINTS_0];
    expect(jointsAcc.componentType).toBe(5121); // UNSIGNED_BYTE
    expect(jointsAcc.type).toBe('VEC4');
    const jView = json.bufferViews[jointsAcc.bufferView];
    const joints = new Uint8Array(
      parsed.bin.buffer,
      parsed.bin.byteOffset + jView.byteOffset,
      jointsAcc.count * 4,
    );
    expect([...joints]).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
    const weightsAcc = json.accessors[prim.attributes.WEIGHTS_0];
    const wView = json.bufferViews[weightsAcc.bufferView];
    const weights = new Float32Array(
      parsed.bin.buffer,
      parsed.bin.byteOffset + wView.byteOffset,
      weightsAcc.count * 4,
    );
    expect([...weights]).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
    // the unskinned part carries no skinning attributes
    const prim2 = json.meshes[1].primitives[0];
    expect(prim2.attributes.JOINTS_0).toBeUndefined();
    expect(prim2.attributes.WEIGHTS_0).toBeUndefined();
  });

  it('passes extensions through with extensionsUsed', () => {
    const json = parseGlb(
      buildGlb(PARTS, MATERIALS, {
        generator: 't',
        extensionsUsed: ['VRMC_vrm'],
        extensions: { VRMC_vrm: { specVersion: '1.0' } },
      }),
    )!.json as any;
    expect(json.extensionsUsed).toEqual(['VRMC_vrm']);
    expect(json.extensions.VRMC_vrm.specVersion).toBe('1.0');
  });

  it('writes KHR_materials_sheen on sheen materials and appends it to extensionsUsed', () => {
    const mats: GlbMaterialDef[] = [
      { ...MATERIALS[0], sheen: { colorFactor: [0.35, 0.2, 0.15], roughnessFactor: 0.8 } },
      MATERIALS[1],
    ];
    const json = parseGlb(
      buildGlb(PARTS, mats, { generator: 't', extensionsUsed: ['VRMC_vrm'] }),
    )!.json as any;
    expect(json.extensionsUsed).toEqual(['VRMC_vrm', 'KHR_materials_sheen']);
    expect(json.materials[0].extensions).toEqual({
      KHR_materials_sheen: {
        sheenColorFactor: [0.35, 0.2, 0.15],
        sheenRoughnessFactor: 0.8,
      },
    });
    expect(json.materials[1].extensions).toBeUndefined();
  });

  it('rejects a joint without a skin, and a malformed skin', () => {
    expect(() => buildGlb(SKINNED, MATERIALS, { generator: 't' })).toThrow();
    expect(() =>
      buildGlb(PARTS, MATERIALS, {
        generator: 't',
        skin: { joints: SKIN.joints, inverseBindMatrices: new Float32Array(8) },
      }),
    ).toThrow();
    expect(() =>
      buildGlb([{ ...PARTS[0], joint: 5 }], MATERIALS, { generator: 't', skin: SKIN }),
    ).toThrow();
  });
});

describe('GLB seed extras', () => {
  it('extractSeedFromGlb round-trips the seed', () => {
    expect(extractSeedFromGlb(build())).toBe(SEED);
  });

  it('returns null when the file carries no seed', () => {
    const bytes = buildGlb(PARTS, MATERIALS, { generator: 'test' });
    expect(extractSeedFromGlb(bytes)).toBeNull();
  });

  it('parseGlb rejects non-GLB bytes', () => {
    expect(parseGlb(new Uint8Array([1, 2, 3]))).toBeNull();
    expect(parseGlb(new TextEncoder().encode('{"not":"a glb file at all"}'))).toBeNull();
    const truncated = build().subarray(0, 30);
    expect(parseGlb(new Uint8Array(truncated))).toBeNull();
    expect(extractSeedFromGlb(new Uint8Array([0]))).toBeNull();
  });
});
