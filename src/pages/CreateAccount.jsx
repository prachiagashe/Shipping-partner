import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step1Data, step2Data } = location.state || {};

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!step1Data || !step2Data) {
      alert("Session expired. Please start over.");
      return navigate('/registration');
    }

    if(formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Register Partner
      const registerRes = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: step1Data.fullName,
          mobile: step1Data.mobile,
          email: step1Data.email,
          password: formData.password,
          address: step1Data.address,
          city: step1Data.city,
          state: step1Data.state,
          pincode: step1Data.pincode,
          aadhaar_number: step2Data.aadhaarNumber,
          pan_number: step2Data.panNumber,
          license_number: step2Data.dlNumber,
          account_holder_name: step2Data.accountName,
          bank_name: step2Data.bankName,
          account_number: step2Data.accountNumber,
          ifsc_code: step2Data.ifscCode
        })
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerData.message || 'Registration failed');

      // Step 2: Upload Documents
      const uploadFormData = new FormData();
      uploadFormData.append('aadhaar_file', step2Data.aadhaarFile);
      uploadFormData.append('pan_file', step2Data.panFile);
      uploadFormData.append('license_file', step2Data.dlFile);

      const uploadRes = await fetch(`http://localhost:5000/api/partner/upload/${registerData.partner_id}`, {
        method: 'POST',
        body: uploadFormData
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || 'Document upload failed');

      navigate('/success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 font-medium">Step 3 of 3: Secure your account</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
          
          <Button type="submit" className="w-full mt-8" disabled={loading}>
            {loading ? 'Creating Account...' : 'Complete Setup'}
          </Button>
          
          <div className="mt-6 text-center text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-black hover:underline">Login here</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
