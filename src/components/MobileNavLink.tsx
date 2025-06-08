
import React from "react";
import { motion } from "framer-motion";

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="block py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
    onClick={onClick}
  >
    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
      {children}
    </span>
  </motion.div>
);

export default MobileNavLink;
