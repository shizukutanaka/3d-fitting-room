import { describe, expect, it } from 'vitest';
import {
  ACCESSORIES,
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  GLASSES,
  HATS,
  OUTER_COLORS,
  OUTER_STYLES,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
} from '../src/outfit';
import {
  META_WEB_LAUNCH_BASE,
  SNAP_TURN_RADIANS,
  VR_PANEL_POSITION,
  XR_FRAME_BUDGET_MS,
  XR_QUALITY_STEPS,
  XR_VIEWPORT_SCALE_MIN,
  XR_VIEWPORT_SCALE_RISE,
  buildWebLaunchUrl,
  nextXrQualityLevelAfterScale,
  nextXrViewportScale,
  shouldOfferWebLaunch,
  XR_RECOVER_MS,
  buildVrCategories,
  nextXrQualityLevel,
  outfitPatchForAction,
  parseVrActionId,
  snapTurnTransform,
  vrActionId,
  vrItemLabelKey,
  type VrAction,
} from '../src/vr';

// The VR panel's pure logic: categories are the outfit catalogs
// (so wardrobe growth flows onto the panel by itself), action
// ids round-trip, patches are catalog-validated, and the snap
// turn orbits the podium without drifting.

describe('VR categories are built from the outfit catalogs', () => {
  const categories = buildVrCategories();
  const byId = new Map(categories.map((c) => [c.id, c]));

  it('covers every catalog, with its colors where the catalog has them', () => {
    expect(byId.get('tops')?.items).toEqual(TOP_STYLES);
    expect(byId.get('tops')?.colors).toEqual(TOP_COLORS);
    expect(byId.get('outer')?.items).toEqual(OUTER_STYLES);
    expect(byId.get('outer')?.colors).toEqual(OUTER_COLORS);
    expect(byId.get('bottoms')?.items).toEqual(BOTTOM_STYLES);
    expect(byId.get('bottoms')?.colors).toEqual(BOTTOM_COLORS);
    expect(byId.get('shoes')?.items).toEqual(SHOE_STYLES);
    expect(byId.get('shoes')?.colors).toEqual(SHOE_COLORS);
    expect(byId.get('hat')?.items).toEqual(HATS);
    expect(byId.get('glasses')?.items).toEqual(GLASSES);
    expect(byId.get('accessory')?.items).toEqual(ACCESSORIES);
    expect(byId.get('pose')?.items).toEqual(POSES);
  });

  it('splits the panel into a clothes page and an extras page', () => {
    expect(categories.filter((c) => c.page === 0).map((c) => c.id)).toEqual([
      'tops',
      'outer',
      'bottoms',
      'shoes',
    ]);
    expect(categories.filter((c) => c.page === 1).map((c) => c.id)).toEqual([
      'hat',
      'glasses',
      'accessory',
      'pose',
    ]);
  });

  it('labels items through the same i18n keys as the flat UI', () => {
    const tops = byId.get('tops')!;
    expect(vrItemLabelKey(tops, 'dress')).toBe('top.dress');
    const bottoms = byId.get('bottoms')!;
    expect(vrItemLabelKey(bottoms, 'none')).toBe('item.none');
    expect(vrItemLabelKey(bottoms, 'skirt')).toBe('bottom.skirt');
  });
});

describe('VR action ids', () => {
  const roundTrips: VrAction[] = [
    { type: 'field', field: 'topStyle', value: 'dress' },
    { type: 'field', field: 'outerStyle', value: 'coat' },
    { type: 'field', field: 'pose', value: 'wave' },
    { type: 'color', field: 'topColor', value: '#ff8fab' },
    { type: 'color', field: 'outerColor', value: '#2c3a55' },
    { type: 'look', id: 'labc-1-xyz' },
    { type: 'photo' },
    { type: 'turn', dir: 1 },
    { type: 'turn', dir: -1 },
    { type: 'page', page: 0 },
    { type: 'page', page: 1 },
  ];

  it('round-trip through their string ids', () => {
    for (const action of roundTrips) {
      expect(parseVrActionId(vrActionId(action))).toEqual(action);
    }
  });

  it('rejects ids that are not actions', () => {
    for (const bad of ['', 'x', 'f:', 'f:nope:dress', 'c:nope:#fff', 'turn:2', 'page:3', 'look:']) {
      expect(parseVrActionId(bad)).toBeNull();
    }
  });
});

describe('outfit patches from VR actions', () => {
  const categories = buildVrCategories();

  it('turns catalog values into patches', () => {
    expect(
      outfitPatchForAction({ type: 'field', field: 'topStyle', value: 'dress' }, categories),
    ).toEqual({ topStyle: 'dress' });
    expect(
      outfitPatchForAction({ type: 'field', field: 'pose', value: 'peace' }, categories),
    ).toEqual({ pose: 'peace' });
    expect(
      outfitPatchForAction({ type: 'color', field: 'shoeColor', value: '#26262b' }, categories),
    ).toEqual({ shoeColor: '#26262b' });
  });

  it('refuses values outside the catalogs (a stale id is a no-op)', () => {
    expect(
      outfitPatchForAction({ type: 'field', field: 'topStyle', value: 'tuxedo' }, categories),
    ).toBeNull();
    expect(
      outfitPatchForAction({ type: 'color', field: 'topColor', value: '#000000' }, categories),
    ).toBeNull();
    // A top color is not a shoe color: fields do not cross.
    expect(
      outfitPatchForAction({ type: 'color', field: 'shoeColor', value: '#ff8fab' }, categories),
    ).toBeNull();
  });

  it('host-level actions have no outfit patch', () => {
    expect(outfitPatchForAction({ type: 'photo' }, categories)).toBeNull();
    expect(outfitPatchForAction({ type: 'turn', dir: 1 }, categories)).toBeNull();
    expect(outfitPatchForAction({ type: 'look', id: 'x' }, categories)).toBeNull();
    expect(outfitPatchForAction({ type: 'page', page: 1 }, categories)).toBeNull();
  });
});

describe('snap turn', () => {
  it('rotates the yaw by one step per press', () => {
    const start = { x: 0, z: 1.9, yaw: 0 };
    const once = snapTurnTransform(start, 1);
    expect(once.yaw).toBeCloseTo(SNAP_TURN_RADIANS, 10);
    const back = snapTurnTransform(once, -1);
    expect(back.yaw).toBeCloseTo(0, 10);
    expect(back.x).toBeCloseTo(start.x, 10);
    expect(back.z).toBeCloseTo(start.z, 10);
  });

  it('orbits the podium: distance to the pivot is preserved', () => {
    let cur = { x: 0, z: 1.9, yaw: 0 };
    for (let i = 0; i < 8; i++) {
      cur = snapTurnTransform(cur, 1);
      expect(Math.hypot(cur.x, cur.z)).toBeCloseTo(1.9, 10);
    }
    // Eight 45° steps are a full circle: back at the spawn.
    expect(cur.x).toBeCloseTo(0, 8);
    expect(cur.z).toBeCloseTo(1.9, 8);
    expect(cur.yaw % (Math.PI * 2)).toBeCloseTo(0, 8);
  });

  it('a quarter orbit lands beside the podium, facing it', () => {
    const side = snapTurnTransform(snapTurnTransform({ x: 0, z: 1.9, yaw: 0 }, 1), 1);
    expect(side.x).toBeCloseTo(1.9, 10);
    expect(side.z).toBeCloseTo(0, 10);
    expect(side.yaw).toBeCloseTo(Math.PI / 2, 10);
  });
});

describe('XR quality ladder (WORLD-CLASS M2)', () => {
  it('degrades in the prescribed order: mirror size, mirror off, foveation up, shadows off', () => {
    const sizes = XR_QUALITY_STEPS.map((s) => s.mirrorPx ?? 0);
    for (let i = 1; i < sizes.length; i++) expect(sizes[i]).toBeLessThanOrEqual(sizes[i - 1]);
    const foveation = XR_QUALITY_STEPS.map((s) => s.foveation);
    for (let i = 1; i < foveation.length; i++) expect(foveation[i]).toBeGreaterThanOrEqual(foveation[i - 1]);
    expect(XR_QUALITY_STEPS[0].shadows).toBe(true);
    expect(XR_QUALITY_STEPS[XR_QUALITY_STEPS.length - 1].shadows).toBe(false);
    // The session-start step is the fullest quality the ladder knows.
    expect(XR_QUALITY_STEPS[0].mirrorPx).toBe(512);
  });

  it('steps down one level per over-budget window, and stops at the floor', () => {
    expect(nextXrQualityLevel(0, XR_FRAME_BUDGET_MS + 2)).toBe(1);
    expect(nextXrQualityLevel(1, 20)).toBe(2);
    const last = XR_QUALITY_STEPS.length - 1;
    expect(nextXrQualityLevel(last, 40)).toBe(last);
  });

  it('steps back up only with real headroom, and stops at the top', () => {
    expect(nextXrQualityLevel(2, XR_RECOVER_MS - 1)).toBe(1);
    expect(nextXrQualityLevel(0, 4)).toBe(0);
  });

  it('holds inside the hysteresis band', () => {
    const mid = (XR_FRAME_BUDGET_MS + XR_RECOVER_MS) / 2;
    expect(nextXrQualityLevel(1, mid)).toBe(1);
    expect(nextXrQualityLevel(1, XR_FRAME_BUDGET_MS)).toBe(1);
    expect(nextXrQualityLevel(1, XR_RECOVER_MS)).toBe(1);
  });

  it('clamps an out-of-range current level instead of escaping the table', () => {
    expect(nextXrQualityLevel(99, 20)).toBe(XR_QUALITY_STEPS.length - 1);
    expect(nextXrQualityLevel(-3, 4)).toBe(0);
  });
});

describe('panel placement', () => {
  it('stands inside the room, off the podium, at ray height', () => {
    // Room bounds from scene.ts: floor 13×10 centered z=0.6,
    // walls at x=±4.6, z=-2.6 and z=5.5, height 3.8.
    expect(Math.abs(VR_PANEL_POSITION.x)).toBeLessThan(4.6);
    expect(VR_PANEL_POSITION.z).toBeGreaterThan(-2.6);
    expect(VR_PANEL_POSITION.z).toBeLessThan(5.5);
    expect(VR_PANEL_POSITION.y).toBeGreaterThan(0.5);
    expect(VR_PANEL_POSITION.y).toBeLessThan(3.8);
    // Not on the podium (radius ~1.14 around the origin).
    expect(Math.hypot(VR_PANEL_POSITION.x, VR_PANEL_POSITION.z)).toBeGreaterThan(1.2);
  });
});

describe('XR dynamic resolution (viewport scale ahead of the ladder)', () => {
  it('takes the browser recommendation when there is one, clamped', () => {
    expect(nextXrViewportScale(1, 4, 0.8)).toBe(0.8);
    expect(nextXrViewportScale(0.6, 40, 1)).toBe(1);
    expect(nextXrViewportScale(1, 4, 0.2)).toBe(XR_VIEWPORT_SCALE_MIN);
    expect(nextXrViewportScale(1, 4, 3)).toBe(1);
  });

  it('ignores a missing or unusable recommendation', () => {
    for (const r of [undefined, null, 0, NaN, -1]) {
      expect(nextXrViewportScale(0.8, XR_FRAME_BUDGET_MS, r)).toBe(0.8);
    }
  });

  it('drops by the square root of the overrun, down to the minimum', () => {
    expect(nextXrViewportScale(1, XR_FRAME_BUDGET_MS * 1.44)).toBeCloseTo(1 / 1.2, 6);
    expect(nextXrViewportScale(0.8, XR_FRAME_BUDGET_MS * 4)).toBe(XR_VIEWPORT_SCALE_MIN);
    expect(nextXrViewportScale(XR_VIEWPORT_SCALE_MIN, 100)).toBe(XR_VIEWPORT_SCALE_MIN);
  });

  it('rises a step at a time with real headroom, up to 1, and holds in between', () => {
    expect(nextXrViewportScale(0.7, XR_RECOVER_MS - 1)).toBeCloseTo(0.7 + XR_VIEWPORT_SCALE_RISE, 6);
    expect(nextXrViewportScale(0.98, 2)).toBe(1);
    const mid = (XR_FRAME_BUDGET_MS + XR_RECOVER_MS) / 2;
    expect(nextXrViewportScale(0.7, mid)).toBe(0.7);
  });

  it('keeps the ladder as the last resort', () => {
    // Over budget: no step down while resolution can still give.
    expect(nextXrQualityLevelAfterScale(1, 20, 1, 0.8)).toBe(1);
    expect(nextXrQualityLevelAfterScale(1, 20, 1, XR_VIEWPORT_SCALE_MIN)).toBe(2);
    // Headroom: no step up until resolution is back at 1.
    expect(nextXrQualityLevelAfterScale(3, 4, 1, 0.8)).toBe(3);
    expect(nextXrQualityLevelAfterScale(3, 4, 1, 1)).toBe(2);
    expect(nextXrQualityLevelAfterScale(1, 4, 1, 1)).toBe(1);
    // An out-of-range level is still clamped.
    expect(nextXrQualityLevelAfterScale(99, 20, 0, 0.8)).toBe(XR_QUALITY_STEPS.length - 1);
  });
});

describe('Meta Web Launch (backlog #14)', () => {
  it('encodes an HTTPS experience URL onto Meta Web Launch', () => {
    const target = 'https://shizukutanaka.github.io/3d-fitting-room/?diag=1';
    const launch = buildWebLaunchUrl(target);
    expect(launch).not.toBeNull();
    const parsed = new URL(launch!);
    expect(parsed.origin + parsed.pathname).toBe(META_WEB_LAUNCH_BASE);
    expect(parsed.searchParams.get('url')).toBe(target);
  });

  it('rejects non-HTTPS and malformed URLs', () => {
    expect(buildWebLaunchUrl('http://localhost:5173/')).toBeNull();
    expect(buildWebLaunchUrl('http://example.com/')).toBeNull();
    expect(buildWebLaunchUrl('file:///index.html')).toBeNull();
    expect(buildWebLaunchUrl('not a url')).toBeNull();
  });

  it('offers Web Launch only when immersive-vr is unavailable on an HTTPS page', () => {
    const httpsPage = 'https://shizukutanaka.github.io/3d-fitting-room/';
    expect(shouldOfferWebLaunch('unsupported', httpsPage)).toBe(buildWebLaunchUrl(httpsPage));
    expect(shouldOfferWebLaunch('supported', httpsPage)).toBeNull();
    expect(shouldOfferWebLaunch('unknown', httpsPage)).toBeNull();
    expect(shouldOfferWebLaunch('unsupported', 'http://127.0.0.1:8734/')).toBeNull();
  });
});
