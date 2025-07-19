"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Users,
  Clock,
  Coins,
  Star,
  Calendar,
  Target,
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Upload,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Zap,
  TrendingUp,
  Globe,
  Code,
} from "lucide-react"

export default function CompetitionDetailPage() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    setMounted(true)

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  const competition = {
    id: 1,
    title: "Web3 DeFi Innovation Challenge",
    description:
      "Build the next generation of decentralized finance applications that will revolutionize how people interact with financial services. Create innovative solutions that leverage blockchain technology to provide better accessibility, security, and user experience.",
    category: "Development",
    difficulty: "Advanced",
    status: "Active",
    participants: 1247,
    maxParticipants: 2000,
    registrationDeadline: "2024-02-15",
    submissionDeadline: "2024-03-01",
    image: "/placeholder.svg?height=400&width=800&text=DeFi+Innovation+Challenge",
    organizer: {
      name: "Overworked Foundation",
      avatar: "/placeholder.svg?height=60&width=60&text=OF",
      verified: true,
    },
    prizes: [
      { position: "1st Place", amount: "50,000 CRY", description: "Winner takes all + Featured spotlight" },
      { position: "2nd Place", amount: "25,000 CRY", description: "Runner-up prize + Mentorship program" },
      { position: "3rd Place", amount: "15,000 CRY", description: "Third place + Community recognition" },
      { position: "Participation", amount: "500 CRY", description: "All valid submissions receive tokens" },
    ],
    timeline: [
      { date: "2024-01-15", event: "Competition Launch", status: "completed" },
      { date: "2024-02-15", event: "Registration Deadline", status: "upcoming" },
      { date: "2024-03-01", event: "Submission Deadline", status: "upcoming" },
      { date: "2024-03-15", event: "Judging Period", status: "upcoming" },
      { date: "2024-03-30", event: "Results Announcement", status: "upcoming" },
    ],
    requirements: [
      "Must be an original DeFi application or protocol",
      "Built using Ethereum, Polygon, or ICP blockchain",
      "Include comprehensive documentation",
      "Provide working demo or testnet deployment",
      "Submit source code via GitHub repository",
      "Maximum team size of 4 members",
    ],
    judging: [
      { criteria: "Innovation & Originality", weight: "30%" },
      { criteria: "Technical Implementation", weight: "25%" },
      { criteria: "User Experience & Design", weight: "20%" },
      { criteria: "Market Potential", weight: "15%" },
      { criteria: "Documentation Quality", weight: "10%" },
    ],
    resources: [
      { name: "DeFi Development Guide", type: "PDF", size: "2.5 MB" },
      { name: "Blockchain Integration Toolkit", type: "ZIP", size: "15.8 MB" },
      { name: "UI/UX Design Templates", type: "Figma", size: "8.2 MB" },
      { name: "Smart Contract Examples", type: "GitHub", size: "N/A" },
    ],
  }

  const recentSubmissions = [
    {
      id: 1,
      title: "DeFiSwap Protocol",
      author: "CryptoBuilder",
      avatar: "/placeholder.svg?height=40&width=40&text=CB",
      submittedAt: "2 hours ago",
      likes: 24,
      views: 156,
    },
    {
      id: 2,
      title: "LendingDAO Platform",
      author: "BlockchainDev",
      avatar: "/placeholder.svg?height=40&width=40&text=BD",
      submittedAt: "5 hours ago",
      likes: 18,
      views: 89,
    },
    {
      id: 3,
      title: "YieldFarm Optimizer",
      author: "DeFiMaster",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
      submittedAt: "1 day ago",
      likes: 42,
      views: 234,
    },
  ]

  const topParticipants = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=AC",
      submissions: 3,
      totalLikes: 156,
      badge: "🥇",
    },
    {
      rank: 2,
      name: "Sarah Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      submissions: 2,
      totalLikes: 98,
      badge: "🥈",
    },
    {
      rank: 3,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      submissions: 2,
      totalLikes: 87,
      badge: "🥉",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30 dark:from-black dark:via-cyan-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-yellow-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Banner Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={competition.image || "/placeholder.svg"}
                alt={competition.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative p-12 md:p-16">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-2">
                  <Code className="w-4 h-4 mr-2" />
                  {competition.category}
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-yellow-500 text-white border-0 px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  {competition.difficulty}
                </Badge>
                <Badge className="bg-gradient-to-r from-yellow-500 to-cyan-500 text-white border-0 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  {competition.status}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{competition.title}</h1>

              <p className="text-xl text-white/80 mb-8 max-w-3xl leading-relaxed">{competition.description}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-white">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{competition.participants.toLocaleString()}</span>
                  <span className="text-white/60 ml-1">
                    / {competition.maxParticipants.toLocaleString()} participants
                  </span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Coins className="w-5 h-5 mr-2" />
                  <span className="font-bold text-xl">90,000 CRY Total Prize Pool</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={competition.organizer.avatar || "/placeholder.svg"}
                    alt={competition.organizer.name}
                  />
                  <AvatarFallback>
                    {competition.organizer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{competition.organizer.name}</span>
                    {competition.organizer.verified && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="text-white/60 text-sm">Competition Organizer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Clock className="w-6 h-6 mr-3 text-purple-500" />
                      Time Remaining
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Minutes", value: timeLeft.minutes },
                        { label: "Seconds", value: timeLeft.seconds },
                      ].map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-4">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {item.value.toString().padStart(2, "0")}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Registration Progress</span>
                        <span>{Math.round((competition.participants / competition.maxParticipants) * 100)}%</span>
                      </div>
                      <Progress
                        value={(competition.participants / competition.maxParticipants) * 100}
                        className="h-3"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-cyan-500" />
                            Competition Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            This competition challenges developers to create innovative DeFi applications that push the
                            boundaries of decentralized finance. We're looking for solutions that address real-world
                            problems in the financial sector while leveraging the power of blockchain technology.
                          </p>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                What We're Looking For:
                              </h4>
                              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                                  Innovative DeFi protocols or applications
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                                  User-friendly interfaces and experiences
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                                  Scalable and secure smart contracts
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                                  Real-world utility and market potential
                                </li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Supported Blockchains:
                              </h4>
                              <div className="space-y-2">
                                {["Ethereum", "Polygon", "Internet Computer Protocol (ICP)", "Binance Smart Chain"].map(
                                  (blockchain, index) => (
                                    <div key={index} className="flex items-center">
                                      <Globe className="w-4 h-4 text-purple-500 mr-2" />
                                      <span className="text-gray-600 dark:text-gray-300">{blockchain}</span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-200/20 dark:border-purple-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Download className="w-5 h-5 mr-2 text-purple-500" />
                            Resources & Downloads
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {competition.resources.map((resource, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg border border-cyan-200/20 dark:border-cyan-800/20"
                              >
                                <div className="flex items-center">
                                  <FileText className="w-5 h-5 text-cyan-500 mr-3" />
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{resource.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {resource.type} • {resource.size}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 bg-transparent"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="rules" className="mt-6">
                    <div className="space-y-6">
                      <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-200/20 dark:border-purple-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-purple-500" />
                            Competition Requirements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {competition.requirements.map((requirement, index) => (
                              <div key={index} className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-yellow-200/20 dark:border-yellow-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="w-5 h-5 mr-2 text-yellow-500" />
                            Judging Criteria
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {competition.judging.map((criteria, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/5 to-cyan-500/5 rounded-lg"
                              >
                                <span className="font-medium text-gray-900 dark:text-white">{criteria.criteria}</span>
                                <Badge className="bg-gradient-to-r from-yellow-500 to-cyan-500 text-white border-0">
                                  {criteria.weight}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="mt-6">
                    <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-cyan-500" />
                          Competition Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {competition.timeline.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full mr-4 ${
                                  item.status === "completed" ? "bg-cyan-500" : "bg-purple-500"
                                }`}
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900 dark:text-white">{item.event}</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
                                </div>
                                <Badge
                                  className={`mt-1 ${
                                    item.status === "completed"
                                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                                      : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                                  } border-0`}
                                >
                                  {item.status === "completed" ? "Completed" : "Upcoming"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="submissions" className="mt-6">
                    <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-200/20 dark:border-purple-800/20">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Upload className="w-5 h-5 mr-2 text-purple-500" />
                            Recent Submissions
                          </div>
                          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
                            {recentSubmissions.length} submissions
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentSubmissions.map((submission, index) => (
                            <div
                              key={submission.id}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg border border-cyan-200/20 dark:border-cyan-800/20"
                            >
                              <div className="flex items-center">
                                <Avatar className="w-10 h-10 mr-3">
                                  <AvatarImage src={submission.avatar || "/placeholder.svg"} alt={submission.author} />
                                  <AvatarFallback>{submission.author.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{submission.title}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    by {submission.author} • {submission.submittedAt}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center text-purple-500">
                                  <Heart className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{submission.likes}</span>
                                </div>
                                <div className="flex items-center text-cyan-500">
                                  <Eye className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{submission.views}</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 bg-transparent"
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="leaderboard" className="mt-6">
                    <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-yellow-200/20 dark:border-yellow-800/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                          Top Participants
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topParticipants.map((participant, index) => (
                            <div
                              key={participant.rank}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/5 to-purple-500/5 rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="text-2xl mr-3">{participant.badge}</div>
                                <Avatar className="w-10 h-10 mr-3">
                                  <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                  <AvatarFallback>
                                    {participant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{participant.name}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {participant.submissions} submissions • {participant.totalLikes} total likes
                                  </div>
                                </div>
                              </div>
                              <Badge className="bg-gradient-to-r from-yellow-500 to-purple-500 text-white border-0">
                                #{participant.rank}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Registration Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="sticky top-24"
              >
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-cyan-200/20 dark:border-cyan-800/20">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                      Join Competition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">90,000 CRY</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Prize Pool</div>
                    </div>

                    <div className="space-y-4">
                      {competition.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{prize.position}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{prize.description}</div>
                          </div>
                          <div className="text-yellow-500 font-bold">{prize.amount}</div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 text-lg">
                      <Trophy className="w-5 h-5 mr-2" />
                      Register Now
                    </Button>

                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-cyan-200/20 dark:border-cyan-800/20">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 dark:text-gray-400 hover:text-purple-500"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 dark:text-gray-400 hover:text-yellow-500"
                      >
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Competition Stats */}
                <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-200/20 dark:border-purple-800/20 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                      Competition Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Participants</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {competition.participants.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Submissions</span>
                      <span className="font-bold text-gray-900 dark:text-white">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Views</span>
                      <span className="font-bold text-gray-900 dark:text-white">12.4K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                      <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-0">
                        {competition.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
