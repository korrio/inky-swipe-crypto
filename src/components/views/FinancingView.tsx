'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { devices, financingPlans } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface FinancingCardProps {
  plan: string;
  count: number;
  revenue: number;
  onTime: number;
  overdue: number;
}

const FinancingCard: React.FC<FinancingCardProps> = ({ plan, count, revenue, onTime, overdue }) => {
  const completionRate = count > 0 ? (onTime / count) * 100 : 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">{plan}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Active Contracts</span>
            <span className="font-medium">{count}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Revenue</span>
            <span className="font-medium">฿{(revenue / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">On-Time Rate</span>
            <span className={`font-medium ${completionRate >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
              {completionRate.toFixed(0)}%
            </span>
          </div>
          {overdue > 0 && (
            <div className="flex items-center text-red-600 text-sm mt-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              {overdue} overdue
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const FinancingView: React.FC = () => {
  const { selectedTenant } = useApp();

  const getFilteredDevices = () => {
    if (selectedTenant.name === 'All Tenants') return devices;
    return devices.filter(d => d.tenant === selectedTenant.name);
  };

  const filteredDevices = getFilteredDevices();
  const financedDevices = filteredDevices.filter(d => d.financing);

  const calculateStats = () => {
    const stats = {
      totalRevenue: 0,
      collectionRate: 0,
      activeContracts: financedDevices.length,
      overdueAmount: 0,
    };

    financedDevices.forEach(device => {
      if (device.financing) {
        const plan = financingPlans.find(p => p.months === parseInt(device.financing!.plan));
        const deviceRevenue = 25000 * (1 + (plan?.interestRate || 0) / 100);
        stats.totalRevenue += deviceRevenue;
        
        if (device.financing!.status === 'overdue') {
          stats.overdueAmount += deviceRevenue / device.financing!.total;
        }
      }
    });

    const onTimeCount = financedDevices.filter(d => d.financing?.status === 'on-time').length;
    stats.collectionRate = financedDevices.length > 0 
      ? (onTimeCount / financedDevices.length) * 100 
      : 0;

    return stats;
  };

  const stats = calculateStats();

  const getPlanStats = (planMonths: number) => {
    const planDevices = financedDevices.filter(d => 
      d.financing?.plan === `${planMonths}-month`
    );
    const plan = financingPlans.find(p => p.months === planMonths);
    
    return {
      count: planDevices.length,
      revenue: planDevices.length * 25000 * (1 + (plan?.interestRate || 0) / 100),
      onTime: planDevices.filter(d => d.financing?.status === 'on-time').length,
      overdue: planDevices.filter(d => d.financing?.status === 'overdue').length,
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">฿{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Collection Rate</p>
                <p className="text-2xl font-bold mt-1">{stats.collectionRate.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Contracts</p>
                <p className="text-2xl font-bold mt-1">{stats.activeContracts}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue Amount</p>
                <p className="text-2xl font-bold mt-1">฿{(stats.overdueAmount / 1000).toFixed(1)}K</p>
              </div>
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FinancingCard 
          plan="3-Month Plan (10% interest)"
          {...getPlanStats(3)}
        />
        <FinancingCard 
          plan="6-Month Plan (6% interest)"
          {...getPlanStats(6)}
        />
        <FinancingCard 
          plan="12-Month Plan (3% interest)"
          {...getPlanStats(12)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financedDevices.map((device) => {
                if (!device.financing) return null;
                const plan = financingPlans.find(p => p.months === parseInt(device.financing!.plan));
                const monthlyAmount = (25000 * (1 + (plan?.interestRate || 0) / 100)) / device.financing!.total;
                
                return (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.model}</TableCell>
                    <TableCell>{device.user}</TableCell>
                    <TableCell>{device.financing!.plan}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(device.financing!.paid / device.financing!.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {device.financing!.paid}/{device.financing!.total}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{device.financing!.nextPayment}</span>
                      </div>
                    </TableCell>
                    <TableCell>฿{monthlyAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        device.financing!.status === 'on-time' ? 'default' :
                        device.financing!.status === 'overdue' ? 'destructive' :
                        'secondary'
                      }>
                        {device.financing!.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};