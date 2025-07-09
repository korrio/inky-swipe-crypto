'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { deviceOperations } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

export const DeviceOperationsModal: React.FC = () => {
  const { deviceOperationsModal, setDeviceOperationsModal, executeOperation } = useApp();
  const { isOpen, device, selectedOperations, isExecuting } = deviceOperationsModal;

  const handleOperationToggle = (operationId: string) => {
    const newSelected = selectedOperations.includes(operationId)
      ? selectedOperations.filter(id => id !== operationId)
      : [...selectedOperations, operationId];
    
    setDeviceOperationsModal({
      ...deviceOperationsModal,
      selectedOperations: newSelected,
    });
  };

  const handleExecute = async () => {
    await executeOperation(selectedOperations);
  };

  const handleClose = () => {
    if (!isExecuting) {
      setDeviceOperationsModal({
        isOpen: false,
        device: null,
        selectedOperations: [],
        isExecuting: false,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      test: 'bg-blue-100 text-blue-800',
      reset: 'bg-orange-100 text-orange-800',
      security: 'bg-red-100 text-red-800',
      communication: 'bg-green-100 text-green-800',
      customization: 'bg-purple-100 text-purple-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      system: 'bg-gray-100 text-gray-800',
      mode: 'bg-indigo-100 text-indigo-800',
      apps: 'bg-pink-100 text-pink-800',
      restrictions: 'bg-red-100 text-red-800',
      management: 'bg-teal-100 text-teal-800',
      information: 'bg-cyan-100 text-cyan-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!device) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Device Operations - {device.name}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Select operations to execute on this device. Multiple operations can be selected.
            </p>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {['test', 'reset', 'security', 'communication', 'customization', 'maintenance', 'system', 'mode', 'apps', 'restrictions', 'management', 'information'].map((category) => {
                const categoryOps = deviceOperations.filter(op => op.category === category);
                if (categoryOps.length === 0) return null;

                return (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm font-medium capitalize">{category}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryOps.map((operation) => (
                        <div 
                          key={operation.id}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                        >
                          <Checkbox
                            checked={selectedOperations.includes(operation.id)}
                            onCheckedChange={() => handleOperationToggle(operation.id)}
                            disabled={isExecuting}
                          />
                          <label className="flex-1 cursor-pointer text-sm">
                            {operation.label}
                          </label>
                          <Badge variant="secondary" className={getCategoryColor(operation.category)}>
                            {operation.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <div className="flex items-center space-x-2">
            {selectedOperations.length > 0 && (
              <span className="text-sm text-gray-500 mr-auto">
                {selectedOperations.length} operation(s) selected
              </span>
            )}
            <Button variant="outline" onClick={handleClose} disabled={isExecuting}>
              Cancel
            </Button>
            <Button 
              onClick={handleExecute} 
              disabled={selectedOperations.length === 0 || isExecuting}
            >
              {isExecuting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isExecuting ? 'Executing...' : 'Execute Operations'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};