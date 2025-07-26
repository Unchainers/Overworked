"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTheme } from "@/contexts/ThemeProvider";
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";
import { course } from "../../../../declarations/course";
import { Course } from "../../../../declarations/course/course.did";

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
    image: "/images/placeholder/avatar.png?height=200&width=300",
    category: "Technology",
    level: "Advanced",
    description:
      "Master blockchain development with hands-on projects and real-world applications.",
  },
  {
    id: 2,
    title: "Digital Art & NFT Creation",
    instructor: "Maya Rodriguez",
    rating: 4.8,
    students: 8900,
    duration: "6 weeks",
    price: "Free",
    image: "/images/placeholder/avatar.png?height=200&width=300",
    category: "Art & Design",
    level: "Intermediate",
    description:
      "Create stunning digital art and learn how to mint and sell NFTs.",
  },
  {
    id: 3,
    title: "Web3 Marketing Strategies",
    instructor: "David Kim",
    rating: 4.7,
    students: 6700,
    duration: "4 weeks",
    price: "Free",
    image: "/images/placeholder/avatar.png?height=200&width=300",
    category: "Marketing",
    level: "Beginner",
    description:
      "Learn cutting-edge marketing strategies for the Web3 ecosystem.",
  },
];

// const allCourses = [
//   ...featuredCourses,
//   {
//     id: 4,
//     title: "Smart Contract Security",
//     instructor: "Sarah Johnson",
//     rating: 4.9,
//     students: 5400,
//     duration: "5 weeks",
//     price: "Free",
//     image: "/images/placeholder/avatar.png?height=200&width=300",
//     category: "Technology",
//     level: "Advanced",
//     description:
//       "Learn to identify and prevent security vulnerabilities in smart contracts.",
//   },
//   {
//     id: 5,
//     title: "DeFi Protocol Design",
//     instructor: "Michael Brown",
//     rating: 4.6,
//     students: 4200,
//     duration: "7 weeks",
//     price: "Free",
//     image: "/images/placeholder/avatar.png?height=200&width=300",
//     category: "Finance",
//     level: "Advanced",
//     description:
//       "Design and build decentralized finance protocols from scratch.",
//   },
//   {
//     id: 6,
//     title: "Community Building in Web3",
//     instructor: "Lisa Wang",
//     rating: 4.8,
//     students: 7800,
//     duration: "3 weeks",
//     price: "Free",
//     image: "/images/placeholder/avatar.png?height=200&width=300",
//     category: "Community",
//     level: "Beginner",
//     description: "Build and grow thriving communities in the Web3 space.",
//   },
//   {
//     id: 7,
//     title: "Cryptocurrency Trading",
//     instructor: "James Wilson",
//     rating: 4.5,
//     students: 9200,
//     duration: "6 weeks",
//     price: "Free",
//     image: "/images/placeholder/avatar.png?height=200&width=300",
//     category: "Finance",
//     level: "Intermediate",
//     description:
//       "Master cryptocurrency trading strategies and risk management.",
//   },
//   {
//     id: 8,
//     title: "Metaverse Development",
//     instructor: "Emma Davis",
//     rating: 4.7,
//     students: 3600,
//     duration: "10 weeks",
//     price: "Free",
//     image: "/images/placeholder/avatar.png?height=200&width=300",
//     category: "Technology",
//     level: "Advanced",
//     description:
//       "Build immersive metaverse experiences using cutting-edge technologies.",
//   },
// ];

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Blockchain Developer",
    avatar: "/images/placeholder/avatar.png",
    content:
      "World Brain transformed my career. The courses are incredibly detailed and the community support is amazing. I landed my dream job in Web3!",
    rating: 5,
    tokens: 2500,
  },
  {
    name: "Maria Garcia",
    role: "NFT Artist",
    avatar: "/images/placeholder/avatar.png",
    content:
      "The digital art course helped me mint my first NFT collection. I've earned over 10,000 CRY tokens while learning valuable skills!",
    rating: 5,
    tokens: 10000,
  },
  {
    name: "John Lee",
    role: "DeFi Analyst",
    avatar: "/images/placeholder/avatar.png",
    content:
      "World Brain's DeFi courses are unmatched. The practical approach and real-world projects prepared me for the industry perfectly.",
    rating: 5,
    tokens: 7500,
  },
];

const learningBenefits = [
  {
    icon: Brain,
    title: "Expert-Led Courses",
    description:
      "Learn from industry leaders and Web3 pioneers with real-world experience.",
  },
  {
    icon: Zap,
    title: "Earn While Learning",
    description:
      "Get rewarded with CRY tokens for completing courses, quizzes, and projects.",
  },
  {
    icon: Target,
    title: "Practical Projects",
    description:
      "Build real applications and portfolios that showcase your skills to employers.",
  },
  {
    icon: Users,
    title: "Global Community",
    description:
      "Connect with learners worldwide and build your professional network.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description:
      "Earn blockchain-verified certificates that prove your expertise.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Access exclusive job opportunities and career advancement resources.",
  },
];

export default function WorldBrainPage() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await course.get_all_courses();
      if (result.length === 0) {
        setError("Courses not found");
        setCourses([]);
      } else {
        setCourses(result);
      }
    } catch (err) {
      setError("Failed to fetch courses: " + (err as Error).message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // || course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.average_rating - a.average_rating;
      // if (sortBy === "students") return b.students - a.students;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );

  const categories = [
    "all",
    "Technology",
    "Art & Design",
    "Marketing",
    "Finance",
    "Community",
  ];

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Navbar />

      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <div className="z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="mb-6 flex items-center justify-center">
              <Brain className="mr-4 h-16 w-16 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
                World Brain
              </h1>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-xl opacity-80 md:text-2xl">
              Unlock your potential in the digital age. Learn, create, and earn
              in Overworked's premier educational ecosystem.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg text-white hover:from-cyan-600 hover:to-purple-700"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400 bg-transparent px-8 py-4 text-lg text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-cyan-400">50K+</div>
              <div className="text-lg opacity-70">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-400">
                200+
              </div>
              <div className="text-lg opacity-70">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-yellow-400">1M+</div>
              <div className="text-lg opacity-70">CRY Tokens Earned</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Learn at World Brain Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Why Learn at World Brain?
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Experience the future of education with our innovative platform
              designed for the Web3 era.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {learningBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"} backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
                    <h3 className="mb-3 text-xl font-bold">{benefit.title}</h3>
                    <p className="opacity-80">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Featured Courses
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Discover our most popular courses taught by industry experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"} group cursor-pointer backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/images/placeholder/avatar.png"}
                      alt={course.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute right-4 top-4">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <span className="text-lg font-bold text-green-400">
                        {course.price}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-cyan-400">
                      {course.title}
                    </h3>
                    <p className="mb-4 text-sm opacity-80">
                      {course.description}
                    </p>
                    <div className="mb-4 flex items-center text-sm opacity-70">
                      <User className="mr-1 h-4 w-4" />
                      <span className="mr-4">{course.instructor}</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="ml-2 text-sm opacity-70">
                          ({course.students.toLocaleString()})
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
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
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              All Courses
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Explore our complete catalog of courses across various Web3
              disciplines.
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
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-700 bg-gray-900/50 pl-10 focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-40 border-gray-700 bg-gray-900/50">
                    <Filter className="mr-2 h-4 w-4" />
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
                  <SelectTrigger className="w-40 border-gray-700 bg-gray-900/50">
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

            <div className="mb-6 text-sm opacity-70">
              Showing {paginatedCourses.length} of {filteredCourses.length}{" "}
              courses
            </div>
          </motion.div>

          {/* Course Grid */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"} group cursor-pointer backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/images/placeholder/avatar.png"}
                      alt={course.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute right-4 top-4">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                        {/* {course.level} */}
                        level
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <span className="text-lg font-bold text-green-400">
                        {course.price}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-cyan-400">
                      {course.title}
                    </h3>
                    <p className="mb-4 text-sm opacity-80">
                      {course.description}
                    </p>
                    <div className="mb-4 flex items-center text-sm opacity-70">
                      <User className="mr-1 h-4 w-4" />
                      <span className="mr-4">
                        {course.instructor_id.toString()}
                      </span>
                      <Clock className="mr-1 h-4 w-4" />
                      {/* <span>{course.duration}</span> */}
                      course duration
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                        <span className="font-semibold">
                          {course.average_rating}
                        </span>
                        <span className="ml-2 text-sm opacity-70">
                          {/* ({course.students.toLocaleString()}) */}
                          students
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
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
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e: { preventDefault: () => void }) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              What You'll Learn
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Gain cutting-edge skills that will prepare you for the future of
              work in the digital economy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">
                      Blockchain Fundamentals
                    </h3>
                    <p className="opacity-80">
                      Master the core concepts of blockchain technology, smart
                      contracts, and decentralized systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-yellow-500">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Web3 Development</h3>
                    <p className="opacity-80">
                      Build decentralized applications (dApps) using modern
                      frameworks and tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-cyan-500">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Digital Economy</h3>
                    <p className="opacity-80">
                      Understand tokenomics, DeFi protocols, and the economics
                      of digital assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">
                      Community Building
                    </h3>
                    <p className="opacity-80">
                      Learn to build and manage thriving communities in the Web3
                      ecosystem.
                    </p>
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
                  src="/images/placeholder/avatar.png?height=400&width=500"
                  alt="Learning illustration"
                  className="h-auto w-full rounded-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* World Brain Testimony Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Success Stories
            </h2>
            <p className="mx-auto max-w-3xl text-xl opacity-80">
              Hear from our learners who transformed their careers and earned
              CRY tokens through World Brain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${theme === "dark" ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"} backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <img
                        src={
                          testimonial.avatar || "/images/placeholder/avatar.png"
                        }
                        alt={testimonial.name}
                        className="mr-4 h-12 w-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current text-yellow-400"
                          />
                        ),
                      )}
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
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Ready to Expand Your Mind?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl opacity-80">
              Join thousands of learners who are building the future. Start your
              journey in World Brain today and earn CRY tokens while you learn.
            </p>

            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg text-white hover:from-cyan-600 hover:to-purple-700"
              >
                <Brain className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 bg-transparent px-8 py-4 text-lg text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-cyan-400">
                  Free
                </div>
                <div className="text-lg opacity-70">All Courses</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-purple-400">
                  24/7
                </div>
                <div className="text-lg opacity-70">Community Support</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-yellow-400">∞</div>
                <div className="text-lg opacity-70">Learning Opportunities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
