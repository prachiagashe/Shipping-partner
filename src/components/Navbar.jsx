import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';
import './components.css';

export const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Package size={28} className="text-primary" />
          <span className="logo-text">ShipPartner</span>
        </Link>
        <div className="navbar-links">
          {isDashboard ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/" className="nav-link">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/become-partner" className="nav-link">Become a Partner</Link>
              <Link to="/login" className="nav-link login-link">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
