export interface Destination {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  duration: string;
  groupSize: string;
  price: string;
  description: string;
}

export const destinationsData: Destination[] = [
  {
    id: 1,
    name: 'Mount Cameroon',
    category: 'mountains',
    location: 'Buea, Southwest',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.8,
    duration: '3-5 days',
    groupSize: '8-12 people',
    price: '275,000 CFA',
    description: 'Conquer West Africa\'s highest peak with breathtaking views. Mount Cameroon, known locally as "Chariot of the Gods", is an active volcano offering spectacular hiking experiences through diverse ecosystems from rainforest to alpine terrain.'
  },
  {
    id: 2,
    name: 'Kribi Beach',
    category: 'beaches',
    location: 'Kribi, South',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.9,
    duration: '2-4 days',
    groupSize: '4-20 people',
    price: '170,000 CFA',
    description: 'Pristine beaches with palm trees and crystal waters. Kribi features the unique Lobé Waterfalls that flow directly into the Atlantic Ocean, a rare natural phenomenon worth witnessing. Enjoy fresh seafood and water sports.'
  },
  {
    id: 3,
    name: 'Waza National Park',
    category: 'wildlife',
    location: 'Far North',
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.5,
    duration: '4-6 days',
    groupSize: '6-10 people',
    price: '335,000 CFA',
    description: 'Explore one of West Africa\'s most important wildlife reserves. Waza National Park is home to elephants, giraffes, lions, and numerous bird species. Experience the stunning Sahelian landscape with expert guides.'
  },
  {
    id: 4,
    name: 'Limbe Botanical Garden',
    category: 'nature',
    location: 'Limbe, Southwest',
    image: 'https://images.pexels.com/photos/1108408/pexels-photo-1108408.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.6,
    duration: '1-2 days',
    groupSize: 'Any size',
    price: '$75',
    description: 'Visit one of Africa\'s oldest botanical gardens dating back to 1892. Discover over 1,500 plant species from the Congo Basin forests with educational tours about conservation efforts in the region.'
  },
  {
    id: 5,
    name: 'Korup National Park',
    category: 'wildlife',
    location: 'Southwest',
    image: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.7,
    duration: '5-7 days',
    groupSize: '4-8 people',
    price: '$650',
    description: 'Explore one of Africa\'s oldest and richest rainforests, home to over 400 species of birds and 170 species of mammals. Trek through pristine jungle and witness incredible biodiversity.'
  },
  {
    id: 6,
    name: 'Rhumsiki Peak',
    category: 'mountains',
    location: 'Far North',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    rating: 4.8,
    duration: '2-3 days',
    groupSize: '5-12 people',
    price: '$350',
    description: 'Marvel at the iconic volcanic plug formations and experience the traditional culture of the Kapsiki people. Visit local villages and witness ancient customs in this dramatic landscape.'
  }
];

export const culturalExperiencesData = {
  dances: [
    {
      id: 1,
      name: 'Makossa Dance',
      region: 'Littoral',
      image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Traditional dance originating from the coastal regions',
      duration: '2 hours',
      price: '$35'
    },
    {
      id: 2,
      name: 'Bikutsi Performance',
      region: 'Centre',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Energetic traditional dance of the Ewondo people',
      duration: '1.5 hours',
      price: '$30'
    }
  ],
  festivals: [
    {
      id: 3,
      name: 'Ngondo Festival',
      region: 'Littoral',
      image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Annual water festival of the Sawa people',
      duration: '3 days',
      price: '$150'
    },
    {
      id: 4,
      name: 'Mount Cameroon Race',
      region: 'Southwest',
      image: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Famous international mountain race to the summit',
      duration: '2 days',
      price: '$80'
    }
  ],
  cuisine: [
    {
      id: 5,
      name: 'Ndolé Cooking Class',
      region: 'Littoral',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Learn to cook the national dish with local ingredients',
      duration: '3 hours',
      price: '$45'
    },
    {
      id: 6,
      name: 'Koki Bean Workshop',
      region: 'West',
      image: 'https://images.pexels.com/photos/5907812/pexels-photo-5907812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Traditional bean cake preparation with banana leaves',
      duration: '2.5 hours',
      price: '$40'
    }
  ],
  photography: [
    {
      id: 7,
      name: 'Bamenda Highlands Tour',
      region: 'Northwest',
      image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Capture stunning landscapes with pro photography tips',
      duration: '6 hours',
      price: '$75'
    },
    {
      id: 8,
      name: 'Cultural Portrait Session',
      region: 'North',
      image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Photograph traditional customs with local guides',
      duration: '4 hours',
      price: '$60'
    }
  ]
};
