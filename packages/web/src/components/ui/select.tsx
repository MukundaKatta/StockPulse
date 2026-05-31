import { cn } from '@/lib/formatters';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full appearance-none rounded-lg border border-white/[0.06] bg-[#1a1a2e] px-4 py-2.5 pr-10 text-sm text-white outline-none transition-all duration-200',
            'focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
