'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { tenants } from '@/data/mockData';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const { selectedTenant, setSelectedTenant, activeTab } = useApp();

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      overview: 'Dashboard Overview',
      devices: 'Device Management',
      financing: 'Financing Management',
      applications: 'Application Management',
      policies: 'Security Policies',
      analytics: 'Analytics & Reports',
      users: 'User Management',
      settings: 'System Settings',
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h2>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[200px] justify-between">
                <span>{selectedTenant.name}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              {tenants.map((tenant) => (
                <DropdownMenuItem
                  key={tenant.id}
                  onClick={() => setSelectedTenant(tenant)}
                  className="flex items-center justify-between"
                >
                  <span>{tenant.name}</span>
                  {selectedTenant.id === tenant.id && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="text-sm text-gray-500">
            <span className="font-medium">{selectedTenant.stats.devices}</span> devices | 
            <span className="font-medium ml-1">{selectedTenant.stats.revenue}</span> revenue
          </div>
        </div>
      </div>
    </header>
  );
};