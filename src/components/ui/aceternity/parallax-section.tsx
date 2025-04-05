
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offsetMultiplier?: number;
  direction?: "up" | "down";
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  offsetMultiplier = 0.5,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    
    const onResize = () => {
      if (element) {
        setElementTop(element.getBoundingClientRect().top + window.scrollY || 0);
        setClientHeight(window.innerHeight);
      }
    };
    
    onResize();
    window.addEventListener("resize", onResize);
    
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  const { scrollY } = useScroll();
  
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    direction === "up" 
      ? [offsetMultiplier * 100, offsetMultiplier * -100] 
      : [offsetMultiplier * -100, offsetMultiplier * 100]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};
