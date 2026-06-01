import { cn } from '@/lib/formatters';

interface HighlightTextProps {
  text: string;
  query: string;
  highlightClassName?: string;
  className?: string;
}

export function HighlightText({
  text,
  query,
  highlightClassName,
  className,
}: HighlightTextProps) {
  if (!query.trim()) {
    return <span className={className}>{text}</span>;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className={cn(
              'bg-amber-500/30 text-amber-200 rounded-sm px-0.5',
              highlightClassName
            )}
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}
