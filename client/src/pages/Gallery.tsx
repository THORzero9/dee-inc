import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@shared/schema";
import PhotoCard from "@/components/PhotoCard";
import { Lightbox } from "@/components/ui/lightbox";
import { motion } from "framer-motion";
import { Heart, Camera, MapPin, Calendar } from "lucide-react";

const categoryButtons = [
  { id: "all", label: "All Photos", icon: Camera },
  { id: "dates", label: "Date Nights", icon: Heart },
  { id: "trips", label: "Trips", icon: MapPin },
  { id: "everyday", label: "Everyday", icon: Calendar },
  { id: "special", label: "Special", icon: Heart }
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-muted/30 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10 hidden md:block">
        <Camera className="h-24 w-24 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 hidden md:block">
        <Heart className="h-20 w-20 text-primary" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-3">
            <h2 className="font-heading text-3xl md:text-4xl text-primary">Our Photo Albums</h2>
            <div className="absolute -bottom-2 left-6 right-6 h-2 bg-secondary/30 -z-10 rounded-full"></div>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-foreground/10 max-w-2xl mx-auto shadow-sm">
            <p className="text-foreground/70">
              Our little collection of memories 📸 Click on any photo to see it in full size!
            </p>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categoryButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <motion.button
                key={button.id}
                className={`category-btn ${
                  activeCategory === button.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(button.id)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Icon className="h-4 w-4 mr-2" />
                {button.label}
              </motion.button>
            )}
          )}
        </div>

        {/* Photo Grid */}
        <motion.div 
          className="photo-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <motion.div key={photo.id} variants={item}>
                <PhotoCard photo={photo} onClick={setSelectedPhoto} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-white rounded-xl p-6 border-2 border-dashed border-foreground/10 inline-block">
                <Camera className="h-10 w-10 mx-auto text-primary/40 mb-3" />
                <p className="text-foreground/60 font-heading text-lg">No photos in this category yet!</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Load More Button */}
        {showLoadMore && filteredPhotos.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="relative group"
            >
              <div className={`
                ${isLoading ? "bg-foreground/20" : "bg-white hover:bg-primary/5"} 
                text-foreground font-heading py-3 px-8 rounded-xl transition-all shadow-sm 
                hover:shadow-md border-2 border-dashed border-primary/30
              `}>
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  <span className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    More Memories
                  </span>
                )}
              </div>
              <div className="absolute -top-3 -left-2 transform rotate-12 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                📸
              </div>
              <div className="absolute -bottom-2 -right-1 transform -rotate-6 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                💖
              </div>
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
