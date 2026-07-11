import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import './pages.css';

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
    // In a real app, save data here
    navigate('/upload-documents');
  };

  return (
    <div className="page-container form-container animate-fade-in">
      <Card>
        <div className="form-header">
          <h2>Partner Registration</h2>
          <p className="text-muted">Step 1 of 3: Basic Information</p>
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
          
          <Button type="submit" className="w-full mt-xl" style={{ width: '100%', marginTop: '2rem' }}>
            Continue to Documents
          </Button>
        </form>
      </Card>
    </div>
  );
};
