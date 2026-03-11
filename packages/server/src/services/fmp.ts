import { env } from '../config/env';
import { getCached, setCache } from './cacheManager';
import { AppError } from '../middleware/errorHandler';

const BASE_URL = 'https://financialmodelingprep.com/api/v3';

async function fetchFMP(endpoint: string, params: Record<string, string> = {}): Promise<unknown> {
  if (!env.FMP_KEY) {
    throw new AppError(503, 'FMP API key not configured');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('apikey', env.FMP_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new AppError(502, `FMP API error: ${res.status}`);
  }

  return res.json();
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

export async function getIncomeStatements(symbol: string, period: 'annual' | 'quarter' = 'quarter'): Promise<IncomeStatement[]> {
  const cached = await getCached<IncomeStatement[]>('FUNDAMENTALS', symbol, `income-${period}`);
  if (cached) return cached;

  const data = await fetchFMP(`/income-statement/${symbol}`, { period, limit: '12' }) as IncomeStatement[];
  await setCache('FUNDAMENTALS', symbol, data, `income-${period}`);
  return data || [];
}

export interface BalanceSheet {
  date: string;
  totalAssets: number;
  totalLiabilities: number;
  totalStockholdersEquity: number;
  totalDebt: number;
  cashAndCashEquivalents: number;
  totalCurrentAssets: number;
  totalCurrentLiabilities: number;
}

export async function getBalanceSheet(symbol: string, period: 'annual' | 'quarter' = 'quarter'): Promise<BalanceSheet[]> {
  const cached = await getCached<BalanceSheet[]>('FUNDAMENTALS', symbol, `balance-${period}`);
  if (cached) return cached;

  const data = await fetchFMP(`/balance-sheet-statement/${symbol}`, { period, limit: '12' }) as BalanceSheet[];
  await setCache('FUNDAMENTALS', symbol, data, `balance-${period}`);
  return data || [];
}

export interface CashFlowStatement {
  date: string;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  dividendsPaid: number;
}

export async function getCashFlow(symbol: string, period: 'annual' | 'quarter' = 'quarter'): Promise<CashFlowStatement[]> {
  const cached = await getCached<CashFlowStatement[]>('FUNDAMENTALS', symbol, `cashflow-${period}`);
  if (cached) return cached;

  const data = await fetchFMP(`/cash-flow-statement/${symbol}`, { period, limit: '12' }) as CashFlowStatement[];
  await setCache('FUNDAMENTALS', symbol, data, `cashflow-${period}`);
  return data || [];
}

export interface KeyMetrics {
  date: string;
  peRatio: number;
  pegRatio: number;
  priceToSalesRatio: number;
  priceToBookRatio: number;
  evToEbitda: number;
  debtToEquity: number;
  currentRatio: number;
  roe: number;
  roa: number;
  dividendYield: number;
}

export async function getKeyMetrics(symbol: string): Promise<KeyMetrics[]> {
  const cached = await getCached<KeyMetrics[]>('FUNDAMENTALS', symbol, 'metrics');
  if (cached) return cached;

  const data = await fetchFMP(`/key-metrics/${symbol}`, { limit: '12' }) as KeyMetrics[];
  await setCache('FUNDAMENTALS', symbol, data, 'metrics');
  return data || [];
}

export interface CompanyProfile {
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  mktCap: number;
  description: string;
  website: string;
  ceo: string;
  exchange: string;
  image: string;
}

export async function getCompanyProfile(symbol: string): Promise<CompanyProfile | null> {
  const cached = await getCached<CompanyProfile>('COMPANY_PROFILE', symbol, 'fmp');
  if (cached) return cached;

  const data = await fetchFMP(`/profile/${symbol}`) as CompanyProfile[];
  const profile = data[0] || null;
  if (profile) {
    await setCache('COMPANY_PROFILE', symbol, profile, 'fmp');
  }
  return profile;
}
