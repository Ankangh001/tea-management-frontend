// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = getCurrentUser();

  if (!isLoggedIn() || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;