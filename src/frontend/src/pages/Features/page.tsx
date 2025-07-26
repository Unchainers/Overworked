"use client";

import { motion } from "framer-motion";
import { FeaturesHero } from "@/components/Features/features-hero";
import { FeatureCard } from "@/components/Features/feature-card";
import { SectionHeading } from "@/components/General/section-heading";
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
} from "lucide-react";

const features = [
  {
    title: "World Brain",
    description:
      "Access unlimited knowledge through our comprehensive learning platform. Master new skills with interactive courses, expert instructors, and personalized learning paths.",
    icon: <Brain className="h-8 w-8 text-white" />,
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
    icon: <Briefcase className="h-8 w-8 text-white" />,
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
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-gold to-ow-purple",
    href: "/chatbot",
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
    icon: <Users className="h-8 w-8 text-white" />,
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
    icon: <Trophy className="h-8 w-8 text-white" />,
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
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-ow-gold to-ow-aqua",
    href: "/city-mind",
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
];

const upcomingFeatures = [
  {
    title: "CodeCraft Studio",
    description:
      "Advanced code editor with AI assistance, collaborative coding, and integrated deployment tools for developers.",
    icon: <Code className="h-8 w-8 text-white" />,
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
    icon: <Palette className="h-8 w-8 text-white" />,
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
    description:
      "Personal knowledge management system with AI-powered organization, search, and content discovery.",
    icon: <BookOpen className="h-8 w-8 text-white" />,
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
];

import { Mail, Scale } from "lucide-react";

const utilityFeatures = [
  {
    title: "Meet the Team",
    description:
      "Get to know the passionate minds behind Overworked. Discover our mission, roles, and journey.",
    icon: <Users className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    href: "/team",
    status: "live" as const,
    features: [
      "Developer, Designer, and Visionary profiles",
      "Team mission and values",
      "Behind-the-scenes insights",
      "LinkedIn & social links",
      "Timeline of growth",
      "Core principles of Overworked",
    ],
  },
  {
    title: "Contact & Support",
    description:
      "Reach out to us for questions, support, feedback, or partnership inquiries. We’re here to help!",
    icon: <Mail className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    href: "/contact",
    status: "live" as const,
    features: [
      "Feedback & inquiry form",
      "Business & partnership contact",
      "Report a bug or issue",
      "FAQ & help center",
      "Support email integration",
      "Response time SLA details",
    ],
  },
  {
    title: "Legal & Privacy",
    description:
      "Stay informed about how we protect your data, rights, and content with our legal and privacy policies.",
    icon: <Scale className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-red-500 to-rose-600",
    href: "/legal",
    status: "live" as const,
    features: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie & tracking policy",
      "User rights and protections",
      "License & attribution info",
      "Dispute resolution & disclaimers",
    ],
  },
];

import { Footer } from "@/components/Layouts/footer";
import { Navbar } from "@/components/Layouts/navbar";

export default function FeaturesPage() {
  return (
    <div className="from-ow-white via-ow-white/95 to-ow-white min-h-screen bg-gradient-to-br">
      <Navbar />

      {/* Hero Section */}
      <FeaturesHero />

      {/* Core Features Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <SectionHeading
              title="Core Features"
              subtitle="Powerful tools and platforms designed to enhance your productivity, learning, and creativity"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="from-ow-aqua/10 to-ow-purple/10 absolute left-10 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-gold/10 to-ow-aqua/10 absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
      </section>

      {/* Utility Features Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <SectionHeading
              title="Utility Pages"
              subtitle="Wants to know deeper about Overworked and Unchainers Team?"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {utilityFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                index={index + features.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <SectionHeading
              title="Coming Soon"
              subtitle="Exciting new features and platforms currently in development"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                index={index + features.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative overflow-hidden py-24">
        <div className="from-ow-purple/20 via-ow-aqua/20 to-ow-gold/20 absolute inset-0 bg-gradient-to-r" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-8">
              <div className="from-ow-aqua to-ow-purple mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r p-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="from-ow-white via-ow-aqua to-ow-purple mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Ready to Get Started?
              </h2>
              <p className="text-ow-white/80 mb-8 text-xl leading-relaxed">
                Join thousands of users who are already experiencing the power
                of Overworked. Start your journey today and unlock your full
                potential.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="from-ow-purple to-ow-aqua hover:shadow-ow-purple/25 rounded-full bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg"
              >
                <Zap className="mr-2 inline h-5 w-5" />
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
              >
                <Globe className="mr-2 inline h-5 w-5" />
                Explore Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Background Orbs */}
        <div className="from-ow-aqua/20 to-ow-purple/20 absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-gold/20 to-ow-aqua/20 animation-delay-2000 absolute -bottom-24 -right-24 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
      </section>
      <Footer />
    </div>
  );
}
