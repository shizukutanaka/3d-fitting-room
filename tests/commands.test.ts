import { describe, expect, it } from 'vitest';
import {
  describeCommandProtocol,
  executeCommands,
  validateCommands,
} from '../src/commands';
import {
  BODY_PARAM_KEYS,
  CHARACTER_PARAM_SPECS,
  FACE_PARAM_KEYS,
  YOUTH_SCORE_MAX,
  youthScore,
} from '../src/character';
import {
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  DEFAULT_OUTFIT,
  SHOE_COLORS,
  SHOE_STYLES,
} from '../src/outfit';
import { synthesizeCharacter } from '../src/genetics';
import { decodeSeed, encodeSeed } from '../src/seed';
import { sanitizeCharacter } from '../src/character';

// The command protocol is the trust boundary for LLM output and
// agent input: everything untrusted passes validateCommands, and
// only whitelisted, in-range commands may reach executeCommands.

describe('validateCommands', () => {
  it('accepts well-formed commands of every type', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'skinTone', value: 0.5 },
      { type: 'set_character', param: 'hairStyle', value: 'long' },
      { type: 'set_top_style', value: 'dress' },
      { type: 'set_top_color', value: '#3a4152' },
      { type: 'set_bottom_style', value: 'pants' },
      { type: 'set_bottom_color', value: '#44557a' },
      { type: 'set_shoe_style', value: 'boots' },
      { type: 'set_shoe_color', value: '#26262b' },
      { type: 'set_hat', value: 'cap' },
      { type: 'set_glasses', value: 'round' },
      { type: 'set_accessory', value: 'bag' },
      { type: 'set_pose', value: 'wave' },
      { type: 'randomize_outfit' },
      { type: 'randomize_character' },
      { type: 'share_card' },
      { type: 'get_state' },
    ]);
    expect(rejected).toEqual([]);
    expect(commands).toHaveLength(16);
  });

  it('clamps out-of-range numbers into the spec range instead of applying them raw', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'skinTone', value: 5 },
      { type: 'set_character', param: 'height', value: 9 },
      { type: 'set_character', param: 'height', value: 0.5 },
    ]);
    expect(rejected).toEqual([]);
    expect(commands).toEqual([
      { type: 'set_character', param: 'skinTone', value: 1 },
      { type: 'set_character', param: 'height', value: 1.95 },
      { type: 'set_character', param: 'height', value: 1.45 },
    ]);
  });

  it('accepts numeric strings for range parameters (models emit them)', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'skinTone', value: '0.75' },
    ]);
    expect(rejected).toEqual([]);
    expect(commands).toEqual([{ type: 'set_character', param: 'skinTone', value: 0.75 }]);
  });

  it('rejects values outside an option list', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'hairStyle', value: 'mohawk' },
      { type: 'set_character', param: 'hairColor', value: '#000000' },
      { type: 'set_top_color', value: '#123456' },
      { type: 'set_bottom_style', value: 'tutu' },
      { type: 'set_shoe_color', value: '#123456' },
      { type: 'set_pose', value: 'backflip' },
    ]);
    expect(commands).toEqual([]);
    expect(rejected).toHaveLength(6);
  });

  it('rejects unknown parameters, unknown commands and non-commands', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'age', value: 12 },
      { type: 'run_code', value: 'alert(1)' },
      { type: 'set_character', param: 'skinTone', value: 'soon' },
      'dress please',
      42,
      null,
      { value: 'dress' },
    ]);
    expect(commands).toEqual([]);
    expect(rejected).toHaveLength(7);
  });

  it('rejects a non-array command list wholesale', () => {
    const { commands, rejected } = validateCommands({ type: 'set_pose', value: 'wave' });
    expect(commands).toEqual([]);
    expect(rejected).toHaveLength(1);
  });
});

describe('executeCommands', () => {
  it('applies commands in order and returns a sanitized outfit', () => {
    const { commands } = validateCommands([
      { type: 'set_character', param: 'height', value: 1.6 },
      { type: 'set_top_style', value: 'hoodie' },
      { type: 'set_pose', value: 'peace' },
      { type: 'share_card' },
      { type: 'get_state' },
    ]);
    const result = executeCommands(commands, DEFAULT_OUTFIT);
    expect(result.outfit.character.height).toBe(1.6);
    expect(result.outfit.topStyle).toBe('hoodie');
    expect(result.outfit.pose).toBe('peace');
    expect(result.wantShareCard).toBe(true);
    expect(result.stateRequested).toBe(true);
    expect(result.applied).toHaveLength(5);
    // The input outfit is not mutated.
    expect(DEFAULT_OUTFIT.character.height).toBe(1.74);
  });

  it('randomize_character only produces in-spec values', () => {
    const { commands } = validateCommands([{ type: 'randomize_character' }]);
    const result = executeCommands(commands, DEFAULT_OUTFIT, () => 0.999999);
    const c = result.outfit.character;
    expect(c.skinTone).toBeLessThanOrEqual(1);
    expect(c.height).toBeLessThanOrEqual(1.95);
    expect(c.height).toBeGreaterThanOrEqual(1.45);
    const styleSpec = CHARACTER_PARAM_SPECS.hairStyle;
    expect(styleSpec.kind === 'enum' && styleSpec.options.includes(c.hairStyle)).toBe(true);
  });

  it('applies bottoms and shoes commands (categories added after the protocol)', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_bottom_style', value: 'skirt' },
      { type: 'set_bottom_color', value: BOTTOM_COLORS[3] },
      { type: 'set_shoe_style', value: 'sneakers' },
      { type: 'set_shoe_color', value: SHOE_COLORS[5] },
    ]);
    expect(rejected).toEqual([]);
    const result = executeCommands(commands, DEFAULT_OUTFIT);
    expect(result.outfit.bottomStyle).toBe('skirt');
    expect(result.outfit.bottomColor).toBe(BOTTOM_COLORS[3]);
    expect(result.outfit.shoeStyle).toBe('sneakers');
    expect(result.outfit.shoeColor).toBe(SHOE_COLORS[5]);
    expect(result.applied).toHaveLength(4);
  });

  it('applies phase-2 face parameters through the same set_character command', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'eyeSize', value: 1.2 },
      { type: 'set_character', param: 'noseWidth', value: 99 },
    ]);
    expect(rejected).toEqual([]);
    const result = executeCommands(commands, DEFAULT_OUTFIT);
    expect(result.outfit.character.eyeSize).toBe(1.2);
    // Out-of-range face values clamp to the spec, like every range.
    const spec = CHARACTER_PARAM_SPECS.noseWidth;
    expect(spec.kind).toBe('range');
    if (spec.kind === 'range') expect(result.outfit.character.noseWidth).toBe(spec.max);
  });

  it('applies body parameters through the same set_character command', () => {
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'shoulderWidth', value: 1.1 },
      { type: 'set_character', param: 'waist', value: 0.9 },
      { type: 'set_character', param: 'bust', value: 99 },
    ]);
    expect(rejected).toEqual([]);
    const result = executeCommands(commands, DEFAULT_OUTFIT);
    expect(result.outfit.character.shoulderWidth).toBe(1.1);
    expect(result.outfit.character.waist).toBe(0.9);
    const spec = CHARACTER_PARAM_SPECS.bust;
    expect(spec.kind).toBe('range');
    if (spec.kind === 'range') expect(result.outfit.character.bust).toBe(spec.max);
  });

  it('the adult safety restriction (CUS-0779) cannot be routed around via commands', () => {
    // An LLM (or a prompt-injected one) asking for the full
    // minor-like combination, one valid in-range command at a
    // time: every command is individually legal, so validation
    // accepts them all — the combination must still never land.
    const { commands, rejected } = validateCommands([
      { type: 'set_character', param: 'height', value: 1.45 },
      { type: 'set_character', param: 'bust', value: 0.8 },
      { type: 'set_character', param: 'waist', value: 1.22 },
      { type: 'set_character', param: 'hip', value: 0.86 },
      { type: 'set_character', param: 'build', value: 0.85 },
      { type: 'set_character', param: 'shoulderWidth', value: 0.88 },
    ]);
    expect(rejected).toEqual([]);
    const result = executeCommands(commands, DEFAULT_OUTFIT);
    expect(youthScore(result.outfit.character)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    expect(result.outfit.character.bust).toBeGreaterThan(0.8);
    expect(result.outfit.character.height).toBe(1.45);
  });

  it('randomize_outfit keeps the person and changes the clothes', () => {
    const { commands } = validateCommands([{ type: 'randomize_outfit' }]);
    const result = executeCommands(commands, DEFAULT_OUTFIT, () => 0);
    expect(result.outfit.character).toEqual(DEFAULT_OUTFIT.character);
  });
});

describe('blend_characters', () => {
  // Two distinct people, carried as seeds — the only inputs the
  // command accepts (LEGAL-ETHICS.md judgment J-06: synthesis is
  // between fictional people, named by their seeds).
  const personA = sanitizeCharacter({
    skinTone: 0.1,
    height: 1.9,
    hairColor: '#d9b380',
    hairStyle: 'long',
  });
  const personB = sanitizeCharacter({
    skinTone: 0.92,
    height: 1.52,
    hairColor: '#201612',
    hairStyle: 'short',
  });
  const seedA = encodeSeed({ ...DEFAULT_OUTFIT, character: personA });
  const seedB = encodeSeed({ ...DEFAULT_OUTFIT, character: personB });

  it('synthesizes the person the pure function produces, and keeps the clothes', () => {
    const { commands, rejected } = validateCommands([
      { type: 'blend_characters', seedA, seedB, mixSeed: 36 },
    ]);
    expect(rejected).toEqual([]);
    const current = { ...DEFAULT_OUTFIT, topStyle: 'hoodie' as const, pose: 'wave' as const };
    const result = executeCommands(commands, current);
    const expected = synthesizeCharacter(
      decodeSeed(seedA)!.character,
      decodeSeed(seedB)!.character,
      36,
    );
    expect(result.outfit.character).toEqual(expected);
    // Clothes are not inherited: the current outfit stays.
    expect(result.outfit.topStyle).toBe('hoodie');
    expect(result.outfit.pose).toBe('wave');
    expect(result.applied).toEqual(['blend_characters mixSeed=36']);
    // Deterministic through the command path too.
    expect(executeCommands(commands, current).outfit.character).toEqual(expected);
  });

  it('derives a deterministic mix seed when none is given', () => {
    const first = validateCommands([{ type: 'blend_characters', seedA, seedB }]);
    const second = validateCommands([{ type: 'blend_characters', seedA, seedB }]);
    expect(first.rejected).toEqual([]);
    expect(second.commands).toEqual(first.commands);
    const cmd = first.commands[0];
    expect(cmd.type).toBe('blend_characters');
    if (cmd.type === 'blend_characters') {
      const expected = synthesizeCharacter(
        decodeSeed(seedA)!.character,
        decodeSeed(seedB)!.character,
        cmd.mixSeed,
      );
      expect(executeCommands(first.commands, DEFAULT_OUTFIT).outfit.character).toEqual(expected);
    }
  });

  it('rejects invalid parent seeds and a non-numeric mix seed, with reasons', () => {
    const { commands, rejected } = validateCommands([
      { type: 'blend_characters', seedA: 'FR9-bogus', seedB, mixSeed: 1 },
      { type: 'blend_characters', seedA, seedB: 42, mixSeed: 1 },
      { type: 'blend_characters', seedA, seedB: 'not a seed', mixSeed: 1 },
      { type: 'blend_characters', seedA, seedB, mixSeed: 'soon' },
      { type: 'blend_characters', seedA, seedB, mixSeed: null },
    ]);
    expect(commands).toEqual([]);
    expect(rejected).toHaveLength(5);
    expect(rejected[0].reason).toContain('seedA');
    expect(rejected[1].reason).toContain('seedB');
    expect(rejected[2].reason).toContain('seedB');
    expect(rejected[3].reason).toContain('mixSeed');
    expect(rejected[4].reason).toContain('mixSeed');
  });

  it('the adult safety restriction fences synthesized people on the command path too', () => {
    // Parents that each pass the gate alone (short stature on one
    // side, slight build traits on the other, both corrected to
    // their legal forms by the seed round-trip): no mix seed may
    // assemble a minor-like child from them.
    const shortSeed = encodeSeed({
      ...DEFAULT_OUTFIT,
      character: sanitizeCharacter({ height: 1.45 }),
    });
    const slightSeed = encodeSeed({
      ...DEFAULT_OUTFIT,
      character: sanitizeCharacter({
        height: 1.95,
        bust: 0.8,
        waist: 1.22,
        hip: 0.86,
        build: 0.85,
        shoulderWidth: 0.88,
      }),
    });
    for (let s = 0; s < 50; s++) {
      const { commands, rejected } = validateCommands([
        { type: 'blend_characters', seedA: shortSeed, seedB: slightSeed, mixSeed: s },
      ]);
      expect(rejected).toEqual([]);
      const result = executeCommands(commands, DEFAULT_OUTFIT);
      expect(youthScore(result.outfit.character)).toBeLessThanOrEqual(YOUTH_SCORE_MAX + 1e-9);
    }
  });
});

describe('describeCommandProtocol', () => {
  it('is generated from the specs: every character parameter appears', () => {
    const text = describeCommandProtocol();
    for (const key of Object.keys(CHARACTER_PARAM_SPECS)) {
      expect(text).toContain(`"param":"${key}"`);
    }
    // Ranges and option lists come from the specs, not from prose.
    const height = CHARACTER_PARAM_SPECS.height;
    expect(height.kind).toBe('range');
    if (height.kind === 'range') {
      expect(text).toContain(`range ${height.min}..${height.max}`);
    }
    expect(text).toContain('set_pose');
    expect(text).toContain('share_card');
    expect(text).toContain('blend_characters');
  });

  it('covers the body parameters from the same dynamic generation', () => {
    const text = describeCommandProtocol();
    for (const key of BODY_PARAM_KEYS) {
      expect(text).toContain(`"param":"${key}"`);
    }
  });

  it('covers the face parameters and the bottoms/shoes catalogs from their sources', () => {
    const text = describeCommandProtocol();
    // Phase-2 face parameters ride the same dynamic generation as
    // every other character parameter.
    for (const key of FACE_PARAM_KEYS) {
      expect(text).toContain(`"param":"${key}"`);
    }
    // The outfit side is generated from the outfit.ts catalogs:
    // every style and color of the newer categories is offered.
    for (const style of BOTTOM_STYLES) expect(text).toContain(style);
    for (const color of BOTTOM_COLORS) expect(text).toContain(color);
    for (const style of SHOE_STYLES) expect(text).toContain(style);
    for (const color of SHOE_COLORS) expect(text).toContain(color);
    expect(text).toContain('set_bottom_style');
    expect(text).toContain('set_bottom_color');
    expect(text).toContain('set_shoe_style');
    expect(text).toContain('set_shoe_color');
  });
});
