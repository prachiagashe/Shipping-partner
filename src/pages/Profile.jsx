import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, FileText, CreditCard, FileCheck, Eye } from 'lucide-react';

const ProfileSection = ({ title, icon: Icon, children }) => (
  <Card className="mb-6 border border-gray-100 shadow-sm overflow-hidden">
    <div className="bg-[#FFB800]/10 px-6 py-4 border-b border-[#FFB800]/20 flex items-center gap-3">
      <Icon className="text-[#FFB800]" size={24} />
      <h3 className="text-xl font-bold text-black">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </Card>
);

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-50 last:border-0">
    <span className="text-sm font-semibold text-gray-500 w-1/3 mb-1 sm:mb-0">{label}</span>
    <span className="text-base font-medium text-black">{value}</span>
  </div>
);

const ViewDocumentBtn = ({ label }) => (
  <button className="flex items-center gap-2 text-sm font-bold text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
    <Eye size={16} />
    {label}
  </button>
);

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tight mb-2">Partner Profile</h2>
          <p className="text-gray-500 font-medium">Manage your registration details</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => alert("Edit mode coming soon!")}>
            Edit Profile
          </Button>
          <Button onClick={() => navigate('/')} className="bg-red-500 text-white border-transparent hover:bg-red-600">
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <ProfileSection title="1. Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <DetailRow label="Full Name" value="Prachi Agashe" />
                <DetailRow label="Mobile Number" value="9876543210" />
                <DetailRow label="Email" value="prachi@example.com" />
              </div>
              <div>
                <DetailRow label="Address" value="123 Logistics Park" />
                <DetailRow label="City & State" value="Mumbai, Maharashtra" />
                <DetailRow label="Pincode" value="400001" />
              </div>
            </div>
          </ProfileSection>
        </div>

        <ProfileSection title="2. Document Information" icon={FileText}>
          <DetailRow label="Aadhaar Number" value="XXXX-XXXX-1234" />
          <DetailRow label="PAN Number" value="ABCDE1234F" />
          <DetailRow label="Driving License" value="MH-12-20230001234" />
        </ProfileSection>

        <ProfileSection title="3. Bank Details" icon={CreditCard}>
          <DetailRow label="Account Holder" value="Prachi Agashe" />
          <DetailRow label="Bank Name" value="State Bank of India" />
          <DetailRow label="Account Number" value="XXXX-XXXX-XXXX-9876" />
          <DetailRow label="IFSC Code" value="SBIN0001234" />
        </ProfileSection>

        <div className="md:col-span-2">
          <ProfileSection title="4. Uploaded Documents" icon={FileCheck}>
            <div className="flex flex-wrap gap-4">
              <ViewDocumentBtn label="View Aadhaar Card" />
              <ViewDocumentBtn label="View PAN Card" />
              <ViewDocumentBtn label="View Driving License" />
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};
