/** Contact page: /contact, plus form messages and the no-JS result pages. */
export const contact = {
  meta: {
    title: 'Request an introductory conversation | InWardOut',
    description:
      'Request an introductory conversation with Jan Leyssens to explore your situation, your expectations and whether working together is a good match.',
  },

  hero: {
    eyebrow: 'Contact',
    title: 'Request an introductory conversation',
    lead: 'Tell Jan a little about yourself and what you would like to explore. He will get back to you to arrange a conversation.',
  },

  aside: {
    title: 'What the conversation is for',
    items: [
      'Talking about your situation and what you are looking for',
      'Exploring your expectations and questions about the approach',
      'Finding out together whether there is a good match',
    ],
    note: 'A few sentences are enough. Please do not include medical or other sensitive personal information.',
  },

  form: {
    legend: 'Your request',
    requiredNote: 'Fields marked “required” must be filled in.',
    required: 'required',
    optional: 'optional',
    fields: {
      name: { label: 'Name' },
      email: { label: 'Email', hint: 'So Jan can reply to you.' },
      company: { label: 'Company / role' },
      message: {
        label: 'What would you like to explore?',
        hint: 'For example a question, a situation or a pattern you recognise. A few sentences are enough.',
      },
      format: {
        legend: 'Preferred format',
        options: {
          online: 'Online',
          'online-bodywork': 'Online and bodywork',
          'not-sure': 'Not sure yet',
        },
      },
      honeypot: { label: 'Leave this field empty' },
    },
    privacy: 'Your details are used to respond to your request.',
    privacyLink: 'Read the privacy notice (draft)',
    submit: 'Send request',
    submitting: 'Sending…',
  },

  inactive: {
    title: 'This form is not active yet',
    text: 'This is a preview of the website. You can fill in the form, but requests cannot be sent yet and nothing will be submitted.',
    notSent: 'Not sent: the form is not active yet. Nothing was submitted.',
  },

  errors: {
    summary: 'Please check the following:',
    nameRequired: 'Please enter your name.',
    nameTooLong: 'Please shorten your name to 120 characters or fewer.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address, for example name@company.com.',
    companyTooLong: 'Please shorten this to 160 characters or fewer.',
    messageRequired: 'Please tell Jan briefly what you would like to explore.',
    messageTooShort: 'Please write a little more: at least 10 characters.',
    messageTooLong: 'Please shorten your message to 3,000 characters or fewer.',
    formatRequired: 'Please choose a preferred format.',
    generic: 'Your request could not be sent. Please try again in a moment.',
    network: 'Your request could not be sent because of a connection problem. Please check your connection and try again.',
    rejected: 'Your request could not be processed. Please check the form and try again.',
  },

  success: {
    title: 'Thank you, your request has been sent',
    text: 'Jan has received your message and will get back to you to arrange an introductory conversation.',
  },

  sentPage: {
    meta: { title: 'Request sent | InWardOut', description: 'Your request for an introductory conversation has been sent.' },
    title: 'Thank you, your request has been sent',
    text: 'Jan has received your message and will get back to you to arrange an introductory conversation.',
    back: 'Back to the homepage',
  },

  notSentPage: {
    meta: { title: 'Request not sent | InWardOut', description: 'Your request could not be sent.' },
    title: 'Your request was not sent',
    reasons: {
      inactive: 'The contact form is not active yet. Nothing was submitted.',
      invalid: 'Some fields were missing or not filled in correctly.',
      error: 'Something went wrong while sending your request.',
    },
    text: 'Please go back to the form and try again.',
    back: 'Back to the form',
  },
} as const;
