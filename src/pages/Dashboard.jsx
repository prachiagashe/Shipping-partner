import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';
import './pages.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard</h2>
        <Button onClick={() => navigate('/profile')} variant="outline">View Profile</Button>
      </div>

      <div className="features-grid" style={{ marginBottom: '3rem' }}>
        <Card style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <Package className="text-primary" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>1,248</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Total Shipments</p>
          </div>
        </Card>
        
        <Card style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <Truck style={{ color: 'var(--color-secondary)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>42</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Active Deliveries</p>
          </div>
        </Card>

        <Card style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-full)' }}>
            <Clock style={{ color: '#F59E0B' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>99.2%</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>On-Time Rate</p>
          </div>
        </Card>
      </div>

      <Card>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Shipments</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '1rem 0' }}>ID</th>
                <th style={{ padding: '1rem 0' }}>Destination</th>
                <th style={{ padding: '1rem 0' }}>Status</th>
                <th style={{ padding: '1rem 0' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {['SH-9012', 'SH-9013', 'SH-9014'].map((id, index) => (
                <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 0', fontWeight: '500' }}>{id}</td>
                  <td style={{ padding: '1rem 0' }}>New York, NY</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>
                      <CheckCircle size={14} /> Delivered
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0', color: 'var(--color-text-muted)' }}>Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
