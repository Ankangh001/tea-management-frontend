import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";
import LoginPage from "@/pages/LoginPage";

const LoginRedirect = () => {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    const role = user?.role || user?.roles?.[0]?.name;

    if (role === "user") {
      return <Navigate to="/bulletin" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
};

export default LoginRedirect;
