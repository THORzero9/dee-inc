import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-neutral-light shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="font-script text-3xl md:text-4xl text-primary cursor-pointer">
              Our Story
            </h1>
          </Link>
        </div>
        <nav className="mt-4 w-full md:mt-0 md:w-auto">
          <ul className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-6 space-y-2 md:space-y-0">
            <li>
              <Link href="/">
                <a
                  className={`block md:inline-block px-4 py-2 ${
                    location === "/" 
                    ? "text-primary font-medium" 
                    : "text-neutral-dark hover:text-primary"
                  } transition-colors`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/gallery">
                <a
                  className={`block md:inline-block px-4 py-2 ${
                    location === "/gallery" 
                    ? "text-primary font-medium" 
                    : "text-neutral-dark hover:text-primary"
                  } transition-colors`}
                >
                  Gallery
                </a>
              </Link>
            </li>
            <li>
              <Link href="/moments">
                <a
                  className={`block md:inline-block px-4 py-2 ${
                    location === "/moments" 
                    ? "text-primary font-medium" 
                    : "text-neutral-dark hover:text-primary"
                  } transition-colors`}
                >
                  Special Moments
                </a>
              </Link>
            </li>
            <li>
              <Link href="/surprise">
                <a
                  className={`block md:inline-block px-4 py-2 ${
                    location === "/surprise" 
                    ? "font-bold text-primary" 
                    : "font-bold text-primary hover:text-accent"
                  } transition-colors`}
                >
                  Birthday Surprise
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
