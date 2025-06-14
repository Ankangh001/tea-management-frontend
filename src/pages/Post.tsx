
import { useState } from 'react';
import { BulletinBoard } from '@/components/BulletinBoard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import AuthStatusButton from "@/components/AuthStatusButton";

const Post = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Company Bulletin</h1>
            <p className="text-slate-600">Stay updated with our latest news & events</p>
          </div>
          {/* <AuthStatusButton /> */}
          <Button
            onClick={() => setIsAdmin(!isAdmin)}
            variant={isAdmin ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4" />
                Exit Admin
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Admin Login
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isAdmin ? <AdminDashboard /> : <BulletinBoard />}
      </main>
    </div>
  );
};

export default Post;
