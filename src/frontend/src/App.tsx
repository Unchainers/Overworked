import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import { Toaster } from "@/components/ui/sonner";

function App() {

  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated } = auth;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <LandingPage /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
    <Toaster/>
  </AuthProvider>
);
