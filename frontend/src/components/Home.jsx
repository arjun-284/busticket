import React from 'react'

const Home = () => {

  const cards = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <div className='flex justify-around gap-4 w-full h-96 p-4 border-b-1 rounded-lg mb-4'>
        <div>
          <h1 className='text-7xl mt-20 font-bold text-gray-800'>Bus Ticket</h1>
          <h3 className='text-1xl mt-10 font-bold text-gray-800 '>Easy and affortable way to book tickets</h3>
        </div>

        <img className='object-fill'
          src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg" alt="" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {cards.map((item) => (
          <div key={item}
            className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
            <img
              className="w-full h-48 object-cover"
              src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
              alt={`Card ${item}`}
            />
            <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Title {item}</h2>

              <div className='flex justify-between'>
                <span className="text-gray-600 font-semibold">Passenger Seat : 20</span>
                <span className="text-gray-600 font-semibold">Price : Rs.2000</span>
              </div>

              <div className='flex justify-between mt-2'>
                <span className="text-gray-600 font-semibold">From : Kathmandu</span>
                <span className="text-gray-600 font-semibold">To : Rolpa</span>
              </div>
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