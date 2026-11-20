import { describe, expect, it } from 'vitest';
import {
  describeCommandProtocol,
  executeCommands,
  validateCommands,
} from '../src/commands';
import { CHARACTER_PARAM_SPECS } from '../src/character';
import { DEFAULT_OUTFIT } from '../src/outfit';

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
    expect(commands).toHaveLength(12);
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
      { type: 'set_pose', value: 'backflip' },
    ]);
    expect(commands).toEqual([]);
    expect(rejected).toHaveLength(4);
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

  it('randomize_outfit keeps the person and changes the clothes', () => {
    const { commands } = validateCommands([{ type: 'randomize_outfit' }]);
    const result = executeCommands(commands, DEFAULT_OUTFIT, () => 0);
    expect(result.outfit.character).toEqual(DEFAULT_OUTFIT.character);
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
  });
});
