import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Product invariants, pinned as tests so they cannot silently rot:
//  1. No money anywhere — no payment, donation, ad or subscription
//     machinery in the shipped source, not even as an unused hook.
//  2. The creator holds no user data. The app ships with NO
//     endpoint: the only network traffic allowed is to the LLM
//     endpoint the *user* configures on their own device (added
//     2026-11-20 at mi's explicit instruction — see
//     docs/DESIGN.md §11 and docs/LLM-CONNECT.md). That exception
//     is fenced in by the rules below: no hardcoded non-loopback
//     URLs anywhere, and network calls confined to the single
//     module that talks to the user's endpoint (src/llm.ts) plus
//     the service worker's same-origin offline cache.
// If a future change needs another exception, it must argue with
// mi first and change this test deliberately, in the open.

const ROOT = join(__dirname, '..');

function collect(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...collect(path, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(path);
  }
  return out;
}

const appFiles = [
  ...collect(join(ROOT, 'src'), ['.ts', '.css']),
  ...collect(join(ROOT, 'public'), ['.js', '.webmanifest']),
  join(ROOT, 'index.html'),
];

const texts = new Map(appFiles.map((f) => [f, readFileSync(f, 'utf8')]));
const source = [...texts.values()].join('\n');

const isSw = (f: string) => f.endsWith('sw.js');
const isLlmModule = (f: string) => f.endsWith(join('src', 'llm.ts'));

describe('no money; data goes only to the user-configured endpoint', () => {
  it('contains no payment / donation / ads / subscription machinery', () => {
    const banned = [
      'stripe',
      'paypal',
      'revenuecat',
      'adsbygoogle',
      'googlesyndication',
      'googletagmanager',
      'google-analytics',
      '課金',
      '投げ銭',
      '寄付',
      'donate',
      'checkout',
      'subscription',
    ];
    for (const word of banned) {
      expect(source.toLowerCase()).not.toContain(word);
    }
  });

  it('hardcodes no endpoint URLs — loopback examples in placeholders are the only URLs', () => {
    // Any absolute URL written in the source must be a loopback
    // example (an input placeholder showing the shape of a local
    // server address). A real remote endpoint in the code would
    // mean the product phones somewhere by default — banned.
    const urlPattern = /https?:\/\/[^\s"'`)<\]]+/g;
    for (const [file, text] of texts) {
      if (isSw(file)) continue;
      for (const match of text.match(urlPattern) ?? []) {
        expect(
          match.startsWith('http://localhost') || match.startsWith('http://127.0.0.1'),
          `${file} contains a non-loopback URL literal: ${match}`,
        ).toBe(true);
      }
    }
  });

  it('confines network calls to src/llm.ts and the service worker', () => {
    for (const [file, text] of texts) {
      if (isSw(file) || isLlmModule(file)) continue;
      expect(text, `${file} must not call fetch`).not.toContain('fetch(');
    }
    // No other network API may appear anywhere, llm.ts included:
    // the user's endpoint is reached with fetch, or not at all.
    for (const pattern of ['XMLHttpRequest', 'sendBeacon', 'new WebSocket', 'EventSource']) {
      expect(source).not.toContain(pattern);
    }
  });

  it('the service worker only fetches same-origin requests', () => {
    const sw = [...texts.entries()].find(([f]) => isSw(f))?.[1] ?? '';
    expect(sw).toContain('origin !== self.location.origin');
  });
});
