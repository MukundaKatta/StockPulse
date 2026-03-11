import { env } from '../config/env';
import { getCached, setCache } from './cacheManager';
import { OHLCV } from '../utils/indicators';
import { AppError } from '../middleware/errorHandler';

const BASE_URL = 'https://www.alphavantage.co/query';

async function fetchAV(params: Record<string, string>): Promise<Record<string, unknown>> {
  if (!env.ALPHA_VANTAGE_KEY) {
    throw new AppError(503, 'Alpha Vantage API key not configured');
  }

  const url = new URL(BASE_URL);
  url.searchParams.set('apikey', env.ALPHA_VANTAGE_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new AppError(502, `Alpha Vantage API error: ${res.status}`);
  }

  const data = await res.json() as Record<string, unknown>;
  if ('Error Message' in data) {
    throw new AppError(404, data['Error Message'] as string);
  }
  if ('Note' in data) {
    throw new AppError(429, 'Alpha Vantage API rate limit reached');
  }

  return data;
}

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

export async function getQuote(symbol: string): Promise<StockQuote> {
  const cached = await getCached<StockQuote>('INTRADAY_PRICE', symbol, 'quote');
  if (cached) return cached;

  const data = await fetchAV({ function: 'GLOBAL_QUOTE', symbol });
  const gq = data['Global Quote'] as Record<string, string> | undefined;
  if (!gq || !gq['05. price']) {
    throw new AppError(404, `No quote data found for ${symbol}`);
  }

  const quote: StockQuote = {
    symbol: gq['01. symbol'],
    price: parseFloat(gq['05. price']),
    change: parseFloat(gq['09. change']),
    changePercent: parseFloat(gq['10. change percent']?.replace('%', '') || '0'),
    volume: parseInt(gq['06. volume'], 10),
    latestDay: gq['07. latest trading day'],
    previousClose: parseFloat(gq['08. previous close']),
    open: parseFloat(gq['02. open']),
    high: parseFloat(gq['03. high']),
    low: parseFloat(gq['04. low']),
  };

  await setCache('INTRADAY_PRICE', symbol, quote, 'quote');
  return quote;
}

export async function getDailyPrices(symbol: string, outputSize: 'compact' | 'full' = 'compact'): Promise<OHLCV[]> {
  const cached = await getCached<OHLCV[]>('DAILY_PRICE', symbol, 'daily');
  if (cached) return cached;

  const data = await fetchAV({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: outputSize,
  });

  const timeSeries = data['Time Series (Daily)'] as Record<string, Record<string, string>> | undefined;
  if (!timeSeries) {
    throw new AppError(404, `No daily data for ${symbol}`);
  }

  const prices: OHLCV[] = Object.entries(timeSeries)
    .map(([date, values]) => ({
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'], 10),
      timestamp: date,
    }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  await setCache('DAILY_PRICE', symbol, prices, 'daily');
  return prices;
}

export async function getIntradayPrices(symbol: string, interval: string = '5min'): Promise<OHLCV[]> {
  const cached = await getCached<OHLCV[]>('INTRADAY_PRICE', symbol, interval);
  if (cached) return cached;

  const data = await fetchAV({
    function: 'TIME_SERIES_INTRADAY',
    symbol,
    interval,
    outputsize: 'compact',
  });

  const key = `Time Series (${interval})`;
  const timeSeries = data[key] as Record<string, Record<string, string>> | undefined;
  if (!timeSeries) {
    throw new AppError(404, `No intraday data for ${symbol}`);
  }

  const prices: OHLCV[] = Object.entries(timeSeries)
    .map(([datetime, values]) => ({
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'], 10),
      timestamp: datetime,
    }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  await setCache('INTRADAY_PRICE', symbol, prices, interval);
  return prices;
}

export async function searchSymbol(query: string): Promise<Array<{ symbol: string; name: string; type: string; region: string }>> {
  const data = await fetchAV({ function: 'SYMBOL_SEARCH', keywords: query });
  const matches = data['bestMatches'] as Array<Record<string, string>> | undefined;
  if (!matches) return [];

  return matches.map((m) => ({
    symbol: m['1. symbol'],
    name: m['2. name'],
    type: m['3. type'],
    region: m['4. region'],
  }));
}

export async function getCompanyOverview(symbol: string): Promise<Record<string, string>> {
  const cached = await getCached<Record<string, string>>('COMPANY_PROFILE', symbol);
  if (cached) return cached;

  const data = await fetchAV({ function: 'OVERVIEW', symbol }) as Record<string, string>;
  if (!data.Symbol) {
    throw new AppError(404, `No company overview for ${symbol}`);
  }

  await setCache('COMPANY_PROFILE', symbol, data);
  return data;
}
