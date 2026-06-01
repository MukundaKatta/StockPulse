import { cn } from '@/lib/formatters';

interface KbdShortcutProps {
  keys: string[];
  separator?: string;
  className?: string;
}

export function KbdShortcut({
  keys,
  separator = '+',
  className,
}: KbdShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {keys.map((key, index) => (
        <span key={index} className="inline-flex items-center gap-1">
          {index > 0 && (
            <span className="text-xs text-gray-500">{separator}</span>
          )}
          <kbd
            className={cn(
              'inline-flex items-center justify-center',
              'min-w-[1.5rem] rounded border border-gray-600 bg-gray-800',
              'px-1.5 py-0.5 text-xs font-mono font-medium text-gray-300',
              'shadow-[0_1px_0_1px_rgba(0,0,0,0.3)]'
            )}
          >
            {formatKey(key)}
          </kbd>
        </span>
      ))}
    </span>
  );
}

function formatKey(key: string): string {
  const keyMap: Record<string, string> = {
    cmd: '⌘',
    command: '⌘',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    alt: 'Alt',
    option: '⌥',
    shift: '⇧',
    enter: '↵',
    return: '↵',
    escape: 'Esc',
    esc: 'Esc',
    backspace: '⌫',
    delete: 'Del',
    tab: 'Tab',
    space: '␣',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
  };

  return keyMap[key.toLowerCase()] ?? key.toUpperCase();
}
