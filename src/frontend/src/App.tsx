import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import { Toaster } from "@/components/ui/sonner";
import SplashCursor from "@/components/reactbits/SplashCursor/SplashCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import ScrollToTopButton from "./utility/ScrollToTop";
import { MouseFollower } from "./components/General/mouse-follower";



// Utility Pages

import ComingSoonPage from "./pages/Utility/coming-soon";
import LoadingPage from "./pages/Utility/loading-screen";
import NotFoundPage from "./pages/Utility/not-found";


function App() {
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated } = auth;

  return (
    <>
      <BrowserRouter>

        <MouseFollower/>
        {/* <SplashCursor /> */}

        <ScrollToTopFunction />
        <ScrollToTopButton />

        <Routes>

          <Route
            path="/"
            element={isAuthenticated ? <LandingPage /> : <LoginPage />}
          />

          <Route path="/landing" element={<LandingPage />} />

          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
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
