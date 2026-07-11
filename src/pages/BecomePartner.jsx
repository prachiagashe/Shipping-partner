import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Truck, Globe, TrendingUp } from 'lucide-react';
import './pages.css';

export const BecomePartner = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in">
      <div className="text-center section-header">
        <h1>Why Partner With Us?</h1>
        <p>Expand your reach and grow your revenue by becoming an official shipping partner.</p>
      </div>
      
      <div className="features-grid">
        <Card className="feature-card text-center">
          <div className="icon-wrapper"><Globe size={40} /></div>
          <h3>Global Reach</h3>
          <p>Access our worldwide network of customers and businesses looking for reliable shipping.</p>
        </Card>
        <Card className="feature-card text-center">
          <div className="icon-wrapper"><TrendingUp size={40} /></div>
          <h3>Boost Revenue</h3>
          <p>Increase your daily shipment volume with our guaranteed customer flow.</p>
        </Card>
        <Card className="feature-card text-center">
          <div className="icon-wrapper"><Truck size={40} /></div>
          <h3>Easy Logistics</h3>
          <p>Our platform seamlessly integrates with your existing operations for smooth sailing.</p>
        </Card>
      </div>

      <div className="text-center mt-xl">
        <Button onClick={() => navigate('/registration')} size="large">
          Start Application
        </Button>
      </div>
    </div>
  );
};
