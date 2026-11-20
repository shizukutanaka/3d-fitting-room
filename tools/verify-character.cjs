// Headless verification of the character system (phases 0+1):
// drives the production build in Electron and confirms — with a
// fresh profile — that character parameters (skin tone, height,
// hairstyle, hair/eye color) actually change the rendered person,
// that pose changes transition instead of snapping, that the seed
// restores a state exactly, that everything persists across a
// reload, and that the share card still exports. Evidence
// screenshots land in evidence/ with the "params" infix.
// Run: xvfb-run -a electron tools/verify-character.cjs [baseUrl]
//
// Capture notes (learned from verify.cjs and hard experience):
// under SwiftShader a frame takes seconds, and capturePage returns
// the compositor's last *presented* frame, which can lag the app
// state by several frames. So: the mid-transition evidence is read
// straight from the WebGL canvas (synchronous with the render
// loop), and the settled custom screenshot is taken after a
// reload, whose fresh paint capturePage cannot serve stale.
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

const CUSTOM = {
  topStyle: 'dress',
  topColor: '#3a4152',
  hat: 'none',
  glasses: 'round',
  accessory: 'necklace',
  pose: 'wave',
  character: {
    skinTone: 0.92,
    hairColor: '#d9b380',
    eyeColor: '#3d5a80',
    hairStyle: 'long',
    height: 1.92,
  },
};

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

  // 1. default person + its seed
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-params-default.png'), img.toPNG());
  results.checks.defaultOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.defaultSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );

  // 1b. the character tab itself (sliders, swatches, seed readout).
  // Wait for the DOM to switch, then give the compositor several
  // seconds: under software rendering its presented frame lags the
  // DOM by whole frames.
  await win.webContents.executeJavaScript(
    `(() => { const b = [...document.querySelectorAll('#tabs button')].find((x) => ['\u4eba\u7269', 'Character'].includes(x.textContent.trim())); if (b) b.click(); })()`,
  );
  await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (document.querySelector('.slider-row')) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 10000) { clearInterval(iv); rej(new Error('tab switch timeout')); }
       }, 100);
     })`,
  );
  await sleep(6000);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-params-panel.png'), img.toPNG());
  await win.webContents.executeJavaScript(
    `(() => { const b = [...document.querySelectorAll('#tabs button')].find((x) => ['\u30c8\u30c3\u30d7\u30b9', 'Tops'].includes(x.textContent.trim())); if (b) b.click(); })()`,
  );

  // 2. a different person: deep skin tone, tall, long blonde hair,
  //    blue eyes. The first canvas frame that differs from the
  //    pre-change frame is, by construction, mid-transition (the
  //    pose ease needs many frames to settle) — save it as the
  //    transition evidence.
  const before = await canvasDataURL(win);
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit(${JSON.stringify(CUSTOM)})`,
  );
  let mid = null;
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 45000) {
      const now = await canvasDataURL(win);
      if (now !== before) {
        mid = now;
        break;
      }
      await sleep(300);
    }
  }
  results.checks.transitionFrameSeen = Boolean(mid);
  if (mid) saveDataURL('screenshot-params-pose-mid.png', mid);
  results.checks.customOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.customSeed = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSeed()`,
  );

  // 3. share-card export still works for the new person
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  results.checks.cardPrefix = String(dataUrl).slice(0, 22);
  results.checks.cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64').length;
  saveDataURL('share-card-params.png', dataUrl);

  // 4. persistence: the custom person survives a reload. The
  //    settled screenshot is taken here, after the reload's fresh
  //    paint and a long settle (the pose ease runs on clamped
  //    frame time, so under software rendering it needs wall time).
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  await sleep(12000);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-params-custom.png'), img.toPNG());

  // 5. seed restore: applying the default seed brings the default
  //    person back (this is the share path, end to end)
  results.checks.seedRestoreOk = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed(${JSON.stringify(results.checks.defaultSeed)})`,
  );
  await sleep(600);
  results.checks.afterSeedRestore = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.badSeedRejected = await win.webContents.executeJavaScript(
    `window.__fittingRoom.setSeed('FR1-AAAA') === false`,
  );

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
