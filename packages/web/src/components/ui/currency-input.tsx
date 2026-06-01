import { cn } from '@/lib/formatters';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({ value, onChange, placeholder = '0.00', className }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">$</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-white/[0.06] bg-[#0a0a12] py-2 pl-7 pr-3 text-sm text-gray-200 placeholder-gray-500',
          'focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30'
        )}
      />
    </div>
  );
}
