import { cn } from '@/lib/formatters';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const VARIANT_STYLES = {
  default: 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10',
  ghost: 'hover:bg-white/5 text-gray-400',
  outline: 'border border-white/10 hover:bg-white/5 text-gray-400',
};

const SIZE_STYLES = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

export function IconButton({ icon, variant = 'default', size = 'md', className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
