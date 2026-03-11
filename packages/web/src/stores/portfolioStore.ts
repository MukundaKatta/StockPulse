'use client';

import { create } from 'zustand';
import { toast } from 'sonner';
import api from '@/lib/api';
import type { Portfolio, Holding } from '@/types';

interface PortfolioState {
  portfolios: Portfolio[];
  activePortfolioId: string | null;
  holdings: Holding[];
  loading: boolean;
  error: string | null;
  fetchPortfolios: () => Promise<void>;
  fetchHoldings: (portfolioId: string) => Promise<void>;
  addTrade: (portfolioId: string, trade: {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    fee?: number;
    date: string;
    notes?: string;
  }) => Promise<void>;
  deleteTrade: (portfolioId: string, tradeId: string) => Promise<void>;
  setActivePortfolio: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  activePortfolioId: null,
  holdings: [],
  loading: false,
  error: null,

  fetchPortfolios: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/api/portfolio');
      const portfolios = data.portfolios;
      set({
        portfolios,
        activePortfolioId: get().activePortfolioId || portfolios[0]?.id || null,
      });
    } catch (err) {
      const message = 'Failed to load portfolios';
      set({ error: message });
      toast.error(message);
    } finally {
      set({ loading: false });
    }
  },

  fetchHoldings: async (portfolioId) => {
    try {
      const { data } = await api.get(`/api/portfolio/${portfolioId}`);
      set({ holdings: data.holdings });
    } catch (err) {
      toast.error('Failed to load holdings');
    }
  },

  addTrade: async (portfolioId, trade) => {
    await api.post(`/api/portfolio/${portfolioId}/trades`, trade);
    toast.success(`${trade.type} ${trade.quantity} ${trade.symbol} added`);
    await get().fetchHoldings(portfolioId);
    await get().fetchPortfolios();
  },

  deleteTrade: async (portfolioId, tradeId) => {
    await api.delete(`/api/portfolio/${portfolioId}/trades/${tradeId}`);
    toast.success('Trade deleted');
    await get().fetchHoldings(portfolioId);
    await get().fetchPortfolios();
  },

  setActivePortfolio: (id) => set({ activePortfolioId: id }),
}));
