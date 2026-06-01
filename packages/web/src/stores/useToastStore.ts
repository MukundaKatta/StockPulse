import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  createdAt: number;
}

interface ToastState {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  remove: (id: string) => void;
  success: (message: string) => string;
  error: (message: string) => string;
  warning: (message: string) => string;
  info: (message: string) => string;
}

export const useToastStore = create<ToastState>((set) => {
  const addToast = (toast: Omit<Toast, 'id' | 'createdAt'>): string => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id, createdAt: Date.now() }] }));
    if (toast.duration > 0) {
      setTimeout(() => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })), toast.duration);
    }
    return id;
  };
  return {
    toasts: [],
    add: addToast,
    remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    success: (message) => addToast({ type: 'success', message, duration: 3000 }),
    error: (message) => addToast({ type: 'error', message, duration: 5000 }),
    warning: (message) => addToast({ type: 'warning', message, duration: 4000 }),
    info: (message) => addToast({ type: 'info', message, duration: 3000 }),
  };
});
