
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  colors?: string[];
  size?: number;
  blur?: number;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className,
  interactive = true,
  colors = ["#5b2333", "#983b55", "#ff719A"],
  size = 100,
  blur = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!interactive || !containerRef.current || !gradientRef.current) return;
    
    const container = containerRef.current;
    const gradient = gradientRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gradient.style.background = `radial-gradient(circle at ${x}% ${y}%, ${colors.join(", ")})`;
    };
    
    container.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive, colors]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.join(", ")})`,
          filter: `blur(${blur}px)`,
          opacity: 0.7,
          transform: `scale(${1 + size/100})`,
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};
