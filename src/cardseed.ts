// The seed inside the share-card PNG (CHARACTER-SYSTEM.md §2.5,
// COMPETITIVE-ADVANTAGE.md candidate G): the card is not just a
// picture — it carries the full person + outfit as a machine-
// readable recipe in a PNG tEXt chunk, so anyone who receives the
// file can rebuild the exact same character on-device, in a free
// browser runtime, with no server in between. The seed is also
// printed on the card face as text: PNG chunks survive direct
// file transfer but can be stripped when a platform re-encodes
// the image, and the printed string is the fallback for that case.
//
// Pure byte functions (no DOM), so they are unit-tested directly
// and shared by the export path (share.ts) and the restore path
// (main.ts). The payload is the seed string itself — parameters
// only, no personal data (LEGAL-ETHICS J-07).

export const SEED_CHUNK_KEYWORD = 'FittingRoomSeed';

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

// CRC-32 (ISO 3309, the PNG polynomial), table-driven.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function isPng(bytes: Uint8Array): boolean {
  return bytes.length >= 8 && PNG_SIGNATURE.every((b, i) => bytes[i] === b);
}

function readU32(bytes: Uint8Array, at: number): number {
  return ((bytes[at] << 24) | (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3]) >>> 0;
}

function chunkType(bytes: Uint8Array, at: number): string {
  return String.fromCharCode(bytes[at], bytes[at + 1], bytes[at + 2], bytes[at + 3]);
}

/** Build one complete chunk (length + type + data + CRC). */
function makeChunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(data.length + 12);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

function textChunkData(keyword: string, text: string): Uint8Array {
  const data = new Uint8Array(keyword.length + 1 + text.length);
  for (let i = 0; i < keyword.length; i++) data[i] = keyword.charCodeAt(i) & 0x7f;
  data[keyword.length] = 0;
  for (let i = 0; i < text.length; i++) data[keyword.length + 1 + i] = text.charCodeAt(i) & 0x7f;
  return data;
}

/** If this tEXt chunk's data is one of ours, return true. */
function isSeedChunk(type: string, data: Uint8Array): boolean {
  if (type !== 'tEXt') return false;
  if (data.length < SEED_CHUNK_KEYWORD.length + 1) return false;
  for (let i = 0; i < SEED_CHUNK_KEYWORD.length; i++) {
    if (data[i] !== SEED_CHUNK_KEYWORD.charCodeAt(i)) return false;
  }
  return data[SEED_CHUNK_KEYWORD.length] === 0;
}

/** Return a copy of the PNG with the seed embedded as a tEXt chunk
 *  directly after IHDR (the position readers scan first). Any
 *  pre-existing seed chunk is replaced, so re-exporting a restored
 *  card never stacks stale copies. Returns null when the input is
 *  not a PNG with an IHDR chunk. */
export function embedSeedInPng(png: Uint8Array, seed: string): Uint8Array | null {
  if (!isPng(png)) return null;
  const seedChunk = makeChunk('tEXt', textChunkData(SEED_CHUNK_KEYWORD, seed));
  const parts: Uint8Array[] = [png.subarray(0, 8)];
  let at = 8;
  let inserted = false;
  while (at + 8 <= png.length) {
    const length = readU32(png, at);
    const end = at + 12 + length;
    if (end > png.length) return null; // corrupt chunk length
    const type = chunkType(png, at + 4);
    const data = png.subarray(at + 8, at + 8 + length);
    if (!isSeedChunk(type, data)) parts.push(png.subarray(at, end));
    if (type === 'IHDR' && !inserted) {
      parts.push(seedChunk);
      inserted = true;
    }
    at = end;
    if (type === 'IEND') break;
  }
  if (!inserted) return null;
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

/** Read the seed back out of a PNG's tEXt chunk. Returns null when
 *  the file is not a PNG, carries no seed chunk, or is truncated —
 *  the caller still runs the result through decodeSeed, so a
 *  hand-crafted chunk can only ever yield in-range values. */
export function extractSeedFromPng(png: Uint8Array): string | null {
  if (!isPng(png)) return null;
  let at = 8;
  while (at + 8 <= png.length) {
    const length = readU32(png, at);
    const end = at + 12 + length;
    if (end > png.length) return null;
    const type = chunkType(png, at + 4);
    const data = png.subarray(at + 8, at + 8 + length);
    if (isSeedChunk(type, data)) {
      let text = '';
      for (let i = SEED_CHUNK_KEYWORD.length + 1; i < data.length; i++) {
        text += String.fromCharCode(data[i]);
      }
      return text;
    }
    at = end;
    if (type === 'IEND') break;
  }
  return null;
}
