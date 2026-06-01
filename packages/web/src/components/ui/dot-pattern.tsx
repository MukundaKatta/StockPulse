import { cn } from '@/lib/formatters';

interface DotPatternProps {
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DotPattern({
  dotSize = 1.5,
  gap = 20,
  dotColor = 'rgba(255, 255, 255, 0.08)',
  className,
  children,
}: DotPatternProps) {
  const patternId = `dot-pattern-${dotSize}-${gap}`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSize}
              cy={dotSize}
              r={dotSize}
              fill={dotColor}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
