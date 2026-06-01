export type KeyCombo = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export function matchesKeyCombo(event: KeyboardEvent, combo: KeyCombo): boolean {
  return (
    event.key.toLowerCase() === combo.key.toLowerCase() &&
    !!event.ctrlKey === !!combo.ctrl &&
    !!event.shiftKey === !!combo.shift &&
    !!event.altKey === !!combo.alt &&
    !!event.metaKey === !!combo.meta
  );
}

export function formatKeyCombo(combo: KeyCombo): string {
  const parts: string[] = [];
  if (combo.ctrl) parts.push('Ctrl');
  if (combo.alt) parts.push('Alt');
  if (combo.shift) parts.push('Shift');
  if (combo.meta) parts.push('⌘');
  parts.push(combo.key.length === 1 ? combo.key.toUpperCase() : combo.key);
  return parts.join('+');
}

export function isModifierKey(key: string): boolean {
  return ['Control', 'Shift', 'Alt', 'Meta'].includes(key);
}

export function isNavigationKey(key: string): boolean {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(key);
}

export function isActionKey(key: string): boolean {
  return ['Enter', 'Escape', 'Tab', 'Backspace', 'Delete', 'Space', ' '].includes(key);
}
