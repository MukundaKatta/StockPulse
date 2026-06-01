import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/formatters';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function InlineEdit({
  value,
  onSave,
  onCancel,
  placeholder = 'Click to edit...',
  className,
  inputClassName,
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    if (draft.trim() !== value) {
      onSave(draft.trim());
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(value);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          'rounded border border-indigo-500 bg-gray-800 px-2 py-1 text-sm text-gray-100',
          'outline-none focus:ring-2 focus:ring-indigo-500/50',
          inputClassName
        )}
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setEditing(true);
      }}
      className={cn(
        'cursor-pointer rounded px-2 py-1 text-sm text-gray-100',
        'hover:bg-gray-700/50 transition-colors',
        !value && 'text-gray-500 italic',
        className
      )}
    >
      {value || placeholder}
    </span>
  );
}
