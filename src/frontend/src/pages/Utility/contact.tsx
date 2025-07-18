"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Send,
  Headphones,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

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
  ];

  const supportCategories = [
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Platform issues and bugs",
    },
    {
      icon: Users,
      title: "Account Help",
      description: "Login and account management",
    },
    {
      icon: Zap,
      title: "Feature Request",
      description: "Suggest new features",
    },
    {
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Other questions",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      <Navbar />
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
            className={`absolute h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
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
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                Contact
              </h1>
            </motion.div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl dark:text-gray-300">
              Get in touch with the Overworked support team. We're here to help
              you succeed in the digital city.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="group border border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-gray-800/50 dark:bg-black/80 dark:hover:shadow-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`inline-flex rounded-2xl bg-gradient-to-r p-3 ${info.color} mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <info.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {info.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                      {info.description}
                    </p>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                      {info.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
                <CardContent className="p-8">
                  <motion.div
                    className="mb-8 flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Send Message
                    </h2>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          className="h-12 border-gray-300 bg-white text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-cyan-400"
                          required
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          className="h-12 border-gray-300 bg-white text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-cyan-400"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Subject
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        placeholder="What's this about?"
                        className="h-12 border-gray-300 bg-white text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-cyan-400"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
                          <SelectItem
                            value="technical"
                            className="text-gray-900 hover:bg-cyan-50 dark:text-white dark:hover:bg-cyan-900/20"
                          >
                            Technical Support
                          </SelectItem>
                          <SelectItem
                            value="account"
                            className="text-gray-900 hover:bg-cyan-50 dark:text-white dark:hover:bg-cyan-900/20"
                          >
                            Account Help
                          </SelectItem>
                          <SelectItem
                            value="feature"
                            className="text-gray-900 hover:bg-cyan-50 dark:text-white dark:hover:bg-cyan-900/20"
                          >
                            Feature Request
                          </SelectItem>
                          <SelectItem
                            value="general"
                            className="text-gray-900 hover:bg-cyan-50 dark:text-white dark:hover:bg-cyan-900/20"
                          >
                            General Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-32 resize-none border-gray-300 bg-white text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-cyan-400"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-500 hover:to-purple-700 dark:shadow-cyan-500/40"
                      >
                        <Send className="mr-2 h-5 w-5" />
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
              <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
                <CardContent className="p-8">
                  <motion.div
                    className="mb-6 flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 p-3 shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Support Categories
                    </h3>
                  </motion.div>

                  <div className="space-y-4">
                    {supportCategories.map((category, index) => (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="flex cursor-pointer items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                      >
                        <div className="rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600 p-2">
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {category.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
                <CardContent className="p-8">
                  <motion.div
                    className="mb-6 flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-600 p-3 shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Response Times
                    </h3>
                  </motion.div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Email Support",
                        time: "< 24 hours",
                        color: "text-cyan-600 dark:text-cyan-400",
                      },
                      {
                        label: "Live Chat",
                        time: "< 5 minutes",
                        color: "text-purple-600 dark:text-purple-400",
                      },
                      {
                        label: "Phone Support",
                        time: "Immediate",
                        color: "text-yellow-600 dark:text-yellow-400",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className={`${item.color} font-semibold`}>
                          {item.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
