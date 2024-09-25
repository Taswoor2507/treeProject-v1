import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { setCredentials } from "@/redux/authSlice/AuthSlice"; // Updated action
import { useDispatch } from "react-redux";
import axiosInstance from "../axiosCofig/axiosInstance"; // Use axios instance for consistent baseURL
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // onSubmit function to handle login
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/users/login",  // Adjust endpoint if needed
        data,
        { withCredentials: true } // Include cookies in the request
      );

      if (response.status === 200) {
        // Dispatch login action with user info
        dispatch(setCredentials(response.data)); // Assuming `response.data` contains the user data and token
        // localStorage.setItem("token", response.data.accessToken); // Store token in local storage
       console.log(response)
        // Display success message and navigate
        toast.success("Login successful!", {
          autoClose: 2000,
          onClose: () => navigate("/"), // Navigate to dashboard after toast
        });
      } else {
        setErrorMessage(response.data.message);
        toast.error(response.data.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed, please try again.";
      setErrorMessage(message);
      toast.error(message);
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

            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}

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
