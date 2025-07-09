'use client';

import React, { useState, useEffect } from 'react';
import { Bug, X, Smartphone, Wifi, Battery, Info } from 'lucide-react';

interface DebugInfo {
  userAgent: string;
  viewport: { width: number; height: number };
  devicePixelRatio: number;
  online: boolean;
  connection?: any;
  battery?: any;
  orientation: string;
  touchSupport: boolean;
  serviceWorker: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webGL: boolean;
  timestamp: string;
}

const MobileDebugger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    const collectDebugInfo = async (): Promise<DebugInfo> => {
      const info: DebugInfo = {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        devicePixelRatio: window.devicePixelRatio,
        online: navigator.onLine,
        orientation: screen.orientation?.type || 'unknown',
        touchSupport: 'ontouchstart' in window,
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof Storage !== 'undefined',
        indexedDB: 'indexedDB' in window,
        webGL: !!window.WebGLRenderingContext,
        timestamp: new Date().toISOString()
      };

      // Get connection info if available
      if ('connection' in navigator) {
        info.connection = {
          effectiveType: (navigator as any).connection?.effectiveType,
          downlink: (navigator as any).connection?.downlink,
          rtt: (navigator as any).connection?.rtt
        };
      }

      // Get battery info if available
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          info.battery = {
            level: Math.round(battery.level * 100),
            charging: battery.charging
          };
        } catch (e) {
          info.battery = null;
        }
      }

      return info;
    };

    // Collect initial debug info
    collectDebugInfo().then(setDebugInfo);

    // Override console methods to capture logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      setLogs(prev => [...prev.slice(-49), `[LOG] ${args.join(' ')}`]);
    };

    console.error = (...args) => {
      originalError(...args);
      setLogs(prev => [...prev.slice(-49), `[ERROR] ${args.join(' ')}`]);
    };

    console.warn = (...args) => {
      originalWarn(...args);
      setLogs(prev => [...prev.slice(-49), `[WARN] ${args.join(' ')}`]);
    };

    // Listen for errors
    const handleError = (event: ErrorEvent) => {
      setLogs(prev => [...prev.slice(-49), `[ERROR] ${event.message} at ${event.filename}:${event.lineno}`]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      setLogs(prev => [...prev.slice(-49), `[UNHANDLED] ${event.reason}`]);
    });

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', handleError);
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const refreshDebugInfo = () => {
    const collectDebugInfo = async (): Promise<DebugInfo> => {
      const info: DebugInfo = {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        devicePixelRatio: window.devicePixelRatio,
        online: navigator.onLine,
        orientation: screen.orientation?.type || 'unknown',
        touchSupport: 'ontouchstart' in window,
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof Storage !== 'undefined',
        indexedDB: 'indexedDB' in window,
        webGL: !!window.WebGLRenderingContext,
        timestamp: new Date().toISOString()
      };

      if ('connection' in navigator) {
        info.connection = {
          effectiveType: (navigator as any).connection?.effectiveType,
          downlink: (navigator as any).connection?.downlink,
          rtt: (navigator as any).connection?.rtt
        };
      }

      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          info.battery = {
            level: Math.round(battery.level * 100),
            charging: battery.charging
          };
        } catch (e) {
          info.battery = null;
        }
      }

      return info;
    };

    collectDebugInfo().then(setDebugInfo);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
        style={{ zIndex: 9999 }}
      >
        <Bug size={20} />
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" style={{ zIndex: 9999 }}>
          <div className="bg-gray-900 text-white w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <Smartphone size={20} />
                <span>Mobile Debugger</span>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Debug Info */}
            <div className="p-4 space-y-4">
              {/* Device Info */}
              <div>
                <h3 className="font-semibold text-purple-400 mb-2 flex items-center space-x-2">
                  <Info size={16} />
                  <span>Device Info</span>
                </h3>
                {debugInfo && (
                  <div className="space-y-1 text-sm">
                    <p><strong>Viewport:</strong> {debugInfo.viewport.width}x{debugInfo.viewport.height}</p>
                    <p><strong>DPR:</strong> {debugInfo.devicePixelRatio}</p>
                    <p><strong>Orientation:</strong> {debugInfo.orientation}</p>
                    <p><strong>Touch:</strong> {debugInfo.touchSupport ? 'Yes' : 'No'}</p>
                    <p><strong>Online:</strong> {debugInfo.online ? 'Yes' : 'No'}</p>
                    {debugInfo.connection && (
                      <p><strong>Connection:</strong> {debugInfo.connection.effectiveType} ({debugInfo.connection.downlink}Mbps)</p>
                    )}
                    {debugInfo.battery && (
                      <p><strong>Battery:</strong> {debugInfo.battery.level}% {debugInfo.battery.charging ? '(Charging)' : ''}</p>
                    )}
                  </div>
                )}
                <button
                  onClick={refreshDebugInfo}
                  className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                >
                  Refresh
                </button>
              </div>

              {/* Feature Support */}
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">Feature Support</h3>
                {debugInfo && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>ServiceWorker: {debugInfo.serviceWorker ? '✅' : '❌'}</p>
                    <p>LocalStorage: {debugInfo.localStorage ? '✅' : '❌'}</p>
                    <p>SessionStorage: {debugInfo.sessionStorage ? '✅' : '❌'}</p>
                    <p>IndexedDB: {debugInfo.indexedDB ? '✅' : '❌'}</p>
                    <p>WebGL: {debugInfo.webGL ? '✅' : '❌'}</p>
                  </div>
                )}
              </div>

              {/* Console Logs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-400">Console Logs</h3>
                  <button
                    onClick={clearLogs}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Clear
                  </button>
                </div>
                <div className="bg-gray-800 p-2 rounded max-h-40 overflow-y-auto text-xs font-mono">
                  {logs.length === 0 ? (
                    <p className="text-gray-500">No logs yet...</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className={`mb-1 ${
                        log.includes('[ERROR]') ? 'text-red-400' : 
                        log.includes('[WARN]') ? 'text-yellow-400' : 
                        'text-green-400'
                      }`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* User Agent */}
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">User Agent</h3>
                <p className="text-xs break-all bg-gray-800 p-2 rounded">
                  {debugInfo?.userAgent}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileDebugger;