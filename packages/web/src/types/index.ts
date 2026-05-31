export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  latestDay: string;
  previousClose: number;
  open: number;
  high: number;
  low: number;
}

export interface OHLCV {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
}

export interface TechnicalIndicators {
  rsi: { values: (number | null)[]; current: number | null };
  macd: {
    macd: (number | null)[];
    signal: (number | null)[];
    histogram: (number | null)[];
    current: { macd: number | null; signal: number | null; histogram: number | null };
  };
  sma: {
    sma20: (number | null)[];
    sma50: (number | null)[];
    sma200: (number | null)[];
  };
  ema: {
    ema12: (number | null)[];
    ema26: (number | null)[];
  };
  bollingerBands: {
    upper: (number | null)[];
    middle: (number | null)[];
    lower: (number | null)[];
  };
  vwap: (number | null)[];
  signal: SignalSummary;
  timestamps: string[];
}

export interface SignalSummary {
  signal: 'BUY' | 'HOLD' | 'SELL';
  confidence: number;
  reasons: string[];
}

export interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface Portfolio {
  id: string;
  name: string;
  userId: string;
  trades: Trade[];
  createdAt: string;
  updatedAt: string;
}

export interface Trade {
  id: string;
  portfolioId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  fee: number;
  date: string;
  notes?: string;
}

export interface Holding {
  symbol: string;
  quantity: number;
  totalCost: number;
  totalFees: number;
  avgCost: number;
}

export interface Watchlist {
  id: string;
  name: string;
  userId: string;
  items: WatchlistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface WatchlistItem {
  id: string;
  watchlistId: string;
  symbol: string;
  addedAt: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface CompanyOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  ForwardPE: string;
  PEGRatio: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToEBITDA: string;
  EPS: string;
  DividendYield: string;
  '52WeekHigh': string;
  '52WeekLow': string;
  '50DayMovingAverage': string;
  '200DayMovingAverage': string;
  Beta: string;
  SharesOutstanding: string;
  BookValue: string;
  GrossProfitTTM: string;
  RevenueTTM: string;
  OperatingMarginTTM: string;
  ProfitMargin: string;
  ReturnOnEquityTTM: string;
  ReturnOnAssetsTTM: string;
  [key: string]: string;
}

export interface IncomeStatement {
  date: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
  epsdiluted: number;
  grossProfitRatio: number;
  operatingIncomeRatio: number;
  netIncomeRatio: number;
}

export interface Alert {
  id: string;
  symbol: string;
  type: 'above' | 'below';
  targetPrice: number;
  createdAt: string;
  triggered: boolean;
  triggeredAt?: string;
}

export interface UserSettings {
  alphaVantageKey?: string;
  finnhubKey?: string;
  fmpKey?: string;
  theme: 'dark' | 'light';
  defaultChart: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface BatchQuoteResponse {
  quotes: Record<string, StockQuote>;
  errors: string[];
}
