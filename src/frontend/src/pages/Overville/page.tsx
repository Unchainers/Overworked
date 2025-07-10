import OvervilleCityContainer from "@/components/Overville/overville-city-container"
import { ThemeToggle } from "@/contexts/ThemeToggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-overville-city overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <OvervilleCityContainer />
    </main>
  )
}
