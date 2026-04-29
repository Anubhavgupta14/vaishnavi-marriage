export const WEDDING = {
  bride: 'Vaishnavi',
  groom: 'Sumeet',
  date: new Date('2026-05-08T12:37:00+05:30'),
  venue: {
    name: 'Sanskar Banquet Hall',
    address: 'Baner Rd, opposite Yashada, Sakal Nagar, Aundh, Pune, Maharashtra 411008',
    lat: 18.5593,
    lng: 73.8072,
    mapsUrl: 'https://maps.google.com/?q=Sanskar+Banquet+Hall+Aundh+Pune',
    embedUrl:
      'https://maps.google.com/maps?q=18.5593,73.8072&z=16&output=embed',
  },
  message:
    'On this special and joyful occasion of ours, we sincerely request your gracious presence along with your family to bless us and make the event even more memorable.',
};

export const EVENTS = [
  {
    name: 'Varmala',
    icon: '💍',
    time: '12:37 PM',
    description: 'The sacred exchange of garlands',
    color: '#7a1a2e',
  },
  {
    name: 'Saptapadi',
    icon: '🔥',
    time: '1:30 PM',
    description: 'Seven vows around the sacred fire',
    color: '#c9973a',
  },
  {
    name: 'Phera',
    icon: '🌸',
    time: '2:15 PM',
    description: 'Circling the sacred flame together',
    color: '#9b2335',
  },
  {
    name: 'Reception',
    icon: '🎉',
    time: '7:00 PM',
    description: 'Celebrate with us at the evening reception',
    color: '#7a1a2e',
  },
];

export const GALLERY_IMAGES = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  src: `/${i + 1}.jpeg`,
  alt: `Vaishnavi & Sumeet — Photo ${i + 1}`,
}));
