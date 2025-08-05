
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Message, QuickQuestion, AudiencePulseChatbotProps } from "./chatbot/types";
import { categories, quickQuestions } from "./chatbot/constants";
import { getAdvancedResponse } from "./chatbot/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatHeader from "./chatbot/ChatHeader";
import ChatMessages from "./chatbot/ChatMessages";
import CategoryTabs from "./chatbot/CategoryTabs";
import QuickQuestions from "./chatbot/QuickQuestions";
import ChatInput from "./chatbot/ChatInput";
import ChatToggleButton from "./chatbot/ChatToggleButton";

const AudiencePulseChatbot = ({ isVisible, onClose, className = "" }: AudiencePulseChatbotProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "🎬 Hey there! I'm your AUDIENCE PULSE AI Assistant! Ready to discover how your voice shapes entertainment's future? 🚀 Pick a question below or ask me anything! ✨",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [activeCategory, setActiveCategory] = useState<string>("basics");

  const handleQuickQuestion = async (question: QuickQuestion) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: question.question,
      isBot: false,
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      text: "",
      isBot: true,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);

    // Enhanced loading time with variation
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: question.answer,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => prev.filter(msg => !msg.isLoading).concat([botMessage]));
  };

  const handleSendMessage = async (inputValue: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      text: "",
      isBot: true,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);

    // Enhanced AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = getAdvancedResponse(inputValue);
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => prev.filter(msg => !msg.isLoading).concat([botMessage]));
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Prevent chatbot interactions from affecting main page scroll
  const handleChatbotInteraction = (e: React.MouseEvent | React.TouchEvent | React.WheelEvent) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  // Dynamic sizing based on device
  const chatDimensions = isMobile 
    ? {
        maxHeight: 'min(500px, calc(100vh - 80px))',
        maxWidth: 'calc(100vw - 20px)',
        width: 'calc(100vw - 20px)',
        height: '500px'
      }
    : {
        maxHeight: 'min(600px, calc(100vh - 100px))',
        maxWidth: '380px',
        width: '380px',
        height: '600px'
      };

  return (
    <div 
      className={`fixed ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} z-50 ${className}`}
      onClick={handleChatbotInteraction}
      onWheel={handleChatbotInteraction}
      onTouchMove={handleChatbotInteraction}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: isMobile ? 0.85 : 0.7, 
              y: isMobile ? 20 : 30, 
              x: isMobile ? 0 : 10 
            }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ 
              opacity: 0, 
              scale: isMobile ? 0.85 : 0.7, 
              y: isMobile ? 20 : 30, 
              x: isMobile ? 0 : 10 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              mass: 0.8
            }}
            className={`mb-4 ${isMobile ? 'mx-auto' : ''}`}
            style={chatDimensions}
          >
            <Card className={`w-full h-full shadow-2xl border-2 border-primary/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden relative ${isMobile ? 'rounded-2xl' : 'rounded-3xl'}`}>
              {/* Enhanced card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
              
              <ChatHeader onClose={handleClose} />

              <CardContent className={`p-0 flex flex-col h-[calc(100%-60px)] relative ${isMobile ? 'text-sm' : ''}`}>
                <ChatMessages messages={messages} />
                <CategoryTabs 
                  categories={categories} 
                  activeCategory={activeCategory} 
                  onCategoryChange={setActiveCategory} 
                />
                <QuickQuestions 
                  questions={quickQuestions} 
                  activeCategory={activeCategory} 
                  onQuestionClick={handleQuickQuestion} 
                />
                <ChatInput onSendMessage={handleSendMessage} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatToggleButton isOpen={isOpen} onClick={toggleChat} />
    </div>
  );
};

export default AudiencePulseChatbot;
