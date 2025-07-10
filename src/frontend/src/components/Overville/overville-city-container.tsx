import { Suspense, lazy } from "react";
import { Building2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";

// Color palettes for dark and light modes
const COLOR_PALETTES = {
  dark: {
    background: "#181818",
    foreground: "#fffffe",
    primary: "#4fc4cf",
    secondary: "#994ff3",
    accent: "#fbdd74",
    text: "#fffffe",
    muted: "#a1a1aa",
  },
  light: {
    background: "#f8fafc",
    foreground: "#1e293b",
    primary: "#0ea5e9",
    secondary: "#7c3aed",
    accent: "#f59e0b",
    text: "#1e293b",
    muted: "#64748b",
  },
};

// Lazy load the component
const OvervilleCityViewer = lazy(
  () => import("@/pages/Overville/overville-city-viewer"),
);

function LoadingFallback() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen w-full items-center justify-center bg-gradient-to-b ${theme === "dark" ? "from-[#181818] to-gray-900" : "from-[#f8fafc] to-[#e2e8f0]"}`}
    >
      <div className="space-y-6 text-center">
        <div className="relative">
          <Building2
            className={`mx-auto h-16 w-16 ${theme === "dark" ? "text-[#4fc4cf]" : "text-[#0ea5e9]"} animate-pulse`}
          />
          <div
            className={`absolute inset-0 mx-auto h-16 w-16 animate-ping rounded-full border-2 opacity-20 ${theme === "dark" ? "border-[#4fc4cf]" : "border-[#0ea5e9]"}`}
          ></div>
        </div>
        <div className="space-y-2">
          <h2
            className={`text-2xl font-bold ${theme === "dark" ? "text-[#fffffe]" : "text-[#1e293b]"}`}
          >
            Welcome to Overville
          </h2>
          <p
            className={
              theme === "dark" ? "text-[#fffffe]/70" : "text-[#1e293b]/70"
            }
          >
            Loading your digital city experience...
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`h-2 w-2 animate-bounce rounded-full ${theme === "dark" ? "bg-[#4fc4cf]" : "bg-[#0ea5e9]"}`}
          ></div>
          <div
            className={`h-2 w-2 animate-bounce rounded-full ${theme === "dark" ? "bg-[#994ff3]" : "bg-[#7c3aed]"}`}
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className={`h-2 w-2 animate-bounce rounded-full ${theme === "dark" ? "bg-[#fbdd74]" : "bg-[#f59e0b]"}`}
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function OvervilleCityContainer() {
  return (
    <div className="h-screen w-full">
      <Suspense fallback={<LoadingFallback />}>
        <OvervilleCityViewer />
      </Suspense>
    </div>
  );
}
