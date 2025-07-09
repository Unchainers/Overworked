"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  Bell,
  Calendar,
  Rocket,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoonPage() {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (example: 3 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "dark bg-[#181818]" : "bg-[#fffffe]"}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-[#4fc4cf]/10 to-[#994ff3]/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ left: "-10%", top: "10%" }}
        />

        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#fbdd74]/10 to-[#4fc4cf]/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ right: "-10%", bottom: "10%" }}
        />

        {/* Floating Geometric Shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 4 === 0
                ? "h-4 w-4 rounded-full"
                : i % 4 === 1
                  ? "h-3 w-3 rotate-45"
                  : i % 4 === 2
                    ? "h-1 w-5 rounded-full"
                    : "h-6 w-2 rounded-full"
            } ${i % 3 === 0 ? "bg-[#4fc4cf]/30" : i % 3 === 1 ? "bg-[#994ff3]/30" : "bg-[#fbdd74]/30"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 opacity-5 ${isDark ? "opacity-10" : ""}`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${isDark ? "#4fc4cf" : "#994ff3"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#4fc4cf" : "#994ff3"} 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
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
        <div className="mx-auto max-w-6xl text-center">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3]">
              <span className="text-2xl font-bold text-[#fffffe]">O</span>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-5xl font-black text-transparent md:text-7xl">
              Overworked
            </h1>
            <p
              className={`text-xl font-medium md:text-2xl ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              Digital On-Chain City
            </p>
          </motion.div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2
              className={`mb-6 text-3xl font-bold md:text-5xl ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Something Amazing is{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h2>
            <p
              className={`mx-auto max-w-3xl text-lg md:text-xl ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              We're building the future of digital work and communities. Get
              ready to enter a world where creators, thinkers, and workers unite
              to build influence and earn CRY tokens.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <Card
                  key={index}
                  className={`${isDark ? "border-[#4fc4cf]/20 bg-[#181818]/50" : "border-[#994ff3]/20 bg-[#fffffe]/50"} backdrop-blur-md`}
                >
                  <CardContent className="p-6 text-center">
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mb-2 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
                    >
                      {item.value.toString().padStart(2, "0")}
                    </motion.div>
                    <div
                      className={`text-sm font-medium ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
                    >
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h3
              className={`mb-8 text-2xl font-bold ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              What's Coming
            </h3>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {[
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: "NFT Identity System",
                  description: "Your unique digital identity as an NFT",
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "CRY Token Economy",
                  description:
                    "Earn tokens for your hard work and contributions",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Community Governance",
                  description: "Shape the future through democratic voting",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                >
                  <Card
                    className={`h-full ${isDark ? "border-[#4fc4cf]/20 bg-[#181818]/30" : "border-[#994ff3]/20 bg-[#fffffe]/30"} backdrop-blur-md transition-colors hover:border-[#4fc4cf]`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] text-[#fffffe]">
                        {feature.icon}
                      </div>
                      <h4
                        className={`mb-2 text-lg font-bold ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
                      >
                        {feature.title}
                      </h4>
                      <p
                        className={`text-sm ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
                      >
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Email Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-8"
          >
            <Card
              className={`mx-auto max-w-md ${isDark ? "border-[#4fc4cf]/20 bg-[#181818]/50" : "border-[#994ff3]/20 bg-[#fffffe]/50"} backdrop-blur-md`}
            >
              <CardContent className="p-6">
                {!isSubscribed ? (
                  <>
                    <div className="mb-4 flex items-center justify-center">
                      <Bell
                        className={`mr-2 h-6 w-6 ${isDark ? "text-[#4fc4cf]" : "text-[#994ff3]"}`}
                      />
                      <h3
                        className={`text-lg font-bold ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
                      >
                        Get Notified
                      </h3>
                    </div>
                    <p
                      className={`mb-4 text-sm ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
                    >
                      Be the first to know when we launch!
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${isDark ? "border-[#4fc4cf]/20 bg-[#181818]/50" : "border-[#994ff3]/20 bg-[#fffffe]/50"}`}
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] text-[#fffffe] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Notify Me
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3]"
                    >
                      <Mail className="h-8 w-8 text-[#fffffe]" />
                    </motion.div>
                    <h3
                      className={`mb-2 text-lg font-bold ${isDark ? "text-[#fffffe]" : "text-[#181818]"}`}
                    >
                      You're All Set!
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
                    >
                      We'll notify you as soon as we launch.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <a
          href="/"
          className="flex items-center space-x-2 opacity-60 transition-opacity hover:opacity-100"
        >
          <Calendar
            className={`h-4 w-4 ${isDark ? "text-[#4fc4cf]" : "text-[#994ff3]"}`}
          />
          <span
            className={`text-sm ${isDark ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}
          >
            Back to Home
          </span>
        </a>
      </motion.div>
    </div>
  );
}
