import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/upload-documents');
  };

  return (
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Partner Registration</h2>
          <p className="text-gray-500 font-medium">Step 1 of 3: Basic Information</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input 
            id="companyName" 
            label="Company Name" 
            placeholder="e.g. Acme Logistics" 
            value={formData.companyName}
            onChange={handleChange}
            required 
          />
          <Input 
            id="contactName" 
            label="Primary Contact Name" 
            placeholder="John Doe" 
            value={formData.contactName}
            onChange={handleChange}
            required 
          />
          <Input 
            id="email" 
            type="email" 
            label="Business Email" 
            placeholder="john@example.com" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <Input 
            id="phone" 
            type="tel" 
            label="Phone Number" 
            placeholder="(555) 123-4567" 
            value={formData.phone}
            onChange={handleChange}
            required 
          />
          
          <Button type="submit" className="w-full mt-8">
            Continue to Documents
          </Button>
        </form>
      </Card>
    </div>
  );
};
