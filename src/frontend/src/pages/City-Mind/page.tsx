"use client";

import { useState, useEffect } from "react";
import { ThoughtBubble } from "@/components/Bubble/thought-bubble";
import { CityMindHeader } from "@/components/Bubble/city-mind-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Thought {
  id: string;
  content: string;
  author: string;
  category: "trending" | "hot" | "top";
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}

const generateThoughts = (): Thought[] => [
  {
    id: "1",
    content:
      "The future of AI in creative industries is not about replacement, but about amplification of human creativity. We're entering an era of collaborative intelligence.",
    author: "techvisionary",
    category: "trending",
    likes: 342,
    comments: 89,
    timestamp: new Date(Date.now() - 1800000),
    tags: ["AI", "creativity", "future"],
  },
  {
    id: "2",
    content:
      "Just discovered this amazing productivity hack: time-blocking with color-coded themes. Game changer for managing multiple projects!",
    author: "productivityguru",
    category: "hot",
    likes: 156,
    comments: 34,
    timestamp: new Date(Date.now() - 3600000),
    tags: ["productivity", "timemanagement", "lifehacks"],
  },
  {
    id: "3",
    content:
      "Web3 isn't just about crypto. It's about reimagining digital ownership, privacy, and how we interact with the internet. The paradigm shift is real.",
    author: "web3pioneer",
    category: "top",
    likes: 789,
    comments: 156,
    timestamp: new Date(Date.now() - 7200000),
    tags: ["web3", "blockchain", "technology"],
  },
  {
    id: "4",
    content:
      "Remote work has taught us that culture isn't about ping pong tables and free snacks. It's about trust, communication, and shared values that transcend physical spaces.",
    author: "remoteworker",
    category: "trending",
    likes: 234,
    comments: 67,
    timestamp: new Date(Date.now() - 10800000),
    tags: ["remotework", "culture", "workplace"],
  },
  {
    id: "5",
    content:
      "Sustainable design isn't just a trend—it's a responsibility. Every pixel, every line of code should consider its environmental impact.",
    author: "ecodesigner",
    category: "hot",
    likes: 198,
    comments: 45,
    timestamp: new Date(Date.now() - 14400000),
    tags: ["sustainability", "design", "environment"],
  },
  {
    id: "6",
    content:
      "The best code is not the most clever code, but the most readable code. Future you will thank present you for clear, simple solutions.",
    author: "cleancodecoder",
    category: "top",
    likes: 567,
    comments: 123,
    timestamp: new Date(Date.now() - 18000000),
    tags: ["coding", "bestpractices", "development"],
  },
  {
    id: "7",
    content:
      "Mental health in tech isn't talked about enough. Burnout is real, imposter syndrome is common, and it's okay to not be okay sometimes.",
    author: "mentalhealthadvocate",
    category: "trending",
    likes: 445,
    comments: 89,
    timestamp: new Date(Date.now() - 21600000),
    tags: ["mentalhealth", "tech", "wellbeing"],
  },
  {
    id: "8",
    content:
      "The metaverse isn't about escaping reality—it's about extending it. Virtual collaboration spaces are revolutionizing how we work together.",
    author: "metaversetheorist",
    category: "hot",
    likes: 312,
    comments: 78,
    timestamp: new Date(Date.now() - 25200000),
    tags: ["metaverse", "collaboration", "virtual"],
  },
  {
    id: "9",
    content:
      "Open source is the backbone of modern technology. Contributing to open source isn't just about code—it's about building the future together.",
    author: "opensourceadvocate",
    category: "top",
    likes: 623,
    comments: 134,
    timestamp: new Date(Date.now() - 28800000),
    tags: ["opensource", "community", "collaboration"],
  },
  {
    id: "10",
    content:
      "Data privacy should be a human right, not a premium feature. We need to demand better from the platforms we use every day.",
    author: "privacywarrior",
    category: "trending",
    likes: 389,
    comments: 92,
    timestamp: new Date(Date.now() - 32400000),
    tags: ["privacy", "data", "rights"],
  },
  {
    id: "11",
    content:
      "The intersection of art and technology is where magic happens. Creative coding is opening new frontiers for digital expression.",
    author: "creativecoder",
    category: "hot",
    likes: 267,
    comments: 56,
    timestamp: new Date(Date.now() - 36000000),
    tags: ["art", "technology", "creativity"],
  },
  {
    id: "12",
    content:
      "Accessibility isn't an afterthought—it's a fundamental design principle. Building inclusive experiences benefits everyone, not just those with disabilities.",
    author: "a11yadvocate",
    category: "top",
    likes: 534,
    comments: 98,
    timestamp: new Date(Date.now() - 39600000),
    tags: ["accessibility", "inclusion", "design"],
  },
];

export default function CityMindLivePage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [filteredThoughts, setFilteredThoughts] = useState<Thought[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "trending" | "hot" | "top"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize with thoughts
    const initialThoughts = generateThoughts();
    setThoughts(initialThoughts);
    setFilteredThoughts(initialThoughts);
  }, []);

  useEffect(() => {
    // Filter thoughts based on active filter and search query
    let filtered = thoughts;

    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (thought) => thought.category === activeFilter,
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (thought) =>
          thought.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thought.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thought.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    setFilteredThoughts(filtered);
  }, [thoughts, activeFilter, searchQuery]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newThoughts = generateThoughts();
      setThoughts(newThoughts);
      setIsLoading(false);
    }, 1000);
  };

  const getBubbleSize = (index: number): "small" | "medium" | "large" => {
    const sizes: ("small" | "medium" | "large")[] = [
      "medium",
      "small",
      "large",
      "medium",
      "small",
      "medium",
      "large",
      "small",
    ];
    return sizes[index % sizes.length];
  };

  return (
    <div className="from-ow-white via-ow-white to-ow-aqua/5 dark:from-ow-black dark:via-ow-black dark:to-ow-purple/5 min-h-screen bg-gradient-to-br">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="from-ow-aqua/8 to-ow-purple/8 absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-purple/8 to-ow-gold/8 animation-delay-2000 absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-gold/5 to-ow-aqua/5 animation-delay-4000 absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br blur-3xl" />

        {/* Floating Gradient Orbs */}
        <div className="from-ow-aqua/15 to-ow-purple/15 animate-float absolute left-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="from-ow-purple/15 to-ow-gold/15 animate-float animation-delay-2000 absolute bottom-20 right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="from-ow-gold/15 to-ow-aqua/15 animate-float animation-delay-4000 absolute right-1/4 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="from-ow-aqua/12 to-ow-gold/12 animate-float animation-delay-1000 absolute bottom-1/3 left-1/4 h-28 w-28 rounded-full bg-gradient-to-br blur-2xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <CityMindHeader
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content */}
        <div className="mx-auto max-w-7xl p-6">
          {/* Controls */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="from-ow-aqua via-ow-purple to-ow-gold bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                {activeFilter === "all"
                  ? "All Thoughts"
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Thoughts`}
              </h2>
              <span className="text-muted-foreground font-medium">
                {filteredThoughts.length} thoughts
              </span>
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              className="from-ow-aqua via-ow-purple to-ow-gold hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90 text-ow-white rounded-xl bg-gradient-to-r px-6 py-2 font-semibold shadow-lg"
            >
              <RefreshCw
                className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")}
              />
              Refresh
            </Button>
          </div>

          {/* Thoughts Grid */}
          {filteredThoughts.length > 0 ? (
            <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredThoughts.map((thought, index) => (
                <div
                  key={thought.id}
                  className={cn(
                    "flex justify-center",
                    index % 7 === 0 && "md:col-span-2 lg:col-span-1",
                    index % 11 === 0 && "lg:col-span-2 xl:col-span-1",
                  )}
                >
                  <ThoughtBubble
                    thought={thought}
                    size={getBubbleSize(index)}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="from-ow-aqua/20 to-ow-purple/20 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br">
                <Plus className="text-muted-foreground h-12 w-12" />
              </div>
              <h3 className="text-muted-foreground mb-2 text-xl font-semibold">
                No thoughts found
              </h3>
              <p className="text-muted-foreground max-w-md text-center">
                {searchQuery
                  ? `No thoughts match your search for "${searchQuery}". Try different keywords or clear your search.`
                  : "No thoughts available for this filter. Try selecting a different category."}
              </p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <Button className="from-ow-aqua via-ow-purple to-ow-gold hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90 hover:shadow-3xl text-ow-white fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r shadow-2xl transition-all duration-300">
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
