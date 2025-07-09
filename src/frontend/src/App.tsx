// Import components and views
// import { Loader, ErrorDisplay } from "./components";
// import { GreetingView, CounterView, LlmPromptView } from "./views";
import { AuthProvider, useAuth } from "./hooks/use-auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const auth = useAuth();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | undefined>();

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
  </AuthProvider>
);