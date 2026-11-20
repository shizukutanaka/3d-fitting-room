// The whole outfit state: what the avatar wears, its pose and face.
// Kept as plain data so it can be saved to localStorage (on-device only)
// and restored on the next visit. Nothing here ever leaves the device.

export type TopStyle = 'tee' | 'hoodie' | 'dress';
export type HatId = 'none' | 'cap' | 'beanie' | 'catears' | 'ribbon';
export type GlassesId = 'none' | 'round' | 'square' | 'sunglasses';
export type AccessoryId = 'none' | 'necklace' | 'scarf' | 'bag';
export type PoseId = 'stand' | 'wave' | 'cheer' | 'peace' | 'relax';

export interface Outfit {
  topStyle: TopStyle;
  topColor: string;
  hat: HatId;
  glasses: GlassesId;
  accessory: AccessoryId;
  pose: PoseId;
}

/** Color swatches offered for tops. */
export const TOP_COLORS = [
  '#ffffff',
  '#ff8fab',
  '#7cc7ff',
  '#8fe3c0',
  '#c9a7ff',
  '#ffd166',
  '#3a4152',
] as const;

export const TOP_STYLES: TopStyle[] = ['tee', 'hoodie', 'dress'];
export const HATS: HatId[] = ['none', 'cap', 'beanie', 'catears', 'ribbon'];
export const GLASSES: GlassesId[] = ['none', 'round', 'square', 'sunglasses'];
export const ACCESSORIES: AccessoryId[] = ['none', 'necklace', 'scarf', 'bag'];
export const POSES: PoseId[] = ['stand', 'wave', 'cheer', 'peace', 'relax'];

export const DEFAULT_OUTFIT: Outfit = {
  topStyle: 'tee',
  topColor: '#ff8fab',
  hat: 'none',
  glasses: 'none',
  accessory: 'none',
  pose: 'stand',
};

const STORAGE_KEY = 'fitting-room.outfit.v1';

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
    topStyle: oneOf(o.topStyle, TOP_STYLES, DEFAULT_OUTFIT.topStyle),
    topColor:
      typeof o.topColor === 'string' && (TOP_COLORS as readonly string[]).includes(o.topColor)
        ? o.topColor
        : DEFAULT_OUTFIT.topColor,
    hat: oneOf(o.hat, HATS, DEFAULT_OUTFIT.hat),
    glasses: oneOf(o.glasses, GLASSES, DEFAULT_OUTFIT.glasses),
    accessory: oneOf(o.accessory, ACCESSORIES, DEFAULT_OUTFIT.accessory),
    pose: oneOf(o.pose, POSES, DEFAULT_OUTFIT.pose),
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
    topStyle: pick(TOP_STYLES, rng),
    topColor: pick(TOP_COLORS, rng),
    hat: pick(HATS, rng),
    glasses: pick(GLASSES, rng),
    accessory: pick(ACCESSORIES, rng),
    pose: pick(POSES, rng),
  };
}
