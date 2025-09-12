import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Calendar, Star, Share2 } from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { destinationsData } from '../data/destinations';
import PaymentSection from '../components/PaymentSection';
import TourBookingForm from '../components/TourBookingForm';
import RecommendationSection from '../components/RecommendationSection';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the destination by ID - ensure id is properly converted to number
  const numId = id ? parseInt(id, 10) : 0;
  const destination = destinationsData.find(dest => dest.id === numId);
  
  console.log("Destination ID:", id, "Numeric ID:", numId);
  console.log("All destinations:", destinationsData.map(d => d.id));
  console.log("Found destination:", destination);
  
  // If destination not found
  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Destination not found</h2>
        <button 
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/destinations')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to destinations
        </button>
      </div>
    );
  }
  
  // Format images for gallery
  const images = [
    { original: destination.image, thumbnail: destination.image },
    // Normally you would have more images here
    { original: 'https://images.pexels.com/photos/2440079/pexels-photo-2440079.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2', thumbnail: 'https://images.pexels.com/photos/2440079/pexels-photo-2440079.jpeg?auto=compress&cs=tinysrgb&w=100&h=80&dpr=2' },
    { original: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2', thumbnail: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=100&h=80&dpr=2' },
    { original: 'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2', thumbnail: 'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&w=100&h=80&dpr=2' },
  ];

  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/destinations')}
        >
          <ArrowLeft className="mr-1" size={16} />
          Back
        </button>
      </div>
      
      <div className="container mx-auto px-4 pb-20">
        {/* Top section with name and basic info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{destination.name}</h1>
          <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
            <MapPin size={18} className="mr-1" />
            <span className="mr-4">{destination.location}</span>
            <Star size={18} className="mr-1 text-yellow-500" />
            <span className="mr-4">{destination.rating} (120 reviews)</span>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="mb-12 rounded-xl overflow-hidden">
          <ImageGallery 
            items={images} 
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
            showBullets={true}
          />
        </div>
        
        {/* Content in two columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About {destination.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {destination.description}
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
                    <p className="font-medium text-gray-900 dark:text-white">{destination.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Group Size</p>
                    <p className="font-medium text-gray-900 dark:text-white">{destination.groupSize}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-blue-600 mr-2" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Best time to visit</p>
                    <p className="font-medium text-gray-900 dark:text-white">Nov - Feb</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Location</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                {/* Map will be implemented with MapboxGL */}
                <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Interactive map will be displayed here
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {destination.location}, Cameroon
              </p>
            </div>
            
            {/* More content sections like reviews could go here */}
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Booking form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 sticky top-24">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Book This Tour</h3>
                <span className="text-xl font-bold text-blue-600">{destination.price}</span>
              </div>
              
              <TourBookingForm destination={destination} />
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <RecommendationSection currentId={destination.id} />
      </div>
    </div>
  );
};

export default DestinationDetail;
