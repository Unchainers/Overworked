"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Award,
  BookOpen,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Play,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useTheme } from "@/contexts/ThemeProvider"
import {Navbar} from "@/components/Layouts/navbar"
import {Footer} from "@/components/Layouts/footer"

// Mock data for courses
const featuredCourses = [
  {
    id: 1,
    title: "Blockchain Development Mastery",
    instructor: "Alex Chen",
    rating: 4.9,
    students: 12500,
    duration: "8 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    level: "Advanced",
    description: "Master blockchain development with hands-on projects and real-world applications.",
  },
  {
    id: 2,
    title: "Digital Art & NFT Creation",
    instructor: "Maya Rodriguez",
    rating: 4.8,
    students: 8900,
    duration: "6 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Art & Design",
    level: "Intermediate",
    description: "Create stunning digital art and learn how to mint and sell NFTs.",
  },
  {
    id: 3,
    title: "Web3 Marketing Strategies",
    instructor: "David Kim",
    rating: 4.7,
    students: 6700,
    duration: "4 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    level: "Beginner",
    description: "Learn cutting-edge marketing strategies for the Web3 ecosystem.",
  },
]

const allCourses = [
  ...featuredCourses,
  {
    id: 4,
    title: "Smart Contract Security",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 5400,
    duration: "5 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    level: "Advanced",
    description: "Learn to identify and prevent security vulnerabilities in smart contracts.",
  },
  {
    id: 5,
    title: "DeFi Protocol Design",
    instructor: "Michael Brown",
    rating: 4.6,
    students: 4200,
    duration: "7 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Finance",
    level: "Advanced",
    description: "Design and build decentralized finance protocols from scratch.",
  },
  {
    id: 6,
    title: "Community Building in Web3",
    instructor: "Lisa Wang",
    rating: 4.8,
    students: 7800,
    duration: "3 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Community",
    level: "Beginner",
    description: "Build and grow thriving communities in the Web3 space.",
  },
  {
    id: 7,
    title: "Cryptocurrency Trading",
    instructor: "James Wilson",
    rating: 4.5,
    students: 9200,
    duration: "6 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Finance",
    level: "Intermediate",
    description: "Master cryptocurrency trading strategies and risk management.",
  },
  {
    id: 8,
    title: "Metaverse Development",
    instructor: "Emma Davis",
    rating: 4.7,
    students: 3600,
    duration: "10 weeks",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    level: "Advanced",
    description: "Build immersive metaverse experiences using cutting-edge technologies.",
  },
]

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Blockchain Developer",
    avatar: "/placeholder-user.jpg",
    content:
      "World Brain transformed my career. The courses are incredibly detailed and the community support is amazing. I landed my dream job in Web3!",
    rating: 5,
    tokens: 2500,
  },
  {
    name: "Maria Garcia",
    role: "NFT Artist",
    avatar: "/placeholder-user.jpg",
    content:
      "The digital art course helped me mint my first NFT collection. I've earned over 10,000 CRY tokens while learning valuable skills!",
    rating: 5,
    tokens: 10000,
  },
  {
    name: "John Lee",
    role: "DeFi Analyst",
    avatar: "/placeholder-user.jpg",
    content:
      "World Brain's DeFi courses are unmatched. The practical approach and real-world projects prepared me for the industry perfectly.",
    rating: 5,
    tokens: 7500,
  },
]

const learningBenefits = [
  {
    icon: Brain,
    title: "Expert-Led Courses",
    description: "Learn from industry leaders and Web3 pioneers with real-world experience.",
  },
  {
    icon: Zap,
    title: "Earn While Learning",
    description: "Get rewarded with CRY tokens for completing courses, quizzes, and projects.",
  },
  {
    icon: Target,
    title: "Practical Projects",
    description: "Build real applications and portfolios that showcase your skills to employers.",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with learners worldwide and build your professional network.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn blockchain-verified certificates that prove your expertise.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Access exclusive job opportunities and career advancement resources.",
  },
]

export default function WorldBrainPage() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 6

  // Filter and sort courses
  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "students") return b.students - a.students
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage)

  const categories = ["all", "Technology", "Art & Design", "Marketing", "Finance", "Community"]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-16 h-16 text-cyan-400 mr-4" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                World Brain
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-80">
              Unlock your potential in the digital age. Learn, create, and earn in Overworked's premier educational
              ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-lg opacity-70">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-lg opacity-70">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1M+</div>
              <div className="text-lg opacity-70">CRY Tokens Earned</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Learn at World Brain Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Why Learn at World Brain?
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Experience the future of education with our innovative platform designed for the Web3 era.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="opacity-80">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Discover our most popular courses taught by industry experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">{course.level}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <span className="text-lg font-bold text-green-400">{course.price}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm opacity-80 mb-4">{course.description}</p>
                    <div className="flex items-center text-sm opacity-70 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{course.instructor}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-sm opacity-70 ml-2">({course.students.toLocaleString()})</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              All Courses
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Explore our complete catalog of courses across various Web3 disciplines.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="students">Sort by Students</SelectItem>
                    <SelectItem value="title">Sort by Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm opacity-70 mb-6">
              Showing {paginatedCourses.length} of {filteredCourses.length} courses
            </div>
          </motion.div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">{course.level}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <span className="text-lg font-bold text-green-400">{course.price}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm opacity-80 mb-4">{course.description}</p>
                    <div className="flex items-center text-sm opacity-70 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{course.instructor}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-sm opacity-70 ml-2">({course.students.toLocaleString()})</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e: { preventDefault: () => void }) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What You'll Learn
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Gain cutting-edge skills that will prepare you for the future of work in the digital economy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Blockchain Fundamentals</h3>
                    <p className="opacity-80">
                      Master the core concepts of blockchain technology, smart contracts, and decentralized systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Web3 Development</h3>
                    <p className="opacity-80">
                      Build decentralized applications (dApps) using modern frameworks and tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Digital Economy</h3>
                    <p className="opacity-80">
                      Understand tokenomics, DeFi protocols, and the economics of digital assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Community Building</h3>
                    <p className="opacity-80">Learn to build and manage thriving communities in the Web3 ecosystem.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Learning illustration"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* World Brain Testimony Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Hear from our learners who transformed their careers and earned CRY tokens through World Brain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="mb-4 italic">"{testimonial.content}"</p>

                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        {testimonial.tokens.toLocaleString()} CRY Earned
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
              Ready to Expand Your Mind?
            </h2>
            <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are building the future. Start your journey in World Brain today and earn
              CRY tokens while you learn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Free</div>
                <div className="text-lg opacity-70">All Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-lg opacity-70">Community Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
                <div className="text-lg opacity-70">Learning Opportunities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
