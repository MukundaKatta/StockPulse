'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface FundamentalsData {
  income: Array<{
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
  }>;
  balance: Array<{
    date: string;
    totalAssets: number;
    totalLiabilities: number;
    totalStockholdersEquity: number;
    totalDebt: number;
    cashAndCashEquivalents: number;
  }>;
  cashflow: Array<{
    date: string;
    operatingCashFlow: number;
    capitalExpenditure: number;
    freeCashFlow: number;
    dividendsPaid: number;
  }>;
  metrics: Array<{
    date: string;
    peRatio: number;
    pegRatio: number;
    priceToSalesRatio: number;
    priceToBookRatio: number;
    debtToEquity: number;
    currentRatio: number;
    roe: number;
    roa: number;
    dividendYield: number;
  }>;
  profile: {
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
  } | null;
  earnings: Array<{
    date: string;
    epsActual: number | null;
    epsEstimate: number | null;
    revenueActual: number | null;
    revenueEstimate: number | null;
    quarter: number;
    year: number;
  }>;
}

export function useFundamentals(symbol: string | null, period: 'annual' | 'quarter' = 'quarter') {
  return useQuery({
    queryKey: ['fundamentals', symbol, period],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/fundamentals`, {
        params: { period },
      });
      return data as FundamentalsData;
    },
    enabled: !!symbol,
    staleTime: 86400000, // 24 hours
  });
}

export function useEarnings(symbol: string | null) {
  return useQuery({
    queryKey: ['earnings', symbol],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/earnings`);
      return data.earnings as FundamentalsData['earnings'];
    },
    enabled: !!symbol,
    staleTime: 86400000,
  });
}
