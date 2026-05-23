import type { Confession } from '../types';

export const DEMO_CONFESSION: Confession = {
  id: 'demo-1',
  sin: "I told my therapist I was 'fine, just tired' and then went home and cried at a yogurt commercial.",
  operatorReply: [
    "Yeah. Okay. Heard you.",
    "Hold on, my coffee's been cold for an hour.",
    "Look — that's not a sin, that's just being a person on a Tuesday.",
    "Stop apologizing for crying at yogurt.",
    "Yogurt's emotional. Greek yogurt especially.",
    "Te absolvo, mostly.",
  ].join('\n'),
  penance: 'Compliment a stranger\'s shoes before Friday.',
  quip: "It's just yogurt, kid. Let it out.",
  verdict: 'ABSOLVED',
  ticketNumber: '#4827-7',
  callDuration: '01:14',
  createdAt: Date.now(),
};

export const DEMO_WALL: Confession[] = [
  {
    ...DEMO_CONFESSION,
    id: 'wall-1',
    sin: 'I screenshotted a friend\'s ex\'s wedding photos and zoomed in on their teeth.',
    quip: 'Teeth are public domain.',
    verdict: 'ABSOLVED',
    ticketNumber: '#4823-2',
  },
  {
    ...DEMO_CONFESSION,
    id: 'wall-2',
    sin: 'I told my roommate the milk was bad so I could finish the cereal alone.',
    quip: 'Heard worse before lunch.',
    verdict: 'ABSOLVED',
    ticketNumber: '#4824-9',
  },
  {
    ...DEMO_CONFESSION,
    id: 'wall-3',
    sin: 'I rehearsed an apology in the shower and used the time saved to scroll Reels.',
    quip: 'Logistics is its own apology.',
    verdict: 'DEFERRED',
    ticketNumber: '#4825-3',
  },
  {
    ...DEMO_CONFESSION,
    id: 'wall-4',
    sin: 'I bought a self-help book and put it face-down on my nightstand for a month.',
    quip: 'Books absolve in stages.',
    verdict: 'ABSOLVED',
    ticketNumber: '#4826-5',
  },
  {
    ...DEMO_CONFESSION,
    id: 'wall-5',
    sin: 'I clapped at the end of a movie I didn\'t actually like, to fit in.',
    quip: 'Applause is a survival skill.',
    verdict: 'ABSOLVED',
    ticketNumber: '#4827-1',
  },
  {
    ...DEMO_CONFESSION,
    id: 'wall-6',
    sin: 'I wrote a passive-aggressive Slack message and then pretended my dog stepped on the keyboard.',
    quip: 'Dogs absolve everything.',
    verdict: 'DENIED',
    ticketNumber: '#4828-0',
  },
];
