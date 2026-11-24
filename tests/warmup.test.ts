import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { depthVariantKey, materialTextures, warmDepthVariants, warmUpScene, type WarmupRenderer } from '../src/warmup';

function tex(): THREE.Texture {
  const t = new THREE.Texture();
  (t as { image: unknown }).image = { width: 4, height: 4 };
  return t;
}

function setup() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const shared = tex();
  const worn = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshPhysicalMaterial({ map: shared }));
  const hiddenBump = tex();
  const hidden = new THREE.Mesh(
    new THREE.BufferGeometry(),
    new THREE.MeshPhysicalMaterial({ map: shared, bumpMap: hiddenBump }),
  );
  hidden.visible = false;
  scene.add(worn, hidden);
  const extraTex = tex();
  const extras = new THREE.Group();
  const extraMesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ map: extraTex }));
  extras.add(extraMesh);
  return { scene, camera, worn, hidden, hiddenBump, shared, extras, extraTex, extraMesh };
}

function fakeRenderer(scene: THREE.Scene, compile: () => Promise<unknown> = () => Promise.resolve()) {
  const calls: string[] = [];
  const inited: THREE.Texture[] = [];
  const visibleAt: Record<string, number> = {};
  const count = () => {
    let n = 0;
    scene.traverseVisible((o) => {
      if (o instanceof THREE.Mesh) n += 1;
    });
    return n;
  };
  const renderer: WarmupRenderer = {
    initTexture: (t) => {
      calls.push('init');
      inited.push(t);
    },
    compileAsync: () => {
      calls.push('compile');
      visibleAt.compile = count();
      return compile();
    },
    render: () => {
      calls.push('render');
      visibleAt.render ??= count();
      visibleAt.lastRender = count();
    },
  };
  return { renderer, calls, inited, visibleAt };
}

describe('shader / texture warm-up', () => {
  it('reveals hidden garments and extras, uploads each texture once, compiles, renders, then restores', async () => {
    const s = setup();
    const f = fakeRenderer(s.scene);
    const stats = await warmUpScene(f.renderer, s.scene, s.camera, { reveal: [s.hidden, s.worn], extras: s.extras });
    expect(f.visibleAt.compile).toBe(3);
    expect(f.visibleAt.render).toBe(3);
    expect(new Set(f.inited)).toEqual(new Set([s.shared, s.hiddenBump, s.extraTex]));
    expect(f.inited).toHaveLength(3);
    // Textures first, then compile, then one frame.
    expect(f.calls).toEqual(['init', 'init', 'init', 'compile', 'render']);
    expect(stats).toMatchObject({ materials: 3, textures: 3, compiled: true });
    expect(s.hidden.visible).toBe(false);
    expect(s.worn.visible).toBe(true);
    expect(s.extras.parent).toBeNull();
  });

  it('still renders the warm frame and restores when compilation fails', async () => {
    const s = setup();
    const f = fakeRenderer(s.scene, () => Promise.reject(new Error('lost context')));
    const stats = await warmUpScene(f.renderer, s.scene, s.camera, { reveal: [s.hidden], extras: s.extras });
    expect(stats.compiled).toBe(false);
    expect(f.calls.at(-1)).toBe('render');
    expect(s.hidden.visible).toBe(false);
    expect(s.extras.parent).toBeNull();
  });

  it('does not wait forever for a compile that never settles', async () => {
    const s = setup();
    const f = fakeRenderer(s.scene, () => new Promise(() => undefined));
    const stats = await warmUpScene(f.renderer, s.scene, s.camera, { reveal: [s.hidden], timeoutMs: 20 });
    expect(stats.compiled).toBe(false);
    expect(s.hidden.visible).toBe(false);
  });

  it('restores visibility when the renderer throws', async () => {
    const s = setup();
    const f = fakeRenderer(s.scene);
    f.renderer.render = () => {
      throw new Error('boom');
    };
    await expect(warmUpScene(f.renderer, s.scene, s.camera, { reveal: [s.hidden], extras: s.extras })).rejects.toThrow('boom');
    expect(s.hidden.visible).toBe(false);
    expect(s.extras.parent).toBeNull();
  });

  it('skips textures without an image and render-target textures', () => {
    const empty = new THREE.Texture();
    (empty as { image: unknown }).image = null;
    const rt = new THREE.WebGLRenderTarget(2, 2);
    const ok = tex();
    const m = new THREE.MeshPhysicalMaterial({ map: empty, bumpMap: ok, envMap: rt.texture });
    const into = new Set<THREE.Texture>();
    materialTextures(m, into);
    expect([...into]).toEqual([ok]);
  });

  it('draws each kind of shadow caster alone, right after a caster of the other kind', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const mk = (skinned: boolean, opts: THREE.MeshStandardMaterialParameters, name: string) => {
      const m = skinned
        ? new THREE.SkinnedMesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial(opts))
        : new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial(opts));
      m.name = name;
      m.castShadow = true;
      scene.add(m);
      return m;
    };
    const t = new THREE.Texture({} as HTMLImageElement);
    mk(true, { map: t }, 'body');
    mk(true, { map: t }, 'body-twin'); // same variant: drawn with it
    mk(true, { map: t, side: THREE.DoubleSide }, 'skirt');
    mk(false, {}, 'ears');
    mk(false, { map: t }, 'bag');
    const wall = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial());
    wall.name = 'wall'; // not a caster
    scene.add(wall);
    const frames: string[] = [];
    const renderer: WarmupRenderer = {
      initTexture: () => undefined,
      compileAsync: () => Promise.resolve(),
      render: () => {
        const names: string[] = [];
        scene.traverseVisible((o) => {
          if (o instanceof THREE.Mesh) names.push(o.name);
        });
        frames.push(names.join('+'));
      },
    };
    expect(warmDepthVariants(renderer, scene, camera)).toBe(4);
    expect(frames).toEqual(['ears', 'body+body-twin', 'ears', 'skirt', 'body', 'ears', 'body', 'bag']);
    // Everything is visible again afterwards.
    scene.traverse((o) => expect(o.visible).toBe(true));
    expect(depthVariantKey(scene.getObjectByName('body') as THREE.Mesh)).toBe(
      depthVariantKey(scene.getObjectByName('body-twin') as THREE.Mesh),
    );
  });

  it('skips the depth pass warm-up when only one kind of caster exists', () => {
    const scene = new THREE.Scene();
    const m = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial());
    m.castShadow = true;
    scene.add(m);
    let renders = 0;
    const renderer: WarmupRenderer = { initTexture: () => undefined, compileAsync: () => Promise.resolve(), render: () => void (renders += 1) };
    expect(warmDepthVariants(renderer, scene, new THREE.PerspectiveCamera())).toBe(0);
    expect(renders).toBe(0);
  });
});
