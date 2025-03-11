import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated || !user) {
    return <Navigate to="/account" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="text-center text-red-500 mt-10 mb-10 text-xl font-bold">
      You are not allowed to access this page.
    </div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
