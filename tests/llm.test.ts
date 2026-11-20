import { describe, expect, it } from 'vitest';
import {
  EMPTY_LLM_SETTINGS,
  chatCompletionsUrl,
  isValidEndpoint,
  loadLlmSettings,
  modelsUrl,
  parseLlmReply,
  saveLlmSettings,
  testConnection,
} from '../src/llm';

class FakeStorage implements Storage {
  private map = new Map<string, string>();
  get length(): number {
    return this.map.size;
  }
  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  key(index: number): string | null {
    return [...this.map.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
}

describe('LLM settings (device-local only)', () => {
  it('defaults to empty: no endpoint exists until the user sets one', () => {
    const storage = new FakeStorage();
    expect(loadLlmSettings(storage)).toEqual(EMPTY_LLM_SETTINGS);
    expect(EMPTY_LLM_SETTINGS.endpoint).toBe('');
  });

  it('round-trips through storage and tolerates corrupt data', () => {
    const storage = new FakeStorage();
    const settings = { endpoint: 'http://localhost:11434/v1', apiKey: 'k', model: 'm' };
    saveLlmSettings(settings, storage);
    expect(loadLlmSettings(storage)).toEqual(settings);
    storage.setItem('fitting-room.llm.v1', '{oops');
    expect(loadLlmSettings(storage)).toEqual(EMPTY_LLM_SETTINGS);
  });
});

describe('endpoint URL handling', () => {
  it('accepts only absolute http(s) URLs', () => {
    expect(isValidEndpoint('http://localhost:11434/v1')).toBe(true);
    expect(isValidEndpoint('https://example.com/v1')).toBe(true);
    expect(isValidEndpoint('localhost:11434')).toBe(false);
    expect(isValidEndpoint('javascript:alert(1)')).toBe(false);
    expect(isValidEndpoint('')).toBe(false);
  });

  it('derives chat-completions and models URLs from either form', () => {
    expect(chatCompletionsUrl('http://localhost:11434/v1')).toBe(
      'http://localhost:11434/v1/chat/completions',
    );
    expect(chatCompletionsUrl('http://localhost:11434/v1/')).toBe(
      'http://localhost:11434/v1/chat/completions',
    );
    expect(chatCompletionsUrl('http://localhost:1234/v1/chat/completions')).toBe(
      'http://localhost:1234/v1/chat/completions',
    );
    expect(modelsUrl('http://localhost:11434/v1/chat/completions')).toBe(
      'http://localhost:11434/v1/models',
    );
    expect(modelsUrl('http://localhost:11434/v1')).toBe('http://localhost:11434/v1/models');
  });
});

describe('parseLlmReply', () => {
  it('parses a bare JSON envelope', () => {
    const parsed = parseLlmReply('{"reply":"ok","commands":[{"type":"get_state"}]}');
    expect(parsed?.reply).toBe('ok');
    expect(parsed?.rawCommands).toEqual([{ type: 'get_state' }]);
  });

  it('parses an envelope wrapped in code fences and prose', () => {
    const parsed = parseLlmReply(
      'Here you go:\n```json\n{"reply":"done","commands":[]}\n```\n',
    );
    expect(parsed?.reply).toBe('done');
    expect(parsed?.rawCommands).toEqual([]);
  });

  it('rejects non-JSON and envelopes without a commands array', () => {
    expect(parseLlmReply('I changed the dress for you!')).toBeNull();
    expect(parseLlmReply('{"reply":"hi"}')).toBeNull();
    expect(parseLlmReply('{"commands":"dress"}')).toBeNull();
  });
});

describe('testConnection', () => {
  const settings = { endpoint: 'http://localhost:11434/v1', apiKey: 'secret', model: 'm' };

  it('lists models and sends the key only as an Authorization header', async () => {
    let seenUrl = '';
    let seenAuth: string | null = null;
    const fakeFetch = (async (url: string, init?: RequestInit) => {
      seenUrl = url;
      seenAuth = new Headers(init?.headers).get('Authorization');
      return new Response(JSON.stringify({ data: [{ id: 'llama3.1' }, { id: 'qwen' }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;
    const result = await testConnection(settings, fakeFetch);
    expect(result).toEqual({ ok: true, models: ['llama3.1', 'qwen'] });
    expect(seenUrl).toBe('http://localhost:11434/v1/models');
    expect(seenAuth).toBe('Bearer secret');
  });

  it('reports HTTP and network failures without throwing', async () => {
    const httpFail = (async () =>
      new Response('nope', { status: 401 })) as unknown as typeof fetch;
    expect(await testConnection(settings, httpFail)).toEqual({ ok: false, error: 'HTTP 401' });
    const netFail = (async () => {
      throw new Error('connection refused');
    }) as unknown as typeof fetch;
    expect(await testConnection(settings, netFail)).toEqual({
      ok: false,
      error: 'connection refused',
    });
    expect(await testConnection({ ...settings, endpoint: 'not a url' })).toEqual({
      ok: false,
      error: 'invalid endpoint URL',
    });
  });
});
