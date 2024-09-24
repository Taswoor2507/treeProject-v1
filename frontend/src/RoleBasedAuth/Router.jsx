import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Protected route component for regular users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Protected route component for admin users
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.authReducer);
  const state = useSelector(state=> {console.log("mystate", state)})
  console.log(isAuthenticated, role, 'admin');

  return isAuthenticated && role === 'admin' ? children : <Navigate to="/auth/login" />;
};

export { ProtectedRoute, AdminRoute };
