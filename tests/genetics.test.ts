import { describe, expect, it } from 'vitest';
import { deriveMixSeed, synthesizeCharacter } from '../src/genetics';
import {
  CHARACTER_PARAM_SPECS,
  DEFAULT_CHARACTER,
  YOUTH_SCORE_MAX,
  sanitizeCharacter,
  youthScore,
  type CharacterParams,
} from '../src/character';
import { DEFAULT_OUTFIT } from '../src/outfit';
import { decodeSeed, encodeSeed } from '../src/seed';

// The synthesis is a pure function of (A, B, mixSeed): two
// fictional people's parameter vectors in, one new fictional
// person out. These tests pin the properties the product relies
// on — determinism (a synthesized person is reproducible and
// seedable like any other), inheritance (every trait comes from
// A, from B, or from between them — never from nowhere), and the
// adult safety restriction holding for the child through the
// sanitize choke point (LEGAL-ETHICS.md J-06 / J-02).

const A: CharacterParams = sanitizeCharacter({
  skinTone: 0.1,
  height: 1.9,
  hairColor: '#d9b380',
  eyeColor: '#3d5a80',
  hairStyle: 'long',
  eyeSize: 1.2,
  noseWidth: 0.85,
  faceWidth: 0.94,
  build: 0.9,
});

const B: CharacterParams = sanitizeCharacter({
  skinTone: 0.92,
  height: 1.52,
  hairColor: '#201612',
  eyeColor: '#46684a',
  hairStyle: 'short',
  eyeSize: 0.9,
  noseWidth: 1.3,
  faceWidth: 1.08,
  build: 1.15,
});

const KEYS = Object.keys(CHARACTER_PARAM_SPECS) as Array<keyof CharacterParams>;

describe('synthesizeCharacter', () => {
  it('is deterministic: the same (A, B, mixSeed) always gives the same person', () => {
    const first = synthesizeCharacter(A, B, 1234);
    const second = synthesizeCharacter(A, B, 1234);
    expect(second).toEqual(first);
    // …and the mix seed actually matters: across a handful of
    // seeds the children are not all the same person.
    const variants = new Set(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => JSON.stringify(synthesizeCharacter(A, B, s))),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it('synthesizing a person with themselves returns that person', () => {
    for (const s of [0, 7, 42, 999]) {
      expect(synthesizeCharacter(A, A, s)).toEqual(A);
      expect(synthesizeCharacter(B, B, s)).toEqual(B);
    }
  });

  it('every trait is inherited from A, from B, or blended between them', () => {
    for (let s = 0; s < 60; s++) {
      const child = synthesizeCharacter(A, B, s);
      for (const key of KEYS) {
        const spec = CHARACTER_PARAM_SPECS[key];
        const v = child[key];
        if (spec.kind === 'range') {
          const lo = Math.min(A[key] as number, B[key] as number);
          const hi = Math.max(A[key] as number, B[key] as number);
          expect(v as number).toBeGreaterThanOrEqual(lo);
          expect(v as number).toBeLessThanOrEqual(hi);
        } else {
          expect([A[key], B[key]]).toContain(v);
        }
      }
    }
  });

  it('always lands inside the spec ranges and option lists', () => {
    for (let s = 0; s < 60; s++) {
      const child = synthesizeCharacter(A, B, s);
      for (const key of KEYS) {
        const spec = CHARACTER_PARAM_SPECS[key];
        if (spec.kind === 'range') {
          expect(child[key] as number).toBeGreaterThanOrEqual(spec.min);
          expect(child[key] as number).toBeLessThanOrEqual(spec.max);
        } else {
          expect(spec.options).toContain(child[key] as string);
        }
      }
    }
  });

  it('the adult safety restriction (CUS-0779) fences the child via sanitize', () => {
    // The full youthward combination as an (unsanitized) input:
    // synthesizing it with itself must return its corrected form,
    // never the combination itself — the choke point is inside
    // the synthesis, not the caller's responsibility.
    const combo: CharacterParams = {
      ...DEFAULT_CHARACTER,
      height: 1.45,
      bust: 0.8,
      waist: 1.22,
      hip: 0.86,
      build: 0.85,
      shoulderWidth: 0.88,
    };
    expect(youthScore(combo)).toBeGreaterThan(YOUTH_SCORE_MAX);
    const selfChild = synthesizeCharacter(combo, combo, 5);
    expect(selfChild).toEqual(sanitizeCharacter(combo));
    expect(youthScore(selfChild)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    expect(selfChild.bust).toBeGreaterThan(0.8);
    expect(selfChild.height).toBe(1.45);
  });

  it('no mix of two youthward-leaning parents ever produces a minor-like child', () => {
    // A contributes the short stature, B the rest of the
    // youthward traits; per-trait inheritance can assemble the
    // full combination even though neither parent carries it.
    // (B here is deliberately unsanitized: the guarantee must not
    // depend on the parents having passed the gate first.)
    const shortParent: CharacterParams = { ...DEFAULT_CHARACTER, height: 1.45 };
    const slightParent: CharacterParams = {
      ...DEFAULT_CHARACTER,
      height: 1.95,
      bust: 0.8,
      waist: 1.22,
      hip: 0.86,
      build: 0.85,
      shoulderWidth: 0.88,
    };
    for (let s = 0; s < 200; s++) {
      const child = synthesizeCharacter(shortParent, slightParent, s);
      expect(youthScore(child)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    }
  });

  it('a synthesized person is an ordinary person: seed round-trip is exact', () => {
    const child = synthesizeCharacter(A, B, 36);
    const seed = encodeSeed({ ...DEFAULT_OUTFIT, character: child });
    const back = decodeSeed(seed);
    expect(back).not.toBeNull();
    expect(encodeSeed(back!)).toBe(seed);
    expect(back!.character.hairColor).toBe(child.hairColor);
    expect(back!.character.hairStyle).toBe(child.hairStyle);
  });
});

describe('deriveMixSeed', () => {
  it('is deterministic per pair and differs across pairs', () => {
    const s1 = encodeSeed({ ...DEFAULT_OUTFIT, character: A });
    const s2 = encodeSeed({ ...DEFAULT_OUTFIT, character: B });
    expect(deriveMixSeed(s1, s2)).toBe(deriveMixSeed(s1, s2));
    expect(deriveMixSeed(s1, s2)).not.toBe(deriveMixSeed(s2, s1));
    expect(deriveMixSeed(s1, s2)).not.toBe(deriveMixSeed(s1, s1));
    const v = deriveMixSeed(s1, s2);
    expect(Number.isInteger(v)).toBe(true);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(0xffffffff);
  });
});
