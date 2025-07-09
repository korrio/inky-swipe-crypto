'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OverviewView } from '@/components/views/OverviewView';
import { DevicesView } from '@/components/views/DevicesView';
import { FinancingView } from '@/components/views/FinancingView';
import { PlaceholderView } from '@/components/views/PlaceholderView';

export const Dashboard: React.FC = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'devices':
        return <DevicesView />;
      case 'financing':
        return <FinancingView />;
      case 'applications':
        return (
          <PlaceholderView 
            title="Application Management" 
            description="Deploy and manage applications across your device fleet. Configure app restrictions and monitor installation status."
          />
        );
      case 'policies':
        return (
          <PlaceholderView 
            title="Security Policies" 
            description="Create and enforce security policies for your devices. Set passcode requirements, restrictions, and compliance rules."
          />
        );
      case 'analytics':
        return (
          <PlaceholderView 
            title="Analytics & Reports" 
            description="View detailed analytics and generate reports on device usage, compliance, and financing performance."
          />
        );
      case 'users':
        return (
          <PlaceholderView 
            title="User Management" 
            description="Manage user accounts, permissions, and access controls for your MDM system."
          />
        );
      case 'settings':
        return (
          <PlaceholderView 
            title="System Settings" 
            description="Configure system-wide settings, integrations, and tenant-specific customizations."
          />
        );
      default:
        return <OverviewView />;
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
};