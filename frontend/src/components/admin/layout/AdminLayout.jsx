import React, { createContext } from "react";
import { Outlet, Link } from "react-router-dom";


export const AdminContext = createContext(null);

const AdminLayout = () => {
  const allowedRoles = ['admin', 'manager'];
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul>
            <li className="mb-6">
              <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </li>
            <li className="mb-6">
              <Link to="/admin/view/buses" className="hover:text-gray-300">Bus</Link>
            </li>
            {allowedRoles.includes(user.role) && (
              <>
                <li className="mb-6">
                    <Link to="/admin/view/users" className="hover:text-gray-300">Users</Link>
                  </li>

                <li className="mb-6">
                  <Link to="/admin/account" className="hover:text-gray-300">Account</Link>
                </li>
              </>
            )}
            <li className="mb-6">
              <Link to="/admin/setting" className="hover:text-gray-300">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <AdminContext.Provider value={{ user }}>
        <Outlet />
      </AdminContext.Provider>
    </div>


  );
};

export default AdminLayout;
