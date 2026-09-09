/* Builds sponsor-artifact.html from sponsor.html.
 *
 * The artifact host blocks relative asset requests, so the photos and the logo
 * mark travel inline as data URIs. No video on this page: a sponsor opening a
 * link from an email should not wait on 12MB, and the stills make the argument
 * better anyway.
 */
const fs = require('fs');
const path = require('path');

const uri = (file, mime) =>
  `data:${mime};base64,${fs.readFileSync(path.join(__dirname, file)).toString('base64')}`;

const ASSETS = {
  './media/photos/startline.jpg': ['media/photos/startline.jpg', 'image/jpeg'],
  './media/photos/dawn.jpg':      ['media/photos/dawn.jpg',      'image/jpeg'],
  './media/photos/cheque.jpg':    ['media/photos/cheque.jpg',    'image/jpeg'],
  './media/opt-helmet.png':         ['media/opt-helmet.png',         'image/png'],
  './media/opt-words-white.png':      ['media/opt-words-white.png',      'image/png']
};

let src = fs.readFileSync(path.join(__dirname, 'sponsor.html'), 'utf8');

const head = src.slice(src.indexOf('<title>'), src.indexOf('</head>'))
  .replace(/<meta(?![^>]*property="og:)[^>]*>\s*/g, '')
  .replace(/<link rel="preconnect"[^>]*>\s*/g, '');

const body = src.slice(src.indexOf('<body>') + 6, src.lastIndexOf('</body>'));

let out = head.trim() + '\n' + body.trim() + '\n';

for (const [ref, [file, mime]] of Object.entries(ASSETS)) {
  const data = uri(file, mime);
  out = out.split(ref).join(data);
}

fs.writeFileSync(path.join(__dirname, 'sponsor-artifact.html'), out);
const mb = (fs.statSync(path.join(__dirname, 'sponsor-artifact.html')).size / 1024 / 1024).toFixed(2);
console.log(`sponsor-artifact.html  ${mb}MB`);
console.log('relative refs left:', (out.match(/\.\/media\//g) || []).length);
