'use client';

import { create } from 'zustand';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
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
  deleteWatchlist: (watchlistId: string) => Promise<void>;
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
      toast.error('Failed to load watchlists');
    } finally {
      set({ loading: false });
    }
  },

  addSymbol: async (watchlistId, symbol) => {
    try {
      await api.post(`/api/watchlist/${watchlistId}/items`, { symbol });
      toast.success(`${symbol} added to watchlist`);
      await get().fetchWatchlists();
    } catch (err: unknown) {
      const message = isAxiosError(err) ? err.response?.data?.message || 'Failed to add symbol' : 'Failed to add symbol';
      toast.error(message);
    }
  },

  removeItem: async (watchlistId, itemId) => {
    try {
      await api.delete(`/api/watchlist/${watchlistId}/items/${itemId}`);
      toast.success('Removed from watchlist');
      await get().fetchWatchlists();
    } catch (err) {
      toast.error('Failed to remove item');
    }
  },

  createWatchlist: async (name) => {
    try {
      await api.post('/api/watchlist', { name });
      toast.success(`Watchlist "${name}" created`);
      await get().fetchWatchlists();
    } catch (err) {
      toast.error('Failed to create watchlist');
    }
  },

  deleteWatchlist: async (watchlistId) => {
    try {
      await api.delete(`/api/watchlist/${watchlistId}`);
      toast.success('Watchlist deleted');
      set({ activeWatchlistId: null });
      await get().fetchWatchlists();
    } catch (err) {
      toast.error('Failed to delete watchlist');
    }
  },

  setActiveWatchlist: (id) => set({ activeWatchlistId: id }),
}));
