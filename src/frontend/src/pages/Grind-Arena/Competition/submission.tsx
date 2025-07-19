"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Github,
  Globe,
  Video,
  ImageIcon,
  Users,
  Trophy,
  Clock,
  Code,
  Palette,
  Shield,
  Save,
  Send,
  Eye,
} from "lucide-react";
import { ChevronRight } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  email: string;
  github: string;
};

type FormData = {
  // Project Information
  projectTitle: string;
  projectDescription: string;
  category: string;
  tags: string[];

  // Team Information
  teamName: string;
  teamSize: string;
  teamMembers: TeamMember[];

  // Project Links
  githubRepo: string;
  liveDemo: string;
  videoDemo: string;
  documentation: string;
  designFiles: string;

  // Technical Details
  blockchain: string;
  technologies: string[];
  smartContractAddress: string;
  testnetDeployment: string;

  // Submission Files
  sourceCode: null;
  documentation_file: null;
  presentation: null;
  screenshots: [];

  // Additional Information
  challenges: string;
  futureWork: string;
  marketPotential: string;

  // Legal & Compliance
  originalWork: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

import { Footer } from "@/components/Layouts/footer";
import { Navbar } from "@/components/Layouts/navbar";

export default function CompetitionSubmissionPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Project Information
    projectTitle: "",
    projectDescription: "",
    category: "",
    tags: [],

    // Team Information
    teamName: "",
    teamSize: "1",
    teamMembers: [{ name: "", role: "", email: "", github: "" }],

    // Project Links
    githubRepo: "",
    liveDemo: "",
    videoDemo: "",
    documentation: "",
    designFiles: "",

    // Technical Details
    blockchain: "",
    technologies: [],
    smartContractAddress: "",
    testnetDeployment: "",

    // Submission Files
    sourceCode: null,
    documentation_file: null,
    presentation: null,
    screenshots: [],

    // Additional Information
    challenges: "",
    futureWork: "",
    marketPotential: "",

    // Legal & Compliance
    originalWork: false,
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const competition = {
    title: "Web3 DeFi Innovation Challenge",
    deadline: "March 1, 2024",
    timeLeft: "5 days, 14 hours",
    maxFileSize: "100MB",
    allowedFormats: ["ZIP", "RAR", "PDF", "MP4", "PNG", "JPG"],
  };

  const steps = [
    {
      id: 1,
      title: "Project Info",
      icon: FileText,
      description: "Basic project details",
    },
    {
      id: 2,
      title: "Team Details",
      icon: Users,
      description: "Team member information",
    },
    {
      id: 3,
      title: "Technical",
      icon: Code,
      description: "Technical specifications",
    },
    {
      id: 4,
      title: "Files & Links",
      icon: Upload,
      description: "Upload files and links",
    },
    { id: 5, title: "Review", icon: Eye, description: "Review and submit" },
  ];

  const categories = [
    "DeFi Protocol",
    "NFT Marketplace",
    "DAO Governance",
    "Yield Farming",
    "Lending Platform",
    "DEX/AMM",
    "Cross-chain Bridge",
    "Payment Solution",
    "Insurance Protocol",
    "Other",
  ];

  const blockchains = [
    "Ethereum",
    "Polygon",
    "Binance Smart Chain",
    "Internet Computer Protocol (ICP)",
    "Solana",
    "Avalanche",
    "Arbitrum",
    "Optimism",
  ];

  const technologies: string[] = [
    "Solidity",
    "React",
    "Next.js",
    "Web3.js",
    "Ethers.js",
    "Hardhat",
    "Truffle",
    "IPFS",
    "The Graph",
    "Chainlink",
    "OpenZeppelin",
    "MetaMask",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { name: "", role: "", email: "", github: "" },
        ],
      }));
    }
  };

  const removeTeamMember = (index: number) => {
    if (formData.teamMembers.length > 1) {
      const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    // Simulate file upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleInputChange(field, file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    // Handle successful submission
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-purple-50 dark:from-black dark:via-cyan-950/20 dark:to-purple-950/20">
      {/* Animated Background */}
      <Navbar />
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

      {/* Header */}
      <section className="relative px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <Badge className="mb-6 border-0 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 text-lg text-white">
              <Upload className="mr-2 h-4 w-4" />
              Competition Submission
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
              Submit Your Project
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {competition.title}
            </p>

            {/* Deadline Warning */}
            <div className="inline-flex items-center gap-4 rounded-full border border-red-200/20 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-6 py-3 dark:border-red-800/20">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-red-600 dark:text-red-400">
                Deadline: {competition.deadline} ({competition.timeLeft}{" "}
                remaining)
              </span>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="mx-auto flex max-w-4xl items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                        currentStep >= step.id
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-medium ${
                          currentStep >= step.id
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="hidden text-xs text-gray-500 sm:block dark:text-gray-400">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-16 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Content */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="border-cyan-200/20 bg-white/80 backdrop-blur-sm dark:border-cyan-800/20 dark:bg-black/80">
              <CardContent className="p-8">
                {/* Step 1: Project Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Project Information
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tell us about your amazing project
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <Label
                          htmlFor="projectTitle"
                          className="text-base font-medium dark:text-white"
                        >
                          Project Title *
                        </Label>
                        <Input
                          id="projectTitle"
                          placeholder="Enter your project title"
                          value={formData.projectTitle}
                          onChange={(e) =>
                            handleInputChange("projectTitle", e.target.value)
                          }
                          className="mt-2 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label
                          htmlFor="projectDescription"
                          className="text-base font-medium dark:text-white"
                        >
                          Project Description *
                        </Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Describe your project, its purpose, and key features..."
                          value={formData.projectDescription}
                          onChange={(e) =>
                            handleInputChange(
                              "projectDescription",
                              e.target.value,
                            )
                          }
                          className="mt-2 min-h-[120px] dark:text-white"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="category"
                          className="text-base font-medium dark:text-white"
                        >
                          Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                        >
                          <SelectTrigger className="mt-2 dark:text-white">
                            <SelectValue placeholder="Select project category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="tags"
                          className="text-base font-medium dark:text-white"
                        >
                          Tags
                        </Label>
                        <Input
                          id="tags"
                          placeholder="e.g., DeFi, Lending, Ethereum"
                          className="mt-2 dark:text-white"
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-white">
                          Separate tags with commas
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Team Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Team Information
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Tell us about your team members
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="teamName"
                          className="text-base font-medium dark:text-white"
                        >
                          Team Name
                        </Label>
                        <Input
                          id="teamName"
                          placeholder="Enter your team name"
                          value={formData.teamName}
                          onChange={(e) =>
                            handleInputChange("teamName", e.target.value)
                          }
                          className="mt-2 dark:text-white"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="teamSize"
                          className="text-base font-medium dark:text-white"
                        >
                          Team Size *
                        </Label>
                        <Select
                          value={formData.teamSize}
                          onValueChange={(value) =>
                            handleInputChange("teamSize", value)
                          }
                        >
                          <SelectTrigger className="mt-2 dark:text-white">
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 (Solo)</SelectItem>
                            <SelectItem value="2">2 members</SelectItem>
                            <SelectItem value="3">3 members</SelectItem>
                            <SelectItem value="4">4 members</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium dark:text-white">
                          Team Members *
                        </Label>
                        {formData.teamMembers.length < 4 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTeamMember}
                            className="border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Add Member
                          </Button>
                        )}
                      </div>

                      {formData.teamMembers.map((member, index) => (
                        <Card
                          key={index}
                          className="border-cyan-200/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 dark:border-cyan-800/20"
                        >
                          <CardContent className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                Member {index + 1}{" "}
                                {index === 0 && "(Team Lead)"}
                              </h4>
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamMember(index)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label className="text-sm dark:text-white">
                                  Full Name *
                                </Label>
                                <Input
                                  placeholder="Enter full name"
                                  value={member.name}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  className="mt-1 dark:text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-sm dark:text-white">
                                  Role *
                                </Label>
                                <Input
                                  placeholder="e.g., Developer, Designer"
                                  value={member.role}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "role",
                                      e.target.value,
                                    )
                                  }
                                  className="mt-1 dark:text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-sm dark:text-white">
                                  Email *
                                </Label>
                                <Input
                                  type="email"
                                  placeholder="Enter email address"
                                  value={member.email}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "email",
                                      e.target.value,
                                    )
                                  }
                                  className="mt-1 dark:text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-sm dark:text-white">
                                  GitHub Profile
                                </Label>
                                <Input
                                  placeholder="GitHub username"
                                  value={member.github}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "github",
                                      e.target.value,
                                    )
                                  }
                                  className="mt-1 dark:text-white"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Technical Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Technical Specifications
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Technical details about your implementation
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="blockchain"
                          className="text-base font-medium dark:text-white"
                        >
                          Primary Blockchain *
                        </Label>
                        <Select
                          value={formData.blockchain}
                          onValueChange={(value) =>
                            handleInputChange("blockchain", value)
                          }
                        >
                          <SelectTrigger className="mt-2 dark:text-white">
                            <SelectValue placeholder="Select blockchain" />
                          </SelectTrigger>
                          <SelectContent>
                            {blockchains.map((blockchain) => (
                              <SelectItem key={blockchain} value={blockchain}>
                                {blockchain}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="smartContractAddress"
                          className="text-base font-medium dark:text-white"
                        >
                          Smart Contract Address
                        </Label>
                        <Input
                          id="smartContractAddress"
                          placeholder="0x..."
                          value={formData.smartContractAddress}
                          onChange={(e) =>
                            handleInputChange(
                              "smartContractAddress",
                              e.target.value,
                            )
                          }
                          className="mt-2 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-base font-medium dark:text-white">
                          Technologies Used *
                        </Label>
                        <div className="mt-2 grid grid-cols-3 gap-3 md:grid-cols-4 dark:text-white">
                          {technologies.map((tech) => (
                            <div
                              key={tech}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={tech}
                                checked={formData.technologies.includes(tech)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleInputChange("technologies", [
                                      ...formData.technologies,
                                      tech,
                                    ]);
                                  } else {
                                    handleInputChange(
                                      "technologies",
                                      formData.technologies.filter(
                                        (t) => t !== tech,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <Label htmlFor={tech} className="text-sm">
                                {tech}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label
                          htmlFor="testnetDeployment"
                          className="text-base font-medium dark:text-white"
                        >
                          Testnet Deployment URL
                        </Label>
                        <Input
                          id="testnetDeployment"
                          placeholder="https://..."
                          value={formData.testnetDeployment}
                          onChange={(e) =>
                            handleInputChange(
                              "testnetDeployment",
                              e.target.value,
                            )
                          }
                          className="mt-2 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Files & Links */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Files & Links
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Upload your project files and provide relevant links
                      </p>
                    </div>

                    <Tabs defaultValue="links" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 dark:text-white">
                        <TabsTrigger value="links">Project Links</TabsTrigger>
                        <TabsTrigger value="files">File Uploads</TabsTrigger>
                      </TabsList>

                      <TabsContent value="links" className="mt-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <Label
                              htmlFor="githubRepo"
                              className="flex items-center text-base font-medium"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              GitHub Repository *
                            </Label>
                            <Input
                              id="githubRepo"
                              placeholder="https://github.com/username/repo"
                              value={formData.githubRepo}
                              onChange={(e) =>
                                handleInputChange("githubRepo", e.target.value)
                              }
                              className="mt-2 dark:text-white"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="liveDemo"
                              className="flex items-center text-base font-medium"
                            >
                              <Globe className="mr-2 h-4 w-4" />
                              Live Demo URL
                            </Label>
                            <Input
                              id="liveDemo"
                              placeholder="https://your-demo.com"
                              value={formData.liveDemo}
                              onChange={(e) =>
                                handleInputChange("liveDemo", e.target.value)
                              }
                              className="mt-2 dark:text-white"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="videoDemo"
                              className="flex items-center text-base font-medium"
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Video Demo URL
                            </Label>
                            <Input
                              id="videoDemo"
                              placeholder="https://youtube.com/watch?v=..."
                              value={formData.videoDemo}
                              onChange={(e) =>
                                handleInputChange("videoDemo", e.target.value)
                              }
                              className="mt-2 dark:text-white"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="documentation"
                              className="flex items-center text-base font-medium"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Documentation URL
                            </Label>
                            <Input
                              id="documentation"
                              placeholder="https://docs.your-project.com"
                              value={formData.documentation}
                              onChange={(e) =>
                                handleInputChange(
                                  "documentation",
                                  e.target.value,
                                )
                              }
                              className="mt-2 dark:text-white"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label
                              htmlFor="designFiles"
                              className="flex items-center text-base font-medium"
                            >
                              <Palette className="mr-2 h-4 w-4" />
                              Design Files URL (Figma, etc.)
                            </Label>
                            <Input
                              id="designFiles"
                              placeholder="https://figma.com/file/..."
                              value={formData.designFiles}
                              onChange={(e) =>
                                handleInputChange("designFiles", e.target.value)
                              }
                              className="mt-2 dark:text-white"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="files" className="mt-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <Label className="flex items-center text-base font-medium">
                              <Code className="mr-2 h-4 w-4" />
                              Source Code Archive *
                            </Label>
                            <div className="mt-2 rounded-lg border-2 border-dashed border-cyan-300 p-6 text-center transition-colors hover:border-cyan-400 dark:border-cyan-700">
                              <Upload className="mx-auto mb-2 h-8 w-8 text-cyan-500" />
                              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Drop your ZIP file here or click to browse
                              </p>
                              <p className="text-xs text-gray-500">
                                Max size: {competition.maxFileSize}
                              </p>
                              <input
                                type="file"
                                accept=".zip,.rar"
                                className="hidden"
                                onChange={(e) =>
                                  e.target.files?.[0] &&
                                  handleFileUpload(
                                    "sourceCode",
                                    e.target.files[0],
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="flex items-center text-base font-medium">
                              <FileText className="mr-2 h-4 w-4" />
                              Documentation PDF
                            </Label>
                            <div className="mt-2 rounded-lg border-2 border-dashed border-purple-300 p-6 text-center transition-colors hover:border-purple-400 dark:border-purple-700">
                              <FileText className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Upload your documentation
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF format preferred
                              </p>
                            </div>
                          </div>

                          <div>
                            <Label className="flex items-center text-base font-medium">
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Screenshots
                            </Label>
                            <div className="mt-2 rounded-lg border-2 border-dashed border-yellow-300 p-6 text-center transition-colors hover:border-yellow-400 dark:border-yellow-700">
                              <ImageIcon className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Upload project screenshots
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG (Multiple files allowed)
                              </p>
                            </div>
                          </div>

                          <div>
                            <Label className="flex items-center text-base font-medium">
                              <Video className="mr-2 h-4 w-4" />
                              Presentation Video
                            </Label>
                            <div className="mt-2 rounded-lg border-2 border-dashed border-green-300 p-6 text-center transition-colors hover:border-green-400 dark:border-green-700">
                              <Video className="mx-auto mb-2 h-8 w-8 text-green-500" />
                              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Upload presentation video
                              </p>
                              <p className="text-xs text-gray-500">
                                MP4 format, max 500MB
                              </p>
                            </div>
                          </div>
                        </div>

                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Review & Submit
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Review your submission before final submission
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Project Summary */}
                      <Card className="border-cyan-200/20 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 dark:border-cyan-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Trophy className="mr-2 h-5 w-5 text-cyan-500" />
                            Project Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Project Title
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.projectTitle || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Category
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.category || "Not selected"}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium text-gray-500">
                                Description
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.projectDescription || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Team Summary */}
                      <Card className="border-purple-200/20 bg-gradient-to-r from-purple-500/5 to-yellow-500/5 dark:border-purple-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Users className="mr-2 h-5 w-5 text-purple-500" />
                            Team Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Team Name
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.teamName || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Team Size
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.teamSize} member(s)
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Members
                              </Label>
                              <div className="space-y-2">
                                {formData.teamMembers.map((member, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between rounded bg-white/50 p-2 dark:bg-black/50"
                                  >
                                    <span className="text-gray-900 dark:text-white">
                                      {member.name || `Member ${index + 1}`}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {member.role || "Role not specified"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Technical Summary */}
                      <Card className="border-yellow-200/20 bg-gradient-to-r from-yellow-500/5 to-cyan-500/5 dark:border-yellow-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Code className="mr-2 h-5 w-5 text-yellow-500" />
                            Technical Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Blockchain
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.blockchain || "Not selected"}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Technologies
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formData.technologies.length > 0
                                  ? formData.technologies.join(", ")
                                  : "None selected"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Legal Compliance */}
                      <Card className="border-red-200/20 bg-gradient-to-r from-red-500/5 to-orange-500/5 dark:border-red-800/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-red-500" />
                            Legal & Compliance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="originalWork"
                                checked={formData.originalWork}
                                onCheckedChange={(checked) =>
                                  handleInputChange("originalWork", checked)
                                }
                              />
                              <Label htmlFor="originalWork" className="text-sm">
                                I confirm that this is original work and I have
                                the right to submit it *
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="termsAccepted"
                                checked={formData.termsAccepted}
                                onCheckedChange={(checked) =>
                                  handleInputChange("termsAccepted", checked)
                                }
                              />
                              <Label
                                htmlFor="termsAccepted"
                                className="text-sm"
                              >
                                I accept the competition terms and conditions *
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="privacyAccepted"
                                checked={formData.privacyAccepted}
                                onCheckedChange={(checked) =>
                                  handleInputChange("privacyAccepted", checked)
                                }
                              />
                              <Label
                                htmlFor="privacyAccepted"
                                className="text-sm"
                              >
                                I agree to the privacy policy *
                              </Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="border-yellow-500 bg-transparent text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                      >
                        Next Step
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          isSubmitting ||
                          !formData.originalWork ||
                          !formData.termsAccepted ||
                          !formData.privacyAccepted
                        }
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Project
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
