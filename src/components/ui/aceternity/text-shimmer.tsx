
import { cn } from "@/lib/utils";
import React from "react";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export const TextShimmer: React.FC<TextShimmerProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-primary via-primary-foreground to-primary bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};

export const animateShimmer = "animate-[shimmer_2s_infinite]";
