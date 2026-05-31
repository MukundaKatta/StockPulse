import { cn } from '@/lib/formatters';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  onRemove?: () => void;
  color?: 'default' | 'indigo' | 'green' | 'red' | 'amber';
  className?: string;
}

const colorStyles = {
  default: 'bg-white/5 text-gray-300 border-white/[0.06]',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function Tag({ label, onRemove, color = 'default', className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium', colorStyles[color], className)}>
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 rounded-full p-0.5 hover:bg-white/10 transition-colors">
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </span>
  );
}
