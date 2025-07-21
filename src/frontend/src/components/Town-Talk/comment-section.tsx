"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RichText } from "@/components/Town-Talk/rich-text"
import { Heart, Reply, Trash2, Send, ChevronDown, ChevronUp } from "lucide-react"

interface Comment {
  id: string
  user: {
    username: string
    displayName: string
    avatar: string
    isVerified: boolean
  }
  text: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies: Comment[]
  showReplies: boolean
}

interface CommentSectionProps {
  isOpen: boolean
  onClose: () => void
  postId: string
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
]

export function CommentSection({ isOpen, onClose, postId }: CommentSectionProps) {
  const { theme } = useTheme()
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
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
          }
        } else if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleDeleteComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: comment.replies.filter((reply) => reply.id !== commentId) }
            : comment,
        ),
      )
    } else {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

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
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
  }

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return

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
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, reply], showReplies: true } : comment,
      ),
    )
    setReplyText("")
    setReplyingTo(null)
  }

  const toggleReplies = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment)),
    )
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className={`w-full max-w-md h-[70vh] rounded-t-3xl ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-purple-900/95"
            : "bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95"
        } backdrop-blur-xl border-t border-white/20 dark:border-gray-700/50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Comments</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-4">
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
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.user.displayName[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {comment.user.displayName}
                        </span>
                        {comment.user.isVerified && (
                          <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          @{comment.user.username}
                        </span>
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          {comment.timestamp}
                        </span>
                      </div>

                      <RichText text={comment.text} maxLength={100} className="mb-2" />

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center space-x-1 group"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              comment.isLiked
                                ? "text-red-500 fill-current"
                                : theme === "dark"
                                  ? "text-gray-400 group-hover:text-red-400"
                                  : "text-gray-600 group-hover:text-red-500"
                            }`}
                          />
                          <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
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
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>

                        {comment.user.username === "johndoe" && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className={`flex items-center space-x-1 text-xs ${
                              theme === "dark" ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"
                            } transition-colors`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        {comment.replies.length > 0 && (
                          <button
                            onClick={() => toggleReplies(comment.id)}
                            className={`flex items-center space-x-1 text-xs ${
                              theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                            } transition-colors`}
                          >
                            {comment.showReplies ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                            <span>{comment.replies.length} replies</span>
                          </button>
                        )}
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
                            className="flex-1 text-sm"
                            onKeyPress={(e) => e.key === "Enter" && handleAddReply(comment.id)}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddReply(comment.id)}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                          >
                            <Send className="w-4 h-4" />
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
                        className="ml-11 space-y-3"
                      >
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3">
                            <Avatar className="w-6 h-6 flex-shrink-0">
                              <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{reply.user.displayName[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span
                                  className={`font-semibold text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                                >
                                  {reply.user.displayName}
                                </span>
                                {reply.user.isVerified && (
                                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-[8px]">✓</span>
                                  </div>
                                )}
                                <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                  {reply.timestamp}
                                </span>
                              </div>

                              <RichText text={reply.text} maxLength={80} className="mb-2 text-sm" />

                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                  className="flex items-center space-x-1 group"
                                >
                                  <Heart
                                    className={`w-3 h-3 transition-colors ${
                                      reply.isLiked
                                        ? "text-red-500 fill-current"
                                        : theme === "dark"
                                          ? "text-gray-400 group-hover:text-red-400"
                                          : "text-gray-600 group-hover:text-red-500"
                                    }`}
                                  />
                                  <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    {reply.likes}
                                  </span>
                                </button>

                                {reply.user.username === "johndoe" && (
                                  <button
                                    onClick={() => handleDeleteComment(reply.id, true, comment.id)}
                                    className={`text-xs ${
                                      theme === "dark"
                                        ? "text-gray-400 hover:text-red-400"
                                        : "text-gray-600 hover:text-red-500"
                                    } transition-colors`}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
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

        {/* Add Comment Input */}
        <div className="p-4 border-t border-white/20 dark:border-gray-700/50">
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
