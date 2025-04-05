
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageNavigation from "@/components/PageNavigation";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
  showScrollToTop?: boolean;
  className?: string;
}

const PageLayout = ({ children, showScrollToTop = true, className = "" }: PageLayoutProps) => {
  const location = useLocation();
  const isIntroPage = location.pathname === "/";
  const isVotePage = location.pathname === "/vote";
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4f3] dark:bg-black overflow-x-hidden">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex-grow ${isIntroPage ? 'pt-10' : isVotePage ? 'pt-14 md:pt-12' : 'pt-20'} ${className}`}
      >
        {children}
      </motion.main>
      {showScrollToTop && <PageNavigation />}
      <Footer />
    </div>
  );
};

export default PageLayout;
