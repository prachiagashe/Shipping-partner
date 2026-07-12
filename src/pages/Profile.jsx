import React, { useEffect, useState } from 'react';
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
    <span className="text-base font-medium text-black">{value || 'N/A'}</span>
  </div>
);

const ViewDocumentBtn = ({ label, url }) => (
  <button 
    onClick={() => window.open(`http://localhost:5000/${url}`, '_blank')}
    className="flex items-center gap-2 text-sm font-bold text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
  >
    <Eye size={16} />
    {label}
  </button>
);

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }

      try {
        const res = await fetch('http://localhost:5000/api/partner/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div className="text-center p-8 mt-20 text-xl font-bold animate-pulse">Loading Profile...</div>;
  }

  if (!profileData || !profileData.partner) {
    return <div className="text-center p-8 text-red-500 mt-20 font-bold">Error loading profile data.</div>;
  }

  const { partner, documents } = profileData;

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
          <Button onClick={handleLogout} className="bg-red-500 text-white border-transparent hover:bg-red-600">
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <ProfileSection title="1. Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <DetailRow label="Full Name" value={partner.full_name} />
                <DetailRow label="Mobile Number" value={partner.mobile} />
                <DetailRow label="Email" value={partner.email} />
              </div>
              <div>
                <DetailRow label="Address" value={partner.address} />
                <DetailRow label="City & State" value={`${partner.city}, ${partner.state}`} />
                <DetailRow label="Pincode" value={partner.pincode} />
              </div>
            </div>
          </ProfileSection>
        </div>

        <ProfileSection title="2. Document Information" icon={FileText}>
          <DetailRow label="Aadhaar Number" value={partner.aadhaar_number} />
          <DetailRow label="PAN Number" value={partner.pan_number} />
          <DetailRow label="Driving License" value={partner.license_number} />
        </ProfileSection>

        <ProfileSection title="3. Bank Details" icon={CreditCard}>
          <DetailRow label="Account Holder" value={partner.account_holder_name} />
          <DetailRow label="Bank Name" value={partner.bank_name} />
          <DetailRow label="Account Number" value={partner.account_number} />
          <DetailRow label="IFSC Code" value={partner.ifsc_code} />
        </ProfileSection>

        <div className="md:col-span-2">
          <ProfileSection title="4. Uploaded Documents" icon={FileCheck}>
            {documents ? (
              <div className="flex flex-wrap gap-4">
                <ViewDocumentBtn label="View Aadhaar Card" url={documents.aadhaar_file} />
                <ViewDocumentBtn label="View PAN Card" url={documents.pan_file} />
                <ViewDocumentBtn label="View Driving License" url={documents.license_file} />
              </div>
            ) : (
              <p className="text-gray-500 font-medium">No documents uploaded.</p>
            )}
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};
