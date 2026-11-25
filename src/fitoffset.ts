// Body-linked clothing fit offset (backlog #12).
//
// Builds on the static anti-clipping clearances from backlog #5
// (keepGarmentsOutside in avatar.ts): each clothing vertex records
// its nearest body normal, its body-part blend weights, and how much
// inward slack it has above #5's clearance floor. When body-shape
// parameters (shoulderWidth, bust, waist, hip, build) or extreme
// limb/torso bone proportions change, garments shift along the body
// normal in proportion to the regional shape change, scaled by
// per-part coefficients, without ever dropping below #5's floor.
//
// Pure math, no three.js dependency.

import type { BoneScales } from './bodyscale';
import type { CharacterParams } from './character';

export const FIT_PARTS = ['shoulder', 'chest', 'waist', 'hip', 'thigh', 'calf', 'default'] as const;
export type FitPart = (typeof FIT_PARTS)[number];
export const FIT_PART_COUNT = FIT_PARTS.length;

/** Outward normal offset (m) per unit of regional body-shape change.
 *  Tighter/articulated zones (shoulder, hip, chest, thigh) carry
 *  larger coefficients than lower-tension zones (calf, waist). */
export const FIT_PART_COEFFICIENTS: Readonly<Record<FitPart, number>> = {
  shoulder: 0.018,
  chest: 0.015,
  waist: 0.012,
  hip: 0.016,
  thigh: 0.015,
  calf: 0.01,
  default: 0.008,
};

/** Outer layers (jacket, cardigan, coat) expand slightly more than
 *  base tops so layered garments preserve their ordering as body
 *  girth increases. */
export const OUTER_FIT_MULTIPLIER = 1.25;

/** Upper bound (m) on the additional body-linked normal offset so
 *  stacked extreme parameters never balloon a garment. */
export const MAX_FIT_OFFSET_M = 0.018;

/** Per-garment immutable data captured once in keepGarmentsOutside(). */
export interface GarmentFitField {
  id: string;
  isOuter: boolean;
  /** Rest positions (garment local space) after #5 clearance push. */
  restPos: Float32Array;
  /** Outward body normal in garment local space (length = local units per 1 world m). */
  localNormal: Float32Array;
  /** Skin-blended part weights, FIT_PART_COUNT floats per vertex. */
  partWeights: Float32Array;
  /** Maximum inward pull (m) allowed before hitting #5's clearance floor. */
  maxInward: Float32Array;
}

const BONE_TO_PART: readonly [RegExp, FitPart][] = [
  [/Shoulder|UpperArm/i, 'shoulder'],
  [/Chest/i, 'chest'],
  [/^spine$/i, 'waist'],
  [/^hips$/i, 'hip'],
  [/UpperLeg/i, 'thigh'],
  [/LowerLeg/i, 'calf'],
];

/** Map a humanoid bone name to its fit-offset body part. */
export function fitPartForBone(boneName: string): FitPart {
  for (const [re, part] of BONE_TO_PART) {
    if (re.test(boneName)) return part;
  }
  return 'default';
}

export function fitPartIndex(part: FitPart): number {
  return FIT_PARTS.indexOf(part);
}

/** Excess non-uniform bone stretch beyond a 5% deadband, so default
 *  stature/proportions contribute 0 while extreme height or leg-ratio
 *  stretches add a modest positive clearance margin. */
function stretchMargin(scale: number | undefined): number {
  if (scale === undefined || !Number.isFinite(scale)) return 0;
  return Math.max(0, Math.abs(scale - 1) - 0.05) * 0.3;
}

/** Regional signed body-shape change for each body part.
 *  Returns 0 for every part at DEFAULT_CHARACTER with neutral scales. */
export function partShapeDeltas(
  c: Pick<CharacterParams, 'shoulderWidth' | 'waist' | 'hip' | 'bust' | 'build'>,
  scales?: BoneScales | null,
): Record<FitPart, number> {
  const build = c.build - 1;
  return {
    shoulder: (c.shoulderWidth - 1) + 0.5 * build + stretchMargin(scales?.upperArm),
    chest: (c.bust - 1) + 0.6 * build + stretchMargin(scales?.spine),
    waist: (c.waist - 1) + 0.6 * build + stretchMargin(scales?.spine),
    hip: (c.hip - 1) + 0.6 * build,
    thigh: 0.7 * build + 0.4 * (c.hip - 1) + stretchMargin(scales?.upperLeg),
    calf: 0.6 * build + stretchMargin(scales?.lowerLeg),
    default: 0.5 * build,
  };
}

/** Per-part normal offset in metres (length = FIT_PART_COUNT),
 *  ordered to match FIT_PARTS. */
export function computePartOffsets(
  c: Pick<CharacterParams, 'shoulderWidth' | 'waist' | 'hip' | 'bust' | 'build'>,
  scales?: BoneScales | null,
  isOuter = false,
): Float32Array {
  const deltas = partShapeDeltas(c, scales);
  const layerScale = isOuter ? OUTER_FIT_MULTIPLIER : 1;
  const out = new Float32Array(FIT_PART_COUNT);
  for (let p = 0; p < FIT_PART_COUNT; p++) {
    const part = FIT_PARTS[p];
    out[p] = deltas[part] * FIT_PART_COEFFICIENTS[part] * layerScale;
  }
  return out;
}

/** Apply body-linked normal offsets to a garment's vertex buffer.
 *  Positive offsets expand along the nearest body normal (capped at
 *  MAX_FIT_OFFSET_M); negative offsets pull inward by at most the
 *  vertex's maxInward slack so #5's clearance floor is never breached.
 *  Returns the maximum absolute offset applied (in metres). */
export function applyFitField(
  field: GarmentFitField,
  partOffsets: Float32Array,
  outPos: Float32Array,
): number {
  const { restPos, localNormal, partWeights, maxInward } = field;
  const count = maxInward.length;
  let maxApplied = 0;
  for (let i = 0; i < count; i++) {
    const wBase = i * FIT_PART_COUNT;
    let raw = 0;
    for (let p = 0; p < FIT_PART_COUNT; p++) {
      raw += partWeights[wBase + p] * partOffsets[p];
    }
    const clamped = Math.max(-maxInward[i], Math.min(MAX_FIT_OFFSET_M, raw));
    const abs = Math.abs(clamped);
    if (abs > maxApplied) maxApplied = abs;
    const vBase = 3 * i;
    outPos[vBase] = restPos[vBase] + localNormal[vBase] * clamped;
    outPos[vBase + 1] = restPos[vBase + 1] + localNormal[vBase + 1] * clamped;
    outPos[vBase + 2] = restPos[vBase + 2] + localNormal[vBase + 2] * clamped;
  }
  return maxApplied;
}
