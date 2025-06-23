import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BulletinBoard from "@/pages/BulletinBoard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RegisterPage from "@/pages/RegisterPage";
import UserProfile from "@/pages/UserProfile";
import Layout from "@/components/Layout";
import { isLoggedIn, isAdmin } from "@/utils/auth";
import LoginRedirect from "@/components/LoginRedirect";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardWrapper from "@/components/DashboardWrapper";
import UserManagement from '@/pages/UserManagement';
import { CreatePostPage } from "@/pages/CreatePostPage";
import PostDetailPage from "@/pages/PostDetailPage";

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
          <Route path="/bulletin" element={<Layout><BulletinBoard /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/user/profile" element={<Layout><UserProfile /></Layout>} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardWrapper />
                </Layout>
              </ProtectedRoute>
            }
          />    
          <Route path="/admin/users" element={
            isAdmin() ? <Layout><UserManagement /></Layout> : <Navigate to="/login" />
          } />
          <Route path="/admin/create-post" element={<Layout><CreatePostPage /></Layout>} />  
          <Route path="/posts/:id" element={<Layout><PostDetailPage /></Layout>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
