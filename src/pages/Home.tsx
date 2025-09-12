import React, { useState } from 'react';
import Hero from '../components/Hero';
import InteractiveMap from '../components/InteractiveMap';
import DestinationGrid from '../components/DestinationGrid';
import CulturalExperiences from '../components/CulturalExperiences';
import BookingSection from '../components/BookingSection';
import EventsSection from '../components/EventsSection';
import RecommendationEngine from '../components/RecommendationEngine';

const Home: React.FC = () => {
  // Sample user preferences for recommendations
  const [userPreferences] = useState(['nature', 'adventure', 'culture']);

  return (
    <main>
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Cameroon's Beauty
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the diverse landscapes, cultures, and attractions of Cameroon with our interactive map
          </p>
        </div>
        
        <InteractiveMap height="600px" />
      </section>
      
      <DestinationGrid />
      <CulturalExperiences />
      <BookingSection />
      <EventsSection />
      
      <section className="container mx-auto px-4">
        <RecommendationEngine userPreferences={userPreferences} limit={4} />
      </section>
    </main>
  );
};

export default Home;
