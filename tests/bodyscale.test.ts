import { describe, expect, it } from 'vitest';
import {
  BODY_RATIOS,
  CROTCH_RATIO,
  DEFAULT_CALIBRATION,
  clampCalibration,
  describeLength,
  jointHeights,
  landmarks,
  LEG_RATIOS,
  loadCalibration,
  mapSourceHeight,
  saveCalibration,
  solveBoneScales,
  vrEyeHeight,
  type SourceJoints,
} from '../src/bodyscale';

// Mannequin A rest joints (tools/avatar-pipeline, female_joints.txt).
const SRC: SourceJoints = {
  height: 1.6413,
  ankle: 0.0819,
  knee: 0.4677,
  hipJoint: 0.8404,
  spine: 1.0172,
  shoulderJoint: 1.3255,
  head: 1.4361,
  crotch: 0.467 * 1.6413,
  upperArmLen: 0.3029,
  lowerArmLen: 0.4127,
};

describe('Body Scale Calibration', () => {
  it('uses the specified landmark ratios', () => {
    const lm = landmarks(1.7, 'standard');
    expect(lm.eye).toBeCloseTo(0.94 * 1.7, 6);
    expect(lm.shoulder).toBeCloseTo(0.82 * 1.7, 6);
    expect(lm.elbow).toBeCloseTo(0.63 * 1.7, 6);
    expect(lm.knee).toBeCloseTo(0.28 * 1.7, 6);
    expect(lm.fingertip).toBeCloseTo(0.38 * 1.7, 6);
    expect(BODY_RATIOS.shoulder - BODY_RATIOS.fingertip).toBeCloseTo(BODY_RATIOS.arm, 6);
    for (const leg of LEG_RATIOS) {
      expect(CROTCH_RATIO[leg]).toBeGreaterThanOrEqual(0.46);
      expect(CROTCH_RATIO[leg]).toBeLessThanOrEqual(0.48);
    }
  });

  it('places the VR eye at 94-95% of stature', () => {
    for (const h of [1.45, 1.65, 1.95]) {
      expect(vrEyeHeight(h) / h).toBeGreaterThanOrEqual(0.94);
      expect(vrEyeHeight(h) / h).toBeLessThanOrEqual(0.95);
    }
  });

  it('keeps the stature exact and moves joints to the targets', () => {
    for (const h of [1.45, 1.65, 1.8, 1.95]) {
      for (const leg of LEG_RATIOS) {
        const s = solveBoneScales(SRC, h, leg);
        const j = jointHeights(SRC, s);
        const lm = landmarks(h, leg);
        expect(j.top).toBeCloseTo(h, 6);
        expect(j.knee).toBeCloseTo(lm.knee, 6);
        expect(j.hipJoint - (SRC.hipJoint - SRC.crotch) * s.root).toBeCloseTo(lm.crotch, 6);
      }
    }
  });

  it('is not a uniform scale: the head grows slower than the body', () => {
    const tall = solveBoneScales(SRC, 1.95, 'standard');
    const headAbs = tall.root * tall.spine * tall.neck * tall.head;
    expect(headAbs).toBeLessThan(tall.root);
    expect(headAbs).toBeCloseTo(Math.sqrt(1.95 / SRC.height), 6);
  });

  it('leg ratio changes the inseam, not the stature', () => {
    const short = jointHeights(SRC, solveBoneScales(SRC, 1.7, 'short'));
    const long = jointHeights(SRC, solveBoneScales(SRC, 1.7, 'long'));
    expect(long.hipJoint - short.hipJoint).toBeCloseTo(0.02 * 1.7, 6);
    expect(long.top).toBeCloseTo(short.top, 6);
  });

  it('keeps every bone factor in a sane range', () => {
    for (const h of [1.45, 1.95]) {
      for (const leg of LEG_RATIOS) {
        const s = solveBoneScales(SRC, h, leg);
        for (const [name, v] of Object.entries(s)) {
          if (name === 'root') continue;
          expect(v, name).toBeGreaterThan(0.8);
          expect(v, name).toBeLessThan(1.25);
        }
      }
    }
  });

  it('describes garment lengths by the nearest landmark', () => {
    const lm = landmarks(1.6, 'standard');
    expect(describeLength(lm.knee + 0.05, lm)).toEqual({ landmark: 'knee', cm: 5 });
    expect(describeLength(lm.ankle - 0.01, lm)).toEqual({ landmark: 'ankle', cm: -1 });
    const s = solveBoneScales(SRC, 1.6, 'standard');
    expect(mapSourceHeight(SRC, s, SRC.knee)).toBeCloseTo(lm.knee, 6);
  });

  it('clamps and stores the calibration on the device only', () => {
    const mem = new Map<string, string>();
    const storage = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
    } as unknown as Storage;
    expect(loadCalibration(storage)).toBeNull();
    saveCalibration({ heightM: 2.4, legRatio: 'long', worldScale: 3 }, storage);
    expect(loadCalibration(storage)).toEqual({ heightM: 1.95, legRatio: 'long', worldScale: 1.1 });
    expect(clampCalibration({ legRatio: 'x' as never }).legRatio).toBe('standard');
  });

  it('is optional: an uncalibrated visit uses 170 cm, standard legs and true world scale', () => {
    expect(DEFAULT_CALIBRATION).toEqual({ heightM: 1.7, legRatio: 'standard', worldScale: 1 });
    expect(clampCalibration({})).toEqual(DEFAULT_CALIBRATION);
  });
});
