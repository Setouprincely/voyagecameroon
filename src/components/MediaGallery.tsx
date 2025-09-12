import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  initialIndex?: number;
  onClose?: () => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentItem = items[currentIndex];
  const totalItems = items.length;
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleFullscreen = () => {
    const galleryElement = document.getElementById('media-gallery');
    
    if (!isFullscreen) {
      if (galleryElement?.requestFullscreen) {
        galleryElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div 
      id="media-gallery" 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center"
    >
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      
      {/* Main content */}
      <div className="relative w-full max-w-6xl h-[70vh] flex justify-center items-center">
        {/* Navigation arrows */}
        <button 
          className="absolute left-2 bg-black/50 rounded-full p-3 text-white hover:bg-black/70 z-10"
          onClick={handlePrevious}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          className="absolute right-2 bg-black/50 rounded-full p-3 text-white hover:bg-black/70 z-10"
          onClick={handleNext}
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Media display */}
        <div className="w-full h-full flex items-center justify-center">
          {currentItem.type === 'image' ? (
            <img 
              src={currentItem.url} 
              alt={currentItem.title || `Image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="relative w-full h-full max-w-4xl">
              <video
                src={currentItem.url}
                poster={currentItem.thumbnail}
                controls={isPlaying}
                autoPlay={isPlaying}
                className="w-full h-full object-contain"
              />
              
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Play size={36} className="text-white ml-2" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {currentItem.type === 'video' && (
            <button 
              className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          )}
          
          <button 
            className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
            onClick={toggleFullscreen}
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
      
      {/* Title and counter */}
      <div className="text-white mt-4 mb-2 text-center">
        <h3 className="text-lg font-medium">{currentItem.title}</h3>
        <p className="text-sm text-gray-300">{currentIndex + 1} / {totalItems}</p>
      </div>
      
      {/* Thumbnails */}
      <div className="flex overflow-x-auto space-x-2 py-2 px-4 max-w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-20 h-12 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
              index === currentIndex ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={item.thumbnail || item.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
