/**
 * POST /api/contact: server-side handler for introductory conversation requests.
 * Runs on demand (Vercel function). Responds with JSON for fetch() clients and
 * with a 303 redirect for regular form posts (no JavaScript).
 */
import type { APIRoute } from 'astro';
import { normalise, validate } from '../../lib/contact/validation';
import { deliver, isContactFormActive } from '../../lib/contact/server';
import { routes } from '../../data/settings';

export const prerender = false;

const MAX_BODY_BYTES = 20_000;
type Outcome = 'sent' | 'inactive' | 'invalid' | 'error';

function respond(wantsJson: boolean, outcome: Outcome, status: number, extra: Record<string, unknown> = {}) {
  if (wantsJson) {
    return new Response(JSON.stringify({ ok: outcome === 'sent', outcome, ...extra }), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  const location = outcome === 'sent' ? routes.contactSent : `${routes.contactNotSent}?reason=${outcome}`;
  return new Response(null, { status: 303, headers: { Location: location, 'Cache-Control': 'no-store' } });
}

export const POST: APIRoute = async ({ request, url }) => {
  const type = request.headers.get('content-type') ?? '';
  const wantsJson = type.includes('application/json');

  // Same-origin only (basic CSRF protection).
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return respond(wantsJson, 'invalid', 403);

  if (!isContactFormActive()) return respond(wantsJson, 'inactive', 503);

  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_BODY_BYTES) return respond(wantsJson, 'invalid', 413);

  let raw: Record<string, unknown>;
  try {
    if (wantsJson) {
      const parsed: unknown = await request.json();
      raw = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    } else if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
      raw = Object.fromEntries((await request.formData()).entries());
    } else {
      return respond(wantsJson, 'invalid', 415);
    }
  } catch {
    return respond(wantsJson, 'invalid', 400);
  }

  const result = validate(normalise(raw));
  if (!result.ok) {
    // Honeypot hits get the same generic rejection; no success is ever faked.
    return respond(wantsJson, 'invalid', 422, result.spam ? {} : { errors: result.errors });
  }

  const idRaw = typeof raw.submissionId === 'string' ? raw.submissionId : '';
  const submissionId = /^[a-zA-Z0-9-]{8,64}$/.test(idRaw) ? idRaw : crypto.randomUUID();

  const sent = await deliver(result.data, submissionId);
  return sent ? respond(wantsJson, 'sent', 200) : respond(wantsJson, 'error', 502);
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, outcome: 'invalid' }), {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'application/json; charset=utf-8' },
  });
