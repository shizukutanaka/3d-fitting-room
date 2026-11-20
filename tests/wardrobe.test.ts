import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
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

describe('wardrobe geometry (builders run, anchors fill, nothing is NaN)', () => {
  function anchorStats(outfit: Outfit) {
    const rig = buildAvatar(outfit.character);
    applyOutfit(rig, outfit);
    let nan = false;
    rig.root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const pos = obj.geometry.getAttribute('position');
        for (let i = 0; i < pos.count; i++) {
          if (!Number.isFinite(pos.getX(i) + pos.getY(i) + pos.getZ(i))) nan = true;
        }
      }
    });
    return { rig, nan };
  }

  it('every top style builds, with and without every outer style', () => {
    for (const topStyle of TOP_STYLES) {
      for (const outerStyle of OUTER_STYLES) {
        const { rig, nan } = anchorStats({ ...DEFAULT_OUTFIT, topStyle, outerStyle });
        expect(nan).toBe(false);
        // torso anchor: the top, plus the outer shell when one is worn
        expect(rig.torsoAnchor.children.length).toBe(outerStyle === 'none' ? 1 : 2);
      }
    }
  });

  it('every bottom style builds (dresses suppress them all)', () => {
    for (const bottomStyle of BOTTOM_STYLES) {
      const withTop = anchorStats({ ...DEFAULT_OUTFIT, bottomStyle });
      expect(withTop.nan).toBe(false);
      expect(withTop.rig.bottomAnchor.children.length).toBe(bottomStyle === 'none' ? 0 : 1);
      const withDress = anchorStats({ ...DEFAULT_OUTFIT, topStyle: 'dressLong', bottomStyle });
      expect(withDress.rig.bottomAnchor.children.length).toBe(0);
    }
  });

  it('garments re-fit a larger body instead of clipping (bounding box grows)', () => {
    const measure = (outfit: Outfit): THREE.Box3 => {
      const rig = buildAvatar(outfit.character);
      applyOutfit(rig, outfit);
      rig.root.updateMatrixWorld(true);
      return new THREE.Box3().setFromObject(rig.torsoAnchor);
    };
    const base: Outfit = { ...DEFAULT_OUTFIT, topStyle: 'blouse', outerStyle: 'coat' };
    const wide: Outfit = {
      ...base,
      character: { ...DEFAULT_CHARACTER, build: 1.2, waist: 1.22, bust: 1.3, hip: 1.2 },
    };
    const a = measure(base);
    const b = measure(wide);
    const widthA = a.max.x - a.min.x;
    const widthB = b.max.x - b.min.x;
    expect(widthB).toBeGreaterThan(widthA);
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
