// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

/*
 * The production domain is never hard-coded. Set SITE_URL (e.g. in Vercel →
 * Settings → Environment Variables) once the real domain is known. Without it,
 * canonical URLs and the sitemap are omitted and every page is noindex.
 */
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const siteUrl = env.SITE_URL?.trim().replace(/\/+$/, '') || undefined;

/** Pages that must never appear in the sitemap. */
const SITEMAP_EXCLUDE = ['/privacy', '/contact/sent', '/contact/not-sent', '/404'];

export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  trailingSlash: 'never',
  build: { format: 'directory' },
  compressHTML: true,
  adapter: vercel(),
  integrations: siteUrl
    ? [
        sitemap({
          filter: (page) => !SITEMAP_EXCLUDE.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
        }),
      ]
    : [],
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      /* ── Public (build time, safe for the browser) ── */
      PUBLIC_ALLOW_INDEXING: envField.boolean({ context: 'client', access: 'public', default: false }),
      PUBLIC_BOOKING_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_ANALYTICS_ENABLED: envField.boolean({ context: 'client', access: 'public', default: false }),

      /* ── Server only (never sent to the browser) ── */
      CONTACT_PROVIDER: envField.enum({ context: 'server', access: 'secret', values: ['resend', 'webhook'], optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_WEBHOOK_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
