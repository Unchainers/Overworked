"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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

export default function LoginPage() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-16 pt-24">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Welcome Back
            </h1>
            <p
              className={`text-lg ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}
            >
              Sign in to continue your journey in Overworked
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
                  Sign In
                </CardTitle>
                <CardDescription
                  className={`${theme === "dark" ? "text-[#fffffe]/60" : "text-[#181818]/60"}`}
                >
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email/Username Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="emailOrUsername"
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-[#fffffe]" : "text-[#181818]"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email or Username</span>
                    </Label>
                    <Input
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type="text"
                      placeholder="Enter your email or username"
                      value={formData.emailOrUsername}
                      onChange={handleInputChange}
                      required
                      className={`h-12 text-base ${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 bg-[#181818]/50 text-[#fffffe] placeholder:text-[#fffffe]/50"
                          : "border-[#994ff3]/30 bg-[#fffffe]/50 text-[#181818] placeholder:text-[#181818]/50"
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={`h-12 pr-12 text-base ${
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
                          <EyeOff className="h-5 w-5 text-[#4fc4cf]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#4fc4cf]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <a
                      href="/forgot-password"
                      className="text-sm font-medium text-[#4fc4cf] transition-colors hover:text-[#994ff3]"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-14 w-full transform border-0 bg-gradient-to-r from-[#4fc4cf] to-[#994ff3] text-lg font-semibold text-[#fffffe] shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#4fc4cf]/80 hover:to-[#994ff3]/80 hover:shadow-xl"
                  >
                    Sign In
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className={`absolute inset-0 flex items-center`}>
                      <span
                        className={`w-full border-t ${
                          theme === "dark"
                            ? "border-[#4fc4cf]/20"
                            : "border-[#994ff3]/20"
                        }`}
                      />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span
                        className={`px-2 ${
                          theme === "dark"
                            ? "bg-[#181818] text-[#fffffe]/60"
                            : "bg-[#fffffe] text-[#181818]/60"
                        }`}
                      >
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-12 ${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 text-[#fffffe] hover:bg-[#4fc4cf]/10"
                          : "border-[#994ff3]/30 text-[#181818] hover:bg-[#994ff3]/10"
                      } transition-colors`}
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-12 ${
                        theme === "dark"
                          ? "border-[#4fc4cf]/30 text-[#fffffe] hover:bg-[#4fc4cf]/10"
                          : "border-[#994ff3]/30 text-[#181818] hover:bg-[#994ff3]/10"
                      } transition-colors`}
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      Twitter
                    </Button>
                  </div>

                  {/* Register Link */}
                  <div className="pt-6 text-center">
                    <p
                      className={`text-sm ${theme === "dark" ? "text-[#fffffe]/70" : "text-[#181818]/70"}`}
                    >
                      Don't have an account?{" "}
                      <a
                        href="/register"
                        className="font-semibold text-[#4fc4cf] transition-colors hover:text-[#994ff3]"
                      >
                        Create one here
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
