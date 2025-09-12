import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Utensils, Clock, DollarSign } from 'lucide-react';
import { culturalExperiencesData } from '../data/destinations';
import TourBookingForm from '../components/TourBookingForm';
import MediaGallery from '../components/MediaGallery';

const CulturalDetail: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();
  const [showMediaGallery, setShowMediaGallery] = React.useState(false);
  
  // Get all experiences in a flat array
  const allExperiences = [
    ...culturalExperiencesData.dances,
    ...culturalExperiencesData.festivals,
    ...culturalExperiencesData.cuisine,
    ...culturalExperiencesData.photography
  ];
  
  const experience = allExperiences.find(exp => exp.id === parseInt(id || '0'));
  
  if (!experience) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cultural experience not found</h2>
        <button 
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/cultural')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to cultural experiences
        </button>
      </div>
    );
  }
  
  // Create mock media items for the gallery
  const mediaItems = [
    {
      type: 'image' as const,
      url: experience.image,
      title: experience.name
    },
    {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
      title: `${experience.name} - View 2`
    },
    {
      type: 'video' as const,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video URL
      thumbnail: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
      title: `${experience.name} - Video Tour`
    },
    {
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
      title: `${experience.name} - View 3`
    }
  ];
  
  // Determine what type of cultural experience this is
  const determineType = () => {
    if (culturalExperiencesData.dances.some(dance => dance.id === experience.id)) {
      return 'dance';
    } else if (culturalExperiencesData.festivals.some(festival => festival.id === experience.id)) {
      return 'festival';
    } else if (culturalExperiencesData.cuisine.some(dish => dish.id === experience.id)) {
      return 'cuisine';
    } else {
      return 'photography';
    }
  };
  
  const experienceType = type || determineType();
  
  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/cultural')}
        >
          <ArrowLeft className="mr-1" size={16} />
          Back
        </button>
      </div>
      
      <div className="container mx-auto px-4 pb-20">
        {/* Hero section */}
        <div className="relative rounded-xl overflow-hidden h-96 mb-8 cursor-pointer" onClick={() => setShowMediaGallery(true)}>
          <img 
            src={experience.image} 
            alt={experience.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <div className="inline-flex items-center mb-2">
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium 
                ${experienceType === 'dance' ? 'bg-purple-500' : 
                  experienceType === 'festival' ? 'bg-blue-500' : 
                  experienceType === 'cuisine' ? 'bg-yellow-500' : 
                  'bg-pink-500'} 
                text-white
              `}>
                {experienceType.charAt(0).toUpperCase() + experienceType.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{experience.name}</h1>
            <div className="flex flex-wrap gap-4 text-white text-sm">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{experience.region}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Duration: {experience.duration}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={16} className="mr-1" />
                <span>{experience.price}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
            Click to view gallery
          </div>
        </div>
        
        {/* Content in two columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About this {experienceType}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {experience.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              </p>
              
              {/* Key information */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center">
                  <Clock className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-medium text-gray-900 dark:text-white">{experience.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Best time to experience</p>
                    <p className="font-medium text-gray-900 dark:text-white">Year-round</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Utensils className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Includes</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {experienceType === 'cuisine' ? 'All ingredients' : 'Local guide'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* What to expect */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What to expect</h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Authentic cultural immersion with local experts</li>
                <li>Hands-on participation and interactive experiences</li>
                <li>Traditional {experienceType === 'cuisine' ? 'ingredients and cooking methods' : 'attire and customs'}</li>
                <li>Insights into the cultural significance and history</li>
                <li>Photo opportunities and memorable moments</li>
              </ul>
            </div>
            
            {/* Location */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Location</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                {/* Map will be implemented with MapboxGL */}
                <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Interactive map will be displayed here
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {experience.region} Region, Cameroon
              </p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Booking form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 sticky top-24">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Book Now</h3>
                <span className="text-xl font-bold text-blue-600">{experience.price}</span>
              </div>
              
              <TourBookingForm destination={{
                ...experience,
                id: experience.id,
                name: experience.name,
                category: experienceType,
                location: experience.region,
                image: experience.image,
                rating: 4.8,
                duration: experience.duration,
                groupSize: '2-10 people',
                price: experience.price,
                description: experience.description
              }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Media Gallery Modal */}
      {showMediaGallery && (
        <MediaGallery 
          items={mediaItems} 
          onClose={() => setShowMediaGallery(false)}
        />
      )}
    </div>
  );
};

export default CulturalDetail;
