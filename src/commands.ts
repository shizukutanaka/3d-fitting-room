// The command protocol shared by the in-app LLM chat and by
// external agents driving the window bridge. A command list is
// plain JSON data; nothing in it is ever executed as code — every
// entry is checked against a whitelist here, and the result is
// then run through the same sanitize path (sanitizeOutfit /
// sanitizeCharacter) that seeds and saved data already use. That
// sanitize path is where the product's safety limits live (the
// parameter ranges in CHARACTER_PARAM_SPECS, decided with
// docs/LEGAL-ETHICS.md), so a command arriving via an LLM has
// exactly the same reach as a finger on a slider — never more.
//
// The character-parameter commands are derived from
// CHARACTER_PARAM_SPECS at runtime: when a new parameter is added
// to the specs, it becomes commandable here with no protocol
// changes.

import {
  CHARACTER_PARAM_SPECS,
  sanitizeCharacter,
  type CharacterParams,
} from './character';
import {
  ACCESSORIES,
  GLASSES,
  HATS,
  POSES,
  TOP_COLORS,
  TOP_STYLES,
  randomOutfit,
  sanitizeOutfit,
  type Outfit,
} from './outfit';

export type Command =
  | { type: 'set_character'; param: keyof CharacterParams; value: number | string }
  | { type: 'set_top_style'; value: string }
  | { type: 'set_top_color'; value: string }
  | { type: 'set_hat'; value: string }
  | { type: 'set_glasses'; value: string }
  | { type: 'set_accessory'; value: string }
  | { type: 'set_pose'; value: string }
  | { type: 'randomize_outfit' }
  | { type: 'randomize_character' }
  | { type: 'share_card' }
  | { type: 'get_state' };

export interface RejectedCommand {
  raw: unknown;
  reason: string;
}

export interface ValidationResult {
  commands: Command[];
  rejected: RejectedCommand[];
}

const CHARACTER_PARAMS = Object.keys(CHARACTER_PARAM_SPECS) as Array<keyof CharacterParams>;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Coerce an LLM-supplied value for a range parameter: numbers and
 *  numeric strings are accepted, then clamped into the spec range
 *  (clamping, not rejection — a model asking for "very tall" as 9
 *  gets the tallest the product allows). Anything else rejects. */
function rangeValue(
  value: unknown,
  spec: { min: number; max: number },
): { ok: true; value: number } | { ok: false } {
  const n = typeof value === 'string' ? Number(value) : value;
  if (typeof n !== 'number' || !Number.isFinite(n)) return { ok: false };
  return { ok: true, value: Math.min(spec.max, Math.max(spec.min, n)) };
}

function optionValue(
  value: unknown,
  options: readonly string[],
): { ok: true; value: string } | { ok: false } {
  return typeof value === 'string' && options.includes(value)
    ? { ok: true, value }
    : { ok: false };
}

function validateOne(raw: unknown, out: ValidationResult): void {
  const reject = (reason: string) => out.rejected.push({ raw, reason });
  if (!isRecord(raw) || typeof raw.type !== 'string') {
    reject('not a command object');
    return;
  }
  switch (raw.type) {
    case 'set_character': {
      const param = raw.param;
      if (typeof param !== 'string' || !(CHARACTER_PARAMS as string[]).includes(param)) {
        reject(`unknown character parameter: ${String(param)}`);
        return;
      }
      const key = param as keyof CharacterParams;
      const spec = CHARACTER_PARAM_SPECS[key];
      if (spec.kind === 'range') {
        const r = rangeValue(raw.value, spec);
        if (!r.ok) {
          reject(`value for ${key} must be a number`);
          return;
        }
        out.commands.push({ type: 'set_character', param: key, value: r.value });
      } else {
        const r = optionValue(raw.value, spec.options);
        if (!r.ok) {
          reject(`value for ${key} must be one of: ${spec.options.join(', ')}`);
          return;
        }
        out.commands.push({ type: 'set_character', param: key, value: r.value });
      }
      return;
    }
    case 'set_top_style':
    case 'set_top_color':
    case 'set_hat':
    case 'set_glasses':
    case 'set_accessory':
    case 'set_pose': {
      const options =
        raw.type === 'set_top_style'
          ? TOP_STYLES
          : raw.type === 'set_top_color'
            ? TOP_COLORS
            : raw.type === 'set_hat'
              ? HATS
              : raw.type === 'set_glasses'
                ? GLASSES
                : raw.type === 'set_accessory'
                  ? ACCESSORIES
                  : POSES;
      const r = optionValue(raw.value, options);
      if (!r.ok) {
        reject(`value for ${raw.type} must be one of: ${options.join(', ')}`);
        return;
      }
      out.commands.push({ type: raw.type, value: r.value } as Command);
      return;
    }
    case 'randomize_outfit':
    case 'randomize_character':
    case 'share_card':
    case 'get_state':
      out.commands.push({ type: raw.type });
      return;
    default:
      reject(`unknown command type: ${raw.type}`);
  }
}

/** Validate an untrusted command list (from an LLM response or an
 *  agent). Valid entries come back as typed Commands; everything
 *  else is rejected with a reason. A non-array input validates to
 *  a single rejection. */
export function validateCommands(raw: unknown): ValidationResult {
  const out: ValidationResult = { commands: [], rejected: [] };
  if (!Array.isArray(raw)) {
    out.rejected.push({ raw, reason: 'command list must be an array' });
    return out;
  }
  for (const entry of raw) validateOne(entry, out);
  return out;
}

export interface ExecutionResult {
  /** The outfit after applying every command, fully sanitized. */
  outfit: Outfit;
  /** One human-readable line per applied command. */
  applied: string[];
  /** A share_card command was present; the caller decides how to
   *  surface the card (the chat UI saves the photo; the bridge
   *  leaves cardDataURL() to the agent). */
  wantShareCard: boolean;
  /** A get_state command was present. */
  stateRequested: boolean;
}

function randomCharacter(rng: () => number): CharacterParams {
  const raw: Record<string, unknown> = {};
  for (const key of CHARACTER_PARAMS) {
    const spec = CHARACTER_PARAM_SPECS[key];
    raw[key] =
      spec.kind === 'range'
        ? spec.min + rng() * (spec.max - spec.min)
        : spec.options[Math.floor(rng() * spec.options.length)];
  }
  return sanitizeCharacter(raw);
}

/** Apply validated commands, in order, to a copy of the current
 *  outfit. The final result passes through sanitizeOutfit — the
 *  same gate seeds and saves pass through — so nothing a command
 *  carries can land outside the product's validated state space. */
export function executeCommands(
  commands: Command[],
  current: Outfit,
  rng: () => number = Math.random,
): ExecutionResult {
  let outfit: Outfit = { ...current, character: { ...current.character } };
  const applied: string[] = [];
  let wantShareCard = false;
  let stateRequested = false;
  for (const cmd of commands) {
    switch (cmd.type) {
      case 'set_character':
        outfit = {
          ...outfit,
          character: sanitizeCharacter({ ...outfit.character, [cmd.param]: cmd.value }),
        };
        applied.push(`set_character ${cmd.param} = ${String(cmd.value)}`);
        break;
      case 'set_top_style':
        outfit = { ...outfit, topStyle: cmd.value as Outfit['topStyle'] };
        applied.push(`set_top_style = ${cmd.value}`);
        break;
      case 'set_top_color':
        outfit = { ...outfit, topColor: cmd.value };
        applied.push(`set_top_color = ${cmd.value}`);
        break;
      case 'set_hat':
        outfit = { ...outfit, hat: cmd.value as Outfit['hat'] };
        applied.push(`set_hat = ${cmd.value}`);
        break;
      case 'set_glasses':
        outfit = { ...outfit, glasses: cmd.value as Outfit['glasses'] };
        applied.push(`set_glasses = ${cmd.value}`);
        break;
      case 'set_accessory':
        outfit = { ...outfit, accessory: cmd.value as Outfit['accessory'] };
        applied.push(`set_accessory = ${cmd.value}`);
        break;
      case 'set_pose':
        outfit = { ...outfit, pose: cmd.value as Outfit['pose'] };
        applied.push(`set_pose = ${cmd.value}`);
        break;
      case 'randomize_outfit': {
        // Like the UI's random button: new clothes, same person.
        const r = randomOutfit(rng);
        outfit = { ...r, character: outfit.character };
        applied.push('randomize_outfit');
        break;
      }
      case 'randomize_character':
        outfit = { ...outfit, character: randomCharacter(rng) };
        applied.push('randomize_character');
        break;
      case 'share_card':
        wantShareCard = true;
        applied.push('share_card');
        break;
      case 'get_state':
        stateRequested = true;
        applied.push('get_state');
        break;
    }
  }
  return { outfit: sanitizeOutfit(outfit), applied, wantShareCard, stateRequested };
}

/** The protocol description handed to LLMs (as part of the system
 *  prompt) and to agents (via the bridge). Generated from the
 *  specs and catalogs, so it can never describe a parameter or an
 *  option the validator would not accept. */
export function describeCommandProtocol(): string {
  const lines: string[] = [
    'Respond with a single JSON object and nothing else:',
    '{"reply": "<short message to the user>", "commands": [<command>, ...]}',
    'Available commands:',
  ];
  for (const key of CHARACTER_PARAMS) {
    const spec = CHARACTER_PARAM_SPECS[key];
    if (spec.kind === 'range') {
      lines.push(
        `- {"type":"set_character","param":"${key}","value":<number>} — range ${spec.min}..${spec.max}`,
      );
    } else {
      lines.push(
        `- {"type":"set_character","param":"${key}","value":<one of: ${spec.options.join(' | ')}>}`,
      );
    }
  }
  lines.push(
    `- {"type":"set_top_style","value":<one of: ${TOP_STYLES.join(' | ')}>}`,
    `- {"type":"set_top_color","value":<one of: ${TOP_COLORS.join(' | ')}>}`,
    `- {"type":"set_hat","value":<one of: ${HATS.join(' | ')}>}`,
    `- {"type":"set_glasses","value":<one of: ${GLASSES.join(' | ')}>}`,
    `- {"type":"set_accessory","value":<one of: ${ACCESSORIES.join(' | ')}>}`,
    `- {"type":"set_pose","value":<one of: ${POSES.join(' | ')}>}`,
    '- {"type":"randomize_outfit"} — random clothes, same person',
    '- {"type":"randomize_character"} — a new random person',
    '- {"type":"share_card"} — save a photo of the current look',
    '- {"type":"get_state"} — report the current state back',
    'Values outside a range are clamped; values not in an option list are rejected. Never invent parameters, options or command types.',
  );
  return lines.join('\n');
}
