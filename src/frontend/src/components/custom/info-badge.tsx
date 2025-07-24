import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import React from "react";

export default function InfoBadge({
  children,
  containerClassName,
  iconClassName,
  bubbleClassName,
}: {
  children: React.ReactNode;
  containerClassName?: HTMLDivElement["className"];
  iconClassName?: HTMLDivElement["className"];
  bubbleClassName?: HTMLDivElement["className"];
}) {
  return (
    <div className={cn("group relative", containerClassName)}>
      <Info className={cn("h-4 w-4", iconClassName)} />
      <div
        className={cn(
          "bg-background bg-ow-white border-ow-black absolute -right-52 top-0 z-50 hidden max-w-[200px] rounded-md border p-2 group-hover:flex",
          bubbleClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
