/** FAQ page: /faq */
export interface FaqItem {
  /** Stable id, used for anchors and aria-controls. */
  id: string;
  question: string;
  answer: string[];
}

export const faq = {
  meta: {
    title: 'Frequently asked questions | InWardOut',
    description:
      'Answers about coaching and bodywork with Jan Leyssens: who it is for, working online, what bodywork involves, in-person sessions, time commitment and the introductory conversation.',
  },

  hero: {
    eyebrow: 'FAQ',
    title: 'Questions and answers',
    lead: 'What leaders often want to know before they get in touch. If your question is not here, you are welcome to ask it in your request.',
  },

  groups: [
    {
      title: 'About the work',
      items: [
        {
          id: 'who-is-this-for',
          question: 'Who is this for?',
          answer: [
            'For CEOs, entrepreneurs, founders and other leaders who carry significant responsibility and who are willing to look at their own patterns and blind spots.',
            'There is no fixed sector or company size. Jan has a particular affinity with IT and technology, but works with leaders from any field. What matters most is that you are in a position to make decisions about your own work and life, and that you are curious about what is going on inside you.',
          ],
        },
        {
          id: 'previous-experience',
          question: 'Do I need previous experience with coaching or bodywork?',
          answer: [
            'No. You can start without any experience of coaching or bodywork. The work begins where you are, and its pace and form are adjusted to you.',
            'If something is unfamiliar, you will know what it involves before you try it, and you always decide whether you want to.',
          ],
        },
        {
          id: 'what-is-bodywork',
          question: 'What does bodywork involve?',
          answer: [
            'Bodywork here means paying deliberate attention to physical experience. Depending on you and the moment, it can involve movement, working with your voice, forms of expression, or simply noticing what you feel in your body: tension, emotion, energy, boundaries.',
            'It is always adapted to you and to your boundaries. It is a form of personal guidance, not a medical or psychological treatment.',
          ],
        },
        {
          id: 'which-programme',
          question: 'How do I know which programme fits?',
          answer: [
            'Consider whether you want to work entirely online or also in person, and how directly you want to work with the body.',
            'If you are not sure, choose “Not sure yet” in the request form. Finding the right format is part of the introductory conversation.',
          ],
        },
      ] satisfies FaqItem[],
    },
    {
      title: 'Practicalities',
      items: [
        {
          id: 'online-only',
          question: 'Can we work together entirely online?',
          answer: [
            'Yes. The Online coaching programme takes place entirely online: twelve individual sessions of one hour over twelve weeks. Attention to the body has a place in the online sessions as well.',
            'If you would also like in-person bodywork, the Online coaching & bodywork programme includes three in-person sessions.',
          ],
        },
        {
          id: 'in-person-location',
          question: 'Where do in-person sessions take place?',
          answer: [
            'Cyprus is the main base for in-person work. The location, availability and practical arrangements are agreed with you personally.',
            'If you are based elsewhere, for example in Belgium or the Netherlands, you can discuss the possibilities during the introductory conversation.',
          ],
        },
        {
          id: 'time-commitment',
          question: 'How much time does a programme require?',
          answer: [
            'Each programme runs for three months (twelve weeks), with one individual session of one hour each week: online, or in person for the bodywork sessions in the combined programme.',
            'Beyond the sessions, it helps to leave some room for reflection and for trying things out in daily life. How you do that is up to you.',
          ],
        },
        {
          id: 'introductory-conversation',
          question: 'What happens during the introductory conversation?',
          answer: [
            'You tell Jan about your situation and what you are looking for, and you can ask anything you would like to know about the approach.',
            'Together, you explore your expectations and whether there is a good match. If there is, you can receive a personal proposal afterwards.',
          ],
        },
        {
          id: 'after-three-months',
          question: 'Can we continue after three months?',
          answer: [
            'That is possible. At the end of the programme, you look back together at what has changed and what is still open.',
            'If further guidance makes sense, an extension to six months in total can be explored. What it would involve is agreed together at that point.',
          ],
        },
      ] satisfies FaqItem[],
    },
  ],

  closing: {
    title: 'Still have a question?',
    text: 'You are welcome to include it in your request. The introductory conversation is also a good moment to ask.',
  },
} as const;
