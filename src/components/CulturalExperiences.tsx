import React, { useState } from 'react';
import { Music, Utensils, Camera, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CulturalExperiences = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dances');

  const experiences = {
    dances: [
      {
        name: 'Makossa Dance',
        region: 'Littoral',
        image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'Traditional dance originating from the coastal regions',
        duration: '2 hours',
        price: '$35'
      },
      {
        name: 'Bikutsi Performance',
        region: 'Centre',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'Energetic traditional dance of the Ewondo people',
        duration: '1.5 hours',
        price: '$30'
      }
    ],
    festivals: [
      {
        name: 'Ngondo Festival',
        region: 'Littoral',
        image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'Annual water festival of the Sawa people',
        duration: '3 days',
        price: '$150'
      },
      {
        name: 'Mount Cameroon Race',
        region: 'Southwest',
        image: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'International mountain racing festival',
        duration: '1 week',
        price: '$200'
      }
    ],
    cuisine: [
      {
        name: 'Ndolé Cooking Class',
        region: 'Centre',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'Learn to cook Cameroons national dish',
        duration: '3 hours',
        price: '$45'
      },
      {
        name: 'Street Food Tour',
        region: 'Douala',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        description: 'Explore local flavors and traditional snacks',
        duration: '4 hours',
        price: '$40'
      }
    ]
  };

  const tabs = [
    { id: 'dances', name: 'Traditional Dances', icon: Music },
    { id: 'festivals', name: 'Festivals', icon: Calendar },
    { id: 'cuisine', name: 'Cuisine', icon: Utensils }
  ];

  return (
    <section id="culture" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cultural Experiences
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Immerse yourself in Cameroon's rich cultural heritage through authentic experiences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 mx-2 mb-4 rounded-full font-medium 
                           transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences[activeTab as keyof typeof experiences].map((experience, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden 
                       hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white font-bold">{experience.price}</span>
                </div>

                {/* Photo Icon */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {experience.name}
                  </h3>
                  <p className="text-sm text-red-500 font-medium">{experience.region}</p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {experience.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Duration: {experience.duration}
                  </span>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white 
                                 rounded-lg font-semibold hover:from-red-600 hover:to-yellow-600 
                                 transform hover:scale-105 transition-all duration-300 shadow-md">
                  Book Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalExperiences;