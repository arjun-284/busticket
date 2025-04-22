import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from './layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const BusTable = () => {
  const { user } = useContext(AdminContext);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [editLocationId, setEditLocationId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditLocationId(null);
    setLocation("");
  }
  

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
        setAllLocations(data.locations);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/bus/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ location, id: editLocationId }),
      });
      if (!response.ok) {
        throw new Error('Failed to add location');
      }
      const data = await response.json();
      setLocation("");
      setEditLocationId(null);
      setAllLocations(data.locations);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };


  return (
    <div className="w-full mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        {user.role !== "staff" && (
          <div className="float-right">
            <button onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 mr-2 mb-2 rounded hover:bg-blue-600"
            >
              Add Location
            </button>
            <a
              href="/admin/add/bus"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Bus
            </a>
          </div>

        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
              <form onSubmit={handleSubmit}>
                {editLocationId && (
                  <input type='hidden' value={editLocationId} name='id' />
                )}
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  required
                />
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600">
                    {editLocationId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">All Locations</h3>
                <div className='max-h-64 overflow-y-auto'>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">S.N.</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {allLocations.length > 0 ? (
                        allLocations.map((loc, index) => (
                          <tr key={loc._id} className="border-b">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{loc.name}</td>
                            <td className="p-2">
                              <button
                                onClick={() => {
                                  setLocation(loc.name);
                                  setEditLocationId(loc._id);
                                  setIsModalOpen(true);

                                }}
                                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`http://localhost:5000/api/admin/bus/location/${loc._id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                      },
                                    });
                                    if (!response.ok) {
                                      throw new Error('Failed to delete location');
                                    }
                                    setAllLocations(allLocations.filter(location => location._id !== loc._id));
                                  } catch (error) {
                                    console.error('Error deleting location:', error);
                                  }
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="p-2 text-center">No locations available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}

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
              <th className="border border-gray-300 px-4 py-2">Departure Date</th>
              <th className="border border-gray-300 px-4 py-2">Bus Number</th>
              <th className="border border-gray-300 px-4 py-2">BlueBook Renew Date</th>
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
                  <td className="border border-gray-300 px-4 py-2">{bus.from?.name || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.to?.name || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{bus.departure_date}</td>
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
                <td colSpan={user.role !== "staff" ? 10 : 9} className="border border-gray-300 px-4 py-2">
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
