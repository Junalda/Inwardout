/**
 * Contact form validation, shared by the browser script and the server
 * endpoint so both apply exactly the same rules.
 */
export const FORMAT_VALUES = ['online', 'online-bodywork', 'not-sure'] as const;
export type PreferredFormat = (typeof FORMAT_VALUES)[number];

export const LIMITS = {
  nameMax: 120,
  emailMax: 254,
  companyMax: 160,
  messageMin: 10,
  messageMax: 3000,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  message: string;
  format: string;
  /** Honeypot. Must stay empty. */
  website: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  message: string;
  format: PreferredFormat;
}

export type FieldName = 'name' | 'email' | 'company' | 'message' | 'format';

export type ErrorKey =
  | 'nameRequired'
  | 'nameTooLong'
  | 'emailRequired'
  | 'emailInvalid'
  | 'companyTooLong'
  | 'messageRequired'
  | 'messageTooShort'
  | 'messageTooLong'
  | 'formatRequired';

export type FieldErrors = Partial<Record<FieldName, ErrorKey>>;

/** Deliberately simple: one @, no spaces, a dot in the domain. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown): string => (typeof v === 'string' ? v.replace(/\u0000/g, '').trim() : '');

export function normalise(raw: Partial<Record<keyof ContactInput, unknown>>): ContactInput {
  return {
    name: clean(raw.name).replace(/\s+/g, ' '),
    email: clean(raw.email).toLowerCase(),
    company: clean(raw.company).replace(/\s+/g, ' '),
    message: clean(raw.message),
    format: clean(raw.format),
    website: clean(raw.website),
  };
}

export function isFormat(v: string): v is PreferredFormat {
  return (FORMAT_VALUES as readonly string[]).includes(v);
}

export function validateField(field: FieldName, input: ContactInput): ErrorKey | undefined {
  switch (field) {
    case 'name':
      if (!input.name) return 'nameRequired';
      if (input.name.length > LIMITS.nameMax) return 'nameTooLong';
      return undefined;
    case 'email':
      if (!input.email) return 'emailRequired';
      if (input.email.length > LIMITS.emailMax || !EMAIL_RE.test(input.email)) return 'emailInvalid';
      return undefined;
    case 'company':
      return input.company.length > LIMITS.companyMax ? 'companyTooLong' : undefined;
    case 'message':
      if (!input.message) return 'messageRequired';
      if (input.message.length < LIMITS.messageMin) return 'messageTooShort';
      if (input.message.length > LIMITS.messageMax) return 'messageTooLong';
      return undefined;
    case 'format':
      return isFormat(input.format) ? undefined : 'formatRequired';
  }
}

export const FIELD_ORDER: readonly FieldName[] = ['name', 'email', 'company', 'message', 'format'];

export type ValidationResult =
  | { ok: true; data: ContactRequest }
  | { ok: false; errors: FieldErrors; spam: boolean };

export function validate(input: ContactInput): ValidationResult {
  const errors: FieldErrors = {};
  for (const f of FIELD_ORDER) {
    const e = validateField(f, input);
    if (e) errors[f] = e;
  }
  const spam = input.website.length > 0;
  if (spam || Object.keys(errors).length > 0 || !isFormat(input.format)) {
    return { ok: false, errors, spam };
  }
  return {
    ok: true,
    data: { name: input.name, email: input.email, company: input.company, message: input.message, format: input.format },
  };
}
