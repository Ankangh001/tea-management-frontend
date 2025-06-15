
import { useState } from 'react';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import AuthStatusButton from "@/components/AuthStatusButton";

const Post = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-10">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
      </main>
    </div>
  );
};

export default Post;
