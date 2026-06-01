import { create } from 'zustand';

interface SearchState {
  query: string;
  isOpen: boolean;
  recentSearches: string[];
  setQuery: (query: string) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addRecent: (query: string) => void;
  clearRecent: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  isOpen: false,
  recentSearches: [],
  setQuery: (query) => set({ query }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '' }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  addRecent: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((s) => s !== query)].slice(0, 10),
    })),
  clearRecent: () => set({ recentSearches: [] }),
}));
