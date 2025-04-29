import { Link } from "wouter";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section id="home" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1623619984836-9d218833dcbb?auto=format&fit=crop&w=800&q=80" 
                  alt="Cozy home interior with warm lighting and comfortable furniture" 
                  className="w-full h-64 md:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-10 md:w-1/2">
                <h2 className="font-heading text-3xl md:text-4xl mb-4 text-neutral-dark">Welcome to Our Journey</h2>
                <p className="text-lg mb-6 text-neutral-dark/80">
                  This is where we collect and cherish all our special moments together. A digital memory box of our adventures, laughter, and love.
                </p>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                      alt="Profile picture" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-neutral-dark/80">
                    <p className="font-medium">Created with love by</p>
                    <p className="font-script text-lg text-primary">Your Name</p>
                  </div>
                </div>
                <Link href="/gallery">
                  <a className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Explore Our Photos
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 md:mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl mb-2">Our Story in Numbers</h3>
            <p className="text-neutral-dark/70 mb-10">A little summary of our journey so far</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl text-primary">365</p>
                <p className="text-neutral-dark/80 mt-2">Days Together</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl text-accent">12</p>
                <p className="text-neutral-dark/80 mt-2">Adventures</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl text-secondary">42</p>
                <p className="text-neutral-dark/80 mt-2">Date Nights</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl text-primary">∞</p>
                <p className="text-neutral-dark/80 mt-2">Memories</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
