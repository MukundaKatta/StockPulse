import { cn } from '@/lib/formatters';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'green' | 'red' | 'amber' | 'gradient';
  className?: string;
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const colorStyles = {
  indigo: 'bg-indigo-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
};

export function ProgressBar({ value, max = 100, label, showValue = false, size = 'md', color = 'indigo', className }: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('space-y-1', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-gray-500">{label}</span>}
          {showValue && <span className="text-xs font-mono text-gray-400">{percent.toFixed(0)}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-white/5 overflow-hidden', sizeStyles[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colorStyles[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
