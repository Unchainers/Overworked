"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, Zap, Globe } from "lucide-react"

export function FeaturesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ow-black via-ow-black/95 to-ow-black">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-ow-aqua/30 to-ow-purple/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-ow-purple/30 to-ow-gold/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-ow-gold/30 to-ow-aqua/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,196,207,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,196,207,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="bg-gradient-to-r from-ow-aqua to-ow-purple text-white border-0 px-6 py-2 text-lg font-semibold">
              <Sparkles className="w-5 h-5 mr-2" />
              All Features
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-ow-white via-ow-aqua to-ow-purple bg-clip-text text-transparent animate-gradient-x">
              Discover
            </span>
            <br />
            <span className="bg-gradient-to-r from-ow-purple via-ow-gold to-ow-aqua bg-clip-text text-transparent animate-gradient-x">
              Everything
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-ow-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Explore all the powerful features that make Overworked the ultimate platform for
            <span className="text-ow-aqua font-semibold"> learning</span>,
            <span className="text-ow-purple font-semibold"> competing</span>, and
            <span className="text-ow-gold font-semibold"> connecting</span>.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ow-white/60 w-5 h-5" />
              <Input
                placeholder="Search features, modules, or capabilities..."
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-ow-aqua focus:ring-ow-aqua/50 backdrop-blur-lg"
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
              <div className="p-3 rounded-full bg-gradient-to-r from-ow-aqua to-ow-purple">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-ow-aqua">6+</div>
                <div className="text-sm text-ow-white/60">Core Modules</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-ow-purple to-ow-gold">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-ow-purple">50+</div>
                <div className="text-sm text-ow-white/60">Features</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-ow-gold to-ow-aqua">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-ow-gold">∞</div>
                <div className="text-sm text-ow-white/60">Possibilities</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
