import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Package, Truck, Clock, CheckCircle, TrendingUp, TrendingDown, MapPin, Calendar, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalShipments: 1248,
    activeDeliveries: 42,
    onTimeRate: 99.2,
    revenue: 45200
  });

  useEffect(() => {
    // Basic auth check
    if (!localStorage.getItem('token')) {
      // navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Partner Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back, here's your shipping overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card className="p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#FFB800]/10 rounded-xl">
              <Package className="text-[#FFB800]" size={24} />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp size={14} className="mr-1" /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.totalShipments.toLocaleString()}</h3>
            <p className="text-sm font-medium text-gray-500">Total Shipments</p>
          </div>
        </Card>
        
        <Card className="p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Truck className="text-blue-600" size={24} />
            </div>
            <span className="flex items-center text-blue-600 text-sm font-semibold bg-blue-50 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.activeDeliveries}</h3>
            <p className="text-sm font-medium text-gray-500">Active Deliveries</p>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Clock className="text-green-600" size={24} />
            </div>
            <span className="flex items-center text-red-600 text-sm font-semibold bg-red-50 px-2 py-1 rounded-full">
              <TrendingDown size={14} className="mr-1" /> -0.4%
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.onTimeRate}%</h3>
            <p className="text-sm font-medium text-gray-500">On-Time Rate</p>
          </div>
        </Card>
        
        <Card className="p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <span className="text-purple-600 font-bold text-xl px-1">₹</span>
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp size={14} className="mr-1" /> +8%
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">₹{stats.revenue.toLocaleString()}</h3>
            <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Shipments</h3>
          <Button variant="outline" size="sm" className="hidden sm:flex">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="p-4 pl-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Tracking ID</th>
                <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 pr-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {[
                { id: 'SH-9012', dest: 'Mumbai, MH', status: 'Delivered', type: 'success', date: 'Today, 10:42 AM' },
                { id: 'SH-9013', dest: 'Delhi, DL', status: 'In Transit', type: 'warning', date: 'Today, 09:15 AM' },
                { id: 'SH-9014', dest: 'Bangalore, KA', status: 'Delayed', type: 'error', date: 'Yesterday' },
                { id: 'SH-9015', dest: 'Pune, MH', status: 'Delivered', type: 'success', date: 'Yesterday' },
              ].map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6 font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {item.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      {item.dest}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                      ${item.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
                        item.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 
                        'bg-red-50 text-red-700 border border-red-200'}`}>
                      {item.type === 'success' && <CheckCircle size={12} />}
                      {item.type === 'warning' && <Clock size={12} />}
                      {item.type === 'error' && <AlertCircle size={12} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-sm text-gray-500 font-medium text-right">
                    <div className="flex justify-end items-center">
                      <Calendar size={14} className="mr-2 opacity-70" />
                      {item.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 sm:hidden flex justify-center">
          <Button variant="outline" size="sm" className="w-full">View All Shipments</Button>
        </div>
      </Card>
    </div>
  );
};
