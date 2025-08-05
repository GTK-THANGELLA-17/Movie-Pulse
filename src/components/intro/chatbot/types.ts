
export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

export interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
  icon: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface AudiencePulseChatbotProps {
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}
