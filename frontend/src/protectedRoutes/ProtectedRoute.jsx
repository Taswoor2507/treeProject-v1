import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const {user} = useSelector((state) => state.authReducer);
console.log(user)
//   If no user is logged in, redirect to login
  if (!user.success === true) {
    return <Navigate to="/login" />;
  }


  // If the user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;
