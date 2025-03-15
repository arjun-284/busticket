import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from './layout/AdminLayout';

const SettingSection = () => {
  const { user } = useContext(AdminContext);

  // State for profile form
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  // Set initial values for profile from user context
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const [profileErrors, setProfileErrors] = useState({});

  // State for password form
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Handle input change
  const handleChange = (e, setState) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate Profile Form
  const validateProfile = () => {
    let errors = {};
    if (!profile.name.trim()) errors.name = 'Name is required';
    if (!profile.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      errors.email = 'Invalid email format';
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Password Form
  const validatePasswords = () => {
    let errors = {};
    if (!passwords.oldPassword) errors.oldPassword = 'Old password is required';
    if (!passwords.newPassword) errors.newPassword = 'New password is required';
    if (passwords.newPassword.length < 6)
      errors.newPassword = 'Password must be at least 6 characters';
    if (passwords.newPassword !== passwords.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Profile Form Submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (validateProfile()) {
      try {
        const response = await fetch('http://localhost:5000/api/change/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(profile)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update profile');
        localStorage.setItem("user", JSON.stringify(data.user));  // Update user data in localStorage
        alert('Profile updated successfully!');
      } catch (error) {
        console.log(`Error: ${error.message}`);
        alert("something Went Wrong Cant Update Profile");
      }
    }
  };

  // Handle Password Form Submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        const response = await fetch('http://localhost:5000/api/change/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(passwords)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to change password');

        alert('Password changed successfully!');
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="w-4/5 mt-2 ml-auto mr-auto">
      <div className="flex justify-center gap-10 bg-white p-6 rounded shadow-md">

        {/* Profile Section */}
        <div className='w-2/5'>
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={(e) => handleChange(e, setProfile)}
                placeholder="Enter name"
                className="w-full px-3 py-2 border rounded"
              />
              {profileErrors.name && <p className="text-red-500 text-sm">{profileErrors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={(e) => handleChange(e, setProfile)}
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded"
              />
              {profileErrors.email && <p className="text-red-500 text-sm">{profileErrors.email}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className='w-2/5'>
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>

            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                onChange={(e) => handleChange(e, setPasswords)}
                placeholder="Enter old password"
                className="w-full px-3 py-2 border rounded"
              />
              {passwordErrors.oldPassword && <p className="text-red-500 text-sm">{passwordErrors.oldPassword}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={(e) => handleChange(e, setPasswords)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded"
              />
              {passwordErrors.newPassword && <p className="text-red-500 text-sm">{passwordErrors.newPassword}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => handleChange(e, setPasswords)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 border rounded"
              />
              {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SettingSection;
