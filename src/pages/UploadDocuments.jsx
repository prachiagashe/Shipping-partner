import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Upload } from 'lucide-react';

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
    <div className="max-w-xl mx-auto w-full p-8 animate-fade-in">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Upload Documents</h2>
          <p className="text-gray-500 font-medium">Step 2 of 3: Verify Your Business</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-8 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <Upload size={48} className="text-[#FFB800] mx-auto mb-4" />
            <h3 className="font-bold mb-2 text-gray-900">Click to upload or drag and drop</h3>
            <p className="text-sm text-gray-500">Business License, Insurance, or Tax ID (PDF, JPG)</p>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          {file && (
            <div className="p-4 bg-gray-100 rounded-lg mb-8 text-gray-800 text-sm">
              Selected file: <strong className="font-semibold">{file}</strong>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            Continue to Setup
          </Button>
          <Button type="button" variant="outline" className="w-full mt-4" onClick={() => navigate('/registration')}>
            Back
          </Button>
        </form>
      </Card>
    </div>
  );
};
