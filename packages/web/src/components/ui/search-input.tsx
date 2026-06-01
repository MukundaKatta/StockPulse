import { Search } from 'lucide-react';
import { cn } from '@/lib/formatters';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-white/[0.06] bg-[#0a0a12] py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500',
          'focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30'
        )}
      />
    </div>
  );
}
