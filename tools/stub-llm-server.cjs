// A minimal OpenAI-compatible stub for headless verification of
// the LLM connection (tools/verify-llm.cjs). NOT a product
// component — it stands in for the user's own local LLM server
// (Ollama / LM Studio shape) so the full path — connection test,
// chat request, command validation, application — can be proven
// without touching a real model or the network.
// Run: node tools/stub-llm-server.cjs [port]   (default 18734)
//
// Behavior:
//  - GET  /v1/models            -> one model, "stub-model-1"
//  - POST /v1/chat/completions  -> a fixed, valid command envelope
//    (dress + navy + deeper skin tone + wave). If the user message
//    contains "full", a second envelope exercises the categories
//    added after the protocol was first written (phase-2 face
//    parameters, bottoms, shoes, phase-3 body parameters) to
//    prove they are commandable through the generated protocol.
//    If it contains "bad", the
//    envelope also emits an out-of-range value and an unknown
//    command so the rejection path is exercised.
const http = require('node:http');

const PORT = Number(process.argv[2] || 18734);

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
}

const server = http.createServer((req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === 'GET' && req.url.endsWith('/models')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ object: 'list', data: [{ id: 'stub-model-1', object: 'model' }] }));
    return;
  }
  if (req.method === 'POST' && req.url.endsWith('/chat/completions')) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      let userText = '';
      try {
        const parsed = JSON.parse(body);
        const msgs = Array.isArray(parsed.messages) ? parsed.messages : [];
        const lastUser = [...msgs].reverse().find((m) => m.role === 'user');
        userText = typeof lastUser?.content === 'string' ? lastUser.content : '';
      } catch {
        // fall through with the default command set
      }
      let commands = [
        { type: 'set_top_style', value: 'dress' },
        { type: 'set_top_color', value: '#3a4152' },
        { type: 'set_character', param: 'skinTone', value: 0.9 },
        { type: 'set_pose', value: 'wave' },
      ];
      let reply = 'Stub: changed into a dress.';
      if (userText.includes('full')) {
        commands = [
          { type: 'set_character', param: 'eyeSize', value: 1.2 },
          { type: 'set_character', param: 'noseWidth', value: 1.3 },
          { type: 'set_character', param: 'shoulderWidth', value: 1.1 },
          { type: 'set_character', param: 'waist', value: 0.9 },
          { type: 'set_bottom_style', value: 'pants' },
          { type: 'set_bottom_color', value: '#44557a' },
          { type: 'set_shoe_style', value: 'boots' },
          { type: 'set_shoe_color', value: '#26262b' },
        ];
        reply = 'Stub: full makeover.';
      }
      if (userText.includes('bad')) {
        commands.push({ type: 'set_character', param: 'height', value: 9 });
        commands.push({ type: 'teleport', value: 'moon' });
      }
      const envelope = { reply, commands };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          id: 'chatcmpl-stub',
          object: 'chat.completion',
          choices: [
            {
              index: 0,
              message: { role: 'assistant', content: JSON.stringify(envelope) },
              finish_reason: 'stop',
            },
          ],
        }),
      );
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`stub-llm listening on 127.0.0.1:${PORT}`);
});
