"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TownTalkSidebar } from "@/components/Town-Talk/town-talk-sidebar";
import { RichText } from "@/components/Town-Talk/rich-text";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Post {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
    isFollowing: boolean;
    isVerified: boolean;
  };
  content: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
    duration?: string;
  };
  description: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isSaved: boolean;
  };
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      username: "cryptoartist",
      displayName: "Crypto Artist",
      avatar: "/placeholder-user.jpg",
      isFollowing: false,
      isVerified: true,
    },
    content: {
      type: "image",
      url: "/images/placeholder/banner.png",
    },
    description:
      "Just minted my latest NFT collection! 🎨 Check out these amazing digital artworks created with AI and blockchain technology. What do you think @johndoe? #NFTArt #CryptoArt #DigitalCreation #Web3",
    stats: {
      likes: 1247,
      comments: 89,
      shares: 156,
      isLiked: false,
      isSaved: false,
    },
    timestamp: "2h",
  },
  {
    id: "2",
    user: {
      username: "web3dev",
      displayName: "Web3 Developer",
      avatar: "/placeholder-user.jpg",
      isFollowing: true,
      isVerified: true,
    },
    content: {
      type: "video",
      url: "/images/placeholder/video.mp4",
      thumbnail: "/images/placeholder/banner.png",
      duration: "1:24",
    },
    description:
      "Building the future of decentralized applications! 🚀 Here's a sneak peek of our new DeFi protocol that will revolutionize how we think about finance. Thanks to @cryptoartist for the inspiration! #DeFi #Web3 #Blockchain #Innovation #TechTalk",
    stats: {
      likes: 2156,
      comments: 234,
      shares: 445,
      isLiked: true,
      isSaved: true,
    },
    timestamp: "4h",
  },
  {
    id: "3",
    user: {
      username: "nftcollector",
      displayName: "NFT Collector",
      avatar: "/placeholder-user.jpg",
      isFollowing: false,
      isVerified: false,
    },
    content: {
      type: "image",
      url: "/images/placeholder/banner.png",
    },
    description:
      "My collection just hit 100 NFTs! 🎉 From rare CryptoPunks to amazing generative art, each piece tells a story. The future of digital ownership is here! #NFTCollection #CryptoPunks #DigitalArt",
    stats: {
      likes: 892,
      comments: 67,
      shares: 123,
      isLiked: false,
      isSaved: false,
    },
    timestamp: "6h",
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(post.stats.isLiked);
  const [isSaved, setIsSaved] = useState(post.stats.isSaved);
  const [isFollowing, setIsFollowing] = useState(post.user.isFollowing);
  const [likes, setLikes] = useState(post.stats.likes);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="snap-start"
    >
      <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-white via-cyan-50 to-purple-50 backdrop-blur-xl dark:border-gray-700/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-purple-900/90">
        {/* User Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="ring-gradient-to-r h-12 w-12 from-cyan-500 to-purple-600 ring-2">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                {post.user.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {post.user.displayName}
                </h3>
                {post.user.isVerified && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                    <span className="text-xs text-white">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @{post.user.username} • {post.timestamp}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
              className={
                isFollowing
                  ? "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
              }
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {post.content.type === "image" ? (
            <motion.img
              src={post.content.url}
              alt="Post content"
              className="aspect-square w-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="relative aspect-square">
              <video
                ref={videoRef}
                src={post.content.url}
                poster={post.content.thumbnail}
                className="h-full w-full cursor-pointer object-cover"
                onClick={handleVideoClick}
                muted={isMuted}
                loop
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  onClick={handleVideoClick}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="ml-1 h-6 w-6" />
                  )}
                </motion.button>
              </div>
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                {post.content.duration && (
                  <div className="rounded bg-black/50 px-2 py-1 text-xs text-white">
                    {post.content.duration}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleLike}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {likes.toLocaleString()}
                </span>
              </motion.button>
              <motion.button
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.stats.comments}
                </span>
              </motion.button>
              <motion.button
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.stats.shares}
                </span>
              </motion.button>
            </div>
            <motion.button
              onClick={() => setIsSaved(!isSaved)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark
                className={`h-6 w-6 ${isSaved ? "fill-yellow-500 text-yellow-500" : "text-gray-600 dark:text-gray-400"}`}
              />
            </motion.button>
          </div>

          {/* Description */}
          <RichText text={post.description} maxLength={120} />
        </div>
      </Card>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-white via-cyan-50 to-purple-50 backdrop-blur-xl dark:border-gray-700/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-purple-900/90">
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-3 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  );
}

export default function TownTalkPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add more mock posts
    const newPosts = mockPosts.map((post) => ({
      ...post,
      id: `${post.id}-${Date.now()}-${Math.random()}`,
    }));

    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);

    // Simulate end of content after 3 loads
    if (posts.length > 15) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        loadMorePosts();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore, posts.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-purple-50 dark:from-gray-900 dark:via-gray-800/30 dark:to-purple-900/30">
      <TownTalkSidebar />

      <div className="ml-72 min-h-screen">
        {/* Header */}

        <motion.div
          className="sticky top-0 z-30 border-b border-white/20 bg-gradient-to-r from-white/95 via-cyan-50/90 to-purple-50/95 backdrop-blur-xl dark:border-gray-700/50 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-purple-900/95"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-4">
            <h1 className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              For You
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Discover amazing content from the Overworked community
            </p>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div
          ref={containerRef}
          className="h-[calc(100vh-120px)] snap-y snap-mandatory overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="mx-auto max-w-md space-y-6 p-4">
            <AnimatePresence>
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </AnimatePresence>

            {loading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            )}

            {!hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  You've reached the end! 🎉
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
