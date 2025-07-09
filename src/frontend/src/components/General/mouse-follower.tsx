"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      >
        <div className="h-full w-full rounded-full bg-white opacity-50"></div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-white"
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
