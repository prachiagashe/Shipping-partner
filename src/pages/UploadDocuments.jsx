import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Upload } from 'lucide-react';
import './pages.css';

export const UploadDocuments = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/create-account');
  };

  return (
    <div className="page-container form-container animate-fade-in">
      <Card>
        <div className="form-header">
          <h2>Upload Documents</h2>
          <p className="text-muted">Step 2 of 3: Verify Your Business</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="upload-area" style={{
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 1rem',
            textAlign: 'center',
            marginBottom: '2rem',
            cursor: 'pointer'
          }} onClick={() => document.getElementById('file-upload').click()}>
            <Upload size={48} className="text-primary" style={{ margin: '0 auto 1rem', color: 'var(--color-primary)' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Click to upload or drag and drop</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Business License, Insurance, or Tax ID (PDF, JPG)</p>
            <input 
              id="file-upload" 
              type="file" 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          {file && (
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
              Selected file: <strong>{file}</strong>
            </div>
          )}
          
          <Button type="submit" className="w-full" style={{ width: '100%' }}>
            Continue to Setup
          </Button>
          <Button type="button" variant="outline" className="w-full mt-2" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/registration')}>
            Back
          </Button>
        </form>
      </Card>
    </div>
  );
};
