import { cn } from '@/lib/formatters';

interface ColorDotProps {
  color: 'green' | 'red' | 'amber' | 'blue' | 'indigo' | 'gray';
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const colorMap = {
  green: 'bg-green-400',
  red: 'bg-red-400',
  amber: 'bg-amber-400',
  blue: 'bg-blue-400',
  indigo: 'bg-indigo-400',
  gray: 'bg-gray-400',
};

const pulseColorMap = {
  green: 'bg-green-400/50',
  red: 'bg-red-400/50',
  amber: 'bg-amber-400/50',
  blue: 'bg-blue-400/50',
  indigo: 'bg-indigo-400/50',
  gray: 'bg-gray-400/50',
};

export function ColorDot({ color, pulse, size = 'md', className }: ColorDotProps) {
  const sizeClass = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';

  return (
    <span className={cn('relative inline-flex', className)}>
      {pulse && (
        <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', pulseColorMap[color])} />
      )}
      <span className={cn('relative inline-flex rounded-full', sizeClass, colorMap[color])} />
    </span>
  );
}
