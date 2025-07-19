"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

import { Footer } from "@/components/Layouts/footer";
import { Navbar } from "@/components/Layouts/navbar";
import { useNavigate } from "react-router";

export default function GrindArenaPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const featuredCompetitions = [
    {
      id: 1,
      title: "Web3 DeFi Innovation Challenge",
      description:
        "Build the next generation of decentralized finance applications",
      prize: "50,000 CRY",
      participants: 1247,
      timeLeft: "5 days",
      difficulty: "Advanced",
      category: "Development",
      image:
        "/images/placeholder/banner.png?height=300&width=400&text=DeFi+Challenge",
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
      image: "/images/placeholder/banner.png?height=300&width=400&text=NFT+Art",
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
      image:
        "/images/placeholder/banner.png?height=300&width=400&text=Security+Audit",
      status: "Hot",
    },
  ];

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
  ];

  const benefits = [
    {
      icon: Coins,
      title: "Earn CRY Tokens",
      description:
        "Get rewarded with CRY tokens for every submission and win big prizes for top performances",
    },
    {
      icon: Trophy,
      title: "Compete Globally",
      description:
        "Challenge creators, developers, and innovators from around the world in various competitions",
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description:
        "All submissions and results are recorded on the blockchain for transparency and immutability",
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description:
        "Improve your skills through challenging competitions and learn from the best in the industry",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a vibrant community of creators, developers, and innovators pushing the boundaries",
    },
    {
      icon: Award,
      title: "Recognition & Fame",
      description:
        "Build your reputation and get recognized for your skills and achievements in the Web3 space",
    },
  ];

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
  ];

  const marqueeItems = [
    "🏆 Join 50,000+ Competitors",
    "💎 Win CRY Tokens",
    "🚀 Blockchain Verified",
    "🌟 Global Competitions",
    "⚡ Real-time Leaderboards",
    "🎯 Skill-based Matching",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-purple-50 dark:from-black dark:via-cyan-950/20 dark:to-purple-950/20">
      <Navbar />
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -left-1/2 -top-1/2 h-full w-full"
        >
          <motion.div
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-3xl"
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
            className="absolute right-1/4 top-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400/20 to-yellow-400/20 blur-3xl"
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
            className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-yellow-400/20 to-cyan-400/20 blur-3xl"
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
            className="absolute h-2 w-2 rounded-full opacity-40"
            style={{
              background:
                i % 3 === 0 ? "#4fc4cf" : i % 3 === 1 ? "#994ff3" : "#fbdd74",
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
      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-6 border-0 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 text-lg text-white">
              <Sparkles className="mr-2 h-4 w-4" />
              Web3 Competition Platform
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-6xl font-bold leading-tight text-transparent md:text-8xl">
              GrindArena
            </h1>
            <p className="mx-auto mb-8 max-w-4xl text-2xl leading-relaxed text-gray-600 md:text-3xl dark:text-gray-300">
              Compete, Create, and Earn in the Ultimate Web3 Competition
              Platform
            </p>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
              Join thousands of creators, developers, and innovators in
              blockchain-verified competitions. Showcase your skills, win CRY
              tokens, and build your reputation in the Web3 ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              size="lg"
              className="transform rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-purple-600 hover:shadow-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Competing
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-cyan-500 bg-transparent px-8 py-4 text-lg text-cyan-600 transition-all duration-300 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-950/20"
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { label: "Active Competitions", value: "150+", icon: Target },
              { label: "Total Participants", value: "50K+", icon: Users },
              { label: "CRY Tokens Distributed", value: "2M+", icon: Coins },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                  <stat.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is GrindArena Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              What is GrindArena?
            </h2>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              GrindArena is the world's first fully integrated Web3 competition
              platform where creativity meets blockchain technology. Compete in
              various challenges, earn CRY tokens, and build your reputation in
              the decentralized ecosystem.
            </p>
          </motion.div>

          <div className="grid items-center gap-12 md:grid-cols-2">
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
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                      <feature.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
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
              <div className="relative rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 backdrop-blur-sm dark:border-cyan-800/20">
                <img
                  src="/images/placeholder/banner.png?height=400&width=500&text=GrindArena+Platform"
                  alt="GrindArena Platform"
                  className="h-auto w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 font-semibold text-white shadow-lg">
                  <Crown className="mr-1 inline h-4 w-4" />
                  #1 Web3 Platform
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Competitions Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Featured Competitions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Join the hottest competitions happening right now and compete for
              massive CRY token prizes
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <Card className="h-full overflow-hidden border-cyan-200/20 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 dark:border-cyan-800/20 dark:bg-black/80">
                  <div className="relative">
                    <img
                      src={competition.image || "/placeholder.svg"}
                      alt={competition.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge
                        className={`${
                          competition.status === "Hot"
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        } border-0 text-white`}
                      >
                        {competition.status === "Hot" ? "🔥" : "✅"}{" "}
                        {competition.status}
                      </Badge>
                    </div>
                    <div className="absolute right-4 top-4">
                      <Badge
                        variant="secondary"
                        className="border-0 bg-black/50 text-white"
                      >
                        {competition.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-purple-400 text-purple-600 dark:text-purple-400"
                      >
                        {competition.category}
                      </Badge>
                      <div className="flex items-center text-yellow-500">
                        <Coins className="mr-1 h-4 w-4" />
                        <span className="font-bold">{competition.prize}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      {competition.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {competition.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-1 h-4 w-4" />
                          {competition.participants.toLocaleString()}{" "}
                          participants
                        </div>
                        <div className="flex items-center text-red-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {competition.timeLeft} left
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white transition-all duration-300 hover:from-cyan-600 hover:to-purple-600 group-hover:shadow-lg"
                        onClick={() => navigate("/competition/1")}
                      >
                        {/* Change with detail of competition id */}
                        Join Competition
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
      <section className="overflow-hidden py-16">
        <div className="relative">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="mx-8 flex items-center space-x-8">
                {marqueeItems.map((item, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="whitespace-nowrap bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl"
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
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              All Competitions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Explore all available competitions across different categories and
              skill levels
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allCompetitions.map((competition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 dark:border-cyan-800/20 dark:bg-black/80">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-cyan-400 text-cyan-600 dark:text-cyan-400"
                      >
                        {competition.category}
                      </Badge>
                      <Badge
                        className={`${
                          competition.difficulty === "Beginner"
                            ? "bg-green-500"
                            : competition.difficulty === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } border-0 text-white`}
                      >
                        {competition.difficulty}
                      </Badge>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {competition.title}
                    </h3>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Prize Pool:</span>
                        <span className="flex items-center font-semibold text-yellow-500">
                          <Coins className="mr-1 h-3 w-3" />
                          {competition.prize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-semibold">
                          {competition.participants.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Time Left:</span>
                        <span className="font-semibold text-red-500">
                          {competition.timeLeft}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600"
                      onClick={() => navigate("/competition/1")}
                    >
                      {/* Change with detail of competition id */}
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
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-purple-500 bg-transparent px-8 py-4 text-lg text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/20"
            >
              View All Competitions
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Why Choose GrindArena?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Discover the unique advantages that make GrindArena the premier
              Web3 competition platform
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <Card className="h-full border-cyan-200/20 bg-white/80 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/40 dark:border-cyan-800/20 dark:bg-black/80">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400/20 to-cyan-400/20 transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon className="h-10 w-10 text-yellow-500" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 transition-colors group-hover:text-yellow-500 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Success Stories
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Hear from our community of winners and achievers who have built
              their careers through GrindArena
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-purple-200/20 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 dark:border-purple-800/20 dark:bg-black/80">
                  <div className="mb-4 flex items-center">
                    <Avatar className="mr-4 h-12 w-12">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="mb-4 italic text-gray-600 dark:text-gray-400">
                    "{testimonial.content}"
                  </p>

                  <Badge className="border-0 bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                    <Trophy className="mr-1 h-3 w-3" />
                    {testimonial.prize}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-cyan-200/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10 p-12 backdrop-blur-sm dark:border-cyan-800/20"
          >
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
              <Rocket className="h-10 w-10 text-white" />
            </div>

            <h2 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Ready to Start Your Journey?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Join thousands of creators and innovators competing for millions
              of CRY tokens. Your next big breakthrough is just one competition
              away.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button
                size="lg"
                className="transform rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-purple-600 hover:shadow-xl"
              >
                <Gift className="mr-2 h-5 w-5" />
                Join GrindArena Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-yellow-500 bg-transparent px-8 py-4 text-lg text-yellow-600 transition-all duration-300 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950/20"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Competition Calendar
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              🎯 No registration fees • 🏆 Instant rewards • 🔒 Blockchain
              secured
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
