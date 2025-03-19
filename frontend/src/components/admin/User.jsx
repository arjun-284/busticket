import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserSection = () => {
  const { state } = useLocation();
  const user = state?.user; // Retrieve user data from navigation state

  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  // Initialize form state with user data if provided
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
    password: "",
    confirm_password: "",
  });

  // Update form data if user changes (or if the component mounts with user data)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        password: "",
        confirm_password: "",
      });
    }
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = (data, isUpdate) => {
    let newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.role) newErrors.role = "Role is required";
    if (!isUpdate) {
      if (!data.password) newErrors.password = "Password is required";
      if (!data.confirm_password) newErrors.confirm_password = "Confirm Password is required";
      if (data.password !== data.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUpdate = !!user;
    const newErrors = validateForm(formData, isUpdate);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Determine if we're updating or creating a user
    const endpoint = isUpdate
      ? `http://localhost:5000/api/admin/user/update/${user._id}`
      : 'http://localhost:5000/api/admin/user/create';
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

      alert(isUpdate ? 'User updated successfully!' : 'User added successfully!');

      // If it's a create operation, clear the form
      if (!isUpdate) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          role: "",
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
        <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
        <form ref={formRef} onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {!user && (
            <>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirmPassword"
                  placeholder="Re-enter Password"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                )}
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
            <select
              name="role"
              id="role"
              className="w-full px-3 py-2 border rounded"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="user">User</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {user ? 'Update User' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSection;
