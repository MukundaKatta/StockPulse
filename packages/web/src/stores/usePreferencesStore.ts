import { create } from 'zustand';

interface Preferences {
  currency: string;
  locale: string;
  dateFormat: string;
  defaultTimeframe: string;
  chartType: 'candle' | 'line' | 'area';
  showVolume: boolean;
  showGrid: boolean;
  colorScheme: 'default' | 'colorblind' | 'monochrome';
  refreshInterval: number;
}

interface PreferencesState extends Preferences {
  set: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  reset: () => void;
}

const defaults: Preferences = {
  currency: 'USD',
  locale: 'en-US',
  dateFormat: 'MMM dd, yyyy',
  defaultTimeframe: '1D',
  chartType: 'candle',
  showVolume: true,
  showGrid: true,
  colorScheme: 'default',
  refreshInterval: 30000,
};

export const usePreferencesStore = create<PreferencesState>((set) => ({
  ...defaults,
  set: (key, value) => set({ [key]: value }),
  reset: () => set(defaults),
}));
