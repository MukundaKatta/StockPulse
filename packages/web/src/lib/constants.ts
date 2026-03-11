export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';

export const TIMEFRAMES = [
  { label: '1D', value: '5min', outputSize: 'compact' as const, days: 1 },
  { label: '1W', value: '15min', outputSize: 'compact' as const, days: 7 },
  { label: '1M', value: '30min', outputSize: 'compact' as const, days: 30 },
  { label: '3M', value: 'daily', outputSize: 'compact' as const, days: 90 },
  { label: '1Y', value: 'daily', outputSize: 'full' as const, days: 365 },
  { label: '5Y', value: 'daily', outputSize: 'full' as const, days: 1825 },
  { label: 'MAX', value: 'daily', outputSize: 'full' as const, days: Infinity },
] as const;

export const CHART_COLORS = {
  green: '#22c55e',
  greenMuted: 'rgba(34, 197, 94, 0.15)',
  red: '#ef4444',
  redMuted: 'rgba(239, 68, 68, 0.15)',
  accent: '#6366f1',
  accentSecondary: '#8b5cf6',
  amber: '#f59e0b',
  textPrimary: '#f0f0f5',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  bgPrimary: '#0a0a0f',
  bgSecondary: '#12121a',
  bgTertiary: '#1a1a2e',
  bgHover: '#222236',
  border: 'rgba(255, 255, 255, 0.06)',
  borderActive: 'rgba(99, 102, 241, 0.5)',
} as const;
