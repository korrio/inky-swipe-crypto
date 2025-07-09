'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { TabType } from '@/types';
import { devices } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Smartphone,
  CreditCard,
  Package,
  Shield,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';

interface NavItemProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, count }) => {
  const { activeTab, setActiveTab, selectedTenant } = useApp();
  
  const getCount = () => {
    if (!count) return null;
    
    if (id === 'devices') {
      return devices.filter(d => 
        selectedTenant.name === 'All Tenants' || d.tenant === selectedTenant.name
      ).length;
    }
    
    if (id === 'financing') {
      return devices.filter(d => 
        (selectedTenant.name === 'All Tenants' || d.tenant === selectedTenant.name) && 
        d.financing
      ).length;
    }
    
    return count;
  };

  const displayCount = getCount();

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
        activeTab === id
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      )}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {displayCount !== null && (
        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          {displayCount}
        </span>
      )}
    </button>
  );
};

export const Sidebar: React.FC = () => {
  const navItems: NavItemProps[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'devices', label: 'Devices', icon: <Smartphone className="w-5 h-5" />, count: 1 },
    { id: 'financing', label: 'Financing', icon: <CreditCard className="w-5 h-5" />, count: 1 },
    { id: 'applications', label: 'Applications', icon: <Package className="w-5 h-5" /> },
    { id: 'policies', label: 'Policies', icon: <Shield className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">MDM Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Multi-Tenant Management</p>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@mdm.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};