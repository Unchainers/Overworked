"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Play,
  Users,
  Coins,
  Zap,
  Shield,
  Trophy,
  ArrowRight,
  Star,
  Quote,
  Plus,
  Minus,
  DiscIcon,
  Twitter,
  TextIcon,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/Layouts/navbar"
import { Footer } from "@/components/Layouts/footer"
import { useTheme } from "@/contexts/ThemeProvider"

export default function OverworkedLanding() {
  const { theme } = useTheme()
  const [faqOpenStates, setFaqOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setFaqOpenStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-[#181818]" : "bg-[#fffffe]"}`}
    >
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4fc4cf]/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#994ff3]/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-[#fbdd74]/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>

          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0 ? "bg-[#4fc4cf]" : i % 3 === 1 ? "bg-[#994ff3]" : "bg-[#fbdd74]"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-transparent">
                Overworked
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl md:text-2xl mb-8 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A digital on-chain city for creators, thinkers, and workers.
              <br />
              Build your influence, earn CRY tokens, and shape the future.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 text-[#fffffe] border-0 px-8 py-6 text-lg">
                Enter the City
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className={`border-2 px-8 py-6 text-lg ${
                  theme === "dark"
                    ? "border-[#4fc4cf] text-[#4fc4cf] hover:bg-[#4fc4cf] hover:text-[#181818]"
                    : "border-[#994ff3] text-[#994ff3] hover:bg-[#994ff3] hover:text-[#fffffe]"
                }`}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className={`h-8 w-8 ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              About{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Overworked
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
              Imagine a digital city where people can work, learn, socialize, and compete to become the most influential
              citizen, all based on blockchain technology, where your identity is an NFT, the money is a digital token,
              and the rules are determined by the community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community Driven",
                description: "Rules and governance determined by the community through decentralized voting.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Blockchain Powered",
                description: "Built on ICP Web3 technology for security, transparency, and true ownership.",
              },
              {
                icon: <Coins className="h-8 w-8" />,
                title: "Earn CRY Tokens",
                description: "Get rewarded for your hard work with our native cryptocurrency token.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-[#181818] border-[#4fc4cf]/20" : "bg-[#fffffe] border-[#994ff3]/20"} hover:border-[#4fc4cf] transition-colors`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center text-[#fffffe]">
                      {item.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      {item.title}
                    </h3>
                    <p className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-br from-[#181818] to-[#181818]/80" : "bg-gradient-to-br from-[#fffffe] to-[#fffffe]/80"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              How{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                It Works
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
              Your journey in Overworked is simple yet rewarding
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your NFT Identity",
                description: "Mint your unique digital identity as an NFT that represents you in the city.",
              },
              {
                step: "02",
                title: "Choose Your Path",
                description: "Decide whether you want to work, learn, create, or all of the above.",
              },
              {
                step: "03",
                title: "Complete Tasks & Earn",
                description: "Take on challenges, complete projects, and earn CRY tokens for your efforts.",
              },
              {
                step: "04",
                title: "Build Influence",
                description: "Use your earnings and achievements to gain influence and shape the city's future.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div
                    className={`p-8 rounded-2xl ${theme === "dark" ? "bg-[#181818]/50" : "bg-[#fffffe]/50"} backdrop-blur-sm border ${theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"}`}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-6xl font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent mr-6">
                        {item.step}
                      </span>
                      <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className={`text-lg ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="w-20 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3]"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Powerful{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Built on ICP for instant transactions and seamless user experience.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure & Transparent",
                description: "Blockchain technology ensures security and complete transparency.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community Governance",
                description: "Democratic decision-making through community voting mechanisms.",
              },
              {
                icon: <Coins className="h-8 w-8" />,
                title: "CRY Token Economy",
                description: "Earn and spend CRY tokens within the ecosystem.",
              },
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "Achievement System",
                description: "Unlock badges and achievements as you progress.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Reputation System",
                description: "Build your reputation and become an influential citizen.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-[#181818] border-[#4fc4cf]/20" : "bg-[#fffffe] border-[#994ff3]/20"} hover:border-[#4fc4cf] transition-all duration-300 hover:transform hover:scale-105`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center text-[#fffffe]">
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      {feature.title}
                    </h3>
                    <p className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Overworked Section */}
      <section
        id="why-overworked"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-br from-[#181818] via-[#181818]/90 to-[#181818]" : "bg-gradient-to-br from-[#fffffe] via-[#fffffe]/90 to-[#fffffe]"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Overworked?
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {[
                  {
                    title: "True Ownership",
                    description: "Your identity, assets, and achievements are truly yours through NFT technology.",
                  },
                  {
                    title: "Fair Compensation",
                    description: "Get paid fairly for your work with CRY tokens that have real value.",
                  },
                  {
                    title: "Democratic Governance",
                    description: "Have a real say in how the city evolves through community voting.",
                  },
                  {
                    title: "Endless Opportunities",
                    description: "Whether you're a creator, thinker, or worker, there's a place for you.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] flex-shrink-0 mt-1"></div>
                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
                      >
                        {item.title}
                      </h3>
                      <p className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                        {item.description}
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
              <div
                className={`p-8 rounded-2xl ${theme === "dark" ? "bg-[#181818]/50" : "bg-[#fffffe]/50"} backdrop-blur-sm border ${theme === "dark" ? "border-[#4fc4cf]/20" : "border-[#994ff3]/20"}`}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center">
                    <Trophy className="h-12 w-12 text-[#fffffe]" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                    Join the Revolution
                  </h3>
                  <p className={`text-lg mb-6 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                    Be part of the future of work and digital communities. Your journey to influence starts here.
                  </p>
                  <Button className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 text-[#fffffe] border-0">
                    Get Started Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={`py-12 overflow-hidden ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"}`}>
        <div className="relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#fbdd74] bg-clip-text text-transparent mx-8"
              >
                OVERWORKED • EARN CRY • BUILD INFLUENCE •
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section
        id="tokenomics"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-br from-[#181818] to-[#181818]/80" : "bg-gradient-to-br from-[#fffffe] to-[#fffffe]/80"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              CRY Token{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Economics
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto mb-8 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              CRY Token - Because when you're overworked, you deserve to be compensated fairly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"} backdrop-blur-sm`}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#fbdd74] to-[#4fc4cf] flex items-center justify-center">
                      <Coins className="h-10 w-10 text-[#181818]" />
                    </div>
                    <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      CRY Token
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                        Total Supply
                      </span>
                      <span className={`font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        1,000,000,000 CRY
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                        Initial Price
                      </span>
                      <span className={`font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        $0.001
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                        Blockchain
                      </span>
                      <span className={`font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>ICP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                Token Distribution
              </h3>

              {[
                { label: "Community Rewards", percentage: 40, color: "from-[#4fc4cf] to-[#4fc4cf]/80" },
                { label: "Development", percentage: 25, color: "from-[#994ff3] to-[#994ff3]/80" },
                { label: "Marketing", percentage: 15, color: "from-[#fbdd74] to-[#fbdd74]/80" },
                { label: "Team", percentage: 10, color: "from-[#4fc4cf] to-[#994ff3]" },
                { label: "Reserve", percentage: 10, color: "from-[#994ff3] to-[#fbdd74]" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>{item.label}</span>
                    <span className={`font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-3 rounded-full ${theme === "dark" ? "bg-[#181818]/50" : "bg-[#fffffe]/50"}`}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">Team</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Blockchain enthusiast with 10+ years in tech",
              },
              {
                name: "Sarah Johnson",
                role: "CTO",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Full-stack developer and ICP specialist",
              },
              {
                name: "Mike Rodriguez",
                role: "Lead Designer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "UI/UX expert with a passion for Web3",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${theme === "dark" ? "bg-[#181818] border-[#4fc4cf]/20" : "bg-[#fffffe] border-[#994ff3]/20"} hover:border-[#4fc4cf] transition-all duration-300 hover:transform hover:scale-105`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] p-1">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                      {member.name}
                    </h3>
                    <p className="text-[#4fc4cf] font-medium mb-3">{member.role}</p>
                    <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-br from-[#181818] to-[#181818]/80" : "bg-gradient-to-br from-[#fffffe] to-[#fffffe]/80"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              What People{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Wilson",
                role: "Digital Creator",
                content:
                  "Overworked has revolutionized how I think about digital work. The CRY token system is fair and transparent.",
                rating: 5,
              },
              {
                name: "David Park",
                role: "Software Developer",
                content:
                  "Finally, a platform where my skills are properly valued. The community governance is amazing!",
                rating: 5,
              },
              {
                name: "Lisa Zhang",
                role: "Content Writer",
                content:
                  "I've earned more CRY tokens in a month than I expected. This platform truly rewards hard work.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"} backdrop-blur-sm`}
                >
                  <CardContent className="p-6">
                    <Quote className={`h-8 w-8 mb-4 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`} />
                    <p className={`mb-6 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                          {testimonial.name}
                        </h4>
                        <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#fbdd74] text-[#fbdd74]" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-20 ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What is Overworked?",
                answer:
                  "Overworked is a digital on-chain city built on ICP Web3 technology where creators, thinkers, and workers can earn CRY tokens while building their influence in a community-governed ecosystem.",
              },
              {
                question: "How do I earn CRY tokens?",
                answer:
                  "You can earn CRY tokens by completing tasks, contributing to projects, participating in community governance, and helping other members of the city.",
              },
              {
                question: "What can I do with CRY tokens?",
                answer:
                  "CRY tokens can be used within the ecosystem for various purposes including purchasing NFTs, voting on governance proposals, and accessing premium features.",
              },
              {
                question: "Is my identity secure?",
                answer:
                  "Yes, your identity is represented as an NFT on the blockchain, giving you true ownership and control over your digital identity.",
              },
              {
                question: "How does community governance work?",
                answer:
                  "Token holders can propose and vote on changes to the platform, ensuring that the community has a real say in how Overworked evolves.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <Card
                  className={`${theme === "dark" ? "bg-[#181818] border-[#4fc4cf]/20" : "bg-[#fffffe] border-[#994ff3]/20"}`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors"
                    >
                      <h3 className={`text-lg font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        {faq.question}
                      </h3>
                      {faqOpenStates[index] ? (
                        <Minus className={`h-5 w-5 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`} />
                      ) : (
                        <Plus className={`h-5 w-5 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`} />
                      )}
                    </button>
                    <AnimatePresence>
                      {faqOpenStates[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-6 pb-6 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community and CTA Section */}
      <section
        id="community"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-br from-[#181818] via-[#181818]/90 to-[#181818]" : "bg-gradient-to-br from-[#fffffe] via-[#fffffe]/90 to-[#fffffe]"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
            >
              Join Our{" "}
              <span className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                Community
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto mb-12 ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}
            >
              Connect with fellow creators, thinkers, and workers. Be part of the future of digital work.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: <DiscIcon className="h-6 w-6" />, label: "Discord", members: "10K+" },
                { icon: <Twitter className="h-6 w-6" />, label: "Twitter", members: "25K+" },
                { icon: <TextIcon className="h-6 w-6" />, label: "Telegram", members: "8K+" },
                { icon: <Github className="h-6 w-6" />, label: "GitHub", members: "2K+" },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`${theme === "dark" ? "bg-[#181818]/50 border-[#4fc4cf]/20" : "bg-[#fffffe]/50 border-[#994ff3]/20"} hover:border-[#4fc4cf] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#4fc4cf] to-[#994ff3] flex items-center justify-center text-[#fffffe]">
                        {social.icon}
                      </div>
                      <h3 className={`font-bold mb-1 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                        {social.label}
                      </h3>
                      <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
                        {social.members} members
                      </p>
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
              className="space-y-6"
            >
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                Ready to Get Overworked?
              </h3>
              <p className={`text-lg ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                Join thousands of creators, thinkers, and workers building the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 text-[#fffffe] border-0 px-8 py-6 text-lg">
                  Enter Overworked City
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className={`border-2 px-8 py-6 text-lg ${
                    theme === "dark"
                      ? "border-[#4fc4cf] text-[#4fc4cf] hover:bg-[#4fc4cf] hover:text-[#181818]"
                      : "border-[#994ff3] text-[#994ff3] hover:bg-[#994ff3] hover:text-[#fffffe]"
                  }`}
                >
                  Read Whitepaper
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
