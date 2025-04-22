import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from './layout/AdminLayout';

const AllBooking = () => {
   const { user } = useContext(AdminContext);
   const [booking, setBooking] = useState([]);

   useEffect(() => {
      const fetchBooking = async () => {
         try {
            const response = await fetch('http://localhost:5000/api/admin/booking', {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            });
            if (!response.ok) {
               throw new Error('Failed to fetch buses');
            }
            const data = await response.json();
            setBooking(data.data);
         } catch (error) {
            console.error('Error fetching buses:', error);
         }
      };

      fetchBooking();
   }, []);

   return (
      <div className="w-full mt-2 ml-auto mr-auto">
         <div className="bg-white p-6 rounded shadow-md">
            {/* Table */}

            <h2 className="text-xl font-bold mb-4">Booking Lists</h2>
            <table className="w-full border-collapse border border-gray-300">
               <thead>
                  <tr className="bg-gray-200">
                     <th className="border border-gray-300 px-4 py-2">S.N.</th>
                     <th className="border border-gray-300 px-4 py-2">Name</th>
                     <th className="border border-gray-300 px-4 py-2">Email</th>
                     <th className="border border-gray-300 px-4 py-2">From</th>
                     <th className="border border-gray-300 px-4 py-2">To</th>
                     <th className="border border-gray-300 px-4 py-2">Passenger</th>
                     <th className="border border-gray-300 px-4 py-2">Price (Rs.)</th>
                     <th className="border border-gray-300 px-4 py-2">Departure Date</th>
                     <th className="border border-gray-300 px-4 py-2">Bus Number</th>
                     <th className="border border-gray-300 px-4 py-2">Payment Method</th>
                     <th className="border border-gray-300 px-4 py-2">Guest</th>

                  </tr>
               </thead>
               <tbody>
                  {booking.length > 0 ? (
                     booking.map((booked, index) => (
                        <tr key={booked._id}>
                           <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.fullName}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.email}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.from}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.to}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.passenger}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.totalPrice}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.date}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.bus_number}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.paymentMethod}</td>
                           <td className="border border-gray-300 px-4 py-2">{booked.guest === 1 ? "Yes" : "No"}</td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="11" className="border border-gray-300 px-4 py-2">
                           No booking found.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllBooking;
