'use client';

import { create } from 'zustand';
import api from '@/lib/api';
import type { Watchlist } from '@/types';

interface WatchlistState {
  watchlists: Watchlist[];
  activeWatchlistId: string | null;
  loading: boolean;
  fetchWatchlists: () => Promise<void>;
  addSymbol: (watchlistId: string, symbol: string) => Promise<void>;
  removeItem: (watchlistId: string, itemId: string) => Promise<void>;
  createWatchlist: (name: string) => Promise<void>;
  setActiveWatchlist: (id: string) => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlists: [],
  activeWatchlistId: null,
  loading: false,

  fetchWatchlists: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/api/watchlist');
      const watchlists = data.watchlists;
      set({
        watchlists,
        activeWatchlistId: get().activeWatchlistId || watchlists[0]?.id || null,
      });
    } catch (err) {
      console.error('Failed to fetch watchlists:', err);
    } finally {
      set({ loading: false });
    }
  },

  addSymbol: async (watchlistId, symbol) => {
    try {
      await api.post(`/api/watchlist/${watchlistId}/items`, { symbol });
      await get().fetchWatchlists();
    } catch (err) {
      console.error('Failed to add symbol:', err);
    }
  },

  removeItem: async (watchlistId, itemId) => {
    try {
      await api.delete(`/api/watchlist/${watchlistId}/items/${itemId}`);
      await get().fetchWatchlists();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  },

  createWatchlist: async (name) => {
    try {
      await api.post('/api/watchlist', { name });
      await get().fetchWatchlists();
    } catch (err) {
      console.error('Failed to create watchlist:', err);
    }
  },

  setActiveWatchlist: (id) => set({ activeWatchlistId: id }),
}));
