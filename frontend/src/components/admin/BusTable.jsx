import React, { useContext } from 'react';
import { AdminContext } from './layout/AdminLayout';

const BusTable = () => {
  const { user } = useContext(AdminContext)
  return (
    <div className="w-3/5 mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        {user.role !== "staff" && <div className='float-right'>
          <a href='/admin/add/bus' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Bus</a>
        </div>}
        <h2 className="text-xl font-bold mb-4">Bus Lists</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Bus Title</th>
              <th className="border border-gray-300 px-4 py-2">Passanger Capacity</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              {user.role !=="staff" && <th className="border border-gray-300 px-4 py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">John Doe</td>
              <td className="border border-gray-300 px-4 py-2">john@example.com</td>
              <td className="border border-gray-300 px-4 py-2">Admin</td>
              {user.role !== "staff" && <td className="border border-gray-300 px-4 py-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusTable;
