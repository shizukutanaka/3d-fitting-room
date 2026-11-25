import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { describe, expect, it, vi } from 'vitest';
import { parseGlb } from '../src/glb';
import { DEFAULT_OUTFIT, type Outfit } from '../src/outfit';

const canvasStub = { width: 0, height: 0, style: {}, getContext: () => ctxStub };
const ctxStub: unknown = new Proxy(function () {}, {
  get: (_t, prop) => (prop === 'canvas' ? canvasStub : ctxStub),
  set: () => true,
  apply: () => ctxStub,
});
(globalThis as { document?: unknown }).document = {
  createElement: (tag: string) => (tag === 'canvas' ? canvasStub : {}),
};
vi.stubEnv('BASE_URL', 'http://test.invalid/');
(globalThis as { ProgressEvent?: unknown }).ProgressEvent ??= class extends Event {
  lengthComputable = false;
  loaded = 0;
  total = 0;
};
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const m = /\/models\/(.+)$/.exec(url);
  if (!m) return realFetch(input);
  const buf = readFileSync(new URL(`../public/models/${m[1]}`, import.meta.url));
  return new Response(buf, { status: 200 });
}) as typeof fetch;

const { exportGlb, exportVrm } = await import('../src/export3d');

describe('KHR_materials_sheen export (backlog #20)', { timeout: 60000 }, () => {
  it('exports KHR_materials_sheen on cloth garments and accessories, omits it on skin/leather, and round-trips through GLTFLoader', async () => {
    const outfit: Outfit = {
      ...DEFAULT_OUTFIT,
      topStyle: 'hoodie',
      topColor: '#3a5f8a',
      bottomStyle: 'skirt',
      bottomColor: '#8a3a5f',
      shoeStyle: 'boots',
      accessory: 'scarf',
      hat: 'ribbon',
    };

    const glb = await exportGlb(outfit, 'a', 'standard');
    const json = parseGlb(glb.bytes)!.json as any;
    expect(json.extensionsUsed).toContain('KHR_materials_sheen');

    const byName = new Map<string, any>(json.materials.map((m: any) => [m.name, m]));
    // Cloth garments carry KHR_materials_sheen with roughness matching FABRIC.
    const hoodie = byName.get('hoodie');
    expect(hoodie?.extensions?.KHR_materials_sheen).toBeDefined();
    expect(hoodie.extensions.KHR_materials_sheen.sheenRoughnessFactor).toBeCloseTo(0.9, 5);
    expect(hoodie.extensions.KHR_materials_sheen.sheenColorFactor.some((c: number) => c > 0)).toBe(true);

    const skirt = byName.get('skirt');
    expect(skirt?.extensions?.KHR_materials_sheen?.sheenRoughnessFactor).toBeCloseTo(0.6, 5);

    // Cloth accessories (wool scarf, satin ribbon) carry KHR_materials_sheen.
    expect(byName.get('fabric-wool')?.extensions?.KHR_materials_sheen?.sheenRoughnessFactor).toBeCloseTo(0.85, 5);
    expect(byName.get('fabric-satin')?.extensions?.KHR_materials_sheen?.sheenRoughnessFactor).toBeCloseTo(0.3, 5);

    // Non-sheen materials (mannequin body, leather boots) omit KHR_materials_sheen.
    expect(byName.get('mannequin')?.extensions?.KHR_materials_sheen).toBeUndefined();
    expect(byName.get('boots')?.extensions?.KHR_materials_sheen).toBeUndefined();

    // VRM export includes both VRMC_vrm and KHR_materials_sheen.
    const vrm = await exportVrm(outfit, 'a', 'standard');
    const vrmJson = parseGlb(vrm.bytes)!.json as any;
    expect(vrmJson.extensionsUsed).toContain('VRMC_vrm');
    expect(vrmJson.extensionsUsed).toContain('KHR_materials_sheen');

    // Real GLTFLoader round-trip restores MeshPhysicalMaterial sheen.
    const loader = new GLTFLoader();
    const ab = new Uint8Array(glb.bytes).buffer;
    const loaded = await loader.parseAsync(ab, '');
    let loadedHoodie: THREE.MeshPhysicalMaterial | null = null;
    loaded.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.name === 'G_hoodie') {
        loadedHoodie = obj.material as THREE.MeshPhysicalMaterial;
      }
    });
    expect(loadedHoodie).not.toBeNull();
    expect(loadedHoodie!.sheen).toBeGreaterThan(0);
    expect(loadedHoodie!.sheenRoughness).toBeCloseTo(0.9, 5);
    expect(loadedHoodie!.sheenColor.r + loadedHoodie!.sheenColor.g + loadedHoodie!.sheenColor.b).toBeGreaterThan(0);
  });

  it('exporting GLB/VRM does not dispose shared cached accessory materials or textures', async () => {
    const { buildAvatar } = await import('../src/avatar');
    const { applyOutfit } = await import('../src/items');
    const { exportGlb } = await import('../src/export3d');
    const outfit: Outfit = {
      ...DEFAULT_OUTFIT,
      hat: 'ribbon',
      accessory: 'scarf',
      glasses: 'round',
    };
    const liveRig = buildAvatar(outfit.character, 'a', 'standard');
    applyOutfit(liveRig, outfit);
    await liveRig.ready;

    const disposed = new Set<object>();
    const watched = new Set<object>();
    for (const anchor of [liveRig.hatAnchor, liveRig.glassesAnchor, liveRig.neckAnchor, liveRig.bagAnchor]) {
      anchor.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if (!watched.has(m)) {
            watched.add(m);
            const orig = m.dispose.bind(m);
            m.dispose = () => { disposed.add(m); orig(); };
          }
          const std = m as THREE.MeshStandardMaterial;
          for (const tex of [std.map, std.bumpMap]) {
            if (tex && !watched.has(tex)) {
              watched.add(tex);
              const origTex = tex.dispose.bind(tex);
              tex.dispose = () => { disposed.add(tex); origTex(); };
            }
          }
        }
      });
    }
    expect(watched.size).toBeGreaterThan(0);
    await exportGlb(outfit, 'a', 'standard');
    expect(disposed.size).toBe(0);
  });
});
