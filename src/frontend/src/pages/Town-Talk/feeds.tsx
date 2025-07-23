"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Verified,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { TownTalkSidebar } from "@/components/Town-Talk/town-talk-sidebar";
import { RichText } from "@/components/Town-Talk/rich-text";
import { CommentSection } from "@/components/Town-Talk/comment-section";
import { ShareSection } from "@/components/Town-Talk/share-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
    isFollowing: boolean;
  };
  content: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  description: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  isLiked: boolean;
  isSaved: boolean;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      username: "sarah_creates",
      displayName: "Sarah Johnson",
      avatar: "/images/placeholder/avatar.png",
      isVerified: true,
      isFollowing: false,
    },
    content: {
      type: "image",
      url: "/images/placeholder/banner.png",
    },
    description:
      "Just finished my latest #NFTArt piece! 🎨 Inspired by the digital renaissance happening in @Overworked city. What do you think? #DigitalArt #Web3 #CreativeLife",
    stats: {
      likes: 1247,
      comments: 89,
      shares: 34,
      saves: 156,
    },
    isLiked: false,
    isSaved: false,
    timestamp: "2h",
  },
  {
    id: "2",
    user: {
      username: "tech_builder",
      displayName: "Alex Chen",
      avatar: "/images/placeholder/avatar.png",
      isVerified: false,
      isFollowing: true,
    },
    content: {
      type: "video",
      url: "/images/placeholder/video.mp4",
      thumbnail: "/images/placeholder/banner.png",
    },
    description:
      "Building the future of #DeFi one smart contract at a time! 🚀 Check out this demo of our new liquidity protocol. Shoutout to @sarah_creates for the amazing UI design! #Blockchain #SmartContracts #Innovation",
    stats: {
      likes: 892,
      comments: 67,
      shares: 23,
      saves: 98,
    },
    isLiked: true,
    isSaved: true,
    timestamp: "4h",
  },
  {
    id: "3",
    user: {
      username: "crypto_queen",
      displayName: "Maria Rodriguez",
      avatar: "/images/placeholder/avatar.png",
      isVerified: true,
      isFollowing: false,
    },
    content: {
      type: "image",
      url: "/images/placeholder/banner.png",
    },
    description:
      "GM everyone! 🌅 Starting the day with some #Web3 education. Remember, we're not just building technology, we're building the future of human collaboration. #GM #Web3Education #Community",
    stats: {
      likes: 2156,
      comments: 234,
      shares: 89,
      saves: 445,
    },
    isLiked: false,
    isSaved: false,
    timestamp: "6h",
  },
];

export default function TownTalkFeeds() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(
    null,
  );
  const [activeSharePost, setActiveSharePost] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 },
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const loadMorePosts = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPosts = mockPosts.map((post) => ({
      ...post,
      id: `${post.id}-${Date.now()}-${Math.random()}`,
    }));

    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);

    // Simulate end of content after 15 posts
    if (posts.length > 15) {
      setHasMore(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              stats: {
                ...post.stats,
                likes: post.isLiked
                  ? post.stats.likes - 1
                  : post.stats.likes + 1,
              },
            }
          : post,
      ),
    );
  };

  const handleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isSaved: !post.isSaved,
              stats: {
                ...post.stats,
                saves: post.isSaved
                  ? post.stats.saves - 1
                  : post.stats.saves + 1,
              },
            }
          : post,
      ),
    );
  };

  const handleFollow = (username: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.user.username === username
          ? {
              ...post,
              user: { ...post.user, isFollowing: !post.user.isFollowing },
            }
          : post,
      ),
    );
  };

  const toggleVideoPlay = (postId: string) => {
    setPlayingVideo((prev) => (prev === postId ? null : postId));
  };

  const toggleVideoMute = (postId: string) => {
    setMutedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleCommentClick = (postId: string) => {
    setActiveCommentPost(postId);
  };

  const handleShareClick = (postId: string) => {
    setActiveSharePost(postId);
  };

  const getPostUrl = (postId: string) => {
    return `${window.location.origin}/town-talk/post/${postId}`;
  };

  const getPostTitle = (post: Post) => {
    return `Check out this amazing post by @${post.user.username} on TownTalk!`;
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800/30 to-purple-900/30"
          : "bg-gradient-to-br from-gray-50 via-cyan-50 to-purple-50"
      } transition-colors duration-300`}
    >
      <TownTalkSidebar />

      <main className="ml-80 min-h-screen">
        <div
          ref={containerRef}
          className="scrollbar-hide mx-auto h-screen max-w-md snap-y snap-mandatory overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex h-screen snap-start flex-col"
            >
              {/* Content Area */}
              <div className="relative flex-1">
                {post.content.type === "image" ? (
                  <img
                    src={post.content.url || "/placeholder.svg"}
                    alt="Post content"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <video
                      src={post.content.url}
                      poster={post.content.thumbnail}
                      className="h-full w-full object-cover"
                      loop
                      muted={mutedVideos.has(post.id)}
                      autoPlay={playingVideo === post.id}
                    />

                    {/* Video Controls */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleVideoPlay(post.id)}
                        className="z-50 h-16 w-16 rounded-full bg-black/30 text-white hover:bg-black/50"
                      >
                        {playingVideo === post.id ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="ml-1 h-8 w-8" />
                        )}
                      </Button>
                    </div>

                    {/* Mute Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleVideoMute(post.id)}
                      className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                    >
                      {mutedVideos.has(post.id) ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* User Info & Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-end justify-between">
                  {/* Left Side - User & Description */}
                  <div className="flex-1 pr-4">
                    {/* User Info */}
                    <div className="mb-3 flex items-center space-x-3">
                      <Avatar className="h-12 w-12 ring-2 ring-white/30">
                        <AvatarImage
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.displayName}
                        />
                        <AvatarFallback>
                          {post.user.displayName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">
                            {post.user.displayName}
                          </h3>
                          {post.user.isVerified && (
                            <Verified className="h-4 w-4 fill-current text-blue-400" />
                          )}
                          <span className="text-sm text-white/60">
                            @{post.user.username}
                          </span>
                          <span className="text-sm text-white/60">•</span>
                          <span className="text-sm text-white/60">
                            {post.timestamp}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant={
                          post.user.isFollowing ? "secondary" : "default"
                        }
                        size="sm"
                        onClick={() => handleFollow(post.user.username)}
                        className={`${
                          post.user.isFollowing
                            ? "bg-white/20 text-white hover:bg-white/30"
                            : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90"
                        } transition-all duration-200`}
                      >
                        {post.user.isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>

                    {/* Description */}
                    <RichText
                      text={post.description}
                      maxLength={100}
                      className="text-white"
                    />
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex flex-col space-y-4">
                    {/* Like */}
                    <div className="flex flex-col items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleLike(post.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
                      >
                        <Heart
                          className={`h-6 w-6 ${
                            post.isLiked
                              ? "fill-current text-red-500"
                              : "text-white"
                          } transition-colors`}
                        />
                      </motion.button>
                      <span className="mt-1 text-xs text-white/80">
                        {formatNumber(post.stats.likes)}
                      </span>
                    </div>

                    {/* Comment */}
                    <div className="flex flex-col items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleCommentClick(post.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
                      >
                        <MessageCircle className="h-6 w-6 text-white" />
                      </motion.button>
                      <span className="mt-1 text-xs text-white/80">
                        {formatNumber(post.stats.comments)}
                      </span>
                    </div>

                    {/* Share */}
                    <div className="flex flex-col items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleShareClick(post.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
                      >
                        <Share className="h-6 w-6 text-white" />
                      </motion.button>
                      <span className="mt-1 text-xs text-white/80">
                        {formatNumber(post.stats.shares)}
                      </span>
                    </div>

                    {/* Save */}
                    <div className="flex flex-col items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleSave(post.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
                      >
                        <Bookmark
                          className={`h-6 w-6 ${
                            post.isSaved
                              ? "fill-current text-yellow-500"
                              : "text-white"
                          } transition-colors`}
                        />
                      </motion.button>
                      <span className="mt-1 text-xs text-white/80">
                        {formatNumber(post.stats.saves)}
                      </span>
                    </div>

                    {/* More */}
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50">
                      <MoreHorizontal className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading Skeletons */}
          {loading && (
            <div className="flex h-screen snap-start flex-col">
              <Skeleton className="w-full flex-1" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-3 flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          )}

          {/* End of Content */}
          {!hasMore && (
            <div className="flex h-32 items-center justify-center">
              <p
                className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                You're all caught up! 🎉
              </p>
            </div>
          )}

          {/* Scroll Sentinel */}
          <div id="scroll-sentinel" className="h-1" />
        </div>
      </main>

      {/* Comment Section */}
      <AnimatePresence>
        {activeCommentPost && (
          <CommentSection
            isOpen={!!activeCommentPost}
            onClose={() => setActiveCommentPost(null)}
            postId={activeCommentPost}
          />
        )}
      </AnimatePresence>

      {/* Share Section */}
      <AnimatePresence>
        {activeSharePost && (
          <ShareSection
            isOpen={!!activeSharePost}
            onClose={() => setActiveSharePost(null)}
            postId={activeSharePost}
            postUrl={getPostUrl(activeSharePost)}
            postTitle={getPostTitle(
              posts.find((p) => p.id === activeSharePost) || posts[0],
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
