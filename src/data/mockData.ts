import { Tenant, Device, FinancingPlan, DeviceOperation, Activity } from '@/types';

export const tenants: Tenant[] = [
  { id: '1', name: '2U Mobile', stats: { devices: 1250, revenue: '฿2.5M', activeFinancing: 850 } },
  { id: '2', name: 'B.Choice BKK', stats: { devices: 890, revenue: '฿1.8M', activeFinancing: 620 } },
  { id: '3', name: 'Buddy Pay', stats: { devices: 675, revenue: '฿1.2M', activeFinancing: 450 } },
  { id: '4', name: 'General', stats: { devices: 1100, revenue: '฿2.1M', activeFinancing: 780 } },
  { id: '5', name: 'KB Mobile', stats: { devices: 950, revenue: '฿1.9M', activeFinancing: 680 } },
  { id: '6', name: 'M Leasing', stats: { devices: 1450, revenue: '฿3.2M', activeFinancing: 1100 } },
  { id: '7', name: 'จริงใจโฟน', stats: { devices: 580, revenue: '฿980K', activeFinancing: 390 } },
  { id: '8', name: 'บานาน่า แม่ปิง', stats: { devices: 720, revenue: '฿1.4M', activeFinancing: 510 } },
];

export const devices: Device[] = [
  { 
    id: '1', 
    name: 'iPhone 12 - สมชาย', 
    model: 'iPhone 12', 
    user: 'สมชาย จันทร์', 
    lastSeen: '2 minutes ago', 
    batteryLevel: 85, 
    location: 'Bangkok', 
    osVersion: 'iOS 17.1',
    tenant: '2U Mobile',
    status: 'online',
    financing: { plan: '12-month', paid: 6, total: 12, nextPayment: 'Dec 15', status: 'on-time' }
  },
  { 
    id: '2', 
    name: 'iPhone 14 Pro - สุภาพร', 
    model: 'iPhone 14 Pro', 
    user: 'สุภาพร แก้ว', 
    lastSeen: '1 hour ago', 
    batteryLevel: 42, 
    location: 'Chiang Mai', 
    osVersion: 'iOS 17.1',
    tenant: 'B.Choice BKK',
    status: 'online',
    financing: { plan: '6-month', paid: 2, total: 6, nextPayment: 'Dec 20', status: 'on-time' }
  },
  { 
    id: '3', 
    name: 'iPhone 13 - พิชัย', 
    model: 'iPhone 13', 
    user: 'พิชัย ทอง', 
    lastSeen: '3 days ago', 
    batteryLevel: 15, 
    location: 'Phuket', 
    osVersion: 'iOS 16.6',
    tenant: '2U Mobile',
    status: 'offline',
    financing: { plan: '3-month', paid: 1, total: 3, nextPayment: 'Dec 10', status: 'overdue' }
  },
  { 
    id: '4', 
    name: 'iPhone 15 - นิภา', 
    model: 'iPhone 15', 
    user: 'นิภา ศรี', 
    lastSeen: '30 minutes ago', 
    batteryLevel: 92, 
    location: 'Bangkok', 
    osVersion: 'iOS 17.1',
    tenant: 'KB Mobile',
    status: 'online',
    financing: { plan: '12-month', paid: 3, total: 12, nextPayment: 'Dec 18', status: 'on-time' }
  },
  { 
    id: '5', 
    name: 'iPhone 11 - วิชัย', 
    model: 'iPhone 11', 
    user: 'วิชัย ใจดี', 
    lastSeen: '5 hours ago', 
    batteryLevel: 68, 
    location: 'Nakhon Ratchasima', 
    osVersion: 'iOS 16.7',
    tenant: 'M Leasing',
    status: 'warning',
    financing: { plan: '6-month', paid: 5, total: 6, nextPayment: 'Dec 25', status: 'on-time' }
  },
];

export const financingPlans: FinancingPlan[] = [
  { months: 3, interestRate: 10, label: '3-Month Plan' },
  { months: 6, interestRate: 6, label: '6-Month Plan' },
  { months: 12, interestRate: 3, label: '12-Month Plan' },
];

export const deviceOperations: DeviceOperation[] = [
  { id: 'test_sound', label: 'ทดสอบเสียง', category: 'test' },
  { id: 'restart', label: 'รีสตาร์ทอุปกรณ์', category: 'reset' },
  { id: 'shutdown', label: 'ปิดเครื่อง', category: 'reset' },
  { id: 'lock', label: 'ล็อคอุปกรณ์', category: 'security' },
  { id: 'unlock', label: 'ปลดล็อคอุปกรณ์', category: 'security' },
  { id: 'reset_passcode', label: 'รีเซ็ตรหัสผ่าน', category: 'security' },
  { id: 'location', label: 'ขอตำแหน่งปัจจุบัน', category: 'information' },
  { id: 'send_message', label: 'ส่งข้อความ', category: 'communication' },
  { id: 'call', label: 'โทรออก', category: 'communication' },
  { id: 'wallpaper', label: 'เปลี่ยนวอลเปเปอร์', category: 'customization' },
  { id: 'update_os', label: 'อัพเดท iOS', category: 'maintenance' },
  { id: 'clear_cache', label: 'ล้างแคช', category: 'maintenance' },
  { id: 'backup', label: 'สำรองข้อมูล', category: 'system' },
  { id: 'restore', label: 'กู้คืนข้อมูล', category: 'system' },
  { id: 'lost_mode', label: 'โหมดอุปกรณ์หาย', category: 'mode' },
  { id: 'install_app', label: 'ติดตั้งแอพ', category: 'apps' },
  { id: 'remove_app', label: 'ลบแอพ', category: 'apps' },
  { id: 'restrict_app', label: 'จำกัดการใช้แอพ', category: 'restrictions' },
  { id: 'restrict_camera', label: 'ปิดกล้อง', category: 'restrictions' },
  { id: 'device_info', label: 'ข้อมูลอุปกรณ์', category: 'information' },
  { id: 'battery_info', label: 'ข้อมูลแบตเตอรี่', category: 'information' },
  { id: 'network_info', label: 'ข้อมูลเครือข่าย', category: 'information' },
];

export const recentActivities: Activity[] = [
  { id: '1', type: 'enrollment', description: 'iPhone 15 - นิภา enrolled', time: '10 minutes ago', icon: '📱', color: 'text-blue-500' },
  { id: '2', type: 'payment', description: 'Payment received from สมชาย จันทร์', time: '1 hour ago', icon: '💰', color: 'text-green-500' },
  { id: '3', type: 'command', description: 'Device locked: iPhone 13 - พิชัย', time: '2 hours ago', icon: '🔒', color: 'text-orange-500' },
  { id: '4', type: 'alert', description: 'Low battery warning: iPhone 13', time: '3 hours ago', icon: '🔋', color: 'text-red-500' },
  { id: '5', type: 'enrollment', description: 'iPhone 14 Pro - สุภาพร enrolled', time: '5 hours ago', icon: '📱', color: 'text-blue-500' },
];