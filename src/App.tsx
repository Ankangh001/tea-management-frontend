import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BulletinBoard from "@/pages/BulletinBoard";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "@/pages/RegisterPage";
import Layout from "@/components/Layout";
import { AdminDashboard } from '@/pages/AdminDashboard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/post" element={<Layout><BulletinBoard /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/admin-login" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
