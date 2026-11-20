// Scene setup: renderer, pastel stage, lights, orbit camera.
// The stage is deliberately simple — a round platform on a soft
// background with a few floating low-poly stars — so screenshots
// (the product's whole point) look good with zero art assets.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  tick(timeSec: number): void;
  resize(): void;
  resetView(): void;
}

const HOME_POS = new THREE.Vector3(0, 1.45, 4.4);
const HOME_TARGET = new THREE.Vector3(0, 1.05, 0);

export function createStage(canvas: HTMLCanvasElement): Stage {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // Required so the share-card export can read the rendered frame.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#fdeef4');
  scene.fog = new THREE.Fog('#fdeef4', 9, 18);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.copy(HOME_POS);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(HOME_TARGET);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 2.2;
  controls.maxDistance = 8;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.enablePan = false;
  controls.autoRotateSpeed = 2.4;

  // ---- lights ----
  scene.add(new THREE.HemisphereLight('#fff6ec', '#d9a7bd', 0.95));
  const sun = new THREE.DirectionalLight('#ffffff', 1.6);
  sun.position.set(3.5, 6, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -3.5;
  sun.shadow.camera.right = 3.5;
  sun.shadow.camera.top = 4;
  sun.shadow.camera.bottom = -2;
  sun.shadow.radius = 4;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#bcd8ff', 0.45);
  fill.position.set(-4, 3, -2);
  scene.add(fill);

  // ---- stage floor ----
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 40),
    new THREE.MeshStandardMaterial({ color: '#fbe3ee', roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(1.25, 1.35, 0.09, 36),
    new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9, flatShading: true }),
  );
  platform.position.y = 0.045;
  platform.receiveShadow = true;
  platform.castShadow = false;
  scene.add(platform);

  const rug = new THREE.Mesh(
    new THREE.CircleGeometry(1.02, 36),
    new THREE.MeshStandardMaterial({ color: '#ffd6e8', roughness: 1 }),
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.095;
  rug.receiveShadow = true;
  scene.add(rug);

  // floating deco stars — cheap charm for screenshots
  const stars: THREE.Mesh[] = [];
  const starGeo = new THREE.OctahedronGeometry(0.09);
  const starMats = ['#ffd166', '#ff8fab', '#7cc7ff'].map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.4, flatShading: true }),
  );
  const starSpots: Array<[number, number, number]> = [
    [-1.7, 2.3, -1.2],
    [1.8, 2.7, -0.9],
    [1.5, 1.7, -1.7],
    [-1.9, 1.4, -1.5],
    [0.4, 3.1, -2.0],
  ];
  starSpots.forEach(([x, y, z], i) => {
    const s = new THREE.Mesh(starGeo, starMats[i % starMats.length]);
    s.position.set(x, y, z);
    s.scale.y = 1.6;
    scene.add(s);
    stars.push(s);
  });

  function resize(): void {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function resetView(): void {
    camera.position.copy(HOME_POS);
    controls.target.copy(HOME_TARGET);
  }

  function tick(timeSec: number): void {
    stars.forEach((s, i) => {
      s.rotation.y = timeSec * 0.7 + i;
      s.position.y += Math.sin(timeSec * 1.3 + i * 1.7) * 0.0009;
    });
    controls.update();
  }

  resize();
  return { scene, camera, renderer, controls, tick, resize, resetView };
}
