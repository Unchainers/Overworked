"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, TrendingUp, Flame, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThoughtBubbleProps {
  thought: {
    id: string
    content: string
    author: string
    category: "trending" | "hot" | "top"
    likes: number
    comments: number
    timestamp: Date
    tags: string[]
  }
  size?: "small" | "medium" | "large"
  delay?: number
}

const categoryIcons = {
  trending: TrendingUp,
  hot: Flame,
  top: Star,
}

const categoryColors = {
  trending: "from-ow-aqua to-ow-purple",
  hot: "from-red-400 to-orange-500",
  top: "from-ow-gold to-ow-purple",
}

const sizeClasses = {
  small: "w-48 h-32 text-xs",
  medium: "w-64 h-40 text-sm",
  large: "w-80 h-48 text-base",
}

export function ThoughtBubble({ thought, size = "medium", delay = 0 }: ThoughtBubbleProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(thought.likes)

  const CategoryIcon = categoryIcons[thought.category]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div
      className={cn(
        "relative p-6 rounded-3xl backdrop-blur-xl border-2 transition-all duration-700 hover:scale-105 cursor-pointer group shadow-xl hover:shadow-2xl",
        sizeClasses[size],
        "bg-gradient-to-br from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80",
        "border-gradient-to-r from-ow-aqua/30 via-ow-purple/30 to-ow-gold/30",
        "hover:border-gradient-to-r hover:from-ow-aqua/50 hover:via-ow-purple/50 hover:to-ow-gold/50",
        isVisible ? "animate-in slide-in-from-bottom-4 fade-in duration-700" : "opacity-0 translate-y-4",
      )}
    >
      {/* Category Badge */}
      <div className="absolute -top-3 -right-3">
        <Badge
          className={cn(
            "bg-gradient-to-r text-ow-white border-0 font-bold px-3 py-1 shadow-lg",
            categoryColors[thought.category],
          )}
        >
          <CategoryIcon className="h-3 w-3 mr-1" />
          {thought.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 mb-4">
          <p className="font-medium leading-relaxed text-foreground line-clamp-4 group-hover:text-gradient-to-r group-hover:from-ow-aqua group-hover:to-ow-purple transition-all duration-300">
            {thought.content}
          </p>
        </div>

        {/* Author */}
        <div className="mb-3">
          <p className="text-xs font-semibold bg-gradient-to-r from-ow-purple to-ow-gold bg-clip-text text-transparent">
            @{thought.author}
          </p>
          <p className="text-xs text-muted-foreground">{thought.timestamp.toLocaleDateString()}</p>
        </div>

        {/* Tags */}
        {thought.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {thought.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-0 bg-gradient-to-r from-ow-aqua/10 to-ow-purple/10 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 text-foreground"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 px-2 hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20 rounded-full transition-all duration-300",
                isLiked && "text-red-500 bg-gradient-to-r from-red-400/20 to-red-500/20",
              )}
            >
              <Heart className={cn("h-3 w-3 mr-1", isLiked && "fill-current")} />
              <span className="text-xs font-semibold">{currentLikes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              <span className="text-xs font-semibold">{thought.comments}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-ow-gold/20 hover:to-ow-purple/20 rounded-full"
          >
            <Share className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-ow-aqua to-ow-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
      <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-ow-gold to-ow-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping animation-delay-200" />
    </div>
  )
}
