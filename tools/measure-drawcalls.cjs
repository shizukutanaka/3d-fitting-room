// Draw-call measurement only: loads the production build (dist/)
// in Electron under SwiftShader, waits for the bridge, and prints
// measureStageStats() as JSON. Used to track the WORLD-CLASS M2
// budget work (mesh merging) with the app's own measurement hook.
// Run: xvfb-run -a <electron> tools/measure-drawcalls.cjs
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

app.commandLine.appendSwitch('use-angle', 'swiftshader');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const DIST = path.join(__dirname, '..', 'dist');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

app.whenReady().then(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const win = new BrowserWindow({ width: 1100, height: 850, show: false });
  try {
    await win.loadURL(`http://127.0.0.1:${port}/`);
    await win.webContents.executeJavaScript(
      `new Promise((res, rej) => {
         const t0 = Date.now();
         const iv = setInterval(() => {
           if (window.__fittingRoom && window.__fittingRoom.ready) { clearInterval(iv); res(true); }
           else if (Date.now() - t0 > 30000) { clearInterval(iv); rej(new Error('bridge timeout')); }
         }, 100);
       })`,
    );
    // Let a few real frames render so the measured frame is the
    // steady-state scene, not the first paint.
    await sleep(3000);
    const stats = await win.webContents.executeJavaScript(`window.__fittingRoom.measureStageStats()`);
    console.log('DRAWCALLS ' + JSON.stringify(stats));
    if (process.env.FR_SHOT) {
      const img = await win.capturePage();
      fs.writeFileSync(process.env.FR_SHOT, img.toPNG());
      console.log('SHOT saved');
    }
  } catch (e) {
    console.log('DRAWCALLS_ERROR ' + (e && e.message ? e.message : String(e)));
  } finally {
    app.quit();
    server.close();
  }
});
