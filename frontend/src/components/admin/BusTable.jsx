import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from './layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const BusTable = () => {
  const { user } = useContext(AdminContext);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/bus/show', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch buses');
        }
        const data = await response.json();
        setBuses(data.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  const handleEdit = (bus) => {
    navigate(`/admin/add/bus`, { state: { bus } });
  };

  const handleDelete = async (busId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bus/delete/${busId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete bus');
      }
      setBuses(buses.filter(bus => bus._id !== busId));
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  return (
    <div className="w-full mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        {user.role !== "staff" && (
          <div className="float-right">
            <a
              href="/admin/add/bus"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Bus
            </a>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">Bus Lists</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2"> Capacity</th>
              <th className="border border-gray-300 px-4 py-2">From</th>
              <th className="border border-gray-300 px-4 py-2">To</th>
              <th className="border border-gray-300 px-4 py-2">Price (Rs.)</th>
              <th className="border border-gray-300 px-4 py-2">Bus Number</th>
              <th className="border border-gray-300 px-4 py-2">Renew Date</th>
              {user.role !== "staff" && (
                <th className="border border-gray-300 px-4 py-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {buses.length > 0 ? (
              buses.map((bus, index) => (
                <tr key={bus._id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.passenger}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.from}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.to}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.bus_number}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(bus.renew_date).toISOString().split('T')[0]}</td>
                  {user.role !== "staff" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEdit(bus)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Edit
                      </button>
                      {user.role === "admin" &&
                        <button
                        onClick={() => handleDelete(bus._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      }
                      
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user.role !== "staff" ? 9 : 8} className="border border-gray-300 px-4 py-2">
                  No buses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusTable;
