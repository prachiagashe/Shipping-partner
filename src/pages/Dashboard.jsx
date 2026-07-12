import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto w-full p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Button onClick={() => navigate('/profile')} variant="outline" size="md">View Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 flex flex-row items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-[#FFB800]/20 rounded-full">
            <Package className="text-[#FFB800]" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">1,248</h3>
            <p className="text-sm font-medium text-gray-500">Total Shipments</p>
          </div>
        </Card>
        
        <Card className="p-6 flex flex-row items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-black/10 rounded-full">
            <Truck className="text-black" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">42</h3>
            <p className="text-sm font-medium text-gray-500">Active Deliveries</p>
          </div>
        </Card>

        <Card className="p-6 flex flex-row items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="p-4 bg-gray-100 rounded-full">
            <Clock className="text-gray-600" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">99.2%</h3>
            <p className="text-sm font-medium text-gray-500">On-Time Rate</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold">Recent Shipments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-4 font-semibold text-gray-700">ID</th>
                <th className="p-4 font-semibold text-gray-700">Destination</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {['SH-9012', 'SH-9013', 'SH-9014'].map((id, index) => (
                <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold">{id}</td>
                  <td className="p-4">New York, NY</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 text-green-600 text-sm font-bold">
                      <CheckCircle size={16} /> Delivered
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 font-medium">Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
