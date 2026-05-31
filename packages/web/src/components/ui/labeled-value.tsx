import { cn } from '@/lib/formatters';

interface LabeledValueProps {
  label: string;
  value: string | number;
  valueColor?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function LabeledValue({ label, value, valueColor = 'text-white', size = 'md', align = 'left', className }: LabeledValueProps) {
  const labelSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';
  const valSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm';
  const alignment = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={cn(alignment, className)}>
      <p className={cn(labelSize, 'text-gray-500 uppercase tracking-wide')}>{label}</p>
      <p className={cn(valSize, 'font-bold font-mono mt-0.5', valueColor)}>{value}</p>
    </div>
  );
}
