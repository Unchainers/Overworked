"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Trash2,
  Edit3,
  Clock,
  Zap,
  Brain,
  Code,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  conversations: Array<{
    id: string
    title: string
    lastMessage: string
    timestamp: Date
    isActive?: boolean
    category: "general" | "code" | "creative" | "analysis"
  }>
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
}

const categoryIcons = {
  general: MessageSquare,
  code: Code,
  creative: Palette,
  analysis: Brain,
}

const categoryColors = {
  general: "from-ow-aqua to-ow-purple",
  code: "from-green-400 to-green-600",
  creative: "from-ow-purple to-ow-gold",
  analysis: "from-orange-400 to-orange-600",
}

export function ChatSidebar({ conversations, onSelectConversation, onNewConversation }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const groupedConversations = {
    today: filteredConversations.filter((conv) => new Date().toDateString() === conv.timestamp.toDateString()),
    yesterday: filteredConversations.filter((conv) => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday.toDateString() === conv.timestamp.toDateString()
    }),
    older: filteredConversations.filter((conv) => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return conv.timestamp < yesterday
    }),
  }

  return (
    <div className="w-80 border-r border-gradient-to-b from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 bg-gradient-to-b from-ow-white/50 via-ow-white/60 to-ow-white/50 dark:from-ow-black/50 dark:via-ow-black/60 dark:to-ow-black/50 backdrop-blur-xl flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold bg-clip-text text-transparent">
            AI Assistant
          </h2>
          <Button
            onClick={onNewConversation}
            size="sm"
            className="h-10 w-10 p-0 bg-gradient-to-r from-ow-aqua via-ow-purple to-ow-gold hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90 text-ow-white rounded-full shadow-lg"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm bg-gradient-to-r from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 border-2 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-gradient-to-r focus:from-ow-aqua/20 focus:to-ow-purple/20 transition-all duration-300 font-medium shadow-lg"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 text-xs bg-gradient-to-r from-ow-aqua/10 to-ow-purple/10 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 hover:from-ow-aqua/20 hover:to-ow-purple/20 font-semibold"
          >
            <Zap className="h-3 w-3 mr-1" />
            Quick
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 text-xs bg-gradient-to-r from-ow-purple/10 to-ow-gold/10 border-gradient-to-r from-ow-purple/30 to-ow-gold/30 hover:from-ow-purple/20 hover:to-ow-gold/20 font-semibold"
          >
            <Brain className="h-3 w-3 mr-1" />
            Smart
          </Button>
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {Object.entries(groupedConversations).map(
            ([period, convs]) =>
              convs.length > 0 && (
                <div key={period} className="mb-6">
                  <div className="flex items-center gap-3 px-3 py-2 mb-3">
                    <Clock className="h-4 w-4 text-gradient-to-r from-ow-aqua to-ow-purple" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider bg-gradient-to-r from-ow-aqua to-ow-purple bg-clip-text text-transparent">
                      {period}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {convs.map((conversation) => {
                      const CategoryIcon = categoryIcons[conversation.category]
                      return (
                        <div
                          key={conversation.id}
                          onClick={() => onSelectConversation(conversation.id)}
                          className={cn(
                            "group relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg backdrop-blur-sm",
                            conversation.isActive
                              ? "bg-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 border-2 border-gradient-to-r from-ow-aqua/40 to-ow-purple/40 shadow-lg"
                              : "hover:bg-gradient-to-r hover:from-ow-aqua/10 hover:via-ow-purple/10 hover:to-ow-gold/10 border border-transparent hover:border-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cn("p-2 rounded-lg bg-gradient-to-r", categoryColors[conversation.category])}
                            >
                              <CategoryIcon className="h-4 w-4 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold truncate">{conversation.title}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 rounded-full"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>

                              <p className="text-xs text-muted-foreground truncate mb-3 font-medium">
                                {conversation.lastMessage}
                              </p>

                              <div className="flex items-center justify-between">
                                <Badge
                                  className={cn(
                                    "text-xs font-semibold border-0 text-white bg-gradient-to-r",
                                    categoryColors[conversation.category],
                                  )}
                                >
                                  {conversation.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-medium">
                                  {conversation.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute right-3 top-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gradient-to-r hover:from-ow-gold/20 hover:to-ow-purple/20 rounded-full"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20 rounded-full"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {period !== "older" && (
                    <Separator className="mt-6 bg-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20" />
                  )}
                </div>
              ),
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
