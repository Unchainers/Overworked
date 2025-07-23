"use client"

import { motion } from "framer-motion"
import { FeaturesHero } from "@/components/Features/features-hero"
import { FeatureCard } from "@/components/Features/feature-card"
import { SectionHeading } from "@/components/General/section-heading"
import {
  Brain,
  Briefcase,
  MessageSquare,
  Users,
  Trophy,
  Lightbulb,
  BookOpen,
  Code,
  Palette,
  Zap,
  Globe,
  Heart,
} from "lucide-react"

const features = [
  {
    title: "World Brain",
    description:
      "Access unlimited knowledge through our comprehensive learning platform. Master new skills with interactive courses, expert instructors, and personalized learning paths.",
    icon: <Brain className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-purple to-ow-aqua",
    href: "/world-brain",
    status: "live" as const,
    features: [
      "Interactive video courses",
      "Expert instructor network",
      "Personalized learning paths",
      "Progress tracking & certificates",
      "Community discussions",
      "Mobile learning support",
    ],
  },
  {
    title: "Work Bay",
    description:
      "Your professional workspace for productivity and collaboration. Manage projects, track progress, and work seamlessly with your team in one unified platform.",
    icon: <Briefcase className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-aqua to-ow-gold",
    href: "/work-bay",
    status: "live" as const,
    features: [
      "Project management tools",
      "Team collaboration",
      "Task tracking & deadlines",
      "File sharing & storage",
      "Time tracking",
      "Performance analytics",
    ],
  },
  {
    title: "AI Chat Assistant",
    description:
      "Intelligent conversations powered by advanced AI. Get instant help, brainstorm ideas, solve problems, and enhance your productivity with our smart chatbot.",
    icon: <MessageSquare className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-gold to-ow-purple",
    href: "/ai-chat",
    status: "live" as const,
    features: [
      "Advanced AI conversations",
      "Multi-language support",
      "Context-aware responses",
      "File analysis & processing",
      "Code generation & debugging",
      "Creative writing assistance",
    ],
  },
  {
    title: "TownTalk",
    description:
      "Web3-integrated social media platform where creativity meets community. Share thoughts, connect with like-minded individuals, and build your digital presence.",
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-purple to-ow-gold",
    href: "/town-talk",
    status: "beta" as const,
    features: [
      "Web3 integration & NFTs",
      "Rich media sharing",
      "Community building tools",
      "Decentralized identity",
      "Token rewards system",
      "Cross-platform connectivity",
    ],
  },
  {
    title: "GrindArena",
    description:
      "Competitive platform for skill-based challenges and tournaments. Test your abilities, compete with others, and climb the leaderboards in various disciplines.",
    icon: <Trophy className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-aqua to-ow-purple",
    href: "/grind-arena",
    status: "beta" as const,
    features: [
      "Skill-based competitions",
      "Real-time leaderboards",
      "Tournament system",
      "Achievement badges",
      "Prize pools & rewards",
      "Performance analytics",
    ],
  },
  {
    title: "CityMind Live",
    description:
      "Real-time thought sharing and trending ideas platform. Discover what's buzzing in the community, share your insights, and stay connected with global conversations.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-gold to-ow-aqua",
    href: "/city-mind-live",
    status: "live" as const,
    features: [
      "Real-time thought bubbles",
      "Trending topics discovery",
      "Interactive engagement",
      "Community insights",
      "Live discussion threads",
      "Thought categorization",
    ],
  },
]

const upcomingFeatures = [
  {
    title: "CodeCraft Studio",
    description:
      "Advanced code editor with AI assistance, collaborative coding, and integrated deployment tools for developers.",
    icon: <Code className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    href: "/coming-soon",
    status: "coming-soon" as const,
    features: [
      "AI-powered code completion",
      "Real-time collaboration",
      "Integrated version control",
      "One-click deployment",
      "Multi-language support",
      "Performance optimization",
    ],
  },
  {
    title: "DesignForge",
    description:
      "Creative design platform with AI-powered tools, collaborative workspaces, and seamless asset management.",
    icon: <Palette className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-pink-500 to-orange-500",
    href: "/coming-soon",
    status: "coming-soon" as const,
    features: [
      "AI design assistance",
      "Collaborative design tools",
      "Asset library & management",
      "Brand consistency tools",
      "Export & integration",
      "Design system builder",
    ],
  },
  {
    title: "KnowledgeVault",
    description: "Personal knowledge management system with AI-powered organization, search, and content discovery.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    gradient: "bg-gradient-to-br from-green-500 to-teal-500",
    href: "/coming-soon",
    status: "coming-soon" as const,
    features: [
      "AI content organization",
      "Smart search & discovery",
      "Cross-platform sync",
      "Collaborative knowledge",
      "Version history",
      "Export & sharing tools",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ow-white via-ow-white/95 to-ow-white">
      {/* Hero Section */}
      <FeaturesHero />

      {/* Core Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionHeading
              title="Core Features"
              subtitle="Powerful tools and platforms designed to enhance your productivity, learning, and creativity"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-ow-aqua/10 to-ow-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-ow-gold/10 to-ow-aqua/10 rounded-full blur-3xl" />
      </section>

      {/* Upcoming Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionHeading
              title="Coming Soon"
              subtitle="Exciting new features and platforms currently in development"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index + features.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ow-purple/20 via-ow-aqua/20 to-ow-gold/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-ow-aqua to-ow-purple p-4 rounded-full mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-ow-white via-ow-aqua to-ow-purple bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-ow-white/80 mb-8 leading-relaxed">
                Join thousands of users who are already experiencing the power of Overworked. Start your journey today
                and unlock your full potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-ow-purple to-ow-aqua text-white font-semibold rounded-full hover:shadow-lg hover:shadow-ow-purple/25 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2 inline" />
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-lg"
              >
                <Globe className="w-5 h-5 mr-2 inline" />
                Explore Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-ow-aqua/20 to-ow-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-ow-gold/20 to-ow-aqua/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </section>
    </div>
  )
}
