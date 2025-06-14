import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthStatusButton = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("auth_token");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return isLoggedIn ? (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button variant="default" onClick={() => navigate("/login")}>
      Login
    </Button>
  );
};

export default AuthStatusButton;
