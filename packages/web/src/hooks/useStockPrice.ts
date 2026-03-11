'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { getSocket } from '@/lib/socket';

interface PriceData {
  symbol: string;
  price: number;
  volume: number;
  timestamp: number;
}

// Batched price buffer - shared across all hook instances
const priceBuffer = new Map<string, PriceData>();
const listeners = new Map<string, Set<(data: PriceData) => void>>();
let flushScheduled = false;

function flushBuffer() {
  flushScheduled = false;
  for (const [symbol, data] of priceBuffer) {
    const symbolListeners = listeners.get(symbol);
    if (symbolListeners) {
      for (const listener of symbolListeners) {
        listener(data);
      }
    }
  }
  priceBuffer.clear();
}

function handleRawPrice(data: PriceData) {
  priceBuffer.set(data.symbol, data);
  if (!flushScheduled) {
    flushScheduled = true;
    requestAnimationFrame(flushBuffer);
  }
}

function ensureGlobalListener() {
  const socket = getSocket();
  // Use off+on to ensure exactly one listener, even after reconnect
  socket.off('price-update', handleRawPrice);
  socket.on('price-update', handleRawPrice);
  // Re-attach on reconnect so we don't lose the listener
  socket.off('connect', reattachOnConnect);
  socket.on('connect', reattachOnConnect);
}

function reattachOnConnect() {
  const socket = getSocket();
  socket.off('price-update', handleRawPrice);
  socket.on('price-update', handleRawPrice);
  // Re-subscribe all active symbols
  for (const symbol of listeners.keys()) {
    socket.emit('subscribe', [symbol]);
  }
}

export function useStockPrice(symbol: string | null) {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPriceRef = useRef<number | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleUpdate = useCallback((data: PriceData) => {
    const prev = prevPriceRef.current;
    if (prev !== null && data.price !== prev) {
      clearTimeout(flashTimeoutRef.current);
      setFlash(data.price > prev ? 'up' : 'down');
      flashTimeoutRef.current = setTimeout(() => setFlash(null), 600);
    }
    prevPriceRef.current = data.price;
    setPrice(data);
  }, []);

  useEffect(() => {
    if (!symbol) return;

    ensureGlobalListener();
    const socket = getSocket();
    socket.emit('subscribe', [symbol]);

    if (!listeners.has(symbol)) {
      listeners.set(symbol, new Set());
    }
    listeners.get(symbol)!.add(handleUpdate);

    return () => {
      listeners.get(symbol)?.delete(handleUpdate);
      if (listeners.get(symbol)?.size === 0) {
        listeners.delete(symbol);
        socket.emit('unsubscribe', [symbol]);
      }
      clearTimeout(flashTimeoutRef.current);
    };
  }, [symbol, handleUpdate]);

  return { price, flash };
}
