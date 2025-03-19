import React, { createContext } from "react";
import { Outlet, Link } from "react-router-dom";


export const UserContext = createContext(null);

const UserLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul>
            <li className="mb-6">
              <Link to="/user/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </li>
            <li className="mb-6">
              <Link to="/user/order" className="hover:text-gray-300">Order</Link>
            </li>
            <li className="mb-6">
              <Link to="/user/setting" className="hover:text-gray-300">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <UserContext.Provider value={{ user }}>
        <Outlet />
      </UserContext.Provider>
    </div>


  );
};

export default UserLayout;
