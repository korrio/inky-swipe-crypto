'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { devices } from '@/data/mockData';
import { Device } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Smartphone,
  Battery,
  MapPin,
  DollarSign
} from 'lucide-react';
import { DeviceOperationsModal } from '@/components/modals/DeviceOperationsModal';

interface DeviceCardProps {
  device: Device;
  onManage: (device: Device) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onManage }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'warning': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getFinancingStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'default';
      case 'overdue': return 'destructive';
      case 'completed': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.user}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`} />
            <span className="text-sm text-gray-500">{device.lastSeen}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Battery className="w-4 h-4 text-gray-400" />
            <span className="text-sm">
              <span className={device.batteryLevel < 20 ? 'text-red-500' : ''}>
                {device.batteryLevel}%
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{device.location}</span>
          </div>
        </div>

        {device.financing && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{device.financing!.plan}</span>
              </div>
              <Badge variant={getFinancingStatusColor(device.financing!.status)}>
                {device.financing!.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              Paid: {device.financing!.paid}/{device.financing!.total} • Next: {device.financing!.nextPayment}
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onManage(device)}
          >
            Manage
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const DevicesView: React.FC = () => {
  const { selectedTenant, setDeviceOperationsModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getFilteredDevices = () => {
    let filtered = devices;
    
    if (selectedTenant.name !== 'All Tenants') {
      filtered = filtered.filter(d => d.tenant === selectedTenant.name);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }
    
    return filtered;
  };

  const handleManageDevice = (device: Device) => {
    setDeviceOperationsModal({
      isOpen: true,
      device,
      selectedOperations: [],
      isExecuting: false,
    });
  };

  const filteredDevices = getFilteredDevices();

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search devices, users, or models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onManage={handleManageDevice}
          />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No devices found matching your criteria.</p>
        </div>
      )}

      <DeviceOperationsModal />
    </div>
  );
};