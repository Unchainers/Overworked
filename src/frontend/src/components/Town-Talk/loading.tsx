"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TownTalkLoading() {
  const { theme } = useTheme();

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
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Skeleton className="mx-auto mb-6 h-20 w-80" />
              <Skeleton className="mx-auto mb-4 h-6 w-96" />
              <Skeleton className="mx-auto mb-8 h-6 w-80" />
            </motion.div>

            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Skeleton className="h-14 w-48" />
              <Skeleton className="h-14 w-32" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className={`${
                    theme === "dark"
                      ? "border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-purple-900/30"
                      : "border-purple-200/50 bg-gradient-to-br from-white/50 to-cyan-50/30"
                  } backdrop-blur-xl`}
                >
                  <CardContent className="p-6 text-center">
                    <Skeleton className="mx-auto mb-3 h-8 w-8 rounded" />
                    <Skeleton className="mx-auto mb-2 h-8 w-16" />
                    <Skeleton className="mx-auto h-4 w-20" />
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
          <div className="mb-16 text-center">
            <Skeleton className="mx-auto mb-6 h-12 w-64" />
            <Skeleton className="mx-auto h-6 w-96" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                className={`h-full ${
                  theme === "dark"
                    ? "border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-purple-900/30"
                    : "border-purple-200/50 bg-gradient-to-br from-white/50 to-cyan-50/30"
                } backdrop-blur-xl`}
              >
                <CardContent className="p-8 text-center">
                  <Skeleton className="mx-auto mb-6 h-16 w-16 rounded-2xl" />
                  <Skeleton className="mx-auto mb-4 h-6 w-32" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mx-auto h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto mb-6 h-12 w-48" />
            <Skeleton className="mx-auto h-6 w-80" />
          </div>

          {/* Filters Skeleton */}
          <Card
            className={`mb-8 ${
              theme === "dark"
                ? "border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-purple-900/30"
                : "border-purple-200/50 bg-gradient-to-br from-white/50 to-cyan-50/30"
            } backdrop-blur-xl`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-full lg:w-48" />
                <Skeleton className="h-10 w-full lg:w-48" />
                <Skeleton className="h-10 w-full lg:w-48" />
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid Skeleton */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className={`h-full ${
                  theme === "dark"
                    ? "border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-purple-900/30"
                    : "border-purple-200/50 bg-gradient-to-br from-white/50 to-cyan-50/30"
                } backdrop-blur-xl`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="mb-2 h-4 w-32" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-6" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Skeleton className="mb-2 h-6 w-48" />
                    <Skeleton className="mb-1 h-4 w-full" />
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
                    <div className="mb-4 flex items-center justify-between">
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
          <div className="flex items-center justify-center space-x-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </section>

      {/* Loading Animation */}
      <div className="fixed bottom-8 right-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="h-12 w-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500"
        />
      </div>
    </div>
  );
}
