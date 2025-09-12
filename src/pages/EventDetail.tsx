import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Ticket, Share2, X } from 'lucide-react';
import { eventsData } from '../data/events';
import EventRegistrationForm from '../components/EventRegistrationForm';
import toast from 'react-hot-toast';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  const event = eventsData.find(e => e.id === parseInt(id || '0'));
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event not found</h2>
        <button 
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/events')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to events
        </button>
      </div>
    );
  }
  
  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };
  
  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/events')}
        >
          <ArrowLeft className="mr-1" size={16} />
          Back
        </button>
      </div>
      
      <div className="container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden h-80 mb-8">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <div className="inline-flex items-center mb-2">
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium 
                ${event.category === 'cultural' ? 'bg-purple-500' : 
                  event.category === 'concert' ? 'bg-blue-500' : 
                  event.category === 'sport' ? 'bg-green-500' : 
                  event.category === 'food' ? 'bg-yellow-500' : 
                  event.category === 'art' ? 'bg-pink-500' : 'bg-gray-500'} 
                text-white
              `}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              {event.featured && (
                <span className="ml-2 px-2 py-1 bg-yellow-500 rounded-full text-xs font-medium text-white">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.name}</h1>
            <div className="flex flex-wrap gap-4 text-white text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{event.time} • {event.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Event</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {event.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              </p>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What to expect</h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Immersive cultural experiences</li>
                  <li>Local music and performances</li>
                  <li>Traditional food and beverages</li>
                  <li>Interactive exhibitions</li>
                  <li>Networking opportunities</li>
                </ul>
              </div>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  {/* Map will be implemented with MapboxGL */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Interactive map will be displayed here
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {event.location}, Cameroon
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Event Details Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 sticky top-24">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Event Details</h3>
                <button 
                  onClick={handleShare}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Share2 size={20} />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date and Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formattedDate}, {event.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.location}, Cameroon</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users size={20} className="text-gray-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Attendees</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.attendees}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Ticket size={20} className="text-gray-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.price}</p>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5"
                onClick={() => setShowRegistrationForm(true)}
              >
                Register for Event
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Register for {event.name}</h2>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <EventRegistrationForm 
                event={event} 
                onClose={() => setShowRegistrationForm(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
