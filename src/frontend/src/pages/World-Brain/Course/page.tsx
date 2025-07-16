"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  BookOpen,
  Download,
  Share2,
  Heart,
  CheckCircle,
  PlayCircle,
  Globe,
  Calendar,
  TrendingUp,
  Coins,
} from "lucide-react";
import { useParams } from "react-router";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock course data - in real app, fetch based on params.id
  const course = {
    id: id,
    title: "Complete Web3 Development Bootcamp",
    instructor: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "Senior Blockchain Developer",
      rating: 4.9,
      students: 15420,
      courses: 12,
    },
    rating: 4.8,
    students: 8547,
    duration: "12 weeks",
    level: "Intermediate",
    language: "English",
    lastUpdated: "December 2024",
    price: "Free",
    cryReward: 500,
    category: "Technology",
    description:
      "Master the fundamentals of Web3 development and build decentralized applications on the blockchain. This comprehensive course covers everything from smart contracts to DeFi protocols.",
    whatYouLearn: [
      "Build smart contracts with Solidity",
      "Create decentralized applications (DApps)",
      "Understand blockchain fundamentals",
      "Work with Web3.js and Ethers.js",
      "Deploy to Ethereum and other networks",
      "Implement DeFi protocols",
      "Security best practices",
      "Testing and debugging techniques",
    ],
    requirements: [
      "Basic JavaScript knowledge",
      "Understanding of HTML/CSS",
      "Familiarity with React (helpful but not required)",
      "Computer with internet connection",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        lessons: 8,
        duration: "2h 30m",
        completed: true,
      },
      {
        id: 2,
        title: "Smart Contract Development",
        lessons: 12,
        duration: "4h 15m",
        completed: false,
      },
      {
        id: 3,
        title: "Web3 Integration",
        lessons: 10,
        duration: "3h 45m",
        completed: false,
      },
      {
        id: 4,
        title: "DeFi Protocols",
        lessons: 15,
        duration: "5h 20m",
        completed: false,
      },
      {
        id: 5,
        title: "Advanced Topics",
        lessons: 9,
        duration: "3h 10m",
        completed: false,
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent course! Alex explains complex concepts in a very understandable way. The hands-on projects really helped me grasp Web3 development.",
      },
      {
        id: 2,
        user: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Best Web3 course I've taken. The CRY token rewards are a nice bonus, and the community is very supportive.",
      },
      {
        id: 3,
        user: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "3 weeks ago",
        comment:
          "Great content and well-structured. Would love to see more advanced DeFi topics in future updates.",
      },
    ],
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <Navbar />

      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full opacity-20"
          style={{
            background: "linear-gradient(45deg, #4fc4cf, #994ff3)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20"
          style={{
            background: "linear-gradient(45deg, #994ff3, #fbbf24)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Course Info */}
            <div className="space-y-8 lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm opacity-70">
                <span>World Brain</span>
                <span>/</span>
                <span>{course.category}</span>
                <span>/</span>
                <span className="text-cyan-400">{course.title}</span>
              </div>

              {/* Course Title & Basic Info */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold leading-tight lg:text-5xl"
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl leading-relaxed opacity-80"
                >
                  {course.description}
                </motion.p>

                {/* Course Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="opacity-70">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-400" />
                    <span>Updated {course.lastUpdated}</span>
                  </div>
                </motion.div>

                {/* Instructor Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-4 rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={course.instructor.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {course.instructor.name}
                    </h3>
                    <p className="opacity-70">{course.instructor.title}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>{course.instructor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span>
                          {course.instructor.students.toLocaleString()} students
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                        <span>{course.instructor.courses} courses</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Course Demo Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, rgba(79, 196, 207, 0.1), rgba(153, 79, 243, 0.1))"
                      : "linear-gradient(135deg, rgba(79, 196, 207, 0.2), rgba(153, 79, 243, 0.2))",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30"
                  >
                    <Play className="ml-1 h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-80">Course Preview</p>
                  <p className="font-semibold">
                    Introduction to Web3 Development
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-1"
            >
              <Card
                className={`sticky top-24 ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200 bg-white/50"
                } backdrop-blur-sm`}
              >
                <CardContent className="space-y-6 p-8">
                  {/* Price & CRY Reward */}
                  <div className="space-y-4 text-center">
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-green-400">
                        {course.price}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-yellow-400">
                        <Coins className="h-5 w-5" />
                        <span className="font-semibold">
                          +{course.cryReward} CRY Tokens
                        </span>
                      </div>
                    </div>

                    {!isEnrolled ? (
                      <Button
                        onClick={handleEnroll}
                        className="h-12 w-full border-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-600"
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Enroll Now
                      </Button>
                    ) : (
                      <Button className="h-12 w-full border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-lg font-semibold text-white hover:from-green-600 hover:to-emerald-600">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Continue Learning
                      </Button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleFavorite}
                      className={`flex-1 ${isFavorited ? "border-red-500 text-red-500" : ""}`}
                    >
                      <Heart
                        className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
                      />
                      {isFavorited ? "Favorited" : "Favorite"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  {/* Course Includes */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <PlayCircle className="h-4 w-4 text-cyan-400" />
                        <span>18 hours of video content</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                        <span>54 lessons across 5 modules</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Download className="h-4 w-4 text-green-400" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-yellow-400" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-4 w-4 text-orange-400" />
                        <span>Lifetime access</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Level */}
                  <div className="flex items-center justify-between text-sm">
                    <span>Level:</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Course Content Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="container mx-auto px-4 py-12"
        >
          <Tabs defaultValue="curriculum" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Course Curriculum</h3>
                <p className="opacity-70">
                  {course.modules.length} modules •{" "}
                  {course.modules.reduce(
                    (acc, module) => acc + module.lessons,
                    0,
                  )}{" "}
                  lessons • 18h 30m total length
                </p>
              </div>

              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`${
                        theme === "dark"
                          ? "border-gray-700 bg-gray-800/30"
                          : "border-gray-200 bg-white/30"
                      } backdrop-blur-sm`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                module.completed
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-700"
                              }`}
                            >
                              {module.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">
                                {module.title}
                              </h4>
                              <p className="text-sm opacity-70">
                                {module.lessons} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold">
                      What you'll learn
                    </h3>
                    <div className="grid gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold">Requirements</h3>
                    <div className="grid gap-3">
                      {course.requirements.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="space-y-8">
              <Card
                className={`${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800/30"
                    : "border-gray-200 bg-white/30"
                } backdrop-blur-sm`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={course.instructor.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-2xl">
                        {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {course.instructor.name}
                        </h3>
                        <p className="text-lg opacity-70">
                          {course.instructor.title}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">
                            {course.instructor.rating}
                          </div>
                          <div className="text-sm opacity-70">
                            Instructor Rating
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400">
                            {course.instructor.students.toLocaleString()}
                          </div>
                          <div className="text-sm opacity-70">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {course.instructor.courses}
                          </div>
                          <div className="text-sm opacity-70">Courses</div>
                        </div>
                      </div>

                      <p className="leading-relaxed opacity-80">
                        Alex is a seasoned blockchain developer with over 8
                        years of experience in Web3 technologies. He has worked
                        with leading DeFi protocols and has helped thousands of
                        students transition into blockchain development. His
                        teaching style focuses on practical, hands-on learning
                        with real-world projects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Student Reviews</h3>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-current text-yellow-400" />
                  <span className="text-xl font-bold">{course.rating}</span>
                  <span className="opacity-70">
                    ({course.students.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {course.reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`${
                        theme === "dark"
                          ? "border-gray-700 bg-gray-800/30"
                          : "border-gray-200 bg-white/30"
                      } backdrop-blur-sm`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={review.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{review.user}</h4>
                              <span className="text-sm opacity-70">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-current text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="leading-relaxed opacity-80">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
