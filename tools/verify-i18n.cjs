// Headless verification of the eight-language UI (WORLD-CLASS.md
// M8) and the adult/fictional principle's visibility (M9) in
// Electron against the production build:
//   - the principle note stands in the footer with no action at
//     all, in every one of the eight languages, switched through
//     the real language picker;
//   - the same note heads the character tab;
//   - the same note is rendered on the VR panel's extras page
//     (one press from the clothes page) and follows the language.
// Run: xvfb-run -a electron tools/verify-i18n.cjs [baseUrl]
// Use a fresh FR_USERDATA so the saved language starts unset.
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

// One marker for "fictional" and one for "adult" per language —
// the same pairs the unit test pins in tests/i18n.test.ts.
const MARKERS = {
  ja: ['架空', '成人'],
  en: ['fictional', 'adult'],
  es: ['ficticios', 'adultos'],
  zh: ['虚构', '成年'],
  fr: ['fictifs', 'adultes'],
  de: ['fiktive', 'Erwachsene'],
  pt: ['fictícios', 'adultos'],
  ko: ['가상', '성인'],
};
const LANGS = Object.keys(MARKERS);

async function setLanguage(win, lang) {
  await win.webContents.executeJavaScript(
    `(() => {
       const sel = document.getElementById('lang-select');
       sel.value = ${JSON.stringify(lang)};
       sel.dispatchEvent(new Event('change', { bubbles: true }));
     })()`,
  );
  await sleep(250);
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
  results.checks.frameBytes = await waitForRenderedFrame(win);

  // 1. the language picker offers all eight languages.
  results.checks.pickerOptions = await win.webContents.executeJavaScript(
    `[...document.getElementById('lang-select').options].map((o) => o.value)`,
  );
  results.checks.pickerHasAll8 = LANGS.every((l) => results.checks.pickerOptions.includes(l));

  // 2. M9 on the flat surface: the footer principle, per language,
  //    readable with zero actions after picking the language.
  results.checks.footerPrinciple = {};
  for (const lang of LANGS) {
    await setLanguage(win, lang);
    const state = await win.webContents.executeJavaScript(
      `({
         text: document.getElementById('footer-principle').textContent,
         docLang: document.documentElement.lang,
         firstTab: document.querySelector('#tabs button')?.textContent ?? '',
       })`,
    );
    const [fictional, adult] = MARKERS[lang];
    results.checks.footerPrinciple[lang] =
      state.docLang === lang &&
      state.text.includes(fictional) &&
      state.text.includes(adult) &&
      state.firstTab.length > 0;
  }

  // 3. M9 at the head of the character tab (Japanese).
  await setLanguage(win, 'ja');
  await win.webContents.executeJavaScript(
    `[...document.querySelectorAll('#tabs button')]
       .find((b) => b.textContent.trim() === '人物').click()`,
  );
  await sleep(400);
  results.checks.characterTabPrinciple = await win.webContents.executeJavaScript(
    `document.getElementById('options').textContent.includes('架空の成人キャラクター')`,
  );
  // Under software rendering the compositor lags the DOM by
  // seconds; give it time so the evidence frame shows the tab
  // the check just read, not the one before it.
  await sleep(2500);
  const flatImg = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-i18n-character.png'), flatImg.toPNG());

  // 4. M9 inside VR: the panel's extras page carries the note.
  //    Press the page tab through the bridge (the same dispatch a
  //    controller select uses), then read what the panel rendered.
  await win.webContents.executeJavaScript(`window.__fittingRoom.vrPress('page:1')`);
  await sleep(300);
  results.checks.vrNoteJa = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().panelNote`,
  );
  results.checks.vrNoteJaOk =
    typeof results.checks.vrNoteJa === 'string' && results.checks.vrNoteJa.includes('架空');

  // The note follows the language (Korean, then Chinese).
  await setLanguage(win, 'ko');
  results.checks.vrNoteKo = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().panelNote`,
  );
  results.checks.vrNoteKoOk =
    typeof results.checks.vrNoteKo === 'string' && results.checks.vrNoteKo.includes('가상');
  await setLanguage(win, 'zh');
  results.checks.vrNoteZh = await win.webContents.executeJavaScript(
    `window.__fittingRoom.getVrState().panelNote`,
  );
  results.checks.vrNoteZhOk =
    typeof results.checks.vrNoteZh === 'string' && results.checks.vrNoteZh.includes('虚构');

  // 5. evidence: the panel, framed, showing the note (back in
  //    Japanese for the record).
  await setLanguage(win, 'ja');
  await win.webContents.executeJavaScript(`window.__fittingRoom.viewVrPanel()`);
  await sleep(1500);
  const panelImg = await win.webContents.capturePage();
  fs.writeFileSync(path.join(OUT, 'screenshot-vr-panel-principle.png'), panelImg.toPNG());

  const bools = [
    results.checks.pickerHasAll8,
    ...LANGS.map((l) => results.checks.footerPrinciple[l]),
    results.checks.characterTabPrinciple,
    results.checks.vrNoteJaOk,
    results.checks.vrNoteKoOk,
    results.checks.vrNoteZhOk,
  ];
  results.checks.allOk = bools.every(Boolean);
  console.log(JSON.stringify(results, null, 2));
  app.exit(results.errors.length || !results.checks.allOk ? 2 : 0);
}

app
  .whenReady()
  .then(main)
  .catch((err) => {
    console.error('VERIFY FAILED:', err && err.message);
    app.exit(1);
  });
