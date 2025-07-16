"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/Layouts/navbar"
import { Footer } from "@/components/Layouts/footer"
import {
  User,
  Mail,
  Globe,
  Users,
  Upload,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Camera,
  Link,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"

export default function BecomeInstructorPage() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    bio: "",
    expertise: "",
    experience: "",
    education: "",
    portfolio: "",
    linkedin: "",
    twitter: "",
    website: "",
    profileImage: null as File | null,
    sampleVideo: null as File | null,
    motivation: "",
    courseIdeas: "",
    agreeTerms: false,
    agreeMarketing: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const benefits = [
    {
      icon: Zap,
      title: "Earn CRY Tokens",
      description: "Get rewarded for every student enrollment and course completion",
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Teach students from around the world in the Web3 ecosystem",
    },
    {
      icon: Target,
      title: "Expert Recognition",
      description: "Build your reputation as a thought leader in your field",
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Create courses once and earn continuously from enrollments",
    },
  ]

  const requirements = [
    "Minimum 2 years of professional experience in your field",
    "Ability to create engaging video content",
    "Strong communication skills in English",
    "Commitment to student success and engagement",
    "Access to quality recording equipment",
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="opacity-70">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload("profileImage", e.target.files?.[0] || null)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your background, and what makes you passionate about teaching..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                required
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Professional Background</h2>
              <p className="opacity-70">Share your expertise and experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="expertise">Area of Expertise *</Label>
                <Select value={formData.expertise} onValueChange={(value) => handleInputChange("expertise", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blockchain">Blockchain Development</SelectItem>
                    <SelectItem value="web3">Web3 Development</SelectItem>
                    <SelectItem value="smart-contracts">Smart Contracts</SelectItem>
                    <SelectItem value="defi">DeFi Protocols</SelectItem>
                    <SelectItem value="nft">NFT & Digital Art</SelectItem>
                    <SelectItem value="crypto-trading">Cryptocurrency Trading</SelectItem>
                    <SelectItem value="web3-marketing">Web3 Marketing</SelectItem>
                    <SelectItem value="community">Community Building</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Professional Experience *</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your professional experience, key achievements, and relevant projects..."
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Background</Label>
                <Textarea
                  id="education"
                  placeholder="Share your educational background, certifications, and relevant qualifications..."
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/Work Samples</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="portfolio"
                    placeholder="Link to your portfolio, GitHub, or work samples"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Social Presence & Teaching</h2>
              <p className="opacity-70">Connect your profiles and share your teaching vision</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X Profile</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/yourhandle"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website">Personal Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleVideo">Sample Teaching Video</Label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="sampleVideo"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload("sampleVideo", e.target.files?.[0] || null)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm opacity-70">
                Upload a 2-3 minute video introducing yourself and demonstrating your teaching style
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to teach? *</Label>
              <Textarea
                id="motivation"
                placeholder="Share your motivation for becoming an instructor and how you plan to contribute to the World Brain community..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseIdeas">Course Ideas</Label>
              <Textarea
                id="courseIdeas"
                placeholder="What courses would you like to create? Describe 2-3 course ideas you're excited to develop..."
                value={formData.courseIdeas}
                onChange={(e) => handleInputChange("courseIdeas", e.target.value)}
                rows={4}
              />
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
              <p className="opacity-70">Please review your information and agree to our terms</p>
            </div>

            <Card className={`${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Application Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {formData.fullName || "Not provided"}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {formData.email || "Not provided"}
                  </div>
                  <div>
                    <span className="font-medium">Country:</span> {formData.country || "Not provided"}
                  </div>
                  <div>
                    <span className="font-medium">Expertise:</span> {formData.expertise || "Not provided"}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Bio:</span>
                  <p className="text-sm opacity-80 mt-1">
                    {formData.bio ? formData.bio.substring(0, 150) + "..." : "Not provided"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked: boolean) => handleInputChange("agreeTerms", checked)}
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-cyan-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-cyan-400 hover:underline">
                    Instructor Agreement
                  </a>
                  . I understand that my application will be reviewed and I will be notified of the decision within 5-7
                  business days.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked: any) => handleInputChange("agreeMarketing", checked)}
                />
                <Label htmlFor="agreeMarketing" className="text-sm leading-relaxed">
                  I agree to receive marketing communications and updates about World Brain instructor opportunities.
                </Label>
              </div>
            </div>

            <Card
              className={`${theme === "dark" ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/30" : "bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-200"}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold">What happens next?</h3>
                </div>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>• Your application will be reviewed by our expert team</li>
                  <li>• We may contact you for additional information or an interview</li>
                  <li>• Approved instructors will receive onboarding materials and course creation tools</li>
                  <li>• You'll be able to start creating and publishing courses immediately after approval</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center mb-6">
              <GraduationCap className="w-16 h-16 text-cyan-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                Become an Instructor
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-80 max-w-3xl mx-auto">
              Share your expertise with the world and earn CRY tokens while empowering the next generation of Web3
              creators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
          >
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm opacity-80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Instructor Requirements
            </h2>
            <p className="text-lg opacity-80">Make sure you meet these requirements before applying</p>
          </motion.div>

          <Card className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
            <CardContent className="p-8">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Instructor Application
            </h2>
            <p className="text-lg opacity-80">Complete the form below to apply for instructor status</p>
          </motion.div>

          <Card className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
            <CardContent className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-sm opacity-70">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!formData.agreeTerms}
                      className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
