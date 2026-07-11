import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Login to your partner dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input 
            id="email" 
            type="text" 
            label="Email or Mobile Number" 
            placeholder="john@example.com or 9876543210" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <Input 
            id="password" 
            type="password" 
            label="Password" 
            placeholder="Enter your password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          
          <Button type="submit" className="w-full mt-8">
            Login
          </Button>
          
          <div className="mt-6 text-center text-sm text-gray-500 font-medium">
            Don't have an account? <Link to="/become-partner" className="text-black hover:underline">Become a partner</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
