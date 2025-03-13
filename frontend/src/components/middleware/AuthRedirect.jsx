import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthRedirect = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated) {
    const redirectPath = ["admin", "manager", "staff"].includes(user.role) ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthRedirect;
