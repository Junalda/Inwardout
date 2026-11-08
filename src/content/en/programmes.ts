/** Programmes page: /programmes, plus programme copy reused on / and /start. */
import type { ProgrammeId } from '../../data/programmes';

export interface ProgrammeCopy {
  id: ProgrammeId;
  name: string;
  tagline: string;
  /** One-line summary of the session rhythm, for overviews. */
  summary: string;
  suitedFor: string[];
  content: string;
  rhythm: string;
  collaboration: string;
  practical?: string;
}

export const programmeCopy: Record<ProgrammeId, ProgrammeCopy> = {
  online: {
    id: 'online',
    name: 'Online coaching',
    tagline: 'Focused, individual coaching, wherever you are.',
    summary: 'Twelve weeks · twelve individual online sessions of one hour',
    suitedFor: [
      'You want to work with depth and continuity without having to travel.',
      'You live or work far from Cyprus, or your schedule takes you to many places.',
      'You would like to start with conversation and reflection, with attention to the body within the online setting.',
    ],
    content:
      'We work on what you bring: a decision, a recurring pattern, a tension that stays, a question about direction. Along the way we explore your beliefs and blind spots, notice what your body tells you, and translate insight into concrete choices.',
    rhythm:
      'Twelve individual online sessions of one hour, spread over twelve weeks: one session a week.',
    collaboration:
      'Sessions take place online, at times agreed together. Between sessions, you try out what you discover in your work and life, and we pick it up again in the next conversation.',
  },
  'online-bodywork': {
    id: 'online-bodywork',
    name: 'Online coaching & bodywork',
    tagline: 'Conversation and physical experience, combined.',
    summary: 'Twelve weeks · nine online sessions and three in-person bodywork sessions of one hour',
    suitedFor: [
      'You sense that talking alone will not get you where you want to be.',
      'You want to work more directly with tension, energy and boundaries.',
      'You are able to meet in person for three sessions during the programme.',
    ],
    content:
      'The same individual coaching as the online programme, with three sessions dedicated to bodywork. These can involve movement, voice, expression and attention to physical experience, always adapted to you and to your boundaries.',
    rhythm:
      'Nine individual online sessions of one hour and three in-person bodywork sessions of one hour, over twelve weeks. In a week with a bodywork session, that session takes the place of the online session.',
    collaboration:
      'The online sessions and the in-person sessions build on each other. What comes up physically is brought into the conversation, and the other way round.',
    practical:
      'Cyprus is the main base for in-person work. Location, availability and practical arrangements for the bodywork sessions are agreed with you personally.',
  },
};

export const programmesPage = {
  meta: {
    title: 'Programmes: online coaching, and coaching with bodywork | InWardOut',
    description:
      'Two individual twelve-week programmes for leaders: Online coaching, and Online coaching & bodywork with three in-person sessions. Details are discussed in an introductory conversation.',
  },

  hero: {
    eyebrow: 'Programmes',
    title: 'Two programmes of three months',
    lead: 'Both programmes are individual and built around your situation. The difference lies in the role of the body: one works entirely online, the other combines online coaching with three in-person bodywork sessions.',
  },

  labels: {
    suitedFor: 'May suit you if',
    content: 'What we work on',
    rhythm: 'Rhythm',
    collaboration: 'How we work together',
    practical: 'Practical arrangements',
    investment: 'Investment',
    duration: 'Duration',
    online: 'Online',
    inPerson: 'In person',
    weeks: (n: number) => `${n} weeks`,
    onlineSessions: (n: number) => `${n} individual sessions of one hour`,
    bodyworkSessions: (n: number) => `${n} bodywork sessions of one hour`,
    notIncluded: 'Not included',
  },

  comparison: {
    eyebrow: 'Side by side',
    title: 'The difference in brief',
    rows: [
      { label: 'Duration', online: 'Three months (twelve weeks)', combined: 'Three months (twelve weeks)' },
      { label: 'Online sessions', online: 'Twelve individual sessions of one hour', combined: 'Nine individual sessions of one hour' },
      { label: 'In-person bodywork', online: 'Not included', combined: 'Three individual sessions of one hour' },
      { label: 'Where', online: 'Entirely online', combined: 'Online, plus in person (main base: Cyprus)' },
      {
        label: 'Attention to the body',
        online: 'Part of the conversation, within the online setting',
        combined: 'Part of the conversation, and the focus of three dedicated sessions',
      },
    ],
  },

  tailoring: {
    title: 'Shaped around you',
    paragraphs: [
      'Both programmes follow a clear structure, but their content is not fixed in advance. What we focus on depends on what you bring and on what comes up along the way.',
      'The pace, the balance between reflection and practice, and the way bodywork is used are all adjusted to you, your situation and your boundaries.',
    ],
  },

  afterwards: {
    title: 'After three months',
    paragraphs: [
      'At the end of the programme, we look back together at what has changed and what is still open.',
      'If it makes sense, we can explore whether further guidance would be helpful, for example an extension to six months in total. What that would look like is something we decide together at that point.',
    ],
  },

  closing: {
    title: 'Find the format that fits you',
    text: 'In an introductory conversation, you talk about your situation and which programme makes sense. Programme details and investment are discussed there as well.',
  },

  choosing: {
    title: 'Not sure which one fits?',
    text: 'That is exactly what the introductory conversation is for. You can also choose “Not sure yet” when you send your request.',
  },
} as const;
