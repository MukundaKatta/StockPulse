import { cn } from '@/lib/formatters';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'gray';
  onRemove?: () => void;
  className?: string;
}

const COLORS = {
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  blue: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  gray: 'bg-white/5 text-gray-400 border-white/10',
};

export function Chip({ label, color = 'gray', onRemove, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        COLORS[color],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </span>
  );
}
