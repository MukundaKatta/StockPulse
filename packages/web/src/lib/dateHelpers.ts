export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isMarketOpen(date: Date = new Date()): boolean {
  if (isWeekend(date)) return false;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes >= 14 * 60 + 30 && totalMinutes < 21 * 60;
}

export function nextBusinessDay(date: Date): Date {
  const next = new Date(date);
  do {
    next.setDate(next.getDate() + 1);
  } while (isWeekend(next));
  return next;
}

export function prevBusinessDay(date: Date): Date {
  const prev = new Date(date);
  do {
    prev.setDate(prev.getDate() - 1);
  } while (isWeekend(prev));
  return prev;
}

export function businessDaysBetween(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  while (current < end) {
    current.setDate(current.getDate() + 1);
    if (!isWeekend(current)) count++;
  }
  return count;
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return `${Math.floor(diffDay / 30)}mo ago`;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
