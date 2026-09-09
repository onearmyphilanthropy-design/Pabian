#!/usr/bin/env node
/* Gladiator Dash prototype — local server.
 *
 * No dependencies. Node 18+.
 *
 *   node serve.js            → http://localhost:8080
 *   node serve.js 3000       → a different port
 *
 * Serves this folder, with HTTP range support so the hero video actually plays
 * (opening index.html straight off disk does not give the browser ranges, and
 * the video will silently refuse to start). Binds all interfaces and prints a
 * LAN address so you can open it on your phone, which is the device this whole
 * thing is designed around.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.pdf':  'application/pdf',
  '.md':   'text/plain; charset=utf-8'
};

function lanAddress() {
  for (const iface of Object.values(os.networkInterfaces()).flat()) {
    if (iface && iface.family === 'IPv4' && !iface.internal) return iface.address;
  }
  return null;
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  if (urlPath === '/') urlPath = '/index.html';

  // keep requests inside this folder
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
         .end(`Not found: ${urlPath}`);
      return;
    }

    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    if (range && /^bytes=\d*-\d*$/.test(range)) {
      const [rawStart, rawEnd] = range.replace('bytes=', '').split('-');
      const start = rawStart ? parseInt(rawStart, 10) : 0;
      const end = rawEnd ? parseInt(rawEnd, 10) : stat.size - 1;

      if (start >= stat.size || end >= stat.size || start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
        return;
      }
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use. Try:  node serve.js ${PORT + 1}\n`);
    process.exit(1);
  }
  throw e;
});

server.listen(PORT, '0.0.0.0', () => {
  const lan = lanAddress();
  console.log('\n  Gladiator Dash prototype\n');
  console.log(`  On this machine   http://localhost:${PORT}`);
  if (lan) console.log(`  On your phone     http://${lan}:${PORT}   (same wifi)`);
  console.log('\n  Pages          /#friends/home   /#friends/group   /#friends/faq');
  console.log('  Scenarios      friends · outfit · seed · theirsfull · allfull');
  console.log('                 e.g. /#outfit/group   /#theirsfull/group');
  console.log('\n  Ctrl+C to stop.\n');
});
