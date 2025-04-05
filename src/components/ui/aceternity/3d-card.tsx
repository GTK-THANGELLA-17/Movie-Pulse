
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  rotationIntensity?: number;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ 
  children, 
  className, 
  depth = 10,
  rotationIntensity = 10 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - cardCenterX) / (rect.width / 2)) * rotationIntensity;
    const rotateX = -((e.clientY - cardCenterY) / (rect.height / 2)) * rotationIntensity;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
    setTranslateZ(depth);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setTranslateZ(0);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "perspective-[1000px] rounded-xl transition-all duration-200",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="preserve-3d transition-transform duration-200 ease-out transform-gpu rounded-xl"
        style={{ 
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </div>
  );
};
