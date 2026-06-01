import { cn } from '@/lib/formatters';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
}

export function ProgressRing({
  percentage,
  size = 64,
  strokeWidth = 4,
  className,
  color = 'stroke-indigo-500',
  trackColor = 'stroke-gray-700',
  showLabel = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(color, 'transition-all duration-500 ease-in-out')}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-semibold text-gray-200">
          {Math.round(clampedPercent)}%
        </span>
      )}
    </div>
  );
}
