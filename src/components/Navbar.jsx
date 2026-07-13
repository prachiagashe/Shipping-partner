import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile');

  // Try to get user from local storage, fallback to a default
  let firstLetter = 'P'; // Default for Partner
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.full_name) {
        firstLetter = user.full_name.charAt(0).toUpperCase();
      } else if (user.email) {
        firstLetter = user.email.charAt(0).toUpperCase();
      }
    } catch (e) {}
  }

  return (
    <nav className="bg-[#FFB800] border-b border-[#E5A600] sticky top-0 z-50 py-6">
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-black">
          <Package size={32} />
          <span className="text-2xl font-extrabold tracking-tight">UdrCrafts Partner</span>
        </Link>
        <div className="flex items-center gap-6">
          {isDashboard ? (
            <>
              <Link to="/dashboard" className="text-black font-semibold hover:opacity-75">Dashboard</Link>
              <Link to="/" className="text-black font-semibold hover:opacity-75 mr-2">Logout</Link>
              <Link to="/profile" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold hover:bg-gray-800 transition-colors shadow-sm shrink-0" title="View Profile">
                {firstLetter}
              </Link>
            </>
          ) : (
            <>
              <Link to="/become-partner" className="text-black font-semibold hover:opacity-75">Become a Partner</Link>
              <Link to="/login" className="text-black font-bold hover:opacity-75">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
