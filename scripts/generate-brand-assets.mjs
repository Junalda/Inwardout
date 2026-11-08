/**
 * Regenerates public/og.png, public/apple-touch-icon.png and public/favicon.ico
 * from the provisional brand tokens. Requires Playwright (not a project
 * dependency): `npx playwright` or a global install. Run: node scripts/generate-brand-assets.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const font = (p) => `data:font/woff2;base64,${readFileSync(new URL(`../node_modules/${p}`, import.meta.url)).toString('base64')}`;
const serif = font('@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2');
const serifItalic = font('@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2');
const sans = font('@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2');

const html = `<!doctype html><html><head><style>
@font-face{font-family:S;src:url(${serif}) format('woff2');font-weight:200 800}
@font-face{font-family:S;font-style:italic;src:url(${serifItalic}) format('woff2');font-weight:200 800}
@font-face{font-family:N;src:url(${sans}) format('woff2');font-weight:400 700}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#1e3a2f;color:#f6f1e7;font-family:N;position:relative;overflow:hidden}
.r{position:absolute;border:1.5px solid rgba(216,195,160,.28);border-radius:50%}
.wm{position:absolute;left:88px;top:78px;font-family:S;font-size:44px;letter-spacing:-.01em}
.wm b{font-weight:400;color:#d8c3a0}
h1{position:absolute;left:84px;top:205px;font-family:S;font-weight:400;font-size:132px;line-height:1;letter-spacing:-.02em}
p{position:absolute;left:90px;top:400px;width:620px;font-size:28px;line-height:1.45;color:#a9bbaf}
.v{position:absolute;left:90px;bottom:70px;font-family:S;font-size:22px;letter-spacing:.3em;color:#e9dcc4;display:flex;gap:22px;align-items:center}
.v i{display:block;width:34px;height:1.5px;background:#b07a4f}
</style></head><body>
<div class="r" style="width:760px;height:760px;right:-260px;top:-180px"></div>
<div class="r" style="width:540px;height:540px;right:-150px;top:-70px"></div>
<div class="r" style="width:320px;height:320px;right:-40px;top:40px;border-color:rgba(176,122,79,.7)"></div>
<div class="wm">In<b>W</b>ard<b>O</b>ut</div>
<h1>Lead from within.</h1>
<p>Coaching and bodywork for CEOs, entrepreneurs and other leaders.</p>
<div class="v"><span>DEPTH</span><i></i><span>TRUST</span><i></i><span>VITALITY</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
writeFileSync(new URL('../public/og.png', import.meta.url), await page.screenshot({ type: 'png' }));
await browser.close();

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url));
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
// 32×32 PNG-in-ICO (supported by all current browsers).
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, png32]));
console.log('Generated og.png, apple-touch-icon.png, favicon.ico');
