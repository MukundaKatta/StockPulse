export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';

export const TIMEFRAMES = [
  { label: '1D', value: '5min' },
  { label: '1W', value: '15min' },
  { label: '1M', value: '30min' },
  { label: '3M', value: '60min' },
  { label: '1Y', value: 'daily' },
  { label: '5Y', value: 'daily' },
  { label: 'MAX', value: 'daily' },
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
