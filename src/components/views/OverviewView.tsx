'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { devices, recentActivities, financingPlans } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  DollarSign, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center mt-2">
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.value}%
                </span>
              </div>
            )}
          </div>
          <div className="text-gray-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const OverviewView: React.FC = () => {
  const { selectedTenant } = useApp();
  
  const getFilteredDevices = () => {
    if (selectedTenant.name === 'All Tenants') return devices;
    return devices.filter(d => d.tenant === selectedTenant.name);
  };

  const filteredDevices = getFilteredDevices();
  const onlineDevices = filteredDevices.filter(d => d.status === 'online').length;
  const warningDevices = filteredDevices.filter(d => d.status === 'warning').length;
  const totalRevenue = filteredDevices.reduce((sum, d) => {
    if (d.financing) {
      const plan = financingPlans.find(p => p.months === parseInt(d.financing!.plan));
      return sum + (25000 * (1 + (plan?.interestRate || 0) / 100));
    }
    return sum;
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Devices"
          value={filteredDevices.length}
          subtitle={`${onlineDevices} online`}
          icon={<Smartphone className="w-8 h-8" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`฿${(totalRevenue / 1000).toFixed(1)}K`}
          subtitle="This month"
          icon={<DollarSign className="w-8 h-8" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Compliance Rate"
          value="94%"
          subtitle={`${warningDevices} warnings`}
          icon={<CheckCircle className="w-8 h-8" />}
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Active Financing"
          value={filteredDevices.filter(d => d.financing).length}
          subtitle="Contracts"
          icon={<AlertCircle className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant={
                    activity.type === 'payment' ? 'default' :
                    activity.type === 'alert' ? 'destructive' :
                    'secondary'
                  }>
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financingPlans.map((plan) => {
                const count = filteredDevices.filter(d => 
                  d.financing?.plan === `${plan.months}-month`
                ).length;
                const percentage = filteredDevices.filter(d => d.financing).length > 0
                  ? (count / filteredDevices.filter(d => d.financing).length) * 100
                  : 0;

                return (
                  <div key={plan.months} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{plan.label}</span>
                      <span className="text-gray-500">{count} devices</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};