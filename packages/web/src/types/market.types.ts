export interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  timestamp: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePct: number;
  region: string;
}

export interface Sector {
  name: string;
  etf: string;
  performance1d: number;
  performance1w: number;
  performance1m: number;
  performanceYtd: number;
}

export interface MarketBreadth {
  advancing: number;
  declining: number;
  unchanged: number;
  newHighs: number;
  newLows: number;
  advanceVolume: number;
  declineVolume: number;
}

export type Timeframe = '1D' | '1W' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | 'MAX';

export type MarketSession = 'pre' | 'regular' | 'post' | 'closed';
