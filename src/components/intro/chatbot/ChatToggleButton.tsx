
import { motion } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggleButton = ({ isOpen, onClick }: ChatToggleButtonProps) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-lg"
        animate={{
          scale: isOpen ? [1, 1.2, 1] : [1, 1.3, 1],
          opacity: isOpen ? [0.5, 0.8, 0.5] : [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: isOpen ? 2 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main button */}
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-primary/80 hover:from-primary/90 hover:via-accent/90 hover:to-primary/70 shadow-2xl text-primary-foreground border-2 border-white/20 relative overflow-hidden group backdrop-blur-sm"
      >
        {/* Background shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0%" : "200%" }}
          transition={{
            duration: 1.5,
            repeat: isOpen ? 0 : Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon container with enhanced animations */}
        <motion.div
          animate={{
            rotate: isOpen ? 0 : [0, -15, 15, -10, 10, 0],
            scale: isOpen ? [1, 0.9, 1] : [1, 1.1, 1]
          }}
          transition={{
            duration: isOpen ? 0.3 : 4,
            repeat: isOpen ? 1 : Infinity,
            repeatDelay: isOpen ? 0 : 5,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
        
        {/* Notification badge with enhanced effects */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </motion.div>
        )}
        
        {/* Floating particles effect */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${20 + i * 15}%`
                }}
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/40"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.6 }}
        />
      </Button>
    </motion.div>
  );
};

export default ChatToggleButton;
