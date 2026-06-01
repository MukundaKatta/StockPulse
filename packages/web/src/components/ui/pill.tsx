import { cn } from '@/lib/formatters';

interface PillProps {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'gray';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const COLORS = {
  green: 'bg-green-500/10 text-green-400',
  red: 'bg-red-500/10 text-red-400',
  blue: 'bg-indigo-500/10 text-indigo-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  purple: 'bg-purple-500/10 text-purple-400',
  gray: 'bg-white/5 text-gray-400',
};

const DOT_COLORS = {
  green: 'bg-green-400',
  red: 'bg-red-400',
  blue: 'bg-indigo-400',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-400',
  gray: 'bg-gray-400',
};

export function Pill({ children, color = 'gray', size = 'md', dot = false, className }: PillProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs', COLORS[color], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', DOT_COLORS[color])} />}
      {children}
    </span>
  );
}
