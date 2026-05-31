import { cn } from '@/lib/formatters';
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';

interface AlertBannerProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const typeStyles = {
  info: { bg: 'bg-blue-500/5 border-blue-500/20', icon: Info, iconColor: 'text-blue-400' },
  success: { bg: 'bg-green-500/5 border-green-500/20', icon: CheckCircle, iconColor: 'text-green-400' },
  warning: { bg: 'bg-amber-500/5 border-amber-500/20', icon: AlertTriangle, iconColor: 'text-amber-400' },
  error: { bg: 'bg-red-500/5 border-red-500/20', icon: XCircle, iconColor: 'text-red-400' },
};

export function AlertBanner({ type = 'info', title, message, dismissible, onDismiss, className }: AlertBannerProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div className={cn('flex items-start gap-3 rounded-lg border p-3', styles.bg, className)}>
      <Icon className={cn('h-4 w-4 shrink-0 mt-0.5', styles.iconColor)} />
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-medium text-white">{title}</p>}
        <p className={cn('text-xs text-gray-400', title && 'mt-0.5')}>{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button onClick={onDismiss} className="text-gray-600 hover:text-gray-400 p-0.5">
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
