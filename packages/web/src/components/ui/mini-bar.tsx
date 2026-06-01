import { cn } from '@/lib/formatters';

interface MiniBarProps {
  value: number;
  max?: number;
  min?: number;
  color?: string;
  negativeColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MiniBar({ value, max = 100, min = 0, color = 'bg-indigo-500', negativeColor = 'bg-red-500', width = 48, height = 12, className }: MiniBarProps) {
  const range = max - min;
  const hasNegative = min < 0;

  if (hasNegative) {
    const zeroPos = Math.abs(min) / range;
    const barWidth = Math.abs(value) / range;
    const isNeg = value < 0;

    return (
      <div className={cn('relative rounded bg-white/5', className)} style={{ width, height }}>
        <div className="absolute top-0 bottom-0 w-px bg-gray-600" style={{ left: `${zeroPos * 100}%` }} />
        <div
          className={cn('absolute top-0 bottom-0 rounded', isNeg ? negativeColor : color)}
          style={{
            left: isNeg ? `${(zeroPos - barWidth) * 100}%` : `${zeroPos * 100}%`,
            width: `${barWidth * 100}%`,
          }}
        />
      </div>
    );
  }

  const pct = Math.min(100, Math.max(0, ((value - min) / range) * 100));
  return (
    <div className={cn('rounded bg-white/5', className)} style={{ width, height }}>
      <div className={cn('h-full rounded', color)} style={{ width: `${pct}%` }} />
    </div>
  );
}
