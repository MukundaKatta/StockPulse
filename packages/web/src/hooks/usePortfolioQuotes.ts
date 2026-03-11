'use client';

import { useQueries } from '@tanstack/react-query';
import api from '@/lib/api';
import type { StockQuote, Holding } from '@/types';

export function usePortfolioQuotes(holdings: Holding[]) {
  const symbols = (holdings ?? []).map((h) => h.symbol);

  const queries = useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ['quote', symbol],
      queryFn: async () => {
        const { data } = await api.get(`/api/stocks/${symbol}/quote`);
        return data.quote as StockQuote;
      },
      staleTime: 30000,
      refetchInterval: 60000,
      enabled: !!symbol,
    })),
  });

  const quotes: Record<string, StockQuote> = {};
  let isLoading = false;

  queries.forEach((q, i) => {
    if (q.isLoading) isLoading = true;
    if (q.data) quotes[symbols[i]] = q.data;
  });

  return { quotes, isLoading };
}
