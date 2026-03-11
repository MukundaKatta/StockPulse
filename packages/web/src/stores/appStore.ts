'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AppState {
  user: User | null;
  token: string | null;
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  commandPaletteOpen: boolean;
  selectedSymbol: string | null;
  onboardingComplete: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSelectedSymbol: (symbol: string | null) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      theme: 'dark',
      sidebarOpen: true,
      mobileSidebarOpen: false,
      commandPaletteOpen: false,
      selectedSymbol: null,
      onboardingComplete: false,
      setUser: (user) => set({ user }),
      setToken: (token) => {
        if (token) localStorage.setItem('sp-token', token);
        else localStorage.removeItem('sp-token');
        set({ token });
      },
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      logout: () => {
        localStorage.removeItem('sp-token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'sp-app-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        token: state.token,
        user: state.user,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
