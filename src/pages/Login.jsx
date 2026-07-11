import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import './pages.css';

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
    // In a real app, validate credentials
    navigate('/dashboard');
  };

  return (
    <div className="page-container form-container animate-fade-in">
      <Card>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="text-muted">Login to your partner dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input 
            id="email" 
            type="email" 
            label="Email Address" 
            placeholder="john@example.com" 
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
          
          <Button type="submit" className="w-full mt-xl" style={{ width: '100%', marginTop: '2rem' }}>
            Login
          </Button>
          
          <div className="auth-link">
            Don't have an account? <Link to="/become-partner">Become a partner</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
