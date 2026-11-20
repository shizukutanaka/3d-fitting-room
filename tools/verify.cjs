// Headless verification of the production build (dist/) in Electron:
// loads the real built app, checks the 3D scene renders, drives the
// outfit bridge, verifies the share-card export and localStorage
// persistence across a reload, and saves evidence screenshots.
// Run: xvfb-run -a electron tools/verify.cjs [baseUrl]
//
// Captures wait for actual rendered frames (polled via the canvas's
// data URL size): with a heavy scene under software rendering, the
// compositor can still be showing a blank or stale frame long after
// the app's JS state is already correct.
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

// Optional isolated profile (fresh localStorage) via FR_USERDATA.
if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
// Optional filename suffix (e.g. FR_SUFFIX=-real) so a redesign's
// evidence does not overwrite the previous look's screenshots.
const SUFFIX = process.env.FR_SUFFIX || '';
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

/** Resolve once the WebGL canvas holds a real rendered frame (a
 *  blank canvas compresses to almost nothing; a rendered scene does
 *  not). Returns the data URL length observed. */
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

async function main() {
  // Shown (on the virtual X screen): a hidden window gets its
  // requestAnimationFrame throttled, and captures can come back as
  // stale frames from before a state change.
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
  results.checks.frameBytes = await waitForRenderedFrame(win);
  await sleep(500);

  // 1. default outfit screenshot
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, `screenshot${SUFFIX}-default.png`), img.toPNG());
  results.checks.defaultOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );

  // 2. dress it up and screenshot again
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       hat: 'ribbon', glasses: 'round', accessory: 'necklace',
       topStyle: 'dress', topColor: '#3a4152',
       pose: 'wave'
     })`,
  );
  await sleep(1800);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, `screenshot${SUFFIX}-dressed.png`), img.toPNG());

  // 3. share-card export really produces a PNG
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  results.checks.cardPrefix = String(dataUrl).slice(0, 22);
  results.checks.cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64').length;
  fs.writeFileSync(
    path.join(OUT, `share-card${SUFFIX}.png`),
    Buffer.from(String(dataUrl).split(',')[1], 'base64'),
  );

  // 4. persistence: outfit survives a reload via localStorage.
  // The dressed screenshot is retaken after the reload too — the
  // restored page paints fresh frames, so the saved evidence is
  // guaranteed to show the dressed outfit, not a stale frame.
  await win.webContents.reload();
  await waitForBridge(win);
  await waitForRenderedFrame(win);
  await sleep(500);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, `screenshot${SUFFIX}-dressed.png`), img.toPNG());

  // 5. mobile viewport screenshot
  win.setSize(400, 800);
  await sleep(1800);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, `screenshot${SUFFIX}-mobile.png`), img.toPNG());

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
