'use client';

import { create } from 'zustand';
import api from '@/lib/api';
import type { Portfolio, Holding } from '@/types';

interface PortfolioState {
  portfolios: Portfolio[];
  activePortfolioId: string | null;
  holdings: Holding[];
  loading: boolean;
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

  fetchPortfolios: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/api/portfolio');
      const portfolios = data.portfolios;
      set({
        portfolios,
        activePortfolioId: get().activePortfolioId || portfolios[0]?.id || null,
      });
    } catch (err) {
      console.error('Failed to fetch portfolios:', err);
    } finally {
      set({ loading: false });
    }
  },

  fetchHoldings: async (portfolioId) => {
    try {
      const { data } = await api.get(`/api/portfolio/${portfolioId}`);
      set({ holdings: data.holdings });
    } catch (err) {
      console.error('Failed to fetch holdings:', err);
    }
  },

  addTrade: async (portfolioId, trade) => {
    try {
      await api.post(`/api/portfolio/${portfolioId}/trades`, trade);
      await get().fetchHoldings(portfolioId);
      await get().fetchPortfolios();
    } catch (err) {
      console.error('Failed to add trade:', err);
    }
  },

  deleteTrade: async (portfolioId, tradeId) => {
    try {
      await api.delete(`/api/portfolio/${portfolioId}/trades/${tradeId}`);
      await get().fetchHoldings(portfolioId);
      await get().fetchPortfolios();
    } catch (err) {
      console.error('Failed to delete trade:', err);
    }
  },

  setActivePortfolio: (id) => set({ activePortfolioId: id }),
}));
