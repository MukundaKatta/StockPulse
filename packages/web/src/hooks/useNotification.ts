import { useState, useCallback } from 'react';

interface UseNotificationReturn {
  permission: NotificationPermission | null;
  requestPermission: () => Promise<void>;
  notify: (title: string, options?: NotificationOptions) => void;
}

export function useNotification(): UseNotificationReturn {
  const [permission, setPermission] = useState<NotificationPermission | null>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return null;
    return Notification.permission;
  });

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }, []);

  const notify = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission !== 'granted') return;
      new Notification(title, options);
    },
    [permission]
  );

  return { permission, requestPermission, notify };
}
