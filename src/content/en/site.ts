/** Shared, site-wide English copy: navigation, CTAs, footer, accessibility labels. */
export const site = {
  lang: 'en',
  ogLocale: 'en_GB',
  /** Used for the <title> suffix and Open Graph site name. */
  siteName: 'InWardOut',
  defaultDescription:
    'Personal coaching and bodywork for CEOs, entrepreneurs and other leaders who want to lead from within. With Jan Leyssens: online worldwide, in person from Cyprus.',
  tagline: 'Coaching and bodywork for leaders',

  nav: {
    approach: 'Approach',
    programmes: 'Programmes',
    about: 'About Jan',
    faq: 'FAQ',
    home: 'Home',
    contact: 'Contact',
  },

  cta: {
    primary: 'Request an introductory conversation',
    primaryShort: 'Introductory conversation',
    approach: 'Explore the approach',
    programmes: 'Discover the programmes',
    about: 'More about Jan',
    faq: 'Read the questions and answers',
  },

  a11y: {
    skipLink: 'Skip to main content',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    homeLink: 'InWardOut, home',
    externalLink: '(opens in a new tab)',
  },

  footer: {
    intro: 'Personal coaching and bodywork for CEOs, entrepreneurs and other leaders.',
    values: ['Depth', 'Trust', 'Vitality'],
    whereHeading: 'Where',
    where: ['Online, for English-speaking clients worldwide', 'In person, based in Cyprus', 'Connected to Belgium and the Netherlands'],
    exploreHeading: 'Explore',
    privacy: 'Privacy notice (draft)',
    fullSite: 'Visit the full website',
    copyright: (year: number) => `© ${year} InWardOut · Jan Leyssens`,
  },

  investmentNotice: 'Programme details and investment are discussed during your introductory conversation.',
} as const;
