import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col">
      <div className="bg-[#FFB800] py-16 px-8 text-center border-b-[8px] border-white">
        <h1 className="text-5xl font-black text-black tracking-tight mb-2">Become a UdrCrafts Shipping Partner®</h1>
      </div>
      
      <div className="px-12 py-16 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-black">Choose how you want to continue</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Join the UdrCrafts logistics network. Complete your registration, upload your required business documents, and start managing your shipments seamlessly through our partner portal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-white p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-black mb-1">Easy Registration</h3>
            </div>
            <div className="bg-white p-6 flex-1 flex flex-col justify-between">
              <p className="text-black font-medium mb-6 leading-tight">Start your application process online</p>
              <Button onClick={() => navigate('/registration')} size="md" className="w-full">
                Become a Partner
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#FFB800] p-6">
              <h3 className="font-bold text-lg text-black mb-1">Secure Document Upload</h3>
            </div>
            <div className="bg-white p-6 flex-1 flex flex-col justify-between">
              <p className="text-black font-medium mb-6 leading-tight">Upload business licenses and tax IDs safely</p>
              <Button onClick={() => navigate('/upload-documents')} size="md" className="w-full">
                Upload Documents
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#FFB800] p-6">
              <h3 className="font-bold text-lg text-black mb-1">Profile Management</h3>
            </div>
            <div className="bg-white p-6 flex-1 flex flex-col justify-between">
              <p className="text-black font-medium mb-6 leading-tight">Manage your account and access dashboard</p>
              <Button onClick={() => navigate('/login')} size="md" className="w-full">
                Login to Portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
