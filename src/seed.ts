// Seed encoding for a whole person + outfit (CHARACTER-SYSTEM.md
// §2.5): the full state becomes one short string that can ride on
// a share card or be pasted between devices, and the receiver
// rebuilds the exact same state on-device. No server, no account —
// the string is the medium, like the share-card PNG itself.
//
// Format: a fixed-order byte array (version first), base64url
// encoded, with a recognizable prefix. Continuous values are
// quantized (skin tone to 1/255, height to 1 cm, face parameters
// to 1/255 of their spec range); enum/palette values travel as
// indices into the canonical lists, so a seed can never smuggle
// in an off-list value.
//
// Versions:
// - v1 ("FR1-", 12 bytes): the phase 0/1 layout — no face
//   parameters. Still decodable; the face loads with defaults.
// - v2 ("FR2-", 25 bytes): adds the 13 phase-2 face parameters.
// Encoding always produces v2.

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
import {
  CHARACTER_PARAM_SPECS,
  EYE_COLORS,
  FACE_PARAM_KEYS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEIGHT_MAX,
  HEIGHT_MIN,
} from './character';

const PREFIX_V1 = 'FR1-';
const PREFIX_V2 = 'FR2-';
const BYTE_COUNT_V1 = 12;
const BYTE_COUNT_V2 = 25;

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

type FaceKey = (typeof FACE_PARAM_KEYS)[number];

function rangeOf(key: FaceKey): { min: number; max: number } {
  const spec = CHARACTER_PARAM_SPECS[key];
  if (spec.kind !== 'range') throw new Error(`face param ${key} is not a range`);
  return spec;
}

function quantizeFace(key: FaceKey, value: number): number {
  const { min, max } = rangeOf(key);
  return Math.round(((clamp(value, min, max) - min) / (max - min)) * 255);
}

function dequantizeFace(key: FaceKey, byte: number): number {
  const { min, max } = rangeOf(key);
  return min + (clamp(byte, 0, 255) / 255) * (max - min);
}

export function encodeSeed(outfit: Outfit): string {
  const c = outfit.character;
  const bytes = [
    2,
    Math.round(clamp(c.skinTone, 0, 1) * 255),
    Math.round((clamp(c.height, HEIGHT_MIN, HEIGHT_MAX) - HEIGHT_MIN) * 100),
    idx(HAIR_COLORS, c.hairColor),
    idx(EYE_COLORS, c.eyeColor),
    idx(HAIR_STYLES, c.hairStyle),
    ...FACE_PARAM_KEYS.map((key) => quantizeFace(key, c[key])),
    idx(TOP_STYLES, outfit.topStyle),
    idx(TOP_COLORS, outfit.topColor),
    idx(HATS, outfit.hat),
    idx(GLASSES, outfit.glasses),
    idx(ACCESSORIES, outfit.accessory),
    idx(POSES, outfit.pose),
  ];
  return PREFIX_V2 + bytesToBase64Url(bytes);
}

/** Decode a seed back into a full state. Returns null for anything
 *  that is not a well-formed seed of a known version; the payload
 *  still passes through sanitizeOutfit, so even a hand-crafted
 *  byte string can only produce in-range values. A v1 seed yields
 *  the default face (its layout predates face parameters). */
export function decodeSeed(seed: unknown): Outfit | null {
  if (typeof seed !== 'string') return null;
  let body = seed.trim();
  if (body.startsWith(PREFIX_V2)) body = body.slice(PREFIX_V2.length);
  else if (body.startsWith(PREFIX_V1)) body = body.slice(PREFIX_V1.length);
  const bytes = base64UrlToBytes(body);
  if (!bytes) return null;
  const at = (options: readonly string[], i: number): string =>
    options[Math.min(options.length - 1, Math.max(0, bytes[i]))] ?? options[0];

  if (bytes[0] === 1 && bytes.length === BYTE_COUNT_V1) {
    return sanitizeOutfit({
      topStyle: at(TOP_STYLES, 6),
      topColor: at(TOP_COLORS, 7),
      hat: at(HATS, 8),
      glasses: at(GLASSES, 9),
      accessory: at(ACCESSORIES, 10),
      pose: at(POSES, 11),
      character: {
        skinTone: bytes[1] / 255,
        height: Math.round((HEIGHT_MIN + bytes[2] / 100) * 100) / 100,
        hairColor: at(HAIR_COLORS, 3),
        eyeColor: at(EYE_COLORS, 4),
        hairStyle: at(HAIR_STYLES, 5),
        // no face keys: sanitizeCharacter fills the defaults
      },
    });
  }
  if (bytes[0] === 2 && bytes.length === BYTE_COUNT_V2) {
    const face: Record<string, number> = {};
    FACE_PARAM_KEYS.forEach((key, i) => {
      face[key] = dequantizeFace(key, bytes[6 + i]);
    });
    return sanitizeOutfit({
      topStyle: at(TOP_STYLES, 19),
      topColor: at(TOP_COLORS, 20),
      hat: at(HATS, 21),
      glasses: at(GLASSES, 22),
      accessory: at(ACCESSORIES, 23),
      pose: at(POSES, 24),
      character: {
        skinTone: bytes[1] / 255,
        // Round back to whole centimeters so a decoded height is
        // the exact double the user picked, not 1.5999999999999999.
        height: Math.round((HEIGHT_MIN + bytes[2] / 100) * 100) / 100,
        hairColor: at(HAIR_COLORS, 3),
        eyeColor: at(EYE_COLORS, 4),
        hairStyle: at(HAIR_STYLES, 5),
        ...face,
      },
    });
  }
  return null;
}
