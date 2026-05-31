'use client';

import { cn } from '@/lib/formatters';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastNotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'border-green-500/20 bg-green-500/5',
  error: 'border-red-500/20 bg-red-500/5',
  warning: 'border-amber-500/20 bg-amber-500/5',
  info: 'border-indigo-500/20 bg-indigo-500/5',
};

const iconColorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  info: 'text-indigo-400',
};

export function ToastNotification({ type, title, message, onClose }: ToastNotificationProps) {
  const Icon = iconMap[type];

  return (
    <div className={cn('flex items-start gap-3 rounded-lg border p-3', colorMap[type])}>
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColorMap[type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        {message && <p className="mt-0.5 text-xs text-gray-400">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
