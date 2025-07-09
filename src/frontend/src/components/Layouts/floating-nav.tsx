"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.div
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-full border border-zinc-700/50 bg-zinc-800/80 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-50 blur"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              <a href="/" className="text-lg font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Shine
                </span>
                <span className="text-white">KKA</span>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              <a href="/" className="mr-4 text-lg font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Shine
                </span>
                <span className="text-white">KKA</span>
              </a>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  onClick={handleNavClick}
                >
                  {item.name}
                </a>
              ))}
              <Button
                size="sm"
                className="ml-2 border-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
              >
                Resume
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-full flex-col items-center justify-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-8 py-4 text-2xl font-medium text-white transition-colors hover:text-purple-400"
                onClick={handleNavClick}
              >
                {item.name}
              </a>
            ))}
            <Button className="mt-6 border-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500">
              Resume
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
