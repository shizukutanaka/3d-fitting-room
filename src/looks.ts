// Saved looks: named combinations of *clothing* — the fitting
// room's other save system, deliberately separate from the
// roster of people (roster.ts). A look is only the clothes: no
// character, no name of a person, no pose. Applying one re-dresses
// whoever is on stage in one tap, which is the fitting room's
// core loop (DESIGN.md §21). Like everything else, the list lives
// only in this device's localStorage and never leaves it.

import {
  DEFAULT_OUTFIT,
  sanitizeOutfit,
  type AccessoryId,
  type BottomStyle,
  type GlassesId,
  type HatId,
  type OuterStyle,
  type Outfit,
  type ShoeStyle,
  type TopStyle,
} from './outfit';

/** The clothing fields of an outfit — everything a look carries. */
export interface Look {
  topStyle: TopStyle;
  topColor: string;
  outerStyle: OuterStyle;
  outerColor: string;
  bottomStyle: BottomStyle;
  bottomColor: string;
  shoeStyle: ShoeStyle;
  shoeColor: string;
  hat: HatId;
  glasses: GlassesId;
  accessory: AccessoryId;
}

export interface SavedLook {
  id: string;
  /** The look's own name, given by the user ("rainy day", "the
   *  red one"…). Sanitized with the same rules as a person's
   *  display name (outfit.ts sanitizeName) — it is a label typed
   *  on this device, and it travels nowhere. */
  name: string;
  look: Look;
  updatedAt: number;
}

export const LOOKS_STORAGE_KEY = 'fitting-room.looks.v1';
/** How many looks the shelf holds. Past the cap the oldest is
 *  dropped on save — a fitting room rail, not an archive. */
export const LOOKS_MAX = 30;

let idCounter = 0;

/** A process-unique look id. Bookkeeping only — the look itself
 *  is the data, exactly like roster entry ids (roster.ts). */
export function makeLookId(): string {
  idCounter += 1;
  return `l${Date.now().toString(36)}-${idCounter.toString(36)}-${Math.floor(
    Math.random() * 0xffffff,
  ).toString(36)}`;
}

/** Extract the clothing of an outfit as a look. */
export function lookOf(outfit: Outfit): Look {
  return {
    topStyle: outfit.topStyle,
    topColor: outfit.topColor,
    outerStyle: outfit.outerStyle,
    outerColor: outfit.outerColor,
    bottomStyle: outfit.bottomStyle,
    bottomColor: outfit.bottomColor,
    shoeStyle: outfit.shoeStyle,
    shoeColor: outfit.shoeColor,
    hat: outfit.hat,
    glasses: outfit.glasses,
    accessory: outfit.accessory,
  };
}

/** Validate unknown data into a look. The values pass through
 *  sanitizeOutfit (merged over the defaults), so a stored or
 *  hand-edited look can only ever name catalog values — the same
 *  gate every other state path uses. */
export function sanitizeLook(raw: unknown): Look {
  const merged =
    typeof raw === 'object' && raw !== null
      ? { ...DEFAULT_OUTFIT, ...(raw as Record<string, unknown>) }
      : { ...DEFAULT_OUTFIT };
  return lookOf(sanitizeOutfit(merged));
}

/** Whether two looks dress identically (the before/after compare
 *  and the change tracking in main.ts key on this). */
export function sameLook(a: Look, b: Look): boolean {
  return (
    a.topStyle === b.topStyle &&
    a.topColor === b.topColor &&
    a.outerStyle === b.outerStyle &&
    a.outerColor === b.outerColor &&
    a.bottomStyle === b.bottomStyle &&
    a.bottomColor === b.bottomColor &&
    a.shoeStyle === b.shoeStyle &&
    a.shoeColor === b.shoeColor &&
    a.hat === b.hat &&
    a.glasses === b.glasses &&
    a.accessory === b.accessory
  );
}

/** Validate unknown data (e.g. parsed JSON) into a look list.
 *  Entries without a usable name or with duplicate ids are
 *  dropped; every look is sanitized; most recently updated
 *  first; capped at LOOKS_MAX. */
export function sanitizeLooks(raw: unknown): SavedLook[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: SavedLook[] = [];
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue;
    const e = entry as Record<string, unknown>;
    if (typeof e.id !== 'string' || !e.id || seen.has(e.id)) continue;
    if (typeof e.name !== 'string' || !e.name.trim()) continue;
    seen.add(e.id);
    out.push({
      id: e.id,
      name: e.name,
      look: sanitizeLook(e.look),
      updatedAt: typeof e.updatedAt === 'number' && Number.isFinite(e.updatedAt) ? e.updatedAt : 0,
    });
  }
  out.sort((a, b) => b.updatedAt - a.updatedAt);
  return out.slice(0, LOOKS_MAX);
}

export function loadLooks(storage: Storage = localStorage): SavedLook[] {
  try {
    const raw = storage.getItem(LOOKS_STORAGE_KEY);
    return raw ? sanitizeLooks(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function saveLooks(looks: SavedLook[], storage: Storage = localStorage): void {
  try {
    storage.setItem(LOOKS_STORAGE_KEY, JSON.stringify(looks));
  } catch {
    // Storage full/blocked: the app still works, the looks just
    // won't persist. Never surface as a crash.
  }
}

/** Save the current clothing as a new named look, most recent
 *  first. Past the cap, the oldest look falls off the rail. */
export function addLook(
  looks: SavedLook[],
  name: string,
  look: Look,
  now: number = Date.now(),
): SavedLook[] {
  const entry: SavedLook = { id: makeLookId(), name, look: { ...look }, updatedAt: now };
  return [entry, ...looks].slice(0, LOOKS_MAX);
}

export function removeLook(looks: SavedLook[], id: string): SavedLook[] {
  return looks.filter((l) => l.id !== id);
}
