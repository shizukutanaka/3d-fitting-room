// Headless verification of the bring-your-own-LLM connection:
// against a local OpenAI-compatible stub (tools/stub-llm-server.cjs),
// drive the production build in Electron and confirm the whole
// path — save settings, connection test, natural-language chat,
// validated command application, persistence — with a fresh
// profile. Also exercises the agent bridge (runCommands clamping
// and rejection, commandSpec). No real LLM or network is touched.
// Run: xvfb-run -a electron tools/verify-llm.cjs [baseUrl] [stubBaseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8734/';
const STUB = process.argv[3] || 'http://127.0.0.1:18734/v1';
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
  // 1. open the AI tab (last tab) and fill the settings form
  await win.webContents.executeJavaScript(
    `document.querySelectorAll('#tabs button')[6].click()`,
  );
  await poll(win, `Boolean(document.getElementById('llm-endpoint'))`, 10000, 'llm form');
  await win.webContents.executeJavaScript(
    `(() => {
       const set = (id, v) => {
         const n = document.getElementById(id);
         n.value = v;
         n.dispatchEvent(new Event('input', { bubbles: true }));
       };
       set('llm-endpoint', ${JSON.stringify(STUB)});
       set('llm-model', 'stub-model-1');
       document.getElementById('llm-save').click();
       return localStorage.getItem('fitting-room.llm.v1');
     })()`,
  ).then((saved) => {
    results.checks.savedSettings = saved;
  });

  console.log('STEP 2');
  // 2. connection test against the stub's model list
  await win.webContents.executeJavaScript(`document.getElementById('llm-test').click()`);
  results.checks.testStatus = await poll(
    win,
    `(() => {
       const s = document.querySelector('.llm-status');
       return s && s.textContent.includes('stub-model-1') ? s.textContent : null;
     })()`,
    90000,
    'connection test',
  );
  // give the compositor time to present the panel before capture
  await sleep(5000);
  let img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-llm-settings.png'), img.toPNG());

  console.log('STEP 3');
  // 3. natural-language instruction -> stub commands -> applied
  await win.webContents.executeJavaScript(
    `(() => {
       const n = document.getElementById('llm-chat-input');
       n.value = 'change into a dress and wave';
       document.getElementById('llm-send').click();
       return true;
     })()`,
  );
  results.checks.afterChat = await poll(
    win,
    `(() => {
       const o = window.__fittingRoom.getOutfit();
       return o.topStyle === 'dress' && o.pose === 'wave' && o.character.skinTone === 0.9 ? o : null;
     })()`,
    90000,
    'chat commands applied',
  );
  results.checks.chatLog = await poll(
    win,
    `(() => {
       const log = document.getElementById('llm-chat-log');
       return log && log.textContent.includes('Stub: changed into a dress.') ? log.textContent : null;
     })()`,
    60000,
    'chat log shows reply',
  );

  console.log('STEP 4');
  // 4. persistence: reload — the LLM-changed look (and the saved
  //    settings) survive. Settled screenshot after the fresh paint.
  await win.webContents.reload();
  await waitForBridge(win);
  await sleep(12000);
  results.checks.afterReload = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getOutfit()`,
  );
  results.checks.settingsAfterReload = await win.webContents.executeJavaScript(
    `localStorage.getItem('fitting-room.llm.v1')`,
  );
  img = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-llm-applied.png'), img.toPNG());

  console.log('STEP 5');
  // 5. agent bridge: same validation — out-of-range clamps,
  //    unknown commands reject, spec is generated from the specs
  results.checks.bridge = await win.webContents.executeJavaScript(
    `(() => {
       const r = window.__fittingRoom.runCommands([
         { type: 'set_character', param: 'height', value: 9 },
         { type: 'teleport', value: 'moon' },
       ]);
       return {
         applied: r.applied,
         rejected: r.rejected,
         height: r.outfit.character.height,
         specHasSkinTone: window.__fittingRoom.commandSpec().includes('"param":"skinTone"'),
       };
     })()`,
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
