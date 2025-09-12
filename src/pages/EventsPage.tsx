import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsData, Event } from '../data/events';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeMonth, setActiveMonth] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);
  
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'concert', name: 'Concerts' },
    { id: 'sport', name: 'Sports' },
    { id: 'food', name: 'Food' },
    { id: 'art', name: 'Art' }
  ];
  
  const months = [
    { id: 'all', name: 'All Year' },
    { id: '01', name: 'January' },
    { id: '02', name: 'February' },
    { id: '03', name: 'March' },
    { id: '04', name: 'April' },
    { id: '05', name: 'May' },
    { id: '06', name: 'June' },
    { id: '07', name: 'July' },
    { id: '08', name: 'August' },
    { id: '09', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ];
  
  // Apply filters
  useEffect(() => {
    let filtered = eventsData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    if (activeMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const eventMonth = String(eventDate.getMonth() + 1).padStart(2, '0');
        return eventMonth === activeMonth;
      });
    }
    
    setFilteredEvents(filtered);
  }, [activeCategory, activeMonth]);
  
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Events & Festivals</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            <Filter size={20} className="mr-2 text-blue-600" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <select
              value={activeMonth}
              onChange={(e) => setActiveMonth(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-gray-700 dark:text-gray-300 appearance-none pr-8"
            >
              {months.map(month => (
                <option key={month.id} value={month.id}>{month.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          <p>Found {filteredEvents.length} events</p>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => {
            // Format the date
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
            
            return (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <span className={`
                      inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 self-start
                      ${event.category === 'cultural' ? 'bg-purple-500' : 
                        event.category === 'concert' ? 'bg-blue-500' : 
                        event.category === 'sport' ? 'bg-green-500' : 
                        event.category === 'food' ? 'bg-yellow-500' : 
                        event.category === 'art' ? 'bg-pink-500' : 'bg-gray-500'} 
                      text-white
                    `}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{formattedDate} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="inline mr-1" />
                      {event.duration}
                    </div>
                    <span className="font-bold text-blue-600">{event.price}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No events found for your selected filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveMonth('all');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
