import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/upload-documents');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 animate-fade-in">
      <Card className="p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-1">Partner Registration</h2>
          <p className="text-[#FFB800] text-sm font-bold">Step 1 of 2: Basic Details</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <div className="md:col-span-2">
              <Input 
                id="fullName" 
                label="Full Name" 
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required 
              />
            </div>
            
            <Input 
              id="mobile" 
              type="tel" 
              label="Mobile Number" 
              placeholder="10-digit mobile number" 
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              required 
            />
            
            <Input 
              id="email" 
              type="email" 
              label="Email Address" 
              placeholder="Enter email address" 
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required 
            />

            <div className="md:col-span-2">
              <Input 
                id="address" 
                label="Address" 
                placeholder="Complete street address" 
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                required 
              />
            </div>

            <Input 
              id="city" 
              label="City" 
              placeholder="City name" 
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required 
            />

            <Input 
              id="state" 
              label="State" 
              placeholder="State name" 
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required 
            />

            <Input 
              id="pincode" 
              label="Pincode" 
              placeholder="6-digit pincode" 
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
              required 
            />
          </div>
          
          <Button type="submit" size="large" className="w-full mt-8">
            Continue to Documents
          </Button>
        </form>
      </Card>
    </div>
  );
};
