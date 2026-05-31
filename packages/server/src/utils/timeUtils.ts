export function isMarketOpen(): boolean {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();
  const hours = eastern.getHours();
  const minutes = eastern.getMinutes();
  const time = hours * 60 + minutes;

  if (day === 0 || day === 6) return false;
  return time >= 570 && time < 960; // 9:30 - 16:00
}

export function isPreMarket(): boolean {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();
  const hours = eastern.getHours();
  const minutes = eastern.getMinutes();
  const time = hours * 60 + minutes;

  if (day === 0 || day === 6) return false;
  return time >= 240 && time < 570; // 4:00 - 9:30
}

export function isAfterHours(): boolean {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();
  const hours = eastern.getHours();
  const minutes = eastern.getMinutes();
  const time = hours * 60 + minutes;

  if (day === 0 || day === 6) return false;
  return time >= 960 && time < 1200; // 16:00 - 20:00
}

export function getMarketCountdown(): { hours: number; minutes: number } | null {
  if (isMarketOpen()) return null;
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();

  let nextOpen = new Date(eastern);
  nextOpen.setHours(9, 30, 0, 0);

  if (eastern.getHours() * 60 + eastern.getMinutes() >= 570) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  while (nextOpen.getDay() === 0 || nextOpen.getDay() === 6) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  const diff = nextOpen.getTime() - eastern.getTime();
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
}

export function getQuarter(date: Date = new Date()): string {
  const q = Math.ceil((date.getMonth() + 1) / 3);
  return `Q${q} ${date.getFullYear()}`;
}

export function getTradeDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function daysBetween(a: Date | string, b: Date | string): number {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round(Math.abs(d2 - d1) / 86400000);
}
