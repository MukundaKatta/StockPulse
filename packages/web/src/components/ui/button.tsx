import { cn } from '@/lib/formatters';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  secondary: 'bg-[#1a1a2e] hover:bg-[#222236] text-gray-300 border border-white/[0.06]',
  ghost: 'hover:bg-white/5 text-gray-400',
  danger: 'bg-red-600/10 hover:bg-red-600/20 text-red-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
