'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const AddToHomeButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if running on mobile device
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);

    // Check if app is already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt so we can show our custom one
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      
      // Show our custom prompt after a short delay to avoid conflicts
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 1000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Show the install prompt
        await deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setShowInstallPrompt(false);
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clean up the deferred prompt
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error showing install prompt:', error);
        // If there's an error, hide our custom prompt
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  // Don't show if already installed, on mobile, or if no install prompt available
  if (isStandalone || isMobile || (!showInstallPrompt && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 pointer-events-auto">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Download size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Install Inky</h3>
              <p className="text-gray-400 text-xs">
                {isIOS 
                  ? 'Tap Share → Add to Home Screen' 
                  : 'Add to your home screen for quick access'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Install
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white transition-colors p-2 -m-2 touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {isIOS && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <span>1. Tap the Share button</span>
              <span>•</span>
              <span>2. Select "Add to Home Screen"</span>
              <span>•</span>
              <span>3. Tap "Add"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToHomeButton;