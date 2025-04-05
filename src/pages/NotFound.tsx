
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FilmIcon, HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="relative inline-block mx-auto">
            <FilmIcon className="w-24 h-24 text-muted-foreground/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">404</span>
            </div>
          </div>
          
          <h1 className="heading-lg">Page Not Found</h1>
          
          <p className="body-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to exploring movie preferences.
          </p>
          
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 gap-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm"
            >
              <HomeIcon className="w-5 h-5" />
              Return Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
