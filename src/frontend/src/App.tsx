// Must Utility

import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";

// Default Utility

import { Toaster } from "@/components/ui/sonner";
// import SplashCursor from "@/components/reactbits/SplashCursor/SplashCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import ScrollToTopButton from "./utility/ScrollToTop";
import { MouseFollower } from "./components/General/mouse-follower";

// Important Pages

import OvervilleCityPage from "./pages/Overville/page";
import LandingPage from "./pages/LandingPage";
import WalletPage from "./pages/WalletPage";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Utility Pages

import ComingSoonPage from "./pages/Utility/coming-soon";
import LoadingPage from "./pages/Utility/loading-screen";
import NotFoundPage from "./pages/Utility/not-found";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Modules Page

// World Brain

import WorldBrainPage from "./pages/World-Brain/page";

function App() {
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated } = auth;
  const [loading, setLoading] = useState(true);

  return (
    <>
      <BrowserRouter>
        <MouseFollower />
        {/* <SplashCursor /> */}

        <ScrollToTopFunction />
        <ScrollToTopButton />

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
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
    <Toaster />
  </AuthProvider>
);
