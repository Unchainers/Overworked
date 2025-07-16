"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Users, Code, Palette, Database, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Lead Developer & Founder",
      specialization: "Full-Stack Development",
      description: "Visionary behind Overworked, specializing in Web3 integration and blockchain architecture.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/alexchen",
        linkedin: "https://linkedin.com/in/alexchen",
        instagram: "https://instagram.com/alexchen_dev",
      },
      skills: ["React", "Next.js", "Solidity", "ICP", "TypeScript"],
      icon: Code,
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      name: "Sarah Martinez",
      role: "UI/UX Designer",
      specialization: "Design Systems",
      description: "Creative force behind Overworked's elegant interface and user experience design.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/sarahmartinez",
        linkedin: "https://linkedin.com/in/sarahmartinez",
        instagram: "https://instagram.com/sarah_designs",
      },
      skills: ["Figma", "Adobe Creative Suite", "Design Systems", "Prototyping", "User Research"],
      icon: Palette,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Marcus Johnson",
      role: "Backend Engineer",
      specialization: "Blockchain Integration",
      description: "Expert in distributed systems and blockchain technology, ensuring Overworked's Web3 capabilities.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/marcusjohnson",
        linkedin: "https://linkedin.com/in/marcusjohnson",
        instagram: "https://instagram.com/marcus_codes",
      },
      skills: ["Node.js", "Rust", "ICP Canisters", "GraphQL", "Microservices"],
      icon: Database,
      gradient: "from-yellow-400 to-orange-600",
    },
    {
      name: "Emily Zhang",
      role: "Security Engineer",
      specialization: "Web3 Security",
      description: "Ensures the platform's security and smart contract auditing for a safe digital city experience.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/emilyzhang",
        linkedin: "https://linkedin.com/in/emilyzhang",
        instagram: "https://instagram.com/emily_security",
      },
      skills: ["Smart Contract Auditing", "Penetration Testing", "Cryptography", "Security Architecture"],
      icon: Shield,
      gradient: "from-cyan-400 to-teal-600",
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      specialization: "Infrastructure",
      description: "Manages cloud infrastructure and deployment pipelines for seamless platform operations.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim",
        instagram: "https://instagram.com/david_devops",
      },
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
      icon: Zap,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Lisa Rodriguez",
      role: "Product Manager",
      specialization: "Strategy & Growth",
      description: "Drives product strategy and user growth, connecting creators with the Overworked ecosystem.",
      avatar: "/placeholder.svg?height=300&width=300",
      social: {
        github: "https://github.com/lisarodriguez",
        linkedin: "https://linkedin.com/in/lisarodriguez",
        instagram: "https://instagram.com/lisa_product",
      },
      skills: ["Product Strategy", "User Analytics", "Growth Hacking", "Market Research", "Agile"],
      icon: Users,
      gradient: "from-yellow-400 to-orange-600",
    },
  ]

  const stats = [
    { label: "Team Members", value: "6", icon: Users },
    { label: "Years Experience", value: "25+", icon: Code },
    { label: "Projects Delivered", value: "50+", icon: Zap },
    { label: "Happy Users", value: "10K+", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background */}
      <Navbar/>
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
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 dark:from-cyan-400/20 dark:to-purple-600/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-yellow-400/10 dark:from-purple-500/20 dark:to-yellow-400/20 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300/8 to-purple-400/8 dark:from-cyan-300/15 dark:to-purple-400/15 rounded-full blur-2xl"
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
            className={`absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-sm`}
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                Team
              </h1>
            </motion.div>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Meet the Unchainers - the brilliant minds behind Overworked's digital city revolution
            </p>
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 dark:from-cyan-400/20 dark:to-purple-600/20 rounded-full border border-cyan-400/30 dark:border-cyan-400/50"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                Unchainers Team
              </span>
            </motion.div>
          </motion.div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 transition-all duration-500 group">
                  <CardContent className="p-8">
                    {/* Avatar and Role Icon */}
                    <div className="relative mb-6">
                      <motion.div
                        className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                      </motion.div>
                      <motion.div
                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 p-2 rounded-xl bg-gradient-to-r ${member.gradient} shadow-lg`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <member.icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-6">
                      <motion.h3
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {member.name}
                      </motion.h3>
                      <p
                        className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}
                      >
                        {member.role}
                      </p>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-4">{member.specialization}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{member.description}</p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="px-3 py-1 text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 rounded-full"
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
                        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </motion.a>
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </motion.a>
                      <motion.a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-800/30 transition-colors"
                      >
                        <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
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
      <section className="pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-12 text-center">
                <motion.div
                  className="flex items-center justify-center gap-4 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Join Our Team</h2>
                </motion.div>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Ready to help build the future of digital cities? We're always looking for talented individuals to
                  join the Unchainers team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-semibold rounded-2xl text-lg shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                      <Mail className="w-5 h-5 mr-2" />
                      careers@overworked.city
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="px-8 py-4 border-2 border-cyan-400/50 dark:border-cyan-400/70 hover:border-cyan-500 dark:hover:border-cyan-400 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold rounded-2xl text-lg bg-transparent hover:bg-cyan-50 dark:hover:bg-cyan-900/10"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Open Roles
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
