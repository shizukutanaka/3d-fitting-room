#!/usr/bin/env node
// Verifies WORLD-CLASS.md M3: cold-start gzipped transfer <= 1 MB (1024 KiB).
// Run after `npm run build`.

import fs from 'node:fs';
import zlib from 'node:zlib';

const BUDGET_BYTES = 1024 * 1024;
const html = fs.readFileSync('dist/index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^"]+)"/g)].map((m) => `dist/${m[1]}`);
const coldFiles = [
  'dist/index.html',
  ...refs,
  'dist/models/mannequin-a.glb',
  'dist/models/mannequin-a-normal.webp',
  'dist/models/mannequin-a-ao.webp',
];

let rawSum = 0;
let gzSum = 0;
for (const f of coldFiles) {
  const b = fs.readFileSync(f);
  const g = zlib.gzipSync(b, { level: 9 }).length;
  rawSum += b.length;
  gzSum += g;
  console.log(`${f.padEnd(46)} raw ${(b.length / 1024).toFixed(1).padStart(7)} KB | gzip ${(g / 1024).toFixed(1).padStart(6)} KB`);
}
console.log(
  `${'TOTAL COLD START (M3 <= 1024 KB)'.padEnd(46)} raw ${(rawSum / 1024).toFixed(1).padStart(7)} KB | gzip ${(gzSum / 1024).toFixed(1).padStart(6)} KB`,
);
if (gzSum > BUDGET_BYTES) {
  console.error(`FAIL: cold-start gzipped transfer (${gzSum} B) exceeds M3 1 MiB budget (${BUDGET_BYTES} B)`);
  process.exit(1);
}
console.log('PASS: cold-start transfer within M3 1 MiB budget');
