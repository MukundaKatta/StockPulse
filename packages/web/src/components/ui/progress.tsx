import { cn } from '@/lib/formatters';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

const variantColors = {
  default: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

export function Progress({ value, max = 100, variant = 'default', size = 'sm', showLabel }: ProgressProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex-1 rounded-full bg-white/10', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', variantColors[variant])}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 font-mono">{Math.round(percent)}%</span>
      )}
    </div>
  );
}
