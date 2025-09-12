import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Clock, MapPin, ThumbsUp } from 'lucide-react';
import { Destination } from '../data/destinations';
import { destinationsData } from '../data/destinations';
import { Event } from '../data/events';
import { eventsData } from '../data/events';

interface Recommendation {
  type: 'destination' | 'event' | 'cultural';
  id: number;
  name: string;
  image: string;
  location: string;
  description: string;
  bestTime?: string;
  price?: string;
  category?: string;
  date?: string;
}

const PersonalizedRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationPreference, setLocationPreference] = useState<string | null>(null);
  const [interestPreference, setInterestPreference] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Simulate getting user preferences - in a real app, this would come from a user profile or previous interactions
  useEffect(() => {
    const getUserPreferences = () => {
      // Simulate API call or local storage data
      setTimeout(() => {
        // These would be saved from previous user interactions
        const savedLocation = localStorage.getItem('user_location_preference') || 'Southwest';
        const savedInterest = localStorage.getItem('user_interest_preference') || 'mountains';
        
        setLocationPreference(savedLocation);
        setInterestPreference(savedInterest);
        generateRecommendations(savedLocation, savedInterest);
        setIsLoading(false);
      }, 1000);
    };
    
    getUserPreferences();
  }, []);
  
  const generateRecommendations = (location: string, interest: string) => {
    // Get relevant destinations based on preferences
    const filteredDestinations = destinationsData
      .filter(dest => 
        dest.location.includes(location) || 
        dest.category === interest
      )
      .map(dest => ({
        type: 'destination' as const,
        id: dest.id,
        name: dest.name,
        image: dest.image,
        location: dest.location,
        description: dest.description,
        bestTime: 'Nov - Feb', // This would be dynamic data in a real app
        price: dest.price,
        category: dest.category
      }));
    
    // Get upcoming events
    const currentDate = new Date();
    const upcomingEvents = eventsData
      .filter(event => new Date(event.date) > currentDate)
      .map(event => ({
        type: 'event' as const,
        id: event.id,
        name: event.name,
        image: event.image,
        location: event.location,
        description: event.description,
        date: event.date,
        price: event.price,
        category: event.category
      }));
    
    // Combine and sort recommendations based on relevance
    // In a real app, you would use a recommendation algorithm
    const allRecommendations = [...filteredDestinations, ...upcomingEvents]
      .sort(() => 0.5 - Math.random()) // Simple randomization for demo
      .slice(0, 6);
    
    setRecommendations(allRecommendations);
  };
  
  const handleCardClick = (recommendation: Recommendation) => {
    if (recommendation.type === 'destination') {
      navigate(`/destinations/${recommendation.id}`);
    } else if (recommendation.type === 'event') {
      navigate(`/events/${recommendation.id}`);
    } else {
      navigate(`/cultural/${recommendation.id}`);
    }
  };
  
  const updatePreferences = (location: string, interest: string) => {
    localStorage.setItem('user_location_preference', location);
    localStorage.setItem('user_interest_preference', interest);
    
    setLocationPreference(location);
    setInterestPreference(interest);
    
    setIsLoading(true);
    generateRecommendations(location, interest);
    setIsLoading(false);
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Personalized Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover experiences tailored just for you
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <div className="relative">
              <select 
                value={locationPreference || ''}
                onChange={(e) => updatePreferences(e.target.value, interestPreference || 'mountains')}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2 pr-8 appearance-none"
              >
                <option value="Southwest">Southwest Region</option>
                <option value="Littoral">Littoral Region</option>
                <option value="North">Northern Regions</option>
                <option value="Centre">Central Region</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select 
                value={interestPreference || ''}
                onChange={(e) => updatePreferences(locationPreference || 'Southwest', e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2 pr-8 appearance-none"
              >
                <option value="mountains">Mountains</option>
                <option value="beaches">Beaches</option>
                <option value="wildlife">Wildlife</option>
                <option value="culture">Cultural</option>
                <option value="food">Cuisine</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-2 mr-3">
            <Info size={20} />
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Recommendations are based on your preferences for <span className="font-semibold">{locationPreference}</span> region and interest in <span className="font-semibold">{interestPreference}</span>.
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(recommendation)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recommendation.name}</h3>
                    {recommendation.type === 'destination' && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Destination
                      </span>
                    )}
                    {recommendation.type === 'event' && (
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        Event
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{recommendation.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {recommendation.description}
                  </p>
                  <div className="flex justify-between items-center">
                    {recommendation.type === 'destination' ? (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        <span>Best time: {recommendation.bestTime}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        <span>Date: {new Date(recommendation.date!).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="font-bold text-blue-600">{recommendation.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5">
            <ThumbsUp size={16} className="mr-2" />
            Refine My Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
