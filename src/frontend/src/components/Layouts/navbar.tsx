"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";
import { useMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "how-it-works",
        "features",
        "why-overworked",
        "tokenomics",
        "team",
        "testimonials",
        "faq",
        "community",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/overville", label: "Overville" },
    { href: "/landing", label: "Landing" },
    { href: "/world-brain", label: "World Brain" },
    { href: "/town-talk", label: "TownTalk" },
    { href: "/grind-arena", label: "GrindArena" },
    { href: "/work-bay", label: "WorkBay" },
    { href: "/features", label: "All Features" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        theme === "dark" ? "bg-[#181818]/90" : "bg-[#fffffe]/90"
      } border-b backdrop-blur-md ${theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <a href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3]">
                <span className="text-lg font-bold text-[#fffffe]">O</span>
              </div>
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-2xl font-bold text-transparent">
                Overworked
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-sm font-medium transition-colors hover:text-[#4fc4cf] ${
                  theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={`rounded-full ${theme === "dark" ? "hover:bg-[#4fc4cf]/20" : "hover:bg-[#994ff3]/20"}`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              className="hidden border-2 border-[#994ff3] bg-transparent text-[#994ff3] transition-all duration-300 hover:bg-[#994ff3]/10 hover:text-[#994ff3] md:flex"
              onClick={() => navigate("/overville")}
            >
              0 CRY Tokens
            </Button>

            <Button
              className="hidden border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] text-[#fffffe] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 md:flex"
              onClick={() => navigate("/overville")}
            >
              Launch App
            </Button>

            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              {isMenuOpen ? (
                theme === "dark" ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <X className="h-5 w-5" />
                )
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${
              theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"
            } border-t ${theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"}`}
          >
            <div className="container mx-auto space-y-4 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors hover:text-[#4fc4cf] ${
                    theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="w-full border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] text-[#fffffe] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80"
                onClick={() => navigate("/overville")}
              >
                Launch App
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
