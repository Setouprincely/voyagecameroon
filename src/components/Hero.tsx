import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Mount Cameroon',
      subtitle: 'West Africa\'s Highest Peak',
      description: 'Experience the majestic beauty of the mountain of fire',
      location: 'Buea, Southwest Region',
      rating: 4.8,
      category: 'Adventure'
    },
    {
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Kribi Beaches',
      subtitle: 'Atlantic Coastline Paradise',
      description: 'Pristine white sands meet crystal-clear waters',
      location: 'Kribi, South Region',
      rating: 4.9,
      category: 'Beach'
    },
    {
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Waza National Park',
      subtitle: 'Wildlife Safari Adventure',
      description: 'Discover exotic animals in their natural habitat',
      location: 'Far North Region',
      rating: 4.5,
      category: 'Wildlife'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>

      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-cameroon-gradient opacity-10"></div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-cameroon-yellow-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-cameroon-green-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-cameroon-blue-400 rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-cameroon-red-400 rounded-full animate-float opacity-30" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <div className="inline-block px-4 py-2 mb-6 glass-card rounded-full text-sm font-medium">
            🌍 Discover Cameroon • Culture • Nature • Adventure
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-pulse">
            {t('discoverCameroon')}
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <button className="futuristic-button group">
            <span className="mr-2">✈️</span>
            {t('exploreMore')}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="flex items-center space-x-3 px-8 py-4 glass-card rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 group">
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Watch Experience</span>
          </button>
        </div>

        {/* Enhanced Current Slide Info */}
        <div className="animate-slide-up glass-card p-8 rounded-3xl max-w-2xl mx-auto" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center justify-center mb-4">
            <span className="px-3 py-1 bg-cameroon-green-500/20 text-cameroon-green-300 rounded-full text-sm font-medium">
              {slides[currentSlide].category}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-3">{slides[currentSlide].title}</h3>
          <p className="text-xl text-cameroon-yellow-300 mb-4">{slides[currentSlide].subtitle}</p>
          <p className="text-gray-300 mb-6 leading-relaxed">{slides[currentSlide].description}</p>

          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cameroon-blue-400" />
              <span className="text-gray-300">{slides[currentSlide].location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-cameroon-yellow-400 fill-current" />
              <span className="text-gray-300">{slides[currentSlide].rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 p-4 glass-card hover:bg-white/20 transition-all duration-300 z-10 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-4 glass-card hover:bg-white/20 transition-all duration-300 z-10 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide ? 'w-12 h-3' : 'w-3 h-3'
            }`}
          >
            <div className={`w-full h-full rounded-full ${
              index === currentSlide
                ? 'bg-gradient-to-r from-cameroon-green-400 to-cameroon-blue-400 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}></div>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce-gentle"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;