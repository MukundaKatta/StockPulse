'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-400" />
        <h2 className="mt-4 text-xl font-bold text-white">Something went wrong</h2>
        <p className="mt-2 max-w-md text-sm text-gray-500">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="mt-6">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
