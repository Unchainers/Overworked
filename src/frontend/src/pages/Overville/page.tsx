import OvervilleCityContainer from "@/components/Overville/overville-city-container";
import { ThemeToggle } from "@/contexts/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-overville-city flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <OvervilleCityContainer />
    </main>
  );
}
