import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Extraction from "./pages/Extraction";
import TemplateDetail from "./pages/TemplateDetail";
import CrossValidation from "./pages/CrossValidation";
import FormFilling from "./pages/FormFilling";
import NotFound from "./pages/NotFound";
import DigitizeAILanding from "./pages/LandingPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DigitizeAILanding />} />
          <Route path="/extraction" element={<Layout><Extraction /></Layout>} />
          <Route path="/extraction/:templateId" element={<Layout><TemplateDetail /></Layout>} />
          <Route path="/cross-validation" element={<Layout><CrossValidation /></Layout>} />
          <Route path="/form-filling" element={<Layout><FormFilling /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
