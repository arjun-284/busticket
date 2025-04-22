import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passenger: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data.locations || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch buses');
      }
      const data = await response.json();
      setBuses(data.buses || []);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setErrorMessage(error.message);
    }
  };

  // Function to handle navigation to booking page with bus details
  const handleBookNow = (bus, formData) => {
    navigate('/booking', { state: { bus, formData } });
  };

  return (
    <>
      <div className='flex justify-around gap-4 w-full h-96 p-4 border-b-1 rounded-lg mb-4'>
        <div>
          <h1 className='text-7xl mt-20 font-bold text-gray-800'>Bus Ticket</h1>
          <h3 className='text-1xl mt-10 font-bold text-gray-800'>Easy and affordable way to book tickets</h3>
        </div>
        <img
          className='object-fill'
          src='https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg'
          alt='Bus'
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
          <select
            name='from'
            value={formData.from || ''}
            onChange={handleChange}
            className='w-full p-2 border border-gray-200 rounded-lg'
          >
            <option value=''>Select Departure Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>

          <select
            name='to'
            value={formData.to || ''}
            onChange={handleChange}
            className='w-full p-2 border border-gray-200 rounded-lg'
          >
            <option value=''>Select Destination Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>

          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='w-full p-2 border border-gray-200 rounded-lg'
          />

          <input
            type='number'
            name='passenger'
            value={formData.passenger}
            onChange={handleChange}
            className='w-full p-2 border border-gray-200 rounded-lg'
            placeholder='Number of people travelling'
            min='1'
          />
        </div>
        <div className='flex justify-center mb-5 mt-2'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-5 py-2 text-[20px] rounded-lg hover:bg-blue-600 transition'
          >
            Search
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className='text-red-500 text-center mb-4'>{errorMessage}</p>
      )}

      {submitted && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
          {buses.length === 0 ? (
            <p className='text-lg text-gray-500'>No buses found...</p>
          ) : (
            buses.map((bus, index) => (
              <div
                key={index}
                className='max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200'
              >
                <img
                  className='w-full h-48 object-cover'
                  src='https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg'
                  alt={`Bus ${index}`}
                />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>{bus.title}</h2>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 font-semibold'>Passenger Seat: {bus.passenger}</span>
                    <span className='text-gray-600 font-semibold'>Price: Rs.{bus.price}</span>
                  </div>
                  <span className='text-gray-600 font-semibold'>
                    From: {bus.from?.name || bus.from || 'N/A'}
                  </span>
                  <br />
                  <span className='text-gray-600 font-semibold'>
                    To: {bus.to?.name || bus.to || 'N/A'}
                  </span>
                  <div className='mt-4'>
                    <button
                      onClick={() => handleBookNow(bus, formData)}
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Home;