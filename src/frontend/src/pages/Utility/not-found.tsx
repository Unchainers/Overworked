"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";
import { useTheme } from "@/contexts/ThemeProvider";

export default function NotFoundPage() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${theme === "dark" ? "dark bg-[#181818]" : "bg-[#fffffe]"}`}
    >
      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-[#4fc4cf]/20 to-[#994ff3]/20 blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{ left: "10%", top: "20%" }}
        />

        <motion.div
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-[#fbdd74]/20 to-[#4fc4cf]/20 blur-3xl"
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015,
            scale: [1, 0.8, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{ right: "10%", bottom: "20%" }}
        />

        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-3 w-3 rounded-full ${
              i % 3 === 0
                ? "bg-[#4fc4cf]/40"
                : i % 3 === 1
                  ? "bg-[#994ff3]/40"
                  : "bg-[#fbdd74]/40"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 opacity-5 ${theme === "dark" ? "opacity-10" : ""}`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === "dark" ? "#4fc4cf" : "#994ff3"} 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <h1 className="bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-[12rem] font-black leading-none text-transparent md:text-[16rem]">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h2
              className={`mb-4 text-3xl font-bold md:text-5xl ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Oops! Page Not Found
            </h2>
            <p
              className={`text-lg md:text-xl ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"} mx-auto max-w-2xl`}
            >
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, even in Overworked city, sometimes we
              take wrong turns!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="/">
              <Button className="border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] px-8 py-6 text-lg text-[#fffffe] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </a>

            <Button
              variant="outline"
              className={`border-2 px-8 py-6 text-lg ${
                theme === "dark"
                  ? "border-[#4fc4cf] text-[#4fc4cf] hover:bg-[#4fc4cf] hover:text-[#181818]"
                  : "border-[#994ff3] text-[#994ff3] hover:bg-[#994ff3] hover:text-[#fffffe]"
              }`}
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <div
              className={`inline-flex items-center rounded-full px-6 py-3 ${theme === "dark" ? "bg-[#181818]/50" : "bg-[#fffffe]/50"} border backdrop-blur-md ${theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"}`}
            >
              <Search
                className={`mr-2 h-4 w-4 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`}
              />
              <span
                className={`text-sm ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
              >
                Try searching for what you need
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
