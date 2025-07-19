// Must Utility

import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";

// Default Utility

import { Toaster } from "@/components/ui/sonner";

// Important Pages

import OvervilleCityPage from "./pages/Overville/page";
import LandingPage from "./pages/LandingPage";
import WalletPage from "./pages/WalletPage";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Utilities

import TeamPage from "./pages/Utility/team";
import ContactPage from "./pages/Utility/contact";
import TermsPage from "./pages/Utility/legal";
import ComingSoonPage from "./pages/Utility/coming-soon";
import LoadingPage from "./pages/Utility/loading-screen";
import NotFoundPage from "./pages/Utility/not-found";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import ScrollToTopButton from "./utility/ScrollToTop";

import AnimatedCursor from "react-animated-cursor";
import SplashCursor from "./components/reactbits/SplashCursor/SplashCursor";

// Modules Page

// World Brain

import WorldBrainPage from "./pages/World-Brain/page";
import CourseDetailPage from "./pages/World-Brain/Course/page";
import CoursePlayerPage from "./pages/World-Brain/Course/[id]/page";
import BecomeInstructorPage from "./pages/World-Brain/Instructor/become-instructor";

// GrindArena

import GrindArenaPage from "./pages/Grind-Arena/Grind-Arena-Landing";
import CompetitionDetailPage from "./pages/Grind-Arena/Competition/competition";
import CompetitionSubmissionPage from "./pages/Grind-Arena/Competition/submission";

function App() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTopButton />

      {/* <MouseFollower /> */}
      {/* <SplashCursor /> */}

      <AnimatedCursor />

      {loading && <LoadingPage onComplete={() => setLoading(false)} />}

      <AnimatePresence mode="wait">
        {!loading && (
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <LandingPage /> : <WalletPage />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/overville" element={<OvervilleCityPage />} />
            <Route path="/landing" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/overville" element={<OvervilleCityPage />} />
            <Route path="/landing" element={<LandingPage />} />

            {/* Modules Pages */}

            {/* World Brain Pages */}

            <Route path="/world-brain" element={<WorldBrainPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route
              path="/course/:id/:moduleId"
              element={<CoursePlayerPage />}
            />
            <Route
              path="/become-instructor"
              element={<BecomeInstructorPage />}
            />

            {/* Grind Arena Pages */}

            <Route path="/grind-arena" element={<GrindArenaPage />} />
            <Route path="/competition/:id" element={<CompetitionDetailPage />} />
            <Route path="/submission/:id" element={<CompetitionSubmissionPage />} />

            {/* Default and Utility Pages */}

            <Route path="/legal" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />

            {/* Default Pages */}

            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  );
};
