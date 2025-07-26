"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { TownTalkSidebar } from "@/components/Town-Talk/town-talk-sidebar";
import { CommentSection } from "@/components/Town-Talk/comment-section";
import { ShareSection } from "@/components/Town-Talk/share-section";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedPost } from "../../../../declarations/towntalk/towntalk.did";
import useTownTalk from "@/hooks/use-town-talk";
import { Principal } from "@dfinity/principal";
import useStorage from "@/hooks/use-storage";
import { TownTalkTabs } from "@/types/town-talk-types";
import Profile from "./profile";
import PostView from "./post-view";

export default function TownTalkFeeds() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isFetchingPostLoading, setIsFetchingPostLoading] =
    useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(
    null,
  );
  const [activeSharePost, setActiveSharePost] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { activeAccountID, actor } = useTownTalk();
  const { storageCanisterID } = useStorage();

  const [currentTab, setCurrentTab] = useState<TownTalkTabs>("Feeds");

  const handleLike = async (postID: string) => {};

  const toggleVideoMute = () => {
    setIsMuted((prev) => !prev);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleCommentClick = (postID: string) => {
    setActiveCommentPost(postID);
  };

  const handleShareClick = (postID: string) => {
    setActiveSharePost(postID);
  };

  function renderContent(tab: TownTalkTabs) {
    switch (tab) {
      case "Feeds":
        return (
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
                <PostView post={post} handleLike={handleLike} handleComment={handleCommentClick} handleShare={handleShareClick} handleMute={toggleVideoMute} />
              </motion.div>
            ))}

            {/* Loading Skeletons */}
            {isFetchingPostLoading && (
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
                  className={`text-center ${theme === "dark" ? "text-ow-white" : "text-gray-600"}`}
                >
                  You're all caught up! 🎉
                </p>
              </div>
            )}

            {/* Scroll Sentinel */}
            <div id="scroll-sentinel" className="h-1" />
          </div>
        );
        break;
      case "Profile":
        return <Profile />;
        break;
      case "Settings":
        return null;
        break;
    }
  }

  async function fetchPosts() {
    try {
      setIsFetchingPostLoading(true);

      if (actor) {
        const feeds = await actor.get_feeds(
          activeAccountID ?? "",
          BigInt(page),
          Principal.fromText(storageCanisterID ?? ""),
        );

        if (feeds.total_data) {
          setPosts(feeds.data);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log("Failed to fetch new posts: ", err);
    } finally {
      setIsFetchingPostLoading(false);
    }
  }

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingPostLoading) {
          fetchPosts();
        }
      },
      { threshold: 0.1 },
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetchingPostLoading]);

  const getPostUrl = (postId: string) => {
    return `${window.location.origin}/town-talk/post/${postId}`;
  };

  const getPostTitle = (post: FeedPost) => {
    return `Check out this amazing post by @${post.poster.username} on TownTalk!`;
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-ow-black *:text-ow-white"
          : "*:text-ow-black bg-white"
      } transition-colors duration-300`}
    >
      <TownTalkSidebar currentTab={currentTab} setTab={setCurrentTab} />

      <main className="ml-80 min-h-screen">{renderContent(currentTab)}</main>

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
