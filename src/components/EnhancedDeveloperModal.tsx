
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDeveloperModal from "./MobileDeveloperModal";
import { DeveloperModal } from "./DeveloperModal";

interface EnhancedDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedDeveloperModal = ({ isOpen, onClose }: EnhancedDeveloperModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDeveloperModal isOpen={isOpen} onClose={onClose} />;
  }

  return <DeveloperModal open={isOpen} onOpenChange={onClose} />;
};

export default EnhancedDeveloperModal;
