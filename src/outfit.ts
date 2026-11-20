// The whole outfit state: what the avatar wears, its pose and face.
// Kept as plain data so it can be saved to localStorage (on-device only)
// and restored on the next visit. Nothing here ever leaves the device.

import { DEFAULT_CHARACTER, sanitizeCharacter, type CharacterParams } from './character';

export type TopStyle = 'tee' | 'hoodie' | 'blouse' | 'dress' | 'dressLong';
export type BottomStyle = 'none' | 'skirt' | 'skirtLong' | 'pants' | 'shorts';
export type ShoeStyle = 'flats' | 'sneakers' | 'pumps' | 'boots';
export type OuterStyle = 'none' | 'jacket' | 'coat' | 'cardigan';
export type HatId = 'none' | 'cap' | 'beanie' | 'catears' | 'ribbon';
export type GlassesId = 'none' | 'round' | 'square' | 'sunglasses';
export type AccessoryId = 'none' | 'necklace' | 'scarf' | 'bag';
export type PoseId = 'stand' | 'wave' | 'cheer' | 'peace' | 'relax';

export interface Outfit {
  /** The person's display name — the identity anchor the whole
   *  recognition loop keys on (docs/PERSPECTIVES-2.md viewpoint
   *  6 / R2-2: a character is re-identified by name on the second
   *  encounter). It is NOT a character parameter: it does not
   *  live in CHARACTER_PARAM_SPECS, is never synthesized or
   *  randomized, and a synthesized person starts unnamed. The
   *  empty string is a regular state (naming is optional — no
   *  mandatory names, no registry; PERSPECTIVES-2.md K2-8). The
   *  name travels inside the seed (seed.ts v5) and on the share
   *  card face (LEGAL-ETHICS.md judgment J-07 allows the display
   *  name on the card); it is set by the user on their own
   *  device and is never sent anywhere. */
  name: string;
  topStyle: TopStyle;
  topColor: string;
  /** Layered outerwear over the top (the re-centering added the
   *  category: a fitting room without layering is a shelf with a
   *  hole in it — DESIGN.md §21). 'none' is the regular state.
   *  The coat profile flares to clear a dress or skirt beneath
   *  it, so outerwear composes with every top (see items.ts). */
  outerStyle: OuterStyle;
  outerColor: string;
  /** Lower-body garment. 'none' shows only the always-on base
   *  layer (LEGAL-ETHICS J-10: the base layer is never removed).
   *  A dress is a one-piece and suppresses bottoms at render time
   *  (see items.ts) — the selection itself is kept. */
  bottomStyle: BottomStyle;
  bottomColor: string;
  /** Footwear. There is deliberately no 'none': the avatar has no
   *  bare-foot geometry, and 'flats' reproduces the shoes the
   *  avatar was originally built with. */
  shoeStyle: ShoeStyle;
  shoeColor: string;
  hat: HatId;
  glasses: GlassesId;
  accessory: AccessoryId;
  pose: PoseId;
  /** Who the avatar is (skin, hair, height…). Added in character
   *  system phase 0; older saves have no such key and load with
   *  defaults — see sanitizeOutfit. */
  character: CharacterParams;
}

/** Color swatches offered for tops. New colors are only ever
 *  appended: seeds store palette indices, so the existing
 *  entries must never move (seed.ts). */
export const TOP_COLORS = [
  '#ffffff',
  '#ff8fab',
  '#7cc7ff',
  '#8fe3c0',
  '#c9a7ff',
  '#ffd166',
  '#3a4152',
  '#b03050',
  '#2e5e4e',
  '#f2a65a',
] as const;

/** Color swatches offered for bottoms (denim first: it is the
 *  color pants are expected to come in). Appended only, like
 *  TOP_COLORS. */
export const BOTTOM_COLORS = [
  '#44557a',
  '#2f3542',
  '#e8e2d6',
  '#a83c46',
  '#7cc7ff',
  '#8fe3c0',
  '#ffd166',
  '#5b4a68',
  '#8a6642',
  '#606c38',
] as const;

/** Color swatches offered for shoes. The first entry is the color
 *  of the flats the avatar originally shipped with, so the default
 *  outfit's look is unchanged. Appended only, like TOP_COLORS. */
export const SHOE_COLORS = [
  '#5e2233',
  '#26262b',
  '#e8e2d6',
  '#7c4a2d',
  '#a83c46',
  '#3d5a80',
  '#d8b25c',
  '#ffffff',
  '#c0c6cc',
  '#2e5e4e',
] as const;

/** Color swatches offered for outerwear (coats and jackets live
 *  in a more muted register than tops). The first entry is the
 *  default outer color — it only shows once an outer style is
 *  picked, so the default outfit's look is unchanged. */
export const OUTER_COLORS = [
  '#b08954',
  '#26262b',
  '#2c3a55',
  '#7a2e3a',
  '#e8e2d6',
  '#6b7250',
  '#3a4152',
  '#8a6642',
] as const;

// Style lists are append-only for the same reason as the color
// palettes: seeds store indices into them, so an existing entry
// must never move. (The re-centering's first draft inserted
// 'skirtLong' mid-list and a v3 compat test caught a vintage
// seed's pants turning into a long skirt.)
export const TOP_STYLES: TopStyle[] = ['tee', 'hoodie', 'dress', 'blouse', 'dressLong'];
export const BOTTOM_STYLES: BottomStyle[] = ['none', 'skirt', 'pants', 'shorts', 'skirtLong'];
export const SHOE_STYLES: ShoeStyle[] = ['flats', 'sneakers', 'pumps', 'boots'];
export const OUTER_STYLES: OuterStyle[] = ['none', 'jacket', 'coat', 'cardigan'];

/** The one-piece tops: a dress already covers waist to knee (or
 *  ankle), so bottoms are not rendered under one. Every consumer
 *  that special-cases dresses (items.ts, imaging.ts, the UI)
 *  reads this single predicate. */
export function isDress(style: TopStyle): boolean {
  return style === 'dress' || style === 'dressLong';
}
export const HATS: HatId[] = ['none', 'cap', 'beanie', 'catears', 'ribbon'];
export const GLASSES: GlassesId[] = ['none', 'round', 'square', 'sunglasses'];
export const ACCESSORIES: AccessoryId[] = ['none', 'necklace', 'scarf', 'bag'];
export const POSES: PoseId[] = ['stand', 'wave', 'cheer', 'peace', 'relax'];

export const DEFAULT_OUTFIT: Outfit = {
  name: '',
  topStyle: 'tee',
  topColor: '#ff8fab',
  outerStyle: 'none',
  outerColor: '#b08954',
  bottomStyle: 'none',
  bottomColor: '#44557a',
  shoeStyle: 'flats',
  shoeColor: '#5e2233',
  hat: 'none',
  glasses: 'none',
  accessory: 'none',
  pose: 'stand',
  character: { ...DEFAULT_CHARACTER },
};

const STORAGE_KEY = 'fitting-room.outfit.v1';

/** Display-name limits, pinned by tests: at most 24 characters
 *  (counted in code points, so a Japanese name and an emoji name
 *  are measured the same way) and at most 72 bytes as UTF-8 —
 *  the byte budget is what the seed format reserves for the name
 *  (seed.ts), so a name that fits here always fits in a seed. */
export const NAME_MAX_CHARS = 24;
export const NAME_MAX_UTF8_BYTES = 72;

const utf8 = new TextEncoder();

/** Validate an unknown value into a display name. Anything that
 *  is not a plain, printable, single-line string degrades toward
 *  the empty (unnamed) state rather than failing: control
 *  characters are stripped, whitespace runs collapse to one
 *  space, the ends are trimmed, and the result is truncated to
 *  the limits above (the byte budget cuts at a code-point
 *  boundary, never inside a character). Naming a person after a
 *  real person is prohibited by the terms (LEGAL-ETHICS.md
 *  judgment J-07); like the rest of that judgment, it is upheld
 *  by the UI note, not by name matching — the app holds no list
 *  of real people's names and checks against nothing. */
export function sanitizeName(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  let out = '';
  for (const ch of raw) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp < 0x20 || (cp >= 0x7f && cp <= 0x9f)) continue; // control chars
    out += ch;
  }
  out = out.replace(/\s+/g, ' ').trim();
  const chars = [...out];
  if (chars.length > NAME_MAX_CHARS) out = chars.slice(0, NAME_MAX_CHARS).join('');
  while (out && utf8.encode(out).length > NAME_MAX_UTF8_BYTES) {
    out = [...out].slice(0, -1).join('');
  }
  return out;
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

/** Validate unknown data (e.g. parsed JSON) into a complete Outfit. */
export function sanitizeOutfit(raw: unknown): Outfit {
  if (typeof raw !== 'object' || raw === null) return { ...DEFAULT_OUTFIT };
  const o = raw as Record<string, unknown>;
  return {
    // Saves from before the identity foundation have no name
    // key: they load unnamed, which is a regular state.
    name: sanitizeName(o.name),
    topStyle: oneOf(o.topStyle, TOP_STYLES, DEFAULT_OUTFIT.topStyle),
    topColor:
      typeof o.topColor === 'string' && (TOP_COLORS as readonly string[]).includes(o.topColor)
        ? o.topColor
        : DEFAULT_OUTFIT.topColor,
    // Saves and seeds from before the re-centering have no outer
    // keys: they load with no outerwear, which is what they
    // showed.
    outerStyle: oneOf(o.outerStyle, OUTER_STYLES, DEFAULT_OUTFIT.outerStyle),
    outerColor:
      typeof o.outerColor === 'string' &&
      (OUTER_COLORS as readonly string[]).includes(o.outerColor)
        ? o.outerColor
        : DEFAULT_OUTFIT.outerColor,
    // Saves from before the bottoms/shoes categories have none of
    // these keys: they load with the defaults, which reproduce the
    // old look (no bottoms, the original flats).
    bottomStyle: oneOf(o.bottomStyle, BOTTOM_STYLES, DEFAULT_OUTFIT.bottomStyle),
    bottomColor:
      typeof o.bottomColor === 'string' &&
      (BOTTOM_COLORS as readonly string[]).includes(o.bottomColor)
        ? o.bottomColor
        : DEFAULT_OUTFIT.bottomColor,
    shoeStyle: oneOf(o.shoeStyle, SHOE_STYLES, DEFAULT_OUTFIT.shoeStyle),
    shoeColor:
      typeof o.shoeColor === 'string' && (SHOE_COLORS as readonly string[]).includes(o.shoeColor)
        ? o.shoeColor
        : DEFAULT_OUTFIT.shoeColor,
    hat: oneOf(o.hat, HATS, DEFAULT_OUTFIT.hat),
    glasses: oneOf(o.glasses, GLASSES, DEFAULT_OUTFIT.glasses),
    accessory: oneOf(o.accessory, ACCESSORIES, DEFAULT_OUTFIT.accessory),
    pose: oneOf(o.pose, POSES, DEFAULT_OUTFIT.pose),
    // Pre-phase-0 saves carry no character key: sanitizeCharacter
    // of undefined yields the defaults, so old saves just work.
    character: sanitizeCharacter(o.character),
  };
}

export function loadOutfit(storage: Storage = localStorage): Outfit {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? sanitizeOutfit(JSON.parse(raw)) : { ...DEFAULT_OUTFIT };
  } catch {
    return { ...DEFAULT_OUTFIT };
  }
}

export function saveOutfit(outfit: Outfit, storage: Storage = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(outfit));
  } catch {
    // Storage full/blocked: the app still works, the outfit just
    // won't persist. Never surface as a crash.
  }
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function randomOutfit(rng: () => number = Math.random): Outfit {
  return {
    // A name is never randomized into existence; callers that
    // re-dress the current person merge their name back in.
    name: '',
    topStyle: pick(TOP_STYLES, rng),
    topColor: pick(TOP_COLORS, rng),
    outerStyle: pick(OUTER_STYLES, rng),
    outerColor: pick(OUTER_COLORS, rng),
    bottomStyle: pick(BOTTOM_STYLES, rng),
    bottomColor: pick(BOTTOM_COLORS, rng),
    shoeStyle: pick(SHOE_STYLES, rng),
    shoeColor: pick(SHOE_COLORS, rng),
    hat: pick(HATS, rng),
    glasses: pick(GLASSES, rng),
    accessory: pick(ACCESSORIES, rng),
    pose: pick(POSES, rng),
    // Randomizing is about the outfit; the person stays who they
    // are, so the character carries over at the default unless the
    // caller merges their current one in (main.ts does).
    character: { ...DEFAULT_CHARACTER },
  };
}
