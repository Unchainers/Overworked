"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, Headphones, Users, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      value: "support@overworked.city",
      color: "from-cyan-400 to-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Available 24/7",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      value: "+1 (555) 123-4567",
      color: "from-yellow-400 to-orange-600",
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      value: "Digital City, Web3 District",
      color: "from-cyan-400 to-teal-600",
    },
  ]

  const supportCategories = [
    { icon: Headphones, title: "Technical Support", description: "Platform issues and bugs" },
    { icon: Users, title: "Account Help", description: "Login and account management" },
    { icon: Zap, title: "Feature Request", description: "Suggest new features" },
    { icon: MessageSquare, title: "General Inquiry", description: "Other questions" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
        <Navbar/>
      {/* Animated Background */}
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

        {/* Message bubbles animation */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
            className={`absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-sm`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
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
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                Contact
              </h1>
            </motion.div>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get in touch with the Overworked support team. We're here to help you succeed in the digital city.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${info.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{info.description}</p>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{info.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div
                    className="flex items-center gap-3 mb-8"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Send Message</h2>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          required
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className="h-12 border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What's this about?"
                        className="h-12 border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                          <SelectItem
                            value="technical"
                            className="text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                          >
                            Technical Support
                          </SelectItem>
                          <SelectItem
                            value="account"
                            className="text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                          >
                            Account Help
                          </SelectItem>
                          <SelectItem
                            value="feature"
                            className="text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                          >
                            Feature Request
                          </SelectItem>
                          <SelectItem
                            value="general"
                            className="text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                          >
                            General Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-32 resize-none border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Categories & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Support Categories */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Support Categories</h3>
                  </motion.div>

                  <div className="space-y-4">
                    {supportCategories.map((category, index) => (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600">
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{category.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-600 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Response Times</h3>
                  </motion.div>

                  <div className="space-y-4">
                    {[
                      { label: "Email Support", time: "< 24 hours", color: "text-cyan-600 dark:text-cyan-400" },
                      { label: "Live Chat", time: "< 5 minutes", color: "text-purple-600 dark:text-purple-400" },
                      { label: "Phone Support", time: "Immediate", color: "text-yellow-600 dark:text-yellow-400" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                        <span className={`${item.color} font-semibold`}>{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
