import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { login } from "@/redux/authSlice/AuthSlice"; // Import the login action
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook to dispatch actions

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4040/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies in the request
      });

      const result = await response.json();

      if (response.ok) {
        // Dispatch login action with user info
        dispatch(login(result)); // Assuming `result.user` contains the user data

        toast.success(result.message, {
          autoClose: 2000,
          onClose: () => navigate("/"), // Navigate after toast closes
        });
      } else {
        toast.error(result.message, {
          autoClose: 1000,
          onClose: () => navigate("/login"), // Navigate after toast closes
        });
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a7c59]">
      <Card className="w-full max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Sign In to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          Don't have an account? <Link to={"/auth/register"}>Register Now</Link>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
