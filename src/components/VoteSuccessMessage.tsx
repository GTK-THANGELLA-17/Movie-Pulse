
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SocialShare from "./SocialShare";
import { generateShareableContent } from "@/lib/updateVotingForm";

interface VoteSuccessMessageProps {
  projectType: string;
}

const VoteSuccessMessage = ({ projectType }: VoteSuccessMessageProps) => {
  const { title, description } = generateShareableContent(projectType);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }}
      className="py-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
    >
      <motion.div 
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2,
          type: "spring", 
          stiffness: 200, 
          damping: 10 
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Check className="w-8 h-8" />
        </motion.div>
      </motion.div>
      
      <motion.h3 
        className="heading-md text-green-600 dark:text-green-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Opinion Submitted!
      </motion.h3>
      
      <motion.p 
        className="body-md text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Thank you for contributing to the future of content creation.
      </motion.p>
      
      <motion.div 
        className="mt-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SocialShare
          title={title}
          description={description}
          className="p-4 border rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors"
        />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-sm text-muted-foreground mt-2"
      >
        Sharing helps us gather more diverse opinions and improve content globally!
      </motion.p>
      
      <motion.div 
        className="w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default VoteSuccessMessage;
