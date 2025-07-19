"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Users,
  Target,
  Coins,
  Star,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Shield,
  Gamepad2,
  ChevronRight,
  Play,
  Gift,
  Crown,
  Sparkles,
  Rocket,
  Globe,
} from "lucide-react"

export default function GrindArenaPage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const featuredCompetitions = [
    {
      id: 1,
      title: "Web3 DeFi Innovation Challenge",
      description: "Build the next generation of decentralized finance applications",
      prize: "50,000 CRY",
      participants: 1247,
      timeLeft: "5 days",
      difficulty: "Advanced",
      category: "Development",
      image: "/placeholder.svg?height=300&width=400&text=DeFi+Challenge",
      status: "Active",
    },
    {
      id: 2,
      title: "NFT Art Creation Contest",
      description: "Create stunning digital art pieces for the metaverse",
      prize: "25,000 CRY",
      participants: 892,
      timeLeft: "12 days",
      difficulty: "Intermediate",
      category: "Design",
      image: "/placeholder.svg?height=300&width=400&text=NFT+Art",
      status: "Active",
    },
    {
      id: 3,
      title: "Smart Contract Security Audit",
      description: "Find vulnerabilities in blockchain smart contracts",
      prize: "75,000 CRY",
      participants: 456,
      timeLeft: "3 days",
      difficulty: "Expert",
      category: "Security",
      image: "/placeholder.svg?height=300&width=400&text=Security+Audit",
      status: "Hot",
    },
  ]

  const allCompetitions = [
    {
      title: "Blockchain Gaming Tournament",
      prize: "30,000 CRY",
      participants: 2341,
      timeLeft: "8 days",
      category: "Gaming",
      difficulty: "Beginner",
    },
    {
      title: "Crypto Trading Bot Challenge",
      prize: "40,000 CRY",
      participants: 567,
      timeLeft: "15 days",
      category: "Trading",
      difficulty: "Advanced",
    },
    {
      title: "Metaverse Architecture Design",
      prize: "35,000 CRY",
      participants: 234,
      timeLeft: "20 days",
      category: "Design",
      difficulty: "Intermediate",
    },
    {
      title: "DAO Governance Proposal",
      prize: "20,000 CRY",
      participants: 789,
      timeLeft: "6 days",
      category: "Governance",
      difficulty: "Intermediate",
    },
    {
      title: "Web3 Mobile App Development",
      prize: "60,000 CRY",
      participants: 1123,
      timeLeft: "25 days",
      category: "Development",
      difficulty: "Advanced",
    },
    {
      title: "Cryptocurrency Analysis Report",
      prize: "15,000 CRY",
      participants: 445,
      timeLeft: "10 days",
      category: "Research",
      difficulty: "Beginner",
    },
  ]

  const benefits = [
    {
      icon: Coins,
      title: "Earn CRY Tokens",
      description: "Get rewarded with CRY tokens for every submission and win big prizes for top performances",
    },
    {
      icon: Trophy,
      title: "Compete Globally",
      description: "Challenge creators, developers, and innovators from around the world in various competitions",
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "All submissions and results are recorded on the blockchain for transparency and immutability",
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Improve your skills through challenging competitions and learn from the best in the industry",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a vibrant community of creators, developers, and innovators pushing the boundaries",
    },
    {
      icon: Award,
      title: "Recognition & Fame",
      description: "Build your reputation and get recognized for your skills and achievements in the Web3 space",
    },
  ]

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Blockchain Developer",
      avatar: "/placeholder.svg?height=60&width=60&text=AC",
      content:
        "GrindArena has been incredible for showcasing my skills. I've earned over 100,000 CRY tokens and built amazing connections!",
      rating: 5,
      prize: "Winner of 3 competitions",
    },
    {
      name: "Sarah Martinez",
      role: "NFT Artist",
      avatar: "/placeholder.svg?height=60&width=60&text=SM",
      content:
        "The platform is perfect for creative challenges. The blockchain verification gives me confidence in fair judging.",
      rating: 5,
      prize: "Top 10 in 5 competitions",
    },
    {
      name: "Marcus Johnson",
      role: "DeFi Specialist",
      avatar: "/placeholder.svg?height=60&width=60&text=MJ",
      content:
        "Love the variety of competitions! From coding challenges to research papers, there's something for everyone.",
      rating: 5,
      prize: "Earned 75,000 CRY tokens",
    },
  ]

  const marqueeItems = [
    "🏆 Join 50,000+ Competitors",
    "💎 Win CRY Tokens",
    "🚀 Blockchain Verified",
    "🌟 Global Competitions",
    "⚡ Real-time Leaderboards",
    "🎯 Skill-based Matching",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30 dark:from-black dark:via-cyan-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y }} className="absolute -top-1/2 -left-1/2 w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-yellow-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-cyan-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-40"
            style={{
              background: i % 3 === 0 ? "#4fc4cf" : i % 3 === 1 ? "#994ff3" : "#fbdd74",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-6 py-2 text-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Web3 Competition Platform
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent leading-tight">
              GrindArena
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Compete, Create, and Earn in the Ultimate Web3 Competition Platform
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Join thousands of creators, developers, and innovators in blockchain-verified competitions. Showcase your
              skills, win CRY tokens, and build your reputation in the Web3 ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Competing
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: "Active Competitions", value: "150+", icon: Target },
              { label: "Total Participants", value: "50K+", icon: Users },
              { label: "CRY Tokens Distributed", value: "2M+", icon: Coins },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is GrindArena Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              What is GrindArena?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              GrindArena is the world's first fully integrated Web3 competition platform where creativity meets
              blockchain technology. Compete in various challenges, earn CRY tokens, and build your reputation in the
              decentralized ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {[
                  {
                    icon: Gamepad2,
                    title: "Diverse Competitions",
                    description:
                      "From coding challenges to art contests, trading competitions to research papers - find your perfect arena.",
                  },
                  {
                    icon: Shield,
                    title: "Blockchain Verified",
                    description:
                      "All submissions, judging, and rewards are recorded on the blockchain for complete transparency and fairness.",
                  },
                  {
                    icon: Coins,
                    title: "Token Rewards",
                    description:
                      "Earn CRY tokens for participation and win substantial prizes for top performances in every competition.",
                  },
                  {
                    icon: Globe,
                    title: "Global Community",
                    description:
                      "Connect with creators, developers, and innovators from around the world in a thriving Web3 ecosystem.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-sm border border-cyan-200/20 dark:border-cyan-800/20">
                <img
                  src="/placeholder.svg?height=400&width=500&text=GrindArena+Platform"
                  alt="GrindArena Platform"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Crown className="w-4 h-4 inline mr-1" />
                  #1 Web3 Platform
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Competitions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Featured Competitions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join the hottest competitions happening right now and compete for massive CRY token prizes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={competition.image || "/placeholder.svg"}
                      alt={competition.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${
                          competition.status === "Hot"
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        } text-white border-0`}
                      >
                        {competition.status === "Hot" ? "🔥" : "✅"} {competition.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/50 text-white border-0">
                        {competition.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-purple-400 text-purple-600 dark:text-purple-400">
                        {competition.category}
                      </Badge>
                      <div className="flex items-center text-yellow-500">
                        <Coins className="w-4 h-4 mr-1" />
                        <span className="font-bold">{competition.prize}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {competition.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{competition.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {competition.participants.toLocaleString()} participants
                        </div>
                        <div className="flex items-center text-red-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {competition.timeLeft} left
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-all duration-300 group-hover:shadow-lg">
                        Join Competition
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center space-x-8 mx-8">
                {marqueeItems.map((item, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent whitespace-nowrap"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Competitions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              All Competitions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore all available competitions across different categories and skill levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCompetitions.map((competition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20 hover:border-purple-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-cyan-400 text-cyan-600 dark:text-cyan-400">
                        {competition.category}
                      </Badge>
                      <Badge
                        className={`${
                          competition.difficulty === "Beginner"
                            ? "bg-green-500"
                            : competition.difficulty === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white border-0`}
                      >
                        {competition.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{competition.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Prize Pool:</span>
                        <span className="font-semibold text-yellow-500 flex items-center">
                          <Coins className="w-3 h-3 mr-1" />
                          {competition.prize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-semibold">{competition.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Time Left:</span>
                        <span className="font-semibold text-red-500">{competition.timeLeft}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 px-8 py-4 text-lg rounded-full bg-transparent"
            >
              View All Competitions
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose GrindArena?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the unique advantages that make GrindArena the premier Web3 competition platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20 hover:border-yellow-400/40 transition-all duration-300 text-center p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-cyan-400/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-10 h-10 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from our community of winners and achievers who have built their careers through GrindArena
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-200/20 dark:border-purple-800/20 hover:border-purple-400/40 transition-all duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{testimonial.content}"</p>

                  <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">
                    <Trophy className="w-3 h-3 mr-1" />
                    {testimonial.prize}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-sm border border-cyan-200/20 dark:border-cyan-800/20 rounded-3xl p-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-8">
              <Rocket className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and innovators competing for millions of CRY tokens. Your next big breakthrough
              is just one competition away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Gift className="w-5 h-5 mr-2" />
                Join GrindArena Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Competition Calendar
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              🎯 No registration fees • 🏆 Instant rewards • 🔒 Blockchain secured
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
