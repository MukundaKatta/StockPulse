import { useEffect, type RefObject } from 'react';

export function useMutationObserver(
  ref: RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
): void {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new MutationObserver(callback);
    observer.observe(element, options);
    return () => observer.disconnect();
  }, [ref, callback, options]);
}
