"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  Heart,
  MessageCircle,
  PlusSquare,
  User,
  Compass,
  Bookmark,
  Settings,
  TrendingUp,
  Users,
  Bell,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "For You", href: "/town-talk", active: true },
  { icon: Search, label: "Explore", href: "/town-talk/explore" },
  { icon: Compass, label: "Discover", href: "/town-talk/discover" },
  { icon: TrendingUp, label: "Trending", href: "/town-talk/trending" },
  { icon: Users, label: "Following", href: "/town-talk/following" },
  {
    icon: Bell,
    label: "Notifications",
    href: "/town-talk/notifications",
    badge: 3,
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/town-talk/messages",
    badge: 5,
  },
  { icon: Heart, label: "Liked", href: "/town-talk/liked" },
  { icon: Bookmark, label: "Saved", href: "/town-talk/saved" },
  { icon: PlusSquare, label: "Create", href: "/town-talk/create" },
  { icon: User, label: "Profile", href: "/town-talk/profile" },
  { icon: Settings, label: "Settings", href: "/town-talk/settings" },
];

export function TownTalkSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      className={`fixed left-0 top-0 z-40 h-screen border-r border-white/20 bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95 backdrop-blur-xl transition-all duration-300 dark:border-gray-700/50 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-purple-900/95 ${collapsed ? "w-20" : "w-72"}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="border-b border-white/20 p-6 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                TownTalk
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Social Hub
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <motion.div
          className="border-b border-white/20 p-6 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Avatar className="ring-gradient-to-r h-12 w-12 from-cyan-500 to-purple-600 ring-2">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                John Doe
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @johndoe
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                1.2K
              </span>{" "}
              Following
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                5.4K
              </span>{" "}
              Followers
            </span>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-4">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <a href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`h-12 w-full justify-start gap-3 ${
                    item.active
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                      : "text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                  } ${collapsed ? "px-3" : "px-4"}`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-red-500 px-2 py-1 text-xs text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </a>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <div className="border-t border-white/20 p-4 dark:border-gray-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full hover:bg-white/50 dark:hover:bg-gray-800/50"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ←
          </motion.div>
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </motion.div>
  );
}
