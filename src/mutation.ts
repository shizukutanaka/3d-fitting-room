// One-parent variation ("mutation"): a new person drawn from
// the neighbourhood of one existing person. This is
// docs/PERSPECTIVES.md viewpoint 3 — proliferation's unit is
// not the copy but the variation — in the corrected form of
// docs/PERSPECTIVES-2.md: viewpoint R2-4 says the variation
// loop is real where it is a form of "making one's own person"
// (the receiver takes a received person as a template, not as a
// keepsake), and R2-2 says a variation only proliferates with
// an identity anchor — the varied person is a *new* person who
// starts unnamed, and where they came from is recorded only in
// the on-device history (mutation-history.ts), never in any
// artifact.
//
// The function is the one-parent sibling of genetics.ts: same
// spec-driven iteration over CHARACTER_PARAM_SPECS, same PRNG,
// same sanitize choke point at the end — so the adult safety
// restriction (CUS-0779, LEGAL-ETHICS.md judgment J-02) fences
// a variation exactly as it fences a synthesis: a source near
// the boundary can be perturbed toward the youthward
// combination, and the sanitizer corrects the combination, not
// the caller. Clothes are not mutated: as with synthesis, an
// outfit's clothes are choices, not traits (DESIGN.md §16).

import {
  CHARACTER_PARAM_SPECS,
  sanitizeCharacter,
  type CharacterParams,
} from './character';
import { fnv1a32, mulberry32 } from './genetics';

/** How far a variation may wander from its source. The three
 *  steps are the whole vocabulary — the UI offers exactly these
 *  and the command protocol accepts exactly these. */
export type MutationStrength = 'subtle' | 'standard' | 'bold';

export const MUTATION_STRENGTHS: readonly MutationStrength[] = [
  'subtle',
  'standard',
  'bold',
];

/** The farthest a range parameter may move, as a fraction of
 *  its full spec range. The roll is triangular (see below), so
 *  the typical move is about a third of the radius: a subtle
 *  variation is recognizably the same person with a few traits
 *  nudged; a bold one is a clearly different person who still
 *  reads as kin. */
const RANGE_RADIUS: Record<MutationStrength, number> = {
  subtle: 0.05,
  standard: 0.14,
  bold: 0.3,
};

/** Per-parameter chance that a discrete trait (palette colors,
 *  the hairstyle enum) switches to another option. Discrete
 *  traits cannot be nudged — they are whole or unchanged — so
 *  their variation is probabilistic instead of metric. */
const SWITCH_CHANCE: Record<MutationStrength, number> = {
  subtle: 0.1,
  standard: 0.25,
  bold: 0.45,
};

export function isMutationStrength(value: unknown): value is MutationStrength {
  return (
    typeof value === 'string' &&
    (MUTATION_STRENGTHS as readonly string[]).includes(value)
  );
}

/** Vary one person into a nearby new person. Deterministic:
 *  the same (source, mutationSeed, strength) always produces
 *  the same variation. The source is expected to be a valid
 *  CharacterParams (every state in the app is); the result is
 *  sanitized regardless, so ranges and the adult safety
 *  restriction hold even for hand-built inputs. */
export function mutateCharacter(
  source: CharacterParams,
  mutationSeed: number,
  strength: MutationStrength,
): CharacterParams {
  const rng = mulberry32(mutationSeed);
  const radius = RANGE_RADIUS[strength];
  const raw: Record<string, unknown> = {};
  for (const [key, spec] of Object.entries(CHARACTER_PARAM_SPECS)) {
    const name = key as keyof CharacterParams;
    if (spec.kind === 'range') {
      const span = spec.max - spec.min;
      const norm = ((source[name] as number) - spec.min) / span;
      // A triangular roll in [-1, 1]: most rolls land near the
      // source (a variation is a neighbour, not a teleport),
      // the tails reach the strength's full radius.
      const roll = rng() + rng() - 1;
      const moved = Math.min(1, Math.max(0, norm + roll * radius));
      raw[key] = spec.min + moved * span;
    } else {
      const options = spec.options;
      const current = source[name] as string;
      if (options.length > 1 && rng() < SWITCH_CHANCE[strength]) {
        // Switch to a *different* option, uniformly: a switched
        // trait never silently stays itself, and never leaves
        // the option list (an off-palette value would be
        // snapped to a default by the sanitizer — a silent
        // third value, as genetics.ts notes for inheritance).
        const others = options.filter((o) => o !== current);
        raw[key] = others[Math.floor(rng() * others.length)];
      } else {
        raw[key] = current;
      }
    }
  }
  return sanitizeCharacter(raw);
}

/** A default mutation seed derived from a person's seed string
 *  (FNV-1a), used when a caller does not specify one: the same
 *  person then always varies into the same neighbour at a given
 *  strength, while different people (almost always) differ. */
export function deriveMutationSeed(seedText: string): number {
  return fnv1a32(seedText);
}

/** The candidate set the UI offers: `count` variations of the
 *  source at one strength, drawn deterministically from a
 *  single base seed (successive PRNG outputs become the
 *  per-candidate mutation seeds). Re-rolling means a new base
 *  seed; the same base seed always shows the same shelf. */
export function mutationCandidates(
  source: CharacterParams,
  baseSeed: number,
  strength: MutationStrength,
  count = 4,
): CharacterParams[] {
  const rng = mulberry32(baseSeed);
  const out: CharacterParams[] = [];
  for (let i = 0; i < count; i++) {
    const candidateSeed = Math.floor(rng() * 0x100000000) >>> 0;
    out.push(mutateCharacter(source, candidateSeed, strength));
  }
  return out;
}
