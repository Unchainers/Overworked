"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Bell, Calendar, Rocket, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/Layouts/navbar"
import { Footer } from "@/components/Layouts/footer"
import { useTheme } from "@/contexts/ThemeProvider"

export default function ComingSoonPage() {
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date (example: 3 months from now)
  const launchDate = new Date()
  launchDate.setMonth(launchDate.getMonth() + 3)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${theme === "dark" ? "dark bg-[#181818]" : "bg-[#fffffe]"}`}
    >
      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#4fc4cf]/10 to-[#994ff3]/10 blur-3xl"
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
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#fbdd74]/10 to-[#4fc4cf]/10 blur-3xl"
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
                ? "w-4 h-4 rounded-full"
                : i % 4 === 1
                  ? "w-3 h-3 rotate-45"
                  : i % 4 === 2
                    ? "w-5 h-1 rounded-full"
                    : "w-2 h-6 rounded-full"
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
        <div className={`absolute inset-0 opacity-5 ${theme === "dark" ? "opacity-10" : ""}`}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${theme === "dark" ? "#4fc4cf" : "#994ff3"} 1px, transparent 1px), linear-gradient(90deg, ${theme === "dark" ? "#4fc4cf" : "#994ff3"} 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center">
              <span className="text-[#fffffe] font-bold text-2xl">O</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-transparent">
              Overworked
            </h1>
            <p
              className={`text-xl md:text-2xl font-medium ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
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
              className={`text-3xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Something Amazing is{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              We're building the future of digital work and communities. Get ready to enter a world where creators,
              thinkers, and workers unite to build influence and earn CRY tokens.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <Card
                  key={item.label}
                  className={`${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"} backdrop-blur-md`}
                >
                  <CardContent className="p-6 text-center">
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent mb-2"
                    >
                      {item.value.toString().padStart(2, "0")}
                    </motion.div>
                    <div
                      className={`text-sm font-medium ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
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
            <h3 className={`text-2xl font-bold mb-8 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
              What's Coming
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: "NFT Identity System",
                  description: "Your unique digital identity as an NFT",
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "CRY Token Economy",
                  description: "Earn tokens for your hard work and contributions",
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
                    className={`h-full ${theme === "dark" ? "bg-[#181818]/30 border-[#4fc4cf]/20" : "bg-[#fffffe]/30 border-[#994ff3]/20"} backdrop-blur-md hover:border-[#4fc4cf] transition-colors`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center text-[#fffffe]">
                        {feature.icon}
                      </div>
                      <h4
                        className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
                      >
                        {feature.title}
                      </h4>
                      <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
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
              className={`max-w-md mx-auto ${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"} backdrop-blur-md`}
            >
              <CardContent className="p-6">
                {!isSubscribed ? (
                  <>
                    <div className="flex items-center justify-center mb-4">
                      <Bell className={`h-6 w-6 mr-2 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`} />
                      <h3 className={`text-lg font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        Get Notified
                      </h3>
                    </div>
                    <p className={`text-sm mb-4 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      Be the first to know when we launch!
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"}`}
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 text-[#fffffe] border-0"
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
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center"
                    >
                      <Mail className="h-8 w-8 text-[#fffffe]" />
                    </motion.div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      You're All Set!
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="/" className="flex items-center space-x-2 opacity-60 hover:opacity-100 transition-opacity">
          <Calendar className={`h-4 w-4 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`} />
          <span className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
            Back to Home
          </span>
        </a>
      </motion.div>

      <Footer />
    </div>
  )
}
