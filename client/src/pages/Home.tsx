import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, Calendar, Camera, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface Photo {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  date: string;
}

const Home = () => {
  const [stats, setStats] = useState({
    adventures: "3",
    dateNights: "1",
  });

  // Calculate days since March 2, 2022
  const calculateDaysSince = () => {
    const startDate = new Date(2022, 2, 2); // Month is 0-indexed, so 2 = March
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
  };
  
  // Fetch photo data for stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/photos");
        if (response.ok) {
          const photos = await response.json() as Photo[];
          
          // Count adventures (trips category)
          const adventures = photos.filter((photo: Photo) => photo.category === "trips").length;
          
          // Count date nights (dates category)
          const dateNights = photos.filter((photo: Photo) => photo.category === "dates").length;
          
          setStats({
            adventures: adventures.toString(),
            dateNights: dateNights.toString()
          });
        }
      } catch (error) {
        console.error("Error fetching photo stats:", error);
      }
    }
    
    fetchStats();
  }, []);
  return (
    <section id="home" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main intro card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-primary/10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-3 right-12 transform rotate-12 text-2xl">💕</div>
            <div className="absolute -top-3 left-12 transform -rotate-6 text-2xl">✨</div>
            
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img 
                  src="https://storage.googleapis.com/deegallery-images/IMG_20221106_145904.webp" 
                  alt="our-homepage-image" 
                  className="w-full h-64 md:h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                
                {/* Overlayed polaroid style frame */}
                <div className="absolute bottom-4 left-4 bg-white p-1 shadow-md transform rotate-[-6deg] w-24 h-32">
                  <div className="w-full h-full border border-dashed border-foreground/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary fill-primary/30" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 md:w-1/2">
                <h2 className="font-heading text-3xl md:text-4xl mb-3 text-primary">Hey there! 👋</h2>
                <div className="bg-secondary/10 border border-dashed border-secondary/30 p-3 rounded-xl mb-4">
                  <p className="text-md leading-relaxed text-foreground/80">
                    Welcome to our little corner of the internet where we collect all our favorite memories together. Think of it as our digital scrapbook filled with love, laughter, and silly moments! 💖
                  </p>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary p-0.5 bg-gray-100 flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="w-10 h-10 text-primary/40"
                      stroke="currentColor" 
                      strokeWidth="1"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="text-foreground/80">
                    <p className="font-medium">Made with love by</p>
                    <p className="font-script text-2xl text-primary">Bhaswat</p>
                  </div>
                </div>
                
                <Link 
                  href="/gallery"
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-heading py-3 px-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:translate-y-[-2px] text-lg"
                >
                  ✨ See Our Photos
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Stats section */}
          <motion.div 
            className="mt-16 md:mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative inline-block">
              <h3 className="font-heading text-2xl md:text-3xl mb-2">Our Journey So Far</h3>
              <div className="absolute -bottom-2 left-4 right-4 h-2 bg-secondary/30 -z-10 rounded-full"></div>
            </div>
            <p className="text-foreground/70 mb-10 max-w-lg mx-auto">Here's a little peek at our adventure together (and counting...)</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, value: calculateDaysSince(), label: "Days Together", color: "primary" },
                { icon: MapPin, value: stats.adventures, label: "Adventures", color: "accent" },
                { icon: Heart, value: stats.dateNights, label: "Date Nights", color: "secondary" },
                { icon: Camera, value: "∞", label: "Memories", color: "primary" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm border-2 border-dashed border-foreground/10 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`absolute -left-6 -top-6 w-16 h-16 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                  </div>
                  <p className={`font-heading text-4xl text-${stat.color}`}>{stat.value}</p>
                  <p className="font-medium text-foreground/70 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
