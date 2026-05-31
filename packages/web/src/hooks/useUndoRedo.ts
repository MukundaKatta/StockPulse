'use client';

import { useCallback, useRef, useState } from 'react';

interface UseUndoRedoReturn<T> {
  state: T;
  set: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (initialState: T) => void;
  history: T[];
}

export function useUndoRedo<T>(initialState: T, maxHistory = 50): UseUndoRedoReturn<T> {
  const [state, setState] = useState(initialState);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);

  const set = useCallback((newState: T) => {
    past.current = [...past.current.slice(-maxHistory + 1), state];
    future.current = [];
    setState(newState);
  }, [state, maxHistory]);

  const undo = useCallback(() => {
    if (past.current.length === 0) return;
    const prev = past.current[past.current.length - 1];
    past.current = past.current.slice(0, -1);
    future.current = [state, ...future.current];
    setState(prev);
  }, [state]);

  const redo = useCallback(() => {
    if (future.current.length === 0) return;
    const next = future.current[0];
    future.current = future.current.slice(1);
    past.current = [...past.current, state];
    setState(next);
  }, [state]);

  const reset = useCallback((newInitial: T) => {
    past.current = [];
    future.current = [];
    setState(newInitial);
  }, []);

  return {
    state,
    set,
    undo,
    redo,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
    reset,
    history: [...past.current, state],
  };
}
