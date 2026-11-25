import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_CHARACTER } from '../src/character';
import {
  FIT_PARTS,
  FIT_PART_COEFFICIENTS,
  FIT_PART_COUNT,
  MAX_FIT_OFFSET_M,
  OUTER_FIT_MULTIPLIER,
  applyFitField,
  computePartOffsets,
  fitPartForBone,
  fitPartIndex,
  partShapeDeltas,
  type GarmentFitField,
} from '../src/fitoffset';

describe('body-linked fit offset math (backlog #12)', () => {
  it('maps humanoid bone names to the expected body parts', () => {
    expect(fitPartForBone('leftShoulder')).toBe('shoulder');
    expect(fitPartForBone('rightUpperArm')).toBe('shoulder');
    expect(fitPartForBone('upperChest')).toBe('chest');
    expect(fitPartForBone('chest')).toBe('chest');
    expect(fitPartForBone('spine')).toBe('waist');
    expect(fitPartForBone('hips')).toBe('hip');
    expect(fitPartForBone('leftUpperLeg')).toBe('thigh');
    expect(fitPartForBone('rightLowerLeg')).toBe('calf');
    expect(fitPartForBone('leftHand')).toBe('default');
  });

  it('produces zero shape delta and zero offsets at default character', () => {
    const deltas = partShapeDeltas(DEFAULT_CHARACTER);
    for (const p of FIT_PARTS) {
      expect(deltas[p]).toBe(0);
    }
    const offsets = computePartOffsets(DEFAULT_CHARACTER);
    for (let i = 0; i < FIT_PART_COUNT; i++) {
      expect(offsets[i]).toBe(0);
    }
  });

  it('scales offsets proportionally to body-shape change with per-part coefficients and outer multiplier', () => {
    const c1 = { ...DEFAULT_CHARACTER, bust: 1.15, hip: 1.1 };
    const c2 = { ...DEFAULT_CHARACTER, bust: 1.3, hip: 1.2 };
    const o1 = computePartOffsets(c1);
    const o2 = computePartOffsets(c2);
    const chestIdx = fitPartIndex('chest');
    const hipIdx = fitPartIndex('hip');
    const waistIdx = fitPartIndex('waist');

    expect(o1[chestIdx]).toBeCloseTo(0.15 * FIT_PART_COEFFICIENTS.chest, 6);
    expect(o2[chestIdx]).toBeCloseTo(2 * o1[chestIdx], 6);
    expect(o1[hipIdx]).toBeCloseTo(0.1 * FIT_PART_COEFFICIENTS.hip, 6);
    expect(o2[hipIdx]).toBeCloseTo(2 * o1[hipIdx], 6);
    expect(o1[waistIdx]).toBe(0);

    const outerOffsets = computePartOffsets(c2, null, true);
    expect(outerOffsets[chestIdx]).toBeCloseTo(o2[chestIdx] * OUTER_FIT_MULTIPLIER, 6);
  });

  it('clamps inward pull to maxInward (#5 safety floor) and outward push to MAX_FIT_OFFSET_M', () => {
    const chestIdx = fitPartIndex('chest');
    const weights = new Float32Array(2 * FIT_PART_COUNT);
    weights[0 * FIT_PART_COUNT + chestIdx] = 1;
    weights[1 * FIT_PART_COUNT + chestIdx] = 1;

    const field: GarmentFitField = {
      id: 'tee',
      isOuter: false,
      restPos: new Float32Array([0, 1, 0.1, 0, 1, 0.2]),
      localNormal: new Float32Array([0, 0, 1, 0, 0, 1]),
      partWeights: weights,
      // Vertex 0 sits right on #5's clearance floor (no inward slack);
      // vertex 1 has 0.004 m of slack above the floor.
      maxInward: new Float32Array([0, 0.004]),
    };

    // Negative offset: vertex 0 must not move inward; vertex 1 moves by at most -0.004.
    const negOffsets = new Float32Array(FIT_PART_COUNT);
    negOffsets[chestIdx] = -0.01;
    const out = new Float32Array(6);
    applyFitField(field, negOffsets, out);
    expect(out[2]).toBeCloseTo(0.1, 6);
    expect(out[5]).toBeCloseTo(0.2 - 0.004, 6);

    // Huge positive offset: capped at MAX_FIT_OFFSET_M.
    const bigOffsets = new Float32Array(FIT_PART_COUNT);
    bigOffsets[chestIdx] = 0.09;
    applyFitField(field, bigOffsets, out);
    expect(out[2]).toBeCloseTo(0.1 + MAX_FIT_OFFSET_M, 6);
    expect(out[5]).toBeCloseTo(0.2 + MAX_FIT_OFFSET_M, 6);
  });
});

describe('body-linked fit offset on live mannequin (backlog #12)', () => {
  it('expands garments along body normals when body parameters grow and isolates rigs', async () => {
    vi.stubGlobal('ProgressEvent', Event);
    vi.stubGlobal('document', {
      createElement: () => ({
        width: 0,
        height: 0,
        getContext: () =>
          new Proxy(
            {
              createImageData: (w: number, h: number) => ({ data: new Uint8ClampedArray(w * h * 4) }),
              createRadialGradient: () => ({ addColorStop: () => {} }),
              createLinearGradient: () => ({ addColorStop: () => {} }),
            },
            {
              get(target, prop) {
                if (prop in target) return (target as Record<PropertyKey, unknown>)[prop];
                return () => {};
              },
            },
          ),
      }),
    });
    const RealRequest = globalThis.Request;
    vi.stubGlobal(
      'Request',
      class extends RealRequest {
        constructor(input: RequestInfo | URL, init?: RequestInit) {
          super(typeof input === 'string' && input.startsWith('/') ? `http://test.invalid${input}` : input, init);
        }
      },
    );
    vi.stubGlobal('fetch', async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const m = url.match(/models\/(mannequin-[ab]\.glb)$/);
      if (!m) return new Response(null, { status: 404 });
      const buf = readFileSync(`public/models/${m[1]}`);
      return new Response(buf, { status: 200, headers: { 'content-type': 'model/gltf-binary' } });
    });

    const { buildAvatar } = await import('../src/avatar');
    const rigA = buildAvatar(DEFAULT_CHARACTER, 'a');
    const rigB = buildAvatar(DEFAULT_CHARACTER, 'a');
    await Promise.all([rigA.ready, rigB.ready]);

    const getMesh = (root: THREE.Object3D, name: string): THREE.SkinnedMesh => {
      let found: THREE.SkinnedMesh | null = null;
      root.traverse((o) => {
        if ((o as THREE.SkinnedMesh).isSkinnedMesh && (o.name === name || o.parent?.name === name)) {
          found = o as THREE.SkinnedMesh;
        }
      });
      if (!found) throw new Error(`missing mesh ${name}`);
      return found;
    };

    const teeA = getMesh(rigA.root, 'G_tee');
    const jacketA = getMesh(rigA.root, 'G_jacket');
    const teeB = getMesh(rigB.root, 'G_tee');

    const teeRest = new Float32Array((teeA.geometry.getAttribute('position') as THREE.BufferAttribute).array);
    const jacketRest = new Float32Array((jacketA.geometry.getAttribute('position') as THREE.BufferAttribute).array);
    const teeBRest = new Float32Array((teeB.geometry.getAttribute('position') as THREE.BufferAttribute).array);

    // Increase bust + build on rigA only.
    rigA.setCharacter({ ...DEFAULT_CHARACTER, bust: 1.3, shoulderWidth: 1.14, build: 1.2 });

    const maxShift = (mesh: THREE.SkinnedMesh, rest: Float32Array) => {
      const arr = (mesh.geometry.getAttribute('position') as THREE.BufferAttribute).array;
      let max = 0;
      for (let i = 0; i < rest.length; i += 3) {
        const d = Math.hypot(arr[i] - rest[i], arr[i + 1] - rest[i + 1], arr[i + 2] - rest[i + 2]);
        if (d > max) max = d;
      }
      return max;
    };

    const teeShift = maxShift(teeA, teeRest);
    const jacketShift = maxShift(jacketA, jacketRest);
    const teeBShift = maxShift(teeB, teeBRest);

    // Garments on rigA moved outward; outer jacket moved more than inner tee;
    // rigB was completely unaffected (shared assetCache intact).
    expect(teeShift).toBeGreaterThan(0.002);
    expect(jacketShift).toBeGreaterThan(teeShift);
    expect(teeBShift).toBe(0);

    // Resetting rigA back to default character restores exact rest positions.
    rigA.setCharacter(DEFAULT_CHARACTER);
    expect(maxShift(teeA, teeRest)).toBeLessThan(1e-6);
  });
});
