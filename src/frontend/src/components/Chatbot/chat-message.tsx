"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
    isTyping?: boolean
  }
  isLast?: boolean
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "group flex gap-4 p-6 transition-all duration-500 hover:bg-gradient-to-r hover:from-ow-aqua/5 hover:to-ow-purple/5 rounded-xl mx-4 my-2",
        isUser ? "flex-row-reverse" : "flex-row",
        isLast && "animate-in slide-in-from-bottom-4 duration-700",
      )}
    >
      <Avatar
        className={cn(
          "h-12 w-12 shrink-0 ring-2 transition-all duration-300 shadow-lg",
          isUser
            ? "ring-gradient-to-r from-ow-purple to-ow-gold group-hover:ring-ow-purple/60"
            : "ring-gradient-to-r from-ow-aqua to-ow-purple group-hover:ring-ow-aqua/60",
        )}
      >
        <AvatarImage
          src={isUser ? "/placeholder-user.jpg" : "/placeholder-logo.png"}
          alt={isUser ? "User" : "AI Assistant"}
        />
        <AvatarFallback
          className={cn(
            "text-sm font-bold text-ow-white",
            isUser
              ? "bg-gradient-to-br from-ow-purple via-ow-gold to-ow-purple"
              : "bg-gradient-to-br from-ow-aqua via-ow-purple to-ow-aqua",
          )}
        >
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col gap-3 max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div className="flex items-center gap-3">
          <Badge
            className={cn(
              "text-xs font-semibold px-3 py-1 border-0 shadow-md",
              isUser
                ? "bg-gradient-to-r from-ow-purple to-ow-gold text-ow-white"
                : "bg-gradient-to-r from-ow-aqua to-ow-purple text-ow-white",
            )}
          >
            {isUser ? "You" : "AI Assistant"}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={cn(
            "relative rounded-2xl px-5 py-4 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm",
            isUser
              ? "bg-gradient-to-br from-ow-purple via-ow-gold to-ow-purple text-ow-white ml-8 shadow-ow-purple/20"
              : "bg-gradient-to-br from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 border border-ow-aqua/20 mr-8 shadow-ow-aqua/20",
          )}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 bg-gradient-to-r from-ow-aqua to-ow-purple rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-gradient-to-r from-ow-purple to-ow-gold rounded-full animate-bounce animation-delay-200" />
                <div className="h-2 w-2 bg-gradient-to-r from-ow-gold to-ow-aqua rounded-full animate-bounce animation-delay-400" />
              </div>
              <span className="text-sm text-muted-foreground ml-2 font-medium">AI is thinking...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
          )}
        </div>

        {!isUser && !message.isTyping && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 w-8 p-0 rounded-full hover:bg-gradient-to-r hover:from-green-400/20 hover:to-green-500/20",
                isLiked && "text-green-500 bg-gradient-to-r from-green-400/20 to-green-500/20",
              )}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={cn(
                "h-8 w-8 p-0 rounded-full hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20",
                isDisliked && "text-red-500 bg-gradient-to-r from-red-400/20 to-red-500/20",
              )}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-ow-gold/20 hover:to-ow-purple/20 rounded-full"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-gold/20 rounded-full"
            >
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
        )}

        {isCopied && (
          <Badge className="animate-in slide-in-from-bottom-2 duration-300 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            Copied!
          </Badge>
        )}
      </div>
    </div>
  )
}
