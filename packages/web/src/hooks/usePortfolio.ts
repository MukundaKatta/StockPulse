'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Portfolio, Holding } from '@/types';

export function usePortfolios() {
  return useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const { data } = await api.get('/api/portfolio');
      return data.portfolios as Portfolio[];
    },
    staleTime: 30000,
  });
}

export function usePortfolioHoldings(portfolioId: string | null) {
  return useQuery({
    queryKey: ['holdings', portfolioId],
    queryFn: async () => {
      const { data } = await api.get(`/api/portfolio/${portfolioId}`);
      return data.holdings as Holding[];
    },
    enabled: !!portfolioId,
    staleTime: 30000,
  });
}
