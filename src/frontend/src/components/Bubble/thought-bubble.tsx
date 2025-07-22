"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share,
  TrendingUp,
  Flame,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThoughtBubbleProps {
  thought: {
    id: string;
    content: string;
    author: string;
    category: "trending" | "hot" | "top";
    likes: number;
    comments: number;
    timestamp: Date;
    tags: string[];
  };
  size?: "small" | "medium" | "large";
  delay?: number;
}

const categoryIcons = {
  trending: TrendingUp,
  hot: Flame,
  top: Star,
};

const categoryColors = {
  trending: "from-ow-aqua to-ow-purple",
  hot: "from-red-400 to-orange-500",
  top: "from-ow-gold to-ow-purple",
};

const sizeClasses = {
  small: "w-48 h-32 text-xs",
  medium: "w-64 h-40 text-sm",
  large: "w-80 h-48 text-base",
};

export function ThoughtBubble({
  thought,
  size = "medium",
  delay = 0,
}: ThoughtBubbleProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(thought.likes);

  const CategoryIcon = categoryIcons[thought.category];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className={cn(
        "group relative cursor-pointer rounded-3xl border-2 p-6 shadow-xl backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:shadow-2xl",
        sizeClasses[size],
        "from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80 bg-gradient-to-br",
        "border-gradient-to-r from-ow-aqua/30 via-ow-purple/30 to-ow-gold/30",
        "hover:border-gradient-to-r hover:from-ow-aqua/50 hover:via-ow-purple/50 hover:to-ow-gold/50",
        isVisible
          ? "animate-in slide-in-from-bottom-4 fade-in duration-700"
          : "translate-y-4 opacity-0",
      )}
    >
      {/* Category Badge */}
      <div className="absolute -right-3 -top-3">
        <Badge
          className={cn(
            "text-ow-white border-0 bg-gradient-to-r px-3 py-1 font-bold shadow-lg",
            categoryColors[thought.category],
          )}
        >
          <CategoryIcon className="mr-1 h-3 w-3" />
          {thought.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex h-full flex-col">
        <div className="mb-4 flex-1">
          <p className="text-foreground group-hover:text-gradient-to-r group-hover:from-ow-aqua group-hover:to-ow-purple line-clamp-4 font-medium leading-relaxed transition-all duration-300">
            {thought.content}
          </p>
        </div>

        {/* Author */}
        <div className="mb-3">
          <p className="from-ow-purple to-ow-gold bg-gradient-to-r bg-clip-text text-xs font-semibold text-transparent">
            @{thought.author}
          </p>
          <p className="text-muted-foreground text-xs">
            {thought.timestamp.toLocaleDateString()}
          </p>
        </div>

        {/* Tags */}
        {thought.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {thought.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="from-ow-aqua/10 to-ow-purple/10 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 text-foreground bg-gradient-to-r px-2 py-0 text-xs"
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
                "h-8 rounded-full px-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20",
                isLiked &&
                  "bg-gradient-to-r from-red-400/20 to-red-500/20 text-red-500",
              )}
            >
              <Heart
                className={cn("mr-1 h-3 w-3", isLiked && "fill-current")}
              />
              <span className="text-xs font-semibold">{currentLikes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:from-ow-aqua/20 hover:to-ow-purple/20 h-8 rounded-full px-2 hover:bg-gradient-to-r"
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              <span className="text-xs font-semibold">{thought.comments}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-gold/20 hover:to-ow-purple/20 h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Share className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="from-ow-aqua to-ow-purple absolute -left-2 -top-2 h-4 w-4 animate-ping rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="from-ow-gold to-ow-purple animation-delay-200 absolute -bottom-2 -right-2 h-3 w-3 animate-ping rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
