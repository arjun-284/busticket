import React, { useState, useEffect } from 'react'

const Home = () => {

  const [buses, setBuses] = useState([]);

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

  return (
    <>
      <div className='flex justify-around gap-4 w-full h-96 p-4 border-b-1 rounded-lg mb-4'>
        <div>
          <h1 className='text-7xl mt-20 font-bold text-gray-800'>Bus Ticket</h1>
          <h3 className='text-1xl mt-10 font-bold text-gray-800'>Easy and affortable way to book tickets</h3>
        </div>

        <img className='object-fill'
          src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg" alt="" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {buses.map((bus, index) => (
          <div key={index}
            className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
            <img
              className="w-full h-48 object-cover"
              src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
              alt={`Card ${index}`}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{bus.title}</h2>

              <div className='flex justify-between'>
                <span className="text-gray-600 font-semibold">Passenger Seat : {bus.passanger}</span>
                <span className="text-gray-600 font-semibold">Price : Rs.{bus.price}</span>
              </div>

              <span className="text-gray-600 font-semibold">From : {bus.from}</span>
              <br />
              <span className="text-gray-600 font-semibold">To : {bus.to}</span>
              <div className="mt-4">
                <a href='/booking' className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>

  )
}

export default Home