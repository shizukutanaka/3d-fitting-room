// Where a variation came from — recorded on this device only.
//
// docs/PERSPECTIVES-2.md viewpoint R2-2: a variation without an
// identity anchor degrades into noise. The anchor is the name
// (the identity foundation) and the lineage that stays home:
// the source of an adopted variation is written here, into the
// device's local history, and *nowhere else* — never into the
// varied person's seed, share card or exported file. A seed is
// the whole person and nothing but the person; if parentage
// travelled with it, the lineage would exceed what
// LEGAL-ETHICS.md judgment J-06 allows (a family-tree-like
// presentation limited to the edit-history display) and would
// invite origin disputes (PERSPECTIVES-2.md K2-2).
//
// INTEGRATION NOTE (this branch predates the identity
// foundation landing in main): this module is the thin
// stand-in for the lineage module (src/lineage.ts) that the
// identity branch adds. Its event shape deliberately mirrors
// that module's LineageEvent — { at, kind, seed } plus the
// origin seed, the same role `parents` plays for blend events.
// When the two branches meet, integration is:
//   1. add 'mutate' to lineage.ts's LineageKind and an optional
//      `source` seed field (validated like `parents`: it must
//      decode, and is only ever set for 'mutate' events),
//   2. convert any events stored under MUTATION_HISTORY_KEY
//      into lineage events once, then retire this module,
//   3. point main.ts's recordMutation call at recordLineage.
// Until then the history lives under its own storage key and
// nothing else in the app reads it.

import { decodeSeed } from './seed';
import { isMutationStrength, type MutationStrength } from './mutation';

export const MUTATION_HISTORY_KEY = 'fitting-room.mutation-history.v1';

/** Oldest events fall off past this cap — the same working-
 *  memory size the lineage module uses. */
export const MAX_MUTATION_HISTORY = 200;

export interface MutationHistoryEvent {
  /** Epoch milliseconds, on-device clock. */
  at: number;
  kind: 'mutate';
  /** The seed of the adopted person, as they stood right after
   *  adoption. Restoring it rebuilds that person exactly. */
  seed: string;
  /** The seed of the person they were varied from. On-device
   *  only: never copied into any artifact (see header). */
  source: string;
  /** The strength the variation was rolled at. */
  strength: MutationStrength;
}

/** Validate unknown data into a list of mutation history
 *  events. Events whose result or source seed no longer
 *  decodes are dropped: a history entry that cannot be traced
 *  back to its people is not history. Kept in recording order,
 *  capped at the newest MAX_MUTATION_HISTORY. */
export function sanitizeMutationHistory(raw: unknown): MutationHistoryEvent[] {
  if (!Array.isArray(raw)) return [];
  const events: MutationHistoryEvent[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const e = item as Record<string, unknown>;
    if (typeof e.at !== 'number' || !Number.isFinite(e.at)) continue;
    if (e.kind !== 'mutate') continue;
    if (typeof e.seed !== 'string' || !decodeSeed(e.seed)) continue;
    if (typeof e.source !== 'string' || !decodeSeed(e.source)) continue;
    if (!isMutationStrength(e.strength)) continue;
    events.push({
      at: e.at,
      kind: 'mutate',
      seed: e.seed,
      source: e.source,
      strength: e.strength,
    });
  }
  return events.slice(-MAX_MUTATION_HISTORY);
}

export function loadMutationHistory(
  storage: Storage = localStorage,
): MutationHistoryEvent[] {
  try {
    const raw = storage.getItem(MUTATION_HISTORY_KEY);
    return raw ? sanitizeMutationHistory(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/** Record one adopted variation and persist. Returns the new
 *  list so a caller can keep a view in sync without re-reading. */
export function recordMutation(
  sourceSeed: string,
  resultSeed: string,
  strength: MutationStrength,
  storage: Storage = localStorage,
): MutationHistoryEvent[] {
  const events = [
    ...loadMutationHistory(storage),
    {
      at: Date.now(),
      kind: 'mutate' as const,
      seed: resultSeed,
      source: sourceSeed,
      strength,
    },
  ].slice(-MAX_MUTATION_HISTORY);
  try {
    storage.setItem(MUTATION_HISTORY_KEY, JSON.stringify(events));
  } catch {
    // Storage full/blocked: the app still works; the history
    // just won't persist. Never surface as a crash.
  }
  return events;
}
