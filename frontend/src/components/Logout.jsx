import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); 

  const handleLogout = () => {
    // Remove token and userdetails from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update authentication state
    setIsAuthenticated(false);

    // Redirect to login page
    navigate('/account');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
