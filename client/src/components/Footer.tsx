import { Mail, Heart, Camera, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary/10 border-t-2 border-dashed border-primary/30 text-foreground py-8 relative">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <h2 className="font-script text-3xl text-primary mb-1">Our Story</h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary/30 rounded-full"></div>
          </div>
          
          <p className="mb-6 max-w-lg mx-auto text-foreground/70 font-body">
            A cozy collection of our favorite memories, handcrafted with love ❤️
          </p>
          
          <div className="flex justify-center space-x-5 mb-6">
            {[Mail, Camera, Calendar, Heart].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-white p-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                onClick={(e) => e.preventDefault()}
              >
                <Icon className={`h-5 w-5 ${index === 0 ? 'text-accent' : index === 1 ? 'text-secondary' : index === 2 ? 'text-primary/70' : 'text-primary fill-primary'}`} />
              </a>
            ))}
          </div>
          
          <div className="relative w-fit mx-auto">
            <p className="font-heading text-sm bg-white px-4 py-1 rounded-full shadow-sm border border-primary/10">
              &copy; {new Date().getFullYear()} Our Story | Made with ♥
            </p>
            <div className="absolute -top-2 right-4 transform rotate-12 text-xs">✨</div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute -top-4 left-10 transform rotate-12 text-2xl">💖</div>
      <div className="hidden md:block absolute -top-4 right-20 transform -rotate-6 text-2xl">💕</div>
    </footer>
  );
};

export default Footer;
