/**
 * Server-only contact form delivery. Secrets are read via astro:env/server
 * and never reach the browser. Supports Resend (email) or a generic JSON
 * webhook (form service / automation). With no valid configuration the form
 * is inactive and nothing is sent.
 */
import {
  CONTACT_PROVIDER,
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
  CONTACT_WEBHOOK_URL,
  CONTACT_WEBHOOK_TOKEN,
} from 'astro:env/server';
import type { ContactRequest } from './validation';

type Provider =
  | { kind: 'resend'; apiKey: string; to: string; from: string }
  | { kind: 'webhook'; url: string; token: string | undefined };

const val = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

function resend(): Provider | null {
  const apiKey = val(RESEND_API_KEY);
  const to = val(CONTACT_TO_EMAIL);
  const from = val(CONTACT_FROM_EMAIL);
  return apiKey && to && from ? { kind: 'resend', apiKey, to, from } : null;
}

function webhook(): Provider | null {
  const url = val(CONTACT_WEBHOOK_URL);
  if (!url) return null;
  try {
    if (new URL(url).protocol !== 'https:') return null;
  } catch {
    return null;
  }
  return { kind: 'webhook', url, token: val(CONTACT_WEBHOOK_TOKEN) };
}

export function getProvider(): Provider | null {
  if (CONTACT_PROVIDER === 'resend') return resend();
  if (CONTACT_PROVIDER === 'webhook') return webhook();
  return resend() ?? webhook();
}

/** True when a delivery provider is fully configured. */
export function isContactFormActive(): boolean {
  return getProvider() !== null;
}

const FORMAT_LABEL: Record<ContactRequest['format'], string> = {
  online: 'Online',
  'online-bodywork': 'Online and bodywork',
  'not-sure': 'Not sure yet',
};

function plainText(r: ContactRequest): string {
  return [
    'New request for an introductory conversation (InWardOut website)',
    '',
    `Name: ${r.name}`,
    `Email: ${r.email}`,
    `Company / role: ${r.company || '-'}`,
    `Preferred format: ${FORMAT_LABEL[r.format]}`,
    '',
    'What would you like to explore?',
    r.message,
  ].join('\n');
}

export async function deliver(request: ContactRequest, submissionId: string): Promise<boolean> {
  const provider = getProvider();
  if (!provider) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    let res: Response;
    if (provider.kind === 'resend') {
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
          // Resend de-duplicates repeated sends with the same key.
          'Idempotency-Key': submissionId,
        },
        body: JSON.stringify({
          from: provider.from,
          to: provider.to.split(',').map((s) => s.trim()).filter(Boolean),
          reply_to: request.email,
          subject: `Introductory conversation request: ${request.name}`,
          text: plainText(request),
        }),
      });
    } else {
      const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' };
      if (provider.token) headers.Authorization = `Bearer ${provider.token}`;
      res = await fetch(provider.url, {
        method: 'POST',
        signal: controller.signal,
        headers,
        body: JSON.stringify({
          source: 'inwardout-website',
          submissionId,
          submittedAt: new Date().toISOString(),
          ...request,
          formatLabel: FORMAT_LABEL[request.format],
        }),
      });
    }
    if (!res.ok) {
      // Log status only, never personal data.
      console.error(`[contact] ${provider.kind} delivery failed with status ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[contact] ${provider.kind} delivery error: ${err instanceof Error ? err.name : 'unknown'}`);
    return false;
  } finally {
    clearTimeout(timer);
  }
}
