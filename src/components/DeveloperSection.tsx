import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Github, Twitter, Linkedin, Globe, X, User, BookOpen, Mail, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EnhancedDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedDeveloperModal = ({ isOpen, onClose }: EnhancedDeveloperModalProps) => {
  const [activeTab, setActiveTab] = useState<"profile" | "contact" | "project">("profile");
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setAnimation(true);
      const timer = setTimeout(() => setAnimation(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="
          sm:max-w-[650px] max-w-[95vw] p-0 overflow-hidden
          bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black
          border-none rounded-xl
          sm:p-6
        "
        style={{ maxHeight: "90vh" }}
      >
        <div className="relative">
          {/* Animated background particles */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden rounded-xl -z-10">
            <AnimatePresence>
              {animation && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: `${Math.random() * 100 - 50}%`,
                        y: `${Math.random() * 100 - 50}%`,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        x: `${Math.random() * 100 - 50}%`,
                        y: `${Math.random() * 100 - 50}%`,
                        opacity: [0, 0.7, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random(),
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                      className="absolute w-4 h-4 rounded-full bg-primary/20"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative p-4 sm:p-6 space-y-6 overflow-auto max-h-[80vh]">
            <DialogHeader className="space-y-2 pb-4 border-b dark:border-gray-800">
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                  Developer
                </DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              {/* Developer avatar and social links */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl">
                    <img
                      src="/Profile Pic.JPG"
                      alt="Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"
                  />
                </motion.div>

                <div className="mt-4 flex space-x-3">
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    href="https://github.com/GTK-THANGELLA-17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    href="https://twitter.com/yourtwitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    href="https://linkedin.com/in/gthangella"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.a>
                </div>
              </div>

              {/* Developer details and tabs */}
              <div className="flex-grow space-y-4 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white truncate">
                    G.THANGELLA (G.T.K)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center text-sm sm:text-base">
                    Created with
                    <Heart className="h-4 w-4 text-red-500 mx-1 inline" />
                    For People
                  </p>
                </motion.div>

                <div>
                  <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
                    <button
                      className={`px-3 sm:px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "profile"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="w-4 h-4 inline mr-1" />
                      Profile
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "contact"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      }`}
                      onClick={() => setActiveTab("contact")}
                    >
                      <Mail className="w-4 h-4 inline mr-1" />
                      Contact
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "project"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      }`}
                      onClick={() => setActiveTab("project")}
                    >
                      <BookOpen className="w-4 h-4 inline mr-1" />
                      Project
                    </button>
                  </div>

                  <div className="py-4 max-h-[50vh] overflow-auto">
                    {activeTab === "profile" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                          Passionate developer with a creative approach to building applications. I explore unique ideas that defy convention, diving into the uncharted and unknown to bring innovative solutions to life.
                        </p>
                      </motion.div>
                    )}

                    {activeTab === "contact" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 text-sm sm:text-base"
                      >
                        <p className="text-gray-700 dark:text-gray-300">Get in touch with me:</p>
                        <a
                          href="mailto:imgtk17@gmail.com"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          Send Email
                        </a>
                      </motion.div>
                    )}

                    {activeTab === "project" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 text-sm sm:text-base"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-black dark:text-white">MoviePulse</h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            An analytics platform for the entertainment industry providing insights from global audience feedback.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-800">
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <Globe className="w-4 h-4 mr-1" />
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedDeveloperModal;
