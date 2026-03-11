'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSocket } from '@/lib/socket';

interface PriceData {
  symbol: string;
  price: number;
  volume: number;
  timestamp: number;
}

export function useStockPrice(symbol: string | null) {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  const handlePriceUpdate = useCallback(
    (data: PriceData) => {
      if (data.symbol !== symbol) return;
      setPrice((prev) => {
        if (prev && data.price !== prev.price) {
          setFlash(data.price > prev.price ? 'up' : 'down');
          setTimeout(() => setFlash(null), 600);
        }
        return data;
      });
    },
    [symbol]
  );

  useEffect(() => {
    if (!symbol) return;

    const socket = getSocket();
    socket.emit('subscribe', [symbol]);
    socket.on('price-update', handlePriceUpdate);

    return () => {
      socket.emit('unsubscribe', [symbol]);
      socket.off('price-update', handlePriceUpdate);
    };
  }, [symbol, handlePriceUpdate]);

  return { price, flash };
}
