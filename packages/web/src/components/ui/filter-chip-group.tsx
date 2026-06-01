'use client';

import { cn } from '@/lib/formatters';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterChipGroupProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function FilterChipGroup({ options, selected, onChange, className }: FilterChipGroupProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium',
              'border transition-all duration-150',
              isSelected
                ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/10'
                : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-300'
            )}
          >
            {isSelected && (
              <svg
                className="mr-1.5 h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
