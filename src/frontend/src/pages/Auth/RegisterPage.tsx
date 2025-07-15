"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Calendar,
  Lock,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeProvider";
import { Navbar } from "@/components/Layouts/navbar";
import { Footer } from "@/components/Layouts/footer";

export default function RegisterPage() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", formData);
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#181818]" : "bg-[#fffffe]"} transition-colors duration-300`}
    >
      <Navbar />

      {/* Background Animation */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-[#4fc4cf]/20 to-[#994ff3]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-[#994ff3]/20 to-[#f9bc60]/20 blur-3xl delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-[#4fc4cf]/10 to-[#994ff3]/10 blur-3xl delay-500" />
      </div>

      <div className="relative z-10 px-6 pb-16 pt-24">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Join Overworked
            </h1>
            <p
              className={`text-lg ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}
            >
              Create your account and start building your digital presence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              className={`${
                theme === "dark"
                  ? "border-[#4fc4cf]/20 bg-[#181818]/80"
                  : "border-[#994ff3]/20 bg-[#fffffe]/80"
              } shadow-2xl backdrop-blur-xl`}
            >
              <CardHeader className="pb-6 text-center">
                <CardTitle
                  className={`text-2xl font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"}`}
                >
                  Create Account
                </CardTitle>
                <CardDescription
                  className={`${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}
                >
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Picture Upload */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div
                        className={`h-24 w-24 rounded-full border-2 border-dashed ${
                          theme === "dark"
                            ? "border-[#4fc4cf]/50"
                            : "border-[#994ff3]/50"
                        } flex items-center justify-center overflow-hidden ${
                          profileImage
                            ? ""
                            : "bg-gradient-to-br from-[#4fc4cf]/10 to-[#994ff3]/10"
                        }`}
                      >
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Upload
                            className={`h-8 w-8 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#994ff3]"}`}
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                    <Label
                      className={`text-sm ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}
                    >
                      Upload Profile Picture
                    </Label>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                          : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
                      } transition-colors focus:border-[#4fc4cf]`}
                    />
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Username</span>
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a unique username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className={`${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                          : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
                      } transition-colors focus:border-[#4fc4cf]`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Address</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                          : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
                      } transition-colors focus:border-[#4fc4cf]`}
                    />
                  </div>

                  {/* Date of Birth Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Date of Birth</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className={`${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe]"
                          : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818]"
                      } transition-colors focus:border-[#4fc4cf]`}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <Lock className="h-4 w-4" />
                      <span>Password</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={`pr-10 ${
                          theme === "dark"
                            ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                            : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
                        } transition-colors focus:border-[#4fc4cf]`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-[#4fc4cf]" />
                        ) : (
                          <Eye className="h-4 w-4 text-[#4fc4cf]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <Lock className="h-4 w-4" />
                      <span>Confirm Password</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={`pr-10 ${
                          theme === "dark"
                            ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                            : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
                        } transition-colors focus:border-[#4fc4cf]`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-[#4fc4cf]" />
                        ) : (
                          <Eye className="h-4 w-4 text-[#4fc4cf]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-12 w-full transform border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] text-lg font-semibold text-[#fffffe] transition-all duration-300 hover:scale-105 hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80"
                  >
                    Create Account
                  </Button>

                  {/* Login Link */}
                  <div className="pt-4 text-center">
                    <p
                      className={`text-sm ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}
                    >
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="font-semibold text-[#4fc4cf] transition-colors hover:text-[#994ff3]"
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
