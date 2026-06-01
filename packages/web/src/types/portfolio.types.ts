export interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  costBasis: number;
  unrealizedGain: number;
  unrealizedGainPct: number;
  weight: number;
  dayChange: number;
  dayChangePct: number;
  sector: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPct: number;
  dayChange: number;
  dayChangePct: number;
  cash: number;
  holdingsCount: number;
}

export interface PortfolioAllocation {
  category: string;
  weight: number;
  value: number;
  performance: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell' | 'dividend' | 'split';
  shares: number;
  price: number;
  total: number;
  date: string;
  fees: number;
}

export interface PerformancePoint {
  date: string;
  value: number;
  benchmark: number;
}
