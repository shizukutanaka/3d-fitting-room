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
//   Still decodable; bottoms and shoes load with defaults.
// - v3 ("FR3-", 29 bytes): appends bottom style/color and shoe
//   style/color after the v2 layout, byte for byte.
// - v4 ("FR4-", 34 bytes): appends the 5 body parameters after
//   the v3 layout, byte for byte. Still decodable in reverse:
//   v1–v3 seeds load the body with defaults.
// - v5 ("FR5-", 35+ bytes): the v4 layout followed by the
//   person's display name — one length byte (the name's UTF-8
//   byte count, at most NAME_MAX_UTF8_BYTES) and the name's
//   UTF-8 bytes. The name is the one variable-length field in
//   the format; everything before it is byte-for-byte v4, so
//   the parameter payload is unchanged. v1–v4 seeds carry no
//   name and load unnamed (a regular state — naming is
//   optional). The name is a display label set by the user on
//   their own device (LEGAL-ETHICS.md judgment J-07); it is
//   not a character parameter and never enters the specs.
// Encoding always produces v5.

import {
  ACCESSORIES,
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  GLASSES,
  HATS,
  NAME_MAX_UTF8_BYTES,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  sanitizeName,
  sanitizeOutfit,
  type Outfit,
} from './outfit';
import {
  BODY_PARAM_KEYS,
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
const PREFIX_V3 = 'FR3-';
const PREFIX_V4 = 'FR4-';
const PREFIX_V5 = 'FR5-';
const BYTE_COUNT_V1 = 12;
const BYTE_COUNT_V2 = 25;
const BYTE_COUNT_V3 = 29;
const BYTE_COUNT_V4 = 34;

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

type QuantKey = (typeof FACE_PARAM_KEYS)[number] | (typeof BODY_PARAM_KEYS)[number];

function rangeOf(key: QuantKey): { min: number; max: number } {
  const spec = CHARACTER_PARAM_SPECS[key];
  if (spec.kind !== 'range') throw new Error(`param ${key} is not a range`);
  return spec;
}

function quantizeRange(key: QuantKey, value: number): number {
  const { min, max } = rangeOf(key);
  return Math.round(((clamp(value, min, max) - min) / (max - min)) * 255);
}

function dequantizeRange(key: QuantKey, byte: number): number {
  const { min, max } = rangeOf(key);
  return min + (clamp(byte, 0, 255) / 255) * (max - min);
}

export function encodeSeed(outfit: Outfit): string {
  const c = outfit.character;
  // sanitizeName enforces the character and UTF-8 byte budgets,
  // so the length byte below always fits and the decoder's
  // structural checks always pass for encoder output.
  const nameBytes = [...new TextEncoder().encode(sanitizeName(outfit.name))];
  const bytes = [
    5,
    Math.round(clamp(c.skinTone, 0, 1) * 255),
    Math.round((clamp(c.height, HEIGHT_MIN, HEIGHT_MAX) - HEIGHT_MIN) * 100),
    idx(HAIR_COLORS, c.hairColor),
    idx(EYE_COLORS, c.eyeColor),
    idx(HAIR_STYLES, c.hairStyle),
    ...FACE_PARAM_KEYS.map((key) => quantizeRange(key, c[key])),
    idx(TOP_STYLES, outfit.topStyle),
    idx(TOP_COLORS, outfit.topColor),
    idx(HATS, outfit.hat),
    idx(GLASSES, outfit.glasses),
    idx(ACCESSORIES, outfit.accessory),
    idx(POSES, outfit.pose),
    idx(BOTTOM_STYLES, outfit.bottomStyle),
    idx(BOTTOM_COLORS, outfit.bottomColor),
    idx(SHOE_STYLES, outfit.shoeStyle),
    idx(SHOE_COLORS, outfit.shoeColor),
    ...BODY_PARAM_KEYS.map((key) => quantizeRange(key, c[key])),
    // v5 name block: length byte + UTF-8 bytes (possibly empty).
    nameBytes.length,
    ...nameBytes,
  ];
  return PREFIX_V5 + bytesToBase64Url(bytes);
}

/** Decode a seed back into a full state. Returns null for anything
 *  that is not a well-formed seed of a known version; the payload
 *  still passes through sanitizeOutfit, so even a hand-crafted
 *  byte string can only produce in-range values — and the adult
 *  safety restriction (CUS-0779) applies there too, so a crafted
 *  v4 payload carrying a minor-like body combination decodes to
 *  its corrected form, never to the combination itself. A v1
 *  seed yields the default face (its layout predates face
 *  parameters); v1 and v2 seeds yield the default bottoms and
 *  shoes; v1–v3 seeds yield the default body (their layouts
 *  predate the body parameters); v1–v4 seeds yield no name
 *  (their layouts predate the identity foundation). A v5 name
 *  block must be structurally exact — length byte within the
 *  budget, total length matching, valid UTF-8 — or the seed is
 *  rejected whole; a structurally sound name is then sanitized
 *  like any other value. */
export function decodeSeed(seed: unknown): Outfit | null {
  if (typeof seed !== 'string') return null;
  let body = seed.trim();
  if (body.startsWith(PREFIX_V5)) body = body.slice(PREFIX_V5.length);
  else if (body.startsWith(PREFIX_V4)) body = body.slice(PREFIX_V4.length);
  else if (body.startsWith(PREFIX_V3)) body = body.slice(PREFIX_V3.length);
  else if (body.startsWith(PREFIX_V2)) body = body.slice(PREFIX_V2.length);
  else if (body.startsWith(PREFIX_V1)) body = body.slice(PREFIX_V1.length);
  const bytes = base64UrlToBytes(body);
  if (!bytes) return null;

  // v5: split the name block off, leaving the v4 core (with the
  // version byte rewritten to 4) for the shared decode below.
  let name = '';
  let core = bytes;
  if (bytes[0] === 5) {
    if (bytes.length < BYTE_COUNT_V4 + 1) return null;
    const nameLen = bytes[BYTE_COUNT_V4];
    if (nameLen > NAME_MAX_UTF8_BYTES) return null;
    if (bytes.length !== BYTE_COUNT_V4 + 1 + nameLen) return null;
    let nameText: string;
    try {
      nameText = new TextDecoder('utf-8', { fatal: true }).decode(
        Uint8Array.from(bytes.slice(BYTE_COUNT_V4 + 1)),
      );
    } catch {
      return null; // the name block is not valid UTF-8
    }
    name = sanitizeName(nameText);
    core = bytes.slice(0, BYTE_COUNT_V4);
    core[0] = 4;
  }

  const at = (options: readonly string[], i: number): string =>
    options[Math.min(options.length - 1, Math.max(0, core[i]))] ?? options[0];

  if (core[0] === 1 && core.length === BYTE_COUNT_V1) {
    return sanitizeOutfit({
      topStyle: at(TOP_STYLES, 6),
      topColor: at(TOP_COLORS, 7),
      hat: at(HATS, 8),
      glasses: at(GLASSES, 9),
      accessory: at(ACCESSORIES, 10),
      pose: at(POSES, 11),
      character: {
        skinTone: core[1] / 255,
        height: Math.round((HEIGHT_MIN + core[2] / 100) * 100) / 100,
        hairColor: at(HAIR_COLORS, 3),
        eyeColor: at(EYE_COLORS, 4),
        hairStyle: at(HAIR_STYLES, 5),
        // no face keys: sanitizeCharacter fills the defaults
      },
    });
  }
  if (
    (core[0] === 2 && core.length === BYTE_COUNT_V2) ||
    (core[0] === 3 && core.length === BYTE_COUNT_V3) ||
    (core[0] === 4 && core.length === BYTE_COUNT_V4)
  ) {
    const face: Record<string, number> = {};
    FACE_PARAM_KEYS.forEach((key, i) => {
      face[key] = dequantizeRange(key, core[6 + i]);
    });
    // v4 appends the body block after the v3 layout; for v2/v3
    // these keys are absent and sanitizeCharacter fills the
    // defaults (the pre-phase-3 body).
    const bodyParams: Record<string, number> = {};
    if (core[0] === 4) {
      BODY_PARAM_KEYS.forEach((key, i) => {
        bodyParams[key] = dequantizeRange(key, core[29 + i]);
      });
    }
    return sanitizeOutfit({
      // Only v5 carries a name; for v2–v4 this is '' (unnamed).
      name,
      topStyle: at(TOP_STYLES, 19),
      topColor: at(TOP_COLORS, 20),
      hat: at(HATS, 21),
      glasses: at(GLASSES, 22),
      accessory: at(ACCESSORIES, 23),
      pose: at(POSES, 24),
      // v3 appends the bottoms/shoes block after the v2 layout;
      // for v2 these keys are absent and sanitizeOutfit fills the
      // defaults (no bottoms, the original flats).
      ...(core[0] >= 3
        ? {
            bottomStyle: at(BOTTOM_STYLES, 25),
            bottomColor: at(BOTTOM_COLORS, 26),
            shoeStyle: at(SHOE_STYLES, 27),
            shoeColor: at(SHOE_COLORS, 28),
          }
        : {}),
      character: {
        skinTone: core[1] / 255,
        // Round back to whole centimeters so a decoded height is
        // the exact double the user picked, not 1.5999999999999999.
        height: Math.round((HEIGHT_MIN + core[2] / 100) * 100) / 100,
        hairColor: at(HAIR_COLORS, 3),
        eyeColor: at(EYE_COLORS, 4),
        hairStyle: at(HAIR_STYLES, 5),
        ...face,
        ...bodyParams,
      },
    });
  }
  return null;
}
