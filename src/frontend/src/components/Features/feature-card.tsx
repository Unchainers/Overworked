"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  href: string;
  status: "live" | "beta" | "coming-soon";
  features: string[];
  index: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  gradient,
  href,
  status,
  features,
  index,
}: FeatureCardProps) {
  const statusColors = {
    live: "bg-gradient-to-r from-green-500 to-emerald-500",
    beta: "bg-gradient-to-r from-ow-aqua to-ow-purple",
    "coming-soon": "bg-gradient-to-r from-ow-gold to-orange-500",
  };

  const statusText = {
    live: "Live",
    beta: "Beta",
    "coming-soon": "Coming Soon",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg transition-all duration-500 hover:from-white/20 hover:to-white/10">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 ${gradient} opacity-10 transition-opacity duration-500 group-hover:opacity-20`}
        />

        {/* Floating Orbs */}
        <div className="from-ow-aqua/20 to-ow-purple/20 absolute -right-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br blur-xl" />
        <div className="from-ow-gold/20 to-ow-purple/20 animation-delay-2000 absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br blur-xl" />

        <CardContent className="relative p-8">
          {/* Status Badge */}
          <div className="mb-6 flex items-start justify-between">
            <div
              className={`rounded-2xl p-4 ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              {icon}
            </div>
            <Badge
              className={`${statusColors[status]} border-0 px-3 py-1 font-semibold text-white`}
            >
              {statusText[status]}
            </Badge>
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h3 className="from-ow-purple to-ow-aqua mb-3 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className="text-ow-gold mb-3 flex items-center gap-2 text-sm font-semibold">
              <Star className="h-4 w-4" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="text-muted-foreground flex items-center gap-3 text-sm"
                >
                  <div className="from-ow-aqua to-ow-purple h-1.5 w-1.5 rounded-full bg-gradient-to-r" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <a href={href}>
            <Button
              className="from-ow-purple to-ow-aqua hover:from-ow-aqua hover:to-ow-purple group-hover:shadow-ow-purple/25 w-full border-0 bg-gradient-to-r text-white transition-all duration-300 group-hover:shadow-lg"
              size="lg"
            >
              <span>Explore {title}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
