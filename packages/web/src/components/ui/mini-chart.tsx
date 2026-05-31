import { cn } from '@/lib/formatters';

interface MiniChartProps {
  data: number[];
  type?: 'line' | 'bar';
  height?: number;
  className?: string;
  positive?: boolean;
}

export function MiniChart({ data, type = 'line', height = 32, className, positive }: MiniChartProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const isUp = positive ?? data[data.length - 1] >= data[0];
  const color = isUp ? '#22c55e' : '#ef4444';

  if (type === 'bar') {
    return (
      <div className={cn('flex items-end gap-px', className)} style={{ height }}>
        {data.map((val, i) => {
          const h = ((val - min) / range) * 100;
          return (
            <div
              key={i}
              className={cn('flex-1 rounded-t', isUp ? 'bg-green-500/60' : 'bg-red-500/60')}
              style={{ height: `${Math.max(h, 5)}%` }}
            />
          );
        })}
      </div>
    );
  }

  const width = 100;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const areaPoints = [...points, `${width},${height}`, `0,${height}`];

  return (
    <svg width={width} height={height} className={cn('overflow-visible', className)} preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
      <polygon
        points={areaPoints.join(' ')}
        fill={color}
        fillOpacity={0.1}
      />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
