"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RichText } from "@/components/Town-Talk/rich-text";
import {
  Heart,
  Reply,
  Trash2,
  Send,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

interface Comment {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
  };
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  showReplies: boolean;
}

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      username: "alice_dev",
      displayName: "Alice Johnson",
      avatar: "/placeholder-user.jpg",
      isVerified: true,
    },
    text: "This is absolutely amazing! 🔥 The creativity in this piece is incredible. Keep up the great work @sarah_creates! #Inspired",
    timestamp: "2h",
    likes: 24,
    isLiked: false,
    showReplies: false,
    replies: [
      {
        id: "1-1",
        user: {
          username: "sarah_creates",
          displayName: "Sarah Johnson",
          avatar: "/placeholder-user.jpg",
          isVerified: true,
        },
        text: "Thank you so much @alice_dev! Your support means everything to me 💖",
        timestamp: "1h",
        likes: 8,
        isLiked: true,
        showReplies: false,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    user: {
      username: "crypto_enthusiast",
      displayName: "Mike Chen",
      avatar: "/placeholder-user.jpg",
      isVerified: false,
    },
    text: "The future of digital art is here! This piece perfectly captures the essence of Web3 creativity. How long did this take to create?",
    timestamp: "3h",
    likes: 15,
    isLiked: true,
    showReplies: false,
    replies: [],
  },
  {
    id: "3",
    user: {
      username: "art_collector",
      displayName: "Emma Rodriguez",
      avatar: "/placeholder-user.jpg",
      isVerified: true,
    },
    text: "Stunning work! The color palette and composition are perfect. This would look amazing in my digital gallery. Is this available as an #NFT?",
    timestamp: "4h",
    likes: 31,
    isLiked: false,
    showReplies: false,
    replies: [],
  },
  {
    id: "4",
    user: {
      username: "web3_builder",
      displayName: "David Kim",
      avatar: "/placeholder-user.jpg",
      isVerified: false,
    },
    text: "Love the integration of traditional art techniques with digital innovation. This is what the future of creative expression looks like! 🚀",
    timestamp: "5h",
    likes: 19,
    isLiked: false,
    showReplies: false,
    replies: [],
  },
  {
    id: "5",
    user: {
      username: "design_guru",
      displayName: "Lisa Wang",
      avatar: "/placeholder-user.jpg",
      isVerified: true,
    },
    text: "The attention to detail is phenomenal! Every element tells a story. Can't wait to see what you create next @sarah_creates ✨",
    timestamp: "6h",
    likes: 42,
    isLiked: true,
    showReplies: false,
    replies: [],
  },
];

export function CommentSection({
  isOpen,
  onClose,
  postId,
}: CommentSectionProps) {
  const { theme } = useTheme();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleLikeComment = (
    commentId: string,
    isReply = false,
    parentId?: string,
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply,
            ),
          };
        } else if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      }),
    );
  };

  const handleDeleteComment = (
    commentId: string,
    isReply = false,
    parentId?: string,
  ) => {
    if (isReply && parentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== commentId,
                ),
              }
            : comment,
        ),
      );
    } else {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        username: "johndoe",
        displayName: "John Doe",
        avatar: "/placeholder-user.jpg",
        isVerified: false,
      },
      text: newComment,
      timestamp: "now",
      likes: 0,
      isLiked: false,
      showReplies: false,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      user: {
        username: "johndoe",
        displayName: "John Doe",
        avatar: "/placeholder-user.jpg",
        isVerified: false,
      },
      text: replyText,
      timestamp: "now",
      likes: 0,
      isLiked: false,
      showReplies: false,
      replies: [],
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...comment.replies, reply],
              showReplies: true,
            }
          : comment,
      ),
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleReplies = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplies: !comment.showReplies }
          : comment,
      ),
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className={`h-[80vh] w-full max-w-md rounded-t-3xl ${
          theme === "dark"
            ? "from-gray-900/98 to-purple-900/98 bg-gradient-to-br via-gray-800/95"
            : "from-white/98 bg-gradient-to-br via-cyan-50 to-purple-50"
        } border-t border-white/20 shadow-2xl backdrop-blur-xl dark:border-gray-700/50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-white/20 p-4 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3
              className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Comments ({comments.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Comments List - Scrollable */}
        <div className="flex min-h-0 flex-1 flex-col">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 py-4">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    {/* Main Comment */}
                    <div className="flex space-x-3">
                      <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-white/20">
                        <AvatarImage
                          src={comment.user.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                          {comment.user.displayName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <div
                          className={`rounded-2xl p-4 ${
                            theme === "dark"
                              ? "border border-gray-700/50 bg-gray-800/50"
                              : "border border-gray-200/50 bg-white/70"
                          } backdrop-blur-sm`}
                        >
                          <div className="mb-2 flex items-center space-x-2">
                            <span
                              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              {comment.user.displayName}
                            </span>
                            {comment.user.isVerified && (
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                                <span className="text-xs text-white">✓</span>
                              </div>
                            )}
                            <span
                              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                            >
                              @{comment.user.username}
                            </span>
                            <span
                              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {comment.timestamp}
                            </span>
                          </div>

                          <RichText
                            text={comment.text}
                            maxLength={150}
                            className="mb-3"
                          />

                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="group flex items-center space-x-1"
                            >
                              <Heart
                                className={`h-4 w-4 transition-colors ${
                                  comment.isLiked
                                    ? "fill-current text-red-500"
                                    : theme === "dark"
                                      ? "text-gray-400 group-hover:text-red-400"
                                      : "text-gray-600 group-hover:text-red-500"
                                }`}
                              />
                              <span
                                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {comment.likes}
                              </span>
                            </button>

                            <button
                              onClick={() => setReplyingTo(comment.id)}
                              className={`flex items-center space-x-1 text-xs ${
                                theme === "dark"
                                  ? "text-gray-400 hover:text-cyan-400"
                                  : "text-gray-600 hover:text-purple-600"
                              } transition-colors`}
                            >
                              <Reply className="h-4 w-4" />
                              <span>Reply</span>
                            </button>

                            {comment.user.username === "johndoe" && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className={`flex items-center space-x-1 text-xs ${
                                  theme === "dark"
                                    ? "text-gray-400 hover:text-red-400"
                                    : "text-gray-600 hover:text-red-500"
                                } transition-colors`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}

                            {comment.replies.length > 0 && (
                              <button
                                onClick={() => toggleReplies(comment.id)}
                                className={`flex items-center space-x-1 text-xs ${
                                  theme === "dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                } transition-colors`}
                              >
                                {comment.showReplies ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                                <span>{comment.replies.length} replies</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 flex space-x-2"
                          >
                            <Input
                              placeholder={`Reply to @${comment.user.username}...`}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className={`flex-1 text-sm ${
                                theme === "dark"
                                  ? "border-gray-700/50 bg-gray-800/50"
                                  : "border-gray-200/50 bg-white/70"
                              } backdrop-blur-sm`}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleAddReply(comment.id)
                              }
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddReply(comment.id)}
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Replies */}
                    <AnimatePresence>
                      {comment.showReplies && comment.replies.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-13 space-y-3"
                        >
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-3">
                              <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-white/20">
                                <AvatarImage
                                  src={reply.user.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-xs text-white">
                                  {reply.user.displayName[0]}
                                </AvatarFallback>
                              </Avatar>

                              <div className="min-w-0 flex-1">
                                <div
                                  className={`rounded-2xl p-3 ${
                                    theme === "dark"
                                      ? "border border-gray-600/50 bg-gray-700/50"
                                      : "border border-gray-100/50 bg-gray-50/70"
                                  } backdrop-blur-sm`}
                                >
                                  <div className="mb-1 flex items-center space-x-2">
                                    <span
                                      className={`text-xs font-semibold ${
                                        theme === "dark"
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {reply.user.displayName}
                                    </span>
                                    {reply.user.isVerified && (
                                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                                        <span className="text-[8px] text-white">
                                          ✓
                                        </span>
                                      </div>
                                    )}
                                    <span
                                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      {reply.timestamp}
                                    </span>
                                  </div>

                                  <RichText
                                    text={reply.text}
                                    maxLength={100}
                                    className="mb-2 text-sm"
                                  />

                                  <div className="flex items-center space-x-3">
                                    <button
                                      onClick={() =>
                                        handleLikeComment(
                                          reply.id,
                                          true,
                                          comment.id,
                                        )
                                      }
                                      className="group flex items-center space-x-1"
                                    >
                                      <Heart
                                        className={`h-3 w-3 transition-colors ${
                                          reply.isLiked
                                            ? "fill-current text-red-500"
                                            : theme === "dark"
                                              ? "text-gray-400 group-hover:text-red-400"
                                              : "text-gray-600 group-hover:text-red-500"
                                        }`}
                                      />
                                      <span
                                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                                      >
                                        {reply.likes}
                                      </span>
                                    </button>

                                    {reply.user.username === "johndoe" && (
                                      <button
                                        onClick={() =>
                                          handleDeleteComment(
                                            reply.id,
                                            true,
                                            comment.id,
                                          )
                                        }
                                        className={`text-xs ${
                                          theme === "dark"
                                            ? "text-gray-400 hover:text-red-400"
                                            : "text-gray-600 hover:text-red-500"
                                        } transition-colors`}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>

        {/* Add Comment Input - Fixed at bottom */}
        <div className="flex-shrink-0 border-t border-white/20 p-4 dark:border-gray-700/50">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-white/20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 space-x-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={`flex-1 ${
                  theme === "dark"
                    ? "border-gray-700/50 bg-gray-800/50"
                    : "border-gray-200/50 bg-white/70"
                } backdrop-blur-sm`}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
