import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Camera, MapPin } from 'lucide-react';

// You need to replace this with your actual Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface Destination {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  category: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 'mount-cameroon',
    name: 'Mount Cameroon',
    coordinates: [9.1708, 4.2032],
    description: 'West Africa\'s highest peak and one of Africa\'s largest volcanoes',
    category: 'nature',
    image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg'
  },
  {
    id: 'kribi-beaches',
    name: 'Kribi Beaches',
    coordinates: [9.9087, 2.9380],
    description: 'Beautiful beaches with pristine waters and golden sands',
    category: 'beach',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg'
  },
  {
    id: 'waza-park',
    name: 'Waza National Park',
    coordinates: [14.7250, 11.0000],
    description: 'Home to elephants, giraffes, lions, and many other species',
    category: 'wildlife',
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg'
  },
  {
    id: 'limbe',
    name: 'Limbe Wildlife Center',
    coordinates: [9.1950, 4.0215],
    description: 'Conservation center for rescued primates and other wildlife',
    category: 'wildlife',
    image: 'https://images.pexels.com/photos/4363227/pexels-photo-4363227.jpeg'
  },
  {
    id: 'douala',
    name: 'Douala',
    coordinates: [9.7678, 4.0510],
    description: 'The largest city and economic capital of Cameroon',
    category: 'urban',
    image: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg'
  },
  {
    id: 'yaounde',
    name: 'Yaoundé',
    coordinates: [11.5174, 3.8721],
    description: 'The capital city of Cameroon with rich cultural heritage',
    category: 'urban',
    image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg'
  },
  {
    id: 'korup',
    name: 'Korup National Park',
    coordinates: [8.8333, 5.3333],
    description: 'One of Africa\'s oldest and richest rainforests',
    category: 'nature',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg'
  },
  {
    id: 'dja',
    name: 'Dja Faunal Reserve',
    coordinates: [13.4500, 3.1667],
    description: 'UNESCO World Heritage site with pristine rainforest',
    category: 'nature',
    image: 'https://images.pexels.com/photos/5207226/pexels-photo-5207226.jpeg'
  }
];

const categories = [
  { id: 'all', name: 'All Destinations', color: '#6366F1' },
  { id: 'nature', name: 'Nature', color: '#10B981' },
  { id: 'beach', name: 'Beaches', color: '#FBBF24' },
  { id: 'wildlife', name: 'Wildlife', color: '#EF4444' },
  { id: 'urban', name: 'Cities', color: '#8B5CF6' },
];

interface InteractiveMapProps {
  height?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ height = '500px' }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [is360View, setIs360View] = useState<boolean>(false);

  // Define addMarkers function outside useEffect to avoid dependency issues
  const addMarkers = () => {
    if (!map.current) return;
    
    const filteredDestinations = activeCategory === 'all'
      ? destinations
      : destinations.filter(dest => dest.category === activeCategory);
    
    filteredDestinations.forEach(destination => {
      const category = categories.find(cat => cat.id === destination.category) || categories[0];
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-container';
      markerElement.innerHTML = `
        <div class="marker-pin" style="background-color: ${category.color}">
          <div class="marker-icon">📍</div>
        </div>
      `;
      
      markerElement.addEventListener('click', () => {
        setSelectedDestination(destination);
        
        // Fly to the location
        map.current?.flyTo({
          center: destination.coordinates,
          zoom: 12,
          essential: true
        });
      });
      
      // Add the marker to the map
      new mapboxgl.Marker(markerElement)
        .setLngLat(destination.coordinates)
        .addTo(map.current!);
    });
  };
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [12.3547, 7.3697], // Center of Cameroon
        zoom: 5.5
      });
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        // Add markers
        addMarkers();
      });
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Update markers when category changes
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;
    
    // Remove existing markers
    const markers = document.querySelectorAll('.marker-container');
    markers.forEach(marker => marker.remove());
    
    // Add filtered markers
    addMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedDestination(null);
    
    // Reset map view when changing categories
    if (map.current) {
      map.current.flyTo({
        center: [12.3547, 7.3697], // Center of Cameroon
        zoom: 5.5,
        essential: true
      });
    }
  };
  
  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-center overflow-x-auto py-2 space-x-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                      ${activeCategory === category.id 
                        ? 'bg-cameroon-gradient text-white shadow-md transform scale-105' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow'
                      }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
        {is360View && selectedDestination ? (
          <div className="relative" style={{ height }}>
            {/* This would be replaced with an actual 360 viewer */}
            <iframe 
              src={`https://www.google.com/maps/embed?pb=!4v1632145790000!6m8!1m7!1sCAoSLEFGMVFpcFBwTWcyakQ0YkFsV01IMUFEZ1MzV2NtV0d0MzZMYkgzSEJCMzNN!2m2!1d${selectedDestination.coordinates[1]}!2d${selectedDestination.coordinates[0]}!3f0!4f0!5f0.7`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title={`360 view of ${selectedDestination.name}`}
            />
            <button 
              onClick={() => setIs360View(false)}
              className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
            >
              <MapPin className="h-6 w-6 text-cameroon-red-500" />
            </button>
          </div>
        ) : (
          <div ref={mapContainer} style={{ height }} />
        )}
      </div>
      
      {selectedDestination && !is360View && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-start space-x-4">
            <img 
              src={selectedDestination.image} 
              alt={selectedDestination.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedDestination.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{selectedDestination.description}</p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIs360View(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-cameroon-gradient hover:bg-gradient-to-br text-white text-sm rounded-lg"
                >
                  <Camera className="h-4 w-4" />
                  <span>View 360°</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 border border-cameroon-green-500 text-cameroon-green-600 dark:text-cameroon-green-400 text-sm rounded-lg">
                  <span>More Info</span>
                </button>
              </div>
            </div>
            <button 
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .marker-container {
          cursor: pointer;
        }
        
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          background: #c30b82;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: -38px 0 0 -18px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          animation: bounce 0.5s ease-out;
        }
        
        .marker-pin:after {
          content: '';
          width: 22px;
          height: 22px;
          margin: 3px 0 0 3px;
          background: white;
          border-radius: 50%;
        }
        
        .marker-icon {
          transform: rotate(45deg);
          position: absolute;
          font-size: 14px;
        }
        
        @keyframes bounce {
          0% {
            transform: translateY(-10px) rotate(-45deg);
          }
          100% {
            transform: translateY(0) rotate(-45deg);
          }
        }
      `}} />
    </div>
  );
};

export default InteractiveMap;
