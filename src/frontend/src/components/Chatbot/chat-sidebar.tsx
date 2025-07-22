"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Array<{
    id: string;
    title: string;
    lastMessage: string;
    timestamp: Date;
    isActive?: boolean;
    category: "general" | "code" | "creative" | "analysis";
  }>;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const categoryIcons = {
  general: MessageSquare,
  code: Code,
  creative: Palette,
  analysis: Brain,
};

const categoryColors = {
  general: "from-ow-aqua to-ow-purple",
  code: "from-green-400 to-green-600",
  creative: "from-ow-purple to-ow-gold",
  analysis: "from-orange-400 to-orange-600",
};

export function ChatSidebar({
  conversations,
  onSelectConversation,
  onNewConversation,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedConversations = {
    today: filteredConversations.filter(
      (conv) => new Date().toDateString() === conv.timestamp.toDateString(),
    ),
    yesterday: filteredConversations.filter((conv) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toDateString() === conv.timestamp.toDateString();
    }),
    older: filteredConversations.filter((conv) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return conv.timestamp < yesterday;
    }),
  };

  return (
    <div className="border-gradient-to-b from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 from-ow-white/50 via-ow-white/60 to-ow-white/50 dark:from-ow-black/50 dark:via-ow-black/60 dark:to-ow-black/50 flex h-full w-80 flex-col border-r bg-gradient-to-b backdrop-blur-xl">
      {/* Header */}
      <div className="border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 border-b p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="from-ow-aqua via-ow-purple to-ow-gold bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
            AI Assistant
          </h2>
          <Button
            onClick={onNewConversation}
            size="sm"
            className="from-ow-aqua via-ow-purple to-ow-gold hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90 text-ow-white h-10 w-10 rounded-full bg-gradient-to-r p-0 shadow-lg"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="text-muted-foreground absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="from-ow-white/90 to-ow-white/95 dark:from-ow-black/90 dark:to-ow-black/95 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 focus:ring-gradient-to-r focus:from-ow-aqua/20 focus:to-ow-purple/20 w-full rounded-xl border-2 bg-gradient-to-r py-3 pl-12 pr-4 text-sm font-medium shadow-lg transition-all duration-300 focus:outline-none focus:ring-4"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="from-ow-aqua/10 to-ow-purple/10 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 hover:from-ow-aqua/20 hover:to-ow-purple/20 h-10 flex-1 bg-gradient-to-r text-xs font-semibold"
          >
            <Zap className="mr-1 h-3 w-3" />
            Quick
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="from-ow-purple/10 to-ow-gold/10 border-gradient-to-r from-ow-purple/30 to-ow-gold/30 hover:from-ow-purple/20 hover:to-ow-gold/20 h-10 flex-1 bg-gradient-to-r text-xs font-semibold"
          >
            <Brain className="mr-1 h-3 w-3" />
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
                  <div className="mb-3 flex items-center gap-3 px-3 py-2">
                    <Clock className="text-gradient-to-r from-ow-aqua to-ow-purple h-4 w-4" />
                    <span className="text-muted-foreground from-ow-aqua to-ow-purple bg-gradient-to-r bg-clip-text text-xs font-bold uppercase tracking-wider">
                      {period}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {convs.map((conversation) => {
                      const CategoryIcon = categoryIcons[conversation.category];
                      return (
                        <div
                          key={conversation.id}
                          onClick={() => onSelectConversation(conversation.id)}
                          className={cn(
                            "group relative cursor-pointer rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
                            conversation.isActive
                              ? "from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 border-gradient-to-r from-ow-aqua/40 to-ow-purple/40 border-2 bg-gradient-to-r shadow-lg"
                              : "hover:from-ow-aqua/10 hover:via-ow-purple/10 hover:to-ow-gold/10 hover:border-gradient-to-r hover:from-ow-aqua/20 hover:to-ow-purple/20 border border-transparent hover:bg-gradient-to-r",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "rounded-lg bg-gradient-to-r p-2",
                                categoryColors[conversation.category],
                              )}
                            >
                              <CategoryIcon className="h-4 w-4 text-white" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-center justify-between">
                                <h3 className="truncate text-sm font-semibold">
                                  {conversation.title}
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:from-ow-aqua/20 hover:to-ow-purple/20 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity hover:bg-gradient-to-r group-hover:opacity-100"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>

                              <p className="text-muted-foreground mb-3 truncate text-xs font-medium">
                                {conversation.lastMessage}
                              </p>

                              <div className="flex items-center justify-between">
                                <Badge
                                  className={cn(
                                    "border-0 bg-gradient-to-r text-xs font-semibold text-white",
                                    categoryColors[conversation.category],
                                  )}
                                >
                                  {conversation.category}
                                </Badge>
                                <span className="text-muted-foreground text-xs font-medium">
                                  {conversation.timestamp.toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:from-ow-gold/20 hover:to-ow-purple/20 h-6 w-6 rounded-full p-0 hover:bg-gradient-to-r"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 rounded-full p-0 text-red-500 hover:bg-gradient-to-r hover:from-red-400/20 hover:to-red-500/20 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {period !== "older" && (
                    <Separator className="from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 mt-6 bg-gradient-to-r" />
                  )}
                </div>
              ),
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
