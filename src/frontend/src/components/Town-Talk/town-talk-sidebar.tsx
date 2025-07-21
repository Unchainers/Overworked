"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Home,
  Search,
  MessageCircle,
  PlusSquare,
  User,
  Settings,
  Bell,
  Bookmark,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Compass,
  Heart,
  HomeIcon,
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocation } from "react-router"

export function TownTalkSidebar() {

  const { theme } = useTheme()
  const location = useLocation()
  const pathname = location.pathname
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { name: "For You", href: "/town-talk", icon: Home, badge: null },
    { name: "Profile", href: "/town-talk/profile", icon: User, badge: null },
    { name: "Settings", href: "/town-talk/settings", icon: Settings, badge: null },
    { name: "Home", href: "/landing", icon: HomeIcon, badge: null },
  ]

  const userStats = {
    followers: 1247,
    following: 892,
    posts: 156,
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-purple-900/95 border-r border-cyan-500/20"
          : "bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95 border-r border-purple-500/20"
      } backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20 dark:border-gray-700/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    TownTalk
                  </h1>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Social Hub</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="w-8 h-8">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-white/20 dark:border-gray-700/50 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-gradient-to-r from-cyan-500 to-purple-600">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">JD</AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>John Doe</h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>@johndoe</p>
                <div className="flex space-x-4 mt-2">
                  <div className="text-xs">
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {userStats.followers}
                    </span>
                    <span className={`ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Followers</span>
                  </div>
                  <div className="text-xs">
                    <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {userStats.following}
                    </span>
                    <span className={`ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Following</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <ScrollArea className="flex-1 px-4">
        <nav className="py-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? `bg-gradient-to-r from-cyan-500/20 to-purple-600/20 ${
                            theme === "dark" ? "text-cyan-400" : "text-purple-600"
                          }`
                        : `hover:${theme === "dark" ? "bg-gray-800/50" : "bg-white/50"} ${
                            theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                          }`
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between flex-1"
                        >
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 dark:border-gray-700/50 flex-shrink-0">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Connected to ICP
                </span>
              </div>
              <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>© 2025 Overworked</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
