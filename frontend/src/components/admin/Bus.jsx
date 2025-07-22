// src/components/admin/BusSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BusSection = () => {
  const { state } = useLocation();
  const bus = state?.bus;
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [locations, setLocations] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const vehicleTypes = ["Deluxe", "AC", "Non-AC", "HiAce", "Jeep", "Sumo", "Bolero", "Scorpio", "Micro", "Coaster"];

  const [formData, setFormData] = useState({
    title: bus?.title || "",
    owner: bus?.owner || "",
    passenger: bus?.passenger || "",
    type: bus?.type || "",
    from: bus?.from?._id || bus?.from || "",
    to: bus?.to?._id || bus?.to || "",
    price: bus?.price || "",
    image:bus?.image || "",
    bus_number: bus?.bus_number || "",
    amenities: {
      wifi: bus?.amenities?.wifi || false,
      charging: bus?.amenities?.charging || false,
      ac: bus?.amenities?.ac || false
    },
    departure_date: bus?.departure_date ? new Date(bus.departure_date).toISOString().split('T')[0] : "",
    renew_date: bus?.renew_date ? new Date(bus.renew_date).toISOString().split('T')[0] : "",
    insurance_renew_date: bus?.insurance_renew_date ? new Date(bus.insurance_renew_date).toISOString().split('T')[0] : ""
  });

  // ✅ Fix 1: String interpolation bug in Authorization header
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/locations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setLocations(Array.isArray(data.locations) ? data.locations : []);
      } catch (err) {
        console.error("Location fetch failed", err);
        setLocations([]);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setImageFile(files[0]);
    } else if (name.startsWith("amenities.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [key]: checked }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (data) => {
    let newErrors = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.owner) newErrors.owner = "Owner name is required";
    if (!data.passenger) newErrors.passenger = "Passenger capacity is required";
    if (!data.type) newErrors.type = "Vehicle type is required";
    if (!data.from) newErrors.from = "Departure location is required";
    if (!data.to) newErrors.to = "Destination location is required";
    if (!data.price) newErrors.price = "Ticket price is required";
    if (!data.bus_number) newErrors.bus_number = "Bus number is required";
    if (!data.departure_date) newErrors.departure_date = "Departure date is required";
    if (!data.renew_date) newErrors.renew_date = "Bluebook renewal date is required";
    if (!data.insurance_renew_date) newErrors.insurance_renew_date = "Insurance renewal date is required";
    if(!data.image && !bus) newErrors.image = "Bus image is required"; // Only require image for new buses
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData, "Image file:", imageFile);
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const isUpdate = !!bus;
    // ✅ Fix 2: Interpolation error in endpoint URL
    const endpoint = isUpdate
      ? `http://localhost:5000/api/admin/bus/update/${bus._id}`
      : 'http://localhost:5000/api/admin/bus/create';
    const method = isUpdate ? 'PUT' : 'POST';

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === 'amenities') {
        formDataToSend.append('amenities', JSON.stringify(val));
      } else {
        formDataToSend.append(key, val);
      }
    });
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed');
      alert(isUpdate ? 'Bus updated successfully!' : 'Bus added successfully!');
      if (!isUpdate) {
        formRef.current.reset();
        setFormData({
          title: "", owner: "", passenger: "", type: "", from: "", to: "",
          price: "", bus_number: "",
          amenities: { wifi: false, charging: false, ac: false },
          departure_date: "", renew_date: "", insurance_renew_date: ""
        });
        setImageFile(null);
      }
      setErrors({});
    } catch (err) {
      console.error("Submission failed", err);
      alert('Submission failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-8">{bus ? 'Edit Bus' : 'Add New Bus'} / नयाँ बस थप्नुहोस्</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" encType="multipart/form-data">
          <InputField label="Bus Title / बसको नाम" name="title" value={formData.title} onChange={handleChange} error={errors.title} placeholder="Eg: Mountain Express / जस्तै: माउण्ट" />
          <InputField label="Owner Name / मालिकको नाम" name="owner" value={formData.owner} onChange={handleChange} error={errors.owner} placeholder="Eg: Ram Shrestha / जस्तै: राम श्रेष्ठ" />
          <InputField label="Passenger Capacity / यात्रु संख्या" name="passenger" type="number" value={formData.passenger} onChange={handleChange} error={errors.passenger} placeholder="Eg: 40 / जस्तै: ४०" />
          <SelectField label="Vehicle Type / गाडीको प्रकार" name="type" value={formData.type} onChange={handleChange} options={vehicleTypes} error={errors.type} />
          <SelectField label="From / बाट" name="from" value={formData.from} onChange={handleChange} options={locations.map(loc => ({ value: loc._id, label: loc.name }))} error={errors.from} />
          <SelectField label="To / सम्म" name="to" value={formData.to} onChange={handleChange} options={locations.map(loc => ({ value: loc._id, label: loc.name }))} error={errors.to} />
          <InputField label="Ticket Price (Rs.) / टिकट मूल्य" name="price" type="number" value={formData.price} onChange={handleChange} error={errors.price} />
          <InputField label="Bus Number / गाडी नम्बर" name="bus_number" value={formData.bus_number} onChange={handleChange} error={errors.bus_number} />
          <div>
            <label className="block font-semibold mb-1">Bus Image Upload / बसको फोटो</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Amenities / सुविधा</label>
            <div className="flex gap-4 flex-wrap">
              <label><input type="checkbox" name="amenities.wifi" checked={formData.amenities.wifi} onChange={handleChange} /> WiFi</label>
              <label><input type="checkbox" name="amenities.ac" checked={formData.amenities.ac} onChange={handleChange} /> AC</label>
              <label><input type="checkbox" name="amenities.charging" checked={formData.amenities.charging} onChange={handleChange} /> Charging</label>
            </div>
          </div>
          <InputField label="Departure Date / प्रस्थान मिति" name="departure_date" type="date" value={formData.departure_date} onChange={handleChange} error={errors.departure_date} />
          <InputField label="Bluebook Renew Date / ब्लूबुक नवीकरण मिति" name="renew_date" type="date" value={formData.renew_date} onChange={handleChange} error={errors.renew_date} />
          <InputField label="Insurance Renew Date / बीमा नवीकरण मिति" name="insurance_renew_date" type="date" value={formData.insurance_renew_date} onChange={handleChange} error={errors.insurance_renew_date} />
          <div className="md:col-span-2 lg:col-span-3">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              {bus ? 'Update Bus Info / अपडेट गर्नुहोस्' : 'Add Bus / थप्नुहोस्'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Subcomponents
const InputField = ({ label, name, value, onChange, type = "text", error, placeholder }) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ''}
      className="w-full p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      autoComplete="off"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-blue-300 rounded-md shadow-sm bg-white"
    >
      <option value="">-- Select / छान्नुहोस् --</option>
      {options.map((opt, i) => (
        typeof opt === "string"
          ? <option key={i} value={opt}>{opt}</option>
          : <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default BusSection;
