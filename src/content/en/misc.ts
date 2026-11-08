/** 404 and draft privacy notice. */
export const notFound = {
  meta: { title: 'Page not found | InWardOut', description: 'The page you were looking for could not be found.' },
  eyebrow: 'Error 404',
  title: 'This page could not be found',
  text: 'The link may be outdated, or the address may contain a typo. These pages may help you further:',
  links: 'Helpful pages',
} as const;

export const privacy = {
  meta: {
    title: 'Privacy notice (draft) | InWardOut',
    description: 'Draft privacy notice for the InWardOut website. Not yet final.',
  },
  draftBadge: 'Draft',
  draftNotice:
    'This is a draft for review. It is not a final legal text and has not yet been checked. Details marked “to be completed” must be confirmed before the website goes live.',
  title: 'Privacy notice',
  sections: [
    {
      title: 'Who is responsible',
      paragraphs: [
        'This website belongs to InWardOut, the practice of Jan Leyssens. Official business name, registration details and contact address: to be completed.',
      ],
    },
    {
      title: 'What the contact form collects',
      paragraphs: [
        'When you request an introductory conversation, you provide your name, your email address, optionally your company or role, a short description of what you would like to explore, and your preferred format.',
        'The form does not ask for medical or other sensitive information. Please do not include it in your message.',
      ],
    },
    {
      title: 'Why it is used',
      paragraphs: [
        'Your details are used to respond to your request and, if you wish, to arrange an introductory conversation. They are not used for newsletters or advertising.',
      ],
    },
    {
      title: 'How it is processed',
      paragraphs: [
        'Form submissions are processed by a server-side function on the hosting platform (Vercel) and passed on to an email or form service. Which service is used, where it stores data and for how long: to be completed.',
        'Retention period of requests: to be completed.',
      ],
    },
    {
      title: 'Analytics and cookies',
      paragraphs: [
        'By default, this website uses no analytics and sets no tracking cookies. If privacy-friendly, cookieless statistics are switched on later, this notice will be updated before that happens. The content of the contact form is never sent to analytics.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'Depending on where you live, you may have the right to access, correct or delete your personal data, and to object to its processing. How to exercise these rights and whom to contact: to be completed.',
      ],
    },
  ],
} as const;
