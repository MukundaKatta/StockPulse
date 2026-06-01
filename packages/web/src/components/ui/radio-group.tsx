import { cn } from '@/lib/formatters';

interface RadioItem {
  label: string;
  value: string;
}

interface RadioGroupProps {
  items: RadioItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ items, value, onChange, className }: RadioGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => (
        <label
          key={item.value}
          className="flex cursor-pointer items-center gap-2 text-sm text-gray-300"
        >
          <span
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded-full border',
              value === item.value
                ? 'border-indigo-500 bg-indigo-500'
                : 'border-gray-600 bg-transparent'
            )}
          >
            {value === item.value && (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </span>
          <input
            type="radio"
            className="sr-only"
            checked={value === item.value}
            onChange={() => onChange(item.value)}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}
