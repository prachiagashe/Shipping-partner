import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile');

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
              <Link to="/profile" className="text-black font-semibold hover:opacity-75">Profile</Link>
              <Link to="/" className="text-black font-semibold hover:opacity-75">Logout</Link>
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
