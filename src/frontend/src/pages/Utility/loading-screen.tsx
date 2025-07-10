import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoadingPage({ onComplete }: { onComplete: () => void }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingSteps = [
    "Initializing...",
    "Connecting to blockchain...",
    "Loading your identity...",
    "Preparing the city...",
    "Almost ready...",
    "Welcome to Overworked!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      const stepIndex = Math.floor((progress / 100) * loadingSteps.length);
      if (stepIndex < loadingSteps.length) {
        setLoadingText(loadingSteps[stepIndex]);
      }
    }, 100);

    return () => clearInterval(textInterval);
  }, [progress]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "dark bg-[#181818]" : "bg-[#fffffe]"}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Rotating Gradient Orbs */}
        <motion.div
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-[#4fc4cf]/30 to-[#994ff3]/30 blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{ left: "20%", top: "10%" }}
        />

        <motion.div
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-[#fbdd74]/30 to-[#4fc4cf]/30 blur-3xl"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{ right: "20%", bottom: "10%" }}
        />

        {/* Pulsing Dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-2 w-2 rounded-full ${
              i % 3 === 0
                ? "bg-[#4fc4cf]"
                : i % 3 === 1
                  ? "bg-[#994ff3]"
                  : "bg-[#fbdd74]"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Animated Lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${i * 25}%`}
              y1="0%"
              x2={`${i * 25}%`}
              y2="100%"
              stroke={isDark ? "#4fc4cf" : "#994ff3"}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Theme Toggle */}
      <div className="absolute right-6 top-6 z-50">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className={`rounded-full backdrop-blur-md ${isDark ? "bg-[#181818]/20 hover:bg-[#4fc4cf]/20" : "bg-[#fffffe]/20 hover:bg-[#994ff3]/20"}`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-12"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3]">
              <span className="text-3xl font-bold text-[#fffffe]">O</span>
            </div>
            <h1 className="bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Overworked
            </h1>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            {/* Spinning Loader */}
            <div className="relative mx-auto mb-8 h-32 w-32">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] p-1"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className={`h-full w-full rounded-full ${isDark ? "bg-[#181818]" : "bg-[#fffffe]"}`}
                />
              </motion.div>

              <motion.div
                className="absolute inset-4 rounded-full border-4 border-transparent bg-gradient-to-r from-[#fbdd74] to-[#4fc4cf] p-1"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className={`h-full w-full rounded-full ${isDark ? "bg-[#181818]" : "bg-[#fffffe]"}`}
                />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className={`text-2xl font-bold ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className={`mx-auto h-2 w-full max-w-md rounded-full ${isDark ? "bg-[#181818]/50" : "bg-[#fffffe]/50"} border backdrop-blur-md ${isDark ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"} overflow-hidden`}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`text-lg ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
              >
                {loadingText}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 flex justify-center space-x-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-3 w-3 rounded-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-center"
      >
        <p
          className={`text-sm ${isDark ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}
        >
          Preparing your digital workspace...
        </p>
      </motion.div>
    </div>
  );
}
