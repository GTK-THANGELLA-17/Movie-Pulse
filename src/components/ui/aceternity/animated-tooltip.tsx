
import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const AnimatedTooltip = ({
  content,
  children,
  side = "top",
  className,
}: AnimatedTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const variants = {
    hidden: {
      opacity: 0,
      y: side === "top" ? 10 : side === "bottom" ? -10 : 0,
      x: side === "left" ? 10 : side === "right" ? -10 : 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  const positionMap = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md pointer-events-none",
              positionMap[side],
              className
            )}
          >
            {content}
            <div
              className={cn(
                "absolute bg-popover w-2 h-2 transform rotate-45",
                side === "top" && "bottom-0 translate-y-1/2",
                side === "bottom" && "top-0 -translate-y-1/2",
                side === "left" && "right-0 translate-x-1/2",
                side === "right" && "left-0 -translate-x-1/2"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
