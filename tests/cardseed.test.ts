import { describe, expect, it } from 'vitest';
import { SEED_CHUNK_KEYWORD, crc32, embedSeedInPng, extractSeedFromPng } from '../src/cardseed';

// A real 1x1 transparent PNG (signature, IHDR, IDAT, IEND).
const PNG_1PX = new Uint8Array(
  Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64',
  ),
);
const SEED = 'FR3-DGVzdCBzZWVk';

function occurrences(haystack: Uint8Array, needle: string): number {
  let count = 0;
  outer: for (let i = 0; i + needle.length <= haystack.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle.charCodeAt(j)) continue outer;
    }
    count++;
  }
  return count;
}

describe('card seed PNG chunks', () => {
  it('crc32 matches the standard check value', () => {
    const bytes = new Uint8Array([...'123456789'].map((c) => c.charCodeAt(0)));
    expect(crc32(bytes)).toBe(0xcbf43926);
  });

  it('embed -> extract round-trips the seed', () => {
    const embedded = embedSeedInPng(PNG_1PX, SEED);
    expect(embedded).not.toBeNull();
    expect(extractSeedFromPng(embedded!)).toBe(SEED);
  });

  it('the embedded chunk sits after IHDR with a valid CRC', () => {
    const embedded = embedSeedInPng(PNG_1PX, SEED)!;
    // signature (8) + IHDR chunk (4+4+13+4 = 25) -> tEXt starts at 33
    const at = 8 + 25;
    const length =
      ((embedded[at] << 24) | (embedded[at + 1] << 16) | (embedded[at + 2] << 8) | embedded[at + 3]) >>>
      0;
    expect(String.fromCharCode(...embedded.subarray(at + 4, at + 8))).toBe('tEXt');
    expect(length).toBe(SEED_CHUNK_KEYWORD.length + 1 + SEED.length);
    const storedCrc =
      ((embedded[at + 8 + length] << 24) |
        (embedded[at + 9 + length] << 16) |
        (embedded[at + 10 + length] << 8) |
        embedded[at + 11 + length]) >>>
      0;
    expect(storedCrc).toBe(crc32(embedded.subarray(at + 4, at + 8 + length)));
    // the rest of the file is the original, byte for byte
    expect(embedded.length).toBe(PNG_1PX.length + 12 + length);
    expect(embedded.subarray(at + 12 + length)).toEqual(PNG_1PX.subarray(8 + 25));
  });

  it('re-embedding replaces the old seed instead of stacking', () => {
    const once = embedSeedInPng(PNG_1PX, 'FR3-b2xk')!;
    const twice = embedSeedInPng(once, SEED)!;
    expect(extractSeedFromPng(twice)).toBe(SEED);
    expect(occurrences(twice, SEED_CHUNK_KEYWORD)).toBe(1);
    expect(twice.length).toBe(once.length - 'FR3-b2xk'.length + SEED.length);
  });

  it('a PNG without a seed chunk extracts null', () => {
    expect(extractSeedFromPng(PNG_1PX)).toBeNull();
  });

  it('rejects non-PNG and truncated input', () => {
    const junk = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(embedSeedInPng(junk, SEED)).toBeNull();
    expect(extractSeedFromPng(junk)).toBeNull();
    const truncated = PNG_1PX.subarray(0, 20); // inside IHDR
    expect(embedSeedInPng(truncated, SEED)).toBeNull();
    expect(extractSeedFromPng(truncated)).toBeNull();
    const embedded = embedSeedInPng(PNG_1PX, SEED)!;
    const cut = embedded.subarray(0, 40); // ends inside the seed chunk's data
    expect(extractSeedFromPng(cut)).toBeNull();
  });
});
