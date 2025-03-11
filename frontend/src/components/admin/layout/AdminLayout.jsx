import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Outlet /> {/* This will render nested admin routes */}
    </div>
  );
};

export default AdminLayout;
