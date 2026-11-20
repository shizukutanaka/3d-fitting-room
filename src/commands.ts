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
// The protocol is generated, not hand-listed, on both sides:
// character-parameter commands are derived from
// CHARACTER_PARAM_SPECS at runtime, and outfit commands from the
// OUTFIT_OPTION_COMMANDS table below, whose option lists are the
// catalogs in outfit.ts. When a new parameter or category is added
// to those sources (as the phase-2 face parameters and the
// bottoms/shoes categories were), it becomes commandable here
// with no protocol changes.

import {
  CHARACTER_PARAM_SPECS,
  sanitizeCharacter,
  type CharacterParams,
} from './character';
import {
  ACCESSORIES,
  BOTTOM_COLORS,
  BOTTOM_STYLES,
  GLASSES,
  HATS,
  POSES,
  SHOE_COLORS,
  SHOE_STYLES,
  TOP_COLORS,
  TOP_STYLES,
  randomOutfit,
  sanitizeOutfit,
  type Outfit,
} from './outfit';
import { deriveMixSeed, synthesizeCharacter } from './genetics';
import {
  MUTATION_STRENGTHS,
  deriveMutationSeed,
  isMutationStrength,
  mutateCharacter,
  type MutationStrength,
} from './mutation';
import { decodeSeed, encodeSeed } from './seed';

/** The outfit fields a single option command can set: command
 *  name → outfit field + the catalog its value must come from.
 *  Validation, execution and the generated protocol description
 *  all read this table, so it is the one place a new outfit
 *  category joins the protocol. */
const OUTFIT_OPTION_COMMANDS = {
  set_top_style: { field: 'topStyle', options: TOP_STYLES },
  set_top_color: { field: 'topColor', options: TOP_COLORS },
  set_bottom_style: { field: 'bottomStyle', options: BOTTOM_STYLES },
  set_bottom_color: { field: 'bottomColor', options: BOTTOM_COLORS },
  set_shoe_style: { field: 'shoeStyle', options: SHOE_STYLES },
  set_shoe_color: { field: 'shoeColor', options: SHOE_COLORS },
  set_hat: { field: 'hat', options: HATS },
  set_glasses: { field: 'glasses', options: GLASSES },
  set_accessory: { field: 'accessory', options: ACCESSORIES },
  set_pose: { field: 'pose', options: POSES },
} as const satisfies Record<
  string,
  { field: keyof Outfit; options: readonly string[] }
>;

type OutfitOptionCommandName = keyof typeof OUTFIT_OPTION_COMMANDS;

export type Command =
  | { type: 'set_character'; param: keyof CharacterParams; value: number | string }
  | { type: OutfitOptionCommandName; value: string }
  | { type: 'randomize_outfit' }
  | { type: 'randomize_character' }
  | { type: 'blend_characters'; seedA: string; seedB: string; mixSeed: number }
  | { type: 'mutate_character'; strength: MutationStrength; mutationSeed?: number }
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
    case 'blend_characters': {
      // The only inputs are two person seeds. Both must decode —
      // a seed is the product's validated state format, so what
      // arrives here can only ever be two in-range fictional
      // people (LEGAL-ETHICS.md judgment J-06). The mix seed is
      // optional: without one it is derived from the pair, so a
      // bare command is still deterministic.
      const { seedA, seedB } = raw;
      if (typeof seedA !== 'string' || !decodeSeed(seedA)) {
        reject('seedA is not a valid person seed');
        return;
      }
      if (typeof seedB !== 'string' || !decodeSeed(seedB)) {
        reject('seedB is not a valid person seed');
        return;
      }
      let mixSeed: number;
      if (raw.mixSeed === undefined) {
        mixSeed = deriveMixSeed(seedA, seedB);
      } else {
        const n = typeof raw.mixSeed === 'string' ? Number(raw.mixSeed) : raw.mixSeed;
        if (typeof n !== 'number' || !Number.isFinite(n)) {
          reject('mixSeed must be an integer');
          return;
        }
        mixSeed = Math.floor(n) >>> 0;
      }
      out.commands.push({ type: 'blend_characters', seedA, seedB, mixSeed });
      return;
    }
    case 'mutate_character': {
      // One-parent variation of the *current* person (the
      // two-parent sibling is blend_characters above). The
      // strength is a closed vocabulary — an invented strength
      // is a rejection, not a clamp, because strengths are
      // categories, not quantities. The mutation seed is
      // optional: without one, execution derives it from the
      // current person's own seed, so a bare command is still
      // deterministic (the same person always varies the same
      // way at a given strength).
      if (!isMutationStrength(raw.strength)) {
        reject(`strength must be one of: ${MUTATION_STRENGTHS.join(', ')}`);
        return;
      }
      const cmd: Extract<Command, { type: 'mutate_character' }> = {
        type: 'mutate_character',
        strength: raw.strength,
      };
      if (raw.mutationSeed !== undefined) {
        const n =
          typeof raw.mutationSeed === 'string' ? Number(raw.mutationSeed) : raw.mutationSeed;
        if (typeof n !== 'number' || !Number.isFinite(n)) {
          reject('mutationSeed must be an integer');
          return;
        }
        cmd.mutationSeed = Math.floor(n) >>> 0;
      }
      out.commands.push(cmd);
      return;
    }
    case 'randomize_outfit':
    case 'randomize_character':
    case 'share_card':
    case 'get_state':
      out.commands.push({ type: raw.type });
      return;
    default: {
      // Outfit option commands are table-driven: any name in
      // OUTFIT_OPTION_COMMANDS validates against that row's
      // catalog; anything else is an unknown command.
      const entry = (
        OUTFIT_OPTION_COMMANDS as Record<
          string,
          { field: keyof Outfit; options: readonly string[] } | undefined
        >
      )[raw.type];
      if (!entry) {
        reject(`unknown command type: ${raw.type}`);
        return;
      }
      const r = optionValue(raw.value, entry.options);
      if (!r.ok) {
        reject(`value for ${raw.type} must be one of: ${entry.options.join(', ')}`);
        return;
      }
      out.commands.push({ type: raw.type as OutfitOptionCommandName, value: r.value });
      return;
    }
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
  /** One entry per mutate_character command that ran: the
   *  seed of the person it varied from, the seed of the person
   *  it produced, and the strength — the facts of the event,
   *  reported (not recorded) by the executor. Recording them
   *  in the on-device lineage is the caller's business, the
   *  same division of labour as blend_characters, whose
   *  callers record from the command list itself. */
  mutations: { source: string; seed: string; strength: MutationStrength }[];
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
  const mutations: ExecutionResult['mutations'] = [];
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
      case 'randomize_outfit': {
        // Like the UI's random button: new clothes, same person —
        // the name is part of "same person" and is kept too.
        const r = randomOutfit(rng);
        outfit = { ...r, character: outfit.character, name: outfit.name };
        applied.push('randomize_outfit');
        break;
      }
      case 'randomize_character':
        outfit = { ...outfit, character: randomCharacter(rng) };
        applied.push('randomize_character');
        break;
      case 'blend_characters': {
        // Validation proved both seeds decode; the re-check keeps
        // execution total even for hand-built command objects.
        // The synthesis result passes sanitizeCharacter inside
        // synthesizeCharacter (and sanitizeOutfit again below), so
        // the adult safety restriction fences the child exactly
        // like any other person. Clothes are not inherited: the
        // current outfit stays, the person is replaced.
        const pa = decodeSeed(cmd.seedA);
        const pb = decodeSeed(cmd.seedB);
        if (pa && pb) {
          outfit = {
            ...outfit,
            // A synthesized person is a new person: neither
            // parent's name carries over (a name is an identity
            // anchor, not a trait — see genetics.ts).
            name: '',
            character: synthesizeCharacter(pa.character, pb.character, cmd.mixSeed),
          };
          applied.push(`blend_characters mixSeed=${cmd.mixSeed}`);
        }
        break;
      }
      case 'mutate_character': {
        // The variation passes sanitizeCharacter inside
        // mutateCharacter (and sanitizeOutfit again below), so
        // the adult safety restriction fences a varied person
        // exactly like any other. Clothes are not traits: the
        // current outfit stays, the person is replaced by their
        // neighbour. Where the variation came from is reported
        // in the result (source and result seeds, captured
        // here where both are exact) and recording it in the
        // on-device lineage is the caller's business; the
        // executor stays a pure function of (commands, current
        // outfit).
        const source = encodeSeed(outfit);
        const mSeed = cmd.mutationSeed ?? deriveMutationSeed(source);
        outfit = { ...outfit, character: mutateCharacter(outfit.character, mSeed, cmd.strength) };
        mutations.push({ source, seed: encodeSeed(outfit), strength: cmd.strength });
        applied.push(`mutate_character strength=${cmd.strength} mutationSeed=${mSeed}`);
        break;
      }
      case 'share_card':
        wantShareCard = true;
        applied.push('share_card');
        break;
      case 'get_state':
        stateRequested = true;
        applied.push('get_state');
        break;
      default: {
        // Outfit option commands: the remaining Command variant.
        // The value was validated against the row's catalog, and
        // the result still passes sanitizeOutfit below.
        const entry = OUTFIT_OPTION_COMMANDS[cmd.type];
        outfit = { ...outfit, [entry.field]: cmd.value } as Outfit;
        applied.push(`${cmd.type} = ${cmd.value}`);
        break;
      }
    }
  }
  return { outfit: sanitizeOutfit(outfit), applied, wantShareCard, stateRequested, mutations };
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
  for (const [name, entry] of Object.entries(OUTFIT_OPTION_COMMANDS)) {
    lines.push(`- {"type":"${name}","value":<one of: ${entry.options.join(' | ')}>}`);
  }
  lines.push(
    '- {"type":"randomize_outfit"} — random clothes, same person',
    '- {"type":"randomize_character"} — a new random person',
    '- {"type":"blend_characters","seedA":"<seed of one person>","seedB":"<seed of another person>","mixSeed":<integer, optional>} — synthesize a new person from the two people named by their seeds; the same seeds and mixSeed always produce the same person. Clothes are not inherited: the current outfit stays on the new person',
    '- {"type":"mutate_character","strength":<one of: subtle | standard | bold>,"mutationSeed":<integer, optional>} — vary the current person into a nearby new person (one-parent mutation); the same person, strength and mutationSeed always produce the same variation, and without a mutationSeed one is derived from the current person. Clothes stay as they are',
    '- {"type":"share_card"} — save a photo of the current look',
    '- {"type":"get_state"} — report the current state back',
    'Values outside a range are clamped; values not in an option list are rejected. Never invent parameters, options or command types.',
  );
  return lines.join('\n');
}
