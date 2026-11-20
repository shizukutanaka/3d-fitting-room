import { describe, expect, it } from 'vitest';
import {
  CHARACTER_PARAM_SPECS,
  DEFAULT_CHARACTER,
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
  fitzpatrickLabel,
  sanitizeCharacter,
  skinColorForTone,
} from '../src/character';
import { DEFAULT_OUTFIT, loadOutfit, sanitizeOutfit, type Outfit } from '../src/outfit';
import { decodeSeed, encodeSeed } from '../src/seed';

class FakeStorage implements Storage {
  private map = new Map<string, string>();
  get length(): number {
    return this.map.size;
  }
  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  key(index: number): string | null {
    return [...this.map.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
}

describe('character parameter specs (phase 0 source of truth)', () => {
  it('every spec default matches DEFAULT_CHARACTER and is in range', () => {
    for (const [name, spec] of Object.entries(CHARACTER_PARAM_SPECS)) {
      const key = name as keyof typeof DEFAULT_CHARACTER;
      if (spec.kind === 'range') {
        expect(spec.min).toBeLessThan(spec.max);
        expect(spec.def).toBeGreaterThanOrEqual(spec.min);
        expect(spec.def).toBeLessThanOrEqual(spec.max);
        expect(DEFAULT_CHARACTER[key]).toBe(spec.def);
      } else {
        expect(spec.options).toContain(spec.def);
        expect(new Set(spec.options).size).toBe(spec.options.length);
        expect(DEFAULT_CHARACTER[key]).toBe(spec.def);
      }
    }
  });

  it('sanitizeCharacter falls back to defaults for garbage', () => {
    expect(sanitizeCharacter(null)).toEqual(DEFAULT_CHARACTER);
    expect(sanitizeCharacter('nope')).toEqual(DEFAULT_CHARACTER);
    expect(sanitizeCharacter({ hairStyle: 'mohawk' })).toEqual(DEFAULT_CHARACTER);
    expect(sanitizeCharacter({ hairColor: '#123456' }).hairColor).toBe(
      DEFAULT_CHARACTER.hairColor,
    );
    expect(sanitizeCharacter({ skinTone: 'dark' }).skinTone).toBe(DEFAULT_CHARACTER.skinTone);
    expect(sanitizeCharacter({ height: Number.NaN }).height).toBe(DEFAULT_CHARACTER.height);
  });

  it('sanitizeCharacter clamps ranges and keeps valid values', () => {
    expect(sanitizeCharacter({ skinTone: 2 }).skinTone).toBe(1);
    expect(sanitizeCharacter({ skinTone: -0.5 }).skinTone).toBe(0);
    expect(sanitizeCharacter({ height: 3 }).height).toBe(HEIGHT_MAX);
    expect(sanitizeCharacter({ height: 1 }).height).toBe(HEIGHT_MIN);
    const c = sanitizeCharacter({
      skinTone: 0.85,
      height: 1.6,
      hairStyle: 'ponytail',
      hairColor: HAIR_COLORS[6],
      eyeColor: EYE_COLORS[4],
    });
    expect(c).toEqual({
      skinTone: 0.85,
      height: 1.6,
      hairStyle: 'ponytail',
      hairColor: HAIR_COLORS[6],
      eyeColor: EYE_COLORS[4],
    });
    expect(HAIR_STYLES).toContain(c.hairStyle);
  });
});

describe('skin tone mapping', () => {
  const lum = (hex: string): number => {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  };

  it('hits the Fitzpatrick I and VI anchors at the ends', () => {
    expect(skinColorForTone(0)).toBe('#ffdfc4');
    expect(skinColorForTone(1)).toBe('#5c3828');
    expect(skinColorForTone(-1)).toBe('#ffdfc4');
    expect(skinColorForTone(2)).toBe('#5c3828');
  });

  it('darkens monotonically across the whole scale', () => {
    let prev = Infinity;
    for (let i = 0; i <= 20; i++) {
      const l = lum(skinColorForTone(i / 20));
      expect(l).toBeLessThan(prev);
      prev = l;
    }
  });

  it('the default tone stays close to the pre-parameter skin color', () => {
    // The avatar's original hard-coded skin was #e9b48c; the
    // default parameter value must land near it so the default
    // person does not visibly change identity.
    const got = skinColorForTone(DEFAULT_CHARACTER.skinTone);
    const want = [0xe9, 0xb4, 0x8c];
    const n = parseInt(got.slice(1), 16);
    const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    channels.forEach((v, i) => expect(Math.abs(v - want[i])).toBeLessThanOrEqual(10));
  });

  it('labels the scale with roman numerals', () => {
    expect(fitzpatrickLabel(0)).toBe('I');
    expect(fitzpatrickLabel(0.5)).toBe('IV');
    expect(fitzpatrickLabel(1)).toBe('VI');
  });
});

describe('seed encoding (phase 0)', () => {
  const custom: Outfit = {
    topStyle: 'dress',
    topColor: '#3a4152',
    hat: 'ribbon',
    glasses: 'round',
    accessory: 'bag',
    pose: 'cheer',
    character: {
      skinTone: 0.8,
      hairColor: HAIR_COLORS[6],
      eyeColor: EYE_COLORS[4],
      hairStyle: 'ponytail',
      height: 1.6,
    },
  };

  it('round-trips a full state (continuous values within quantization)', () => {
    const back = decodeSeed(encodeSeed(custom));
    expect(back).not.toBeNull();
    expect(back!.topStyle).toBe('dress');
    expect(back!.topColor).toBe('#3a4152');
    expect(back!.hat).toBe('ribbon');
    expect(back!.glasses).toBe('round');
    expect(back!.accessory).toBe('bag');
    expect(back!.pose).toBe('cheer');
    expect(back!.character.hairColor).toBe(HAIR_COLORS[6]);
    expect(back!.character.eyeColor).toBe(EYE_COLORS[4]);
    expect(back!.character.hairStyle).toBe('ponytail');
    expect(back!.character.height).toBe(1.6);
    expect(Math.abs(back!.character.skinTone - 0.8)).toBeLessThanOrEqual(1 / 255);
  });

  it('round-trips the default state and the range extremes', () => {
    for (const state of [
      DEFAULT_OUTFIT,
      {
        ...DEFAULT_OUTFIT,
        character: {
          skinTone: 0,
          hairColor: HAIR_COLORS[0],
          eyeColor: EYE_COLORS[0],
          hairStyle: HAIR_STYLES[0],
          height: HEIGHT_MIN,
        },
      },
      {
        ...DEFAULT_OUTFIT,
        character: {
          skinTone: 1,
          hairColor: HAIR_COLORS[HAIR_COLORS.length - 1],
          eyeColor: EYE_COLORS[EYE_COLORS.length - 1],
          hairStyle: HAIR_STYLES[HAIR_STYLES.length - 1],
          height: HEIGHT_MAX,
        },
      },
    ]) {
      const seed = encodeSeed(state);
      const back = decodeSeed(seed);
      expect(back).not.toBeNull();
      // Encoding the decoded state reproduces the identical seed:
      // the round-trip is exact at the encoded level.
      expect(encodeSeed(back!)).toBe(seed);
    }
  });

  it('rejects malformed seeds', () => {
    expect(decodeSeed('')).toBeNull();
    expect(decodeSeed('FR1-')).toBeNull();
    expect(decodeSeed('not a seed at all')).toBeNull();
    expect(decodeSeed(null)).toBeNull();
    expect(decodeSeed(42)).toBeNull();
    // Well-formed base64 of the wrong length / version.
    expect(decodeSeed('FR1-AAAA')).toBeNull();
  });

  it('produces a short, recognizable string', () => {
    const seed = encodeSeed(DEFAULT_OUTFIT);
    expect(seed.startsWith('FR1-')).toBe(true);
    expect(seed.length).toBeLessThanOrEqual(24);
  });
});

describe('pre-phase-0 save compatibility', () => {
  it('an old save without character data loads with default character', () => {
    const old = sanitizeOutfit({ hat: 'catears', pose: 'wave', topStyle: 'hoodie' });
    expect(old.hat).toBe('catears');
    expect(old.pose).toBe('wave');
    expect(old.topStyle).toBe('hoodie');
    expect(old.character).toEqual(DEFAULT_CHARACTER);
  });

  it('an old save in storage restores outfit fields and default character', () => {
    const storage = new FakeStorage();
    storage.setItem(
      'fitting-room.outfit.v1',
      JSON.stringify({ topStyle: 'dress', topColor: '#7cc7ff', hat: 'beanie' }),
    );
    const loaded = loadOutfit(storage);
    expect(loaded.topStyle).toBe('dress');
    expect(loaded.topColor).toBe('#7cc7ff');
    expect(loaded.hat).toBe('beanie');
    expect(loaded.character).toEqual(DEFAULT_CHARACTER);
  });
});
