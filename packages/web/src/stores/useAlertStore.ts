import { create } from 'zustand';

interface Alert {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'pct_change' | 'volume';
  threshold: number;
  active: boolean;
  triggered: boolean;
  createdAt: number;
  triggeredAt?: number;
}

interface AlertState {
  alerts: Alert[];
  add: (alert: Omit<Alert, 'id' | 'active' | 'triggered' | 'createdAt'>) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  trigger: (id: string) => void;
  reset: (id: string) => void;
  getBySymbol: (symbol: string) => Alert[];
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  add: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: crypto.randomUUID(), active: true, triggered: false, createdAt: Date.now() }],
    })),
  remove: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
  toggle: (id) => set((state) => ({ alerts: state.alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)) })),
  trigger: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, triggered: true, triggeredAt: Date.now() } : a)),
    })),
  reset: (id) => set((state) => ({ alerts: state.alerts.map((a) => (a.id === id ? { ...a, triggered: false, triggeredAt: undefined } : a)) })),
  getBySymbol: (symbol) => get().alerts.filter((a) => a.symbol === symbol),
}));
