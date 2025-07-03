// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin, getCurrentUser } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    const user = getCurrentUser();
    const admin = isAdmin();

    if (loggedIn && user && (!adminOnly || admin)) {
      setAuthorized(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-slate-500">Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;