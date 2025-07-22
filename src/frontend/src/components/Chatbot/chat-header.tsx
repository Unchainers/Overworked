"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Share, Download, MoreVertical, Zap, Shield, Sparkles } from "lucide-react"

interface ChatHeaderProps {
  title: string
  isOnline?: boolean
  messageCount?: number
}

export function ChatHeader({ title, isOnline = true, messageCount = 0 }: ChatHeaderProps) {
  return (
    <div className="border-b border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 bg-gradient-to-r from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-4 ring-gradient-to-r from-ow-aqua/30 to-ow-purple/30 shadow-lg">
              <AvatarImage src="/placeholder-logo.png" alt="AI Assistant" />
              <AvatarFallback className="bg-gradient-to-br from-ow-aqua via-ow-purple to-ow-gold text-ow-white font-bold text-lg">
                AI
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-gradient-to-r from-green-400 to-green-500 border-3 border-ow-white dark:border-ow-black rounded-full animate-pulse shadow-lg" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold bg-clip-text text-transparent">
                {title}
              </h1>
              <Badge className="bg-gradient-to-r from-ow-purple via-ow-gold to-ow-purple text-ow-white border-0 font-bold px-3 py-1 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" />
                <span>Online</span>
              </div>

              {messageCount > 0 && <span>{messageCount} messages</span>}

              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gradient-to-r from-ow-aqua to-ow-purple" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
          >
            <Zap className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-purple/20 hover:to-ow-gold/20 rounded-full"
          >
            <Share className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-gold/20 hover:to-ow-aqua/20 rounded-full"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gradient-to-r hover:from-ow-purple/20 hover:to-ow-gold/20 rounded-full"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
