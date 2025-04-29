import { Mail, DollarSign, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-script text-3xl text-primary mb-4">Our Story</h2>
          <p className="mb-6 max-w-lg mx-auto text-white/80">
            A digital collection of our precious moments, created with love.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="#"
              className="text-white/60 hover:text-primary transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-primary transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <DollarSign className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-primary transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-6 w-6" />
            </a>
          </div>
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Our Story | Created with love
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
