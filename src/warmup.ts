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

/** What decides which depth-pass program a shadow caster needs. */
export function depthVariantKey(mesh: THREE.Mesh): string {
  const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
  const morphs = mesh.geometry?.morphAttributes ?? {};
  return [
    (mesh as THREE.SkinnedMesh).isSkinnedMesh === true ? 's' : '-',
    Object.keys(morphs).length > 0 ? 'm' : '-',
    mat.shadowSide ?? mat.side,
    mat.map ? 'uv' : '-',
    mat.alphaTest > 0 ? 'a' : '-',
  ].join('|');
}

/** Compile every depth-pass (shadow) program variant.
 *
 *  three.js draws all shadow casters with one shared depth
 *  material, copying side and map from each caster's own material
 *  but re-selecting the program only when the kind of object
 *  changes (skinned / morphed / static). Which variants a normal
 *  frame compiles therefore depends on the order casters happen to
 *  be drawn in — and so on the outfit worn at load. Here each kind
 *  of caster is drawn on its own, right after a caster of the other
 *  kind, which forces the selection for exactly its variant. With
 *  everything else hidden these frames cost next to nothing. */
export function warmDepthVariants(renderer: WarmupRenderer, scene: THREE.Object3D, camera: THREE.Camera): number {
  const meshes: THREE.Mesh[] = [];
  const hidden: THREE.Object3D[] = [];
  scene.traverseVisible((obj) => {
    if ((obj as THREE.Mesh).isMesh !== true) return;
    hidden.push(obj);
    if (obj.castShadow) meshes.push(obj as THREE.Mesh);
  });
  // All casters of a variant are drawn together: any single one
  // might be outside the light's frustum and never reach the pass.
  const variants = new Map<string, THREE.Mesh[]>();
  for (const m of meshes) {
    const key = depthVariantKey(m);
    const group = variants.get(key);
    if (group) group.push(m);
    else variants.set(key, [m]);
  }
  const skinned = meshes.find((m) => (m as THREE.SkinnedMesh).isSkinnedMesh === true);
  const fixed = meshes.find((m) => (m as THREE.SkinnedMesh).isSkinnedMesh !== true);
  if (!skinned || !fixed) return 0;
  for (const o of hidden) o.visible = false;
  try {
    for (const group of variants.values()) {
      const other = (group[0] as THREE.SkinnedMesh).isSkinnedMesh === true ? fixed : skinned;
      other.visible = true;
      renderer.render(scene, camera);
      other.visible = false;
      for (const m of group) m.visible = true;
      renderer.render(scene, camera);
      for (const m of group) m.visible = false;
    }
  } finally {
    for (const o of hidden) o.visible = true;
  }
  return variants.size;
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
    warmDepthVariants(renderer, scene, camera);
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
