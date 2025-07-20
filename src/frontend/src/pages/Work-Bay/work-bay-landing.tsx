"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Play,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Freelance"
  salary: {
    min: number
    max: number
    currency: string
    period: "hour" | "day" | "month"
  }
  description: string
  skills: string[]
  postedAt: string
  deadline: string
  applicants: number
  rating: number
  isVerified: boolean
  isFeatured: boolean
  category: string
}

import { Navbar } from "@/components/Layouts/navbar"
import { Footer } from "@/components/Layouts/footer"

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Smart Contract Developer",
    company: "DeFi Protocol Labs",
    companyLogo: "/placeholder-logo.png",
    location: "Remote",
    type: "Full-time",
    salary: { min: 80, max: 120, currency: "CRY", period: "hour" },
    description: "Build the future of decentralized finance with cutting-edge smart contracts on ICP blockchain.",
    skills: ["Solidity", "Rust", "Web3", "DeFi"],
    postedAt: "2 days ago",
    deadline: "15 days left",
    applicants: 24,
    rating: 4.9,
    isVerified: true,
    isFeatured: true,
    category: "Development",
  },
  {
    id: "2",
    title: "NFT Collection Designer",
    company: "Crypto Arts Studio",
    companyLogo: "/placeholder-logo.png",
    location: "Overworked City",
    type: "Contract",
    salary: { min: 50, max: 80, currency: "CRY", period: "hour" },
    description: "Create stunning NFT collections for our upcoming marketplace launch.",
    skills: ["Illustrator", "Photoshop", "NFT Design", "Digital Art"],
    postedAt: "1 day ago",
    deadline: "10 days left",
    applicants: 18,
    rating: 4.7,
    isVerified: true,
    isFeatured: false,
    category: "Design",
  },
  {
    id: "3",
    title: "Community Manager",
    company: "Web3 Social Platform",
    companyLogo: "/placeholder-logo.png",
    location: "Hybrid",
    type: "Part-time",
    salary: { min: 30, max: 45, currency: "CRY", period: "hour" },
    description: "Manage and grow our vibrant Web3 community across multiple platforms.",
    skills: ["Community Management", "Social Media", "Discord", "Twitter"],
    postedAt: "3 days ago",
    deadline: "20 days left",
    applicants: 31,
    rating: 4.5,
    isVerified: false,
    isFeatured: false,
    category: "Marketing",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Smart Contract Developer",
    avatar: "/placeholder-user.jpg",
    content:
      "WorkBay transformed my freelance career! I've earned over 5,000 CRY tokens in just 3 months while building amazing Web3 projects.",
    rating: 5,
    earnings: "5,247 CRY",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "UI/UX Designer",
    avatar: "/placeholder-user.jpg",
    content:
      "The quality of projects on WorkBay is incredible. I've worked with top-tier Web3 companies and built my reputation in the ecosystem.",
    rating: 5,
    earnings: "3,892 CRY",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Community Manager",
    avatar: "/placeholder-user.jpg",
    content:
      "WorkBay's reputation system helped me land my dream job. The platform truly rewards quality work and professional growth.",
    rating: 5,
    earnings: "2,156 CRY",
  },
]

export default function WorkBayLanding() {
  const { theme } = useTheme()
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const jobsPerPage = 6
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const categories = ["all", "Development", "Design", "Marketing", "Writing", "Management"]
  const jobTypes = ["all", "Full-time", "Part-time", "Contract", "Freelance"]

  // Filter and sort jobs
  useEffect(() => {
    let filtered = jobs

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((job) => job.category === selectedCategory)
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((job) => job.type === selectedType)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
        break
      case "salary-high":
        filtered.sort((a, b) => b.salary.max - a.salary.max)
        break
      case "salary-low":
        filtered.sort((a, b) => a.salary.max - b.salary.max)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredJobs(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedType, sortBy, jobs])

  const stats = [
    { label: "Active Jobs", value: "2,847", icon: Briefcase, color: "from-[#4fc4cf] to-[#994ff3]" },
    { label: "Total Earnings", value: "1.2M CRY", icon: DollarSign, color: "from-[#994ff3] to-[#f9ca24]" },
    { label: "Active Workers", value: "15,432", icon: Users, color: "from-[#f9ca24] to-[#4fc4cf]" },
    { label: "Success Rate", value: "98.5%", icon: TrendingUp, color: "from-[#4fc4cf] to-[#994ff3]" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "All payments are secured by smart contracts and processed in CRY tokens",
    },
    {
      icon: Award,
      title: "Reputation System",
      description: "Build your professional reputation and unlock higher-paying opportunities",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access jobs from companies worldwide in the Web3 ecosystem",
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "AI-powered job matching connects you with perfect opportunities",
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Set up your professional profile and showcase your Web3 skills",
      icon: Users,
    },
    {
      step: 2,
      title: "Browse & Apply",
      description: "Discover amazing job opportunities and submit your applications",
      icon: Search,
    },
    {
      step: 3,
      title: "Work & Earn",
      description: "Complete projects and earn CRY tokens while building your reputation",
      icon: DollarSign,
    },
    {
      step: 4,
      title: "Grow Your Career",
      description: "Level up your skills and access exclusive high-paying opportunities",
      icon: TrendingUp,
    },
  ]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"} transition-colors duration-300`}
    >
        <Navbar/>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4fc4cf]/10 via-[#994ff3]/10 to-[#f9ca24]/10" />

          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] rounded-full opacity-60"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-gradient-to-r from-[#4fc4cf]/20 to-[#994ff3]/20 text-[#4fc4cf] border-[#4fc4cf]/30">
                🚀 The Future of Work is Here
              </Badge>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#f9ca24] bg-clip-text text-transparent">
                WorkBay
              </h1>

              <p
                className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                  theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"
                }`}
              >
                The premier digital job marketplace in Overworked City. Find side jobs, earn CRY tokens, and build your
                reputation in the Web3 ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:opacity-90 text-white px-8 py-4 text-lg"
                >
                  Start Working <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={`px-8 py-4 text-lg border-2 ${
                    theme === "dark"
                      ? "border-[#4fc4cf] text-[#4fc4cf] hover:bg-[#4fc4cf]/10"
                      : "border-[#994ff3] text-[#994ff3] hover:bg-[#994ff3]/10"
                  }`}
                >
                  <Play className="mr-2 w-5 h-5" /> Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 rounded-2xl backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-[#fffffe]/5 border border-[#fffffe]/10"
                        : "bg-[#181818]/5 border border-[#181818]/10"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why WorkBay Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-[#994ff3]/20 to-[#f9ca24]/20 text-[#994ff3] border-[#994ff3]/30">
              ✨ Why Choose WorkBay
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#994ff3] to-[#f9ca24] bg-clip-text text-transparent">
              The Future of Work
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
              WorkBay revolutionizes how you find work, earn income, and build your professional reputation in the Web3
              ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-[#fffffe]/5 border border-[#fffffe]/10 hover:bg-[#fffffe]/10"
                    : "bg-[#181818]/5 border border-[#181818]/10 hover:bg-[#181818]/10"
                } transition-all duration-300 group hover:scale-105`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                  {feature.title}
                </h3>
                <p className={`${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Jobs Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-[#4fc4cf]/20 to-[#994ff3]/20 text-[#4fc4cf] border-[#4fc4cf]/30">
              💼 Find Your Next Opportunity
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
              Available Jobs
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
              Discover amazing opportunities from top Web3 companies and start earning CRY tokens today.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full hover:scale-105 transition-all duration-300 ${
                    job.isFeatured
                      ? "ring-2 ring-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-gradient-to-br from-[#4fc4cf]/5 to-[#994ff3]/5"
                      : ""
                  } ${
                    theme === "dark"
                      ? "bg-[#fffffe]/5 border-[#fffffe]/10 hover:bg-[#fffffe]/10"
                      : "bg-[#181818]/5 border-[#181818]/10 hover:bg-[#181818]/10"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                          <AvatarFallback>{job.company[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <CardDescription>{job.company}</CardDescription>
                            {job.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                      </div>
                      {job.isFeatured && (
                        <Badge className="bg-gradient-to-r from-[#f9ca24] to-[#4fc4cf] text-white">Featured</Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{job.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{job.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                        {job.salary.min}-{job.salary.max} {job.salary.currency}/{job.salary.period}
                      </div>
                      <div className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
                        {job.applicants} applicants
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className={`text-xs ${theme === "dark" ? "text-[#fffffe]/50" : "text-[#181818]/50"}`}>
                        Posted {job.postedAt} • {job.deadline}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:opacity-90 text-white"
                      >
                        Apply Now
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
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(i + 1)
                        }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
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

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-[#f9ca24]/20 to-[#4fc4cf]/20 text-[#f9ca24] border-[#f9ca24]/30">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#f9ca24] to-[#4fc4cf] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
              Get started on WorkBay in just four simple steps and begin your Web3 career journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Connection Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] opacity-30 z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] flex items-center justify-center mx-auto mb-6 relative">
                    <step.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#f9ca24] to-[#4fc4cf] flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                    {step.title}
                  </h3>

                  <p className={`${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-[#994ff3]/20 to-[#4fc4cf]/20 text-[#994ff3] border-[#994ff3]/30">
              💬 Success Stories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#994ff3] to-[#4fc4cf] bg-clip-text text-transparent">
              What Our Workers Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}>
              Join thousands of successful professionals who have transformed their careers with WorkBay.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${
                    theme === "dark" ? "bg-[#fffffe]/5 border-[#fffffe]/10" : "bg-[#181818]/5 border-[#181818]/10"
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    <p className={`mb-6 italic ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"}`}>
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className={`font-semibold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}>
                            {testimonial.name}
                          </h4>
                          <p className={`text-sm ${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-transparent">
                          {testimonial.earnings}
                        </div>
                        <div className={`text-xs ${theme === "dark" ? "text-[#fffffe]/50" : "text-[#181818]/50"}`}>
                          Total Earned
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className={`rounded-3xl p-12 md:p-16 relative overflow-hidden ${
                theme === "dark"
                  ? "bg-gradient-to-br from-[#4fc4cf]/10 via-[#994ff3]/10 to-[#f9ca24]/10 border border-[#fffffe]/10"
                  : "bg-gradient-to-br from-[#4fc4cf]/10 via-[#994ff3]/10 to-[#f9ca24]/10 border border-[#181818]/10"
              }`}
            >
              {/* Background Animation */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] rounded-full opacity-20"
                    animate={{
                      x: [0, 200, 0],
                      y: [0, -200, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 15 + i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <Badge className="mb-6 bg-gradient-to-r from-[#4fc4cf]/20 to-[#994ff3]/20 text-[#4fc4cf] border-[#4fc4cf]/30">
                  🎯 Ready to Start?
                </Badge>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4fc4cf] via-[#994ff3] to-[#f9ca24] bg-clip-text text-transparent">
                  Join WorkBay Today
                </h2>

                <p
                  className={`text-xl mb-8 max-w-2xl mx-auto ${
                    theme === "dark" ? "text-[#fffffe]/80" : "text-[#181818]/80"
                  }`}
                >
                  Start your Web3 career journey today. Find amazing opportunities, earn CRY tokens, and build your
                  professional reputation in the digital economy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] hover:opacity-90 text-white px-8 py-4 text-lg"
                  >
                    Create Your Profile <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`px-8 py-4 text-lg border-2 ${
                      theme === "dark"
                        ? "border-[#4fc4cf] text-[#4fc4cf] hover:bg-[#4fc4cf]/10"
                        : "border-[#994ff3] text-[#994ff3] hover:bg-[#994ff3]/10"
                    }`}
                  >
                    Browse Jobs
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className={theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}>Free to join</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className={theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}>
                      Secure payments
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className={theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
