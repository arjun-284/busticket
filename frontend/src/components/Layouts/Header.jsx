import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout';
import { AuthContext } from '../context/AuthContext';
// You'll need a LanguageContext, see note below
import { LanguageContext } from '../context/LanguageContext';

import logo from "../../assets/Jaljala yatayat logo.png";


const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const dashboardLink = () => {
    if (user && ['admin', 'manager', 'staff'].includes(user.role)) {
      return '/admin/dashboard';
    } else if (user && user.role === 'user') {
      return '/user/dashboard';
    } else {
      return '/account';
    }
  };

  // For language display
  const langLabel = language === 'en' ? 'English' : 'नेपाली';

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md sticky top-0 z-50">
      {/* LOGO + Brand */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-90">
        <img
          src={logo}
          alt="Jaljala Yatayat Logo"
          className="w-14 h-14 rounded-full border-4 border-blue-200 shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ animation: 'spin 3s linear infinite alternate' }}
        />
        <div className="flex flex-col leading-5">
          <span className="text-lg md:text-2xl font-bold text-blue-100 drop-shadow-lg tracking-wide">
            Jaljala Yatayat
          </span>
          <span className="text-xs md:text-sm text-blue-300 font-semibold tracking-widest">Since 2064 B.S.</span>
        </div>
      </Link>

      {/* Nav links */}
      <ul className="flex gap-7 text-base md:text-lg items-center">
        <li>
          <Link to="/" className="hover:text-blue-300 transition">{
            language === 'en' ? 'Home' : 'गृहपृष्ठ'
          }</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-300 transition">{
            language === 'en' ? 'About' : 'हाम्रो बारे'
          }</Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-blue-300 transition">{
            language === 'en' ? 'Services' : 'सेवा'
          }</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-300 transition">{
            language === 'en' ? 'Contact' : 'सम्पर्क'
          }</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to={dashboardLink()} className="hover:text-blue-300 transition">
              {language === 'en' ? 'Dashboard' : 'ड्यासबोर्ड'}
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/account" className="hover:text-blue-300 transition">
              {language === 'en' ? 'Account' : 'खाता'}
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Logout />
          </li>
        )}
      </ul>

      {/* Language switcher */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 rounded-l ${language === 'en' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-200`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('np')}
          className={`px-2 py-1 rounded-r ${language === 'np' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-200`}
        >
          नेपाली
        </button>
      </div>

      {/* LOGO animation keyframes */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(-6deg);}
          100% { transform: rotate(9deg);}
        }
        `}
      </style>
    </nav>
  );
};

export default Header;
