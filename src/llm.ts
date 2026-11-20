// Bring-your-own-LLM connection. The user may point the app at
// their own OpenAI-compatible endpoint (a local server such as
// Ollama or LM Studio, or their own hosted one) and drive the
// fitting room in natural language.
//
// Data rules (see docs/LLM-CONNECT.md and docs/DESIGN.md §11):
//  - The product ships with NO endpoint. Until the user saves
//    settings, this module makes no network requests at all.
//  - Settings (endpoint URL, API key, model name) live only in
//    this device's localStorage. The API key is sent only as an
//    Authorization header to the endpoint the user configured —
//    nowhere else, ever.
//  - A chat request sends exactly two things to that endpoint:
//    the user's instruction and the current character/outfit
//    state (plain parameters — no images, no personal data).
//  - The model's answer is untrusted input: it is parsed as JSON
//    and every command passes the whitelist validation in
//    commands.ts before anything is applied.

import { describeCommandProtocol, validateCommands, type ValidationResult } from './commands';
import type { Lang } from './i18n';
import type { Outfit } from './outfit';

export interface LlmSettings {
  /** Base URL of an OpenAI-compatible API, as the user typed it
   *  (with or without a trailing path — see the URL helpers). */
  endpoint: string;
  /** Optional; many local servers need no key. */
  apiKey: string;
  model: string;
}

export const LLM_SETTINGS_KEY = 'fitting-room.llm.v1';

export const EMPTY_LLM_SETTINGS: LlmSettings = { endpoint: '', apiKey: '', model: '' };

export function loadLlmSettings(storage: Storage = localStorage): LlmSettings {
  try {
    const raw = storage.getItem(LLM_SETTINGS_KEY);
    if (!raw) return { ...EMPTY_LLM_SETTINGS };
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      endpoint: typeof o.endpoint === 'string' ? o.endpoint : '',
      apiKey: typeof o.apiKey === 'string' ? o.apiKey : '',
      model: typeof o.model === 'string' ? o.model : '',
    };
  } catch {
    return { ...EMPTY_LLM_SETTINGS };
  }
}

export function saveLlmSettings(settings: LlmSettings, storage: Storage = localStorage): void {
  try {
    storage.setItem(LLM_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Storage blocked: settings just won't persist.
  }
}

/** True when the endpoint is an absolute http(s) URL. Anything
 *  else can never be fetched to. */
export function isValidEndpoint(endpoint: string): boolean {
  try {
    const u = new URL(endpoint.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function baseUrl(endpoint: string): string {
  return endpoint
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/chat\/completions$/, '');
}

/** Accepts a base URL (…/v1) or a full chat-completions URL and
 *  returns the chat-completions URL. */
export function chatCompletionsUrl(endpoint: string): string {
  const trimmed = endpoint.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/chat/completions') ? trimmed : `${baseUrl(endpoint)}/chat/completions`;
}

export function modelsUrl(endpoint: string): string {
  return `${baseUrl(endpoint)}/models`;
}

function authHeaders(settings: LlmSettings): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (settings.apiKey.trim()) headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
  return headers;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  fetchImpl: typeof fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export type TestResult = { ok: true; models: string[] } | { ok: false; error: string };

/** Connection test: list the models the endpoint offers. Proves
 *  reachability and (when a key is set) that the key is accepted,
 *  without spending a completion. */
export async function testConnection(
  settings: LlmSettings,
  fetchImpl: typeof fetch = fetch,
): Promise<TestResult> {
  if (!isValidEndpoint(settings.endpoint)) return { ok: false, error: 'invalid endpoint URL' };
  try {
    const res = await fetchWithTimeout(
      modelsUrl(settings.endpoint),
      { headers: authHeaders(settings) },
      15000,
      fetchImpl,
    );
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as { data?: Array<{ id?: unknown }> };
    const models = Array.isArray(data.data)
      ? data.data.map((m) => m?.id).filter((id): id is string => typeof id === 'string')
      : [];
    return { ok: true, models };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** The name of each UI language, for instructing the model to
 *  reply in the language the user is reading. */
const REPLY_LANGS: Record<Lang, string> = {
  ja: 'Japanese',
  en: 'English',
  es: 'Spanish',
  zh: 'Chinese',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  ko: 'Korean',
};

export function buildSystemPrompt(state: Outfit, lang: Lang): string {
  const replyLang = REPLY_LANGS[lang];
  return [
    'You operate a 3D avatar fitting-room app for the user, through commands.',
    'The user writes an instruction; you translate it into commands from the protocol below.',
    `Write the "reply" field in ${replyLang}, briefly.`,
    'If the instruction asks for something no command can do, return an empty commands list and explain why in the reply.',
    '',
    'Current state (JSON):',
    JSON.stringify(state),
    '',
    describeCommandProtocol(),
  ].join('\n');
}

export interface ParsedLlmReply {
  reply: string;
  rawCommands: unknown[];
}

/** Extract the JSON envelope from a model response. Models wrap
 *  JSON in code fences or prose often enough that a bare
 *  JSON.parse is not viable; anything that does not yield an
 *  object with a commands array is rejected wholesale — partial
 *  application of a garbled response is worse than none. */
export function parseLlmReply(content: string): ParsedLlmReply | null {
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try {
    const parsed: unknown = JSON.parse(content.slice(start, end + 1));
    if (typeof parsed !== 'object' || parsed === null) return null;
    const o = parsed as Record<string, unknown>;
    if (!Array.isArray(o.commands)) return null;
    return {
      reply: typeof o.reply === 'string' ? o.reply : '',
      rawCommands: o.commands,
    };
  } catch {
    return null;
  }
}

export interface ChatOutcome {
  reply: string;
  validation: ValidationResult;
}

/** One stateless chat round: instruction + current state go to
 *  the user's endpoint; the structured answer comes back parsed
 *  and validated. Stateless on purpose — the state in the system
 *  prompt is always current, so no conversation history (and no
 *  extra data) ever leaves the device. */
export async function requestCommands(
  settings: LlmSettings,
  state: Outfit,
  userText: string,
  lang: Lang,
  fetchImpl: typeof fetch = fetch,
): Promise<ChatOutcome> {
  if (!isValidEndpoint(settings.endpoint)) throw new Error('invalid endpoint URL');
  if (!settings.model.trim()) throw new Error('no model set');
  const res = await fetchWithTimeout(
    chatCompletionsUrl(settings.endpoint),
    {
      method: 'POST',
      headers: authHeaders(settings),
      body: JSON.stringify({
        model: settings.model.trim(),
        temperature: 0.2,
        messages: [
          { role: 'system', content: buildSystemPrompt(state, lang) },
          { role: 'user', content: userText },
        ],
      }),
    },
    60000,
    fetchImpl,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('empty response from the model');
  const parsed = parseLlmReply(content);
  if (!parsed) throw new Error('the model response was not the expected JSON');
  return { reply: parsed.reply, validation: validateCommands(parsed.rawCommands) };
}
