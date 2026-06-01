import { cn } from '@/lib/formatters';

interface StackBarProps {
  segments: { label: string; value: number; color: string }[];
  height?: number;
  showLabels?: boolean;
  className?: string;
}

export function StackBar({ segments, height = 12, showLabels = true, className }: StackBarProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex rounded-full overflow-hidden" style={{ height }}>
        {segments.map((seg) => {
          const pct = total > 0 ? (seg.value / total) * 100 : 0;
          if (pct < 0.5) return null;
          return (
            <div key={seg.label} className={cn('h-full transition-all', seg.color)} style={{ width: `${pct}%` }} title={`${seg.label}: ${pct.toFixed(1)}%`} />
          );
        })}
      </div>
      {showLabels && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {segments.filter((s) => s.value > 0).map((seg) => (
            <span key={seg.label} className="inline-flex items-center gap-1 text-[10px] text-gray-500">
              <span className={cn('h-2 w-2 rounded-full', seg.color)} />
              {seg.label} ({total > 0 ? ((seg.value / total) * 100).toFixed(0) : 0}%)
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
