import { create } from 'zustand';

interface WatchlistItem {
  symbol: string;
  addedAt: number;
  notes?: string;
}

interface Watchlist {
  id: string;
  name: string;
  items: WatchlistItem[];
}

interface WatchlistState {
  watchlists: Watchlist[];
  activeId: string | null;
  create: (name: string) => void;
  remove: (id: string) => void;
  rename: (id: string, name: string) => void;
  setActive: (id: string | null) => void;
  addSymbol: (listId: string, symbol: string) => void;
  removeSymbol: (listId: string, symbol: string) => void;
  hasSymbol: (listId: string, symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlists: [{ id: 'default', name: 'My Watchlist', items: [] }],
  activeId: 'default',
  create: (name) =>
    set((state) => ({ watchlists: [...state.watchlists, { id: crypto.randomUUID(), name, items: [] }] })),
  remove: (id) =>
    set((state) => ({ watchlists: state.watchlists.filter((w) => w.id !== id), activeId: state.activeId === id ? null : state.activeId })),
  rename: (id, name) =>
    set((state) => ({ watchlists: state.watchlists.map((w) => (w.id === id ? { ...w, name } : w)) })),
  setActive: (id) => set({ activeId: id }),
  addSymbol: (listId, symbol) =>
    set((state) => ({
      watchlists: state.watchlists.map((w) =>
        w.id === listId && !w.items.some((i) => i.symbol === symbol)
          ? { ...w, items: [...w.items, { symbol, addedAt: Date.now() }] }
          : w
      ),
    })),
  removeSymbol: (listId, symbol) =>
    set((state) => ({
      watchlists: state.watchlists.map((w) =>
        w.id === listId ? { ...w, items: w.items.filter((i) => i.symbol !== symbol) } : w
      ),
    })),
  hasSymbol: (listId, symbol) => {
    const list = get().watchlists.find((w) => w.id === listId);
    return list?.items.some((i) => i.symbol === symbol) ?? false;
  },
}));
