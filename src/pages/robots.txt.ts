/**
 * robots.txt, generated at build time. Crawling is disallowed unless a real
 * domain (SITE_URL) is set AND PUBLIC_ALLOW_INDEXING=true.
 */
import type { APIRoute } from 'astro';
import { isIndexable } from '../data/settings';

export const GET: APIRoute = ({ site }) => {
  const body = isIndexable(site)
    ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : `# Preview/demo build: indexing disabled.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
