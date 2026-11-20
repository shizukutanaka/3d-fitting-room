import { describe, expect, it } from 'vitest';
import {
  CHARACTER_PARAM_SPECS,
  DEFAULT_CHARACTER,
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
  YOUTH_SCORE_MAX,
  fitzpatrickLabel,
  sanitizeCharacter,
  skinColorForTone,
  youthScore,
} from '../src/character';
import {
  BOTTOM_COLORS,
  DEFAULT_OUTFIT,
  SHOE_COLORS,
  loadOutfit,
  sanitizeOutfit,
  type Outfit,
} from '../src/outfit';
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
      ...DEFAULT_CHARACTER,
      skinTone: 0.85,
      height: 1.6,
      hairStyle: 'ponytail',
      hairColor: HAIR_COLORS[6],
      eyeColor: EYE_COLORS[4],
    });
    expect(HAIR_STYLES).toContain(c.hairStyle);
  });

  it('sanitizeCharacter clamps the phase-2 face parameters to their specs', () => {
    const c = sanitizeCharacter({
      eyeSize: 9,
      eyeSpacing: 0,
      eyeHeight: 1,
      eyeShape: 2,
      eyeTilt: -9,
      browHeight: 1,
      browTilt: 9,
      noseWidth: 0,
      noseProminence: 9,
      lipWidth: 0,
      lipFullness: 9,
      faceWidth: 0,
      asymmetry: -2,
    });
    expect(c.eyeSize).toBe(1.25);
    expect(c.eyeSpacing).toBe(0.85);
    expect(c.eyeHeight).toBe(0.01);
    expect(c.eyeShape).toBe(0.95);
    expect(c.eyeTilt).toBe(-0.2);
    expect(c.browHeight).toBe(0.008);
    expect(c.browTilt).toBe(0.25);
    expect(c.noseWidth).toBe(0.75);
    expect(c.noseProminence).toBe(1.4);
    expect(c.lipWidth).toBe(0.75);
    expect(c.lipFullness).toBe(1.6);
    expect(c.faceWidth).toBe(0.9);
    expect(c.asymmetry).toBe(0);
    // and a missing face (pre-phase-2 data) fills with defaults
    expect(sanitizeCharacter({ skinTone: 0.5 }).eyeSize).toBe(DEFAULT_CHARACTER.eyeSize);
    expect(sanitizeCharacter({ skinTone: 0.5 }).asymmetry).toBe(DEFAULT_CHARACTER.asymmetry);
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

describe('seed encoding (phase 0, format v4 since body parameters)', () => {
  const custom: Outfit = {
    topStyle: 'dress',
    topColor: '#3a4152',
    bottomStyle: 'skirt',
    bottomColor: BOTTOM_COLORS[3],
    shoeStyle: 'boots',
    shoeColor: SHOE_COLORS[1],
    hat: 'ribbon',
    glasses: 'round',
    accessory: 'bag',
    pose: 'cheer',
    character: {
      ...DEFAULT_CHARACTER,
      skinTone: 0.8,
      hairColor: HAIR_COLORS[6],
      eyeColor: EYE_COLORS[4],
      hairStyle: 'ponytail',
      height: 1.6,
      eyeSize: 1.2,
      eyeSpacing: 0.9,
      eyeHeight: -0.004,
      eyeShape: 0.6,
      eyeTilt: 0.15,
      browHeight: 0.005,
      browTilt: -0.1,
      noseWidth: 1.25,
      noseProminence: 1.3,
      lipWidth: 1.2,
      lipFullness: 1.4,
      faceWidth: 1.06,
      asymmetry: 0.9,
    },
  };

  it('round-trips a full state (continuous values within quantization)', () => {
    const back = decodeSeed(encodeSeed(custom));
    expect(back).not.toBeNull();
    expect(back!.topStyle).toBe('dress');
    expect(back!.topColor).toBe('#3a4152');
    expect(back!.bottomStyle).toBe('skirt');
    expect(back!.bottomColor).toBe(BOTTOM_COLORS[3]);
    expect(back!.shoeStyle).toBe('boots');
    expect(back!.shoeColor).toBe(SHOE_COLORS[1]);
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

  it('round-trips the face parameters within quantization (1/255 of range)', () => {
    const back = decodeSeed(encodeSeed(custom));
    expect(back).not.toBeNull();
    const want = custom.character;
    const got = back!.character;
    const tol = (min: number, max: number) => (max - min) / 255 + 1e-9;
    expect(Math.abs(got.eyeSize - want.eyeSize)).toBeLessThanOrEqual(tol(0.8, 1.25));
    expect(Math.abs(got.eyeSpacing - want.eyeSpacing)).toBeLessThanOrEqual(tol(0.85, 1.18));
    expect(Math.abs(got.eyeHeight - want.eyeHeight)).toBeLessThanOrEqual(tol(-0.01, 0.01));
    expect(Math.abs(got.eyeShape - want.eyeShape)).toBeLessThanOrEqual(tol(0.55, 0.95));
    expect(Math.abs(got.eyeTilt - want.eyeTilt)).toBeLessThanOrEqual(tol(-0.2, 0.2));
    expect(Math.abs(got.browHeight - want.browHeight)).toBeLessThanOrEqual(tol(-0.008, 0.008));
    expect(Math.abs(got.browTilt - want.browTilt)).toBeLessThanOrEqual(tol(-0.25, 0.25));
    expect(Math.abs(got.noseWidth - want.noseWidth)).toBeLessThanOrEqual(tol(0.75, 1.35));
    expect(Math.abs(got.noseProminence - want.noseProminence)).toBeLessThanOrEqual(tol(0.7, 1.4));
    expect(Math.abs(got.lipWidth - want.lipWidth)).toBeLessThanOrEqual(tol(0.75, 1.3));
    expect(Math.abs(got.lipFullness - want.lipFullness)).toBeLessThanOrEqual(tol(0.6, 1.6));
    expect(Math.abs(got.faceWidth - want.faceWidth)).toBeLessThanOrEqual(tol(0.9, 1.1));
    expect(Math.abs(got.asymmetry - want.asymmetry)).toBeLessThanOrEqual(tol(0, 1));
    // and the encoded form is exact: re-encoding the decoded state
    // reproduces the identical seed string
    expect(encodeSeed(back!)).toBe(encodeSeed(custom));
  });

  it('still decodes v1 seeds (pre-face format) with the default face', () => {
    // Hand-built v1 payload: [version, skin, heightCm, hairColor,
    // eyeColor, hairStyle, topStyle, topColor, hat, glasses,
    // accessory, pose] as indices/quantized values.
    const bytes = [1, 204, 26, 6, 4, 2, 1, 2, 1, 1, 1, 1];
    const v1 = `FR1-${Buffer.from(bytes).toString('base64url')}`;
    const back = decodeSeed(v1);
    expect(back).not.toBeNull();
    expect(back!.topStyle).toBe('hoodie');
    expect(back!.topColor).toBe('#7cc7ff');
    expect(back!.hat).toBe('cap');
    expect(back!.glasses).toBe('round');
    expect(back!.accessory).toBe('necklace');
    expect(back!.pose).toBe('wave');
    expect(back!.character.height).toBe(1.71);
    expect(back!.character.hairColor).toBe(HAIR_COLORS[6]);
    expect(back!.character.eyeColor).toBe(EYE_COLORS[4]);
    expect(back!.character.hairStyle).toBe('short');
    // the face did not exist in v1: it loads with spec defaults
    expect(back!.character.eyeSize).toBe(DEFAULT_CHARACTER.eyeSize);
    expect(back!.character.faceWidth).toBe(DEFAULT_CHARACTER.faceWidth);
    expect(back!.character.asymmetry).toBe(DEFAULT_CHARACTER.asymmetry);
    // bottoms and shoes did not exist either: default look
    expect(back!.bottomStyle).toBe(DEFAULT_OUTFIT.bottomStyle);
    expect(back!.shoeStyle).toBe(DEFAULT_OUTFIT.shoeStyle);
    expect(back!.shoeColor).toBe(DEFAULT_OUTFIT.shoeColor);
  });

  it('still decodes v2 seeds (pre-bottoms format) with default bottoms and shoes', () => {
    // Hand-built v2 payload: character block, 13 face bytes, then
    // the outfit block at the v2 indices (19..24).
    const bytes = [2, 204, 26, 6, 4, 2, ...new Array(13).fill(128), 1, 2, 1, 1, 1, 1];
    const v2 = `FR2-${Buffer.from(bytes).toString('base64url')}`;
    const back = decodeSeed(v2);
    expect(back).not.toBeNull();
    expect(back!.topStyle).toBe('hoodie');
    expect(back!.character.height).toBe(1.71);
    expect(back!.bottomStyle).toBe(DEFAULT_OUTFIT.bottomStyle);
    expect(back!.bottomColor).toBe(DEFAULT_OUTFIT.bottomColor);
    expect(back!.shoeStyle).toBe(DEFAULT_OUTFIT.shoeStyle);
    expect(back!.shoeColor).toBe(DEFAULT_OUTFIT.shoeColor);
  });

  it('round-trips the default state and the range extremes', () => {
    for (const state of [
      DEFAULT_OUTFIT,
      {
        ...DEFAULT_OUTFIT,
        character: {
          ...DEFAULT_CHARACTER,
          skinTone: 0,
          hairColor: HAIR_COLORS[0],
          eyeColor: EYE_COLORS[0],
          hairStyle: HAIR_STYLES[0],
          height: HEIGHT_MIN,
          eyeSize: 0.8,
          eyeSpacing: 0.85,
          eyeHeight: -0.01,
          eyeShape: 0.55,
          eyeTilt: -0.2,
          browHeight: -0.008,
          browTilt: -0.25,
          noseWidth: 0.75,
          noseProminence: 0.7,
          lipWidth: 0.75,
          lipFullness: 0.6,
          faceWidth: 0.9,
          asymmetry: 0,
        },
      },
      {
        ...DEFAULT_OUTFIT,
        character: {
          ...DEFAULT_CHARACTER,
          skinTone: 1,
          hairColor: HAIR_COLORS[HAIR_COLORS.length - 1],
          eyeColor: EYE_COLORS[EYE_COLORS.length - 1],
          hairStyle: HAIR_STYLES[HAIR_STYLES.length - 1],
          height: HEIGHT_MAX,
          eyeSize: 1.25,
          eyeSpacing: 1.18,
          eyeHeight: 0.01,
          eyeShape: 0.95,
          eyeTilt: 0.2,
          browHeight: 0.008,
          browTilt: 0.25,
          noseWidth: 1.35,
          noseProminence: 1.4,
          lipWidth: 1.3,
          lipFullness: 1.6,
          faceWidth: 1.1,
          asymmetry: 1,
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
    expect(decodeSeed('FR2-')).toBeNull();
    expect(decodeSeed('not a seed at all')).toBeNull();
    expect(decodeSeed(null)).toBeNull();
    expect(decodeSeed(42)).toBeNull();
    // Well-formed base64 of the wrong length / version.
    expect(decodeSeed('FR1-AAAA')).toBeNull();
    expect(decodeSeed('FR2-AAAA')).toBeNull();
    expect(decodeSeed('FR3-AAAA')).toBeNull();
    // A v2-length payload carrying an unknown version byte.
    const v9 = `FR2-${Buffer.from([9, ...new Array(24).fill(0)]).toString('base64url')}`;
    expect(decodeSeed(v9)).toBeNull();
    // A v3-length payload carrying the v2 version byte (the
    // version byte and the length must agree).
    const mismatched = `FR3-${Buffer.from([2, ...new Array(28).fill(0)]).toString('base64url')}`;
    expect(decodeSeed(mismatched)).toBeNull();
    expect(decodeSeed('FR4-AAAA')).toBeNull();
    // A v4-length payload carrying the v3 version byte.
    const mismatched4 = `FR4-${Buffer.from([3, ...new Array(33).fill(0)]).toString('base64url')}`;
    expect(decodeSeed(mismatched4)).toBeNull();
  });

  it('produces a short, recognizable string', () => {
    const seed = encodeSeed(DEFAULT_OUTFIT);
    expect(seed.startsWith('FR4-')).toBe(true);
    // 34 payload bytes -> 46 base64url chars + the 4-char prefix.
    // The bound grows with each format version's payload; what
    // matters is that a seed stays short enough to print on a
    // share card and type by hand.
    expect(seed.length).toBeLessThanOrEqual(52);
  });

  it('round-trips the body parameters within quantization (1/255 of range)', () => {
    const state: Outfit = {
      ...DEFAULT_OUTFIT,
      character: {
        ...DEFAULT_CHARACTER,
        height: 1.68,
        shoulderWidth: 1.1,
        waist: 0.9,
        hip: 1.12,
        bust: 1.18,
        build: 0.95,
      },
    };
    const back = decodeSeed(encodeSeed(state));
    expect(back).not.toBeNull();
    const got = back!.character;
    const tol = (min: number, max: number) => (max - min) / 255 + 1e-9;
    expect(Math.abs(got.shoulderWidth - 1.1)).toBeLessThanOrEqual(tol(0.88, 1.14));
    expect(Math.abs(got.waist - 0.9)).toBeLessThanOrEqual(tol(0.82, 1.22));
    expect(Math.abs(got.hip - 1.12)).toBeLessThanOrEqual(tol(0.86, 1.2));
    expect(Math.abs(got.bust - 1.18)).toBeLessThanOrEqual(tol(0.8, 1.3));
    expect(Math.abs(got.build - 0.95)).toBeLessThanOrEqual(tol(0.85, 1.2));
    expect(encodeSeed(back!)).toBe(encodeSeed(state));
  });

  it('still decodes v3 seeds (pre-body format) with the default body', () => {
    // Hand-built v3 payload: the v2 layout plus the bottoms/shoes
    // block at indices 25..28.
    const bytes = [
      3, 204, 26, 6, 4, 2, ...new Array(13).fill(128), 1, 2, 1, 1, 1, 1, 2, 3, 2, 4,
    ];
    expect(bytes.length).toBe(29);
    const v3 = `FR3-${Buffer.from(bytes).toString('base64url')}`;
    const back = decodeSeed(v3);
    expect(back).not.toBeNull();
    expect(back!.character.height).toBe(1.71);
    expect(back!.bottomStyle).toBe('pants');
    expect(back!.shoeStyle).toBe('pumps');
    // the body did not exist in v3: it loads with spec defaults
    expect(back!.character.shoulderWidth).toBe(DEFAULT_CHARACTER.shoulderWidth);
    expect(back!.character.waist).toBe(DEFAULT_CHARACTER.waist);
    expect(back!.character.hip).toBe(DEFAULT_CHARACTER.hip);
    expect(back!.character.bust).toBe(DEFAULT_CHARACTER.bust);
    expect(back!.character.build).toBe(DEFAULT_CHARACTER.build);
  });
});

describe('adult safety restriction (CUS-0779, LEGAL-ETHICS J-02)', () => {
  // Every youthward signal at its extreme at once: the shortest
  // height, an undeveloped bust, a waist wider than the hips (a
  // straight, undifferentiated line), the slightest build and the
  // narrowest shoulders. No single one of these is a problem —
  // the combination is what must never be generatable.
  const CHILDLIKE = {
    height: 1.45,
    bust: 0.8,
    waist: 1.22,
    hip: 0.86,
    build: 0.85,
    shoulderWidth: 0.88,
  };

  it('scores the raw combination as fully youthward', () => {
    expect(youthScore({ ...DEFAULT_CHARACTER, ...CHILDLIKE })).toBeCloseTo(1, 9);
    expect(youthScore(DEFAULT_CHARACTER)).toBe(0);
  });

  it('leaves the default character untouched', () => {
    expect(sanitizeCharacter({ ...DEFAULT_CHARACTER })).toEqual(DEFAULT_CHARACTER);
  });

  it('corrects the full minor-like combination back to the adult side', () => {
    const out = sanitizeCharacter({ ...DEFAULT_CHARACTER, ...CHILDLIKE });
    expect(youthScore(out)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    // The correction moves the secondary traits, visibly.
    expect(out.bust).toBeGreaterThan(CHILDLIKE.bust);
    expect(out.hip).toBeGreaterThan(CHILDLIKE.hip);
    // Height is a legitimate adult trait: never corrected.
    expect(out.height).toBe(CHILDLIKE.height);
  });

  it('corrects a milder minor-like combination too', () => {
    const mild = {
      height: 1.5,
      bust: 0.85,
      waist: 1.15,
      hip: 0.9,
      build: 0.88,
      shoulderWidth: 0.9,
    };
    expect(youthScore({ ...DEFAULT_CHARACTER, ...mild })).toBeGreaterThan(YOUTH_SCORE_MAX);
    const out = sanitizeCharacter({ ...DEFAULT_CHARACTER, ...mild });
    expect(youthScore(out)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
  });

  it('leaves single youthward traits alone (short / flat / straight adults exist)', () => {
    const shortOnly = { ...DEFAULT_CHARACTER, height: HEIGHT_MIN };
    expect(sanitizeCharacter(shortOnly)).toEqual(shortOnly);
    const flatTall = { ...DEFAULT_CHARACTER, bust: 0.8, height: 1.9 };
    expect(sanitizeCharacter(flatTall)).toEqual(flatTall);
    const straightTall = { ...DEFAULT_CHARACTER, waist: 1.22, hip: 0.86, height: 1.85, bust: 1.1 };
    expect(sanitizeCharacter(straightTall)).toEqual(straightTall);
  });

  it('is idempotent: a corrected character passes through unchanged', () => {
    const once = sanitizeCharacter({ ...DEFAULT_CHARACTER, ...CHILDLIKE });
    expect(sanitizeCharacter(once)).toEqual(once);
  });

  it('clamps body parameters to their specs', () => {
    const out = sanitizeCharacter({
      ...DEFAULT_CHARACTER,
      shoulderWidth: 9,
      waist: 0,
      hip: 9,
      bust: 0,
      build: 9,
    });
    expect(out.shoulderWidth).toBe(1.14);
    expect(out.waist).toBe(0.82);
    expect(out.hip).toBe(1.2);
    expect(out.bust).toBe(0.8);
    expect(out.build).toBe(1.2);
  });

  it('applies on the save path (sanitizeOutfit)', () => {
    const out = sanitizeOutfit({ character: { ...DEFAULT_CHARACTER, ...CHILDLIKE } });
    expect(youthScore(out.character)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    expect(out.character.bust).toBeGreaterThan(CHILDLIKE.bust);
  });

  it('applies on the seed path: a crafted v4 payload decodes corrected, never raw', () => {
    // Hand-built v4 payload carrying the childlike combination in
    // its body block (indices 29..33, quantized per the specs:
    // shoulder 0 -> 0.88, waist 255 -> 1.22, hip 0 -> 0.86,
    // bust 0 -> 0.80, build 0 -> 0.85) at height byte 0 -> 1.45 m.
    const bytes = [
      4, 71, 0, 2, 0, 0, ...new Array(13).fill(128), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0,
    ];
    expect(bytes.length).toBe(34);
    const crafted = `FR4-${Buffer.from(bytes).toString('base64url')}`;
    const back = decodeSeed(crafted);
    expect(back).not.toBeNull();
    expect(back!.character.height).toBe(1.45);
    expect(youthScore(back!.character)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    expect(back!.character.bust).toBeGreaterThan(0.8);
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
