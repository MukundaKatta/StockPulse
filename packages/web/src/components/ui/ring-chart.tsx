import { cn } from '@/lib/formatters';

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface RingChartProps {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

export function RingChart({ segments, size = 120, strokeWidth = 12, centerLabel, centerValue, className }: RingChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let accumulated = 0;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((seg) => {
          const pct = total > 0 ? seg.value / total : 0;
          const dashArray = `${pct * circumference} ${circumference}`;
          const offset = -(accumulated / total) * circumference;
          accumulated += seg.value;
          return (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="opacity-60"
            />
          );
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-sm font-bold text-white">{centerValue}</span>}
          {centerLabel && <span className="text-[9px] text-gray-500">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}
