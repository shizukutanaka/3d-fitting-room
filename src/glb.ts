// Minimal glTF 2.0 binary (GLB) writer and reader, written from
// scratch — the same no-new-dependencies pattern as the PNG chunk
// code in cardseed.ts. Pure byte functions (no DOM, no three.js),
// so they are unit-tested directly.
//
// The writer produces one node per part with geometry already
// baked into export space by the caller (see export3d.ts), PBR
// metallic-roughness materials with a base color, and — when the
// caller supplies a skeleton — a single skin that rigidly binds
// each part to one joint, plus any glTF extensions (the VRM
// writer in export3d.ts rides on this). The person's seed and a
// named-parameter JSON ride in the root `extras`, so the file
// describes itself: any tool — or an LLM — can read who this
// person is without a seed decoder, exactly like the share-card
// PNG carries its recipe (CHARACTER-SYSTEM.md §2.5,
// docs/PERSPECTIVES.md viewpoints 4-5).
//
// What it does not produce: animations and textures. Surface
// relief from the procedural canvas textures does not travel;
// the silhouette, the colors and the skeleton do.

export interface GlbMaterialDef {
  name: string;
  /** Linear-sRGB base color (glTF baseColorFactor). */
  baseColorFactor: [number, number, number, number];
  roughnessFactor: number;
  metallicFactor: number;
  alphaMode?: 'OPAQUE' | 'BLEND';
  doubleSided?: boolean;
}

export interface GlbPartDef {
  name: string;
  /** xyz triples, export space. */
  positions: ArrayLike<number>;
  /** xyz triples, same count as positions. */
  normals: ArrayLike<number>;
  /** xy pairs, optional. */
  uvs?: ArrayLike<number>;
  /** Triangle indices into the part's own vertices. Omit for a
   *  non-indexed draw. */
  indices?: ArrayLike<number>;
  /** Index into the materials array passed to buildGlb. */
  material: number;
  /** Index into the skin's joints (GlbOptions.skin): every vertex
   *  of the part is rigidly bound to this one joint. Omit for an
   *  unskinned part. */
  joint?: number;
}

export interface GlbJointDef {
  name: string;
  /** Index into the joints array, or -1 for a scene-level joint. */
  parent: number;
  /** Local translation relative to the parent joint (meters). */
  translation: [number, number, number];
}

export interface GlbSkinDef {
  joints: GlbJointDef[];
  /** One 4x4 column-major matrix per joint. */
  inverseBindMatrices: ArrayLike<number>;
}

export interface GlbOptions {
  generator: string;
  /** Root-level extras: where the seed and the self-description
   *  JSON ride. */
  extras?: Record<string, unknown>;
  /** A single skin shared by all parts that name a joint. Bone
   *  nodes are emitted first, in joints order (indices
   *  0..joints.length-1) — callers that reference joint nodes
   *  (e.g. a VRM humanoid mapping) rely on that layout. */
  skin?: GlbSkinDef;
  /** Root-level glTF extensions, e.g. { VRMC_vrm: {...} }. */
  extensions?: Record<string, unknown>;
  extensionsUsed?: string[];
}

const GLB_MAGIC = 0x46546c67; // 'glTF'
const GLB_VERSION = 2;
const CHUNK_JSON = 0x4e4f534a; // 'JSON'
const CHUNK_BIN = 0x004e4942; // 'BIN\0'

const COMPONENT_FLOAT = 5126;
const COMPONENT_UBYTE = 5121;
const COMPONENT_USHORT = 5123;
const COMPONENT_UINT = 5125;

function align4(n: number): number {
  return (n + 3) & ~3;
}

/** Serialize parts + materials into a complete GLB file. Throws
 *  on structurally invalid input (empty part list, mismatched
 *  attribute counts, out-of-range material/joint indices): an
 *  exporter that cannot fail loudly would ship broken files
 *  quietly. */
export function buildGlb(
  parts: GlbPartDef[],
  materials: GlbMaterialDef[],
  opts: GlbOptions,
): Uint8Array {
  if (parts.length === 0) throw new Error('buildGlb: no parts');
  if (materials.length === 0) throw new Error('buildGlb: no materials');
  const skin = opts.skin;
  if (skin) {
    if (skin.joints.length === 0) throw new Error('buildGlb: skin with no joints');
    if (skin.inverseBindMatrices.length !== skin.joints.length * 16) {
      throw new Error('buildGlb: inverseBindMatrices must hold one mat4 per joint');
    }
    skin.joints.forEach((joint, i) => {
      if (joint.parent < -1 || joint.parent >= skin.joints.length || joint.parent === i) {
        throw new Error(`buildGlb: joint ${i} (${joint.name}) has an invalid parent`);
      }
    });
  }

  const binChunks: Uint8Array[] = [];
  const bufferViews: Array<Record<string, unknown>> = [];
  const accessors: Array<Record<string, unknown>> = [];
  let binLength = 0;

  const pushView = (data: Uint8Array, target: number): number => {
    const pad = align4(binLength) - binLength;
    if (pad > 0) {
      binChunks.push(new Uint8Array(pad));
      binLength += pad;
    }
    const viewIndex = bufferViews.length;
    bufferViews.push({ buffer: 0, byteOffset: binLength, byteLength: data.length, target });
    binChunks.push(data);
    binLength += data.length;
    return viewIndex;
  };

  const floatAccessor = (
    values: ArrayLike<number>,
    type: 'VEC3' | 'VEC2' | 'VEC4',
    withMinMax: boolean,
  ): number => {
    const arr = new Float32Array(values.length);
    arr.set(values as ArrayLike<number>);
    const view = pushView(new Uint8Array(arr.buffer), 34962);
    const perVertex = type === 'VEC3' ? 3 : type === 'VEC2' ? 2 : 4;
    const accessor: Record<string, unknown> = {
      bufferView: view,
      componentType: COMPONENT_FLOAT,
      count: values.length / perVertex,
      type,
    };
    if (withMinMax) {
      const min = [Infinity, Infinity, Infinity];
      const max = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i + 2 < values.length; i += 3) {
        for (let k = 0; k < 3; k++) {
          const v = values[i + k];
          if (v < min[k]) min[k] = v;
          if (v > max[k]) max[k] = v;
        }
      }
      accessor.min = min;
      accessor.max = max;
    }
    accessors.push(accessor);
    return accessors.length - 1;
  };

  const meshes: Array<Record<string, unknown>> = [];

  parts.forEach((part, i) => {
    const vertexCount = part.positions.length / 3;
    if (!Number.isInteger(vertexCount) || vertexCount === 0) {
      throw new Error(`buildGlb: part ${i} (${part.name}) has no vertices`);
    }
    if (part.normals.length !== part.positions.length) {
      throw new Error(`buildGlb: part ${i} (${part.name}) normals/positions count mismatch`);
    }
    if (part.uvs && part.uvs.length !== vertexCount * 2) {
      throw new Error(`buildGlb: part ${i} (${part.name}) uv count mismatch`);
    }
    if (part.material < 0 || part.material >= materials.length) {
      throw new Error(`buildGlb: part ${i} (${part.name}) material index out of range`);
    }
    if (part.joint !== undefined) {
      if (!skin) throw new Error(`buildGlb: part ${i} (${part.name}) names a joint but no skin was given`);
      if (part.joint < 0 || part.joint >= skin.joints.length) {
        throw new Error(`buildGlb: part ${i} (${part.name}) joint index out of range`);
      }
    }
    const attributes: Record<string, number> = {
      POSITION: floatAccessor(part.positions, 'VEC3', true),
      NORMAL: floatAccessor(part.normals, 'VEC3', false),
    };
    if (part.uvs) attributes.TEXCOORD_0 = floatAccessor(part.uvs, 'VEC2', false);
    if (part.joint !== undefined) {
      // Rigid binding: every vertex belongs wholly to one joint.
      const joints = new Uint8Array(vertexCount * 4);
      const weights = new Float32Array(vertexCount * 4);
      for (let v = 0; v < vertexCount; v++) {
        joints[v * 4] = part.joint;
        weights[v * 4] = 1;
      }
      const jointView = pushView(joints, 34962);
      accessors.push({
        bufferView: jointView,
        componentType: COMPONENT_UBYTE,
        count: vertexCount,
        type: 'VEC4',
      });
      attributes.JOINTS_0 = accessors.length - 1;
      attributes.WEIGHTS_0 = floatAccessor(weights, 'VEC4', false);
    }
    const primitive: Record<string, unknown> = { attributes, material: part.material };
    if (part.indices) {
      let maxIndex = 0;
      for (let j = 0; j < part.indices.length; j++) {
        if (part.indices[j] > maxIndex) maxIndex = part.indices[j];
      }
      if (maxIndex >= vertexCount) {
        throw new Error(`buildGlb: part ${i} (${part.name}) index out of range`);
      }
      const useUint = maxIndex > 0xffff;
      const arr = useUint ? new Uint32Array(part.indices.length) : new Uint16Array(part.indices.length);
      arr.set(part.indices as ArrayLike<number>);
      const view = pushView(new Uint8Array(arr.buffer), 34963);
      accessors.push({
        bufferView: view,
        componentType: useUint ? COMPONENT_UINT : COMPONENT_USHORT,
        count: part.indices.length,
        type: 'SCALAR',
      });
      primitive.indices = accessors.length - 1;
    }
    meshes.push({ name: part.name, primitives: [primitive] });
  });

  // ---- nodes: bones first (in joints order), then parts, then
  // the scene root that holds them all ----
  const nodes: Array<Record<string, unknown>> = [];
  let skinDef: Record<string, unknown> | undefined;
  if (skin) {
    const jointNode = skin.joints.map((_, i) => i); // bones are nodes 0..J-1
    skin.joints.forEach((joint, i) => {
      const node: Record<string, unknown> = {
        name: joint.name,
        translation: [...joint.translation],
      };
      const children = skin.joints
        .map((child, ci) => (child.parent === i ? jointNode[ci] : -1))
        .filter((n) => n >= 0);
      if (children.length) node.children = children;
      nodes.push(node);
    });
    const ibm = new Float32Array(skin.inverseBindMatrices.length);
    ibm.set(skin.inverseBindMatrices as ArrayLike<number>);
    const ibmView = pushView(new Uint8Array(ibm.buffer), 34962);
    accessors.push({
      bufferView: ibmView,
      componentType: COMPONENT_FLOAT,
      count: skin.joints.length,
      type: 'MAT4',
    });
    const skeletonRoot = skin.joints.findIndex((j) => j.parent === -1);
    skinDef = {
      joints: jointNode,
      inverseBindMatrices: accessors.length - 1,
      ...(skeletonRoot >= 0 ? { skeleton: jointNode[skeletonRoot] } : {}),
    };
  }
  const partNodeStart = nodes.length;
  parts.forEach((part, i) => {
    const node: Record<string, unknown> = { name: part.name, mesh: i };
    if (skin && part.joint !== undefined) node.skin = 0;
    nodes.push(node);
  });
  const rootChildren: number[] = [];
  if (skin) {
    skin.joints.forEach((joint, i) => {
      if (joint.parent === -1) rootChildren.push(i);
    });
  }
  for (let i = 0; i < parts.length; i++) rootChildren.push(partNodeStart + i);
  const rootNode = nodes.length;
  nodes.push({ name: 'character', children: rootChildren });

  const json: Record<string, unknown> = {
    asset: { version: '2.0', generator: opts.generator },
    scene: 0,
    scenes: [{ nodes: [rootNode] }],
    nodes,
    meshes,
    materials: materials.map((m) => {
      const mat: Record<string, unknown> = {
        name: m.name,
        pbrMetallicRoughness: {
          baseColorFactor: [...m.baseColorFactor],
          roughnessFactor: m.roughnessFactor,
          metallicFactor: m.metallicFactor,
        },
      };
      if (m.alphaMode && m.alphaMode !== 'OPAQUE') mat.alphaMode = m.alphaMode;
      if (m.doubleSided) mat.doubleSided = true;
      return mat;
    }),
    accessors,
    bufferViews,
    buffers: [{ byteLength: binLength }],
  };
  if (skinDef) json.skins = [skinDef];
  if (opts.extensions) json.extensions = opts.extensions;
  if (opts.extensionsUsed) json.extensionsUsed = opts.extensionsUsed;
  if (opts.extras) json.extras = opts.extras;

  const jsonBytes = new TextEncoder().encode(JSON.stringify(json));
  const jsonPadded = align4(jsonBytes.length);
  const binPadded = align4(binLength);
  const total = 12 + 8 + jsonPadded + 8 + binPadded;
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  view.setUint32(0, GLB_MAGIC, true);
  view.setUint32(4, GLB_VERSION, true);
  view.setUint32(8, total, true);
  view.setUint32(12, jsonPadded, true);
  view.setUint32(16, CHUNK_JSON, true);
  out.set(jsonBytes, 20);
  for (let i = 20 + jsonBytes.length; i < 20 + jsonPadded; i++) out[i] = 0x20; // JSON chunk pads with spaces
  const binStart = 20 + jsonPadded;
  view.setUint32(binStart, binPadded, true);
  view.setUint32(binStart + 4, CHUNK_BIN, true);
  let offset = binStart + 8;
  for (const chunk of binChunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

export interface ParsedGlb {
  json: Record<string, unknown>;
  /** The BIN chunk contents (may include up to 3 bytes of zero
   *  padding at the end). */
  bin: Uint8Array;
}

/** Parse a GLB file's header and chunks. Returns null for anything
 *  that is not a well-formed GLB v2 container — the reader is as
 *  strict as the writer, so a file that parses here is one a real
 *  glTF loader should accept structurally. */
export function parseGlb(bytes: Uint8Array): ParsedGlb | null {
  if (bytes.length < 20) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.getUint32(0, true) !== GLB_MAGIC) return null;
  if (view.getUint32(4, true) !== GLB_VERSION) return null;
  if (view.getUint32(8, true) !== bytes.length) return null;
  const jsonLength = view.getUint32(12, true);
  if (view.getUint32(16, true) !== CHUNK_JSON) return null;
  if (20 + jsonLength > bytes.length) return null;
  let json: Record<string, unknown>;
  try {
    json = JSON.parse(new TextDecoder().decode(bytes.subarray(20, 20 + jsonLength)));
  } catch {
    return null;
  }
  let bin: Uint8Array = new Uint8Array(0);
  const binHeader = 20 + jsonLength;
  if (binHeader + 8 <= bytes.length && view.getUint32(binHeader + 4, true) === CHUNK_BIN) {
    const binLength = view.getUint32(binHeader, true);
    if (binHeader + 8 + binLength > bytes.length) return null;
    bin = bytes.subarray(binHeader + 8, binHeader + 8 + binLength);
  }
  return { json, bin };
}

/** Read the person's seed back out of a GLB written by buildGlb.
 *  Returns null when the file is not a GLB or carries no seed —
 *  the caller still runs the result through decodeSeed, so a
 *  hand-crafted extras value can only ever yield in-range values. */
export function extractSeedFromGlb(bytes: Uint8Array): string | null {
  const parsed = parseGlb(bytes);
  if (!parsed) return null;
  const extras = parsed.json.extras as Record<string, unknown> | undefined;
  const seed = extras?.fittingRoomSeed;
  return typeof seed === 'string' && seed.length > 0 ? seed : null;
}
