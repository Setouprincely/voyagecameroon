import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Ticket, Filter, Music, Trophy, Palette } from 'lucide-react';

const EventsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);

  const events = [
    {
      id: 1,
      name: 'Ngondo Festival 2024',
      category: 'cultural',
      location: 'Douala',
      date: '2024-12-15',
      time: '10:00 AM',
      duration: '3 days',
      attendees: '5000+',
      price: '$25',
      image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Annual water festival celebrating Sawa culture with traditional ceremonies, boat races, and cultural displays.',
      featured: true
    },
    {
      id: 2,
      name: 'Jazz Safari Cameroon',
      category: 'concert',
      location: 'Yaoundé',
      date: '2024-11-20',
      time: '7:00 PM',
      duration: '4 hours',
      attendees: '2000+',
      price: '$45',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'International jazz festival featuring renowned African and international artists.',
      featured: false
    },
    {
      id: 3,
      name: 'Mount Cameroon Race',
      category: 'sport',
      location: 'Buea',
      date: '2024-02-10',
      time: '6:00 AM',
      duration: '1 day',
      attendees: '500+',
      price: '$85',
      image: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'International mountain race up the slopes of Mount Cameroon, West Africa\'s highest peak.',
      featured: true
    },
    {
      id: 4,
      name: 'Bamenda Cultural Night',
      category: 'cultural',
      location: 'Bamenda',
      date: '2024-01-25',
      time: '6:30 PM',
      duration: '5 hours',
      attendees: '1500+',
      price: '$20',
      image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Showcase of Northwest region traditional dances, music, and local cuisine.',
      featured: false
    },
    {
      id: 5,
      name: 'Limbe Festival of Arts',
      category: 'festival',
      location: 'Limbe',
      date: '2024-03-15',
      time: '2:00 PM',
      duration: '2 days',
      attendees: '3000+',
      price: '$35',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Contemporary arts festival with exhibitions, workshops, and performances by local and international artists.',
      featured: true
    },
    {
      id: 6,
      name: 'Cameroon Music Awards',
      category: 'concert',
      location: 'Douala',
      date: '2024-04-22',
      time: '8:00 PM',
      duration: '3 hours',
      attendees: '4000+',
      price: '$60',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      description: 'Annual awards ceremony celebrating the best in Cameroonian music with live performances.',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500', icon: '🌍' },
    { id: 'cultural', name: 'Cultural', color: 'bg-cameroon-red-500', icon: '🎭' },
    { id: 'concert', name: 'Concerts', color: 'bg-cameroon-yellow-500', icon: '🎵' },
    { id: 'sport', name: 'Sports', color: 'bg-cameroon-green-500', icon: '🏃' },
    { id: 'festival', name: 'Festivals', color: 'bg-cameroon-blue-500', icon: '🎪' }
  ];

  const months = [
    { id: 'all', name: 'All Months' },
    { id: '01', name: 'January' },
    { id: '02', name: 'February' },
    { id: '03', name: 'March' },
    { id: '04', name: 'April' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ];

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    const monthMatch = selectedMonth === 'all' || event.date.split('-')[1] === selectedMonth;
    return categoryMatch && monthMatch;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  // Animate events on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleEvents(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [selectedCategory, selectedMonth]);

  return (
    <section id="events" className="section-padding bg-gradient-to-br from-cameroon-blue-50 via-white to-cameroon-green-50 dark:from-gray-900 dark:via-cameroon-blue-950 dark:to-cameroon-green-950">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 glass-card rounded-full">
            <Music className="w-5 h-5 text-cameroon-yellow-500" />
            <span className="text-sm font-medium">Cultural Celebrations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Immerse yourself in vibrant cultural celebrations, world-class concerts, and unforgettable festivals that showcase the rich diversity of Cameroon
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-on-scroll">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-2xl`
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-lg backdrop-blur-sm'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Month Filter */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-6 py-4 pr-10 glass-card rounded-2xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-cameroon-blue-500 focus:border-transparent appearance-none font-medium"
            >
              {months.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.name}
                </option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cameroon-blue-500 pointer-events-none" />
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold gradient-text mb-4">
                Featured Events
              </h3>
              <div className="w-24 h-1 bg-cameroon-gradient mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden 
                           hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 
                                  rounded-full shadow-lg">
                      <span className="text-white text-sm font-bold">Featured</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white font-bold text-lg">{event.price}</span>
                    </div>

                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center space-x-4 text-sm mb-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {event.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        categories.find(cat => cat.id === event.category)?.color || 'bg-gray-500'
                      } text-white`}>
                        {event.category}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{event.location}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{event.attendees}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{event.duration}</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                                     rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 
                                     transform hover:scale-105 transition-all duration-300 shadow-md 
                                     flex items-center justify-center space-x-2">
                      <Ticket className="w-5 h-5" />
                      <span>Get Tickets</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                       hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white font-bold">{event.price}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {event.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    categories.find(cat => cat.id === event.category)?.color || 'bg-gray-500'
                  } text-white`}>
                    {event.category}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-3 mr-1" />
                  <span className="text-sm">{event.time}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{event.attendees}</span>
                  </div>
                  <span>{event.duration}</span>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                                 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 
                                 transform hover:scale-105 transition-all duration-300 shadow-md 
                                 flex items-center justify-center space-x-2">
                  <Ticket className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-cameroon-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Try adjusting your filters to discover amazing events across Cameroon
            </p>
          </div>
        )}
        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="glass-card p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Experience Cameroon's Rich Cultural Heritage
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              From traditional festivals to modern concerts, immerse yourself in the vibrant events that make Cameroon truly special
            </p>
            <button className="futuristic-button">
              <span className="mr-2">🎭</span>
              Explore All Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;