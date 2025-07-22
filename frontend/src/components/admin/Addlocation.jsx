// AddLocation.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming you might use this for navigation if needed

const AddLocation = () => {
  const [locationName, setLocationName] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(""); // For inline error under the input field
  const [submissionMessage, setSubmissionMessage] = useState({ type: '', text: '' }); // For global messages

  // Fetch locations on component mount
  const fetchLocations = async () => {
    try {
      setSubmissionMessage({ type: '', text: '' }); // Clear any previous global messages
      const response = await fetch('http://localhost:5000/api/admin/locations', { // Ensure this is a GET route in backend
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Crucially, check if response is OK (status 200) for GET requests
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch locations (non-OK status):", errorData);
        throw new Error(errorData.message || 'Failed to load existing locations.');
      }
      
      const data = await response.json();
      console.log("Fetched locations data:", data); // Debug: check data format
      // Ensure data.locations is an array as expected from backend
      setLocations(Array.isArray(data.locations) ? data.locations : []);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setSubmissionMessage({ type: 'error', text: err.message || "Failed to load locations." });
      setLocations([]); // Clear locations on error
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Clear submission messages after a few seconds
  useEffect(() => {
    if (submissionMessage.text) {
      const timer = setTimeout(() => {
        setSubmissionMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionMessage]);


  const handleAddLocation = async (e) => {
    e.preventDefault();
    setError(""); // Clear inline error
    setSubmissionMessage({ type: '', text: '' }); // Clear global message

    if (!locationName.trim()) {
      setError("Location name cannot be empty.");
      setSubmissionMessage({ type: 'error', text: 'Please enter a location name.' });
      return; // Stop submission if validation fails on frontend
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/location', { // POST endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ location: locationName.trim() }), // Send trimmed location name
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error adding location (non-OK status):", errorData);
        // Throw error with message from backend, or a default
        throw new Error(errorData.message || "Failed to add location. Server responded with an error.");
      }

      const data = await response.json();
      console.log("Response after adding location:", data); // Debug: Check response from server
      // Backend's upsertLocation returns { locations: [...] }
      setLocations(Array.isArray(data.locations) ? data.locations : []);
      setSubmissionMessage({ type: 'success', text: "Location added successfully!" });
      setLocationName(""); // Clear input field
    } catch (err) {
      console.error("Error adding location:", err);
      setSubmissionMessage({ type: 'error', text: err.message || "Invalid data format received from server. Please try again." });
    }
  };

  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return;
    }
    try {
      setSubmissionMessage({ type: '', text: '' });
      const response = await fetch(`http://localhost:5000/api/admin/location/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error deleting location (non-OK status):", errorData);
        throw new Error(errorData.message || "Failed to delete location.");
      }

      // If deletion is successful, refetch the list
      await fetchLocations(); 
      setSubmissionMessage({ type: 'success', text: "Location deleted successfully!" });
    } catch (err) {
      console.error("Error deleting location:", err);
      setSubmissionMessage({ type: 'error', text: err.message || "Failed to delete location. Please try again." });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Location</h2>

      {/* Global submission message display */}
      {submissionMessage.text && (
        <div className={`mb-4 p-3 rounded-md text-center font-medium ${submissionMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submissionMessage.text}
        </div>
      )}

      <form onSubmit={handleAddLocation} className="mb-4">
        <input
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => {
            setLocationName(e.target.value);
            setError(""); // Clear error as user types
          }}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Inline error for input */}
      </form>

      <h3 className="text-xl font-semibold mb-2">Location List</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S.N.</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.length > 0 ? (
            locations.map((loc, index) => (
              <tr key={loc._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{loc.name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeleteLocation(loc._id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  {/* Add edit button if needed */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">No locations found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddLocation;