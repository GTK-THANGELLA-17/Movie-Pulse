
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { VotingPeriodProvider } from "@/contexts/VotingPeriodContext";
import { VotedProvider } from "@/contexts/VotedContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import IntroPage from "./pages/IntroPage";
import VotePage from "./pages/VotePage";
import BenefitsPage from "./pages/BenefitsPage";
import '@/styles/animations.css';

// ScrollToTop component to handle scrolling on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    // Only scroll to top on PUSH navigation (not on browser back/forward)
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
  
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="Audience-Pulse-theme">
        <VotingPeriodProvider>
          <VotedProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<IntroPage />} />
                  <Route path="/home" element={<Index />} />
                  <Route path="/benefits" element={<BenefitsPage />} />
                  <Route path="/stats" element={<StatsPage />} />
                  <Route path="/vote" element={<VotePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </VotedProvider>
        </VotingPeriodProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
