import { cn } from '@/lib/formatters';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <input
        className={cn(
          'w-full rounded-lg border border-white/[0.06] bg-[#1a1a2e] px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200',
          'focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
