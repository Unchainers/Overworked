import { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-colors hover:bg-blue-700"
      >
        <ArrowUpCircle className="h-6 w-6" />
      </button>
    )
  );
};

export default ScrollToTopButton;
