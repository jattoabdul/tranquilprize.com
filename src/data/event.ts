export const event = {
  name: 'Tranquil Public Speaking Prize',
  year: '2026',
  theme: 'Voices for the Future',
  date: 'Thursday, 19 November 2026',
  venue: 'Main Hall, Ilorin Innovation Hub',
  city: 'Ilorin, Nigeria',
  organiser: 'Sakeenah Jatto',
  email: 'info@tranquilprize.com',
  rsvp: 'https://luma.com/3nrxc5t9',
  application:
    'https://docs.google.com/forms/d/e/1FAIpQLSdUkh8KxkuA2PvPiT6XQPXW8VVwKw78BsorWLr-NLBboDW7IQ/viewform',
  // Owner confirmed on 2026-11-07 to match the official event flyers.
  // 9:00-10:30 deliberately absorbs late arrivals; formal opening is 10:30.
  arrival: '8:30 a.m.',
  programmeStart: '9:00 a.m.',
  close: '5:00 p.m.',
  prompt: 'If I could change one thing in my school or community, it would be…',
};

export type ProgrammeItem = {
  start: string;
  end: string;
  title: string;
  detail?: string;
  kind?: 'round' | 'break' | 'moment';
};

// Public running order (WAT). Competition timings follow the organising
// playbook: 50 × 2 min, 15 × 5 min, 5 × 5 min. The 3:40-4:25 window holds
// final verification and a protected reserve; do not book extra items into it.
export const programme: ProgrammeItem[] = [
  {
    start: '8:30',
    end: '9:00',
    title: 'Arrivals, purple carpet and registration',
    detail: 'Welcome desk opens. Audience guests and contestants register.',
  },
  {
    start: '9:00',
    end: '10:00',
    title: 'Purple carpet, photographs and seating',
    detail: 'Meet the speakers, take photographs and find your seat.',
  },
  {
    start: '10:00',
    end: '10:30',
    title: 'Contestant briefing',
    detail: 'Contestants receive their speaking order. Guests settle in.',
  },
  {
    start: '10:30',
    end: '10:40',
    title: 'Opening and welcome',
    detail:
      'Welcome from the convener, introduction of the judges and how the competition works.',
    kind: 'moment',
  },
  {
    start: '10:40',
    end: '11:30',
    title: 'Round One: The Power of Persuasion',
    detail: 'Speakers 1 to 25. One-minute speeches making a case for an idea.',
    kind: 'round',
  },
  { start: '11:30', end: '11:45', title: 'Short break', kind: 'break' },
  {
    start: '11:45',
    end: '12:35',
    title: 'Round One: The Power of Persuasion',
    detail: 'Speakers 26 to 50.',
    kind: 'round',
  },
  {
    start: '12:35',
    end: '1:15',
    title: 'Lunch break',
    detail: 'Round One scores are compiled.',
    kind: 'break',
  },
  {
    start: '1:15',
    end: '1:20',
    title: 'Spoken word: Saliu Ahmad (Penwarlord)',
    detail:
      'A guest spoken word performance while Round One results are confirmed.',
    kind: 'moment',
  },
  {
    start: '1:20',
    end: '1:30',
    title: 'Semifinalists announced',
    detail: 'Fifteen speakers advance.',
    kind: 'moment',
  },
  {
    start: '1:30',
    end: '2:45',
    title: 'Semifinal: The Power of Solutions',
    detail:
      'Three-minute speeches on practical solutions to school and community challenges, each followed by panel feedback.',
    kind: 'round',
  },
  {
    start: '2:45',
    end: '3:00',
    title: 'Short break',
    detail: 'Semifinal scores are compiled.',
    kind: 'break',
  },
  {
    start: '3:00',
    end: '3:05',
    title: 'Spoken word: Saliu Ahmad (Penwarlord)',
    detail: 'A second guest performance while semifinal results are confirmed.',
    kind: 'moment',
  },
  {
    start: '3:05',
    end: '3:15',
    title: 'Finalists announced',
    detail: 'Five speakers reach the final.',
    kind: 'moment',
  },
  {
    start: '3:15',
    end: '3:40',
    title: 'Final: “Dear Mr Governor”',
    detail:
      'Two-minute appeals for positive change, each followed by questions from the judges.',
    kind: 'round',
  },
  {
    start: '3:40',
    end: '4:25',
    title: 'Goodwill messages and partner recognition',
    detail:
      'Remarks from our special guests while the judges confirm the results.',
    kind: 'moment',
  },
  {
    start: '4:25',
    end: '4:45',
    title: 'Awards and closing',
    detail: 'Recognition of all finalists, then the winner and two runners-up.',
    kind: 'moment',
  },
  {
    start: '4:45',
    end: '5:00',
    title: 'Photographs and departures',
  },
];

export type Person = { name: string; role: string; title?: string };

// Names, roles and titles as confirmed by the organiser (flyer, 7 Nov 2026).
// Four judges are confirmed; if one withdraws, remove them here.
export const people: {
  convener: Person;
  judges: Person[];
  guests: Person[];
  performers: Person[];
} = {
  convener: { name: 'Sakeenah Jatto', role: 'Convener' },
  judges: [
    { name: 'Dr Foluke Aliyyu', role: 'Chief Judge' },
    { name: 'Sanni Alausa-Issa', role: 'Judge' },
    { name: 'Bisola Oduwole-Suleiman', role: 'Judge' },
    {
      name: 'Dr Rasheed Ajao',
      role: 'Judge',
      title:
        'Senior Education Officer, Kwara State Ministry of Education and Human Capital Development',
    },
  ],
  guests: [
    {
      name: 'Hon. Ibraheem Abdullateef',
      role: 'Special Guest',
      title:
        'Senior Special Assistant to the Kwara State Governor on Communications',
    },
    {
      name: 'Dr Mahmud Abdulraheem, Esq.',
      role: 'Special Guest',
      title: 'Chief Promoter, GerinFm 95.5',
    },
    { name: 'Rafiu Ajakaye, PhD', role: 'Special Guest' },
    { name: 'Dr Oba Abdulkadir La’aro', role: 'Special Guest' },
    { name: 'Mrs Ajide Victoria Omowumi', role: 'Special Guest' },
    {
      name: 'Mal. Abdur Rahman Adebayo (ARA Aderinoye)',
      role: 'Gold Sponsor / Special Guest',
    },
    {
      name: 'Engr Taofik Abdulkareem',
      role: 'Gold Sponsor / Special Guest',
      title: 'Plat Technologies Limited',
    },
  ],
  performers: [
    {
      name: 'Saliu Ahmad (Penwarlord)',
      role: 'Guest Performer',
      title: 'Spoken word',
    },
  ],
};

// bg: tile colour for logos that are solid colour blocks.
export type Sponsor = {
  name: string;
  logo?: string;
  bg?: string;
  wide?: boolean;
};

// Tiers follow the official sponsor and partner announcement posts.
export const sponsors: { tier: string; items: Sponsor[] }[] = [
  {
    tier: 'Gold Sponsors',
    items: [
      { name: 'Mal. Abdur Rahman Adebayo (ARA Aderinoye)' },
      { name: 'Plat Technologies', logo: 'plat-technologies' },
      { name: 'Jatto Solutions Inc.', logo: 'jatto-solutions' },
      { name: 'Jatto Hafiz', logo: 'jh' },
    ],
  },
  {
    tier: 'Educational Partner',
    items: [
      {
        name: 'Kwara State Ministry of Education and Human Capital Development',
        logo: 'kwara-ministry-of-education',
        wide: true,
      },
    ],
  },
  {
    tier: 'Media Partners',
    items: [
      { name: 'Factual Naija', logo: 'factual-naija' },
      { name: 'The Media Sis', logo: 'the-media-sis' },
      { name: 'Kraftmann Designs', logo: 'kraftmann-designs' },
      { name: 'SAB Shot It', logo: 'sab-shot-it' },
    ],
  },
  {
    tier: 'Partners',
    items: [
      { name: 'Ilorin Innovation Hub', logo: 'ilorin-innovation-hub' },
      { name: 'Mariamella Consult Ltd', logo: 'mariamella-consult' },
      { name: 'House 12 Workspaces & Lifestyle', logo: 'house-12' },
      { name: 'Deejah Skincare and Aesthetics', logo: 'deejah' },
      { name: 'Noor & Thrive', logo: 'noor-and-thrive' },
      {
        name: 'Raising Muslim Girls',
        logo: 'raising-muslim-girls',
        bg: '#0f6155',
      },
      { name: 'Barakah Edibles', logo: 'barakah-edibles', bg: '#000000' },
    ],
  },
];
