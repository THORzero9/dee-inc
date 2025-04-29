import { Photo } from "@shared/schema";
import { useState } from "react";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className="photo-card bg-white rounded-xl overflow-hidden shadow-md cursor-pointer" 
      data-category={photo.category}
      onClick={() => onClick(photo)}
    >
      <div className="relative pb-[75%]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-light">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{photo.title}</h3>
        <p className="text-neutral-dark/70 text-sm">{photo.date}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
