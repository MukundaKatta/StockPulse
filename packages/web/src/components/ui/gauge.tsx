import { cn } from '@/lib/formatters';

interface GaugeProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

function getColor(pct: number): string {
  if (pct >= 0.7) return '#22c55e';
  if (pct >= 0.4) return '#eab308';
  return '#ef4444';
}

export function Gauge({ value, max = 100, size = 80, label, sublabel, className }: GaugeProps) {
  const pct = Math.min(value / max, 1);
  const radius = (size - 8) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - pct);
  const color = getColor(pct);

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <svg width={size} height={size / 2 + 8} className="overflow-visible">
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {label && <p className="text-lg font-bold text-white -mt-4">{label}</p>}
      {sublabel && <p className="text-[10px] text-gray-500 mt-0.5">{sublabel}</p>}
    </div>
  );
}
