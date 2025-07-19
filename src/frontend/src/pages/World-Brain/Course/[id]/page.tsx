"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  CheckCircle,
  PlayCircle,
  Lock,
  Clock,
  BookOpen,
  Download,
  ThumbsUp,
  Share2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Award,
  FileText,
  Video,
  HelpCircle,
} from "lucide-react";
import { useParams } from "react-router";

export default function CoursePlayerPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(35);
  const [videoProgress, setVideoProgress] = useState(25);
  const [volume, setVolume] = useState(80);

  // Mock course data
  const course = {
    id: moduleId,
    title: "Complete Web3 Development Bootcamp",
    instructor: "Alex Chen",
    rating: 4.9,
    students: 12500,
    totalDuration: "12 hours",
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        completed: true,
        duration: "2.5 hours",
        lessons: [
          {
            id: 1,
            title: "What is Blockchain?",
            duration: "12:30",
            completed: true,
            type: "video",
          },
          {
            id: 2,
            title: "How Blockchain Works",
            duration: "15:45",
            completed: true,
            type: "video",
          },
          {
            id: 3,
            title: "Types of Blockchain",
            duration: "10:20",
            completed: true,
            type: "video",
          },
          {
            id: 4,
            title: "Quiz: Blockchain Basics",
            duration: "5:00",
            completed: false,
            type: "quiz",
          },
        ],
      },
      {
        id: 2,
        title: "Smart Contract Development",
        completed: false,
        duration: "4.5 hours",
        lessons: [
          {
            id: 5,
            title: "Introduction to Solidity",
            duration: "18:30",
            completed: false,
            type: "video",
          },
          {
            id: 6,
            title: "Writing Your First Contract",
            duration: "22:15",
            completed: false,
            type: "video",
          },
          {
            id: 7,
            title: "Contract Deployment",
            duration: "16:40",
            completed: false,
            type: "video",
          },
          {
            id: 8,
            title: "Hands-on Project",
            duration: "30:00",
            completed: false,
            type: "project",
          },
        ],
      },
      {
        id: 3,
        title: "Web3 Integration",
        completed: false,
        duration: "3.5 hours",
        lessons: [
          {
            id: 9,
            title: "Web3.js Basics",
            duration: "14:20",
            completed: false,
            type: "video",
          },
          {
            id: 10,
            title: "Connecting to MetaMask",
            duration: "12:50",
            completed: false,
            type: "video",
          },
          {
            id: 11,
            title: "Building a DApp Frontend",
            duration: "25:30",
            completed: false,
            type: "video",
          },
        ],
      },
      {
        id: 4,
        title: "Advanced Topics",
        completed: false,
        duration: "2.5 hours",
        lessons: [
          {
            id: 12,
            title: "Security Best Practices",
            duration: "18:45",
            completed: false,
            type: "video",
          },
          {
            id: 13,
            title: "Gas Optimization",
            duration: "16:30",
            completed: false,
            type: "video",
          },
          {
            id: 14,
            title: "Final Project",
            duration: "45:00",
            completed: false,
            type: "project",
          },
        ],
      },
    ],
  };

  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })),
  );

  const currentLessonData = allLessons[currentLesson];
  const completedLessons = allLessons.filter((l) => l.completed).length;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const selectLesson = (index: number) => {
    setCurrentLesson(index);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4" />;
      case "project":
        return <FileText className="h-4 w-4" />;
      default:
        return <PlayCircle className="h-4 w-4" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-400";
      case "quiz":
        return "text-yellow-400";
      case "project":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-sm ${
          theme === "dark"
            ? "border-gray-800 bg-gray-900/95"
            : "border-gray-200 bg-white/95"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="max-w-md truncate text-lg font-bold">
                  {course.title}
                </h1>
                <p className="text-sm opacity-70">by {course.instructor}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden items-center space-x-4 text-sm md:flex">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span>Progress:</span>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
                <span className="font-medium">{progress}%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-[73px]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: sidebarOpen ? 0 : -400 }}
          animate={{ x: sidebarOpen ? 0 : -400 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed bottom-0 left-0 top-[73px] z-40 w-96 overflow-hidden border-r ${
            sidebarOpen ? "block" : "hidden lg:block"
          } ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div
              className="flex-shrink-0 border-b border-opacity-20 p-6"
              style={{ borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Course Content</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Course Stats */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {completedLessons}
                  </div>
                  <div className="text-xs opacity-70">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {allLessons.length}
                  </div>
                  <div className="text-xs opacity-70">Total Lessons</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </div>

            {/* Module Navigation */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {course.modules.map((module, moduleIndex) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: moduleIndex * 0.1 }}
                  className="space-y-3"
                >
                  {/* Module Header */}
                  <div
                    className={`rounded-xl border p-4 ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-700/50"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            module.completed
                              ? "bg-green-500 text-white"
                              : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          }`}
                        >
                          {module.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            moduleIndex + 1
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            {module.title}
                          </h4>
                          <p className="text-xs opacity-70">
                            {module.duration}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={module.completed ? "default" : "secondary"}
                        className={module.completed ? "bg-green-500" : ""}
                      >
                        {module.completed ? "Complete" : "In Progress"}
                      </Badge>
                    </div>
                  </div>

                  {/* Module Lessons */}
                  <div className="ml-2 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const globalIndex =
                        course.modules
                          .slice(0, moduleIndex)
                          .reduce((acc, m) => acc + m.lessons.length, 0) +
                        lessonIndex;

                      return (
                        <motion.button
                          key={lesson.id}
                          onClick={() => selectLesson(globalIndex)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-all duration-200 ${
                            currentLesson === globalIndex
                              ? theme === "dark"
                                ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                                : "border border-cyan-200 bg-gradient-to-r from-cyan-50 to-purple-50"
                              : theme === "dark"
                                ? "hover:bg-gray-700/50"
                                : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 ${
                              lesson.completed
                                ? "text-green-400"
                                : currentLesson === globalIndex
                                  ? "text-cyan-400"
                                  : getLessonTypeColor(lesson.type)
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              getLessonIcon(lesson.type)
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {lesson.title}
                            </p>
                            <div className="flex items-center space-x-2 text-xs opacity-70">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                              <Badge
                                variant="outline"
                                className="px-1 py-0 text-xs"
                              >
                                {lesson.type}
                              </Badge>
                            </div>
                          </div>
                          {!lesson.completed && globalIndex > currentLesson && (
                            <Lock className="h-4 w-4 text-gray-400" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main
          className={`flex flex-1 flex-col ${sidebarOpen ? "ml-96" : "ml-0"} transition-all duration-300`}
        >
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-video flex-shrink-0 bg-black"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white" />
                ) : (
                  <Play className="ml-1 h-10 w-10 text-white transition-all group-hover:ml-2" />
                )}
              </motion.button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-white">2:30</span>
                  <div className="relative flex-1">
                    <Progress
                      value={videoProgress}
                      className="h-2 bg-white/20"
                    />
                    <div className="absolute left-0 right-0 top-0 h-2 cursor-pointer" />
                  </div>
                  <span className="text-sm font-medium text-white">18:30</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevLesson}
                      disabled={currentLesson === 0}
                      className="text-white hover:bg-white/20 disabled:opacity-50"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlay}
                      className="h-12 w-12 text-white hover:bg-white/20"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextLesson}
                      disabled={currentLesson === allLessons.length - 1}
                      className="text-white hover:bg-white/20 disabled:opacity-50"
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-white" />
                      <div className="w-20">
                        <Progress value={volume} className="h-1 bg-white/20" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Title Overlay */}
            <div className="absolute left-6 top-6 text-white">
              <h2 className="mb-1 text-2xl font-bold">
                {currentLessonData?.title}
              </h2>
              <p className="text-sm opacity-80">
                {currentLessonData?.moduleTitle}
              </p>
            </div>

            {/* Lesson Counter */}
            <div className="absolute right-6 top-6 text-white">
              <div className="rounded-lg bg-black/50 px-3 py-1 backdrop-blur-sm">
                <span className="text-sm font-medium">
                  {currentLesson + 1} / {allLessons.length}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Lesson Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-8 p-8">
              {/* Lesson Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">
                      {currentLessonData?.title}
                    </h1>
                    <p className="text-lg opacity-70">
                      {currentLessonData?.moduleTitle}
                    </p>
                    <div className="flex items-center space-x-4 text-sm opacity-80">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{currentLessonData?.duration}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {currentLessonData?.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Resources
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Like
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Lesson Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  className={`${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"} backdrop-blur-sm`}
                >
                  <CardContent className="space-y-6 p-8">
                    <h3 className="text-xl font-semibold">About this lesson</h3>
                    <p className="text-lg leading-relaxed opacity-90">
                      In this comprehensive lesson, we'll dive deep into the
                      fundamentals of blockchain technology. You'll learn about
                      distributed ledgers, consensus mechanisms, and how
                      transactions are validated and recorded on the blockchain.
                      We'll also explore different types of blockchain networks
                      and their real-world use cases.
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-semibold">What you'll learn:</h4>
                      <ul className="space-y-2 opacity-80">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span>
                            Understanding the core principles of blockchain
                            technology
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span>
                            How consensus mechanisms ensure network security
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span>
                            Different types of blockchain networks and their
                            applications
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span>Real-world examples and case studies</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Blockchain</Badge>
                      <Badge variant="secondary">Fundamentals</Badge>
                      <Badge variant="secondary">Web3</Badge>
                      <Badge variant="secondary">Beginner Friendly</Badge>
                      <Badge variant="secondary">Theory</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between border-t pt-8"
              >
                <Button
                  variant="outline"
                  onClick={prevLesson}
                  disabled={currentLesson === 0}
                  className="flex items-center space-x-2 bg-transparent px-6 py-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous Lesson</span>
                </Button>

                <div className="space-y-1 text-center">
                  <p className="text-sm opacity-70">Lesson Progress</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-cyan-400">
                      {currentLesson + 1}
                    </span>
                    <span className="opacity-50">/</span>
                    <span className="text-lg font-bold">
                      {allLessons.length}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={nextLesson}
                  disabled={currentLesson === allLessons.length - 1}
                  className="flex items-center space-x-2 border-0 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-white hover:from-cyan-600 hover:to-purple-600"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
