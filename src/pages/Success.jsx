import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CheckCircle } from 'lucide-react';

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in text-center flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="p-12 border border-gray-100 shadow-sm w-full flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-black tracking-tight mb-4">Registration Successful</h2>
        <p className="text-gray-600 text-lg mb-10 max-w-sm">
          Your shipping partner profile has been created successfully. Welcome to the network!
        </p>
        <Button onClick={() => navigate('/login')} size="large" className="w-full max-w-xs">
          Login Now
        </Button>
      </Card>
    </div>
  );
};
