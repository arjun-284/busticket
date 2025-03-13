import React from 'react'

const BusSection = () => {
  return (
    <div className="w-3/5 mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Bus</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
             Title
            </label>
            <input
              type="text"
              id="name" name='title'
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passenger" className="block text-gray-700 mb-2">
              Passenger Capacity
            </label>
            <input
              type="number"
              id="passenger" name='passenger'
              placeholder="Enter passenger capacity"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="block text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              id="from" name='from'
              placeholder="Enter Departure Location"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block text-gray-700 mb-2">
              To
            </label>
            <input
              type="text"
              id="to" name='to'
              placeholder="Enter Destination Location"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price" name='price'
              placeholder="Enter Ticket Price"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="busNumber" className="block text-gray-700 mb-2">
              Bus Number
            </label>
            <input
              type="text"
              id="busNumber" name='number'
              placeholder="Enter Bus Number"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 mb-2">
              Blue Book Renewal Date
            </label>
            <input
              type="date"
              id="date" name='renewDate'
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusSection