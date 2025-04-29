import { Link, useLocation } from "wouter";
import { Heart } from "lucide-react";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-card/70 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b-2 border-primary/20">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center transform -rotate-6">
                <Heart className="h-5 w-5 text-primary fill-primary" />
              </div>
              <h1 className="font-script text-3xl md:text-4xl text-primary cursor-pointer relative">
                Our Story
                <span className="absolute -bottom-1 left-1 right-1 h-1 bg-secondary/30 rounded-full"></span>
              </h1>
            </div>
          </Link>
        </div>
        <nav className="mt-4 w-full md:mt-0 md:w-auto relative z-10">
          <ul className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-3 space-y-2 md:space-y-0">
            <li>
              <Link 
                href="/"
                className={`block md:inline-block px-3 py-1 rounded-full ${
                  location === "/" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted text-foreground/80 hover:text-primary"
                } transition-all font-heading text-lg`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/gallery"
                className={`block md:inline-block px-3 py-1 rounded-full ${
                  location === "/gallery" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted text-foreground/80 hover:text-primary"
                } transition-all font-heading text-lg`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link 
                href="/moments"
                className={`block md:inline-block px-3 py-1 rounded-full ${
                  location === "/moments" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted text-foreground/80 hover:text-primary"
                } transition-all font-heading text-lg`}
              >
                Special Moments
              </Link>
            </li>
            <li>
              <Link 
                href="/surprise"
                className={`block md:inline-block px-3 py-1 rounded-full ${
                  location === "/surprise" 
                  ? "bg-secondary/20 text-secondary-foreground font-bold" 
                  : "bg-secondary/10 text-secondary-foreground/80 hover:bg-secondary/20"
                } transition-all font-heading text-lg`}
              >
                ✨ Birthday Surprise
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
