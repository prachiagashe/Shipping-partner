import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Upload } from 'lucide-react';

const FileUpload = ({ label, id, file, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-900 mb-2">
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => document.getElementById(id).click()}
    >
      <Upload size={24} className="text-[#FFB800] mx-auto mb-2" />
      <span className="text-sm font-medium text-gray-600">
        {file ? file.name : 'Click to upload PDF, JPG or PNG'}
      </span>
      <input 
        id={id} 
        type="file" 
        className="hidden" 
        onChange={onChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  </div>
);

export const UploadDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const step1Data = location.state?.step1Data;

  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    aadhaarFile: null,
    panNumber: '',
    panFile: null,
    dlNumber: '',
    dlFile: null,
    accountName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const handleFileChange = (e, fieldId) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [fieldId]: e.target.files[0] });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Section A: Aadhaar
    if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar must be exactly 12 digits";
    }

    // Section B: PAN
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.panNumber)) {
      newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    }

    // Section C: Driving License
    if (!formData.dlNumber) {
      newErrors.dlNumber = "Driving License Number is required";
    }

    // Section D: Bank Details
    if (!formData.accountName) newErrors.accountName = "Account holder name is required";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC Code format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (!step1Data) {
        alert("Registration session expired. Please start over.");
        navigate('/registration');
        return;
      }
      navigate('/create-account', { state: { step1Data, step2Data: formData } });
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-8 animate-fade-in">
      <Card className="p-6 sm:p-10 border border-gray-100 shadow-sm">
        <div className="mb-6 sm:mb-8 border-b border-gray-200 pb-4 sm:pb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2">Upload Documents</h2>
          <p className="text-[#FFB800] font-bold">Step 2 of 2: Verification Details</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4 text-black">Section A: Aadhaar Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                id="aadhaarNumber" 
                label="Aadhaar Number" 
                placeholder="12-digit Aadhaar Number" 
                value={formData.aadhaarNumber}
                onChange={handleChange}
                error={errors.aadhaarNumber}
                required 
              />
              <FileUpload 
                label="Upload Aadhaar Card" 
                id="aadhaarFile" 
                file={formData.aadhaarFile} 
                onChange={(e) => handleFileChange(e, 'aadhaarFile')} 
                required 
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4 text-black">Section B: PAN Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                id="panNumber" 
                label="PAN Number" 
                placeholder="ABCDE1234F" 
                value={formData.panNumber}
                onChange={handleChange}
                error={errors.panNumber}
                required 
              />
              <FileUpload 
                label="Upload PAN Card" 
                id="panFile" 
                file={formData.panFile} 
                onChange={(e) => handleFileChange(e, 'panFile')} 
                required 
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4 text-black">Section C: Driving License</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                id="dlNumber" 
                label="Driving License Number" 
                placeholder="Enter DL Number" 
                value={formData.dlNumber}
                onChange={handleChange}
                error={errors.dlNumber}
                required 
              />
              <FileUpload 
                label="Upload Driving License" 
                id="dlFile" 
                file={formData.dlFile} 
                onChange={(e) => handleFileChange(e, 'dlFile')} 
                required 
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4 text-black">Section D: Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                id="accountName" 
                label="Account Holder Name" 
                placeholder="Name as per bank" 
                value={formData.accountName}
                onChange={handleChange}
                error={errors.accountName}
                required 
              />
              <Input 
                id="bankName" 
                label="Bank Name" 
                placeholder="E.g., State Bank of India" 
                value={formData.bankName}
                onChange={handleChange}
                error={errors.bankName}
                required 
              />
              <Input 
                id="accountNumber" 
                type="password" 
                label="Account Number" 
                placeholder="Enter account number" 
                value={formData.accountNumber}
                onChange={handleChange}
                error={errors.accountNumber}
                required 
              />
              <Input 
                id="confirmAccountNumber" 
                type="text" 
                label="Confirm Account Number" 
                placeholder="Re-enter account number" 
                value={formData.confirmAccountNumber}
                onChange={handleChange}
                error={errors.confirmAccountNumber}
                required 
              />
              <div className="md:col-span-2">
                <Input 
                  id="ifscCode" 
                  label="IFSC Code" 
                  placeholder="e.g. SBIN0001234" 
                  value={formData.ifscCode}
                  onChange={handleChange}
                  error={errors.ifscCode}
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <Button type="button" variant="outline" size="large" className="w-1/3" onClick={() => navigate('/registration')}>
              Back
            </Button>
            <Button type="submit" size="large" className="flex-1">
              Create Account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
