import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComicPanel from "@/components/ComicPanel";
import { Gift, Download, Heart, Sparkles, Cake } from "lucide-react";
import comicStripImage from "@/assets/comic-strip.jpeg";

const Surprise = () => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleDownload = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = comicStripImage;
    link.download = 'our-comic-strip.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="surprise" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Cake className="h-20 w-20 text-primary" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Heart className="h-20 w-20 text-primary" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block mb-3">
            <h2 className="font-heading text-3xl md:text-4xl text-primary">Birthday Surprise</h2>
            <div className="absolute -bottom-2 left-4 right-4 h-2 bg-secondary/30 -z-10 rounded-full"></div>
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A special gift I created just for you with all my heart! ✨
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className={`bg-white rounded-2xl shadow-md p-6 md:p-8 text-center comic-reveal border-2 border-dashed ${
              revealed ? "border-primary/30 revealed" : "border-secondary/30"
            } relative`}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: revealed ? [0.9, 1] : 1,
              opacity: revealed ? [0, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative paper clips */}
            <div className="absolute -top-3 left-10 w-6 h-10 bg-primary/80 rounded-t-md"></div>
            <div className="absolute -top-3 right-10 w-6 h-10 bg-secondary/80 rounded-t-md"></div>
            
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="beforeReveal"
                  className="py-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full animate-pulse-slow"></div>
                    <div
                      className="absolute inset-4 bg-secondary/30 rounded-full animate-pulse-slow"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div className="absolute inset-8 bg-secondary/40 rounded-full animate-pulse-slow"
                      style={{ animationDelay: "0.6s" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="h-14 w-14 text-primary animate-float" />
                    </div>
                    
                    {/* Decorative sparkles */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute animate-sparkle" 
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-accent" />
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-heading text-2xl mb-3 text-primary">Your Special Surprise Awaits</h3>
                  <div className="bg-secondary/10 border border-dashed border-secondary/30 p-3 rounded-xl mb-6 max-w-md mx-auto">
                    <p className="text-foreground/70">
                      I've made something super special just for your birthday! It's a little comic about us. Ready to see it? 🎂
                    </p>
                  </div>
                  
                  <button
                    onClick={handleReveal}
                    className="bg-primary hover:bg-primary/90 text-white font-heading py-3 px-8 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-105 hover:-translate-y-1 text-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10">Open My Gift! 🎁</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="afterReveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative inline-block mb-6">
                    <h3 className="font-script text-4xl text-primary">Happy Birthday, Love!</h3>
                    <div className="absolute -bottom-2 left-10 right-10 h-1 bg-primary/20 rounded-full"></div>
                  </div>
                  
                  <div className="bg-primary/5 border border-dashed border-primary/20 p-3 rounded-xl mb-8 max-w-lg mx-auto">
                    <p className="text-foreground/80">
                      I made this little comic strip just for you, inspired by all our adorable moments together! Hope it makes you smile as much as you make me smile every day! 💕
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border-2 border-foreground/10 shadow-md">
                    {/* Your custom comic strip */}
                    <div className="relative">
                      {/* Decorative tape corners */}
                      <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary/30 rotate-45 opacity-70"></div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-secondary/30 rotate-45 opacity-70"></div>
                      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-accent/30 rotate-45 opacity-70"></div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary/30 rotate-45 opacity-70"></div>
                      
                      {/* Comic image with a slight rotation for a hand-placed feel */}
                      <div className="transform rotate-[0.5deg] transition-transform hover:rotate-0 duration-500">
                        <img 
                          src={comicStripImage} 
                          alt="Our Comic Strip Journey" 
                          className="w-full h-auto rounded-md shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative inline-block mb-6">
                      <p className="font-script text-3xl text-primary animate-wiggle">I love you so much! ❤️</p>
                      <div className="absolute -bottom-1 left-4 right-4 h-1 bg-primary/20 rounded-full"></div>
                    </div>
                    
                    <button
                      onClick={handleDownload}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center mx-auto gap-2 mt-4"
                    >
                      <Download className="h-5 w-5" />
                      Download Our Comic
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Surprise;
