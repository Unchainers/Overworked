"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
  MessageSquare,
  ThumbsUp,
  Share2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useParams } from "react-router"

export default function CoursePlayerPage() {

  const { moduleId } = useParams<{ moduleId: string }>()
  const { theme } = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [progress, setProgress] = useState(35)

  // Mock course data
  const course = {
    id: moduleId,
    title: "Complete Web3 Development Bootcamp",
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        completed: true,
        lessons: [
          { id: 1, title: "What is Blockchain?", duration: "12:30", completed: true, type: "video" },
          { id: 2, title: "How Blockchain Works", duration: "15:45", completed: true, type: "video" },
          { id: 3, title: "Types of Blockchain", duration: "10:20", completed: true, type: "video" },
          { id: 4, title: "Quiz: Blockchain Basics", duration: "5:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 2,
        title: "Smart Contract Development",
        completed: false,
        lessons: [
          { id: 5, title: "Introduction to Solidity", duration: "18:30", completed: false, type: "video" },
          { id: 6, title: "Writing Your First Contract", duration: "22:15", completed: false, type: "video" },
          { id: 7, title: "Contract Deployment", duration: "16:40", completed: false, type: "video" },
          { id: 8, title: "Hands-on Project", duration: "30:00", completed: false, type: "project" },
        ],
      },
      {
        id: 3,
        title: "Web3 Integration",
        completed: false,
        lessons: [
          { id: 9, title: "Web3.js Basics", duration: "14:20", completed: false, type: "video" },
          { id: 10, title: "Connecting to MetaMask", duration: "12:50", completed: false, type: "video" },
          { id: 11, title: "Building a DApp Frontend", duration: "25:30", completed: false, type: "video" },
        ],
      },
    ],
  }

  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })),
  )

  const currentLessonData = allLessons[currentLesson]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  const selectLesson = (index: number) => {
    setCurrentLesson(index)
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4" />
      case "quiz":
        return <MessageSquare className="w-4 h-4" />
      case "project":
        return <BookOpen className="w-4 h-4" />
      default:
        return <PlayCircle className="w-4 h-4" />
    }
  }

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
        className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
          theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-lg font-semibold truncate max-w-md">{course.title}</h1>
              <p className="text-sm opacity-70">{currentLessonData?.moduleTitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span>Progress:</span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
              <span>{progress}%</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className={`fixed lg:relative z-40 w-80 h-full border-r overflow-y-auto ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Course Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Course Progress</h3>
                <Badge variant="secondary">{progress}%</Badge>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm opacity-70">
                {allLessons.filter((l) => l.completed).length} of {allLessons.length} lessons completed
              </p>
            </div>

            {/* Module Navigation */}
            <div className="space-y-4">
              <h3 className="font-semibold">Course Content</h3>

              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-2">
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        module.completed ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                      }`}
                    >
                      {module.completed ? <CheckCircle className="w-3 h-3" /> : moduleIndex + 1}
                    </div>
                    <span className="font-medium text-sm">{module.title}</span>
                  </div>

                  <div className="ml-4 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const globalIndex =
                        course.modules.slice(0, moduleIndex).reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex

                      return (
                        <motion.button
                          key={lesson.id}
                          onClick={() => selectLesson(globalIndex)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                            currentLesson === globalIndex
                              ? theme === "dark"
                                ? "bg-cyan-500/20 border border-cyan-500/30"
                                : "bg-cyan-50 border border-cyan-200"
                              : theme === "dark"
                                ? "hover:bg-gray-700/30"
                                : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 ${
                              lesson.completed
                                ? "text-green-400"
                                : currentLesson === globalIndex
                                  ? "text-cyan-400"
                                  : "text-gray-400"
                            }`}
                          >
                            {lesson.completed ? <CheckCircle className="w-4 h-4" /> : getLessonIcon(lesson.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <div className="flex items-center space-x-2 text-xs opacity-70">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                          {!lesson.completed && globalIndex > currentLesson && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Video Player */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative bg-black aspect-video">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
              </motion.button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">2:30</span>
                  <div className="flex-1">
                    <Progress value={25} className="h-1 bg-white/20" />
                  </div>
                  <span className="text-white text-sm">18:30</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevLesson}
                      disabled={currentLesson === 0}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextLesson}
                      disabled={currentLesson === allLessons.length - 1}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Volume2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Title Overlay */}
            <div className="absolute top-6 left-6 text-white">
              <h2 className="text-xl font-semibold">{currentLessonData?.title}</h2>
              <p className="text-sm opacity-80">{currentLessonData?.moduleTitle}</p>
            </div>
          </motion.div>

          {/* Lesson Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Lesson Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{currentLessonData?.title}</h1>
                  <p className="opacity-70">{currentLessonData?.moduleTitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Resources
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Lesson Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className={`${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">About this lesson</h3>
                  <p className="leading-relaxed opacity-80">
                    In this lesson, we'll dive deep into the fundamentals of blockchain technology. You'll learn about
                    distributed ledgers, consensus mechanisms, and how transactions are validated and recorded on the
                    blockchain. We'll also explore different types of blockchain networks and their use cases.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Blockchain</Badge>
                    <Badge variant="secondary">Fundamentals</Badge>
                    <Badge variant="secondary">Web3</Badge>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between pt-6 border-t"
            >
              <Button
                variant="outline"
                onClick={prevLesson}
                disabled={currentLesson === 0}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </Button>

              <div className="text-center">
                <p className="text-sm opacity-70">
                  Lesson {currentLesson + 1} of {allLessons.length}
                </p>
              </div>

              <Button
                onClick={nextLesson}
                disabled={currentLesson === allLessons.length - 1}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
