
import React from "react";
import { cn } from "@/lib/utils";

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  depth?: number;
}

export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  ({ className, variant = "primary", size = "md", depth = 4, children, ...props }, ref) => {
    // Calculate the transformed position based on depth
    const shadowDepth = `${depth}px`;
    
    const baseStyles = "relative font-medium rounded-xl transition-all transform active:translate-y-1 active:shadow-none";
    
    const variants = {
      primary: `bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_${shadowDepth}_0_0_#451926]`,
      secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_${shadowDepth}_0_0_#d1c5c1]`,
      outline: `bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground shadow-[0_${shadowDepth}_0_0_#e2d1c3]`,
      ghost: `bg-transparent hover:bg-accent hover:text-accent-foreground shadow-none transform-none active:translate-y-0`,
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-6 text-lg",
      icon: "h-10 w-10 p-0"
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";
