// Headless verification of the bring-your-own-SD connection:
// against a local AUTOMATIC1111-shaped stub
// (tools/stub-sd-server.cjs), drive the production build in
// Electron and confirm the whole path — save settings,
// connection test, the auto-built prompt following the current
// person and outfit, txt2img generation, img2img generation
// with the live rendering as the input image, the generated
// image's share card (seed embedded), and settings persistence
// across a reload — with a fresh profile. No real SD server,
// model or network is touched; the stub returns a fixed PNG.
// Run: xvfb-run -a electron tools/verify-sd.cjs [baseUrl] [stubBaseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const STUB = process.argv[3] || 'http://127.0.0.1:17860';
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

async function poll(win, expr, timeoutMs, label) {
  const t0 = Date.now();
  for (;;) {
    const v = await win.webContents.executeJavaScript(expr);
    if (v) return v;
    if (Date.now() - t0 > timeoutMs) throw new Error(`poll timeout: ${label}`);
    await sleep(400);
  }
}

function stubLast() {
  return new Promise((resolve, reject) => {
    http
      .get(`${STUB}/__last`, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
}

async function pollStub(field, timeoutMs, label) {
  const t0 = Date.now();
  for (;;) {
    const last = await stubLast();
    if (last[field]) return last[field];
    if (Date.now() - t0 > timeoutMs) throw new Error(`poll timeout: ${label}`);
    await sleep(400);
  }
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
  await sleep(1000);

  console.log('STEP 1');
  // 1. open the AI tab (last tab) and fill the SD settings form
  await win.webContents.executeJavaScript(
    `(() => { const tabs = document.querySelectorAll('#tabs button'); tabs[tabs.length - 1].click(); })()`,
  );
  await poll(win, `Boolean(document.getElementById('sd-endpoint'))`, 10000, 'sd form');
  results.checks.savedSettings = await win.webContents.executeJavaScript(
    `(() => {
       const set = (id, v) => {
         const n = document.getElementById(id);
         n.value = v;
         n.dispatchEvent(new Event('input', { bubbles: true }));
       };
       set('sd-endpoint', ${JSON.stringify(STUB)});
       set('sd-auth', 'user:pass');
       document.getElementById('sd-save').click();
       return localStorage.getItem('fitting-room.sd.v1');
     })()`,
  );

  console.log('STEP 2');
  // 2. connection test against the stub's checkpoint list
  await win.webContents.executeJavaScript(`document.getElementById('sd-test').click()`);
  results.checks.testStatus = await poll(
    win,
    `(() => {
       const s = document.querySelector('.sd-status');
       return s && s.textContent.includes('stub-model-v1') ? s.textContent : null;
     })()`,
    90000,
    'sd connection test',
  );
  await win.webContents.executeJavaScript(
    `document.getElementById('sd-endpoint').scrollIntoView({ block: 'center' })`,
  );
  await sleep(3000);
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-sd-settings.png'), img.toPNG());

  console.log('STEP 3');
  // 3. the auto-built prompt describes the default person/outfit
  results.checks.defaultPrompt = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSdState()`,
  );

  console.log('STEP 4');
  // 4. change the person and outfit; the prompt preview follows
  await win.webContents.executeJavaScript(
    `window.__fittingRoom.setOutfit({
       topStyle: 'dress',
       topColor: '#3a4152',
       character: {
         ...window.__fittingRoom.getOutfit().character,
         hairStyle: 'ponytail',
         hairColor: '#d9b380',
       },
     })`,
  );
  results.checks.previewPrompt = await poll(
    win,
    `(() => {
       const p = document.getElementById('sd-prompt-preview');
       return p && p.value.includes('ponytail') && p.value.includes('one-piece dress')
         ? p.value
         : null;
     })()`,
    30000,
    'prompt preview follows state',
  );

  console.log('STEP 5');
  // 5. txt2img: the stub receives the built prompt; the result
  //    image lands in the app with the generation-time seed
  await win.webContents.executeJavaScript(`document.getElementById('sd-gen-txt2img').click()`);
  results.checks.afterTxt2Img = await poll(
    win,
    `(() => {
       const s = window.__fittingRoom.getSdState();
       return s.hasResult ? s : null;
     })()`,
    90000,
    'txt2img result held',
  );
  results.checks.stubTxt2Img = await pollStub('txt2img', 30000, 'stub saw txt2img');
  results.checks.resultSeedMatches = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getSdState().resultSeed === window.__fittingRoom.getSeed()`,
  );
  await win.webContents.executeJavaScript(
    `document.getElementById('sd-result-img').scrollIntoView({ block: 'center' })`,
  );
  await sleep(3000);
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-sd-result.png'), img.toPNG());

  console.log('STEP 6');
  // 6. img2img: the stub must receive the live rendering as the
  //    init image (a real PNG), with the anchoring prompt
  await win.webContents.executeJavaScript(`document.getElementById('sd-gen-img2img').click()`);
  results.checks.stubImg2Img = await pollStub('img2img', 90000, 'stub saw img2img');
  await poll(
    win,
    `(() => {
       const s = document.querySelector('.sd-status');
       return s && !s.textContent.includes('…') ? s.textContent : null;
     })()`,
    90000,
    'img2img finished',
  );

  console.log('STEP 7');
  // 7. the generated image's share card carries the seed of the
  //    person it was generated from (the card restore path)
  const cardDataUrl = await win.webContents.executeJavaScript(
    `window.__fittingRoom.sdCardDataURL()`,
  );
  const cardBytes = Buffer.from(cardDataUrl.split(',')[1], 'base64');
  const seed = await win.webContents.executeJavaScript(`window.__fittingRoom.getSeed()`);
  results.checks.card = {
    bytes: cardBytes.length,
    isPng: cardBytes.subarray(0, 4).toString('hex') === '89504e47',
    embedsSeed: cardBytes.includes(Buffer.from(seed, 'utf8')),
    seed,
  };
  fs.writeFileSync(path.join(OUT, 'share-card-sd.png'), cardBytes);

  console.log('STEP 8');
  // 8. reload: settings persist; the held image is session-only
  //    by design (downloads/cards are its persistence)
  await win.webContents.reload();
  await waitForBridge(win);
  await sleep(2000);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `(() => ({
       settings: localStorage.getItem('fitting-room.sd.v1'),
       state: window.__fittingRoom.getSdState(),
     }))()`,
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
