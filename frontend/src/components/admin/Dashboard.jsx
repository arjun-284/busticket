import React,{useContext} from 'react'
import { AdminContext } from './layout/AdminLayout';

const AdminDashboard = () => {
  const { user } = useContext(AdminContext);

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-600">1,200</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
          <p className="text-gray-600">300</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">New Signups</h2>
          <p className="text-gray-600">50</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Server Status</h2>
          <p className="text-gray-600">Online</p>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard