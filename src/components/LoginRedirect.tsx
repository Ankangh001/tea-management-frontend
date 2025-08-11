import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";
import LoginPage from "@/pages/LoginPage";

const LoginRedirect = () => {
  if (isLoggedIn()) {
    return <Navigate to="/bulletin" replace />;
  }

  return <LoginPage />;
};

export default LoginRedirect;
