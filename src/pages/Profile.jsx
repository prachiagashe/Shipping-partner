import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, FileText, CreditCard, FileCheck, Eye, Save, X } from 'lucide-react';

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

const DetailRow = ({ label, value, name, isEditing, isEditable, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3.5 border-b border-gray-100 last:border-0 items-center">
    <span className="text-sm font-semibold text-gray-500 sm:col-span-1 pt-0.5">{label}</span>
    {isEditing && isEditable ? (
      <input 
        type="text" 
        name={name}
        value={value || ''} 
        onChange={onChange}
        className="w-full text-base font-medium text-black sm:col-span-2 border-2 border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FFB800] transition-colors"
      />
    ) : (
      <span className="text-base font-medium text-black sm:col-span-2 break-words">{value || 'N/A'}</span>
    )}
  </div>
);

const ViewDocumentBtn = ({ label, url }) => (
  <button 
    onClick={() => window.open(`http://localhost:5000/${url}`, '_blank')}
    className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-[#FFB800] hover:text-[#FFB800] hover:bg-[#FFB800]/5 px-4 py-3 rounded-xl transition-all w-full sm:w-auto"
  >
    <Eye size={18} />
    {label}
  </button>
);

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

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

  const handleEditClick = () => {
    setEditData({
      address: profileData.partner.address,
      city: profileData.partner.city,
      state: profileData.partner.state,
      pincode: profileData.partner.pincode,
      bank_name: profileData.partner.bank_name,
      account_number: profileData.partner.account_number,
      ifsc_code: profileData.partner.ifsc_code,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/partner/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(editData)
      });

      if (!res.ok) throw new Error('Failed to update profile');
      const updatedData = await res.json();
      
      setProfileData({ ...profileData, partner: updatedData.partner });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
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
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={saving} className="flex items-center gap-2">
                <X size={16} /> Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEditClick}>
                Edit Profile
              </Button>
              <Button onClick={handleLogout} className="bg-red-500 text-white border-transparent hover:bg-red-600">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <ProfileSection title="1. Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <DetailRow label="Full Name" value={partner.full_name} isEditable={false} isEditing={isEditing} />
                <DetailRow label="Mobile Number" value={partner.mobile} isEditable={false} isEditing={isEditing} />
                <DetailRow label="Email" value={partner.email} isEditable={false} isEditing={isEditing} />
              </div>
              <div>
                <DetailRow label="Address" name="address" value={isEditing ? editData.address : partner.address} isEditable={true} isEditing={isEditing} onChange={handleChange} />
                <DetailRow label="City" name="city" value={isEditing ? editData.city : partner.city} isEditable={true} isEditing={isEditing} onChange={handleChange} />
                <DetailRow label="State" name="state" value={isEditing ? editData.state : partner.state} isEditable={true} isEditing={isEditing} onChange={handleChange} />
                <DetailRow label="Pincode" name="pincode" value={isEditing ? editData.pincode : partner.pincode} isEditable={true} isEditing={isEditing} onChange={handleChange} />
              </div>
            </div>
          </ProfileSection>
        </div>

        <ProfileSection title="2. Document Information" icon={FileText}>
          <DetailRow label="Aadhaar Number" value={partner.aadhaar_number} isEditable={false} isEditing={isEditing} />
          <DetailRow label="PAN Number" value={partner.pan_number} isEditable={false} isEditing={isEditing} />
          <DetailRow label="Driving License" value={partner.license_number} isEditable={false} isEditing={isEditing} />
        </ProfileSection>

        <ProfileSection title="3. Bank Details" icon={CreditCard}>
          <DetailRow label="Account Holder" value={partner.account_holder_name} isEditable={false} isEditing={isEditing} />
          <DetailRow label="Bank Name" name="bank_name" value={isEditing ? editData.bank_name : partner.bank_name} isEditable={true} isEditing={isEditing} onChange={handleChange} />
          <DetailRow label="Account Number" name="account_number" value={isEditing ? editData.account_number : partner.account_number} isEditable={true} isEditing={isEditing} onChange={handleChange} />
          <DetailRow label="IFSC Code" name="ifsc_code" value={isEditing ? editData.ifsc_code : partner.ifsc_code} isEditable={true} isEditing={isEditing} onChange={handleChange} />
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
