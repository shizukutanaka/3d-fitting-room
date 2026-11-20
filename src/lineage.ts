// The lineage: an on-device-only edit history of how each
// person came to be — created, restored from a seed or card,
// blended from two people, renamed (docs/PERSPECTIVES-2.md
// viewpoint R2-2: mutation without an identity anchor is noise;
// the anchor is the name, and the lineage that stays home).
//
// Legal basis, stated precisely because this reverses an
// earlier design decision: LEGAL-ETHICS.md judgment J-06
// permits a family-tree-like presentation *limited to the edit
// history display of fictional people*. The earlier "record
// parentage nowhere" rule (docs/DESIGN.md §16.2) read that as
// a ban on recording at all — an over-reading, corrected in
// DESIGN.md §18. What J-06 does fence off is circulation: the
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
// blended person came from.

import { sanitizeName } from './outfit';
import { decodeSeed } from './seed';

export const LINEAGE_STORAGE_KEY = 'fitting-room.lineage.v1';

/** Oldest events fall off past this cap; a device history is a
 *  working memory, not an archive. */
export const MAX_LINEAGE_EVENTS = 200;

export type LineageKind = 'create' | 'restore' | 'blend' | 'rename';

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
  /** The person's name at the time of the event (display
   *  convenience for the history list; the seed is canonical). */
  name?: string;
}

const KINDS: readonly LineageKind[] = ['create', 'restore', 'blend', 'rename'];

/** Validate unknown data into a list of lineage events.
 *  Events whose seed (or, for blends, either parent seed) no
 *  longer decodes are dropped: a history entry that cannot be
 *  traced back to its person is not history. The list is kept
 *  in recording order and capped at the newest
 *  MAX_LINEAGE_EVENTS. */
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
    const name = sanitizeName(e.name);
    if (name) event.name = name;
    events.push(event);
  }
  return events.slice(-MAX_LINEAGE_EVENTS);
}

export function loadLineage(storage: Storage = localStorage): LineageEvent[] {
  try {
    const raw = storage.getItem(LINEAGE_STORAGE_KEY);
    return raw ? sanitizeLineage(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
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
