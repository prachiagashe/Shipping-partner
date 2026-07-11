import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Truck, Globe, TrendingUp } from 'lucide-react';

export const BecomePartner = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto w-full p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Why Partner With Us?</h1>
        <p className="text-lg text-gray-600">Expand your reach and grow your revenue by becoming an official shipping partner.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center p-8 hover:-translate-y-1 transition-transform">
          <div className="text-[#FFB800] mb-6 flex justify-center"><Globe size={40} /></div>
          <h3 className="text-xl font-bold mb-2">Global Reach</h3>
          <p className="text-gray-600">Access our worldwide network of customers and businesses looking for reliable shipping.</p>
        </Card>
        <Card className="text-center p-8 hover:-translate-y-1 transition-transform">
          <div className="text-[#FFB800] mb-6 flex justify-center"><TrendingUp size={40} /></div>
          <h3 className="text-xl font-bold mb-2">Boost Revenue</h3>
          <p className="text-gray-600">Increase your daily shipment volume with our guaranteed customer flow.</p>
        </Card>
        <Card className="text-center p-8 hover:-translate-y-1 transition-transform">
          <div className="text-[#FFB800] mb-6 flex justify-center"><Truck size={40} /></div>
          <h3 className="text-xl font-bold mb-2">Easy Logistics</h3>
          <p className="text-gray-600">Our platform seamlessly integrates with your existing operations for smooth sailing.</p>
        </Card>
      </div>

      <div className="text-center mt-16">
        <Button onClick={() => navigate('/registration')} size="large">
          Start Application
        </Button>
      </div>
    </div>
  );
};
