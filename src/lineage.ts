// The lineage: an on-device-only edit history of how each
// person came to be — created, restored from a seed or card,
// blended from two people, varied from one person, renamed
// (docs/PERSPECTIVES-2.md viewpoint R2-2: mutation without an
// identity anchor is noise; the anchor is the name, and the
// lineage that stays home).
//
// Legal basis, stated precisely because this reverses an
// earlier design decision: LEGAL-ETHICS.md judgment J-06
// permits a family-tree-like presentation *limited to the edit
// history display of fictional people*. The earlier "record
// parentage nowhere" rule (docs/DESIGN.md §16.2) read that as
// a ban on recording at all — an over-reading, corrected in
// DESIGN.md §19. What J-06 does fence off is circulation: the
// lineage is therefore never written into a seed, a share
// card, or an exported file (PERSPECTIVES-2.md K2-2 killed
// embedding it: it would exceed J-06's wording and invite
// origin disputes). Structurally, that holds because the
// artifact paths (seed.ts, share.ts, export3d.ts) take only
// the current outfit — this module is write-only from the
// app's event points and read-only for the history view, and
// nothing in the artifact path imports it. A test pins that.
//
// Events store seeds, not parameters: a seed is the whole
// person, so any event can be traced back by restoring it —
// the history is a list of people, not a log of numbers.
// Blend events additionally keep the two parent seeds, on this
// device only, so the author can see (and re-open) where a
// blended person came from. Mutation events are the one-parent
// sibling: they keep the single source seed (and the strength
// the variation was rolled at), under the same rule.
//
// One-time migration: variations were first recorded by a
// stand-in module under its own storage key
// ('fitting-room.mutation-history.v1') before this module
// existed. On first load, any events stored there are
// converted into lineage events and the old key is retired,
// so a history written by the earlier build is not lost.

import { isMutationStrength, type MutationStrength } from './mutation';
import { sanitizeName } from './outfit';
import { decodeSeed } from './seed';

export const LINEAGE_STORAGE_KEY = 'fitting-room.lineage.v1';

/** Oldest events fall off past this cap; a device history is a
 *  working memory, not an archive. */
export const MAX_LINEAGE_EVENTS = 200;

export type LineageKind = 'create' | 'restore' | 'blend' | 'mutate' | 'rename';

export interface LineageEvent {
  /** Epoch milliseconds, on-device clock. */
  at: number;
  kind: LineageKind;
  /** The seed of the person as they stood right after the
   *  event. Restoring it rebuilds that person exactly. */
  seed: string;
  /** Blend only: the two parent seeds, exactly as supplied.
   *  Never set for any other kind, and never copied into any
   *  artifact (see the module header). */
  parents?: [string, string];
  /** Mutate only: the seed of the one person this person was
   *  varied from. The `parents` role for a one-parent event —
   *  never set for any other kind, never copied into any
   *  artifact. */
  source?: string;
  /** Mutate only: the strength the variation was rolled at
   *  (the record names the roll, not the picker). */
  strength?: MutationStrength;
  /** The person's name at the time of the event (display
   *  convenience for the history list; the seed is canonical). */
  name?: string;
}

const KINDS: readonly LineageKind[] = ['create', 'restore', 'blend', 'mutate', 'rename'];

/** Validate unknown data into a list of lineage events.
 *  Events whose seed (or, for blends, either parent seed; for
 *  mutations, the source seed) no longer decodes are dropped:
 *  a history entry that cannot be traced back to its person
 *  is not history. The list is kept in recording order and
 *  capped at the newest MAX_LINEAGE_EVENTS. */
export function sanitizeLineage(raw: unknown): LineageEvent[] {
  if (!Array.isArray(raw)) return [];
  const events: LineageEvent[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const e = item as Record<string, unknown>;
    if (typeof e.at !== 'number' || !Number.isFinite(e.at)) continue;
    if (typeof e.kind !== 'string' || !(KINDS as readonly string[]).includes(e.kind)) continue;
    if (typeof e.seed !== 'string' || !decodeSeed(e.seed)) continue;
    const event: LineageEvent = { at: e.at, kind: e.kind as LineageKind, seed: e.seed };
    if (event.kind === 'blend') {
      const p = e.parents;
      if (
        !Array.isArray(p) ||
        p.length !== 2 ||
        typeof p[0] !== 'string' ||
        typeof p[1] !== 'string' ||
        !decodeSeed(p[0]) ||
        !decodeSeed(p[1])
      ) {
        continue;
      }
      event.parents = [p[0], p[1]];
    }
    if (event.kind === 'mutate') {
      // The source is the event's defining fact, like parents
      // for a blend: with no decodable source there is no
      // variation to trace, so the event is dropped. The
      // strength is metadata — an unreadable one is dropped
      // as a field, the way an unreadable name is.
      if (typeof e.source !== 'string' || !decodeSeed(e.source)) continue;
      event.source = e.source;
      if (isMutationStrength(e.strength)) event.strength = e.strength;
    }
    const name = sanitizeName(e.name);
    if (name) event.name = name;
    events.push(event);
  }
  return events.slice(-MAX_LINEAGE_EVENTS);
}

/** The storage key of the retired stand-in history module
 *  (see the module header). Read once, converted, removed. */
export const LEGACY_MUTATION_HISTORY_KEY = 'fitting-room.mutation-history.v1';

function readStoredLineage(storage: Storage): LineageEvent[] {
  try {
    const raw = storage.getItem(LINEAGE_STORAGE_KEY);
    return raw ? sanitizeLineage(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/** Validate a legacy mutation-history list into lineage
 *  events. The legacy module dropped an event whose strength
 *  was unreadable, so conversion is strict the same way: only
 *  well-formed events make the trip. */
function convertLegacyMutationHistory(raw: unknown): LineageEvent[] {
  if (!Array.isArray(raw)) return [];
  const events: LineageEvent[] = [];
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
  return events;
}

/** One-time conversion of any legacy mutation history into
 *  the lineage (module header). The old key is removed even
 *  when nothing in it still validates — the conversion is the
 *  retirement, not a copy. Converted events merge with the
 *  existing lineage in clock order. */
function migrateLegacyMutationHistory(storage: Storage): void {
  let raw: string | null;
  try {
    raw = storage.getItem(LEGACY_MUTATION_HISTORY_KEY);
  } catch {
    return;
  }
  if (raw === null) return;
  let converted: LineageEvent[] = [];
  try {
    converted = convertLegacyMutationHistory(JSON.parse(raw));
  } catch {
    converted = [];
  }
  try {
    storage.removeItem(LEGACY_MUTATION_HISTORY_KEY);
  } catch {
    // A removal that fails leaves the key for the next load;
    // nothing else here depends on it having succeeded.
  }
  if (!converted.length) return;
  const merged = [...readStoredLineage(storage), ...converted]
    .sort((a, b) => a.at - b.at)
    .slice(-MAX_LINEAGE_EVENTS);
  saveLineage(merged, storage);
}

export function loadLineage(storage: Storage = localStorage): LineageEvent[] {
  migrateLegacyMutationHistory(storage);
  return readStoredLineage(storage);
}

export function saveLineage(events: LineageEvent[], storage: Storage = localStorage): void {
  try {
    storage.setItem(LINEAGE_STORAGE_KEY, JSON.stringify(events.slice(-MAX_LINEAGE_EVENTS)));
  } catch {
    // Storage full/blocked: the app still works; the history
    // just won't persist. Never surface as a crash.
  }
}

/** Append one event and persist. Returns the new list so the
 *  caller can keep its view in sync without re-reading. */
export function recordLineage(
  event: LineageEvent,
  storage: Storage = localStorage,
): LineageEvent[] {
  const events = [...loadLineage(storage), event].slice(-MAX_LINEAGE_EVENTS);
  saveLineage(events, storage);
  return events;
}
