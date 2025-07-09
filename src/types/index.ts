// Tenant type definitions
export interface Tenant {
  id: string;
  name: string;
  stats: {
    devices: number;
    revenue: string;
    activeFinancing: number;
  };
}

// Device type definitions
export interface Device {
  id: string;
  name: string;
  model: string;
  user: string;
  lastSeen: string;
  batteryLevel: number;
  location: string;
  osVersion: string;
  tenant: string;
  status: 'online' | 'offline' | 'warning';
  financing?: DeviceFinancing;
}

export interface DeviceFinancing {
  plan: '3-month' | '6-month' | '12-month';
  paid: number;
  total: number;
  nextPayment: string;
  status: 'on-time' | 'overdue' | 'completed';
}

// Financing type definitions
export interface FinancingPlan {
  months: number;
  interestRate: number;
  label: string;
}

export interface PaymentRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  user: string;
  amount: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  tenant: string;
}

// Device operation type definitions
export interface DeviceOperation {
  id: string;
  label: string;
  category: 'test' | 'reset' | 'security' | 'communication' | 'customization' | 
            'maintenance' | 'system' | 'mode' | 'apps' | 'restrictions' | 
            'management' | 'information';
}

// Navigation type definitions
export type TabType = 'overview' | 'devices' | 'financing' | 'applications' | 
                      'policies' | 'analytics' | 'users' | 'settings';

export interface NavItem {
  id: TabType;
  label: string;
  icon?: string;
  count?: number;
}

// Stats type definitions
export interface StatCard {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// Activity type definitions
export interface Activity {
  id: string;
  type: 'enrollment' | 'payment' | 'command' | 'alert';
  description: string;
  time: string;
  icon?: string;
  color?: string;
}

// Financing stats type definitions
export interface FinancingStats {
  totalRevenue: number;
  collectionRate: number;
  activeContracts: number;
  overdueAmount: number;
}

// Modal state type definitions
export interface DeviceOperationsModalState {
  isOpen: boolean;
  device: Device | null;
  selectedOperations: string[];
  isExecuting: boolean;
}