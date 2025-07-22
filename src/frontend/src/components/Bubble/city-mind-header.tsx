"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Flame, Star, Zap, Brain, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface CityMindHeaderProps {
  activeFilter: "all" | "trending" | "hot" | "top"
  onFilterChange: (filter: "all" | "trending" | "hot" | "top") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function CityMindHeader({ activeFilter, onFilterChange, searchQuery, onSearchChange }: CityMindHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filters = [
    { id: "all" as const, label: "All Thoughts", icon: Globe, color: "from-ow-aqua to-ow-purple" },
    { id: "trending" as const, label: "Trending", icon: TrendingUp, color: "from-ow-aqua to-ow-purple" },
    { id: "hot" as const, label: "Hot", icon: Flame, color: "from-red-400 to-orange-500" },
    { id: "top" as const, label: "Top", icon: Star, color: "from-ow-gold to-ow-purple" },
  ]

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-ow-white/90 via-ow-white/95 to-ow-white/90 dark:from-ow-black/90 dark:via-ow-black/95 dark:to-ow-black/90 backdrop-blur-xl border-b border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold rounded-2xl shadow-lg">
              <Brain className="h-8 w-8 text-ow-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold bg-clip-text text-transparent">
              CityMind Live
            </h1>
          </div>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Discover the pulse of Overworked community. Explore trending thoughts, hot discussions, and top insights
            from minds around the world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search thoughts, topics, or users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                "pl-12 pr-4 py-3 text-sm bg-gradient-to-r from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 border-2 rounded-xl transition-all duration-300 font-medium shadow-lg",
                isSearchFocused
                  ? "border-gradient-to-r from-ow-aqua/50 to-ow-purple/50 ring-4 ring-gradient-to-r from-ow-aqua/20 to-ow-purple/20"
                  : "border-gradient-to-r from-ow-aqua/30 to-ow-purple/30",
              )}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {filters.map((filter) => {
              const FilterIcon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => onFilterChange(filter.id)}
                  className={cn(
                    "h-11 px-4 font-semibold transition-all duration-300 rounded-xl shadow-lg",
                    activeFilter === filter.id
                      ? `bg-gradient-to-r ${filter.color} text-ow-white border-0 shadow-xl`
                      : `bg-gradient-to-r from-ow-white/80 to-ow-white/90 dark:from-ow-black/80 dark:to-ow-black/90 border-2 border-gradient-to-r ${filter.color.replace("to-", "to-").replace("from-", "from-")}/30 hover:${filter.color.replace("to-", "to-").replace("from-", "from-")}/20`,
                  )}
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              )
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-ow-aqua to-ow-purple text-ow-white border-0 font-bold px-3 py-2">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <div className="text-sm text-muted-foreground font-medium">
              <span className="font-bold text-foreground">2.4k</span> active minds
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
