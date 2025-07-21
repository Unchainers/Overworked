"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function WorkBayLoading() {
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800/30 to-purple-900/30"
          : "bg-gradient-to-br from-gray-50 via-cyan-50/30 to-purple-50/30"
      } transition-colors duration-300`}
    >
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Skeleton className="h-20 w-80 mx-auto mb-6" />
              <Skeleton className="h-6 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-80 mx-auto mb-8" />
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Skeleton className="h-14 w-48" />
              <Skeleton className="h-14 w-32" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className={`${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50"
                      : "bg-gradient-to-br from-white/50 to-cyan-50/30 border-purple-200/50"
                  } backdrop-blur-xl`}
                >
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-8 h-8 mx-auto mb-3 rounded" />
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                className={`h-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50"
                    : "bg-gradient-to-br from-white/50 to-cyan-50/30 border-purple-200/50"
                } backdrop-blur-xl`}
              >
                <CardContent className="p-8 text-center">
                  <Skeleton className="w-16 h-16 mx-auto mb-6 rounded-2xl" />
                  <Skeleton className="h-6 w-32 mx-auto mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-48 mx-auto mb-6" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>

          {/* Filters Skeleton */}
          <Card
            className={`mb-8 ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50"
                : "bg-gradient-to-br from-white/50 to-cyan-50/30 border-purple-200/50"
            } backdrop-blur-xl`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="w-full lg:w-48 h-10" />
                <Skeleton className="w-full lg:w-48 h-10" />
                <Skeleton className="w-full lg:w-48 h-10" />
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className={`h-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-gray-700/50"
                    : "bg-gradient-to-br from-white/50 to-cyan-50/30 border-purple-200/50"
                } backdrop-blur-xl`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="w-6 h-6" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center space-x-2">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-10 h-10" />
          </div>
        </div>
      </section>

      {/* Loading Animation */}
      <div className="fixed bottom-8 right-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    </div>
  )
}
