// Shader and texture warm-up behind the loading screen.
//
// A garment that has never been drawn costs its first frame: the
// shader program is compiled and linked, and its textures are
// uploaded, inside that frame — a visible hitch in VR, where a
// frame is 13.9 ms. So before the loading screen lifts, every
// wardrobe item is made drawable once: all skinned garments are
// revealed, one of every procedural accessory is attached, and
//   1. every texture they use is uploaded (renderer.initTexture),
//   2. their programs are compiled without blocking the main
//      thread (renderer.compileAsync, KHR_parallel_shader_compile
//      where available),
//   3. one frame is rendered, which also covers what compile()
//      does not reach: the mirror pass (its render target has its
//      own program variants), the shadow depth programs and the
//      geometry buffers.
// Then visibility is restored.
//
// Colour variants need no programs of their own: a garment's
// colour and sheen colour are uniforms, so every swatch of an item
// runs the item's one program. Warming every *item* therefore
// covers every item x colour combination.
//
// The warm-up accessories' materials are deliberately not disposed:
// three.js deletes a program when its last material is disposed,
// and they keep the accessory programs alive while nothing of that
// kind is worn.

import * as THREE from 'three';

/** The part of WebGLRenderer the warm-up uses (stubbed in tests). */
export interface WarmupRenderer {
  initTexture(texture: THREE.Texture): void;
  compileAsync(scene: THREE.Object3D, camera: THREE.Camera): Promise<unknown>;
  render(scene: THREE.Object3D, camera: THREE.Camera): void;
}

export interface WarmupOptions {
  /** Objects to make visible for the warm-up (hidden garments). */
  reveal: THREE.Object3D[];
  /** Extra objects drawn only for the warm-up (one of each
   *  accessory); attached to `extrasParent`, removed afterwards. */
  extras?: THREE.Object3D;
  extrasParent?: THREE.Object3D;
  /** Give up waiting for compilation after this long (ms); the app
   *  must open even if a driver never reports completion. */
  timeoutMs?: number;
}

export interface WarmupStats {
  materials: number;
  textures: number;
  /** False when compileAsync failed or timed out (the warm frame
   *  is still rendered, so the work is done either way). */
  compiled: boolean;
  ms: number;
}

/** Every uploadable texture referenced by a material's properties. */
export function materialTextures(material: THREE.Material, into: Set<THREE.Texture>): void {
  for (const value of Object.values(material as unknown as Record<string, unknown>)) {
    const tex = value as THREE.Texture | null;
    if (!tex || tex.isTexture !== true) continue;
    if ((tex as THREE.Texture & { isRenderTargetTexture?: boolean }).isRenderTargetTexture) continue;
    if (!tex.image) continue;
    into.add(tex);
  }
}

export async function warmUpScene(
  renderer: WarmupRenderer,
  scene: THREE.Object3D,
  camera: THREE.Camera,
  options: WarmupOptions,
): Promise<WarmupStats> {
  const t0 = performance.now();
  const wasVisible = options.reveal.map((o) => o.visible);
  const parent = options.extrasParent ?? scene;
  for (const o of options.reveal) o.visible = true;
  if (options.extras) {
    // The extras sit wherever they were built, possibly outside the
    // camera's or the shadow camera's frustum; the warm frame must
    // draw them in every pass regardless.
    options.extras.traverse((obj) => {
      obj.frustumCulled = false;
    });
    parent.add(options.extras);
  }

  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  let compiled = false;
  try {
    scene.traverseVisible((obj) => {
      const mat = (obj as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      if (!mat) return;
      for (const m of Array.isArray(mat) ? mat : [mat]) {
        materials.add(m);
        materialTextures(m, textures);
      }
    });
    for (const tex of textures) renderer.initTexture(tex);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<false>((resolve) => {
      timer = setTimeout(() => resolve(false), options.timeoutMs ?? 10000);
    });
    try {
      compiled = await Promise.race([renderer.compileAsync(scene, camera).then(() => true as const), timeout]);
    } catch {
      compiled = false;
    } finally {
      clearTimeout(timer);
    }
    renderer.render(scene, camera);
    if (options.extras) {
      // The shadow pass draws every caster with one shared depth
      // material whose `map` follows the caster's material, and
      // three.js picks that program by draw order rather than per
      // map state. A second frame with only the map-less extras
      // gets the map-less depth variant compiled as well.
      let hid = false;
      options.extras.traverse((obj) => {
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (mat && !Array.isArray(mat) && mat.map) {
          obj.visible = false;
          hid = true;
        }
      });
      if (hid) renderer.render(scene, camera);
    }
  } finally {
    options.reveal.forEach((o, i) => {
      o.visible = wasVisible[i];
    });
    if (options.extras) {
      parent.remove(options.extras);
      options.extras.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
    }
  }
  return { materials: materials.size, textures: textures.size, compiled, ms: performance.now() - t0 };
}
