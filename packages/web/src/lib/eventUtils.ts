/**
 * Lightweight typed event emitter utilities.
 */

export type EventHandler<T = unknown> = (data: T) => void;

export interface EventEmitter<Events extends Record<string, unknown>> {
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void;
  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void;
  emit<K extends keyof Events>(event: K, data: Events[K]): void;
  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void;
}

/** Create a typed event emitter with on/off/emit/once support. */
export function createEventEmitter<
  Events extends Record<string, unknown>
>(): EventEmitter<Events> {
  const listeners = new Map<keyof Events, Set<EventHandler<unknown>>>();

  function getListeners<K extends keyof Events>(event: K): Set<EventHandler<unknown>> {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    return listeners.get(event)!;
  }

  function on<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void {
    const set = getListeners(event);
    set.add(handler as EventHandler<unknown>);
    return () => off(event, handler);
  }

  function off<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): void {
    const set = getListeners(event);
    set.delete(handler as EventHandler<unknown>);
  }

  function emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const set = getListeners(event);
    for (const handler of set) {
      handler(data);
    }
  }

  function once<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void {
    const wrapper: EventHandler<Events[K]> = (data) => {
      off(event, wrapper);
      handler(data);
    };
    return on(event, wrapper);
  }

  return { on, off, emit, once };
}
