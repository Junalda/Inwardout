/** Approach page: /approach */
export const approach = {
  meta: {
    title: 'The approach: coaching and bodywork from the inside out | InWardOut',
    description:
      'How Jan Leyssens works with leaders: exploring patterns and beliefs, noticing the body’s signals and boundaries, and translating insight into concrete choices at work and at home.',
  },

  hero: {
    eyebrow: 'The approach',
    title: 'Working from the inside out',
    lead: 'Coaching at InWardOut combines honest conversation and reflection with attention to the body. It is personal and practical, and rooted in the reality of leading a company.',
  },

  themesIntro: {
    title: 'What the work looks like',
    text: 'The five themes below describe how the work tends to unfold. They are an explanation, not a fixed or certified method. Every programme is shaped around the person, and the themes overlap and return as the weeks go by.',
  },

  themes: [
    {
      title: 'Exploring patterns and beliefs',
      paragraphs: [
        'Much of how we lead runs on autopilot. Under pressure, we fall back on what once worked: taking control, staying agreeable, pushing through, keeping a distance.',
        'Together we look at the patterns that keep returning in how you decide, how you react to pressure, how you handle conflict or hold back, and at the beliefs underneath them. Not to judge them, but to understand what they have done for you and whether they still serve you.',
      ],
      questionsLabel: 'Questions you might explore',
      questions: [
        'What do I do when I feel I am losing control?',
        'Whose expectations am I still trying to meet?',
        'Where do I say yes when I mean no?',
      ],
    },
    {
      title: 'Noticing the body’s signals and boundaries',
      paragraphs: [
        'Your body often registers things before you consciously do: a tight jaw in a negotiation, a fatigue that will not lift, restlessness before a particular conversation.',
        'Learning to notice these signals gives you information you would otherwise miss, about tension, emotion, boundaries and vitality. It also helps you recognise earlier when you are going past your own limits.',
      ],
    },
    {
      title: 'Aligning intention, words and behaviour',
      paragraphs: [
        'Most leaders know what they want to stand for. The difficulty lies in the moments when intention, words and behaviour drift apart: when you mean one thing, say another, and act in a way that surprises even yourself.',
        'We look at where that happens and what it takes to bring the three closer together, so that the people around you can rely on what you say.',
      ],
    },
    {
      title: 'Translating insight into choices and habits',
      paragraphs: [
        'Insight matters when it changes something. Throughout the programme, we translate what you discover into concrete choices: a conversation you have been postponing, a different way of preparing for decisions, a boundary in your agenda, a daily habit that gives you room to breathe.',
        'Between sessions, you try things out in real life. In the next session, we look at what happened.',
      ],
    },
    {
      title: 'The effect on organisation, family and relationships',
      paragraphs: [
        'When you change how you relate to yourself, it rarely stays private. It can show in how you run meetings, how you work with your team, and how you are at home with the people closest to you.',
        'We pay attention to that wider effect, because your work and your life are not separate compartments.',
      ],
    },
  ],

  bodywork: {
    eyebrow: 'If bodywork is new to you',
    title: 'What bodywork means here',
    paragraphs: [
      'If you have never done any bodywork, the word may sound vague. In this context, it simply means paying deliberate attention to physical experience, rather than only talking about it.',
      'Depending on the person and the moment, that can involve movement, working with your voice, forms of expression, or quietly attending to what you feel in your body. Some of this has a place in online sessions as well. In the combined programme, three sessions take place in person and are dedicated to bodywork.',
      'Everything is adapted to you and to your boundaries. You decide what you are comfortable with, and you do not need any previous experience.',
    ],
    elementsLabel: 'Forms bodywork can take',
    elements: ['Movement', 'Voice', 'Expression', 'Attention to physical experience'],
    disclaimer:
      'Coaching and bodywork at InWardOut are a form of personal guidance. They are not medical or psychological treatment and do not replace it.',
  },

  expectations: {
    title: 'What you can expect, and what not',
    is: {
      heading: 'What it is',
      items: [
        'A conversation partner who knows the world of business and leadership',
        'Directness, combined with care',
        'Room for what is difficult to say out loud',
        'Practical attention to your daily work and life',
      ],
    },
    isNot: {
      heading: 'What it is not',
      items: [
        'A quick fix or a toolbox of techniques',
        'Therapy or medical treatment',
        'A training course with fixed modules',
        'A promise of a particular outcome',
      ],
    },
  },

  values: {
    eyebrow: 'What guides the work',
    title: 'Depth, trust and vitality',
    items: [
      {
        name: 'Depth',
        text: 'Looking beneath the surface of a question, beyond the first answer and the familiar explanation.',
      },
      {
        name: 'Trust',
        text: 'A steady working relationship in which you can speak openly, including about doubt and uncertainty.',
      },
      {
        name: 'Vitality',
        text: 'Reconnecting with energy, physical presence and what makes you feel alive in your work and life.',
      },
    ],
  },

  closing: {
    title: 'Curious how this would work for you?',
    text: 'In an introductory conversation, you can describe your situation and ask anything you would like to know about the approach.',
  },
} as const;
