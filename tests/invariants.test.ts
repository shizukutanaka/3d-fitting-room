import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Product invariants, pinned as tests so they cannot silently rot:
//  1. No money anywhere — no payment, donation, ad or subscription
//     machinery in the shipped source, not even as an unused hook.
//  2. No data leaves the device — no network APIs and no external
//     URLs in the app source (everything is bundled or same-origin).
// If a future change needs an exception, it must argue with mi first
// and change this test deliberately, in the open.

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
// The service worker legitimately calls fetch() — but only for
// same-origin requests (it is the offline cache). It is checked
// separately below; every other file must not touch the network.
const nonSwSource = [...texts.entries()]
  .filter(([f]) => !f.endsWith('sw.js'))
  .map(([, v]) => v)
  .join('\n');

describe('no money, no data leaves the device', () => {
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

  it('uses no network APIs and references no external URLs', () => {
    for (const pattern of ['fetch(', 'XMLHttpRequest', 'sendBeacon', 'new WebSocket', 'https://', 'http://']) {
      expect(nonSwSource).not.toContain(pattern);
    }
    expect(source).not.toContain('https://');
    expect(source).not.toContain('http://');
  });

  it('the service worker only fetches same-origin requests', () => {
    const sw = [...texts.entries()].find(([f]) => f.endsWith('sw.js'))?.[1] ?? '';
    expect(sw).toContain('origin !== self.location.origin');
  });
});
