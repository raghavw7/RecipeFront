import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();

  // Render the element if authenticated, otherwise redirect to login
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
