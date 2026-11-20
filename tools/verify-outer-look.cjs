// Quick visual check of the outerwear shells (not part of the
// regression suite): screenshots each outer style over a tee,
// and a coat over the long dress, from the WebGL canvas.
// Run: xvfb-run -a electron tools/verify-outer-look.cjs [baseUrl]
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FR_USERDATA) app.setPath('userData', process.env.FR_USERDATA);
app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const BASE = process.argv[2] || 'http://127.0.0.1:8741/';
const OUT = path.join(__dirname, '..', 'evidence');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(win, file) {
  await sleep(2200);
  const dataUrl = await win.webContents.executeJavaScript(
    `document.getElementById('gl').toDataURL('image/png')`,
  );
  fs.writeFileSync(path.join(OUT, file), Buffer.from(String(dataUrl).split(',')[1], 'base64'));
}

async function main() {
  const win = new BrowserWindow({ width: 900, height: 800, show: true, webPreferences: { sandbox: false } });
  win.webContents.on('console-message', (_e, level, message) => {
    if (level >= 3) console.log('PAGE ERROR:', message);
  });
  await win.loadURL(BASE);
  await win.webContents.executeJavaScript(
    `new Promise((res, rej) => { const iv = setInterval(() => { if (window.__fittingRoom?.ready) { clearInterval(iv); res(true); } }, 100); setTimeout(() => rej(new Error('timeout')), 20000); })`,
  );
  const set = async (o) => {
    await win.webContents.executeJavaScript(`window.__fittingRoom.setOutfit(${JSON.stringify(o)})`);
    const now = await win.webContents.executeJavaScript(`window.__fittingRoom.getOutfit()`);
    console.log('STATE:', JSON.stringify(now));
  };
  await set({ topStyle: 'tee', topColor: '#7cc7ff', bottomStyle: 'pants', hat: 'none', accessory: 'none', glasses: 'none', outerStyle: 'coat', outerColor: '#7a2e3a' });
  await shoot(win, 'screenshot-outer-coat.png');
  await set({ outerStyle: 'jacket', outerColor: '#6b7250' });
  await shoot(win, 'screenshot-outer-jacket.png');
  await set({ outerStyle: 'cardigan', outerColor: '#2c3a55' });
  await shoot(win, 'screenshot-outer-cardigan.png');
  await set({ topStyle: 'dressLong', topColor: '#7cc7ff', outerStyle: 'coat', outerColor: '#26262b', bottomStyle: 'none' });
  await shoot(win, 'screenshot-outer-overdress.png');
  app.exit(0);
}
app.whenReady().then(main).catch((e) => { console.error(e); app.exit(1); });
