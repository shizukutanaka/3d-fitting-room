import * as THREE from 'three';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import {
  BOTTOM_STYLES,
  DEFAULT_OUTFIT,
  OUTER_STYLES,
  TOP_STYLES,
  sanitizeOutfit,
  type Outfit,
} from '../src/outfit';
import { decodeSeed, encodeSeed } from '../src/seed';
import { DEFAULT_CHARACTER } from '../src/character';

function seedFromBytes(prefix: string, bytes: number[]): string {
  return prefix + Buffer.from(bytes).toString('base64url');
}

/** The v4 core (34 bytes) of a seed for the default outfit, as
 *  the older format versions carried it — built by hand so the
 *  compat tests do not depend on the current encoder. */
function v4Core(): number[] {
  const seed = encodeSeed(DEFAULT_OUTFIT);
  const bytes = [...Buffer.from(seed.slice(4), 'base64url')];
  return bytes.slice(0, 34);
}

describe('seed v6 (wardrobe block)', () => {
  it('round-trips outerwear and the new styles exactly', () => {
    const o: Outfit = {
      ...DEFAULT_OUTFIT,
      topStyle: 'dressLong',
      outerStyle: 'cardigan',
      outerColor: '#7a2e3a',
      bottomStyle: 'skirtLong',
      shoeStyle: 'pumps',
      shoeColor: '#c0c6cc',
    };
    const seed = encodeSeed(o);
    expect(seed.startsWith('FR6-')).toBe(true);
    const back = decodeSeed(seed);
    expect(back).not.toBeNull();
    expect(back!.outerStyle).toBe('cardigan');
    expect(back!.outerColor).toBe('#7a2e3a');
    expect(back!.topStyle).toBe('dressLong');
    expect(back!.bottomStyle).toBe('skirtLong');
    expect(back!.shoeColor).toBe('#c0c6cc');
    expect(encodeSeed(back!)).toBe(seed);
  });

  it('a v5 seed (no wardrobe block) loads with no outerwear', () => {
    const core = v4Core();
    core[0] = 5;
    const back = decodeSeed(seedFromBytes('FR5-', [...core, 0]));
    expect(back).not.toBeNull();
    expect(back!.outerStyle).toBe('none');
    expect(back!.name).toBe('');
  });

  it('a v6 seed with a name keeps both the name and the wardrobe', () => {
    const o: Outfit = { ...DEFAULT_OUTFIT, name: 'ミライ', outerStyle: 'coat', outerColor: '#26262b' };
    const back = decodeSeed(encodeSeed(o));
    expect(back!.name).toBe('ミライ');
    expect(back!.outerStyle).toBe('coat');
    expect(back!.outerColor).toBe('#26262b');
  });

  it('structurally broken v6 seeds are rejected whole', () => {
    const core = v4Core();
    core[0] = 6;
    // name length byte disagrees with the payload
    expect(decodeSeed(seedFromBytes('FR6-', [...core, 1, 2, 5, 0x41]))).toBeNull();
    // wardrobe block missing entirely
    expect(decodeSeed(seedFromBytes('FR6-', [...core, 0]))).toBeNull();
    // trailing garbage after a sound name block
    expect(decodeSeed(seedFromBytes('FR6-', [...core, 1, 2, 0, 0]))).toBeNull();
  });

  it('an out-of-range wardrobe byte clamps to the last catalog entry', () => {
    const core = v4Core();
    core[0] = 6;
    const back = decodeSeed(seedFromBytes('FR6-', [...core, 255, 255, 0]));
    expect(back).not.toBeNull();
    expect(OUTER_STYLES).toContain(back!.outerStyle);
    expect(back!.outerStyle).toBe(OUTER_STYLES[OUTER_STYLES.length - 1]);
  });
});

// items.ts/avatar.ts paint procedural textures on a 2D canvas
// (textures.ts). Under node there is no DOM, so a universal
// no-op canvas stands in: every context property reads back as
// the context itself (callable), every write is swallowed. The
// geometry — the thing under test — is pure math and real.
const canvasStub = { width: 0, height: 0, style: {}, getContext: () => ctxStub };
const ctxStub: unknown = new Proxy(function () {}, {
  get: (_t, prop) => (prop === 'canvas' ? canvasStub : ctxStub),
  set: () => true,
  apply: () => ctxStub,
});
(globalThis as { document?: unknown }).document = {
  createElement: (tag: string) => (tag === 'canvas' ? canvasStub : {}),
};
const { buildAvatar } = await import('../src/avatar');
const { applyOutfit } = await import('../src/items');

// The mannequin GLBs are real files under public/models; under node
// they are served to GLTFLoader through a fetch stub. Baked maps go
// through the DOM image loader, which node lacks, so they load as null.
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

describe('wardrobe on the skinned mannequin (GLB garments, bone calibration)', { timeout: 60000 }, () => {
  async function dressed(outfit: Outfit) {
    const rig = buildAvatar(outfit.character);
    applyOutfit(rig, outfit);
    await rig.ready;
    const visible = new Set<string>();
    let nan = false;
    rig.root.traverse((obj) => {
      if (obj instanceof THREE.SkinnedMesh && obj.name.startsWith('G_') && obj.visible) visible.add(obj.name.slice(2));
      if (obj instanceof THREE.Mesh) {
        const pos = obj.geometry.getAttribute('position');
        for (let i = 0; i < pos.count; i++) {
          if (!Number.isFinite(pos.getX(i) + pos.getY(i) + pos.getZ(i))) nan = true;
        }
      }
    });
    return { rig, visible, nan };
  }

  it('every top shows its own skinned garment, plus the outer shell when worn', async () => {
    for (const topStyle of TOP_STYLES) {
      for (const outerStyle of OUTER_STYLES) {
        const { visible, nan } = await dressed({ ...DEFAULT_OUTFIT, topStyle, outerStyle });
        expect(nan).toBe(false);
        expect(visible.has(topStyle)).toBe(true);
        expect(visible.has('base')).toBe(true);
        if (outerStyle !== 'none') expect(visible.has(outerStyle)).toBe(true);
      }
    }
  });

  it('garments carry a wrinkle and hem normal map without gaining triangles; footwear and the base layer have none', async () => {
    const { rig } = await dressed({ ...DEFAULT_OUTFIT, topStyle: 'tee', outerStyle: 'jacket' });
    const glb = readFileSync('public/models/mannequin-a.glb');
    const jsonLen = glb.readUInt32LE(12);
    const gltf = JSON.parse(glb.subarray(20, 20 + jsonLen).toString());
    let seen = 0;
    rig.root.traverse((obj) => {
      if (!(obj instanceof THREE.SkinnedMesh) || !obj.name.startsWith('G_')) return;
      const id = obj.name.slice(2);
      const mat = obj.material as THREE.MeshPhysicalMaterial;
      const plain = id === 'base' || id === 'boots' || id === 'sneakers' || id === 'shoesLow';
      expect(mat.normalMap === null, id).toBe(plain);
      expect(mat.bumpMap, id).not.toBeNull();
      const node = gltf.nodes.find((n: { name: string }) => n.name === obj.name);
      const source = gltf.meshes[node.mesh].primitives.reduce(
        (sum: number, p: { indices: number }) => sum + gltf.accessors[p.indices].count,
        0,
      );
      expect(obj.geometry.getIndex()!.count, id).toBe(source);
      seen++;
    });
    expect(seen).toBeGreaterThan(10);
  });

  it('every bottom shows (dresses suppress them all)', async () => {
    for (const bottomStyle of BOTTOM_STYLES) {
      if (bottomStyle === 'none') continue;
      const withTop = await dressed({ ...DEFAULT_OUTFIT, topStyle: 'tee', bottomStyle });
      expect(withTop.visible.has(bottomStyle)).toBe(true);
      const withDress = await dressed({ ...DEFAULT_OUTFIT, topStyle: 'dressLong', bottomStyle });
      expect(withDress.visible.has(bottomStyle)).toBe(false);
    }
  });

  it('Body Scale Calibration moves the joints to the landmark ratios', async () => {
    for (const height of [1.5, 1.74, 1.9]) {
      const { rig } = await dressed({ ...DEFAULT_OUTFIT, character: { ...DEFAULT_CHARACTER, height } });
      rig.root.updateMatrixWorld(true);
      const y = (name: string) => {
        const o = rig.root.getObjectByName(name);
        // heights from the podium top the mannequin stands on
        return o ? o.getWorldPosition(new THREE.Vector3()).y - rig.root.position.y : NaN;
      };
      // Knee joint at ~0.28H, hip joint just above the 0.47H inseam.
      expect(y('leftLowerLeg') / height).toBeCloseTo(0.28, 1);
      expect(y('leftUpperLeg') / height).toBeGreaterThan(0.47);
      expect(y('leftUpperLeg') / height).toBeLessThan(0.56);
      // Garments re-fit: the skinned top grows with the body.
      const top = rig.root.getObjectByName('G_tee') as THREE.SkinnedMesh;
      const box = new THREE.Box3();
      top.computeBoundingBox();
      box.copy(top.boundingBox!).applyMatrix4(top.matrixWorld);
      expect(Number.isFinite(box.max.y)).toBe(true);
    }
  });

  it('the mannequin stands on the podium and no garment dips inside the body', async () => {
    const rig = buildAvatar(DEFAULT_OUTFIT.character);
    applyOutfit(rig, DEFAULT_OUTFIT);
    await rig.ready;
    rig.root.updateMatrixWorld(true);
    const meshes = new Map<string, THREE.SkinnedMesh>();
    rig.root.traverse((o) => {
      const m = o as THREE.SkinnedMesh;
      if (m.isSkinnedMesh) meshes.set(m.name, m);
    });
    const body = [...meshes].filter(([n]) => !n.startsWith('G_')).map(([, m]) => m);
    let minY = Infinity;
    const bp: number[] = [];
    const bn: number[] = [];
    const v = new THREE.Vector3();
    for (const m of body) {
      const pos = m.geometry.getAttribute('position');
      const nor = m.geometry.getAttribute('normal');
      for (let i = 0; i < pos.count; i++) {
        minY = Math.min(minY, m.getVertexPosition(i, v).applyMatrix4(m.matrixWorld).y);
        bp.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        bn.push(nor.getX(i), nor.getY(i), nor.getZ(i));
      }
    }
    // podium top surface is y = 0.12 (scene.ts)
    expect(minY).toBeGreaterThan(0.115);
    expect(minY).toBeLessThan(0.13);
    // Bind-pose gap to the nearest body vertex, along its normal.
    for (const g of ['G_base', 'G_tee', 'G_shorts', 'G_pants', 'G_hoodie', 'G_dress']) {
      const pos = meshes.get(g)!.geometry.getAttribute('position');
      let minGap = Infinity;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        let best = Infinity;
        let bi = 0;
        for (let j = 0; j < bp.length / 3; j++) {
          const d = (x - bp[3 * j]) ** 2 + (y - bp[3 * j + 1]) ** 2 + (z - bp[3 * j + 2]) ** 2;
          if (d < best) {
            best = d;
            bi = j;
          }
        }
        const gap = (x - bp[3 * bi]) * bn[3 * bi] + (y - bp[3 * bi + 1]) * bn[3 * bi + 1] + (z - bp[3 * bi + 2]) * bn[3 * bi + 2];
        minGap = Math.min(minGap, gap);
      }
      expect(minGap, g).toBeGreaterThan(0.0025);
    }
  });

  it('under an outer layer the top is drawn in to the body so the cloth layers cannot cross', async () => {
    const { rig } = await dressed({ ...DEFAULT_OUTFIT, topStyle: 'hoodie', outerStyle: 'coat' });
    const meshes = new Map<string, THREE.SkinnedMesh>();
    rig.root.traverse((o) => {
      const m = o as THREE.SkinnedMesh;
      if (m.isSkinnedMesh) meshes.set(m.name, m);
    });
    const hoodie = meshes.get('G_hoodie')!;
    expect(hoodie.morphTargetInfluences?.[0]).toBe(1);
    const delta = hoodie.geometry.morphAttributes.position[0];
    let inward = 0;
    for (let i = 0; i < delta.count; i++) if (Math.hypot(delta.getX(i), delta.getY(i), delta.getZ(i)) > 0.005) inward++;
    expect(inward / delta.count).toBeGreaterThan(0.3);
    applyOutfit(rig, { ...DEFAULT_OUTFIT, topStyle: 'hoodie', outerStyle: 'none' });
    expect(hoodie.morphTargetInfluences?.[0]).toBe(0);
  });

  it('pumps raise the heel on posts while the balls of the feet stay on the floor; flats do not', async () => {
    const heelsOf = (rig: { root: THREE.Object3D }) => rig.root.getObjectByName('pump-heels')!.children;
    const toesY = (rig: { root: THREE.Object3D }) => {
      rig.root.updateMatrixWorld(true);
      return rig.root.getObjectByName('leftToes')!.getWorldPosition(new THREE.Vector3()).y;
    };
    const flats = await dressed({ ...DEFAULT_OUTFIT, shoeStyle: 'flats' });
    const pumps = await dressed({ ...DEFAULT_OUTFIT, shoeStyle: 'pumps' });
    expect(heelsOf(flats.rig)).toHaveLength(0);
    expect(heelsOf(pumps.rig)).toHaveLength(2);
    for (const h of heelsOf(pumps.rig)) {
      const height = ((h as THREE.Mesh).geometry as THREE.CylinderGeometry).parameters.height;
      expect(height).toBeGreaterThan(0.03);
      expect(height).toBeLessThan(0.1);
    }
    expect(Math.abs(toesY(pumps.rig) - toesY(flats.rig))).toBeLessThan(0.003);
  });

  it('necklace, scarf and bag are fitted to the loaded figure and rebuilt when it changes', async () => {
    for (const accessory of ['necklace', 'scarf', 'bag'] as const) {
      const { rig, nan } = await dressed({ ...DEFAULT_OUTFIT, accessory });
      expect(nan).toBe(false);
      const anchor = accessory === 'bag' ? rig.bagAnchor : rig.neckAnchor;
      expect(anchor.children.length).toBe(1);
      const before = anchor.children[0];
      await rig.setBody('b', 'standard');
      expect(anchor.children.length).toBe(1);
      expect(anchor.children[0]).not.toBe(before);
    }
  });

  it('every cloth surface is a physical material with a fabric sheen in the cloth\'s own tint', async () => {
    const check = (m: THREE.Material, label: string) => {
      expect(m, label).toBeInstanceOf(THREE.MeshPhysicalMaterial);
      const mat = m as THREE.MeshPhysicalMaterial;
      expect(mat.sheen, label).toBeGreaterThan(0);
      expect(mat.sheenRoughness, label).toBeGreaterThan(0);
      // Sheen colour = base colour lifted 35% toward white.
      const want = mat.color.clone().lerp(new THREE.Color('#ffffff'), 0.35);
      expect(Math.abs(mat.sheenColor.r - want.r), label).toBeLessThan(1e-6);
      expect(Math.abs(mat.sheenColor.g - want.g), label).toBeLessThan(1e-6);
      expect(Math.abs(mat.sheenColor.b - want.b), label).toBeLessThan(1e-6);
    };
    // Skinned garments.
    const { rig } = await dressed({ ...DEFAULT_OUTFIT, topStyle: 'hoodie', topColor: '#3a5fa8', outerStyle: 'coat', bottomStyle: 'skirt' });
    let garments = 0;
    rig.root.traverse((obj) => {
      if (!(obj instanceof THREE.SkinnedMesh) || !obj.name.startsWith('G_') || !obj.visible) return;
      const mat = obj.material as THREE.MeshPhysicalMaterial;
      expect(mat).toBeInstanceOf(THREE.MeshPhysicalMaterial);
      expect(mat.sheen + mat.clearcoat, obj.name).toBeGreaterThan(0);
      // The base layer keeps a fixed sheen tint; leather shoes use clearcoat.
      if (obj.name === 'G_base' || mat.clearcoat > 0) return;
      check(mat, obj.name);
      garments += 1;
    });
    expect(garments).toBeGreaterThanOrEqual(3);
    // Procedural cloth accessories.
    const fabricKinds = new Set<string>();
    const collect = (root: THREE.Object3D) =>
      root.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mat = obj.material as THREE.Material;
        if (!mat.name.startsWith('fabric-')) return;
        check(mat, mat.name);
        fabricKinds.add(mat.name);
      });
    for (const hat of ['cap', 'beanie', 'catears', 'ribbon'] as const) {
      const r = await dressed({ ...DEFAULT_OUTFIT, hat });
      expect(r.rig.hatAnchor.children.length).toBe(1);
      collect(r.rig.hatAnchor);
    }
    const scarf = await dressed({ ...DEFAULT_OUTFIT, accessory: 'scarf' });
    collect(scarf.rig.neckAnchor);
    expect([...fabricKinds].sort()).toEqual(['fabric-cotton', 'fabric-fur', 'fabric-knit', 'fabric-satin', 'fabric-wool']);
  });

  it('sanitizeOutfit keeps the new catalog values and rejects off-list ones', () => {
    const o = sanitizeOutfit({
      topStyle: 'dressLong',
      outerStyle: 'jacket',
      outerColor: '#6b7250',
      bottomStyle: 'skirtLong',
      topColor: '#f2a65a',
    });
    expect(o.topStyle).toBe('dressLong');
    expect(o.outerStyle).toBe('jacket');
    expect(o.outerColor).toBe('#6b7250');
    expect(o.bottomStyle).toBe('skirtLong');
    expect(o.topColor).toBe('#f2a65a');
    expect(sanitizeOutfit({ outerStyle: 'parka' }).outerStyle).toBe('none');
    expect(sanitizeOutfit({ outerColor: '#123456' }).outerColor).toBe(DEFAULT_OUTFIT.outerColor);
  });
});
