import { cn } from '@/lib/formatters';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-white/[0.06] bg-[#0a0a12] px-3 py-2 text-sm text-gray-200 placeholder-gray-500',
        'focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30',
        'resize-vertical min-h-[80px]',
        className
      )}
      {...props}
    />
  );
}
