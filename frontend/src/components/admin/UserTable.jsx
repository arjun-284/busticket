import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from './layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const { user } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/user/show', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    navigate(`/admin/add/user`, { state: { user } });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="w-full mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        {user.role === "admin" && (
          <div className="float-right">
            <a
              href="/admin/add/user"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add User
            </a>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">User Lists</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2"> Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              {user.role === "admin" && (
                <th className="border border-gray-300 px-4 py-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((staff, index) => (
                <tr key={staff._id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{staff.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{staff.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{staff.role}</td>
                  {user.role === "admin" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user.role === "admin" ? 5 : 4} className="border border-gray-300 px-4 py-2">
                  No Users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
