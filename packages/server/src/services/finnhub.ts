import { env } from '../config/env';
import { getCached, setCache } from './cacheManager';
import { AppError } from '../middleware/errorHandler';

const BASE_URL = 'https://finnhub.io/api/v1';

async function fetchFinnhub(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  if (!env.FINNHUB_KEY) {
    throw new AppError(503, 'Finnhub API key not configured');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('token', env.FINNHUB_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new AppError(502, `Finnhub API error: ${res.status}`);
  }

  return res.json();
}

export interface FinnhubQuote {
  c: number;  // current
  d: number;  // change
  dp: number; // percent change
  h: number;  // high
  l: number;  // low
  o: number;  // open
  pc: number; // previous close
  t: number;  // timestamp
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const data = await fetchFinnhub('/quote', { symbol }) as FinnhubQuote;
  if (data.c === undefined || data.c === null) {
    throw new AppError(404, `No quote data for ${symbol}`);
  }
  return data;
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

export async function getCompanyNews(
  symbol: string,
  from: string,
  to: string
): Promise<NewsArticle[]> {
  const cached = await getCached<NewsArticle[]>('NEWS', symbol);
  if (cached) return cached;

  const data = await fetchFinnhub('/company-news', { symbol, from, to }) as NewsArticle[];
  const articles = data.slice(0, 20);
  await setCache('NEWS', symbol, articles);
  return articles;
}

export interface EarningsCalendarEntry {
  date: string;
  epsActual: number | null;
  epsEstimate: number | null;
  hour: string;
  quarter: number;
  revenueActual: number | null;
  revenueEstimate: number | null;
  symbol: string;
  year: number;
}

export async function getEarningsCalendar(
  symbol: string,
  from: string,
  to: string
): Promise<EarningsCalendarEntry[]> {
  const data = await fetchFinnhub('/calendar/earnings', { symbol, from, to }) as {
    earningsCalendar: EarningsCalendarEntry[];
  };
  return data.earningsCalendar || [];
}

export async function getBasicFinancials(symbol: string): Promise<Record<string, unknown>> {
  const cached = await getCached<Record<string, unknown>>('FUNDAMENTALS', symbol, 'finnhub');
  if (cached) return cached;

  const data = await fetchFinnhub('/stock/metric', { symbol, metric: 'all' }) as Record<string, unknown>;
  await setCache('FUNDAMENTALS', symbol, data, 'finnhub');
  return data;
}

export async function searchSymbol(query: string): Promise<Array<{ symbol: string; description: string; type: string }>> {
  const data = await fetchFinnhub('/search', { q: query }) as {
    result: Array<{ symbol: string; description: string; type: string }>;
  };
  return data.result?.slice(0, 10) || [];
}
