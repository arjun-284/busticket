import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bus = state?.bus || {};
  const formData = state?.formData || {};
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user')) || null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  // State for booking form
  const [bookingData, setBookingData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    passenger: formData.passenger || '',
    totalPrice: (parseFloat(bus.price || 0) * parseInt(formData.passenger || 1) * 1.13).toFixed(2),
    paymentMethod: '',
    busId: bus._id || '',
    busTitle: bus.title || '',
    date: formData.date || '',
    from: bus.from.name || '',
    to: bus.to.name || '',
    bus_number: bus.bus_number || '',
    totalSeat: bus.passenger || '',
    guest: user ? 0 : 1,
    userId: user?.id || null,
  });

  // Update totalPrice when passenger changes
  useEffect(() => {
    const newTotal = (parseFloat(bus.price || 0) * parseInt(bookingData.passenger || 1) * 1.13).toFixed(2);
    setBookingData(prev => ({ ...prev, totalPrice: newTotal }));
  }, [bookingData.passenger, bus.price]);

  // Change value if data is changed
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.fullName) newErrors.fullName = 'Full Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.passenger || parseInt(data.passenger) <= 0) newErrors.passenger = 'Number of passengers must be greater than 0';
    if (parseInt(data.passenger) > parseInt(bus.passenger)) newErrors.passenger = 'Number of passengers must not be greater than available seats';
    if (!data.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!data.date) newErrors.date = 'Departure date is required';
    return newErrors;
  };

  const validateOnlineForm = (data) => {
    const newErrors = {};
    if (!data.fullName) newErrors.fullName = 'Full Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.passenger || parseInt(data.passenger) <= 0) newErrors.passenger = 'Number of passengers must be greater than 0';
    if (parseInt(data.passenger) > parseInt(bus.passenger)) newErrors.passenger = 'Number of passengers must not be greater than available seats';
    if (!data.date) newErrors.date = 'Departure date is required';
    return newErrors;
  };

  // Submit the booking form
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(bookingData);
    if (Object.keys(newErrors).length > 0) {
      alert(Object.values(newErrors).join('\n'));
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Booking successful!');
        setBookingData("");
        navigate(`/invoice`, { state: { invoiceData: data } });
      } else {
        alert(data.message || 'Booking failed!');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Something went wrong!');
    }
  };


  //Esewa data
  const product_code = "EPAYTEST";
  const transaction_uuid = uuidv4();
  // const signed_field_names = `total_amount=${bookingData.totalPrice},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const signed_field_names = "total_amount,transaction_uuid,product_code";




  const handleEsewaPayment = async () => {
    // Define the form data object
    const newErrors = validateOnlineForm(bookingData);
    if (Object.keys(newErrors).length > 0) {
      alert(Object.values(newErrors).join('\n'));
      return;
    }
    const getSignature = {
      total_amount: bookingData.totalPrice,
      transaction_uuid: transaction_uuid,
      product_code: product_code,
      signed_field_names: signed_field_names
    }
    const payload = { ...bookingData, ...getSignature };
    try {
      const response = await fetch('http://localhost:5000/api/payment/initiate-esewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        submitEsewaForm(data.signature);
      } else {
        alert(data.message || 'Booking failed!');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Something went wrong!');
    }
  };


  const submitEsewaForm = (signature) => {

    const formData = {
      amount: (parseFloat(bus.price || 0) * parseInt(bookingData.passenger || 1)).toFixed(2), // e.g., 100
      tax_amount: (parseFloat(bus.price || 0) * parseInt(bookingData.passenger || 1) * 0.13).toFixed(2), // e.g., 13
      total_amount: bookingData.totalPrice,
      transaction_uuid: transaction_uuid,
      product_code: product_code,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: "http://localhost:5000/api/payment/esewa-success",
      failure_url: "http://localhost:5000/api/payment/esewa-failure",
      signed_field_names: signed_field_names,
      signature: signature,
    };


    // Create a form element
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    // Append the form data as hidden input fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

  }
  return (
    <>
      <div className='flex justify-around gap-4 w-full h-30 p-4 border-b-1 rounded-lg mb-4'>
        <div>
          <h1 className='text-7xl mt-3 font-bold text-gray-800'>Book Now</h1>
        </div>
        <img
          className='object-fill'
          src='https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg'
          alt='Bus'
        />
      </div>
      <div className='grid grid-cols-2 gap-3 p-4 justify-items-center'>
        <form onSubmit={handleBookingSubmit} className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>Full Name</label>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={bookingData.fullName}
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              onChange={handleBookingChange}
              readOnly={!!user?.name} // Read-only if user.name exists
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>Email</label>
            <input
              type='email'
              placeholder='example@mail.com'
              name='email'
              value={bookingData.email}
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              onChange={handleBookingChange}
              readOnly={!!user?.email} // Read-only if user.email exists
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>No of Passengers Travelling</label>
            <input
              type='number'
              placeholder='1'
              name='passenger'
              value={bookingData.passenger}
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              onChange={handleBookingChange}
              min='1'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>Departure Date</label>
            <input
              type='date'
              name='date'
              value={bookingData.date}
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              onChange={handleBookingChange}
              readOnly={!!formData.date} // Read-only if formData.date exists
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>Payment</label>
            <div className='flex items-center gap-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='esewa'
                  className='mr-2'
                  onChange={(e) => {
                    handleBookingChange(e);
                    setTimeout(() => {
                      if (e.target.checked && e.target.value === "esewa") {
                        handleEsewaPayment();
                      }
                    }, 100);
                  }}
                  required
                />
                <img
                  className='max-w-25'
                  src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp'
                  alt='esewa'
                />
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='cash'
                  className='mr-2'
                  onChange={handleBookingChange}
                  required
                />
                By Cash
              </label>
            </div>
          </div>
          <div className='mb-4'>
            <span className='block text-gray-700 font-medium mb-2'>
              Price: Rs. {(parseFloat(bus.price || 0) * parseInt(bookingData.passenger || 1)).toFixed(2)}
            </span>
            <span className='block text-gray-700 font-medium mb-2'>VAT: 13%</span>
            <span className='block text-gray-700 font-medium mb-2'>
              Total: Rs. {bookingData.totalPrice}
            </span>
          </div>
          <div className='mb-4'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition'
            >
              Book Now
            </button>
          </div>
        </form>

        <div>
          <div className='w-100 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200'>
            <img
              className='w-full h-48 object-cover'
              src='https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg'
              alt='Bus'
            />
            <div className='p-4'>
              <h2 className='text-xl font-semibold text-gray-800'>{bus.title}</h2>
              <div className='flex justify-between'>
                <span className='text-gray-600 font-semibold'>Passenger Seat: {bus.passenger}</span>
                <span className='text-gray-600 font-semibold'>Price: Rs.{bus.price}</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span className='text-gray-600 font-semibold'>From: {bus.from?.name || 'N/A'}</span>
                <span className='text-gray-600 font-semibold'>To: {bus.to?.name || 'N/A'}</span>
              </div>
              <div className='mt-4'>
                <span className='text-gray-600 font-semibold'>Bus Number: {bus.bus_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;