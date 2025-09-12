import React from 'react';
import { Destination } from '../data/destinations';
import { useNavigate } from 'react-router-dom';

interface RecommendationSectionProps {
  currentId: number;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ currentId }) => {
  const navigate = useNavigate();
  
  // Import the destinations data dynamically to avoid circular dependency
  const { destinationsData } = require('../data/destinations');
  
  // Get 3 random destinations that are not the current one
  const recommendations = destinationsData
    .filter((dest: Destination) => dest.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">You Might Also Like</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((destination: Destination) => (
          <div 
            key={destination.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/destinations/${destination.id}`)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{destination.location}</p>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">{destination.duration}</div>
                <div className="font-bold text-blue-600">{destination.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
