import GrindArenaProvider from "@/providers/grind-arena-provider";
import { Outlet } from "react-router";

export default function GrindArenaLayout() {
  return (
    <GrindArenaProvider>
      <Outlet />
    </GrindArenaProvider>
  );
}
