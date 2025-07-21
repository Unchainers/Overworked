"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  Send,
  Download,
  Mail,
  MessageCircle,
  Search,
  Check,
  X,
  Twitter,
  Facebook,
  Instagram,
  ArrowLeft,
} from "lucide-react"
import { toast } from "sonner"

interface ShareSectionProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  postUrl: string
  postTitle: string
}

interface Friend {
  id: string
  username: string
  displayName: string
  avatar: string
  isOnline: boolean
  isSelected: boolean
}

const mockFriends: Friend[] = [
  {
    id: "1",
    username: "alice_dev",
    displayName: "Alice Johnson",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
    isSelected: false,
  },
  {
    id: "2",
    username: "mike_crypto",
    displayName: "Mike Chen",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
    isSelected: false,
  },
  {
    id: "3",
    username: "emma_art",
    displayName: "Emma Rodriguez",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
    isSelected: false,
  },
  {
    id: "4",
    username: "david_tech",
    displayName: "David Kim",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
    isSelected: false,
  },
  {
    id: "5",
    username: "sarah_design",
    displayName: "Sarah Wilson",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
    isSelected: false,
  },
]

export function ShareSection({ isOpen, onClose, postId, postUrl, postTitle }: ShareSectionProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [showFriends, setShowFriends] = useState(false)
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleDownload = () => {
    toast.success("Download started!")
    // Simulate download
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(postTitle)
    const body = encodeURIComponent(`Check out this amazing post: ${postUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(postUrl)
    const encodedTitle = encodeURIComponent(postTitle)

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
    }

    if (platform === "instagram") {
      toast.info("Instagram sharing requires the mobile app")
      return
    }

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
  }

  const toggleFriendSelection = (friendId: string) => {
    setFriends((prev) =>
      prev.map((friend) => (friend.id === friendId ? { ...friend, isSelected: !friend.isSelected } : friend)),
    )

    const friend = friends.find((f) => f.id === friendId)
    if (friend) {
      if (friend.isSelected) {
        setSelectedFriends((prev) => prev.filter((f) => f.id !== friendId))
      } else {
        setSelectedFriends((prev) => [...prev, { ...friend, isSelected: true }])
      }
    }
  }

  const handleSendToFriends = () => {
    if (selectedFriends.length === 0) {
      toast.error("Please select at least one friend")
      return
    }

    toast.success(`Sent to ${selectedFriends.length} friend${selectedFriends.length > 1 ? "s" : ""}!`)
    setShowFriends(false)
    setSelectedFriends([])
    setFriends((prev) => prev.map((friend) => ({ ...friend, isSelected: false })))
    onClose()
  }

  const filteredFriends = friends.filter(
    (friend) =>
      friend.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            {showFriends && (
              <Button variant="ghost" size="sm" onClick={() => setShowFriends(false)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {showFriends ? "Send to Friends" : "Share"}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showFriends ? (
            <motion.div
              key="share-options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-4"
            >
              <div className="space-y-4">
                {/* Copy Link */}
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className={`w-full justify-start space-x-3 h-12 ${
                    theme === "dark"
                      ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
                      : "bg-white/50 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </Button>

                {/* Send to Friends */}
                <Button
                  onClick={() => setShowFriends(true)}
                  variant="outline"
                  className={`w-full justify-start space-x-3 h-12 ${
                    theme === "dark"
                      ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
                      : "bg-white/50 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send to Friends</span>
                </Button>

                {/* Social Media */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Share on Social Media
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => handleSocialShare("twitter")}
                      variant="outline"
                      className="flex flex-col items-center space-y-2 h-16 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30"
                    >
                      <Twitter className="w-5 h-5 text-blue-500" />
                      <span className="text-xs">Twitter</span>
                    </Button>
                    <Button
                      onClick={() => handleSocialShare("facebook")}
                      variant="outline"
                      className="flex flex-col items-center space-y-2 h-16 bg-blue-600/10 hover:bg-blue-600/20 border-blue-600/30"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="text-xs">Facebook</span>
                    </Button>
                    <Button
                      onClick={() => handleSocialShare("instagram")}
                      variant="outline"
                      className="flex flex-col items-center space-y-2 h-16 bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30"
                    >
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <span className="text-xs">Instagram</span>
                    </Button>
                  </div>
                </div>

                {/* Other Options */}
                <div className="space-y-2">
                  <Button
                    onClick={handleEmailShare}
                    variant="outline"
                    className={`w-full justify-start space-x-3 h-12 ${
                      theme === "dark"
                        ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
                        : "bg-white/50 hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Share via Email</span>
                  </Button>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className={`w-full justify-start space-x-3 h-12 ${
                      theme === "dark"
                        ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
                        : "bg-white/50 hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="friends-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col"
            >
              {/* Search */}
              <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Selected Friends */}
              {selectedFriends.length > 0 && (
                <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
                  <div className="flex flex-wrap gap-2">
                    {selectedFriends.map((friend) => (
                      <Badge
                        key={friend.id}
                        variant="secondary"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      >
                        {friend.displayName}
                        <button
                          onClick={() => toggleFriendSelection(friend.id)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Friends List */}
              <ScrollArea className="flex-1 px-4">
                <div className="py-4 space-y-2">
                  {filteredFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        friend.isSelected
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20"
                          : theme === "dark"
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-white/50"
                      }`}
                      onClick={() => toggleFriendSelection(friend.id)}
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {friend.displayName}
                        </h4>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          @{friend.username}
                        </p>
                      </div>

                      {friend.isSelected && (
                        <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Send Button */}
              <div className="p-4 border-t border-white/20 dark:border-gray-700/50">
                <Button
                  onClick={handleSendToFriends}
                  disabled={selectedFriends.length === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to {selectedFriends.length} friend{selectedFriends.length !== 1 ? "s" : ""}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
