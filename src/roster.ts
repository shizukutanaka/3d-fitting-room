// The roster: every person kept on this device, replacing the
// single-slot save (docs/PERSPECTIVES-2.md viewpoint R2-1:
// recognition is a property of a person who *reappears*, so the
// storage itself must hold more than one person and make calling
// one back cheap). Each entry is just a seed — the product's
// canonical, self-describing recipe — so an entry can never rot
// into an unreadable format: any seed version this app has ever
// written still decodes, and the person's name rides inside it.
//
// The roster lives in localStorage on this device only, like
// everything else here. The pre-roster single save
// (fitting-room.outfit.v1) is migrated, not discarded: the first
// load turns the saved person into the roster's first entry, and
// outfit.ts keeps writing that key for the current person, so
// the autosave behavior users already have is unchanged.

import { DEFAULT_OUTFIT, loadOutfit } from './outfit';
import { decodeSeed, encodeSeed } from './seed';

export const ROSTER_STORAGE_KEY = 'fitting-room.roster.v1';

/** A device keeps at most this many people. Seeds are tiny; the
 *  cap exists so the list stays a list of people the user
 *  actually returns to, not an unbounded attic. */
export const MAX_ROSTER_ENTRIES = 50;

export interface RosterEntry {
  id: string;
  /** The person's seed (any decodable version; re-encoded to
   *  the current version whenever the entry is touched). */
  seed: string;
  updatedAt: number;
}

export interface Roster {
  entries: RosterEntry[];
  currentId: string;
}

let idCounter = 0;

/** A process-unique entry id. Ids are bookkeeping only — they
 *  never leave the device and carry no meaning. */
export function makeEntryId(): string {
  idCounter += 1;
  return `p${Date.now().toString(36)}-${idCounter.toString(36)}-${Math.floor(
    Math.random() * 0x1000000,
  ).toString(36)}`;
}

export function makeEntry(seed: string, now: number = Date.now(), id: string = makeEntryId()): RosterEntry {
  return { id, seed, updatedAt: now };
}

/** Validate unknown data into a Roster. Entries whose seed no
 *  longer decodes are dropped (a roster entry that cannot call
 *  its person back is not an entry); duplicate ids collapse;
 *  the cap keeps the most recently updated entries; currentId
 *  must point at a surviving entry. Returns null when there is
 *  nothing usable at all, so the caller can migrate instead. */
export function sanitizeRoster(raw: unknown): Roster | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.entries)) return null;
  const seen = new Set<string>();
  const entries: RosterEntry[] = [];
  for (const item of o.entries) {
    if (typeof item !== 'object' || item === null) continue;
    const e = item as Record<string, unknown>;
    if (typeof e.id !== 'string' || !e.id || seen.has(e.id)) continue;
    if (typeof e.seed !== 'string' || !decodeSeed(e.seed)) continue;
    seen.add(e.id);
    entries.push({
      id: e.id,
      seed: e.seed,
      updatedAt: typeof e.updatedAt === 'number' && Number.isFinite(e.updatedAt) ? e.updatedAt : 0,
    });
  }
  if (!entries.length) return null;
  entries.sort((a, b) => a.updatedAt - b.updatedAt);
  const kept = entries.slice(-MAX_ROSTER_ENTRIES);
  const currentId =
    typeof o.currentId === 'string' && kept.some((e) => e.id === o.currentId)
      ? o.currentId
      : kept[kept.length - 1].id;
  return { entries: kept, currentId };
}

/** Load the roster, migrating the pre-roster single save on
 *  first sight: the person saved under fitting-room.outfit.v1
 *  becomes the first (current) entry, byte for byte the same
 *  person — nothing about them is lost or altered. The migrated
 *  roster is persisted at once so the migration runs once. */
export function loadRoster(storage: Storage = localStorage): Roster {
  try {
    const raw = storage.getItem(ROSTER_STORAGE_KEY);
    if (raw) {
      const roster = sanitizeRoster(JSON.parse(raw));
      if (roster) return roster;
    }
  } catch {
    // Unreadable roster storage: fall through to migration,
    // which rebuilds from the single save below.
  }
  const entry = makeEntry(encodeSeed(loadOutfit(storage)));
  const roster: Roster = { entries: [entry], currentId: entry.id };
  saveRoster(roster, storage);
  return roster;
}

export function saveRoster(roster: Roster, storage: Storage = localStorage): void {
  try {
    storage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(roster));
  } catch {
    // Storage full/blocked: the app still works; the roster
    // just won't persist. Never surface as a crash.
  }
}

export function currentEntry(roster: Roster): RosterEntry {
  return roster.entries.find((e) => e.id === roster.currentId) ?? roster.entries[roster.entries.length - 1];
}

/** The autosave path: the current person's latest seed replaces
 *  their entry's seed in place (same id, fresh timestamp). If
 *  the current id is somehow gone, the person is re-added. */
export function upsertCurrent(roster: Roster, seed: string, now: number = Date.now()): Roster {
  const at = roster.entries.findIndex((e) => e.id === roster.currentId);
  if (at < 0) {
    const entry = makeEntry(seed, now);
    return { entries: [...roster.entries, entry].slice(-MAX_ROSTER_ENTRIES), currentId: entry.id };
  }
  const entries = roster.entries.slice();
  entries[at] = { ...entries[at], seed, updatedAt: now };
  return { entries, currentId: roster.currentId };
}

/** Add a new person and make them current. When the roster is
 *  full, the least recently updated non-current entry retires. */
export function addEntry(roster: Roster, seed: string, now: number = Date.now()): Roster {
  const entry = makeEntry(seed, now);
  let entries = [...roster.entries, entry];
  if (entries.length > MAX_ROSTER_ENTRIES) {
    const sorted = entries
      .filter((e) => e.id !== entry.id)
      .sort((a, b) => a.updatedAt - b.updatedAt);
    entries = [...sorted.slice(entries.length - MAX_ROSTER_ENTRIES), entry];
  }
  return { entries, currentId: entry.id };
}

/** Remove a person. Removing the current person moves current
 *  to the most recently updated remaining person; removing the
 *  last person leaves a fresh default person, because the app
 *  always has someone on stage. */
export function removeEntry(roster: Roster, id: string): Roster {
  const entries = roster.entries.filter((e) => e.id !== id);
  if (!entries.length) {
    const entry = makeEntry(encodeSeed(DEFAULT_OUTFIT));
    return { entries: [entry], currentId: entry.id };
  }
  const currentId =
    roster.currentId === id
      ? entries.reduce((a, b) => (a.updatedAt >= b.updatedAt ? a : b)).id
      : roster.currentId;
  return { entries, currentId };
}

/** Rename a person in place: decode their seed, set the name,
 *  re-encode. The name lives in the seed, so renaming is just
 *  re-issuing the person's recipe with the name field changed —
 *  there is no separate name table to drift out of sync. */
export function renameEntry(roster: Roster, id: string, name: string, now: number = Date.now()): Roster | null {
  const at = roster.entries.findIndex((e) => e.id === id);
  if (at < 0) return null;
  const outfit = decodeSeed(roster.entries[at].seed);
  if (!outfit) return null;
  const entries = roster.entries.slice();
  entries[at] = { ...entries[at], seed: encodeSeed({ ...outfit, name }), updatedAt: now };
  return { entries, currentId: roster.currentId };
}
