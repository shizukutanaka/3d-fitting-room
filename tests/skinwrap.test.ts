import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { SKIN_SCATTER_TINT, SKIN_WRAP, applySkinWrap, skinWrapLightingChunk } from '../src/avatar';

const LAMBERT_LINE = 'reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );';

describe('skin wrap lighting (backlog #13)', () => {
  it('swaps only the direct diffuse line of the physical lighting chunk', () => {
    const stock = THREE.ShaderChunk.lights_physical_pars_fragment;
    const wrapped = skinWrapLightingChunk();
    expect(stock).toContain(LAMBERT_LINE);
    expect(wrapped).not.toContain(LAMBERT_LINE);
    expect(wrapped).toContain('skinWrap * skinTint * directLight.color * BRDF_Lambert( material.diffuseColor )');
    const [head, tail] = stock.split(LAMBERT_LINE);
    expect(wrapped.startsWith(head)).toBe(true);
    expect(wrapped.endsWith(tail)).toBe(true);
  });

  it('wraps a little and tints toward red', () => {
    expect(SKIN_WRAP).toBeGreaterThan(0);
    expect(SKIN_WRAP).toBeLessThanOrEqual(0.5);
    expect(SKIN_SCATTER_TINT.r).toBeGreaterThan(SKIN_SCATTER_TINT.g);
    expect(SKIN_SCATTER_TINT.r).toBeGreaterThan(SKIN_SCATTER_TINT.b);
  });

  it('patches the material it is given and gives it its own program', () => {
    const skin = new THREE.MeshPhysicalMaterial();
    const cloth = new THREE.MeshPhysicalMaterial();
    applySkinWrap(skin);
    const shader = { fragmentShader: 'a\n#include <lights_physical_pars_fragment>\nb' };
    skin.onBeforeCompile(shader as never, null as never);
    expect(shader.fragmentShader).not.toContain('#include <lights_physical_pars_fragment>');
    expect(shader.fragmentShader).toContain('skinWrap');
    expect(skin.customProgramCacheKey()).not.toBe(cloth.customProgramCacheKey());
  });
});
