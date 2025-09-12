import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Types
interface Destination {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  tags: string[];
  description: string;
}

interface RecommendationEngineProps {
  userPreferences?: string[];
  limit?: number;
}

const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ 
  userPreferences = [],
  limit = 4 
}) => {
  const [recommendations, setRecommendations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // Mock destinations data
  const allDestinations: Destination[] = [
    {
      id: 'mount-cameroon',
      name: 'Mount Cameroon',
      image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Buea, Southwest Region',
      rating: 4.8,
      tags: ['adventure', 'hiking', 'nature', 'mountain'],
      description: 'Experience the majestic beauty of the mountain of fire - West Africa\'s highest peak and active volcano.'
    },
    {
      id: 'kribi-beaches',
      name: 'Kribi Beaches',
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Kribi, South Region',
      rating: 4.9,
      tags: ['beach', 'relaxation', 'ocean', 'swimming'],
      description: 'Pristine white sands meet crystal-clear waters at these stunning Atlantic Ocean beaches.'
    },
    {
      id: 'waza-national-park',
      name: 'Waza National Park',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Far North Region',
      rating: 4.5,
      tags: ['wildlife', 'safari', 'nature', 'animals'],
      description: 'Discover exotic animals in their natural habitat, from elephants to giraffes and lions.'
    },
    {
      id: 'limbe-wildlife-center',
      name: 'Limbe Wildlife Center',
      image: 'https://images.pexels.com/photos/4363227/pexels-photo-4363227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Limbe, Southwest Region',
      rating: 4.7,
      tags: ['wildlife', 'conservation', 'education', 'family'],
      description: 'A sanctuary for rescued primates and other wildlife with conservation and education programs.'
    },
    {
      id: 'korup-national-park',
      name: 'Korup National Park',
      image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Southwest Region',
      rating: 4.6,
      tags: ['nature', 'hiking', 'biodiversity', 'rainforest'],
      description: 'One of Africa\'s oldest and richest rainforests with incredible biodiversity and hiking trails.'
    },
    {
      id: 'ring-road',
      name: 'The Ring Road',
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Northwest Region',
      rating: 4.4,
      tags: ['road trip', 'scenery', 'culture', 'adventure'],
      description: 'A scenic route through the highlands with breathtaking views, waterfalls, and cultural experiences.'
    },
    {
      id: 'dja-reserve',
      name: 'Dja Faunal Reserve',
      image: 'https://images.pexels.com/photos/5207226/pexels-photo-5207226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'South and East Regions',
      rating: 4.8,
      tags: ['unesco', 'nature', 'biodiversity', 'rainforest'],
      description: 'A UNESCO World Heritage site with pristine rainforest and incredible biodiversity.'
    },
    {
      id: 'bimbia-slave-port',
      name: 'Bimbia Slave Port',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: 'Limbe, Southwest Region',
      rating: 4.5,
      tags: ['history', 'heritage', 'education', 'cultural'],
      description: 'Historical site that serves as a reminder of the transatlantic slave trade.'
    }
  ];

  // Generate recommendations based on user preferences
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results: Destination[] = [];
      
      if (userPreferences.length > 0) {
        // Filter destinations by user preferences
        results = allDestinations.filter(dest => 
          dest.tags.some(tag => userPreferences.includes(tag))
        );
        
        // If we have more than enough, sort by relevance (how many tags match)
        if (results.length > limit) {
          results = results.sort((a, b) => {
            const aMatches = a.tags.filter(tag => userPreferences.includes(tag)).length;
            const bMatches = b.tags.filter(tag => userPreferences.includes(tag)).length;
            return bMatches - aMatches;
          });
        }
      }
      
      // If no preferences or not enough matches, add popular destinations
      if (results.length < limit) {
        // Sort remaining destinations by rating
        const remainingDests = allDestinations
          .filter(dest => !results.some(r => r.id === dest.id))
          .sort((a, b) => b.rating - a.rating);
        
        // Add top-rated destinations until we reach the limit
        results = [
          ...results,
          ...remainingDests.slice(0, limit - results.length)
        ];
      }
      
      // Limit results
      setRecommendations(results.slice(0, limit));
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPreferences, limit]);

  const handleSaveDestination = (destId: string) => {
    if (!currentUser) {
      toast.error('Please sign in to save destinations');
      return;
    }
    
    // Here you would save to the user's profile
    toast.success('Destination saved to your favorites!');
  };
  
  const handleShareDestination = (destId: string) => {
    // Simulate share functionality
    navigator.clipboard.writeText(`https://voyagecameroon.com/destinations/${destId}`);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Recommended for You
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Personalized travel suggestions based on your interests and popular destinations in Cameroon
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cameroon-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((destination) => (
            <div 
              key={destination.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white">{destination.name}</h3>
                  <p className="text-sm text-gray-300">{destination.location}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{destination.rating.toFixed(1)}</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-cameroon-green-100 text-cameroon-green-800 dark:bg-cameroon-green-900/20 dark:text-cameroon-green-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={`/destinations/${destination.id}`} 
                    className="text-cameroon-blue-600 hover:text-cameroon-blue-800 dark:text-cameroon-blue-400 dark:hover:text-cameroon-blue-300 font-medium text-sm"
                  >
                    Learn More
                  </a>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSaveDestination(destination.id)}
                      className="p-1 text-gray-500 hover:text-cameroon-red-500 transition-colors"
                    >
                      <Heart size={18} />
                    </button>
                    <button 
                      onClick={() => handleShareDestination(destination.id)}
                      className="p-1 text-gray-500 hover:text-cameroon-blue-500 transition-colors"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine;
