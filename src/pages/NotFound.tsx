import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center p-8 bg-card rounded-3xl border border-border/50 shadow-card animate-fade-in">
        <h1 className="mb-4 text-6xl font-extrabold text-gradient">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          {language === 'hi' ? "ओह! पृष्ठ नहीं मिला" : "Oops! Page not found"}
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          {language === 'hi' ? "मुख्य पृष्ठ पर वापस जाएं" : "Return to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
