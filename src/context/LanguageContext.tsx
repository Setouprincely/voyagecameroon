import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    destinations: 'Destinations',
    culture: 'Culture',
    events: 'Events',
    bookNow: 'Book Now',
    exploreMore: 'Explore More',
    discoverCameroon: 'Discover Cameroon',
    heroSubtitle: 'From misty mountains to pristine beaches, vibrant cultures to exotic wildlife',
    mountainsTitle: 'Mystical Mountains',
    beachesTitle: 'Pristine Beaches',
    wildlifeTitle: 'Exotic Wildlife',
    cultureTitle: 'Rich Culture'
  },
  fr: {
    home: 'Accueil',
    destinations: 'Destinations',
    culture: 'Culture',
    events: 'Événements',
    bookNow: 'Réserver',
    exploreMore: 'Explorer Plus',
    discoverCameroon: 'Découvrir le Cameroun',
    heroSubtitle: 'Des montagnes brumeuses aux plages immaculées, cultures vibrantes à la faune exotique',
    mountainsTitle: 'Montagnes Mystiques',
    beachesTitle: 'Plages Immaculées',
    wildlifeTitle: 'Faune Exotique',
    cultureTitle: 'Culture Riche'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};