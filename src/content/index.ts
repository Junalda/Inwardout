/**
 * Content entry point. All copy is organised per locale so a Dutch version
 * can be added later: create src/content/nl/* with the same shape, register
 * it below and add localised routes. No language switcher is shown yet.
 */
import { site } from './en/site';
import { home } from './en/home';
import { approach } from './en/approach';
import { programmesPage, programmeCopy } from './en/programmes';
import { about } from './en/about';
import { faq } from './en/faq';
import { contact } from './en/contact';
import { start } from './en/start';
import { notFound, privacy } from './en/misc';

const en = { site, home, approach, programmesPage, programmeCopy, about, faq, contact, start, notFound, privacy };

export type Content = typeof en;
export type Locale = 'en';

const locales: Record<Locale, Content> = { en };

export function getContent(locale: Locale = 'en'): Content {
  return locales[locale];
}
