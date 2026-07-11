import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User } from 'lucide-react';
import './pages.css';

export const Profile = () => {
  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Company Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <Card style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            backgroundColor: 'var(--color-background)', 
            borderRadius: 'var(--radius-full)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            border: '1px solid var(--color-border)'
          }}>
            <User size={64} className="text-muted" />
          </div>
          <h3>Acme Logistics</h3>
          <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>Partner since 2026</p>
          <Button variant="outline" style={{ width: '100%' }}>Update Logo</Button>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '1.5rem' }}>Profile Information</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input label="Company Name" defaultValue="Acme Logistics" />
            <Input label="Primary Contact Name" defaultValue="John Doe" />
            <Input label="Business Email" defaultValue="john@example.com" type="email" />
            <Input label="Phone Number" defaultValue="(555) 123-4567" type="tel" />
            
            <Button type="submit" style={{ marginTop: '1rem' }}>
              Save Changes
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
