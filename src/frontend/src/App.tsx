import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import { Toaster } from "@/components/ui/sonner";
import SplashCursor from '@/components/reactbits/SplashCursor/SplashCursor'

function App() {
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated } = auth;

  return (
    <>

      <BrowserRouter>

        <SplashCursor />

        <Routes>

          <Route
            path="/"
            element={isAuthenticated ? <LandingPage /> : <LoginPage />}
          />

          <Route path="/landing" element={<LandingPage/>} />

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
