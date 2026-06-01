export type ScreenerMetric = 'market_cap' | 'pe_ratio' | 'pb_ratio' | 'ps_ratio' | 'dividend_yield' | 'revenue_growth' | 'earnings_growth' | 'profit_margin' | 'roe' | 'roa' | 'debt_to_equity' | 'current_ratio' | 'beta' | 'rsi' | 'price_change_1d' | 'price_change_1w' | 'price_change_1m' | 'volume' | 'avg_volume';

export type ScreenerOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'between';

export interface ScreenerFilter {
  metric: ScreenerMetric;
  operator: ScreenerOperator;
  value: number;
  value2?: number;
}

export interface ScreenerPreset {
  id: string;
  name: string;
  description: string;
  filters: ScreenerFilter[];
  sortBy: ScreenerMetric;
  sortOrder: 'asc' | 'desc';
}

export interface ScreenerResult {
  symbol: string;
  name: string;
  sector: string;
  metrics: Record<ScreenerMetric, number | null>;
}

export interface ScreenerResponse {
  results: ScreenerResult[];
  total: number;
  page: number;
  pageSize: number;
  appliedFilters: ScreenerFilter[];
}
