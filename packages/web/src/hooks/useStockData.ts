'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { StockQuote, OHLCV, SearchResult, CompanyOverview, NewsArticle } from '@/types';

export function useStockQuote(symbol: string | null) {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/quote`);
      return data.quote as StockQuote;
    },
    enabled: !!symbol,
    refetchInterval: 30000,
    staleTime: 15000,
  });
}

export function useStockHistory(symbol: string | null, interval: string = 'daily', outputSize: string = 'compact', days: number = Infinity) {
  const daysKey = isFinite(days) ? days : 'all';
  return useQuery({
    queryKey: ['history', symbol, interval, outputSize, daysKey],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/history`, {
        params: { interval, outputSize },
      });
      let prices = data.data as OHLCV[];
      if (isFinite(days) && prices.length > 0) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        prices = prices.filter((p) => new Date(p.timestamp) >= cutoff);
      }
      return prices;
    },
    enabled: !!symbol,
    staleTime: 60000,
  });
}

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const { data } = await api.get('/api/stocks/search', { params: { q: query } });
      return data.results as SearchResult[];
    },
    enabled: query.trim().length >= 2,
    staleTime: 30000,
  });
}

export function useCompanyOverview(symbol: string | null) {
  return useQuery({
    queryKey: ['overview', symbol],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/overview`);
      return data.overview as CompanyOverview;
    },
    enabled: !!symbol,
    staleTime: 86400000,
  });
}

export function useStockNews(symbol: string | null) {
  return useQuery({
    queryKey: ['news', symbol],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/news`);
      return data.news as NewsArticle[];
    },
    enabled: !!symbol,
    staleTime: 900000,
  });
}
