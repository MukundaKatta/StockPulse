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

export const SECTOR_ETFS: Record<string, string> = {
  'Technology': 'XLK',
  'Healthcare': 'XLV',
  'Financials': 'XLF',
  'Consumer Discretionary': 'XLY',
  'Consumer Staples': 'XLP',
  'Energy': 'XLE',
  'Materials': 'XLB',
  'Industrials': 'XLI',
  'Real Estate': 'XLRE',
  'Utilities': 'XLU',
  'Communication Services': 'XLC',
};

export const POPULAR_STOCKS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'BRK.B',
  'JPM', 'V', 'UNH', 'JNJ', 'XOM', 'WMT', 'MA', 'PG',
  'HD', 'CVX', 'MRK', 'ABBV', 'KO', 'PEP', 'AVGO', 'COST',
] as const;

export const API_ENDPOINTS = {
  QUOTE: (symbol: string) => `/api/stocks/${symbol}/quote`,
  HISTORY: (symbol: string) => `/api/stocks/${symbol}/history`,
  OVERVIEW: (symbol: string) => `/api/stocks/${symbol}/overview`,
  TECHNICALS: (symbol: string) => `/api/stocks/${symbol}/technicals`,
  NEWS: (symbol: string) => `/api/stocks/${symbol}/news`,
  SEARCH: '/api/stocks/search',
  BATCH_QUOTES: '/api/stocks/batch/quotes',
} as const;
