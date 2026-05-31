import { cn } from '@/lib/formatters';

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn('border-t border-white/[0.06]', className)} />;
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 border-t border-white/[0.06]" />
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <div className="flex-1 border-t border-white/[0.06]" />
    </div>
  );
}
