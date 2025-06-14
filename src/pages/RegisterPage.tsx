import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister_old = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Step 1: Get CSRF cookie first
      await axios.get("/sanctum/csrf-cookie");

      // ✅ Step 2: Now make the actual registration request
      const res = await axios.post("/api/register", form);

      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created successfully");
      navigate("/post");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleRegister_old2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.baseURL = "http://localhost:8000";
      axios.defaults.withCredentials = true; // ✅ send cookies with requests
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      const token = decodeURIComponent(
        document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || ''
      );

      axios.defaults.headers.common['X-XSRF-TOKEN'] = token;


      // Step 1: Get CSRF cookie
      await axios.get("/sanctum/csrf-cookie");

      // Step 2: Then send register
      const res = await axios.post("/api/register", form);

      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created successfully");
      navigate("/post");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Send request directly without csrf
    const res = await axios.post("http://localhost:8000/api/register", form, {
      headers: {
        Accept: "application/json",
      },
    });

    localStorage.setItem("auth_token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    toast.success("Account created successfully");
    navigate("/post");
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
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <Input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} required />
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