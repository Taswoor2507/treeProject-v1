import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // Retrieve the user from localStorage
  const user = localStorage.getItem('user');
  
  // Parse the user data from JSON format, handle if it's null or undefined
  const parseUser = user ? JSON.parse(user) : null;

  // Log for debugging purposes
  console.log(parseUser);

  // Check if no user is logged in or if the role is not admin, redirect to login
  if (!parseUser || parseUser.data?.user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  // If the user is logged in and has admin role, render the protected component
  return children;
};

export default ProtectedRoute;
