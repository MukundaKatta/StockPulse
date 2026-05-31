import { cn } from '@/lib/formatters';

interface ScoreRingProps {
  score: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ScoreRing({ score, max = 100, size = 64, strokeWidth = 4, label, className }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / max, 1);
  const offset = circumference * (1 - progress);

  const getColor = () => {
    if (progress >= 0.7) return '#22c55e';
    if (progress >= 0.4) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-white">{Math.round(score)}</span>
        {label && <span className="text-[8px] text-gray-500">{label}</span>}
      </div>
    </div>
  );
}
