import { useEffect, useRef } from 'react';

type Target = Window | Document | HTMLElement | null;

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  target?: Target,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef(handler);
  savedHandler.current = handler;

  useEffect(() => {
    const el = target ?? window;
    if (!el?.addEventListener) return;

    const listener = (event: Event) => savedHandler.current(event as WindowEventMap[K]);
    el.addEventListener(eventName, listener, options);
    return () => el.removeEventListener(eventName, listener, options);
  }, [eventName, target, options]);
}
