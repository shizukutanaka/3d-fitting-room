// Headless verification of the character system phase 2 (face and
// eyes): drives the production build in Electron with a fresh
// profile and confirms that the rebuilt eyes (sclera / iris /
// cornea) render, that the face parameters change the rendered
// face, that the gaze tracks the camera, that face parameters
// persist across a reload, and that seed format v2 restores a
// state while a v1 seed still decodes. Evidence screenshots land
// in evidence/ with the "face" infix.
// Run: xvfb-run -a electron tools/verify-face.cjs [baseUrl]
//
// Capture notes: same as verify-character.cjs — under SwiftShader
// the compositor lags, so face evidence is read straight from the
// WebGL canvas (synchronous with the render loop) after a settle
// wait, not via capturePage.
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const OUT = path.join(__dirname, '..', 'evidence');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { errors: [], checks: {} };

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

async function canvasDataURL(win) {
  return win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
}

async function waitForRenderedFrame(win, timeoutMs = 30000) {
  const t0 = Date.now();
  for (;;) {
    const url = await canvasDataURL(win);
    if (url.length > 60000) return url;
    if (Date.now() - t0 > timeoutMs) throw new Error(`frame timeout (len=${url.length})`);
    await sleep(500);
  }
}

function saveDataURL(file, dataUrl) {
  fs.writeFileSync(
    path.join(OUT, file),
    Buffer.from(String(dataUrl).split(',')[1], 'base64'),
  );
}

// A visibly different but plausible face: larger rounder eyes,
// narrower spacing, raised brows, wider nose and mouth, fuller
// lips, wider face, strong (still millimetre-scale) asymmetry.
const CUSTOM_FACE = {
  skinTone: 0.28,
  hairColor: '#503729',
  eyeColor: '#3d5a80',
  hairStyle: 'bob',
  height: 1.74,
  eyeSize: 1.2,
  eyeSpacing: 0.9,
  eyeHeight: -0.004,
  eyeShape: 0.6,
  eyeTilt: 0.15,
  browHeight: 0.005,
  browTilt: -0.1,
  noseWidth: 1.25,
  noseProminence: 1.3,
  lipWidth: 1.2,
  lipFullness: 1.4,
  faceWidth: 1.06,
  asymmetry: 0.9,
};

// A hand-built v1 seed (pre-face format): hoodie, blue top, cap,
// round glasses, necklace, wave; height 1.71, blonde, blue eyes,
// short hair. The face must load with defaults.
const V1_SEED = `FR1-${Buffer.from([1, 204, 26, 6, 4, 2, 1, 2, 1, 1, 1, 1]).toString('base64url')}`;

async function focusAndShoot(win, angleDeg, file, settleMs = 9000) {
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.focusFace(${angleDeg})`,
  );
  await sleep(settleMs);
  const url = await canvasDataURL(win);
  saveDataURL(file, url);
  return url;
}

async function main() {
  const win = new BrowserWindow({
    width: 1100,
    height: 850,
    show: true,
    webPreferences: { sandbox: false },
  });
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) results.errors.push(message);
  });
  win.webContents.on('did-fail-load', (_e, code, desc) => {
    results.errors.push(`did-fail-load ${code} ${desc}`);
  });

  await win.loadURL(BASE);
  await waitForBridge(win);
  results.checks.frameBytes = (await waitForRenderedFrame(win)).length;
  await sleep(500);

  // 1. default face, close up, and its (v2) seed
  results.checks.defaultOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.defaultSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  const defaultShot = await focusAndShoot(win, 0, 'screenshot-face-default.png');

  // 2. a different face: parameters apply to state and rendering
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({ character: ${JSON.stringify(CUSTOM_FACE)} })`,
  );
  results.checks.customOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  const customShot = await focusAndShoot(win, 0, 'screenshot-face-custom.png');
  results.checks.faceShotChanged = customShot !== defaultShot;

  // 3. gaze: from a 55° azimuth the eyes should have turned toward
  //    the camera — the shot must differ from the frontal one, and
  //    reading it (evidence) shows the irises on the camera side.
  const gazeShot = await focusAndShoot(win, 55, 'screenshot-face-gaze.png');
  results.checks.gazeShotChanged = gazeShot !== customShot;

  // 4. share-card export still works
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  results.checks.cardPrefix = String(dataUrl).slice(0, 22);
  results.checks.cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64').length;
  saveDataURL('share-card-face.png', dataUrl);

  // 5. persistence: face parameters survive a reload exactly
  //    (localStorage holds the unquantized values)
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );

  // 6. seed paths: v2 restore, v1 acceptance, garbage rejection
  results.checks.customSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );
  results.checks.seedRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(results.checks.defaultSeed)})`,
  );
  await sleep(400);
  results.checks.afterSeedRestore = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.v1SeedAccepted = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(V1_SEED)})`,
  );
  await sleep(400);
  results.checks.afterV1Seed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.badSeedRejected = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed('FR2-AAAA') === false`,
  );

  // 7. the character panel shows the face sliders
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(results.checks.defaultSeed)})`,
  );
  await win.webContents.executeJavaScript(
    `(() => { const b = [...document.querySelectorAll('#tabs button')].find((x) => ['\u4eba\u7269', 'Character'].includes(x.textContent.trim())); if (b) b.click(); })()`,
  );
  results.checks.sliderRows = await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         const n = document.querySelectorAll('.slider-row').length;
         if (n >= 15) { clearInterval(iv); res(n); }
         else if (Date.now() - t0 > 10000) { clearInterval(iv); rej(new Error('panel timeout')); }
       }, 100);
     })`,
  );
  await sleep(6000);
  const img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-face-panel.png'), img.toPNG());

  console.log(JSON.stringify(results, null, 2));
  app.exit(results.errors.length ? 2 : 0);
}

app
  .whenReady()
  .then(main)
  .catch((err) => {
    console.error('VERIFY FAILED:', err && err.message);
    app.exit(1);
  });
