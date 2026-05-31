import { cn } from '@/lib/formatters';

interface DataBadgeProps {
  label: string;
  value: string | number;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'gray';
  className?: string;
}

const COLORS = {
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  blue: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  gray: 'bg-white/5 text-gray-400 border-white/10',
};

export function DataBadge({ label, value, color = 'gray', className }: DataBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-mono', COLORS[color], className)}>
      <span className="text-gray-500">{label}:</span>
      <span className="font-bold">{value}</span>
    </span>
  );
}
