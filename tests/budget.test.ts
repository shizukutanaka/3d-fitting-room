import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

describe('M3 transfer budget & mannequin GLB integrity', () => {
  for (const id of ['a', 'b'] as const) {
    it(`mannequin-${id}.glb stays under 600 KiB gzipped and loads cleanly in Three.js GLTFLoader`, async () => {
      const buf = readFileSync(new URL(`../public/models/mannequin-${id}.glb`, import.meta.url));
      const gzBytes = gzipSync(buf, { level: 9 }).length;
      expect(gzBytes).toBeLessThan(600 * 1024);

      const ab = new Uint8Array(buf).buffer;
      const gltf = await new GLTFLoader().parseAsync(ab, '');
      let skinnedCount = 0;
      gltf.scene.traverse((obj) => {
        if (!(obj instanceof THREE.SkinnedMesh)) return;
        skinnedCount++;
        const pos = obj.geometry.getAttribute('position');
        const nor = obj.geometry.getAttribute('normal');
        const sw = obj.geometry.getAttribute('skinWeight');
        expect(pos.count).toBeGreaterThan(0);
        expect(nor.count).toBe(pos.count);
        expect(sw.count).toBe(pos.count);
        // Spot-check normalized skin weights sum to ~1
        for (let i = 0; i < Math.min(20, pos.count); i++) {
          const sum = sw.getX(i) + sw.getY(i) + sw.getZ(i) + sw.getW(i);
          expect(sum).toBeCloseTo(1, 2);
        }
      });
      expect(skinnedCount).toBeGreaterThanOrEqual(10);
    });
  }
});
