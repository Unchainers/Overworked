"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Copy, Download, MessageCircle, Send, Check, Facebook, Twitter, Instagram, Mail } from "lucide-react"

interface ShareSectionProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  postUrl: string
  postTitle: string
}

const shareOptions = [
  { name: "Copy Link", icon: Copy, action: "copy" },
  { name: "Download", icon: Download, action: "download" },
  { name: "Send Message", icon: MessageCircle, action: "message" },
  { name: "Email", icon: Mail, action: "email" },
  { name: "Twitter", icon: Twitter, action: "twitter" },
  { name: "Facebook", icon: Facebook, action: "facebook" },
  { name: "Instagram", icon: Instagram, action: "instagram" },
]

const mockFriends = [
  {
    id: "1",
    username: "alice_dev",
    displayName: "Alice Johnson",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
  },
  {
    id: "2",
    username: "mike_crypto",
    displayName: "Mike Chen",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
  },
  {
    id: "3",
    username: "emma_art",
    displayName: "Emma Rodriguez",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
  },
  {
    id: "4",
    username: "david_tech",
    displayName: "David Kim",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
  },
]

export function ShareSection({ isOpen, onClose, postId, postUrl, postTitle }: ShareSectionProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [showFriends, setShowFriends] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      toast("The post link has been copied to your clipboard.")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast("Failed to copy")
    }
  }

  const handleDownload = () => {
    toast("Download started")
  }

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(postUrl)
    const encodedTitle = encodeURIComponent(postTitle)

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, "_blank")
        break
      case "message":
        setShowFriends(true)
        break
      default:
        break
    }
  }

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends((prev) => (prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]))
  }

  const sendToFriends = () => {
    if (selectedFriends.length === 0) {
      toast("No friends selected")
      return
    }

    toast("Message sent!")
    setSelectedFriends([])
    setMessage("")
    setShowFriends(false)
    onClose()
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
        className={`w-full max-w-md ${showFriends ? "h-[80vh]" : "h-auto"} rounded-t-3xl ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-purple-900/95"
            : "bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95"
        } backdrop-blur-xl border-t border-white/20 dark:border-gray-700/50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {showFriends ? "Send to Friends" : "Share"}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showFriends ? (
            <motion.div
              key="share-options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4"
            >
              {/* URL Copy Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={postUrl}
                    readOnly
                    className={`flex-1 text-sm ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"}`}
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                    className={`${
                      copied
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent hover:from-cyan-600 hover:to-purple-700"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Share Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      option.action === "copy"
                        ? handleCopyLink()
                        : option.action === "download"
                          ? handleDownload()
                          : handleShare(option.action)
                    }
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-white"
                        : "bg-white/50 hover:bg-gray-100/50 text-gray-900"
                    } border border-white/20 dark:border-gray-700/50`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"
                      }`}
                    >
                      <option.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">{option.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="friends-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              {/* Message Input */}
              <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
                <Input
                  placeholder="Add a message (optional)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Friends List */}
              <ScrollArea className="flex-1 px-4">
                <div className="py-4 space-y-3">
                  {mockFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFriendSelection(friend.id)}
                      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedFriends.includes(friend.id)
                          ? theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-500/50"
                            : "bg-gradient-to-r from-cyan-100/50 to-purple-100/50 border-purple-500/50"
                          : theme === "dark"
                            ? "bg-gray-800/30 hover:bg-gray-700/50"
                            : "bg-white/30 hover:bg-gray-100/50"
                      } border border-white/20 dark:border-gray-700/50`}
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {friend.displayName}
                        </h4>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          @{friend.username}
                        </p>
                      </div>

                      {selectedFriends.includes(friend.id) && (
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
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowFriends(false)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={sendToFriends}
                    disabled={selectedFriends.length === 0}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send ({selectedFriends.length})
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
