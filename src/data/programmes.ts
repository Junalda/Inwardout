/**
 * ───────────────────────────────────────────────────────────────
 *  Programme facts and pricing: language independent.
 *  Descriptive copy lives in src/content/<locale>/programmes.ts.
 * ───────────────────────────────────────────────────────────────
 *
 *  Source: completed intake. Open points are listed in CONTENT_REVIEW.md.
 */

export type ProgrammeId = 'online' | 'online-bodywork';

export interface ProgrammeFacts {
  id: ProgrammeId;
  /** Total duration in weeks. */
  weeks: number;
  /** Individual online sessions of one hour. */
  onlineSessions: number;
  /** In-person bodywork sessions of one hour (each replaces that week's online session). */
  bodyworkSessions: number;
  sessionMinutes: number;
  /** Amount mentioned in the intake, in whole euros. NOT published unless pricing.publish is true. */
  investmentEur: number;
}

export const programmes: readonly ProgrammeFacts[] = [
  { id: 'online', weeks: 12, onlineSessions: 12, bodyworkSessions: 0, sessionMinutes: 60, investmentEur: 5000 },
  { id: 'online-bodywork', weeks: 12, onlineSessions: 9, bodyworkSessions: 3, sessionMinutes: 60, investmentEur: 7000 },
];

export function getProgramme(id: ProgrammeId): ProgrammeFacts {
  const p = programmes.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown programme: ${id}`);
  return p;
}

/**
 * Price publication. Off for the first demo.
 *  - VAT status, payment terms and travel/accommodation costs are NOT confirmed.
 *  - Only switch `publish` on after review; then fill `note` with confirmed terms
 *    (e.g. VAT wording) or leave it empty. Never invent terms here.
 */
export const pricing = {
  publish: false,
  currency: 'EUR',
  /** Optional confirmed note shown under published prices (e.g. VAT). Empty = nothing shown. */
  note: '',
} as const;

/**
 * Shared online group sessions. The intake mentions six sessions, once every
 * two weeks, max. ten participants across both programmes; an earlier report
 * mentions a different frequency. Do not publish until confirmed.
 */
export const groupSessions = {
  publish: false,
  /** Confirmed public description (English). Only rendered when publish is true. */
  description: '',
} as const;

/**
 * Extension to six months in total is possible; content and price are not set.
 * Present only as something to explore together.
 */
export const extension = {
  totalMonths: 6,
} as const;

export function formatEur(amount: number, locale = 'en-IE'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}
