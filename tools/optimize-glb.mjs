#!/usr/bin/env node
// Lossless/near-lossless GLB optimizer for M3 initial transfer budget (< 1 MB).
// - Converts WEIGHTS_0 to core glTF 2.0 UNSIGNED_BYTE normalized (exact sum = 255).
// - Converts NORMAL to KHR_mesh_quantization BYTE normalized (natively supported by Three.js GLTFLoader).
// - Snaps POSITION and TEXCOORD_0 Float32s to 1/2048 for gzip compressibility while keeping Float32 compatibility.
// - Groups bufferViews by attribute kind so gzip's 32 KB window compresses across meshes.

import fs from 'node:fs';
import zlib from 'node:zlib';

const SNAP = 2048;

function optimizeGlb(filePath) {
  const before = fs.readFileSync(filePath);
  const beforeGz = zlib.gzipSync(before, { level: 9 }).length;

  const jsonLen = before.readUInt32LE(12);
  const json = JSON.parse(before.subarray(20, 20 + jsonLen).toString('utf8'));
  const binStart = 20 + jsonLen + 8;
  const bin = before.subarray(binStart);

  // Classify each bufferView by usage so we can pack same-type views contiguously.
  const bvKind = new Map();
  const accessorTransforms = new Map();

  for (const mesh of json.meshes ?? []) {
    for (const prim of mesh.primitives ?? []) {
      if (prim.indices !== undefined) {
        const acc = json.accessors[prim.indices];
        bvKind.set(acc.bufferView, 'INDICES');
      }
      for (const [attr, accIdx] of Object.entries(prim.attributes ?? {})) {
        const acc = json.accessors[accIdx];
        bvKind.set(acc.bufferView, attr);
        accessorTransforms.set(accIdx, attr);
      }
    }
  }
  for (const skin of json.skins ?? []) {
    if (skin.inverseBindMatrices !== undefined) {
      const acc = json.accessors[skin.inverseBindMatrices];
      bvKind.set(acc.bufferView, 'IBM');
    }
  }

  const transformedBuffers = new Map();
  let usedQuantization = false;

  for (const [accIdx, attr] of accessorTransforms.entries()) {
    const acc = json.accessors[accIdx];
    const bvIdx = acc.bufferView;
    const bv = json.bufferViews[bvIdx];
    const baseOff = (bv.byteOffset ?? 0) + (acc.byteOffset ?? 0);

    if (attr === 'POSITION' && acc.componentType === 5126 && acc.type === 'VEC3') {
      const f = new Float32Array(bin.buffer, bin.byteOffset + baseOff, acc.count * 3);
      const out = new Float32Array(f.length);
      const min = [Infinity, Infinity, Infinity];
      const max = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i < acc.count; i++) {
        for (let c = 0; c < 3; c++) {
          const v = Math.round(f[i * 3 + c] * SNAP) / SNAP;
          out[i * 3 + c] = v;
          if (v < min[c]) min[c] = v;
          if (v > max[c]) max[c] = v;
        }
      }
      acc.min = min;
      acc.max = max;
      transformedBuffers.set(bvIdx, Buffer.from(out.buffer));
    } else if (attr === 'TEXCOORD_0' && acc.componentType === 5126 && acc.type === 'VEC2') {
      const f = new Float32Array(bin.buffer, bin.byteOffset + baseOff, acc.count * 2);
      const out = new Float32Array(f.length);
      for (let i = 0; i < f.length; i++) out[i] = Math.round(f[i] * SNAP) / SNAP;
      transformedBuffers.set(bvIdx, Buffer.from(out.buffer));
    } else if (attr === 'NORMAL' && acc.componentType === 5126 && acc.type === 'VEC3') {
      const f = new Float32Array(bin.buffer, bin.byteOffset + baseOff, acc.count * 3);
      const out = new Int8Array(acc.count * 4);
      for (let i = 0; i < acc.count; i++) {
        out[i * 4] = Math.max(-127, Math.min(127, Math.round(f[i * 3] * 127)));
        out[i * 4 + 1] = Math.max(-127, Math.min(127, Math.round(f[i * 3 + 1] * 127)));
        out[i * 4 + 2] = Math.max(-127, Math.min(127, Math.round(f[i * 3 + 2] * 127)));
        out[i * 4 + 3] = 0;
      }
      acc.componentType = 5120;
      acc.normalized = true;
      delete acc.min;
      delete acc.max;
      bv.byteStride = 4;
      usedQuantization = true;
      transformedBuffers.set(bvIdx, Buffer.from(out.buffer));
    } else if (attr === 'WEIGHTS_0' && acc.componentType === 5126 && acc.type === 'VEC4') {
      const f = new Float32Array(bin.buffer, bin.byteOffset + baseOff, acc.count * 4);
      const out = new Uint8Array(acc.count * 4);
      for (let i = 0; i < acc.count; i++) {
        let sum = 0;
        let maxK = 0;
        let maxV = -1;
        for (let k = 0; k < 4; k++) {
          const v = Math.max(0, Math.min(255, Math.round(f[i * 4 + k] * 255)));
          out[i * 4 + k] = v;
          sum += v;
          if (v > maxV) {
            maxV = v;
            maxK = k;
          }
        }
        if (sum > 0 && sum !== 255) {
          out[i * 4 + maxK] = Math.max(0, Math.min(255, out[i * 4 + maxK] + (255 - sum)));
        }
      }
      acc.componentType = 5121;
      acc.normalized = true;
      delete acc.min;
      delete acc.max;
      transformedBuffers.set(bvIdx, Buffer.from(out.buffer));
    }
  }

  if (usedQuantization) {
    json.extensionsUsed = Array.from(new Set([...(json.extensionsUsed ?? []), 'KHR_mesh_quantization']));
    json.extensionsRequired = Array.from(new Set([...(json.extensionsRequired ?? []), 'KHR_mesh_quantization']));
  }

  const order = ['POSITION', 'NORMAL', 'TEXCOORD_0', 'JOINTS_0', 'WEIGHTS_0', 'INDICES', 'IBM'];
  const bvIndices = json.bufferViews.map((_, i) => i).sort((a, b) => {
    const ka = order.indexOf(bvKind.get(a) ?? '');
    const kb = order.indexOf(bvKind.get(b) ?? '');
    return (ka === -1 ? 99 : ka) - (kb === -1 ? 99 : kb) || a - b;
  });

  const chunks = [];
  let offset = 0;
  for (const bvIdx of bvIndices) {
    const bv = json.bufferViews[bvIdx];
    const data =
      transformedBuffers.get(bvIdx) ??
      bin.subarray(bv.byteOffset ?? 0, (bv.byteOffset ?? 0) + bv.byteLength);
    bv.byteOffset = offset;
    bv.byteLength = data.length;
    chunks.push(data);
    const pad = (4 - (data.length % 4)) % 4;
    if (pad) chunks.push(Buffer.alloc(pad));
    offset += data.length + pad;
  }

  const newBin = Buffer.concat(chunks);
  json.buffers[0].byteLength = newBin.length;

  const jsonBytes = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonPad = (4 - (jsonBytes.length % 4)) % 4;
  const jsonChunk = jsonPad ? Buffer.concat([jsonBytes, Buffer.alloc(jsonPad, 0x20)]) : jsonBytes;

  const totalLen = 12 + 8 + jsonChunk.length + 8 + newBin.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(totalLen, 8);

  const jsonHdr = Buffer.alloc(8);
  jsonHdr.writeUInt32LE(jsonChunk.length, 0);
  jsonHdr.writeUInt32LE(0x4e4f534a, 4);

  const binHdr = Buffer.alloc(8);
  binHdr.writeUInt32LE(newBin.length, 0);
  binHdr.writeUInt32LE(0x004e4942, 4);

  const out = Buffer.concat([header, jsonHdr, jsonChunk, binHdr, newBin]);
  fs.writeFileSync(filePath, out);

  const afterGz = zlib.gzipSync(out, { level: 9 }).length;
  console.log(
    `${filePath}: raw ${(before.length / 1024).toFixed(1)}KB -> ${(out.length / 1024).toFixed(1)}KB | gzip ${(beforeGz / 1024).toFixed(1)}KB -> ${(afterGz / 1024).toFixed(1)}KB`,
  );
}

for (const arg of process.argv.slice(2)) {
  optimizeGlb(arg);
}
