import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@shared/schema";
import PhotoCard from "@/components/PhotoCard";
import { Lightbox } from "@/components/ui/lightbox";
import { motion } from "framer-motion";

const categoryButtons = [
  { id: "all", label: "All Photos" },
  { id: "dates", label: "Date Nights" },
  { id: "trips", label: "Trips" },
  { id: "everyday", label: "Everyday Moments" },
  { id: "special", label: "Special Occasions" }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  
  const { data: photos = [] } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter(photo => photo.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // In a real app, this would fetch more photos
    setTimeout(() => {
      setIsLoading(false);
      setShowLoadMore(false);
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-neutral-light/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-3">Our Photo Gallery</h2>
          <p className="text-neutral-dark/70 max-w-2xl mx-auto">
            All of our favorite moments captured in time. Click on any photo to see it in full size.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryButtons.map((button) => (
            <button
              key={button.id}
              className={`category-btn ${
                activeCategory === button.id ? "active" : "bg-white hover:bg-primary hover:text-white"
              } px-4 py-2 rounded-lg shadow-sm transition-colors`}
              onClick={() => handleCategoryChange(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div 
          className="photo-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPhotos.map((photo) => (
            <motion.div key={photo.id} variants={item}>
              <PhotoCard photo={photo} onClick={setSelectedPhoto} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-neutral-dark/50" : "bg-accent hover:bg-accent/90"
              } text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Load More Photos"
              )}
            </button>
          </div>
        )}

        {/* Lightbox for Photo Viewing */}
        <Lightbox
          open={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          image={selectedPhoto?.url || ""}
          alt={selectedPhoto?.title || ""}
        />
      </div>
    </section>
  );
};

export default Gallery;
