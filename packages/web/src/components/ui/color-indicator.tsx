import { cn } from '@/lib/formatters';

interface ColorIndicatorProps {
  value: number;
  min?: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ColorIndicator({ value, min = -100, max = 100, showLabel = true, size = 'md', className }: ColorIndicatorProps) {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const hue = normalized * 120; // 0 = red, 60 = yellow, 120 = green

  const sizeClass = size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn('rounded-full', sizeClass)}
        style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }}
      />
      {showLabel && <span className="text-xs font-mono text-gray-300">{value.toFixed(1)}</span>}
    </span>
  );
}

interface HeatColorProps {
  value: number;
  children: React.ReactNode;
  className?: string;
}

export function HeatColor({ value, children, className }: HeatColorProps) {
  const color = value > 0 ? `rgba(34, 197, 94, ${Math.min(Math.abs(value) / 5, 1) * 0.3})` : value < 0 ? `rgba(239, 68, 68, ${Math.min(Math.abs(value) / 5, 1) * 0.3})` : 'transparent';

  return (
    <span className={cn('px-1.5 py-0.5 rounded', className)} style={{ backgroundColor: color }}>
      {children}
    </span>
  );
}
