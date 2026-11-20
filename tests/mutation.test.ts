import { describe, expect, it } from 'vitest';
import {
  MUTATION_STRENGTHS,
  deriveMutationSeed,
  isMutationStrength,
  mutateCharacter,
  mutationCandidates,
  type MutationStrength,
} from '../src/mutation';
import {
  LEGACY_MUTATION_HISTORY_KEY,
  LINEAGE_STORAGE_KEY,
  loadLineage,
  recordLineage,
  sanitizeLineage,
} from '../src/lineage';
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

// One-parent variation is a pure function of (source,
// mutationSeed, strength): a fictional person in, a nearby new
// fictional person out. These tests pin the properties the
// product relies on — determinism (a variation is reproducible
// and seedable like any other person), neighbourhood (the
// strength orders the distance: subtle stays close, bold
// wanders far, and the roll is bounded), option-list integrity
// (discrete traits switch whole or not at all, never to an
// off-list value), and the adult safety restriction holding
// through the sanitize choke point (LEGAL-ETHICS.md J-02),
// including against sources assembled to lean youthward.

const SOURCE: CharacterParams = sanitizeCharacter({
  skinTone: 0.45,
  height: 1.68,
  hairColor: '#7a4a26',
  eyeColor: '#46684a',
  hairStyle: 'ponytail',
  eyeSize: 1.1,
  noseWidth: 1.1,
  faceWidth: 1.02,
  build: 1.05,
});

const RANGE_KEYS = (
  Object.entries(CHARACTER_PARAM_SPECS) as Array<
    [keyof CharacterParams, (typeof CHARACTER_PARAM_SPECS)[keyof CharacterParams]]
  >
)
  .filter(([, spec]) => spec.kind === 'range')
  .map(([key]) => key);

const DISCRETE_KEYS = (
  Object.entries(CHARACTER_PARAM_SPECS) as Array<
    [keyof CharacterParams, (typeof CHARACTER_PARAM_SPECS)[keyof CharacterParams]]
  >
)
  .filter(([, spec]) => spec.kind !== 'range')
  .map(([key]) => key);

/** Mean per-parameter distance in normalized (0..1 of range)
 *  units, over the range parameters only. */
function rangeDistance(a: CharacterParams, b: CharacterParams): number {
  let sum = 0;
  for (const key of RANGE_KEYS) {
    const spec = CHARACTER_PARAM_SPECS[key];
    if (spec.kind !== 'range') continue;
    sum += Math.abs(((a[key] as number) - (b[key] as number)) / (spec.max - spec.min));
  }
  return sum / RANGE_KEYS.length;
}

function meanDistance(strength: MutationStrength, seeds: number): number {
  let sum = 0;
  for ( let s = 0; s < seeds; s++) sum += rangeDistance(SOURCE, mutateCharacter(SOURCE, s, strength));
  return sum / seeds;
}

describe('mutateCharacter', () => {
  it('is deterministic: the same (source, seed, strength) always gives the same person', () => {
    for (const strength of MUTATION_STRENGTHS) {
      expect(mutateCharacter(SOURCE, 42, strength)).toEqual(mutateCharacter(SOURCE, 42, strength));
    }
    // …and the seed actually matters.
    const variants = new Set(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) =>
        JSON.stringify(mutateCharacter(SOURCE, s, 'standard')),
      ),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it('strength orders the distance: subtle < standard < bold', () => {
    const subtle = meanDistance('subtle', 60);
    const standard = meanDistance('standard', 60);
    const bold = meanDistance('bold', 60);
    expect(subtle).toBeLessThan(standard);
    expect(standard).toBeLessThan(bold);
    // The gap is material, not a rounding artefact: bold moves
    // on average at least half again as far as standard.
    expect(bold).toBeGreaterThan(standard * 1.4);
    expect(standard).toBeGreaterThan(subtle * 1.4);
  });

  it('the roll is bounded by the strength radius (subtle and standard)', () => {
    // From the default person the safety correction cannot
    // engage at these strengths (the reachable youth score
    // stays well under the cap), so what is measured here is
    // the perturbation itself: no range parameter may move
    // farther than the strength's radius, in normalized units.
    const radius: Record<string, number> = { subtle: 0.05, standard: 0.14 };
    for (const strength of ['subtle', 'standard'] as const) {
      for (let s = 0; s < 60; s++) {
        const m = mutateCharacter(DEFAULT_CHARACTER, s, strength);
        for (const key of RANGE_KEYS) {
          const spec = CHARACTER_PARAM_SPECS[key];
          if (spec.kind !== 'range') continue;
          const moved =
            Math.abs(((m[key] as number) - (DEFAULT_CHARACTER[key] as number)) / (spec.max - spec.min));
          expect(moved).toBeLessThanOrEqual(radius[strength] + 1e-9);
        }
      }
    }
  });

  it('discrete traits only ever take values from their option lists', () => {
    for (const strength of MUTATION_STRENGTHS) {
      for (let s = 0; s < 120; s++) {
        const m = mutateCharacter(SOURCE, s, strength);
        for (const key of DISCRETE_KEYS) {
          const spec = CHARACTER_PARAM_SPECS[key];
          if (spec.kind === 'range') continue;
          expect(spec.options).toContain(m[key] as string);
        }
      }
    }
  });

  it('discrete traits switch more readily the bolder the strength', () => {
    const switches = (strength: MutationStrength): number => {
      let n = 0;
      for (let s = 0; s < 120; s++) {
        const m = mutateCharacter(SOURCE, s, strength);
        if (DISCRETE_KEYS.some((key) => m[key] !== SOURCE[key])) n++;
      }
      return n;
    };
    expect(switches('bold')).toBeGreaterThan(switches('standard'));
    expect(switches('standard')).toBeGreaterThan(switches('subtle'));
    // Even subtle varies *something* over a shelf of rolls.
    expect(switches('subtle')).toBeGreaterThan(0);
  });

  it('always lands inside the spec ranges', () => {
    for (const strength of MUTATION_STRENGTHS) {
      for (let s = 0; s < 60; s++) {
        const m = mutateCharacter(SOURCE, s, strength);
        for (const key of RANGE_KEYS) {
          const spec = CHARACTER_PARAM_SPECS[key];
          if (spec.kind !== 'range') continue;
          expect(m[key] as number).toBeGreaterThanOrEqual(spec.min);
          expect(m[key] as number).toBeLessThanOrEqual(spec.max);
        }
      }
    }
  });

  it('the adult safety restriction (CUS-0779) fences variations via sanitize', () => {
    // The full youthward combination as an (unsanitized)
    // source: no mutation seed at any strength may return a
    // minor-like person — the choke point is inside the
    // mutation, not the caller's responsibility.
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
    for (const strength of MUTATION_STRENGTHS) {
      for (let s = 0; s < 120; s++) {
        expect(youthScore(mutateCharacter(combo, s, strength))).toBeLessThanOrEqual(
          YOUTH_SCORE_MAX + 1e-9,
        );
      }
    }
  });

  it('no variation of youthward-leaning sources ever produces a minor-like person', () => {
    // Each source alone is legal (sanitized); bold variation
    // perturbs every trait at once, which is exactly how the
    // youthward combination could be re-assembled by chance.
    const shortPerson = sanitizeCharacter({ height: 1.45 });
    const slightPerson = sanitizeCharacter({
      height: 1.95,
      bust: 0.8,
      waist: 1.22,
      hip: 0.86,
      build: 0.85,
      shoulderWidth: 0.88,
    });
    for (const source of [shortPerson, slightPerson]) {
      for (let s = 0; s < 200; s++) {
        expect(youthScore(mutateCharacter(source, s, 'bold'))).toBeLessThanOrEqual(
          YOUTH_SCORE_MAX + 1e-9,
        );
      }
    }
  });

  it('a variation is an ordinary person: seed round-trip is stable', () => {
    // Seeds quantize continuous values, so the pinned property
    // is the one the product relies on (as in genetics): the
    // decoded person re-encodes to the identical seed, and the
    // discrete traits survive exactly.
    const varied = mutateCharacter(SOURCE, 7, 'bold');
    const seed = encodeSeed({ ...DEFAULT_OUTFIT, character: varied });
    const back = decodeSeed(seed);
    expect(back).not.toBeNull();
    expect(encodeSeed(back!)).toBe(seed);
    expect(back!.character.hairColor).toBe(varied.hairColor);
    expect(back!.character.hairStyle).toBe(varied.hairStyle);
    expect(back!.character.eyeColor).toBe(varied.eyeColor);
  });
});

describe('mutationCandidates', () => {
  it('rolls a deterministic shelf of distinct neighbours', () => {
    const first = mutationCandidates(SOURCE, 1234, 'standard');
    const second = mutationCandidates(SOURCE, 1234, 'standard');
    expect(second).toEqual(first);
    expect(first).toHaveLength(4);
    const distinct = new Set(first.map((c) => JSON.stringify(c)));
    expect(distinct.size).toBe(4);
    // Every candidate is a neighbour of the source, not a copy
    // and not a stranger.
    for (const c of first) {
      expect(JSON.stringify(c)).not.toBe(JSON.stringify(SOURCE));
      expect(rangeDistance(SOURCE, c)).toBeLessThan(0.2);
    }
    // A different base seed rolls a different shelf.
    expect(mutationCandidates(SOURCE, 4321, 'standard')).not.toEqual(first);
  });
});

describe('deriveMutationSeed / isMutationStrength', () => {
  it('derives a deterministic uint32 per seed string', () => {
    const text = encodeSeed({ ...DEFAULT_OUTFIT, character: SOURCE });
    const v = deriveMutationSeed(text);
    expect(v).toBe(deriveMutationSeed(text));
    expect(Number.isInteger(v)).toBe(true);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(0xffffffff);
    const other = encodeSeed({ ...DEFAULT_OUTFIT, character: DEFAULT_CHARACTER });
    expect(deriveMutationSeed(other)).not.toBe(v);
  });

  it('accepts exactly the three strengths', () => {
    for (const s of MUTATION_STRENGTHS) expect(isMutationStrength(s)).toBe(true);
    for (const bad of ['wild', '', 'SUBTLE', 1, null, undefined]) {
      expect(isMutationStrength(bad)).toBe(false);
    }
  });
});

describe('mutation lineage (recorded in the on-device lineage)', () => {
  function fakeStorage(): Storage {
    const map = new Map<string, string>();
    return {
      getItem: (k: string) => map.get(k) ?? null,
      setItem: (k: string, v: string) => void map.set(k, v),
      removeItem: (k: string) => void map.delete(k),
      clear: () => map.clear(),
      key: (i: number) => [...map.keys()][i] ?? null,
      get length() {
        return map.size;
      },
    } as Storage;
  }

  const seedOf = (c: CharacterParams) => encodeSeed({ ...DEFAULT_OUTFIT, character: c });

  it('records a variation in the lineage, source and strength included', () => {
    const storage = fakeStorage();
    const source = seedOf(SOURCE);
    const result = seedOf(mutateCharacter(SOURCE, 3, 'standard'));
    const events = recordLineage(
      { at: 1, kind: 'mutate', seed: result, source, strength: 'standard' },
      storage,
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      kind: 'mutate',
      seed: result,
      source,
      strength: 'standard',
    });
    expect(loadLineage(storage)).toEqual(events);
    // The record lives in the lineage, on this device only;
    // the result seed itself carries no parentage (it is an
    // ordinary seed — it decodes to the person and nothing
    // about where they came from).
    expect(storage.getItem(LINEAGE_STORAGE_KEY)).toContain(source);
    expect(decodeSeed(result)).not.toBeNull();
  });

  it('sanitizeLineage keeps traceable variations and drops the rest', () => {
    const good = {
      at: 1,
      kind: 'mutate',
      seed: seedOf(SOURCE),
      source: seedOf(DEFAULT_CHARACTER),
      strength: 'bold',
    };
    const cleaned = sanitizeLineage([
      good,
      { ...good, seed: 'FR9-bogus' },
      { ...good, source: 'not a seed' },
      { ...good, kind: 'blend' }, // a blend without parents is dropped as a blend
      'junk',
      null,
    ]);
    expect(cleaned).toEqual([good]);
    // An unreadable strength is metadata rot, not a broken
    // trace: the field is dropped, the event stays.
    const [noStrength] = sanitizeLineage([{ ...good, strength: 'wild' }]);
    expect(noStrength.kind).toBe('mutate');
    expect(noStrength.strength).toBeUndefined();
    // A source riding on a kind it does not belong to is
    // dropped as a field, the way off-kind parents are.
    const [offKind] = sanitizeLineage([
      { at: 2, kind: 'create', seed: seedOf(SOURCE), source: seedOf(DEFAULT_CHARACTER) },
    ]);
    expect(offKind.source).toBeUndefined();
    expect(sanitizeLineage('nope')).toEqual([]);
  });

  it('converts a legacy mutation history into the lineage, once', () => {
    const storage = fakeStorage();
    const source = seedOf(SOURCE);
    const result = seedOf(mutateCharacter(SOURCE, 5, 'subtle'));
    storage.setItem(
      LEGACY_MUTATION_HISTORY_KEY,
      JSON.stringify([
        { at: 10, kind: 'mutate', seed: result, source, strength: 'subtle' },
        { at: 11, kind: 'mutate', seed: 'FR9-bogus', source, strength: 'subtle' },
        { at: 12, kind: 'mutate', seed: result, source, strength: 'wild' },
      ]),
    );
    const events = loadLineage(storage);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      at: 10,
      kind: 'mutate',
      seed: result,
      source,
      strength: 'subtle',
    });
    // The old key is retired, and the conversion does not run
    // twice: a second load returns the same single event.
    expect(storage.getItem(LEGACY_MUTATION_HISTORY_KEY)).toBeNull();
    expect(loadLineage(storage)).toHaveLength(1);
  });

  it('merges converted events into an existing lineage in clock order', () => {
    const storage = fakeStorage();
    const source = seedOf(SOURCE);
    const result = seedOf(DEFAULT_CHARACTER);
    recordLineage({ at: 20, kind: 'create', seed: source }, storage);
    storage.setItem(
      LEGACY_MUTATION_HISTORY_KEY,
      JSON.stringify([{ at: 5, kind: 'mutate', seed: result, source, strength: 'bold' }]),
    );
    const events = loadLineage(storage);
    expect(events.map((e) => e.kind)).toEqual(['mutate', 'create']);
    expect(events.map((e) => e.at)).toEqual([5, 20]);
  });
});
