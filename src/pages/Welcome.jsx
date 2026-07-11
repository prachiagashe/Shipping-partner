import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './pages.css';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in center-content text-center">
      <h1 className="hero-title">Delivering Excellence,<br/> Together.</h1>
      <p className="hero-subtitle">
        Join our network of elite shipping partners and unlock new business opportunities with seamless logistics solutions.
      </p>
      <div className="action-buttons">
        <Button onClick={() => navigate('/become-partner')} size="large">
          Get Started
        </Button>
        <Button variant="outline" onClick={() => navigate('/login')}>
          Already a partner? Login
        </Button>
      </div>
    </div>
  );
};
