'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  description?: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description }) => {
  return (
    <div className="p-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-32">
          <Construction className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {description || 'This section is under development and will be available soon.'}
          </p>
          <Button variant="outline">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};