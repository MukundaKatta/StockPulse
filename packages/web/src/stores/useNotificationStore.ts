import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: number;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  add: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  add: (n) =>
    set((state) => {
      const notification: Notification = { ...n, id: crypto.randomUUID(), timestamp: Date.now(), read: false };
      return { notifications: [notification, ...state.notifications], unreadCount: state.unreadCount + 1 };
    }),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - (state.notifications.find((n) => n.id === id && !n.read) ? 1 : 0)),
    })),
  markAllRead: () =>
    set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, read: true })), unreadCount: 0 })),
  remove: (id) =>
    set((state) => {
      const n = state.notifications.find((x) => x.id === id);
      return { notifications: state.notifications.filter((x) => x.id !== id), unreadCount: state.unreadCount - (n && !n.read ? 1 : 0) };
    }),
  clear: () => set({ notifications: [], unreadCount: 0 }),
}));
