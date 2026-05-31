export function isMarketOpen(): boolean {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = ny.getDay();
  const hour = ny.getHours();
  const minute = ny.getMinutes();
  const time = hour * 60 + minute;

  if (day === 0 || day === 6) return false;
  return time >= 570 && time < 960; // 9:30 AM - 4:00 PM ET
}

export function isPreMarket(): boolean {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = ny.getDay();
  const hour = ny.getHours();
  const minute = ny.getMinutes();
  const time = hour * 60 + minute;

  if (day === 0 || day === 6) return false;
  return time >= 240 && time < 570; // 4:00 AM - 9:30 AM ET
}

export function isAfterHours(): boolean {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = ny.getDay();
  const hour = ny.getHours();
  const minute = ny.getMinutes();
  const time = hour * 60 + minute;

  if (day === 0 || day === 6) return false;
  return time >= 960 && time < 1200; // 4:00 PM - 8:00 PM ET
}

export function getMarketStatus(): 'open' | 'pre' | 'after' | 'closed' {
  if (isMarketOpen()) return 'open';
  if (isPreMarket()) return 'pre';
  if (isAfterHours()) return 'after';
  return 'closed';
}

export function getNextMarketOpen(): Date {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  let day = ny.getDay();
  let daysToAdd = 0;

  if (day === 6) daysToAdd = 2;
  else if (day === 0) daysToAdd = 1;
  else {
    const time = ny.getHours() * 60 + ny.getMinutes();
    if (time >= 960) daysToAdd = day === 5 ? 3 : 1;
  }

  const next = new Date(now.getTime() + daysToAdd * 86400000);
  next.setHours(9, 30, 0, 0);
  return next;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
