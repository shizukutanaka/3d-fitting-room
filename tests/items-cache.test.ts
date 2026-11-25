import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { applyOutfit, buildWarmupItems } from '../src/items';
import { ACCESSORIES, DEFAULT_OUTFIT, GLASSES, HATS } from '../src/outfit';
import type { AccessoryFit, AvatarRig } from '../src/avatar';

function installStubCanvas(): () => void {
  const origDoc = (globalThis as Record<string, unknown>).document;
  const noop = () => {};
  const ctx = new Proxy(
    {
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      createLinearGradient: () => ({ addColorStop: noop }),
      createRadialGradient: () => ({ addColorStop: noop }),
    },
    { get: (t, k) => (k in t ? (t as Record<string | symbol, unknown>)[k] : noop) },
  );
  (globalThis as Record<string, unknown>).document = {
    createElement: () => ({ width: 0, height: 0, getContext: () => ctx }),
  };
  return () => {
    if (origDoc === undefined) delete (globalThis as Record<string, unknown>).document;
    else (globalThis as Record<string, unknown>).document = origDoc;
  };
}

function makeStubRig(): AvatarRig {
  const fit: AccessoryFit = {
    neck: { y: 1.42, z: 0.01, rx: 0.055, rz: 0.055 },
    neckY: 1.42,
    hipsY: 0.92,
    shoulderTopY: 1.44,
    frontZ: () => 0.12,
    toNeck: (v) => v.clone(),
    toBag: (v) => v.clone(),
  };
  return {
    root: new THREE.Group(),
    hatAnchor: new THREE.Group(),
    glassesAnchor: new THREE.Group(),
    neckAnchor: new THREE.Group(),
    bagAnchor: new THREE.Group(),
    setFigure: async () => {},
    figure: () => 'a',
    setGarments: () => {},
    applyPose: () => {},
    applyCharacter: () => {},
    setLegRatio: () => {},
    update: () => {},
    fit: () => fit,
    bounds: () => new THREE.Box3(),
    allGarmentMeshes: () => [],
  } as unknown as AvatarRig;
}

function collectGpuObjects(root: THREE.Object3D): { materials: Set<THREE.Material>; textures: Set<THREE.Texture> } {
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const m of mats) {
      materials.add(m);
      for (const v of Object.values(m as unknown as Record<string, unknown>)) {
        if (v && (v as THREE.Texture).isTexture === true) textures.add(v as THREE.Texture);
      }
    }
  });
  return { materials, textures };
}

describe('accessory GPU resource caching', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = installStubCanvas();
  });

  afterEach(() => {
    restore();
  });

  it('reuses identical Material and Texture instances between warmup and repeated outfit switches', () => {
    const rig = makeStubRig();
    const warmup = buildWarmupItems(rig);
    const warmGpu = collectGpuObjects(warmup);
    expect(warmGpu.materials.size).toBeGreaterThan(0);
    expect(warmGpu.textures.size).toBeGreaterThan(0);

    // Equip every hat, glasses, and accessory twice and verify every
    // material and texture is reused from the warmed set (zero leaks).
    for (let round = 0; round < 2; round++) {
      for (const hat of HATS) {
        applyOutfit(rig, { ...DEFAULT_OUTFIT, hat });
        const { materials, textures } = collectGpuObjects(rig.hatAnchor);
        for (const m of materials) expect(warmGpu.materials.has(m)).toBe(true);
        for (const t of textures) expect(warmGpu.textures.has(t)).toBe(true);
      }
      for (const glasses of GLASSES) {
        applyOutfit(rig, { ...DEFAULT_OUTFIT, glasses });
        const { materials, textures } = collectGpuObjects(rig.glassesAnchor);
        for (const m of materials) expect(warmGpu.materials.has(m)).toBe(true);
        for (const t of textures) expect(warmGpu.textures.has(t)).toBe(true);
      }
      for (const accessory of ACCESSORIES) {
        applyOutfit(rig, { ...DEFAULT_OUTFIT, accessory });
        const neckGpu = collectGpuObjects(rig.neckAnchor);
        const bagGpu = collectGpuObjects(rig.bagAnchor);
        for (const m of [...neckGpu.materials, ...bagGpu.materials]) expect(warmGpu.materials.has(m)).toBe(true);
        for (const t of [...neckGpu.textures, ...bagGpu.textures]) expect(warmGpu.textures.has(t)).toBe(true);
      }
    }
  });
});
