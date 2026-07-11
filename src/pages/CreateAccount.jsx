import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import './pages.css';

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
      // Create account logic
      navigate('/login');
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="page-container form-container animate-fade-in">
      <Card>
        <div className="form-header">
          <h2>Create Account</h2>
          <p className="text-muted">Step 3 of 3: Secure your account</p>
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
          
          <Button type="submit" className="w-full mt-xl" style={{ width: '100%', marginTop: '2rem' }}>
            Complete Setup
          </Button>
          
          <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
