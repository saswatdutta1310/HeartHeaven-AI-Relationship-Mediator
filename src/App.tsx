import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Layout";
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";
import AiCompanion from "./pages/AiCompanion";
import Translator from "./pages/Translator";
import Dashboard from "./pages/Dashboard";
import FlagDetector from "./pages/FlagDetector";
import FixOrLeave from "./pages/FixOrLeave";
import RepairPlan from "./pages/RepairPlan";
import SafeSpace from "./pages/SafeSpace";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/ai-companion" element={<AiCompanion />} />
                  <Route path="/translator" element={<Translator />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/flags" element={<FlagDetector />} />
                  <Route path="/detector" element={<Navigate to="/flags" replace />} />
                  <Route path="/green-flags" element={<Navigate to="/flags" replace />} />
                  <Route path="/safe-space" element={<SafeSpace />} />
                  <Route path="/fix-or-leave" element={<FixOrLeave />} />
                  <Route path="/repair-plan" element={<RepairPlan />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
