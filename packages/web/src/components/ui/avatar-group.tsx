import { cn } from '@/lib/formatters';

interface AvatarItem {
  src?: string;
  alt?: string;
  initials?: string;
}

interface AvatarGroupProps {
  avatars: AvatarItem[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
};

const overlapClasses = {
  sm: '-ml-2',
  md: '-ml-2.5',
  lg: '-ml-3',
};

export function AvatarGroup({ avatars, max = 5, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((avatar, idx) => (
        <div
          key={idx}
          className={cn(
            'relative inline-flex items-center justify-center rounded-full',
            'border-2 border-gray-900 bg-gray-700',
            sizeClasses[size],
            idx > 0 && overlapClasses[size]
          )}
          style={{ zIndex: visible.length - idx }}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.alt ?? ''}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="font-medium text-gray-300">
              {avatar.initials ?? '?'}
            </span>
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'relative inline-flex items-center justify-center rounded-full',
            'border-2 border-gray-900 bg-gray-600',
            sizeClasses[size],
            overlapClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          <span className="font-medium text-gray-200">+{overflow}</span>
        </div>
      )}
    </div>
  );
}
