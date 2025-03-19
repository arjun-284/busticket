import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from './layout/UserLayout';

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchDashboardInfo();
  },[]);

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome {user.name}</h1>
      {!dashboardData ? (
        <p className="text-lg text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Total Booking</h2>
            <p className="text-gray-600">{dashboardData.totalUser || 0}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Spend Money</h2>
            <p className="text-gray-600">{dashboardData.activeSessions || 0}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserDashboard