
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SmartLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
}

export const SmartLoader = ({ 
  message = 'Loading...', 
  size = 'medium', 
  delay = 300 
}: SmartLoaderProps) => {
  const [showLoader, setShowLoader] = useState(delay === 0);
  
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  if (!showLoader) return null;
  
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };
  
  const containerSizeClasses = {
    small: 'py-2',
    medium: 'py-4',
    large: 'py-6'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center ${containerSizeClasses[size]}`}
    >
      <div className={`${sizeClasses[size]} rounded-full border-primary border-t-transparent animate-spin`}></div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SmartLoader;
