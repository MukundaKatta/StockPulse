import { create } from 'zustand';

interface ModalState {
  modals: Record<string, boolean>;
  data: Record<string, unknown>;
  open: (id: string, data?: unknown) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
  getData: <T>(id: string) => T | undefined;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},
  data: {},
  open: (id, data) => set((state) => ({ modals: { ...state.modals, [id]: true }, data: data !== undefined ? { ...state.data, [id]: data } : state.data })),
  close: (id) => set((state) => { const { [id]: _, ...rest } = state.modals; const { [id]: __, ...restData } = state.data; return { modals: rest, data: restData }; }),
  toggle: (id) => set((state) => ({ modals: { ...state.modals, [id]: !state.modals[id] } })),
  isOpen: (id) => !!get().modals[id],
  getData: <T,>(id: string) => get().data[id] as T | undefined,
  closeAll: () => set({ modals: {}, data: {} }),
}));
