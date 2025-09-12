export interface Event {
  id: number;
  name: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  attendees: string;
  price: string;
  image: string;
  description: string;
  featured: boolean;
}

export const eventsData: Event[] = [
  {
    id: 1,
    name: 'Ngondo Festival 2024',
    category: 'cultural',
    location: 'Douala',
    date: '2024-12-15',
    time: '10:00 AM',
    duration: '3 days',
    attendees: '5000+',
    price: '15,000 CFA',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'Annual water festival celebrating Sawa culture with traditional ceremonies, boat races, and cultural displays.',
    featured: true
  },
  {
    id: 2,
    name: 'Jazz Safari Cameroon',
    category: 'concert',
    location: 'Yaoundé',
    date: '2024-11-20',
    time: '7:00 PM',
    duration: '4 hours',
    attendees: '2000+',
    price: '27,000 CFA',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'International jazz festival featuring renowned African and international artists.',
    featured: false
  },
  {
    id: 3,
    name: 'Mount Cameroon Race',
    category: 'sport',
    location: 'Buea',
    date: '2025-02-10',
    time: '8:00 AM',
    duration: '2 days',
    attendees: '3000+',
    price: '9,000 CFA',
    image: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'Annual race to the summit of Mount Cameroon, one of Africa\'s most challenging mountain marathons.',
    featured: true
  },
  {
    id: 4,
    name: 'Limbe Wildlife Photography Contest',
    category: 'art',
    location: 'Limbe',
    date: '2025-01-05',
    time: '9:00 AM',
    duration: '1 day',
    attendees: '500+',
    price: '6,000 CFA',
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'Annual wildlife photography competition with workshops and exhibitions.',
    featured: false
  },
  {
    id: 5,
    name: 'Kribi Beach Festival',
    category: 'cultural',
    location: 'Kribi',
    date: '2025-03-25',
    time: '2:00 PM',
    duration: '2 days',
    attendees: '1500+',
    price: '12,000 CFA',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'Beachside celebration with music, dance, and local cuisine.',
    featured: true
  },
  {
    id: 6,
    name: 'Cameroon Culinary Fair',
    category: 'food',
    location: 'Yaoundé',
    date: '2025-04-10',
    time: '11:00 AM',
    duration: '3 days',
    attendees: '2500+',
    price: '18,000 CFA',
    image: 'https://images.pexels.com/photos/5907812/pexels-photo-5907812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    description: 'Showcase of Cameroon\'s diverse culinary traditions with tastings and cooking demonstrations.',
    featured: false
  }
];
