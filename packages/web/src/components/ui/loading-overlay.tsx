import { cn } from '@/lib/formatters';

interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ visible = true, message, className }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm',
        className
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-indigo-500" />
      {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
    </div>
  );
}
