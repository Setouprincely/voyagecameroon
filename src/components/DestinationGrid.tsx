import React, { useState } from 'react';
import { MapPin, Star, Clock, Users, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DestinationGrid = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const destinations = [
    {
      id: 1,
      name: 'Mount Cameroon',
      category: 'mountains',
      location: 'Buea, Southwest',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      rating: 4.8,
      duration: '3-5 days',
      groupSize: '8-12 people',
      price: '$450',
      description: 'Conquer West Africa\'s highest peak with breathtaking views'
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
      price: '$280',
      description: 'Pristine beaches with palm trees and crystal waters'
    },
    {
      id: 3,
      name: 'Waza National Park',
      category: 'wildlife',
      location: 'Far North',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      rating: 4.7,
      duration: '3-7 days',
      groupSize: '6-15 people',
      price: '$380',
      description: 'Safari adventure with elephants, lions, and giraffes'
    },
    {
      id: 4,
      name: 'Foumban Royal Palace',
      category: 'culture',
      location: 'West Region',
      image: 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      rating: 4.6,
      duration: '1-2 days',
      groupSize: '5-25 people',
      price: '$120',
      description: 'Explore rich Bamoun culture and traditional architecture'
    },
    {
      id: 5,
      name: 'Douala City Tour',
      category: 'culture',
      location: 'Littoral',
      image: 'https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      rating: 4.4,
      duration: '1 day',
      groupSize: '8-30 people',
      price: '$85',
      description: 'Urban adventure through Cameroon\'s economic capital'
    },
    {
      id: 6,
      name: 'Ring Road Adventure',
      category: 'mountains',
      location: 'Northwest',
      image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      rating: 4.9,
      duration: '5-10 days',
      groupSize: '4-12 people',
      price: '$650',
      description: 'Scenic mountain route with traditional villages'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', color: 'bg-gray-500' },
    { id: 'mountains', name: 'Mountains', color: 'bg-green-500' },
    { id: 'beaches', name: 'Beaches', color: 'bg-blue-500' },
    { id: 'wildlife', name: 'Wildlife', color: 'bg-yellow-500' },
    { id: 'culture', name: 'Culture', color: 'bg-red-500' }
  ];

  const filteredDestinations = filter === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === filter);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('destinations')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the most beautiful places in Cameroon, from majestic mountains to pristine beaches
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                       hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm 
                           hover:bg-white/30 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(destination.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-white'
                    }`}
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-white text-sm font-medium capitalize">
                    {destination.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {destination.name}
                  </h3>
                  <span className="text-2xl font-bold text-green-600">
                    {destination.price}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    <span>{destination.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{destination.groupSize}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                                 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                                 transform hover:scale-105 transition-all duration-300 shadow-md">
                  {t('bookNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;