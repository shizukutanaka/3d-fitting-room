// Seed encoding for a whole person + outfit (CHARACTER-SYSTEM.md
// §2.5): the full state becomes one short string that can ride on
// a share card or be pasted between devices, and the receiver
// rebuilds the exact same state on-device. No server, no account —
// the string is the medium, like the share-card PNG itself.
//
// Format: a fixed-order byte array (version first), base64url
// encoded, with an "FR1-" prefix so a seed is recognizable at a
// glance. Continuous values are quantized (skin tone to 1/255,
// height to 1 cm); enum/palette values travel as indices into the
// canonical lists, so a seed can never smuggle in an off-list value.

import {
  ACCESSORIES,
  GLASSES,
  HATS,
  POSES,
  TOP_COLORS,
  TOP_STYLES,
  sanitizeOutfit,
  type Outfit,
} from './outfit';
import { EYE_COLORS, HAIR_COLORS, HAIR_STYLES, HEIGHT_MAX, HEIGHT_MIN } from './character';

const VERSION = 1;
const PREFIX = 'FR1-';
const BYTE_COUNT = 12;

function idx(options: readonly string[], value: string): number {
  const i = options.indexOf(value);
  return i >= 0 ? i : 0;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function bytesToBase64Url(bytes: number[]): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(text: string): number[] | null {
  try {
    const b64 = text.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64);
    return [...bin].map((c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

export function encodeSeed(outfit: Outfit): string {
  const c = outfit.character;
  const bytes = [
    VERSION,
    Math.round(clamp(c.skinTone, 0, 1) * 255),
    Math.round((clamp(c.height, HEIGHT_MIN, HEIGHT_MAX) - HEIGHT_MIN) * 100),
    idx(HAIR_COLORS, c.hairColor),
    idx(EYE_COLORS, c.eyeColor),
    idx(HAIR_STYLES, c.hairStyle),
    idx(TOP_STYLES, outfit.topStyle),
    idx(TOP_COLORS, outfit.topColor),
    idx(HATS, outfit.hat),
    idx(GLASSES, outfit.glasses),
    idx(ACCESSORIES, outfit.accessory),
    idx(POSES, outfit.pose),
  ];
  return PREFIX + bytesToBase64Url(bytes);
}

/** Decode a seed back into a full state. Returns null for anything
 *  that is not a well-formed seed of a known version; the payload
 *  still passes through sanitizeOutfit, so even a hand-crafted
 *  byte string can only produce in-range values. */
export function decodeSeed(seed: unknown): Outfit | null {
  if (typeof seed !== 'string') return null;
  const body = seed.startsWith(PREFIX) ? seed.slice(PREFIX.length) : seed;
  const bytes = base64UrlToBytes(body.trim());
  if (!bytes || bytes.length !== BYTE_COUNT || bytes[0] !== VERSION) return null;
  const at = (options: readonly string[], i: number): string =>
    options[Math.min(options.length - 1, Math.max(0, bytes[i]))] ?? options[0];
  return sanitizeOutfit({
    topStyle: at(TOP_STYLES, 6),
    topColor: at(TOP_COLORS, 7),
    hat: at(HATS, 8),
    glasses: at(GLASSES, 9),
    accessory: at(ACCESSORIES, 10),
    pose: at(POSES, 11),
    character: {
      skinTone: bytes[1] / 255,
      // Round back to whole centimeters so a decoded height is the
      // exact double the user picked, not 1.5999999999999999.
      height: Math.round((HEIGHT_MIN + bytes[2] / 100) * 100) / 100,
      hairColor: at(HAIR_COLORS, 3),
      eyeColor: at(EYE_COLORS, 4),
      hairStyle: at(HAIR_STYLES, 5),
    },
  });
}
