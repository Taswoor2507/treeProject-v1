import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loadUser ,triggerLoadUser } from '@/redux/authSlice/AuthSlice'; // Adjust path

// Protected route component for regular users
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, shouldLoadUser, accessToken } = useSelector((state) => state.authReducer);

  // Trigger load user data if needed
  useEffect(() => {
    if (shouldLoadUser && accessToken) {
      dispatch(loadUser({ accessToken }));
    }
  }, [shouldLoadUser, accessToken, dispatch]);

  // Show loading state until the user data is fully loaded
  if (shouldLoadUser) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Protected route component for admin users
const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
 const state = useSelector(state=>state.authSlice)
 console.log(state)
  const { isAuthenticated, role, shouldLoadUser, accessToken } = useSelector((state) => state.authReducer);

  // Trigger load user data if needed
  useEffect(() => {
    if (shouldLoadUser && accessToken) {
      dispatch(loadUser({ accessToken }));
    }
  }, [shouldLoadUser, accessToken, dispatch]);

  // Show loading state until the user data is fully loaded
  if (shouldLoadUser) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  // Redirect to login if not authenticated or not admin
  return isAuthenticated && role === 'admin' ? children : <Navigate to="/auth/login" />;
};

export { ProtectedRoute, AdminRoute };
