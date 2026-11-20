// A minimal AUTOMATIC1111-shaped stub for headless verification
// of the SD connection (tools/verify-sd.cjs). NOT a product
// component — it stands in for the user's own local Stable
// Diffusion WebUI server so the full path — connection test,
// txt2img, img2img with the live rendering as input, card
// composition — can be proven without a real model, GPU or
// network.
// Run: node tools/stub-sd-server.cjs [port]   (default 17860)
//
// Behavior:
//  - GET  /sdapi/v1/sd-models -> one checkpoint, "stub-model-v1"
//  - POST /sdapi/v1/txt2img   -> a fixed PNG (built below with
//    node's zlib: a teal-to-pink gradient with a white disc)
//  - POST /sdapi/v1/img2img   -> the same fixed PNG
//  - GET  /__last             -> what the last generation
//    requests carried (prompt, negative prompt, whether an
//    init image arrived and how large it was), so the verify
//    script can prove img2img really sent the rendering.
const http = require('node:http');
const zlib = require('node:zlib');

const PORT = Number(process.argv[2] || 17860);

// ---- a tiny fixed PNG, encoded in-process ----
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function fixedPngBase64() {
  const W = 128;
  const H = 128;
  const raw = Buffer.alloc(H * (1 + W * 3));
  let p = 0;
  for (let y = 0; y < H; y++) {
    raw[p++] = 0;
    for (let x = 0; x < W; x++) {
      let r = Math.round(60 + (160 * x) / W);
      let g = Math.round(180 - (100 * y) / H);
      let b = Math.round(200 - (80 * x) / W);
      if ((x - 64) ** 2 + (y - 64) ** 2 < 30 ** 2) {
        r = 250;
        g = 246;
        b = 240;
      }
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor RGB
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  return png.toString('base64');
}
const FIXED_PNG = fixedPngBase64();

const last = { txt2img: null, img2img: null };

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
}

function readJson(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  const url = req.url || '';
  if (req.method === 'GET' && url.endsWith('/sdapi/v1/sd-models')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify([
        {
          title: 'stub-model-v1.safetensors [0123abcdef]',
          model_name: 'stub-model-v1',
          hash: '0123abcdef',
          filename: 'stub-model-v1.safetensors',
        },
      ]),
    );
    return;
  }
  if (req.method === 'GET' && url.endsWith('/__last')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(last));
    return;
  }
  if (req.method === 'POST' && url.endsWith('/sdapi/v1/txt2img')) {
    const body = await readJson(req);
    last.txt2img = {
      prompt: body.prompt ?? null,
      negative_prompt: body.negative_prompt ?? null,
      width: body.width ?? null,
      height: body.height ?? null,
      auth: req.headers.authorization ?? null,
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ images: [FIXED_PNG], parameters: {}, info: '' }));
    return;
  }
  if (req.method === 'POST' && url.endsWith('/sdapi/v1/img2img')) {
    const body = await readJson(req);
    const init = Array.isArray(body.init_images) ? body.init_images : [];
    last.img2img = {
      prompt: body.prompt ?? null,
      negative_prompt: body.negative_prompt ?? null,
      denoising_strength: body.denoising_strength ?? null,
      initCount: init.length,
      initFirstLength: init.length ? String(init[0]).length : 0,
      initLooksPng:
        init.length > 0 &&
        Buffer.from(String(init[0]), 'base64').subarray(0, 4).toString('hex') === '89504e47',
      auth: req.headers.authorization ?? null,
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ images: [FIXED_PNG], parameters: {}, info: '' }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`stub-sd listening on 127.0.0.1:${PORT}`);
});
