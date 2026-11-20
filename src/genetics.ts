// Synthesis of a new person from two people's parameter vectors
// ("genetics", CHARACTER-SYSTEM.md §2.5, phase 4 in its audited
// reduced form). The two inputs are parameter sets of fictional
// people — nothing else exists in this app — and the output is a
// new fictional person, presented as an adult like every person
// here (LEGAL-ETHICS.md judgment J-06).
//
// How it works: for every parameter in CHARACTER_PARAM_SPECS, a
// deterministic PRNG seeded by the caller's mix seed picks one
// of three inheritances — take person A's value, take person
// B's value, or blend to a point between them. Discrete values
// (palette colors, the hairstyle enum) cannot be blended: an
// off-palette color would be snapped to a default by the
// sanitizer, which would be a silent third value rather than an
// inheritance, so they are always inherited whole from one side.
// The iteration is driven by the specs, so a parameter added to
// character.ts joins the synthesis with no changes here.
//
// The result passes through sanitizeCharacter — the same choke
// point saved data, seeds and LLM/agent commands pass through.
// That is what makes the adult safety restriction (CUS-0779,
// judgment J-02) apply to a synthesized person automatically:
// two adults whose traits are each legal can still *combine*
// into a minor-like figure (short stature from A, the rest of
// the youthward traits from B), and the sanitizer corrects the
// combination exactly as it does for any other input. There is
// no path around it, by construction.
//
// Clothing is not part of the synthesis: an Outfit's clothes are
// choices, not traits, and the caller keeps its current outfit
// (see DESIGN.md §16 for the reasoning). Neither is the name:
// the result is a new person and starts unnamed. Parentage is
// never attached to the person — the synthesized person is an
// ordinary CharacterParams, seedable and shareable like any
// other, and the seed, the share card and exported files carry
// no lineage data. The one place a blend's parentage exists is
// the on-device edit history (lineage.ts), recorded by the
// caller when a blend is applied: J-06 limits family-tree-like
// presentation to exactly that — the edit-history display of
// fictional people. (The earlier "recorded nowhere" rule was
// an over-reading of J-06; see DESIGN.md §18.2.)

import {
  CHARACTER_PARAM_SPECS,
  sanitizeCharacter,
  type CharacterParams,
} from './character';

/** mulberry32: a tiny integer-only PRNG. Deterministic across
 *  platforms and runs (no floating-point state), which is what
 *  makes a synthesis reproducible from (A, B, mixSeed) alone. */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A default mix seed derived from the two parent seed strings
 *  (FNV-1a over the pair), used when a caller does not specify
 *  one: the same pair of people then always synthesizes the same
 *  person, while different pairs (almost always) differ. */
export function deriveMixSeed(seedA: string, seedB: string): number {
  let h = 0x811c9dc5;
  const text = `${seedA}\n${seedB}`;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Synthesize a new person from two people's parameters.
 *  Deterministic: the same (a, b, mixSeed) always produces the
 *  same result. Both inputs are expected to be valid
 *  CharacterParams (every state in the app is); the result is
 *  sanitized regardless, so ranges and the adult safety
 *  restriction hold even for hand-built inputs. */
export function synthesizeCharacter(
  a: CharacterParams,
  b: CharacterParams,
  mixSeed: number,
): CharacterParams {
  const rng = mulberry32(mixSeed);
  const raw: Record<string, unknown> = {};
  for (const [key, spec] of Object.entries(CHARACTER_PARAM_SPECS)) {
    const name = key as keyof CharacterParams;
    if (spec.kind === 'range') {
      const roll = rng();
      if (roll < 0.4) {
        raw[key] = a[name];
      } else if (roll < 0.8) {
        raw[key] = b[name];
      } else {
        // A blend lands strictly between the two values (t in
        // [0.25, 0.75]) so it reads as a mix, not as a near-copy
        // of one side.
        const t = 0.25 + 0.5 * rng();
        raw[key] = (a[name] as number) + ((b[name] as number) - (a[name] as number)) * t;
      }
    } else {
      raw[key] = rng() < 0.5 ? a[name] : b[name];
    }
  }
  return sanitizeCharacter(raw);
}
