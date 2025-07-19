"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Users,
  Code,
  Palette,
  Database,
  Shield,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";
import { useNavigate } from "react-router";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Stanley Nathanael Wijaya",
      role: "Lead Developer & Founder",
      specialization: "Frontend and AI Development",
      description:
        "Visionary behind Overworked, specializing in Frontend and AI Services",
      avatar: "/images/team/StanleyNW.jpg?height=300&width=300",
      social: {
        github: "https://github.com/stynw7",
        linkedin: "https://www.linkedin.com/in/stanley-nathanael-wijaya",
        instagram: "https://instagram.com/snw.77",
      },
      skills: ["React", "Vite", "Rust", "ICP", "TypeScript"],
      icon: Code,
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      name: "Stanley Jonathan Wahjudi",
      role: "Full Stack Developer",
      specialization: "Rust Specialize",
      description:
        "Creative force behind Overworked's elegant interface and ICP Engineer",
      avatar: "/images/team/StanleyJW.png?height=300&width=300",
      social: {
        github: "https://github.com/stanleyjo-37",
        linkedin:
          "https://www.linkedin.com/in/stanley-jonathan-wahjudi-4b418128a/",
        instagram: "https://instagram.com/stanley_jw",
      },
      skills: ["Rust", "ICP", "React"],
      icon: Palette,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Nathaniel Alexander",
      role: "Full Stack Developer",
      specialization: "Blockchain Integration",
      description:
        "Expert in blockchain technology, ensuring Overworked's Web3 capabilities.",
      avatar: "/images/team/Nathaniel.png?height=300&width=300",
      social: {
        github: "https://github.com/nathanielalex",
        linkedin: "https://www.linkedin.com/in/nathaniel-alexander-a33530226/",
        instagram: "https://instagram.com/nathaniel.alexander",
      },
      skills: ["React", "Rust", "ICP Canisters"],
      icon: Database,
      gradient: "from-yellow-400 to-orange-600",
    },
    {
      name: "Jason Melvin Hartono",
      role: "Web3 Engineer",
      specialization: "Cryptocurrency Token Maker",
      description: "Make the CRY Token for Overworked's Cryptocurrency",
      avatar: "/images/team/Jason.png?height=300&width=300",
      social: {
        github: "https://github.com/123jason689",
        linkedin: "https://www.linkedin.com/in/jason-melvin-hartono/",
        instagram: "https://instagram.com/jason689melvin",
      },
      skills: ["ICP", "Rust", "React"],
      icon: Shield,
      gradient: "from-cyan-400 to-teal-600",
    },
    {
      name: "Colin Oliver",
      role: "Full Stack Developer",
      specialization: "Backend Engineer",
      description: "Backend Engineer and Integrating it with the frontend",
      avatar: "/images/team/Colin.jpg?height=300&width=300",
      social: {
        github: "https://github.com/SolidGluten",
        linkedin: "https://www.linkedin.com/in/colin-oliver-7b311830b/",
        instagram: "https://instagram.com/cowlo655",
      },
      skills: ["ICP", "Rust", "React"],
      icon: Zap,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const stats = [
    { label: "Team Members", value: "6", icon: Users },
    { label: "Years Experience", value: "5+", icon: Code },
    { label: "Projects Delivered", value: "30+", icon: Zap },
    { label: "Happy Users", value: "10K+", icon: Users },
  ];

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Animated Background */}
      <Navbar />
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-purple-50/30 to-yellow-50/40 dark:from-cyan-950/20 dark:via-purple-950/15 dark:to-yellow-950/20" />

        {/* Floating animated elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute right-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-600/10 blur-3xl dark:from-cyan-400/20 dark:to-purple-600/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-gradient-to-r from-purple-500/10 to-yellow-400/10 blur-3xl dark:from-purple-500/20 dark:to-yellow-400/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="from-cyan-300/8 to-purple-400/8 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r blur-2xl dark:from-cyan-300/15 dark:to-purple-400/15"
        />

        {/* Team member avatars floating animation */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
            }}
            className={`absolute h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm`}
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pb-20 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                Team
              </h1>
            </motion.div>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl dark:text-gray-300">
              Meet the Unchainers - the brilliant minds behind Overworked's
              digital city revolution
            </p>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 px-6 py-3 dark:border-cyan-400/50 dark:from-cyan-400/20 dark:to-purple-600/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent dark:from-cyan-400 dark:to-purple-400">
                Unchainers Team
              </span>
            </motion.div>
          </motion.div>

          {/* Team Stats */}
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-gray-800/50 dark:bg-black/80 dark:hover:shadow-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="mb-3 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="group border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-gray-800/50 dark:bg-black/80 dark:hover:shadow-cyan-500/20">
                  <CardContent className="p-8">
                    {/* Avatar and Role Icon */}
                    <div className="relative mb-6">
                      <motion.div
                        className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-105 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
                        whileHover={{ rotate: 5 }}
                      >
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      </motion.div>
                      <motion.div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-xl bg-gradient-to-r p-2 ${member.gradient} shadow-lg`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <member.icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Member Info */}
                    <div className="mb-6 text-center">
                      <motion.h3
                        className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
                        whileHover={{ scale: 1.05 }}
                      >
                        {member.name}
                      </motion.h3>
                      <p
                        className={`bg-gradient-to-r text-lg font-semibold ${member.gradient} mb-2 bg-clip-text text-transparent`}
                      >
                        {member.role}
                      </p>
                      <p className="mb-4 text-sm text-cyan-600 dark:text-cyan-400">
                        {member.specialization}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {member.description}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <motion.a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-xl bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </motion.a>
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-xl bg-blue-50 p-3 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-800/30"
                      >
                        <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </motion.a>
                      <motion.a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-xl bg-pink-50 p-3 transition-colors hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-800/30"
                      >
                        <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
              <CardContent className="p-12 text-center">
                <motion.div
                  className="mb-6 flex items-center justify-center gap-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-4 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                    Join Our Team
                  </h2>
                </motion.div>
                <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                  Ready to help build the future of digital cities? We're always
                  looking for talented individuals to join the Unchainers team.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-500 hover:to-purple-700 dark:shadow-cyan-500/40">
                      <Mail className="mr-2 h-5 w-5" />
                      careers@overworked.city
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="rounded-2xl border-2 border-cyan-400/50 bg-transparent px-8 py-4 text-lg font-semibold text-gray-700 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 dark:border-cyan-400/70 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-900/10 dark:hover:text-cyan-400"
                      onClick={() => navigate("https://github.com/Unchainers")}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View Open Roles
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
