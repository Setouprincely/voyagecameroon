import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationsData } from '../data/destinations';
import { MapPin, Star, Clock, Users } from 'lucide-react';

const DestinationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Destinations', color: 'bg-gray-500' },
    { id: 'mountains', name: 'Mountains', color: 'bg-green-500' },
    { id: 'beaches', name: 'Beaches', color: 'bg-blue-500' },
    { id: 'wildlife', name: 'Wildlife', color: 'bg-yellow-500' },
    { id: 'nature', name: 'Nature', color: 'bg-teal-500' }
  ];
  
  const filteredDestinations = activeFilter === 'all'
    ? destinationsData
    : destinationsData.filter(dest => dest.category === activeFilter);
    
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Cameroon's Destinations</h1>
        
        {/* Filter Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(destination => (
            <Link 
              to={`/destinations/${destination.id}`} 
              key={destination.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{destination.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {destination.category}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{destination.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="mr-1 fill-current" />
                    <span>{destination.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock size={16} className="mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="font-bold text-blue-600">{destination.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
