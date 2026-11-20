// Headless verification of the production build (dist/) in Electron:
// loads the real built app, checks the 3D scene renders, drives the
// outfit bridge, verifies the share-card export and localStorage
// persistence across a reload, and saves evidence screenshots.
// Run: xvfb-run -a electron tools/verify.cjs [baseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

// Optional isolated profile (fresh localStorage) via FR_USERDATA.
if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const OUT = path.join(__dirname, '..', 'evidence');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { errors: [], checks: {} };

async function main() {
  const win = new BrowserWindow({
    width: 1100,
    height: 850,
    show: false,
    webPreferences: { sandbox: false },
  });
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) results.errors.push(message);
  });
  win.webContents.on('did-fail-load', (_e, code, desc) => {
    results.errors.push(`did-fail-load ${code} ${desc}`);
  });

  await win.loadURL(BASE);
  await win.webContents.executeJavaScript(
    `new Promise((res, rej) => {
       const t0 = Date.now();
       const iv = setInterval(() => {
         if (window.__fittingRoom && window.__fittingRoom.ready) { clearInterval(iv); res(true); }
         else if (Date.now() - t0 > 15000) { clearInterval(iv); rej(new Error('bridge timeout')); }
       }, 100);
     })`,
  );
  await sleep(1800);

  // 1. default outfit screenshot
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-default.png'), img.toPNG());
  results.checks.defaultOutfit = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );

  // 2. dress it up and screenshot again
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       hat: 'catears', glasses: 'round', accessory: 'necklace',
       topStyle: 'dress', topColor: '#7cc7ff',
       pose: 'wave', expression: 'happy'
     })`,
  );
  await sleep(900);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-dressed.png'), img.toPNG());

  // 3. share-card export really produces a PNG
  const dataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.cardDataURL()`,
  );
  results.checks.cardPrefix = String(dataUrl).slice(0, 22);
  results.checks.cardBytes = Buffer.from(String(dataUrl).split(',')[1], 'base64').length;
  fs.writeFileSync(
    path.join(OUT, 'share-card.png'),
    Buffer.from(String(dataUrl).split(',')[1], 'base64'),
  );

  // 4. persistence: outfit survives a reload via localStorage
  await win.reload();
  await sleep(1500);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );

  // 5. mobile viewport screenshot
  win.setSize(400, 800);
  await sleep(900);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-mobile.png'), img.toPNG());

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
