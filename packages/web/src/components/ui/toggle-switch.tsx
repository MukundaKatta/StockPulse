'use client';

import { cn } from '@/lib/formatters';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { track: 'h-5 w-9', thumb: 'h-3.5 w-3.5', translate: 'translate-x-4' },
  md: { track: 'h-6 w-11', thumb: 'h-4.5 w-4.5', translate: 'translate-x-5' },
  lg: { track: 'h-7 w-14', thumb: 'h-5.5 w-5.5', translate: 'translate-x-7' },
};

export function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className,
}: ToggleSwitchProps) {
  const s = sizes[size];

  return (
    <label
      className={cn(
        'inline-flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900',
          s.track,
          checked ? 'bg-indigo-600' : 'bg-gray-600'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-lg',
            'transform transition-transform duration-200 ease-in-out',
            s.thumb,
            checked ? s.translate : 'translate-x-0.5'
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-300">{label}</span>
      )}
    </label>
  );
}
