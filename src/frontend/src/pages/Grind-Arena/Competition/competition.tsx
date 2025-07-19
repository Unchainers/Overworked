"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { useNavigate } from "react-router";

export default function CompetitionDetailPage() {

  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    setMounted(true);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

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
    image:
      "/images/placeholder/banner.png?height=400&width=800&text=DeFi+Innovation+Challenge",
    organizer: {
      name: "Overworked Foundation",
      avatar: "/images/logo-final.png?height=60&width=60&text=OF",
      verified: true,
    },
    prizes: [
      {
        position: "1st Place",
        amount: "50,000 CRY",
        description: "Winner takes all + Featured spotlight",
      },
      {
        position: "2nd Place",
        amount: "25,000 CRY",
        description: "Runner-up prize + Mentorship program",
      },
      {
        position: "3rd Place",
        amount: "15,000 CRY",
        description: "Third place + Community recognition",
      },
      {
        position: "Participation",
        amount: "500 CRY",
        description: "All valid submissions receive tokens",
      },
    ],
    timeline: [
      { date: "2024-01-15", event: "Competition Launch", status: "completed" },
      {
        date: "2024-02-15",
        event: "Registration Deadline",
        status: "upcoming",
      },
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
  };

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
  ];

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
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-purple-50 dark:from-black dark:via-cyan-950/20 dark:to-purple-950/20">
      {/* Animated Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-3xl"
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
          className="absolute right-1/4 top-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400/20 to-yellow-400/20 blur-3xl"
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
      <section className="relative px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0">
              <img
                src={competition.image || "/placeholder.svg"}
                alt={competition.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative p-12 md:p-16">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <Badge className="border-0 bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-white">
                  <Code className="mr-2 h-4 w-4" />
                  {competition.category}
                </Badge>
                <Badge className="border-0 bg-gradient-to-r from-purple-500 to-yellow-500 px-4 py-2 text-white">
                  <Target className="mr-2 h-4 w-4" />
                  {competition.difficulty}
                </Badge>
                <Badge className="border-0 bg-gradient-to-r from-yellow-500 to-cyan-500 px-4 py-2 text-white">
                  <Zap className="mr-2 h-4 w-4" />
                  {competition.status}
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
                {competition.title}
              </h1>

              <p className="mb-8 max-w-3xl text-xl leading-relaxed text-white/80">
                {competition.description}
              </p>

              <div className="mb-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center text-white">
                  <Users className="mr-2 h-5 w-5" />
                  <span className="font-semibold">
                    {competition.participants.toLocaleString()}
                  </span>
                  <span className="ml-1 text-white/60">
                    / {competition.maxParticipants.toLocaleString()}{" "}
                    participants
                  </span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Coins className="mr-2 h-5 w-5" />
                  <span className="text-xl font-bold">
                    90,000 CRY Total Prize Pool
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
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
                    <span className="font-semibold text-white">
                      {competition.organizer.name}
                    </span>
                    {competition.organizer.verified && (
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                    )}
                  </div>
                  <span className="text-sm text-white/60">
                    Competition Organizer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm dark:border-cyan-800/20 dark:bg-black/80">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Clock className="mr-3 h-6 w-6 text-purple-500" />
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
                        <div
                          key={index}
                          className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4"
                        >
                          <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                            {item.value.toString().padStart(2, "0")}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Registration Progress</span>
                        <span>
                          {Math.round(
                            (competition.participants /
                              competition.maxParticipants) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (competition.participants /
                            competition.maxParticipants) *
                          100
                        }
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
                  <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm dark:bg-black/80">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm dark:border-cyan-800/20 dark:bg-black/80">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5 text-cyan-500" />
                            Competition Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            This competition challenges developers to create
                            innovative DeFi applications that push the
                            boundaries of decentralized finance. We're looking
                            for solutions that address real-world problems in
                            the financial sector while leveraging the power of
                            blockchain technology.
                          </p>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                What We're Looking For:
                              </h4>
                              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-start">
                                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" />
                                  Innovative DeFi protocols or applications
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" />
                                  User-friendly interfaces and experiences
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" />
                                  Scalable and secure smart contracts
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" />
                                  Real-world utility and market potential
                                </li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                Supported Blockchains:
                              </h4>
                              <div className="space-y-2">
                                {[
                                  "Ethereum",
                                  "Polygon",
                                  "Internet Computer Protocol (ICP)",
                                  "Binance Smart Chain",
                                ].map((blockchain, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <Globe className="mr-2 h-4 w-4 text-purple-500" />
                                    <span className="text-gray-600 dark:text-gray-300">
                                      {blockchain}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200/20 bg-white/80 backdrop-blur-sm dark:border-purple-800/20 dark:bg-black/80">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Download className="mr-2 h-5 w-5 text-purple-500" />
                            Resources & Downloads
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            {competition.resources.map((resource, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 p-4 dark:border-cyan-800/20"
                              >
                                <div className="flex items-center">
                                  <FileText className="mr-3 h-5 w-5 text-cyan-500" />
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                      {resource.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {resource.type} • {resource.size}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
                                >
                                  <Download className="h-4 w-4" />
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
                      <Card className="border-purple-200/20 bg-white/80 backdrop-blur-sm dark:border-purple-800/20 dark:bg-black/80">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-purple-500" />
                            Competition Requirements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {competition.requirements.map(
                              (requirement, index) => (
                                <div key={index} className="flex items-start">
                                  <AlertCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {requirement}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-yellow-200/20 bg-white/80 backdrop-blur-sm dark:border-yellow-800/20 dark:bg-black/80">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5 text-yellow-500" />
                            Judging Criteria
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {competition.judging.map((criteria, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-lg bg-gradient-to-r from-yellow-500/5 to-cyan-500/5 p-4"
                              >
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {criteria.criteria}
                                </span>
                                <Badge className="border-0 bg-gradient-to-r from-yellow-500 to-cyan-500 text-white">
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
                    <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm dark:border-cyan-800/20 dark:bg-black/80">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-cyan-500" />
                          Competition Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {competition.timeline.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div
                                className={`mr-4 h-4 w-4 rounded-full ${
                                  item.status === "completed"
                                    ? "bg-cyan-500"
                                    : "bg-purple-500"
                                }`}
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {item.event}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.date}
                                  </span>
                                </div>
                                <Badge
                                  className={`mt-1 ${
                                    item.status === "completed"
                                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                                      : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                                  } border-0`}
                                >
                                  {item.status === "completed"
                                    ? "Completed"
                                    : "Upcoming"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="submissions" className="mt-6">
                    <Card className="border-purple-200/20 bg-white/80 backdrop-blur-sm dark:border-purple-800/20 dark:bg-black/80">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Upload className="mr-2 h-5 w-5 text-purple-500" />
                            Recent Submissions
                          </div>
                          <Badge className="border-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                            {recentSubmissions.length} submissions
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentSubmissions.map((submission, index) => (
                            <div
                              key={submission.id}
                              className="flex items-center justify-between rounded-lg border border-cyan-200/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 p-4 dark:border-cyan-800/20"
                            >
                              <div className="flex items-center">
                                <Avatar className="mr-3 h-10 w-10">
                                  <AvatarImage
                                    src={
                                      submission.avatar || "/placeholder.svg"
                                    }
                                    alt={submission.author}
                                  />
                                  <AvatarFallback>
                                    {submission.author.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {submission.title}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    by {submission.author} •{" "}
                                    {submission.submittedAt}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center text-purple-500">
                                  <Heart className="mr-1 h-4 w-4" />
                                  <span className="text-sm">
                                    {submission.likes}
                                  </span>
                                </div>
                                <div className="flex items-center text-cyan-500">
                                  <Eye className="mr-1 h-4 w-4" />
                                  <span className="text-sm">
                                    {submission.views}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
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
                    <Card className="border-yellow-200/20 bg-white/80 backdrop-blur-sm dark:border-yellow-800/20 dark:bg-black/80">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                          Top Participants
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topParticipants.map((participant, index) => (
                            <div
                              key={participant.rank}
                              className="flex items-center justify-between rounded-lg bg-gradient-to-r from-yellow-500/5 to-purple-500/5 p-4"
                            >
                              <div className="flex items-center">
                                <div className="mr-3 text-2xl">
                                  {participant.badge}
                                </div>
                                <Avatar className="mr-3 h-10 w-10">
                                  <AvatarImage
                                    src={
                                      participant.avatar || "/placeholder.svg"
                                    }
                                    alt={participant.name}
                                  />
                                  <AvatarFallback>
                                    {participant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {participant.name}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {participant.submissions} submissions •{" "}
                                    {participant.totalLikes} total likes
                                  </div>
                                </div>
                              </div>
                              <Badge className="border-0 bg-gradient-to-r from-yellow-500 to-purple-500 text-white">
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
            <div className="space-y-6 lg:col-span-1">
              {/* Registration Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="sticky top-24"
              >
                <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm dark:border-cyan-800/20 dark:bg-black/80">
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-center text-2xl text-transparent">
                      Join Competition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-yellow-500">
                        90,000 CRY
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total Prize Pool
                      </div>
                    </div>

                    <div className="space-y-4">
                      {competition.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-gradient-to-r from-cyan-500/5 to-purple-500/5 p-3"
                        >
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {prize.position}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {prize.description}
                            </div>
                          </div>
                          <div className="font-bold text-yellow-500">
                            {prize.amount}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-3 text-lg text-white hover:from-cyan-600 hover:to-purple-600" onClick={() => navigate("/submission/1")}>
                      <Trophy className="mr-2 h-5 w-5" />
                      Register Now
                    </Button>

                    <div className="flex items-center justify-center gap-4 border-t border-cyan-200/20 pt-4 dark:border-cyan-800/20">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-cyan-500 dark:text-gray-400"
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-purple-500 dark:text-gray-400"
                      >
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-yellow-500 dark:text-gray-400"
                      >
                        <Bookmark className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Competition Stats */}
                <Card className="mt-6 border-purple-200/20 bg-white/80 backdrop-blur-sm dark:border-purple-800/20 dark:bg-black/80">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                      Competition Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Participants
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {competition.participants.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Submissions
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        156
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Views
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        12.4K
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Difficulty
                      </span>
                      <Badge className="border-0 bg-purple-500/20 text-purple-600 dark:text-purple-400">
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
  );
}
