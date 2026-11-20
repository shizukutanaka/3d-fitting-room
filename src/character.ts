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
  // ---- body (phase 3 reduced form: profile regeneration) ----
  // The silhouette-bearing subset of the body space, trimmed by
  // the same audit standard as the face (§5.8): only what reads
  // as "that person" in a shared still image survives. Shoulder
  // width, waist, hip, bust and overall build are independently
  // expressible in the profile/capsule body; muscle mass as a
  // separate axis was cut — smooth lathe geometry cannot express
  // muscle definition (that needs surface detail), so at this
  // fidelity muscle reads identically to girth and is absorbed
  // into `build`. Per LEGAL-ETHICS.md judgment J-04 there is no
  // gender label anywhere: these are continuous shape values, and
  // `bust` shapes only the clothed silhouette (profile radius at
  // chest heights) — no anatomical detail. The combination of
  // these values is fenced by the adult safety restriction
  // (CUS-0779) in sanitizeCharacter below.
  /** Shoulder width multiplier (shoulder joint placement). */
  shoulderWidth: number;
  /** Waist radius multiplier (torso profile at waist heights). */
  waist: number;
  /** Hip radius multiplier (torso base, pelvis, skirt line). */
  hip: number;
  /** Bust radius multiplier (torso profile at chest heights,
   *  clothed silhouette only — J-04). */
  bust: number;
  /** Overall build multiplier (girth of torso, limbs, neck). */
  build: number;
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

/** The body parameter keys, in seed-encoding order (seed.ts). */
export const BODY_PARAM_KEYS = [
  'shoulderWidth',
  'waist',
  'hip',
  'bust',
  'build',
] as const satisfies ReadonlyArray<keyof CharacterParams>;

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
  shoulderWidth: { kind: 'range', min: 0.88, max: 1.14, def: 1 },
  waist: { kind: 'range', min: 0.82, max: 1.22, def: 1 },
  hip: { kind: 'range', min: 0.86, max: 1.2, def: 1 },
  bust: { kind: 'range', min: 0.8, max: 1.3, def: 1 },
  build: { kind: 'range', min: 0.85, max: 1.2, def: 1 },
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
  shoulderWidth: 1,
  waist: 1,
  hip: 1,
  bust: 1,
  build: 1,
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
  const params = out as unknown as CharacterParams;
  applyAdultSafety(params);
  return params;
}

// ---- adult safety restriction (CUS-0779; LEGAL-ETHICS J-02) ----
// Judgment J-02 fixes the line: every person this app generates
// is an adult (apparent age 20+), and parameter *combinations*
// must not be able to produce a minor-like figure. Two layers
// enforce it, both structural:
//  1. Invariants no parameter can move: the head is not a
//     parameter and the height frame scales the whole body
//     uniformly, so the head-to-body ratio (~7.2 heads) is the
//     same at every setting; the height floor (1.45 m) is an
//     adult stature.
//  2. The combination rule below. No single trait makes a figure
//     read as a minor — short adults, flat-chested adults and
//     straight-figured adults all exist, and each trait alone
//     passes untouched. What reads as a minor is the *coincidence*
//     of youthward traits: short stature + undeveloped bust +
//     an undifferentiated (straight) waist–hip line + a slight
//     build + narrow shoulders. youthScore() weights that
//     coincidence; above YOUTH_SCORE_MAX, sanitize corrects the
//     combination back to the adult side, moving the secondary
//     traits toward their adult anchors only as far as needed
//     (bust first, then waist–hip differentiation, then build,
//     then shoulders). Height is never corrected: stature is a
//     legitimate adult trait, and the other levers always suffice
//     (their combined capacity 0.70 exceeds the maximum possible
//     excess 0.50). The correction lands in the sanitized state
//     itself, so it is observable everywhere the state is — the
//     sliders, the seed string, the state an LLM command reports.
// Because sanitizeCharacter is the single choke point for saved
// data, seeds, UI edits and LLM/agent commands alike, no path
// can route around the rule.

/** The highest youth score a sanitized character may carry. */
export const YOUTH_SCORE_MAX = 0.5;

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

/** How strongly a character's parameter combination points
 *  toward a minor-like reading, 0 (clearly adult) to 1 (every
 *  youthward signal at its extreme). See the block comment above
 *  for the design and the weights' rationale. */
export function youthScore(c: CharacterParams): number {
  const height = clamp01((1.66 - c.height) / 0.21);
  const bust = clamp01((1 - c.bust) / 0.2);
  const straight = clamp01(-(c.hip - c.waist) / 0.15);
  const build = clamp01((1 - c.build) / 0.15);
  const shoulder = clamp01((1 - c.shoulderWidth) / 0.12);
  return 0.3 * height + 0.25 * bust + 0.2 * straight + 0.15 * build + 0.1 * shoulder;
}

function rangeSpec(key: keyof CharacterParams): { min: number; max: number } {
  const spec = CHARACTER_PARAM_SPECS[key];
  if (spec.kind !== 'range') throw new Error(`${key} is not a range parameter`);
  return spec;
}

/** Correct a minor-like combination in place (see above). Each
 *  lever moves one trait toward its adult anchor by exactly the
 *  amount the remaining excess requires, in a fixed order, so
 *  the result is deterministic and minimal. */
function applyAdultSafety(c: CharacterParams): void {
  let excess = youthScore(c) - YOUTH_SCORE_MAX;
  if (excess <= 0) return;
  // Lever 1 — bust toward the anchor (1.0): the strongest
  // secondary trait, corrected first.
  const bustD = clamp01((1 - c.bust) / 0.2);
  if (bustD > 0) {
    c.bust = 1 - 0.2 * Math.max(0, bustD - excess / 0.25);
    excess = youthScore(c) - YOUTH_SCORE_MAX;
    if (excess <= 0) return;
  }
  // Lever 2 — waist–hip differentiation: raise the hip toward a
  // differentiated line (hip − waist ≥ −0.15·d), spending any
  // remainder on lowering an over-wide waist.
  const straightD = clamp01(-(c.hip - c.waist) / 0.15);
  if (straightD > 0) {
    const targetDiff = -0.15 * Math.max(0, straightD - excess / 0.2);
    let delta = targetDiff - (c.hip - c.waist);
    const hipMove = Math.min(Math.max(delta, 0), rangeSpec('hip').max - c.hip);
    c.hip += hipMove;
    delta -= hipMove;
    if (delta > 0) c.waist -= Math.min(delta, c.waist - rangeSpec('waist').min);
    excess = youthScore(c) - YOUTH_SCORE_MAX;
    if (excess <= 0) return;
  }
  // Lever 3 — build toward the anchor.
  const buildD = clamp01((1 - c.build) / 0.15);
  if (buildD > 0) {
    c.build = 1 - 0.15 * Math.max(0, buildD - excess / 0.15);
    excess = youthScore(c) - YOUTH_SCORE_MAX;
    if (excess <= 0) return;
  }
  // Lever 4 — shoulders toward the anchor.
  const shoulderD = clamp01((1 - c.shoulderWidth) / 0.12);
  if (shoulderD > 0) {
    c.shoulderWidth = 1 - 0.12 * Math.max(0, shoulderD - excess / 0.1);
    excess = youthScore(c) - YOUTH_SCORE_MAX;
    if (excess <= 0) return;
  }
  // Structurally unreachable with the spec ranges above (the
  // levers' combined capacity exceeds the maximum excess), kept
  // as a guarantee: fall back to the default body, whose score
  // is height-only (≤ 0.30).
  c.bust = DEFAULT_CHARACTER.bust;
  c.hip = DEFAULT_CHARACTER.hip;
  c.waist = DEFAULT_CHARACTER.waist;
  c.build = DEFAULT_CHARACTER.build;
  c.shoulderWidth = DEFAULT_CHARACTER.shoulderWidth;
}

// ---- body shape -> profile factors ----
// The body and its clothes are lathe profiles: a list of
// (radius, height) points. These factors are the single place
// where the body parameters become profile geometry, shared by
// the avatar (avatar.ts) and the clothing (items.ts) so a garment
// always wraps the same body the avatar has — that sharing is
// what "auto-fit" means in this architecture.

/** Radius multiplier for a torso profile point at absolute frame
 *  height y (meters), from the body parameters. Each regional
 *  parameter acts on its own height band with linear ramps
 *  between bands (the lathe spline smooths the rest); build acts
 *  on the whole torso at reduced strength. At the defaults the
 *  factor is exactly 1 at every height, so the pre-phase-3 body
 *  is reproduced unchanged. */
export function bodyRadiusFactor(y: number, c: CharacterParams): number {
  const hipW = y <= 0.9 ? 1 : y >= 1.02 ? 0 : (1.02 - y) / 0.12;
  const waistW =
    y <= 0.94 || y >= 1.17
      ? 0
      : y < 1.02
        ? (y - 0.94) / 0.08
        : y <= 1.08
          ? 1
          : (1.17 - y) / 0.09;
  const bustW =
    y <= 1.08 || y >= 1.335
      ? 0
      : y < 1.17
        ? (y - 1.08) / 0.09
        : y <= 1.25
          ? 1
          : (1.335 - y) / 0.085;
  const buildF = 1 + (c.build - 1) * 0.6;
  return buildF * (1 + (c.hip - 1) * hipW + (c.waist - 1) * waistW + (c.bust - 1) * bustW);
}

/** Girth multiplier for the legs (body and trousers alike):
 *  build at near-full strength, hip contributing at the thigh. */
export function legGirthFactor(c: CharacterParams): number {
  return 1 + (c.build - 1) * 0.7 + (c.hip - 1) * 0.25;
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
