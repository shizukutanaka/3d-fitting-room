import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { HAIR_ALPHA_TEST, applyHairCutoutRule, createHairMaterial } from '../src/avatar';
import { buildGlb, parseGlb } from '../src/glb';

// Design rule (backlog #17): hair materials render as alpha-tested
// cutout (transparent=false, alphaTest>0, depthWrite=true) rather
// than transparent blending, to avoid transparency overdraw and
// sort-order artefacts on mobile/standalone XR GPUs.

describe('hair cutout material design rule (backlog #17)', () => {
  it('applyHairCutoutRule converts a transparent blended material to cutout', () => {
    const mat = new THREE.MeshStandardMaterial({
      name: 'hair-cards',
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const out = applyHairCutoutRule(mat);
    expect(out).toBe(mat);
    expect(mat.transparent).toBe(false);
    expect(mat.alphaTest).toBe(HAIR_ALPHA_TEST);
    expect(mat.alphaTest).toBeGreaterThan(0);
    expect(mat.depthWrite).toBe(true);
    expect(mat.side).toBe(THREE.DoubleSide);
  });

  it('createHairMaterial produces a cutout material with no transparent blending', () => {
    const mat = createHairMaterial('#3a271c');
    expect(mat.name).toBe('hair');
    expect(mat.transparent).toBe(false);
    expect(mat.alphaTest).toBe(HAIR_ALPHA_TEST);
    expect(mat.depthWrite).toBe(true);
    expect(mat.side).toBe(THREE.DoubleSide);
    expect(mat.color.getHexString()).toBe('3a271c');
  });

  it('buildGlb emits glTF alphaMode MASK and alphaCutoff for cutout materials', () => {
    const bytes = buildGlb(
      [
        {
          name: 'H_bob',
          positions: [0, 0, 0, 1, 0, 0, 0, 1, 0],
          normals: [0, 0, 1, 0, 0, 1, 0, 0, 1],
          material: 0,
        },
      ],
      [
        {
          name: 'hair',
          baseColorFactor: [0.2, 0.15, 0.1, 1],
          roughnessFactor: 0.55,
          metallicFactor: 0,
          alphaMode: 'MASK',
          alphaCutoff: HAIR_ALPHA_TEST,
          doubleSided: true,
        },
      ],
      { generator: 'test' },
    );
    const parsed = parseGlb(bytes);
    expect(parsed).not.toBeNull();
    const mat = (parsed!.json.materials as Array<Record<string, unknown>>)[0];
    expect(mat.alphaMode).toBe('MASK');
    expect(mat.alphaCutoff).toBe(HAIR_ALPHA_TEST);
    expect(mat.doubleSided).toBe(true);
  });
});
