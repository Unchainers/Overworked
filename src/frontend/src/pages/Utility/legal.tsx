"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, Scale, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "Terms of Service",
      content: [
        {
          subtitle: "1. Acceptance of Terms",
          text: "By accessing and using Overworked, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          subtitle: "2. Use License",
          text: "Permission is granted to temporarily download one copy of Overworked materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
        },
        {
          subtitle: "3. User Account",
          text: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities under your account.",
        },
        {
          subtitle: "4. Prohibited Uses",
          text: "You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction including but not limited to copyright laws.",
        },
        {
          subtitle: "5. Content",
          text: "Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for content that you post to the service.",
        },
        {
          subtitle: "6. Termination",
          text: "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Privacy Policy",
      content: [
        {
          subtitle: "1. Information We Collect",
          text: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.",
        },
        {
          subtitle: "2. How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages.",
        },
        {
          subtitle: "3. Information Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
        },
        {
          subtitle: "4. Data Security",
          text: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          subtitle: "5. Cookies",
          text: "We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.",
        },
        {
          subtitle: "6. Your Rights",
          text: "You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.",
        },
      ],
    },
  ];

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

        {/* Additional floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className={`absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pb-20 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                Legal
              </h1>
            </motion.div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl dark:text-gray-300">
              Terms of Service & Privacy Policy for Overworked Platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-cyan-600 dark:text-cyan-400"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Last updated: January 2025</span>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-4xl space-y-16">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
            >
              <Card className="group border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
                <CardContent className="p-8 md:p-12">
                  <motion.div
                    className="mb-8 flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 transition-all duration-300 group-hover:shadow-cyan-500/40 dark:shadow-cyan-500/40 dark:group-hover:shadow-cyan-500/60">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                      {section.title}
                    </h2>
                  </motion.div>

                  <div className="space-y-8">
                    {section.content.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: sectionIndex * 0.2 + itemIndex * 0.1,
                        }}
                        className="space-y-3"
                        whileHover={{ x: 10 }}
                      >
                        <h3 className="text-xl font-semibold text-cyan-600 md:text-2xl dark:text-cyan-400">
                          {item.subtitle}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                          {item.text}
                        </p>
                        {itemIndex < section.content.length - 1 && (
                          <Separator className="mt-6 bg-gradient-to-r from-cyan-200 to-purple-200 dark:from-cyan-800 dark:to-purple-800" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-800/50 dark:bg-black/80">
              <CardContent className="p-8 text-center md:p-12">
                <motion.div
                  className="mb-6 flex items-center justify-center gap-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 p-3 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/40">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                    Questions?
                  </h2>
                </motion.div>
                <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  If you have any questions about these Terms of Service or
                  Privacy Policy, please contact our legal team.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/40"
                >
                  <Lock className="h-5 w-5" />
                  Contact Legal Team
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
