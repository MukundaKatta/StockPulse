'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { TechnicalIndicators } from '@/types';

export function useTechnicalIndicators(symbol: string | null, timeframe: string = 'daily') {
  return useQuery({
    queryKey: ['technicals', symbol, timeframe],
    queryFn: async () => {
      const { data } = await api.get(`/api/stocks/${symbol}/indicators`, {
        params: { timeframe },
      });
      return data.indicators as TechnicalIndicators;
    },
    enabled: !!symbol,
    staleTime: 300000,
  });
}
