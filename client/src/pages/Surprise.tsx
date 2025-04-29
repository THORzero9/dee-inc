import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComicPanel from "@/components/ComicPanel";
import { Gift, Download } from "lucide-react";

const Surprise = () => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleDownload = () => {
    // In a real app, this would download the comic strip
    alert("Your comic strip would download here in a real implementation!");
  };

  return (
    <section id="surprise" className="py-16 md:py-24 bg-gradient-to-b from-neutral-light to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl mb-3">Birthday Surprise</h2>
          <p className="text-neutral-dark/70 max-w-2xl mx-auto">
            A special gift I created just for you. Click the button below to reveal your birthday surprise!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className={`bg-white rounded-xl shadow-xl p-6 md:p-10 text-center comic-reveal ${
              revealed ? "revealed" : ""
            }`}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: revealed ? [0.9, 1] : 1,
              opacity: revealed ? [0, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="beforeReveal"
                  className="py-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-28 h-28 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-secondary/30 rounded-full animate-pulse-slow"></div>
                    <div
                      className="absolute inset-3 bg-secondary/50 rounded-full animate-pulse-slow"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl mb-4">Your Special Surprise Awaits</h3>
                  <p className="text-neutral-dark/70 mb-8 max-w-md mx-auto">
                    I've created something special just for your birthday. Are you ready to see it?
                  </p>
                  <button
                    onClick={handleReveal}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Reveal My Surprise!
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="afterReveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="font-script text-3xl mb-6 text-primary">Happy Birthday, Love!</h3>
                  <p className="text-neutral-dark/70 mb-8 max-w-lg mx-auto">
                    I created this comic strip especially for you, inspired by all our special moments together.
                  </p>

                  <div className="max-w-2xl mx-auto bg-neutral-light/50 p-4 rounded-xl">
                    {/* Comic Strip Panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <ComicPanel
                        title="Panel 1: How We Met"
                        color="accent"
                        description="Remember when you spilled coffee on my laptop? I was annoyed until I saw your smile..."
                      />
                      <ComicPanel
                        title="Panel 2: First Date"
                        color="primary"
                        description="That Italian restaurant where we talked until they had to ask us to leave because they were closing..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ComicPanel
                        title="Panel 3: Our Adventures"
                        color="secondary"
                        description="All our trips and adventures, from getting lost hiking to that impromptu road trip..."
                      />
                      <ComicPanel
                        title="Panel 4: Happy Birthday!"
                        color="accent"
                        description="Here's to another year of love, laughter, and creating beautiful memories together!"
                      />
                    </div>
                  </div>

                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="font-script text-2xl text-primary mb-4">I love you!</p>
                    <button
                      onClick={handleDownload}
                      className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center mx-auto gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Comic Strip
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
