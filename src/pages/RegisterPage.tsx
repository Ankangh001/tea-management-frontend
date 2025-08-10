import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import API from "@/lib/api"; // <-- our axios wrapper
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send request directly without csrf
      const res = await API.post("/api/register", form, {
        headers: {
          Accept: "application/json",
        },
      });

      // localStorage.setItem("auth_token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-blue-700">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input name="name" placeholder="Full Name" onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <div className="relative">
              <Input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                onChange={handleChange} 
                required 
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input 
                name="password_confirmation" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm Password" 
                onChange={handleChange} 
                required 
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;