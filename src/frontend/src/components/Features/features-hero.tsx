"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Zap, Globe } from "lucide-react";

export function FeaturesHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="from-ow-black via-ow-black/95 to-ow-black absolute inset-0 bg-gradient-to-br">
        {/* Floating Orbs */}
        <div className="from-ow-aqua/30 to-ow-purple/30 animate-blob absolute left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-purple/30 to-ow-gold/30 animate-blob animation-delay-2000 absolute right-20 top-40 h-96 w-96 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-gold/30 to-ow-aqua/30 animate-blob animation-delay-4000 absolute bottom-20 left-1/2 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,196,207,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,196,207,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="from-ow-aqua to-ow-purple border-0 bg-gradient-to-r px-6 py-2 text-lg font-semibold text-white">
              <Sparkles className="mr-2 h-5 w-5" />
              All Features
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-6xl font-bold leading-tight md:text-8xl"
          >
            <span className="from-ow-white via-ow-aqua to-ow-purple animate-gradient-x bg-gradient-to-r bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            <span className="from-ow-purple via-ow-gold to-ow-aqua animate-gradient-x bg-gradient-to-r bg-clip-text text-transparent">
              Everything
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ow-white/80 mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl"
          >
            Explore all the powerful features that make Overworked the ultimate
            platform for
            <span className="text-ow-aqua font-semibold"> learning</span>,
            <span className="text-ow-purple font-semibold"> competing</span>,
            and
            <span className="text-ow-gold font-semibold"> connecting</span>.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mb-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="text-ow-white/60 absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
              <Input
                placeholder="Search features, modules, or capabilities..."
                className="focus:border-ow-aqua focus:ring-ow-aqua/50 border-white/20 bg-white/10 py-4 pl-12 pr-4 text-lg text-white backdrop-blur-lg placeholder:text-white/60"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-3">
              <div className="from-ow-aqua to-ow-purple rounded-full bg-gradient-to-r p-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-ow-aqua text-2xl font-bold">6+</div>
                <div className="text-ow-white/60 text-sm">Core Modules</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="from-ow-purple to-ow-gold rounded-full bg-gradient-to-r p-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-ow-purple text-2xl font-bold">50+</div>
                <div className="text-ow-white/60 text-sm">Features</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="from-ow-gold to-ow-aqua rounded-full bg-gradient-to-r p-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-ow-gold text-2xl font-bold">∞</div>
                <div className="text-ow-white/60 text-sm">Possibilities</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
