"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  Share,
  Download,
  MoreVertical,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";

interface ChatHeaderProps {
  title: string;
  isOnline?: boolean;
  messageCount?: number;
}

export function ChatHeader({
  title,
  isOnline = true,
  messageCount = 0,
}: ChatHeaderProps) {
  return (
    <div className="border-gradient-to-r from-ow-aqua/20 via-ow-purple/20 to-ow-gold/20 from-ow-white/80 via-ow-white/90 to-ow-white/80 dark:from-ow-black/80 dark:via-ow-black/90 dark:to-ow-black/80 border-b bg-gradient-to-r p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="ring-gradient-to-r from-ow-aqua/30 to-ow-purple/30 h-12 w-12 shadow-lg ring-4">
              <AvatarImage src="/placeholder-logo.png" alt="AI Assistant" />
              <AvatarFallback className="from-ow-aqua via-ow-purple to-ow-gold text-ow-white bg-gradient-to-br text-lg font-bold">
                AI
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="border-3 border-ow-white dark:border-ow-black absolute -bottom-1 -right-1 h-5 w-5 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg" />
            )}
          </div>

          <div>
            <div className="mb-1 flex items-center gap-3">
              <h1 className="from-ow-aqua via-ow-purple to-ow-gold bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                {title}
              </h1>
              <Badge className="from-ow-purple via-ow-gold to-ow-purple text-ow-white border-0 bg-gradient-to-r px-3 py-1 font-bold shadow-lg">
                <Sparkles className="mr-1 h-3 w-3" />
                Pro
              </Badge>
            </div>

            <div className="text-muted-foreground flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-green-500" />
                <span>Online</span>
              </div>

              {messageCount > 0 && <span>{messageCount} messages</span>}

              <div className="flex items-center gap-2">
                <Shield className="text-gradient-to-r from-ow-aqua to-ow-purple h-4 w-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-aqua/20 hover:to-ow-purple/20 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Zap className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-purple/20 hover:to-ow-gold/20 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Share className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-gold/20 hover:to-ow-aqua/20 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-aqua/20 hover:to-ow-purple/20 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:from-ow-purple/20 hover:to-ow-gold/20 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
