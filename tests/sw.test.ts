import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

interface MockResponse {
  ok: boolean;
  status: number;
  type: string;
  body: string;
  clone(): MockResponse;
}

function makeResp(body: string, status = 200): MockResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    type: 'basic',
    body,
    clone() {
      return makeResp(body, status);
    },
  };
}

function loadSw(fetchImpl: (req: { url: string; method: string }) => Promise<MockResponse>) {
  const store = new Map<string, Map<string, MockResponse>>();
  const listeners = new Map<string, (e: unknown) => void>();

  const caches = {
    async open(name: string) {
      let bucket = store.get(name);
      if (!bucket) {
        bucket = new Map();
        store.set(name, bucket);
      }
      return {
        async addAll(urls: string[]) {
          for (const u of urls) bucket!.set(u, makeResp(`precached:${u}`));
        },
        async put(req: { url: string }, res: MockResponse) {
          bucket!.set(req.url, res);
        },
      };
    },
    async keys() {
      return [...store.keys()];
    },
    async delete(name: string) {
      return store.delete(name);
    },
    async match(req: { url: string }) {
      for (const bucket of store.values()) {
        const hit = bucket.get(req.url);
        if (hit) return hit;
      }
      return undefined;
    },
  };

  const selfObj: Record<string, unknown> = {
    location: { origin: 'https://example.test' },
    skipWaiting: async () => {},
    clients: { claim: async () => {} },
    addEventListener(type: string, fn: (e: unknown) => void) {
      listeners.set(type, fn);
    },
  };

  const code = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
  vm.runInNewContext(code, { self: selfObj, caches, fetch: fetchImpl, URL });

  async function dispatchFetch(url: string): Promise<MockResponse | undefined> {
    let out: Promise<MockResponse | undefined> | undefined;
    listeners.get('fetch')!({
      request: { url, method: 'GET' },
      respondWith(p: Promise<MockResponse | undefined>) {
        out = p;
      },
    });
    return out ? await out : undefined;
  }

  async function dispatchLifecycle(type: 'install' | 'activate') {
    let pending: Promise<unknown> | undefined;
    listeners.get(type)!({
      waitUntil(p: Promise<unknown>) {
        pending = p;
      },
    });
    if (pending) await pending;
  }

  return { store, dispatchFetch, dispatchLifecycle };
}

describe('Service Worker caching strategy (public/sw.js)', () => {
  it('purges legacy fitting-room-shell-v1 cache on activate', async () => {
    const sw = loadSw(async () => makeResp('ok'));
    sw.store.set('fitting-room-shell-v1', new Map([['https://example.test/index.html', makeResp('old')]]));
    await sw.dispatchLifecycle('install');
    await sw.dispatchLifecycle('activate');
    expect(sw.store.has('fitting-room-shell-v1')).toBe(false);
    expect(sw.store.has('fitting-room-shell-v2')).toBe(true);
  });

  it('uses network-first for index.html and unhashed GLB models, with offline fallback', async () => {
    let online = true;
    let version = 1;
    const sw = loadSw(async () => {
      if (!online) throw new Error('offline');
      return makeResp(`v${version}`);
    });
    await sw.dispatchLifecycle('install');

    const html1 = await sw.dispatchFetch('https://example.test/index.html');
    expect(html1?.body).toBe('v1');

    // New deployment arrives: online fetch must NOT be stuck on stale cache.
    version = 2;
    const html2 = await sw.dispatchFetch('https://example.test/index.html');
    expect(html2?.body).toBe('v2');
    const glb2 = await sw.dispatchFetch('https://example.test/models/mannequin-a.glb');
    expect(glb2?.body).toBe('v2');

    // Offline: falls back to the cached copy.
    online = false;
    const htmlOffline = await sw.dispatchFetch('https://example.test/index.html');
    expect(htmlOffline?.body).toBe('v2');
    const glbOffline = await sw.dispatchFetch('https://example.test/models/mannequin-a.glb');
    expect(glbOffline?.body).toBe('v2');
  });

  it('uses cache-first for immutable Vite-hashed assets/*', async () => {
    let fetchCount = 0;
    const sw = loadSw(async () => {
      fetchCount++;
      return makeResp(`bundle-${fetchCount}`);
    });
    const url = 'https://example.test/assets/index-D01zIPyD.js';
    const first = await sw.dispatchFetch(url);
    const second = await sw.dispatchFetch(url);
    expect(first?.body).toBe('bundle-1');
    expect(second?.body).toBe('bundle-1');
    expect(fetchCount).toBe(1);
  });

  it('never caches non-OK error responses', async () => {
    const sw = loadSw(async () => makeResp('error', 503));
    const url = 'https://example.test/models/mannequin-a.glb';
    const res = await sw.dispatchFetch(url);
    expect(res?.status).toBe(503);
    expect(sw.store.get('fitting-room-shell-v2')?.has(url) ?? false).toBe(false);
  });
});
