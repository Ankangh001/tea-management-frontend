import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/lib/api"; // <-- our axios wrapper
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { isLoggedIn, getCurrentUser  } from "@/utils/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First, get CSRF cookie
      await API.get("/sanctum/csrf-cookie");

      // Then, login
      const response = await API.post("/api/login", {
        email,
        password,
      });

      // Save auth info
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Logged in successfully");
      navigate("/dashboard");
      
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Invalid credentials or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {/* Logo Section */}
          <img 
            src="/lovable-uploads/c4069bf7-facd-489e-9685-a7accf3eca49.png" 
            alt="eSamudaay Logo" 
            className="h-10 md:h-10 mx-auto mb-8 animate-scale-in w-50"
          />
          <CardTitle className="text-center text-2xl font-bold text-grayue-700 hover:text-orange-500">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="pt-4 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
