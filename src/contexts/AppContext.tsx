'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tenant, Device, TabType, DeviceOperationsModalState } from '@/types';
import { tenants } from '@/data/mockData';

interface AppContextType {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Tenant management
  selectedTenant: Tenant;
  setSelectedTenant: (tenant: Tenant) => void;
  showTenantDropdown: boolean;
  setShowTenantDropdown: (show: boolean) => void;
  
  // Device management
  selectedDevices: string[];
  setSelectedDevices: (devices: string[]) => void;
  deviceOperationsModal: DeviceOperationsModalState;
  setDeviceOperationsModal: (state: DeviceOperationsModalState) => void;
  
  // Device operations
  executeOperation: (operations: string[]) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(tenants[0]);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [deviceOperationsModal, setDeviceOperationsModal] = useState<DeviceOperationsModalState>({
    isOpen: false,
    device: null,
    selectedOperations: [],
    isExecuting: false,
  });

  const executeOperation = async (operations: string[]) => {
    setDeviceOperationsModal(prev => ({ ...prev, isExecuting: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Executing operations:', operations);
    
    setDeviceOperationsModal({
      isOpen: false,
      device: null,
      selectedOperations: [],
      isExecuting: false,
    });
  };

  const value: AppContextType = {
    activeTab,
    setActiveTab,
    selectedTenant,
    setSelectedTenant,
    showTenantDropdown,
    setShowTenantDropdown,
    selectedDevices,
    setSelectedDevices,
    deviceOperationsModal,
    setDeviceOperationsModal,
    executeOperation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};