"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "For You", href: "/town-talk", active: true },
  { icon: Search, label: "Explore", href: "/town-talk/explore" },
  { icon: Compass, label: "Discover", href: "/town-talk/discover" },
  { icon: TrendingUp, label: "Trending", href: "/town-talk/trending" },
  { icon: Users, label: "Following", href: "/town-talk/following" },
  { icon: Bell, label: "Notifications", href: "/town-talk/notifications", badge: 3 },
  { icon: MessageCircle, label: "Messages", href: "/town-talk/messages", badge: 5 },
  { icon: Heart, label: "Liked", href: "/town-talk/liked" },
  { icon: Bookmark, label: "Saved", href: "/town-talk/saved" },
  { icon: PlusSquare, label: "Create", href: "/town-talk/create" },
  { icon: User, label: "Profile", href: "/town-talk/profile" },
  { icon: Settings, label: "Settings", href: "/town-talk/settings" },
]

export function TownTalkSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-purple-900/95 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/50 z-40 transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                TownTalk
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Social Hub</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <motion.div
          className="p-6 border-b border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-gradient-to-r from-cyan-500 to-purple-600">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">@johndoe</p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">1.2K</span> Following
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">5.4K</span> Followers
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
                  className={`w-full justify-start gap-3 h-12 ${
                    item.active
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                      : "hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                  } ${collapsed ? "px-3" : "px-4"}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && <Badge className="bg-red-500 text-white text-xs px-2 py-1">{item.badge}</Badge>}
                    </>
                  )}
                </Button>
              </a>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <div className="p-4 border-t border-white/20 dark:border-gray-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full hover:bg-white/50 dark:hover:bg-gray-800/50"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ←
          </motion.div>
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </motion.div>
  )
}
