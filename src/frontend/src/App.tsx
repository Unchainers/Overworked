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

import ComingSoonPage from "./pages/Utility/coming-soon";
import LoadingPage from "./pages/Utility/loading-screen";
import NotFoundPage from "./pages/Utility/not-found";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import ScrollToTopButton from "./utility/ScrollToTop";

// Modules Page

// World Brain

import WorldBrainPage from "./pages/World-Brain/page";
import { MouseFollower } from "./components/General/mouse-follower";
import SplashCursor from "./components/reactbits/SplashCursor/SplashCursor";

function App() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTopButton />

      <MouseFollower />
      <SplashCursor />

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

            {/* World Brain */}

            <Route path="/world-brain" element={<WorldBrainPage />} />

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
