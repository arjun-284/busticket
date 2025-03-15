import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BusSection = () => {
  const { state } = useLocation();
  const bus = state?.bus; // Retrieve bus data from navigation state

  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  // Initialize form state with bus data if provided
  const [formData, setFormData] = useState({
    title: bus ? bus.title : "",
    passenger: bus ? bus.passenger : "",
    from: bus ? bus.from : "",
    to: bus ? bus.to : "",
    price: bus ? bus.price : "",
    bus_number: bus ? bus.bus_number : "",
    renew_date: bus ? bus.renew_date : ""
  });

  // Update form data if bus changes (or if the component mounts with bus data)
  useEffect(() => {
    if (bus) {
      setFormData({
        title: bus.title || "",
        passenger: bus.passenger || "",
        from: bus.from || "",
        to: bus.to || "",
        price: bus.price || "",
        bus_number: bus.bus_number || "",
        // If you need to display the date in yyyy-mm-dd format
        renew_date: bus.renew_date
          ? new Date(bus.renew_date).toISOString().split('T')[0]
          : ""
      });
    }
  }, [bus]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = (data) => {
    let newErrors = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.passenger) newErrors.passenger = "Passenger capacity is required";
    if (!data.from) newErrors.from = "Departure location is required";
    if (!data.to) newErrors.to = "Destination location is required";
    if (!data.price) newErrors.price = "Ticket price is required";
    if (!data.bus_number) newErrors.bus_number = "Bus number is required";
    if (!data.renew_date) newErrors.renew_date = "Renewal date is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Determine if we're updating or creating a bus
    const isUpdate = !!bus;
    const endpoint = isUpdate
      ? `http://localhost:5000/api/admin/bus/update/${bus._id}`
      : 'http://localhost:5000/api/admin/bus/create';
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      alert(isUpdate ? 'Bus updated successfully!' : 'Bus added successfully!');

      // If it's a create operation, clear the form
      if (!isUpdate) {
        setFormData({
          title: "",
          passenger: "",
          from: "",
          to: "",
          price: "",
          bus_number: "",
          renew_date: ""
        });
        formRef.current.reset();
      }
      setErrors({});
    } catch (error) {
      console.error(error);
      alert('Failed to submit the form');
    }
  };

  return (
    <div className="w-3/5 mt-2 ml-auto mr-auto">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{bus ? 'Edit Bus' : 'Add Bus'}</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Passenger Capacity */}
          <div className="mb-4">
            <label htmlFor="passenger" className="block text-gray-700 mb-2">Passenger Capacity</label>
            <input
              type="number"
              id="passenger"
              name="passenger"
              placeholder="Enter passenger capacity"
              className="w-full px-3 py-2 border rounded"
              value={formData.passenger}
              onChange={handleChange}
            />
            {errors.passenger && <p className="text-red-500 text-sm">{errors.passenger}</p>}
          </div>

          {/* From */}
          <div className="mb-4">
            <label htmlFor="from" className="block text-gray-700 mb-2">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Enter Departure Location"
              className="w-full px-3 py-2 border rounded"
              value={formData.from}
              onChange={handleChange}
            />
            {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
          </div>

          {/* To */}
          <div className="mb-4">
            <label htmlFor="to" className="block text-gray-700 mb-2">To</label>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Enter Destination Location"
              className="w-full px-3 py-2 border rounded"
              value={formData.to}
              onChange={handleChange}
            />
            {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Ticket Price"
              className="w-full px-3 py-2 border rounded"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          {/* Bus Number */}
          <div className="mb-4">
            <label htmlFor="bus_number" className="block text-gray-700 mb-2">Bus Number</label>
            <input
              type="text"
              id="bus_number"
              name="bus_number"
              placeholder="Enter Bus Number"
              className="w-full px-3 py-2 border rounded"
              value={formData.bus_number}
              onChange={handleChange}
            />
            {errors.bus_number && <p className="text-red-500 text-sm">{errors.bus_number}</p>}
          </div>

          {/* Renewal Date */}
          <div className="mb-4">
            <label htmlFor="renew_date" className="block text-gray-700 mb-2">Blue Book Renewal Date</label>
            <input
              type="date"
              id="renew_date"
              name="renew_date"
              className="w-full px-3 py-2 border rounded"
              value={formData.renew_date}
              onChange={handleChange}
            />
            {errors.renew_date && <p className="text-red-500 text-sm">{errors.renew_date}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {bus ? 'Update Bus' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusSection;
