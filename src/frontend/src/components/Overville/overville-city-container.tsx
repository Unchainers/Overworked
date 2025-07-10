import { Suspense, lazy } from "react"
import { Building2 } from "lucide-react"
import { useTheme } from "@/contexts/ThemeProvider"

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
  }
}

// Lazy load the component
const OvervilleCityViewer = lazy(() => import("@/pages/Overville/overville-city-viewer"))

function LoadingFallback() {
  const { theme } = useTheme()

  return (
    <div className={`w-full h-screen flex items-center justify-center bg-gradient-to-b ${theme === 'dark' ? 'from-[#181818] to-gray-900' : 'from-[#f8fafc] to-[#e2e8f0]'}`}>
      <div className="text-center space-y-6">
        <div className="relative">
          <Building2 className={`w-16 h-16 mx-auto ${theme === 'dark' ? 'text-[#4fc4cf]' : 'text-[#0ea5e9]'} animate-pulse`} />
          <div className={`absolute inset-0 w-16 h-16 mx-auto border-2 rounded-full animate-ping opacity-20 ${theme === 'dark' ? 'border-[#4fc4cf]' : 'border-[#0ea5e9]'}`}></div>
        </div>
        <div className="space-y-2">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#fffffe]' : 'text-[#1e293b]'}`}>
            Welcome to Overville
          </h2>
          <p className={theme === 'dark' ? 'text-[#fffffe]/70' : 'text-[#1e293b]/70'}>
            Loading your digital city experience...
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-[#4fc4cf]' : 'bg-[#0ea5e9]'}`}></div>
          <div
            className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-[#994ff3]' : 'bg-[#7c3aed]'}`}
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-[#fbdd74]' : 'bg-[#f59e0b]'}`}
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function OvervilleCityContainer() {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <OvervilleCityViewer />
      </Suspense>
    </div>
  )
}