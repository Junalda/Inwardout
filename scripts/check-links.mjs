/**
 * Post-build checks on the static output (run after `npm run build`).
 *  - every internal link/asset resolves to a built page or file
 *  - one <h1> per page; unique <title> and meta description
 *  - robots meta matches the indexing configuration
 *  - no published prices while pricing is unpublished; no placeholder text
 *  - external links open safely; JSON-LD parses
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = existsSync('.vercel/output/static') ? '.vercel/output/static' : 'dist';
const API_ROUTES = new Set(['/api/contact']);
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const urlFor = (f) => '/' + relative(OUT, f).replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');

const exists = (path) => {
  const p = path.replace(/\/$/, '') || '/';
  if (API_ROUTES.has(p)) return true;
  return [join(OUT, p), join(OUT, p, 'index.html'), join(OUT, `${p}.html`)].some((c) => existsSync(c) && (statSync(c).isFile() || existsSync(join(c, 'index.html'))));
};

let fail = 0;
const bad = (f, m) => { fail++; console.error(`✗ ${f}: ${m}`); };
const titles = new Map();
const descs = new Map();
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const pageIds = new Map(htmlFiles.map((f) => [urlFor(f), ids(readFileSync(f, 'utf8'))]));

for (const f of htmlFiles) {
  const url = urlFor(f);
  const html = readFileSync(f, 'utf8');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) bad(url, `${h1} <h1> elements`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) bad(url, 'missing <title>');
  if (!desc) bad(url, 'missing meta description');
  if (titles.has(title)) bad(url, `duplicate title with ${titles.get(title)}`); else titles.set(title, url);
  if (descs.has(desc)) bad(url, `duplicate description with ${descs.get(desc)}`); else descs.set(desc, url);

  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];
  if (!robots) bad(url, 'missing robots meta');
  if (process.env.EXPECT_INDEXABLE !== 'true' && robots !== 'noindex, nofollow') bad(url, `expected noindex, got "${robots}"`);

  for (const [, href] of html.matchAll(/\s(?:href|src|action)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const [path, hash] = href.split('#');
    if (!path && hash) { if (!pageIds.get(url)?.has(hash)) bad(url, `missing anchor #${hash}`); continue; }
    if (!path.startsWith('/')) { bad(url, `relative link ${href}`); continue; }
    if (!exists(path.split('?')[0])) bad(url, `broken link ${href}`);
    else if (hash && pageIds.has(path.replace(/\/$/, '') || '/') && !pageIds.get(path.replace(/\/$/, '') || '/').has(hash)) bad(url, `missing anchor ${href}`);
  }
  for (const [a] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) if (!/rel="[^"]*noopener/.test(a)) bad(url, 'target=_blank without rel=noopener');
  for (const [a] of html.matchAll(/<a\b[^>]*>/g)) if (!/href="[^"]+"/.test(a)) bad(url, `link without href: ${a}`);

  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  if (/€|\bEUR\b/.test(text)) bad(url, 'price visible while pricing should be unpublished');
  if (/lorem ipsum|TODO|anytime ?music/i.test(text)) bad(url, 'placeholder or legacy text found');

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch (e) { bad(url, `invalid JSON-LD: ${e.message}`); }
  }
  console.log(`✓ ${url.padEnd(20)} ${title}`);
}

const required = ['/', '/approach', '/programmes', '/about', '/faq', '/contact', '/start'];
for (const r of required) if (!pageIds.has(r)) bad(r, 'required page missing');

console.log(fail ? `\n${fail} problem(s) found` : `\nAll checks passed (${htmlFiles.length} pages, output: ${OUT})`);
process.exit(fail ? 1 : 0);
