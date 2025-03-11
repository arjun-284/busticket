import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Logout from '../Logout';
import { AuthContext } from '../context/AuthContext';

const Header = () => {

  const { isAuthenticated, user } = useContext(AuthContext);

  const dashboardLink = () => {
    if (user && user.role === 'admin') {
      return '/admin/dashboard';
    } else if (user && user.role === 'user') {
      return '/user/dashboard';
    } else {
      return '/account';
    }
  };

  // Determine the label for the link (Dashboard or Account)
  const dashboardLabel = isAuthenticated ? 'Dashboard' : 'Account';

  return (
    <nav className='flex justify-center items-center bg-gray-800 text-white p-4 sticky top-0'>
      <ul className='flex gap-15 text-lg justify-center'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {isAuthenticated ? (
          <li><Link to={dashboardLink()}>Dashboard</Link></li>
        ) : (
          <li><Link to="/account">Account</Link></li>
        )}
        {isAuthenticated && <li><Logout /></li>}
      </ul>
    </nav>

  )
}

export default Header