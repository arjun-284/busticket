import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <h1>User Panel</h1>
      <Outlet /> {/* This will render nested admin routes */}
    </div>
  );
};

export default UserLayout;
