import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { creaseNormalChunk, openEdgeUvs } from '../src/avatar';
import { GARMENT_NORMAL_SIZE, garmentNormalData } from '../src/textures';

const S = GARMENT_NORMAL_SIZE;
const at = (d: Uint8Array, x: number, y: number) => {
  const o = (y * S + x) * 4;
  return [d[o] / 255 * 2 - 1, d[o + 1] / 255 * 2 - 1, d[o + 2] / 255 * 2 - 1];
};

describe('garment wrinkle and hem normal maps (backlog #10)', () => {
  it('is deterministic per seed and differs between seeds', () => {
    expect(garmentNormalData([], 5)).toEqual(garmentNormalData([], 5));
    expect(garmentNormalData([], 5)).not.toEqual(garmentNormalData([], 6));
  });

  it('holds unit normals that face outward, with flat areas and creased areas', () => {
    const d = garmentNormalData([], 5);
    let flat = 0;
    let creased = 0;
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const [nx, ny, nz] = at(d, x, y);
        expect(Math.hypot(nx, ny, nz)).toBeGreaterThan(0.97);
        expect(Math.hypot(nx, ny, nz)).toBeLessThan(1.03);
        expect(nz).toBeGreaterThan(0.5);
        if (Math.hypot(nx, ny) < 0.02) flat++;
        if (Math.hypot(nx, ny) > 0.1) creased++;
      }
    }
    expect(flat / (S * S)).toBeGreaterThan(0.2);
    expect(creased / (S * S)).toBeGreaterThan(0.02);
  });

  it('raises a ridge along a hem edge: normals lean away from it on both sides', () => {
    // A hem along v = 0.5; no wrinkles are subtracted out, so compare
    // against the same seed without the hem.
    const withHem = garmentNormalData([0, 0.5, 1, 0.5], 5);
    const without = garmentNormalData([], 5);
    const y = S / 2;
    let below = 0;
    let above = 0;
    for (let x = 0; x < S; x++) {
      below += at(withHem, x, y - 1)[1] - at(without, x, y - 1)[1];
      above += at(withHem, x, y + 1)[1] - at(without, x, y + 1)[1];
    }
    expect(below / S).toBeLessThan(-0.05);
    expect(above / S).toBeGreaterThan(0.05);
    // Far from the hem nothing changes.
    for (let x = 0; x < S; x += 7) expect(at(withHem, x, 10)).toEqual(at(without, x, 10));
  });

  it('wraps hem edges whose UVs lie outside 0..1', () => {
    expect(garmentNormalData([1.25, -0.25, 1.5, -0.25], 5)).toEqual(garmentNormalData([0.25, 0.75, 0.5, 0.75], 5));
  });

  it('finds open edges only, ignoring UV seams', () => {
    // Two triangles forming a quad; the shared diagonal is split into
    // separate vertices with different UVs (a UV seam).
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0], 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0.1, 0, 0.9, 1, 0, 1], 2));
    g.setIndex([0, 1, 2, 3, 4, 5]);
    expect(openEdgeUvs(g).length / 4).toBe(4);
  });

  it('applies the weave bump on top of the mapped normal', () => {
    const stock = THREE.ShaderChunk.normal_fragment_maps;
    const patched = creaseNormalChunk();
    expect(stock).toContain('#elif defined( USE_BUMPMAP )');
    expect(patched).not.toContain('#elif defined( USE_BUMPMAP )');
    expect(patched).toContain('#endif\n#if defined( USE_BUMPMAP )');
    expect((patched.match(/#if/g) ?? []).length).toBe((patched.match(/#endif/g) ?? []).length);
  });
});
