"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  href: string
  status: "live" | "beta" | "coming-soon"
  features: string[]
  index: number
}

export function FeatureCard({ title, description, icon, gradient, href, status, features, index }: FeatureCardProps) {
  const statusColors = {
    live: "bg-gradient-to-r from-green-500 to-emerald-500",
    beta: "bg-gradient-to-r from-ow-aqua to-ow-purple",
    "coming-soon": "bg-gradient-to-r from-ow-gold to-orange-500",
  }

  const statusText = {
    live: "Live",
    beta: "Beta",
    "coming-soon": "Coming Soon",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg hover:from-white/20 hover:to-white/10 transition-all duration-500">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        />

        {/* Floating Orbs */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-ow-aqua/20 to-ow-purple/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-ow-gold/20 to-ow-purple/20 rounded-full blur-xl animate-pulse animation-delay-2000" />

        <CardContent className="relative p-8">
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-4 rounded-2xl ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            <Badge className={`${statusColors[status]} text-white border-0 px-3 py-1 font-semibold`}>
              {statusText[status]}
            </Badge>
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-ow-purple to-ow-aqua bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-ow-gold mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-ow-aqua to-ow-purple" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <a href={href}>
            <Button
              className="w-full bg-gradient-to-r from-ow-purple to-ow-aqua hover:from-ow-aqua hover:to-ow-purple text-white border-0 group-hover:shadow-lg group-hover:shadow-ow-purple/25 transition-all duration-300"
              size="lg"
            >
              <span>Explore {title}</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}
