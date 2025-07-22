"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  TrendingUp,
  Flame,
  Star,
  Zap,
  Brain,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CityMindHeaderProps {
  activeFilter: "all" | "trending" | "hot" | "top";
  onFilterChange: (filter: "all" | "trending" | "hot" | "top") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CityMindHeader({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: CityMindHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filters = [
    {
      id: "all" as const,
      label: "All Thoughts",
      icon: Globe,
      color: "from-ow-aqua to-ow-purple",
    },
    {
      id: "trending" as const,
      label: "Trending",
      icon: TrendingUp,
      color: "from-ow-aqua to-ow-purple",
    },
    {
      id: "hot" as const,
      label: "Hot",
      icon: Flame,
      color: "from-red-400 to-orange-500",
    },
    {
      id: "top" as const,
      label: "Top",
      icon: Star,
      color: "from-ow-gold to-ow-purple",
    },
  ];

  return (
    <div className="from-ow-white/90 via-ow-white/95 to-ow-white/90 dark:from-ow-black/90 dark:via-ow-black/95 dark:to-ow-black/90 border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 sticky top-0 z-50 border-b bg-gradient-to-r p-6 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="from-ow-aqua via-ow-purple to-ow-gold rounded-2xl bg-gradient-to-r p-3 shadow-lg">
              <Brain className="text-ow-white h-8 w-8" />
            </div>
            <h1 className="from-ow-aqua via-ow-purple to-ow-gold bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              CityMind Live
            </h1>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg font-medium">
            Discover the pulse of Overworked community. Explore trending
            thoughts, hot discussions, and top insights from minds around the
            world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Search Bar */}
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              type="text"
              placeholder="Search thoughts, topics, or users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                "from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 rounded-xl border-2 bg-gradient-to-r py-3 pl-12 pr-4 text-sm font-medium shadow-lg transition-all duration-300",
                isSearchFocused
                  ? "border-gradient-to-r from-ow-aqua/50 to-ow-purple/50 ring-gradient-to-r from-ow-aqua/20 to-ow-purple/20 ring-4"
                  : "border-gradient-to-r from-ow-aqua/30 to-ow-purple/30",
              )}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const FilterIcon = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => onFilterChange(filter.id)}
                  className={cn(
                    "h-11 rounded-xl px-4 font-semibold shadow-lg transition-all duration-300",
                    activeFilter === filter.id
                      ? `bg-gradient-to-r ${filter.color} text-ow-white border-0 shadow-xl`
                      : `from-ow-white/80 to-ow-white/90 dark:from-ow-black/80 dark:to-ow-black/90 border-gradient-to-r border-2 bg-gradient-to-r ${filter.color.replace("to-", "to-").replace("from-", "from-")}/30 hover:${filter.color.replace("to-", "to-").replace("from-", "from-")}/20`,
                  )}
                >
                  <FilterIcon className="mr-2 h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <Badge className="from-ow-aqua to-ow-purple text-ow-white border-0 bg-gradient-to-r px-3 py-2 font-bold">
              <Zap className="mr-1 h-3 w-3" />
              Live
            </Badge>
            <div className="text-muted-foreground text-sm font-medium">
              <span className="text-foreground font-bold">2.4k</span> active
              minds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
