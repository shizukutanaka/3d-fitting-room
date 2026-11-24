import { describe, expect, it } from 'vitest';
import { MotionGate, SHADOW_MOVE_EPS } from '../src/shadowgate';
import { XR_QUALITY_STEPS, nextXrQualityLevel, xrStartLevel } from '../src/vr';

describe('shadow map on demand: motion gate', () => {
  it('reports the first sample, then stays quiet while nothing moves', () => {
    const g = new MotionGate();
    expect(g.moved([0, 1, 2])).toBe(true);
    expect(g.moved([0, 1, 2])).toBe(false);
    expect(g.moved([0, 1 + SHADOW_MOVE_EPS / 2, 2])).toBe(false);
  });

  it('reports movement beyond the threshold', () => {
    const g = new MotionGate();
    g.moved([0, 1, 2]);
    expect(g.moved([0, 1, 2 + SHADOW_MOVE_EPS * 2])).toBe(true);
    expect(g.moved([0, 1, 2 + SHADOW_MOVE_EPS * 2])).toBe(false);
  });

  it('adds slow drift up against the last drawn state, not frame to frame', () => {
    const g = new MotionGate(0.01);
    g.moved([0]);
    let fired = 0;
    for (let i = 1; i <= 10; i++) if (g.moved([i * 0.004])) fired += 1;
    // 0.04 of drift in 0.004 steps crosses 0.01 three times.
    expect(fired).toBe(3);
  });

  it('a changed sample count (figure replaced) and reset() both report movement', () => {
    const g = new MotionGate();
    g.moved([0, 0, 0]);
    expect(g.moved([0, 0, 0, 0, 0, 0])).toBe(true);
    expect(g.moved([0, 0, 0, 0, 0, 0])).toBe(false);
    g.reset();
    expect(g.moved([0, 0, 0, 0, 0, 0])).toBe(true);
  });
});

describe('XR quality ladder: shadow steps', () => {
  it('has a 1024 px / PCF step right after the full-quality step, and never raises shadow cost further down', () => {
    expect(XR_QUALITY_STEPS[0]).toMatchObject({ shadows: true, shadowPx: 2048, shadowSoft: true });
    expect(XR_QUALITY_STEPS[1]).toMatchObject({ mirrorPx: 512, shadows: true, shadowPx: 1024, shadowSoft: false });
    for (let i = 1; i < XR_QUALITY_STEPS.length; i++) {
      expect(XR_QUALITY_STEPS[i].shadowPx).toBeLessThanOrEqual(XR_QUALITY_STEPS[i - 1].shadowPx);
      if (!XR_QUALITY_STEPS[i - 1].shadowSoft) expect(XR_QUALITY_STEPS[i].shadowSoft).toBe(false);
      if (!XR_QUALITY_STEPS[i - 1].shadows) expect(XR_QUALITY_STEPS[i].shadows).toBe(false);
    }
  });

  it('standalone headsets start on the 1024 px / PCF step; others at full quality', () => {
    const quest =
      'Mozilla/5.0 (X11; Linux x86_64; Quest 3) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0 Chrome/126.0 VR Safari/537.36';
    const desktop = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
    expect(xrStartLevel(quest)).toBe(1);
    expect(xrStartLevel(desktop)).toBe(0);
    expect(XR_QUALITY_STEPS[xrStartLevel(quest)].shadowPx).toBe(1024);
  });

  it('never recovers above the session floor, and still degrades from it', () => {
    expect(nextXrQualityLevel(1, 1, 1)).toBe(1);
    expect(nextXrQualityLevel(2, 1, 1)).toBe(1);
    expect(nextXrQualityLevel(1, 99, 1)).toBe(2);
    expect(nextXrQualityLevel(0, 12, 1)).toBe(1);
    // Without a floor the rule is unchanged.
    expect(nextXrQualityLevel(1, 1)).toBe(0);
  });
});
