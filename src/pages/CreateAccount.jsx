import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword) {
      navigate('/login');
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 font-medium">Step 3 of 3: Secure your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input 
            id="password" 
            type="password" 
            label="Password" 
            placeholder="Enter a secure password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          <Input 
            id="confirmPassword" 
            type="password" 
            label="Confirm Password" 
            placeholder="Re-enter your password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
          
          <Button type="submit" className="w-full mt-8">
            Complete Setup
          </Button>
          
          <div className="mt-6 text-center text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-black hover:underline">Login here</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
