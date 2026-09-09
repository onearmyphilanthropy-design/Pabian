/* Builds artifact.html from index.html.
 *
 * The artifact runtime serves a single self-contained page under a strict CSP:
 * no external hosts, no relative file fetches. So the two logo PNGs are inlined
 * as data URIs. The video is far too large to inline (8.9MB raw, ~12MB base64),
 * so it ships as an artifact asset and its path is patched in after upload.
 *
 *   node build.js                  -> video points at the placeholder
 *   node build.js _blob/<assetId>  -> video points at the uploaded asset
 */
const fs = require('fs');
const path = require('path');

const dataUri = (file, mime) =>
  `data:${mime};base64,${fs.readFileSync(path.join(__dirname, file)).toString('base64')}`;

/* The artifact CSP blocks every external host and relative fetches, and this
 * account's artifact runtime does not offer the `assets` capability, so the
 * video has to travel inside the page as a data URI. 8.9MB raw -> ~12.4MB
 * base64, which clears the 16MB artifact ceiling. Pass "link" to skip it. */
const arg = process.argv[2];
const videoUrl = arg === 'link' ? './media/hero-480.mp4'
               : arg ? arg
               : dataUri('media/hero-480.mp4', 'video/mp4');

let src = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// strip the document skeleton; the artifact runtime supplies its own
const head = src.slice(src.indexOf('<title>'), src.indexOf('</head>'))
  .replace(/<meta[^>]*>\s*/g, '')
  .replace(/<link rel="preconnect"[^>]*>\s*/g, '')
  .replace(/<title>[^<]*<\/title>/, '<title>Gladiator Dash</title>');

const body = src.slice(src.indexOf('<body>') + 6, src.lastIndexOf('</body>'));

let out = head.trim() + '\n' + body.trim() + '\n';

/* Replace the bare path everywhere it appears, not just inside the quoted JS
   constants: the favicon <link> tags reference the same file with double quotes,
   and a relative path left in an artifact is a request the CSP blocks. */
for (const [ref, file] of [
  ['./media/words-white.png', 'media/words-white.png'],
  ['./media/opt-helmet.png',      'media/opt-helmet.png']
]) {
  out = out.split(ref).join(dataUri(file, 'image/png'));
}
out = out.replace("'./media/hero-480.mp4'", JSON.stringify(videoUrl));

fs.writeFileSync(path.join(__dirname, 'artifact.html'), out);

const mb = (fs.statSync(path.join(__dirname, 'artifact.html')).size / 1024 / 1024).toFixed(2);
const shown = videoUrl.length > 60 ? videoUrl.slice(0, 40) + `… (${(videoUrl.length/1024/1024).toFixed(1)}MB inline)` : videoUrl;
console.log(`artifact.html  ${mb}MB   video -> ${shown}`);
