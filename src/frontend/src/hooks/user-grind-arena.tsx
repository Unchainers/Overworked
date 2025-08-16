import GrindArenaContext from "@/contexts/grind-arena-context";
import { useContext } from "react";

export default function useGrindArena() {
  const context = useContext(GrindArenaContext);

  if (!context) {
    throw new Error("useGrindArena must be used within GrindArenaProvider.");
  }

  return context;
}
