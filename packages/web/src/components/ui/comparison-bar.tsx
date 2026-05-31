import { cn } from '@/lib/formatters';

interface ComparisonBarProps {
  leftValue: number;
  rightValue: number;
  leftLabel?: string;
  rightLabel?: string;
  leftColor?: string;
  rightColor?: string;
  className?: string;
}

export function ComparisonBar({
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
  leftColor = 'bg-red-500/40',
  rightColor = 'bg-green-500/40',
  className,
}: ComparisonBarProps) {
  const total = leftValue + rightValue;
  const leftPct = total > 0 ? (leftValue / total) * 100 : 50;

  return (
    <div className={cn('space-y-1', className)}>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
      <div className="h-3 rounded-full bg-white/5 overflow-hidden flex">
        <div className={cn('h-full transition-all', leftColor)} style={{ width: `${leftPct}%` }} />
        <div className={cn('h-full flex-1', rightColor)} />
      </div>
      <div className="flex justify-between text-[10px] font-mono">
        <span className="text-red-400">{leftPct.toFixed(0)}%</span>
        <span className="text-green-400">{(100 - leftPct).toFixed(0)}%</span>
      </div>
    </div>
  );
}
