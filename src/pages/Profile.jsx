import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-fade-in">
      <h2 className="text-3xl font-bold mb-10">Company Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center p-8 md:col-span-1 border-gray-200 shadow-sm">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md">
            <User size={64} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Acme Logistics</h3>
          <p className="text-sm font-medium text-gray-500 mb-6">Partner since 2026</p>
          <Button variant="outline" size="md" className="w-full">Update Logo</Button>
        </Card>

        <Card className="p-8 md:col-span-2 border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Profile Information</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input label="Company Name" id="cname" defaultValue="Acme Logistics" />
            <Input label="Primary Contact Name" id="contact" defaultValue="John Doe" />
            <Input label="Business Email" id="email" defaultValue="john@example.com" type="email" />
            <Input label="Phone Number" id="phone" defaultValue="(555) 123-4567" type="tel" />
            
            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
