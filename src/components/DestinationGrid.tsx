import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Heart, Compass, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { destinationsData } from '../data/destinations';

const DestinationGrid = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Destinations', color: 'bg-gray-500', icon: '🌍' },
    { id: 'mountains', name: 'Mountains', color: 'bg-cameroon-green-500', icon: '⛰️' },
    { id: 'beaches', name: 'Beaches', color: 'bg-cameroon-blue-500', icon: '🏖️' },
    { id: 'wildlife', name: 'Wildlife', color: 'bg-cameroon-yellow-500', icon: '🦁' },
    { id: 'culture', name: 'Culture', color: 'bg-cameroon-red-500', icon: '🎭' }
  ];

  const filteredDestinations = filter === 'all' 
    ? destinationsData 
    : destinationsData.filter(dest => dest.category === filter);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Animate cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleCards(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="destinations" className="section-padding bg-gradient-to-br from-gray-50 via-white to-cameroon-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-cameroon-green-950">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 glass-card rounded-full">
            <Compass className="w-5 h-5 text-cameroon-blue-500" />
            <span className="text-sm font-medium">Explore Cameroon</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            {t('destinations')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Discover the most beautiful places in Cameroon, from majestic mountains to pristine beaches and vibrant cultural experiences
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === category.id
                  ? `${category.color} text-white shadow-2xl`
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-lg backdrop-blur-sm'
              }`}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              {category.name}
              {filter === category.id && (
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              data-id={destination.id}
              className={`destination-card group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden 
                         hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer
                         ${visibleCards.includes(destination.id) ? 'animate-on-scroll animate' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/destinations/${destination.id}`)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="px-3 py-1 bg-cameroon-green-500/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                    {destination.category}
                  </div>
                  <div className="px-3 py-1 bg-black/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                    ⭐ {destination.rating}
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm 
                           hover:bg-white/30 transition-all duration-300 group/fav"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      favorites.includes(destination.id) 
                        ? 'text-red-500 fill-current scale-110' 
                        : 'text-white group-hover/fav:scale-110'
                    }`}
                  />
                </button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">View Details</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cameroon-green-600 transition-colors">
                    {destination.name}
                  </h3>
                  <span className="text-2xl font-bold gradient-text">
                    {destination.price}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-cameroon-blue-500" />
                  <span className="text-sm">{destination.location}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-cameroon-yellow-500" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-cameroon-red-500" />
                    <span>{destination.groupSize}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button 
                  onClick={() => navigate(`/destinations/${destination.id}`)}
                  className="w-full py-4 futuristic-button group/btn relative overflow-hidden"
                >
                  <span className="relative z-10">{t('bookNow')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cameroon-blue-500 to-cameroon-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Ready for Your Cameroon Adventure?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore more destinations and create unforgettable memories in the heart of Africa
            </p>
            <button className="futuristic-button">
              View All Destinations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;