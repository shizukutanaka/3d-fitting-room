import { describe, expect, it } from 'vitest';
import {
  BLOB_SHADOW_OPACITY_ONLY,
  BLOB_SHADOW_OPACITY_WITH_SHADOWS,
  BLOB_SHADOW_RADIUS,
  BLOB_SHADOW_Y,
  blobShadowOpacity,
} from '../src/scene';
import { BLOB_SHADOW_SIZE, blobShadowData } from '../src/textures';

describe('character contact / blob shadow (backlog #18)', () => {
  it('sits just above the podium top (y=0.12) and well inside its radius (1.05 m)', () => {
    expect(BLOB_SHADOW_Y).toBeGreaterThan(0.12);
    expect(BLOB_SHADOW_Y).toBeLessThan(0.125);
    expect(BLOB_SHADOW_RADIUS).toBeGreaterThan(0.2);
    expect(BLOB_SHADOW_RADIUS).toBeLessThan(1.0);
  });

  it('stays subtle alongside real-time shadows and strengthens when XR turns shadows off', () => {
    expect(blobShadowOpacity(true)).toBe(BLOB_SHADOW_OPACITY_WITH_SHADOWS);
    expect(blobShadowOpacity(false)).toBe(BLOB_SHADOW_OPACITY_ONLY);
    expect(blobShadowOpacity(true)).toBeGreaterThan(0);
    expect(blobShadowOpacity(false)).toBeGreaterThan(blobShadowOpacity(true));
    expect(blobShadowOpacity(false)).toBeLessThan(1);
  });

  it('generates a radially symmetric alpha falloff that reaches zero at the quad edge', () => {
    const size = BLOB_SHADOW_SIZE;
    const data = blobShadowData(size);
    expect(data.length).toBe(size * size * 4);
    const alphaAt = (x: number, y: number) => data[(y * size + x) * 4 + 3];
    const mid = Math.floor(size / 2);
    const center = alphaAt(mid, mid);
    const quarter = alphaAt(mid + Math.floor(size / 4), mid);
    const edge = alphaAt(size - 1, mid);
    const corner = alphaAt(0, 0);
    expect(center).toBeGreaterThan(230);
    expect(quarter).toBeGreaterThan(0);
    expect(quarter).toBeLessThan(center);
    expect(edge).toBe(0);
    expect(corner).toBe(0);
  });
});
