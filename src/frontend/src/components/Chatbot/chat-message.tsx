"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    isTyping?: boolean;
  };
  isLast?: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "hover:from-ow-aqua/5 hover:to-ow-purple/5 group mx-4 my-2 flex gap-4 rounded-xl p-6 transition-all duration-500 hover:bg-gradient-to-r",
        isUser ? "flex-row-reverse" : "flex-row",
        isLast && "animate-in slide-in-from-bottom-4 duration-700",
      )}
    >
      <Avatar
        className={cn(
          "h-12 w-12 shrink-0 shadow-lg ring-2 transition-all duration-300",
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
            "text-ow-white text-sm font-bold",
            isUser
              ? "from-ow-purple via-ow-gold to-ow-purple bg-gradient-to-br"
              : "from-ow-aqua via-ow-purple to-ow-aqua bg-gradient-to-br",
          )}
        >
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-3",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="flex items-center gap-3">
          <Badge
            className={cn(
              "border-0 px-3 py-1 text-xs font-semibold shadow-md",
              isUser
                ? "from-ow-purple to-ow-gold text-ow-white bg-gradient-to-r"
                : "from-ow-aqua to-ow-purple text-ow-white bg-gradient-to-r",
            )}
          >
            {isUser ? "You" : "AI Assistant"}
          </Badge>
          <span className="text-muted-foreground text-xs font-medium">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={cn(
            "relative rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
            isUser
              ? "from-ow-purple via-ow-gold to-ow-purple text-ow-white shadow-ow-purple/20 ml-8 bg-gradient-to-br"
              : "from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 border-ow-aqua/20 shadow-ow-aqua/20 mr-8 border bg-gradient-to-br",
          )}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="from-ow-aqua to-ow-purple h-2 w-2 animate-bounce rounded-full bg-gradient-to-r" />
                <div className="from-ow-purple to-ow-gold animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-gradient-to-r" />
                <div className="from-ow-gold to-ow-aqua animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-gradient-to-r" />
              </div>
              <span className="text-muted-foreground ml-2 text-sm font-medium">
                AI is thinking...
              </span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed">
              {message.content}
            </p>
          )}
        </div>

        {!isUser && !message.isTyping && (
          <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="hover:from-ow-aqua/20 hover:to-ow-purple/20 h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r hover:from-green-400/20 hover:to-green-500/20",
                isLiked &&
                  "bg-gradient-to-r from-green-400/20 to-green-500/20 text-green-500",
              )}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={cn(
                "h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20",
                isDisliked &&
                  "bg-gradient-to-r from-red-400/20 to-red-500/20 text-red-500",
              )}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:from-ow-gold/20 hover:to-ow-purple/20 h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:from-ow-aqua/20 hover:to-ow-gold/20 h-8 w-8 rounded-full p-0 hover:bg-gradient-to-r"
            >
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
        )}

        {isCopied && (
          <Badge className="animate-in slide-in-from-bottom-2 border-0 bg-gradient-to-r from-green-500 to-green-600 text-white duration-300">
            Copied!
          </Badge>
        )}
      </div>
    </div>
  );
}
