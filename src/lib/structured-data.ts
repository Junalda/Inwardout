/**
 * schema.org data using ONLY confirmed facts. No address, phone, email,
 * ratings, prices or credentials are included until they are confirmed.
 */
import { brand } from '../data/settings';

export function organisationJsonLd(site: URL | undefined, description: string): Record<string, unknown> {
  const url = site?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    ...(url ? { '@id': `${url}#organisation`, url } : {}),
    name: brand.name,
    description,
    founder: { '@type': 'Person', name: brand.founder },
    areaServed: [
      { '@type': 'Country', name: 'Cyprus' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Netherlands' },
    ],
    availableLanguage: 'English',
    knowsAbout: ['Leadership coaching', 'Bodywork', 'Personal development'],
  };
}

export function personJsonLd(site: URL | undefined): Record<string, unknown> {
  const url = site ? new URL('/about', site).href : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: brand.founder,
    ...(url ? { url } : {}),
    jobTitle: `Founder of ${brand.name}`,
    worksFor: { '@type': 'Organization', name: brand.name, ...(site ? { '@id': `${site.href}#organisation` } : {}) },
  };
}

export function faqJsonLd(items: readonly { question: string; answer: readonly string[] }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer.join(' ') },
    })),
  };
}
