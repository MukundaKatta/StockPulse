'use client';

import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.06] bg-[#12121a] p-8">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">Something went wrong</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
