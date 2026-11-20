// The character parameter vector — phase 0 of the character
// generation system (see docs/CHARACTER-SYSTEM.md). This module is
// the single source of truth for who the avatar is: every parameter
// has a type, a range or option list, and a default, declared once
// in CHARACTER_PARAM_SPECS. Sanitizing, seed encoding and the UI
// all derive from these specs so they can never drift apart.
//
// Everything is plain data, generated on-device from code — no
// external assets, nothing leaves the device (product invariants).

export type HairStyleId = 'bob' | 'long' | 'short' | 'ponytail' | 'bun';

export const HAIR_STYLES: HairStyleId[] = ['bob', 'long', 'short', 'ponytail', 'bun'];

/** Natural hair colors (hex). The avatar's brows follow this too. */
export const HAIR_COLORS = [
  '#201612',
  '#3a2417',
  '#503729',
  '#7a4a26',
  '#8c3b22',
  '#a97c50',
  '#d9b380',
  '#b9b4ad',
] as const;

/** Eye colors (hex). */
export const EYE_COLORS = [
  '#2e2019',
  '#5a3a1e',
  '#7a5a26',
  '#46684a',
  '#3d5a80',
  '#707880',
] as const;

export interface CharacterParams {
  /** Skin tone as a continuous Fitzpatrick value: 0 = type I,
   *  1 = type VI. Mapped to a color by skinColorForTone(). */
  skinTone: number;
  hairColor: string;
  eyeColor: string;
  hairStyle: HairStyleId;
  /** Height in meters. The avatar is regenerated from the
   *  parameter vector whenever this changes. */
  height: number;
  // ---- face (phase 2, first batch) ----
  // The identity-bearing subset of the face space, per the
  // 2026-11-20 plan audit (CHARACTER-SYSTEM.md §5.8): only
  // parameters the lathe head can express as transforms of its
  // parts. The defaults reproduce the pre-phase-2 fixed face,
  // with one deliberate exception: asymmetry defaults to a small
  // non-zero value, so the default face is subtly non-symmetric
  // like a real one (the offsets are millimetre-scale). All of them
  // are continuous feature values — there is deliberately no
  // lineage/ethnicity parameter anywhere in this vector
  // (LEGAL-ETHICS.md judgment J-01).
  /** Eyeball size multiplier. */
  eyeSize: number;
  /** Eye spacing multiplier (distance from the midline). */
  eyeSpacing: number;
  /** Eye vertical offset, meters (head-local). */
  eyeHeight: number;
  /** Eyeball vertical squash: low = almond, high = round. */
  eyeShape: number;
  /** Eye tilt in radians; positive raises the outer corners. */
  eyeTilt: number;
  /** Brow vertical offset, meters (head-local). */
  browHeight: number;
  /** Brow tilt in radians; positive raises the outer ends. */
  browTilt: number;
  /** Nose width multiplier. */
  noseWidth: number;
  /** Nose prominence (depth) multiplier. */
  noseProminence: number;
  /** Mouth width multiplier. */
  lipWidth: number;
  /** Lip fullness multiplier. */
  lipFullness: number;
  /** Face width multiplier (skull horizontal scale). */
  faceWidth: number;
  /** Strength of the fixed natural asymmetry pattern (real faces
   *  are not symmetric; a single knob instead of per-parameter
   *  delta axes — see the §5.8 audit). 0 = perfectly symmetric. */
  asymmetry: number;
}

/** The face parameter keys, in seed-encoding order (seed.ts). */
export const FACE_PARAM_KEYS = [
  'eyeSize',
  'eyeSpacing',
  'eyeHeight',
  'eyeShape',
  'eyeTilt',
  'browHeight',
  'browTilt',
  'noseWidth',
  'noseProminence',
  'lipWidth',
  'lipFullness',
  'faceWidth',
  'asymmetry',
] as const satisfies ReadonlyArray<keyof CharacterParams>;

type ParamSpec =
  | { kind: 'range'; min: number; max: number; def: number }
  | { kind: 'palette'; options: readonly string[]; def: string }
  | { kind: 'enum'; options: readonly string[]; def: string };

/** The single source of truth: ranges, options and defaults. */
export const CHARACTER_PARAM_SPECS: Record<keyof CharacterParams, ParamSpec> = {
  skinTone: { kind: 'range', min: 0, max: 1, def: 0.28 },
  hairColor: { kind: 'palette', options: HAIR_COLORS, def: '#503729' },
  eyeColor: { kind: 'palette', options: EYE_COLORS, def: '#2e2019' },
  hairStyle: { kind: 'enum', options: HAIR_STYLES, def: 'bob' },
  height: { kind: 'range', min: 1.45, max: 1.95, def: 1.74 },
  eyeSize: { kind: 'range', min: 0.8, max: 1.25, def: 1 },
  eyeSpacing: { kind: 'range', min: 0.85, max: 1.18, def: 1 },
  eyeHeight: { kind: 'range', min: -0.01, max: 0.01, def: 0 },
  eyeShape: { kind: 'range', min: 0.55, max: 0.95, def: 0.74 },
  eyeTilt: { kind: 'range', min: -0.2, max: 0.2, def: 0 },
  browHeight: { kind: 'range', min: -0.008, max: 0.008, def: 0 },
  browTilt: { kind: 'range', min: -0.25, max: 0.25, def: 0 },
  noseWidth: { kind: 'range', min: 0.75, max: 1.35, def: 1 },
  noseProminence: { kind: 'range', min: 0.7, max: 1.4, def: 1 },
  lipWidth: { kind: 'range', min: 0.75, max: 1.3, def: 1 },
  lipFullness: { kind: 'range', min: 0.6, max: 1.6, def: 1 },
  faceWidth: { kind: 'range', min: 0.9, max: 1.1, def: 1 },
  asymmetry: { kind: 'range', min: 0, max: 1, def: 0.35 },
};

export const SKIN_TONE_MIN = 0;
export const SKIN_TONE_MAX = 1;
export const HEIGHT_MIN = 1.45;
export const HEIGHT_MAX = 1.95;
/** The height the avatar's proportions were designed at. */
export const BASE_HEIGHT = 1.74;

export const DEFAULT_CHARACTER: CharacterParams = {
  skinTone: 0.28,
  hairColor: '#503729',
  eyeColor: '#2e2019',
  hairStyle: 'bob',
  height: 1.74,
  eyeSize: 1,
  eyeSpacing: 1,
  eyeHeight: 0,
  eyeShape: 0.74,
  eyeTilt: 0,
  browHeight: 0,
  browTilt: 0,
  noseWidth: 1,
  noseProminence: 1,
  lipWidth: 1,
  lipFullness: 1,
  faceWidth: 1,
  asymmetry: 0.35,
};

function clampRange(value: unknown, spec: { min: number; max: number; def: number }): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return spec.def;
  return Math.min(spec.max, Math.max(spec.min, value));
}

function oneOfString(value: unknown, options: readonly string[], def: string): string {
  return typeof value === 'string' && options.includes(value) ? value : def;
}

/** Validate unknown data (parsed JSON, seed payloads) into a
 *  complete CharacterParams. Missing or invalid fields fall back
 *  to the spec defaults — this is what lets pre-character saves
 *  (which have no character data at all) load unchanged, and what
 *  lets a v1 seed (no face fields) decode to the default face.
 *  The loop is driven by CHARACTER_PARAM_SPECS so a parameter
 *  added to the specs is sanitized here automatically. */
export function sanitizeCharacter(raw: unknown): CharacterParams {
  if (typeof raw !== 'object' || raw === null) return { ...DEFAULT_CHARACTER };
  const o = raw as Record<string, unknown>;
  const out: Record<string, unknown> = { ...DEFAULT_CHARACTER };
  for (const [name, spec] of Object.entries(CHARACTER_PARAM_SPECS)) {
    out[name] =
      spec.kind === 'range'
        ? clampRange(o[name], spec)
        : oneOfString(o[name], spec.options, spec.def);
  }
  return out as unknown as CharacterParams;
}

// ---- skin tone -> color ----

/** Representative sRGB anchors for Fitzpatrick types I..VI. */
const SKIN_ANCHORS: Array<[number, number, number]> = [
  [255, 223, 196], // I
  [240, 197, 151], // II
  [224, 172, 105], // III
  [198, 134, 66], // IV
  [141, 85, 36], // V
  [92, 56, 40], // VI
];

const FITZPATRICK_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI'] as const;

/** Continuous Fitzpatrick value (0..1) -> skin material color.
 *  Piecewise-linear between the six anchors, so a slider moves
 *  through the scale smoothly instead of snapping between swatches. */
export function skinColorForTone(t: number): string {
  const x = Math.min(1, Math.max(0, t)) * (SKIN_ANCHORS.length - 1);
  const i = Math.min(SKIN_ANCHORS.length - 2, Math.floor(x));
  const f = x - i;
  const a = SKIN_ANCHORS[i];
  const b = SKIN_ANCHORS[i + 1];
  const ch = (n: number) => Math.round(a[n] + (b[n] - a[n]) * f);
  const hex = (n: number) => ch(n).toString(16).padStart(2, '0');
  return `#${hex(0)}${hex(1)}${hex(2)}`;
}

/** Nearest Fitzpatrick roman numeral for a continuous value —
 *  shown next to the skin slider so the scale stays legible. */
export function fitzpatrickLabel(t: number): string {
  const idx = Math.min(5, Math.max(0, Math.floor(Math.min(1, Math.max(0, t)) * 6)));
  return FITZPATRICK_LABELS[idx];
}
