import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  DYNAMIC_LIGHT_BUDGET,
  auditSceneLights,
  buildLightingRig,
  createBoutiqueEnvironment,
} from '../src/scene';

describe('consolidated dynamic lighting (backlog #8)', () => {
  it('fixes dynamic lights to exactly one shadow-casting key light plus one fill light', () => {
    const scene = new THREE.Scene();
    const { key, fill } = buildLightingRig(scene);
    const audit = auditSceneLights(scene);

    expect(audit.total).toBe(DYNAMIC_LIGHT_BUDGET.total);
    expect(audit.shadowCasting).toBe(DYNAMIC_LIGHT_BUDGET.shadowCasting);
    expect(audit.spot).toBe(1);
    expect(audit.directional).toBe(1);
    expect(audit.point).toBe(0);
    expect(audit.hemisphere).toBe(0);
    expect(key.castShadow).toBe(true);
    expect(fill.castShadow).toBe(false);
  });

  it('bakes room ambience, sconces, and rim into emissive environment panels', () => {
    const env = createBoutiqueEnvironment();
    let emissivePanels = 0;
    env.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat.emissive && mat.emissiveIntensity > 0) emissivePanels += 1;
    });
    expect(emissivePanels).toBeGreaterThanOrEqual(4);
  });

  it('does not instantiate PointLight or HemisphereLight anywhere in src/scene.ts', () => {
    const src = readFileSync('src/scene.ts', 'utf8');
    expect(src).not.toMatch(/new\s+THREE\.PointLight\b/);
    expect(src).not.toMatch(/new\s+THREE\.HemisphereLight\b/);
    expect(src.match(/new\s+THREE\.SpotLight\b/g)?.length ?? 0).toBe(1);
    expect(src.match(/new\s+THREE\.DirectionalLight\b/g)?.length ?? 0).toBe(1);
  });
});
