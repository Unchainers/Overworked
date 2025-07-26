"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Home, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router";
import { TownTalkTabs } from "@/types/town-talk-types";
import { UserAccount } from "../../../../declarations/towntalk/towntalk.did";

export function TownTalkSidebar({
  setTab,
  currentTab,
}: {
  setTab: (tab: TownTalkTabs) => void;
  currentTab: TownTalkTabs;
}) {
  const { theme } = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userAccount: UserAccount = JSON.parse(
    localStorage.getItem("town_talk_account") ?? "[]",
  )[0];

  const navigationItems: Array<{
    name: string;
    icon: React.ElementType;
    tab: TownTalkTabs;
  }> = [
    { name: "For You", icon: Home, tab: "Feeds" },
    { name: "Profile", icon: User, tab: "Profile" },
    {
      name: "Settings",
      icon: Settings,
      tab: "Settings",
    },
  ];

  function getInitials(username: string): string {
    // Split by dash, space, or underscore
    const splittedName = username.split(/[-_\s]+/);

    let initials = "";

    for (let i = 0; i < splittedName.length; ++i) {
      initials += splittedName[i][0];
    }

    return initials;
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col ${
        theme === "dark"
          ? "border-r border-cyan-500/20 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-purple-900/95"
          : "border-r border-purple-500/20 bg-gradient-to-br from-white/95 via-cyan-50/90 to-purple-50/95"
      } backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/20 p-6 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
                  <span className="text-lg font-bold text-white">T</span>
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                    TownTalk
                  </h1>
                  <p
                    className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Social Hub
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex-shrink-0 border-b border-white/20 p-6 dark:border-gray-700/50">
        <div className="flex items-center space-x-3">
          <Avatar className="ring-gradient-to-r h-12 w-12 from-cyan-500 to-purple-600 ring-2">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
              {getInitials(userAccount.profile.username)}
            </AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <h3
                  className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {userAccount.profile.username}
                </h3>
                <p
                  className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  @{userAccount.profile.username}
                </p>
                <div className="mt-2 flex space-x-4">
                  <div className="text-xs">
                    <span
                      className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {userAccount.followers.length}
                    </span>
                    <span
                      className={`ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Followers
                    </span>
                  </div>
                  <div className="text-xs">
                    <span
                      className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {userAccount.following.length}
                    </span>
                    <span
                      className={`ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Following
                    </span>
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
              const isActive = currentTab === item.tab;
              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    className={`group flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r from-cyan-500/20 to-purple-600/20 ${
                            theme === "dark"
                              ? "text-cyan-400"
                              : "text-purple-600"
                          }`
                        : `hover:${theme === "dark" ? "bg-gray-800/50" : "bg-white/50"} ${
                            theme === "dark"
                              ? "text-gray-300 hover:text-white"
                              : "text-gray-700 hover:text-gray-900"
                          }`
                    }`}
                  >
                    {React.createElement(item.icon, {
                      className: `h-5 w-5 ${isActive ? "animate-pulse" : ""}`,
                    })}

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          onClick={() => setTab(item.tab)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-1 items-center justify-between"
                        >
                          <span className="font-medium">{item.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-white/20 p-4 dark:border-gray-700/50">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="mb-2 flex items-center justify-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500"></div>
                <span
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Connected to ICP
                </span>
              </div>
              <p
                className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
              >
                © 2025 Overworked
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
