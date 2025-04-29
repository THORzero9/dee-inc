import { Photo } from "@shared/schema";
import { useState } from "react";
import { Calendar, Heart } from "lucide-react";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Random slight rotation for each card
  const randomRotation = Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);

  return (
    <div 
      className={`photo-card bg-white overflow-hidden shadow-sm cursor-pointer transform transition-all duration-300`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      data-category={photo.category}
      onClick={() => onClick(photo)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[75%]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={photo.url} 
          alt={photo.title} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        
        {/* Category badge */}
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-lg shadow-sm text-xs font-heading">
          {photo.category === 'dates' ? '❤️ Date' : 
           photo.category === 'trips' ? '✈️ Trip' : 
           photo.category === 'everyday' ? '☕ Everyday' : '🎉 Special'}
        </div>
        
        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
              <Heart className="h-6 w-6 text-primary fill-primary/50" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-heading text-xl">{photo.title}</h3>
        <div className="flex items-center mt-2 text-foreground/60">
          <Calendar className="h-4 w-4 mr-1" />
          <p className="text-sm">{photo.date}</p>
        </div>
      </div>
      
      {/* Decorative tape */}
      <div className="absolute -top-1 left-[10%] w-[30%] h-5 bg-accent/50 transform -rotate-12 rounded"></div>
    </div>
  );
};

export default PhotoCard;
