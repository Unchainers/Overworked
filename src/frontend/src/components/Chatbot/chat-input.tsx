"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80 border-t bg-gradient-to-r p-6 backdrop-blur-xl">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-end gap-4"
      >
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className={cn(
              "max-h-32 min-h-[52px] resize-none border-2 pr-14 transition-all duration-300",
              "focus:ring-gradient-to-r focus:from-ow-aqua/20 focus:to-ow-purple/20 focus:ring-4",
              "border-gradient-to-r from-ow-aqua/30 via-ow-purple/30 to-ow-gold/30",
              "from-ow-white/95 to-ow-white/98 dark:from-ow-black/95 dark:to-ow-black/98 bg-gradient-to-r",
              "placeholder:text-muted-foreground/70 rounded-2xl font-medium shadow-lg",
            )}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hover:from-ow-aqua/20 hover:to-ow-purple/20 absolute right-3 top-3 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleRecording}
          className={cn(
            "h-12 w-12 rounded-full border-2 p-0 shadow-lg transition-all duration-300",
            isRecording
              ? "border-red-500 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30 hover:from-red-600 hover:to-red-700"
              : "border-gradient-to-r from-ow-aqua/50 to-ow-purple/50 hover:from-ow-aqua/10 hover:to-ow-purple/10 hover:bg-gradient-to-r",
          )}
        >
          {isRecording ? (
            <Square className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={cn(
            "h-12 w-12 rounded-full border-0 p-0 transition-all duration-300",
            "from-ow-aqua via-ow-purple to-ow-gold bg-gradient-to-r",
            "hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "shadow-ow-purple/30 shadow-lg hover:shadow-xl",
            "text-ow-white font-bold",
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {isRecording && (
        <div className="animate-in slide-in-from-bottom-2 mx-auto mt-4 flex max-w-4xl items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-50 via-red-100 to-red-50 p-3 duration-300 dark:from-red-950/30 dark:via-red-900/30 dark:to-red-950/30">
          <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600" />
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            Recording... Click to stop
          </span>
        </div>
      )}
    </div>
  );
}
