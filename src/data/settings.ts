/**
 * ───────────────────────────────────────────────────────────────
 *  Central site settings: one place for routes, CTA targets and
 *  feature flags. Copy (text) lives in src/content/<locale>/.
 * ───────────────────────────────────────────────────────────────
 */
import { PUBLIC_ALLOW_INDEXING, PUBLIC_ANALYTICS_ENABLED, PUBLIC_BOOKING_URL } from 'astro:env/client';

export const brand = {
  /** Provisional spelling, to be confirmed (see CONTENT_REVIEW.md). */
  name: 'InWardOut',
  founder: 'Jan Leyssens',
} as const;

/** Internal routes. Use these instead of hard-coded strings. */
export const routes = {
  home: '/',
  approach: '/approach',
  programmes: '/programmes',
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  start: '/start',
  privacy: '/privacy',
  contactSent: '/contact/sent',
  contactNotSent: '/contact/not-sent',
} as const;

export type RouteKey = keyof typeof routes;

/** Main navigation (order matters). The contact CTA is rendered separately. */
export const mainNav = ['approach', 'programmes', 'about', 'faq'] as const satisfies readonly RouteKey[];

const bookingUrl = PUBLIC_BOOKING_URL?.trim() || null;

/**
 * Where the primary CTA ("Request an introductory conversation") points.
 * Defaults to /contact. Set PUBLIC_BOOKING_URL to use a real booking page.
 */
export const primaryCta = {
  href: bookingUrl ?? routes.contact,
  isExternal: bookingUrl !== null,
} as const;

/**
 * Indexing is off unless BOTH a real domain (SITE_URL) is configured and
 * PUBLIC_ALLOW_INDEXING=true. `site` comes from astro.config.mjs.
 */
export function isIndexable(site: URL | undefined): boolean {
  return Boolean(site) && PUBLIC_ALLOW_INDEXING === true;
}

/** Optional, cookieless Vercel Web Analytics. Off by default. */
export const analyticsEnabled = PUBLIC_ANALYTICS_ENABLED === true;

/** Locale of the current build. Content is structured for a later Dutch version. */
export const defaultLocale = 'en' as const;
