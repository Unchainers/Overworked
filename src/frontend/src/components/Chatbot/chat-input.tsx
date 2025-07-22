"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Mic, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="border-t border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 bg-gradient-to-r from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80 backdrop-blur-xl p-6">
      <form onSubmit={handleSubmit} className="flex items-end gap-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className={cn(
              "min-h-[52px] max-h-32 resize-none pr-14 transition-all duration-300 border-2",
              "focus:ring-4 focus:ring-gradient-to-r focus:from-ow-aqua/20 focus:to-ow-purple/20",
              "border-gradient-to-r from-ow-aqua/30 via-ow-purple/30 to-ow-gold/30",
              "bg-gradient-to-r from-ow-white/95 to-ow-white/98 dark:from-ow-black/95 dark:to-ow-black/98",
              "placeholder:text-muted-foreground/70 font-medium rounded-2xl shadow-lg",
            )}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-3 h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
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
            "h-12 w-12 p-0 transition-all duration-300 rounded-full border-2 shadow-lg",
            isRecording
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-500 shadow-red-500/30"
              : "border-gradient-to-r from-ow-aqua/50 to-ow-purple/50 hover:bg-gradient-to-r hover:from-ow-aqua/10 hover:to-ow-purple/10",
          )}
        >
          {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={cn(
            "h-12 w-12 p-0 transition-all duration-300 rounded-full border-0",
            "bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold",
            "hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-xl shadow-ow-purple/30",
            "text-ow-white font-bold",
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {isRecording && (
        <div className="flex items-center justify-center gap-3 mt-4 p-3 bg-gradient-to-r from-red-50 via-red-100 to-red-50 dark:from-red-950/30 dark:via-red-900/30 dark:to-red-950/30 rounded-xl animate-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
          <div className="h-3 w-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" />
          <span className="text-sm text-red-600 dark:text-red-400 font-semibold">Recording... Click to stop</span>
        </div>
      )}
    </div>
  )
}
