import React from "react";
import { cn } from "@/lib/utils";

export function AuthComponentPageBackground({ children }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black overflow-hidden">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />

      {/* Radial fade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,white)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Page Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
