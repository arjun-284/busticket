import React, { useState } from 'react'

const Booking = () => {

   // State for booking form
   const [bookingData, setbookingData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   //change value if data is changed
   const handleBookingChange = (e) => {
      setbookingData({ ...bookingData, [e.target.name]: e.target.value });
   };

   //submit the booking form
   const handleBookingSubmit = async (e) => {
      e.preventDefault();
      // Simple validation
      // if (registerData.password !== registerData.confirmPassword) {
      //   alert("Passwords do not match!");
      //   return;
      // }
      // try {
      //   const response = await fetch("http://localhost:5000/api/register", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(registerData),
      //   });
      //   const data = await response.json();
      //   if (response.ok) {
      //     alert("Registration successful!");
      //     // Optionally switch to the login form after a successful registration
      //     setLoginFormActive(true);
      //   } else {
      //     alert(data.message || "Registration failed!");
      //   }
      // } catch (error) {
      //   console.error(error);
      //   alert("Something went wrong!");
      // }
   };

   return (
      <>
         <div className='flex justify-around gap-4 w-full h-30 p-4 border-b-1 rounded-lg mb-4'>
            <div>
               <h1 className='text-7xl mt-3 font-bold text-gray-800'>Book Now</h1>
            </div>

            <img className='object-fill'
               src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg" alt="" />
         </div>
         <div className='grid grid-cols-2 gap-3 p-4 justify-items-center'>
            <form onSubmit={handleBookingSubmit} className='grid grid-cols-2 gap-4'>
               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                     type="text"
                     placeholder="Full Name"
                     name="name"
                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     onChange={handleBookingChange}
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                     type="email"
                     placeholder="example@mail.com"
                     name="email"
                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     onChange={handleBookingChange}
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">No of Passenger Travelling</label>
                  <input
                     type="number"
                     placeholder="1"
                     name="passengerNumber"
                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     onChange={handleBookingChange}
                     required
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Departure Date</label>
                  <input
                     type="date"
                     name="departureDate"
                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     onChange={handleBookingChange}
                     required
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Departure Time</label>
                  <input
                     type="time"
                     name="departureTime"
                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                     onChange={handleBookingChange}
                     required
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Payment</label>
                  <div className="flex items-center gap-4">
                     <label className="flex items-center">
                        <input type="radio" name="paymentMethod" value="online"
                           className="mr-2" onChange={handleBookingChange} required />
                        <img className='max-w-25'
                           src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp' alt='esewa' />
                     </label>
                     <label className="flex items-center">
                        <input type="radio" name="paymentMethod" value="offline" className="mr-2"
                           onChange={handleBookingChange} required />
                        By Cash
                     </label>
                  </div>
               </div>

               <div className="mb-4">
                  <span className="block text-gray-700 font-medium mb-2">
                     Total Cost : Rs. 5000
                  </span>
               </div>

               <div className="mb-4">
                  <button type="submit"
                     className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition">
                     Book Now</button>
               </div>

            </form>

            <div>
               <div
                  className="w-100 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
                  <img
                     className="w-full h-48 object-cover"
                     src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
                     alt='adsda'
                  />
                  <div className="p-4">
                     <h2 className="text-xl font-semibold text-gray-800">Title </h2>

                     <div className='flex justify-between'>
                        <span className="text-gray-600 font-semibold">Passenger Seat : 20</span>
                        <span className="text-gray-600 font-semibold">Price : Rs.2000</span>
                     </div>

                     <div className='flex justify-between mt-2'>
                        <span className="text-gray-600 font-semibold">From : Kathmandu</span>
                        <span className="text-gray-600 font-semibold">To : Rolpa</span>
                     </div>
                     <div className="mt-4">
                        <span className="text-gray-600 font-semibold">Bus Number : BA-1-Cha-2444</span>
                     </div>
                  </div>
               </div>

            </div>

         </div>

      </>
   )
}

export default Booking