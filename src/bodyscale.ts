// Body Scale Calibration (身体スケール校正).
//
// The user enters their height (required), optionally one of three
// leg ratios, and optionally a VR world-scale trim. The mannequin is
// then re-proportioned by moving its joints — knee, hip joint,
// shoulder, elbow — to the target landmark ratios, not by scaling the
// whole figure uniformly. The head grows with the square root of the
// height change (tall adults do not have proportionally larger
// heads), and the torso absorbs the difference.
//
// Pure math, no three.js: avatar.ts turns the factors into bone
// scales, and the UI uses the landmark heights to describe garment
// lengths ("膝上 5 cm").

export type LegRatio = 'short' | 'standard' | 'long';
export const LEG_RATIOS: readonly LegRatio[] = ['short', 'standard', 'long'];

/** Approximate landmark heights as a fraction of stature. Crotch
 *  (inseam) depends on the leg-ratio choice. */
export const BODY_RATIOS = {
  eye: 0.94,
  shoulder: 0.82,
  elbow: 0.63,
  fingertip: 0.38,
  arm: 0.44,
  knee: 0.28,
} as const;
export const CROTCH_RATIO: Record<LegRatio, number> = { short: 0.46, standard: 0.47, long: 0.48 };
/** Waist (narrowest torso level) and ankle: used only to describe
 *  garment lengths. */
const WAIST_RATIO = 0.6;
const ANKLE_RATIO = 0.04;

/** VR eye height: the headset is placed at ~94.5% of stature. */
export const VR_EYE_RATIO = 0.945;
export const WORLD_SCALE_MIN = 0.9;
export const WORLD_SCALE_MAX = 1.1;

export interface BodyCalibration {
  heightM: number;
  legRatio: LegRatio;
  /** VR world-scale trim (1 = true scale). */
  worldScale: number;
}

export const DEFAULT_CALIBRATION: BodyCalibration = {
  heightM: 1.65,
  legRatio: 'standard',
  worldScale: 1,
};

/** Rest-pose joint heights of a source mannequin in metres (the
 *  armature's vertical joint chain), measured from its GLB. */
export interface SourceJoints {
  height: number;
  ankle: number;
  knee: number;
  hipJoint: number;
  spine: number;
  shoulderJoint: number;
  head: number;
  /** Crotch height of the source mesh (inseam). */
  crotch: number;
  upperArmLen: number;
  lowerArmLen: number;
}

/** Uniform scale factors per bone, relative to the parent bone
 *  (so they can be assigned to bone.scale directly). */
export interface BoneScales {
  root: number;
  upperLeg: number;
  lowerLeg: number;
  foot: number;
  spine: number;
  neck: number;
  head: number;
  shoulder: number;
  upperArm: number;
  lowerArm: number;
  hand: number;
}

export interface Landmarks {
  height: number;
  eye: number;
  shoulder: number;
  elbow: number;
  waist: number;
  crotch: number;
  knee: number;
  ankle: number;
  fingertip: number;
}

export function clampCalibration(c: Partial<BodyCalibration>): BodyCalibration {
  const h = Number.isFinite(c.heightM) ? (c.heightM as number) : DEFAULT_CALIBRATION.heightM;
  const w = Number.isFinite(c.worldScale) ? (c.worldScale as number) : 1;
  return {
    heightM: Math.min(1.95, Math.max(1.45, h)),
    legRatio: LEG_RATIOS.includes(c.legRatio as LegRatio) ? (c.legRatio as LegRatio) : 'standard',
    worldScale: Math.min(WORLD_SCALE_MAX, Math.max(WORLD_SCALE_MIN, w)),
  };
}

/** Target landmark heights in metres for a stature and leg ratio. */
export function landmarks(heightM: number, leg: LegRatio): Landmarks {
  const c = CROTCH_RATIO[leg];
  return {
    height: heightM,
    eye: BODY_RATIOS.eye * heightM,
    shoulder: BODY_RATIOS.shoulder * heightM,
    elbow: BODY_RATIOS.elbow * heightM,
    waist: WAIST_RATIO * heightM,
    crotch: c * heightM,
    // The knee follows the leg: longer legs put it higher.
    knee: BODY_RATIOS.knee * (c / CROTCH_RATIO.standard) * heightM,
    ankle: ANKLE_RATIO * heightM,
    fingertip: BODY_RATIOS.fingertip * heightM,
  };
}

export function vrEyeHeight(heightM: number): number {
  return VR_EYE_RATIO * heightM;
}

/** Solve the per-bone scales that move the source joints onto the
 *  target landmarks while keeping the stature exact. */
export function solveBoneScales(src: SourceJoints, heightM: number, leg: LegRatio): BoneScales {
  const k = heightM / src.height;
  const lm = landmarks(heightM, leg);
  const root = k;
  // The hip joint keeps its offset above the crotch landmark.
  // offsets from the crotch / knee landmark of the source.
  const kneeT = lm.knee;
  const hipT = lm.crotch + (src.hipJoint - src.crotch) * k;
  const ankleT = src.ankle * root;
  const lowerLeg = (kneeT - ankleT) / ((src.knee - src.ankle) * root);
  const upperLeg = (hipT - kneeT) / ((src.hipJoint - src.knee) * root);
  // Head grows with sqrt(k); the neck keeps the root scale.
  const headAbs = Math.sqrt(k);
  const headLen = (src.height - src.head) * headAbs;
  const neckLen = (src.head - src.shoulderJoint) * root;
  const shoulderT = heightM - headLen - neckLen;
  const pelvis = (src.spine - src.hipJoint) * root;
  const spine = (shoulderT - hipT - pelvis) / ((src.shoulderJoint - src.spine) * root);
  // Arms: upper arm shoulder→elbow, forearm+hand elbow→fingertip.
  const upperArmT = (BODY_RATIOS.shoulder - BODY_RATIOS.elbow) * heightM;
  const lowerArmT = (BODY_RATIOS.elbow - BODY_RATIOS.fingertip) * heightM;
  const ua = upperArmT / (src.upperArmLen * root);
  const la = lowerArmT / (src.lowerArmLen * root);
  return {
    root,
    upperLeg,
    lowerLeg: lowerLeg / upperLeg,
    foot: 1 / lowerLeg,
    spine,
    neck: 1 / spine,
    head: headAbs / root,
    shoulder: 1 / spine,
    upperArm: ua,
    lowerArm: la / ua,
    hand: 1 / la,
  };
}

/** Joint heights produced by a set of bone scales (the forward model
 *  of solveBoneScales; used by tests and the garment-length map). */
export function jointHeights(src: SourceJoints, s: BoneScales): Record<'ankle' | 'knee' | 'hipJoint' | 'spine' | 'shoulderJoint' | 'head' | 'top', number> {
  const r = s.root;
  const ankle = src.ankle * r;
  const knee = ankle + (src.knee - src.ankle) * r * s.upperLeg * s.lowerLeg;
  const hipJoint = knee + (src.hipJoint - src.knee) * r * s.upperLeg;
  const spine = hipJoint + (src.spine - src.hipJoint) * r;
  const shoulderJoint = spine + (src.shoulderJoint - src.spine) * r * s.spine;
  const head = shoulderJoint + (src.head - src.shoulderJoint) * r * s.spine * s.neck;
  const top = head + (src.height - src.head) * r * s.spine * s.neck * s.head;
  return { ankle, knee, hipJoint, spine, shoulderJoint, head, top };
}

/** Map a height on the source mannequin (metres) to the calibrated
 *  body, piecewise-linearly along the joint chain. */
export function mapSourceHeight(src: SourceJoints, s: BoneScales, y: number): number {
  const j = jointHeights(src, s);
  const from = [0, src.ankle, src.knee, src.hipJoint, src.spine, src.shoulderJoint, src.head, src.height];
  const to = [0, j.ankle, j.knee, j.hipJoint, j.spine, j.shoulderJoint, j.head, j.top];
  if (y <= 0) return 0;
  for (let i = 1; i < from.length; i++) {
    if (y <= from[i]) {
      const t = (y - from[i - 1]) / (from[i] - from[i - 1]);
      return to[i - 1] + (to[i] - to[i - 1]) * t;
    }
  }
  return to[to.length - 1] * (y / src.height);
}

export type LandmarkId = 'ankle' | 'knee' | 'crotch' | 'waist';
export interface LengthLabel {
  landmark: LandmarkId;
  /** Positive: above the landmark; negative: below. Whole cm. */
  cm: number;
}

/** Describe a hem height relative to the nearest body landmark. */
export function describeLength(hemY: number, lm: Landmarks): LengthLabel {
  const ids: LandmarkId[] = ['ankle', 'knee', 'crotch', 'waist'];
  let best: LandmarkId = 'knee';
  let bestD = Infinity;
  for (const id of ids) {
    const d = Math.abs(hemY - lm[id]);
    if (d < bestD) {
      bestD = d;
      best = id;
    }
  }
  return { landmark: best, cm: Math.round((hemY - lm[best]) * 100) };
}

const STORAGE_KEY = 'fittingRoom.bodyScale.v1';

/** Calibration lives only in this device's localStorage. */
export function loadCalibration(storage: Storage | undefined = globalThis.localStorage): BodyCalibration | null {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return null;
    return clampCalibration(JSON.parse(raw) as Partial<BodyCalibration>);
  } catch {
    return null;
  }
}

export function saveCalibration(c: BodyCalibration, storage: Storage | undefined = globalThis.localStorage): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(clampCalibration(c)));
  } catch {
    // storage full or disabled: calibration stays in memory only
  }
}
