// Headless verification of the 3D file export (DESIGN.md §17):
//   1. in the app, a distinctive person + outfit is set and both
//      exports (GLB and VRM) are pulled through the bridge — the
//      bytes must be GLB containers whose extras carry the seed
//      the app reports, the named-parameter JSON and the terms;
//      the VRM must carry a VRMC_vrm extension whose meta holds
//      the required fields and whose humanoid mapping covers all
//      15 required bones of the official schema,
//   2. each file is then loaded by three.js GLTFLoader in a
//      *separate* page with its own scene (tools/import-test.html)
//      and must come back with the same mesh count, the same
//      seed, a 17-joint skin, and a bounding box as tall as the
//      person — and it must actually render in T-pose (evidence
//      screenshots).
// The exported files themselves are kept as evidence
// (evidence/exported-character.glb / .vrm).
// Run: xvfb-run -a electron tools/verify-export.cjs [appBase] [rootBase]
//   appBase  — the built app (default http://127.0.0.1:8734/)
//   rootBase — the repository root, for import-test.html and the
//              exported files (default http://127.0.0.1:8735/)
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const ROOT = process.argv[3] || 'http://127.0.0.1:8735/';
const OUT = path.join(__dirname, '..', 'evidence');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { errors: [], checks: {} };

function watch(win, tag) {
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) results.errors.push(`${tag}: ${message}`);
  });
  win.webContents.on('did-fail-load', (_e, code, desc) => {
    results.errors.push(`${tag}: did-fail-load ${code} ${desc}`);
  });
}

function waitForBridge(win) {
  return win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (window.__fittingRoom && window.__fittingRoom.ready) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 20000) { clearInterval(iv); rej(new Error('bridge timeout')); }
       }, 100);
     })`,
  );
}

async function waitForRenderedFrame(win, timeoutMs = 30000) {
  const t0 = Date.now();
  for (;;) {
    const len = await win.webContents.executeJavaScript(
      `document.getElementById('gl').toDataURL('image/png').length`,
    );
    if (len > 60000) return len;
    if (Date.now() - t0 > timeoutMs) throw new Error(`frame timeout (len=${len})`);
    await sleep(500);
  }
}

async function shootCanvas(win, file, settleMs = 2500) {
  await sleep(settleMs);
  const dataUrl = await win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
  const png = Buffer.from(String(dataUrl).split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, file), png);
  return png;
}

/** Parse the JSON chunk of a GLB buffer (node side). */
function glbJson(buf) {
  if (buf.subarray(0, 4).toString('latin1') !== 'glTF') return null;
  const jsonLength = buf.readUInt32LE(12);
  return JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));
}

// A person + outfit chosen to exercise many parts at once: long
// hair, a hat and sunglasses on the head, pants and sneakers
// below, a bag on the bag anchor, and a non-default body/face.
const CUSTOM = {
  topStyle: 'tee',
  topColor: '#7cc7ff',
  bottomStyle: 'pants',
  bottomColor: '#44557a',
  shoeStyle: 'sneakers',
  shoeColor: '#e8e2d6',
  hat: 'cap',
  glasses: 'sunglasses',
  accessory: 'bag',
  pose: 'stand',
  character: {
    skinTone: 0.35,
    hairColor: '#d9b380',
    eyeColor: '#3d5a80',
    hairStyle: 'long',
    height: 1.92,
    eyeSize: 1.15,
    eyeSpacing: 0.95,
    eyeHeight: 0.003,
    eyeShape: 0.65,
    eyeTilt: 0.1,
    browHeight: 0.004,
    browTilt: 0.08,
    noseWidth: 1.15,
    noseProminence: 1.2,
    lipWidth: 1.1,
    lipFullness: 1.3,
    faceWidth: 1.04,
    asymmetry: 0.6,
    shoulderWidth: 1.1,
    waist: 0.95,
    hip: 1.05,
    bust: 1.05,
    build: 1.1,
  },
};

// The 15 bones the VRMC_vrm 1.0 humanoid schema requires.
const REQUIRED_BONES = [
  'hips', 'spine', 'head',
  'leftUpperLeg', 'leftLowerLeg', 'leftFoot',
  'rightUpperLeg', 'rightLowerLeg', 'rightFoot',
  'leftUpperArm', 'leftLowerArm', 'leftHand',
  'rightUpperArm', 'rightLowerArm', 'rightHand',
];

async function importAndShoot(fileName, shotName, tag) {
  const win = new BrowserWindow({
    width: 950,
    height: 850,
    show: true,
    webPreferences: { sandbox: false },
  });
  watch(win, tag);
  const url = `${ROOT}tools/import-test.html?file=${encodeURIComponent(`/evidence/${fileName}`)}`;
  await win.loadURL(url);
  await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (window.__importReady) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 45000) { clearInterval(iv); rej(new Error('import timeout')); }
       }, 100);
     })`,
  );
  const imported = await win.webContents.executeJavaScript(`window.__importResult`);
  const shot = await shootCanvas(win, shotName, 1200);
  win.close();
  return { imported, shotBytes: shot.length };
}

async function main() {
  // ---- window 1: the app ----
  const win = new BrowserWindow({
    width: 1100,
    height: 850,
    show: true,
    webPreferences: { sandbox: false },
  });
  watch(win, 'app');
  await win.loadURL(BASE);
  await waitForBridge(win);
  results.checks.frameBytes = await waitForRenderedFrame(win);

  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(CUSTOM)})`,
  );
  await sleep(800);
  const seed = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.seed = seed;
  await shootCanvas(win, 'screenshot-export-source.png');

  const files = {};
  for (const format of ['glb', 'vrm']) {
    const info = await win.webContents.executeJavaScript(
      `window.__fittingRoom.export3dInfo(${JSON.stringify(format)})`,
    );
    const buf = Buffer.from(String(info.dataUrl).split(',')[1], 'base64');
    const json = glbJson(buf);
    fs.writeFileSync(path.join(OUT, `exported-character.${format}`), buf);
    files[format] = { info, json };
    results.checks[`${format}Parts`] = info.parts;
    results.checks[`${format}Bytes`] = info.bytes;
    results.checks[`${format}SeedMatches`] = info.seed === seed && json?.extras?.fittingRoomSeed === seed;
    results.checks[`${format}SizeMatches`] = buf.length === info.bytes;
    results.checks[`${format}ParamsJson`] =
      json?.extras?.fittingRoomParams?.character?.height === CUSTOM.character.height &&
      json?.extras?.fittingRoomParams?.bottomStyle === 'pants';
    results.checks[`${format}TermsPresent`] =
      typeof json?.extras?.fittingRoomTerms === 'string' &&
      json.extras.fittingRoomTerms.includes('fictional') &&
      json?.extras?.fittingRoomCharacter === 'fictional';
    results.checks[`${format}SkinJoints`] = json?.skins?.[0]?.joints?.length ?? 0;
  }
  // the app window closes before the import windows open: two
  // SwiftShader contexts on this VM starve each other.
  win.close();

  // ---- VRM structure (node side, against the official schema) ----
  const vrm = files.vrm.json?.extensions?.VRMC_vrm;
  results.checks.vrmSpecVersion = vrm?.specVersion;
  results.checks.vrmExtensionsUsed = files.vrm.json?.extensionsUsed ?? [];
  results.checks.vrmMetaRequired =
    typeof vrm?.meta?.name === 'string' &&
    Array.isArray(vrm?.meta?.authors) &&
    vrm.meta.authors.length > 0 &&
    vrm?.meta?.licenseUrl === 'https://creativecommons.org/publicdomain/zero/1.0/';
  results.checks.vrmMetaTerms =
    vrm?.meta?.avatarPermission === 'everyone' &&
    vrm?.meta?.commercialUsage === 'corporation' &&
    vrm?.meta?.modification === 'allowModificationRedistribution' &&
    vrm?.meta?.creditNotation === 'unnecessary';
  const bones = vrm?.humanoid?.humanBones ?? {};
  const nodeCount = files.vrm.json?.nodes?.length ?? 0;
  results.checks.vrmRequiredBones = REQUIRED_BONES.every(
    (b) => Number.isInteger(bones[b]?.node) && bones[b].node >= 0 && bones[b].node < nodeCount,
  );
  results.checks.vrmBoneNames = Object.keys(bones);

  // ---- windows 2/3: independent re-imports ----
  const glbImport = await importAndShoot('exported-character.glb', 'screenshot-export-roundtrip.png', 'import-glb');
  results.checks.glbImport = {
    errors: glbImport.imported.errors,
    meshes: glbImport.imported.meshes,
    seedMatches: glbImport.imported.seed === seed,
    skinJoints: glbImport.imported.skinJoints,
    hasVrm: glbImport.imported.hasVrm,
    height: glbImport.imported.height,
    shotBytes: glbImport.shotBytes,
  };
  const vrmImport = await importAndShoot('exported-character.vrm', 'screenshot-export-vrm-roundtrip.png', 'import-vrm');
  results.checks.vrmImport = {
    errors: vrmImport.imported.errors,
    meshes: vrmImport.imported.meshes,
    seedMatches: vrmImport.imported.seed === seed,
    skinJoints: vrmImport.imported.skinJoints,
    hasVrm: vrmImport.imported.hasVrm,
    height: vrmImport.imported.height,
    shotBytes: vrmImport.shotBytes,
  };

  const heightOk = (h) => typeof h === 'number' && Math.abs(h - CUSTOM.character.height) < 0.08;
  const ok =
    results.errors.length === 0 &&
    ['glb', 'vrm'].every(
      (f) =>
        results.checks[`${f}SeedMatches`] &&
        results.checks[`${f}SizeMatches`] &&
        results.checks[`${f}ParamsJson`] &&
        results.checks[`${f}TermsPresent`] &&
        results.checks[`${f}SkinJoints`] === 17,
    ) &&
    results.checks.glbParts === results.checks.vrmParts &&
    results.checks.vrmSpecVersion === '1.0' &&
    results.checks.vrmExtensionsUsed.includes('VRMC_vrm') &&
    results.checks.vrmMetaRequired &&
    results.checks.vrmMetaTerms &&
    results.checks.vrmRequiredBones &&
    results.checks.glbImport.errors.length === 0 &&
    results.checks.glbImport.meshes === results.checks.glbParts &&
    results.checks.glbImport.seedMatches &&
    results.checks.glbImport.skinJoints === 17 &&
    results.checks.glbImport.hasVrm === false &&
    heightOk(results.checks.glbImport.height) &&
    results.checks.vrmImport.errors.length === 0 &&
    results.checks.vrmImport.meshes === results.checks.vrmParts &&
    results.checks.vrmImport.seedMatches &&
    results.checks.vrmImport.skinJoints === 17 &&
    results.checks.vrmImport.hasVrm === true &&
    heightOk(results.checks.vrmImport.height);
  console.log(JSON.stringify(results, null, 2));
  app.exit(ok ? 0 : 2);
}

app
  .whenReady()
  .then(main)
  .catch((err) => {
    console.error('VERIFY FAILED:', err && err.message);
    app.exit(1);
  });
