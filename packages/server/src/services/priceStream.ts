import WebSocket from 'ws';
import { env } from '../config/env';
import { redis } from '../config/redis';

type PriceCallback = (data: { symbol: string; price: number; volume: number; timestamp: number }) => void;

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const subscribers = new Set<string>();
const callbacks = new Set<PriceCallback>();

export function onPriceUpdate(callback: PriceCallback): void {
  callbacks.add(callback);
}

export function offPriceUpdate(callback: PriceCallback): void {
  callbacks.delete(callback);
}

export function subscribeSymbol(symbol: string): void {
  const upper = symbol.toUpperCase();
  subscribers.add(upper);
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'subscribe', symbol: upper }));
  }
}

export function unsubscribeSymbol(symbol: string): void {
  const upper = symbol.toUpperCase();
  subscribers.delete(upper);
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'unsubscribe', symbol: upper }));
  }
}

export function connectFinnhubWS(): void {
  if (!env.FINNHUB_KEY) {
    console.warn('Finnhub API key not set — WebSocket price stream disabled');
    return;
  }

  if (ws) {
    ws.removeAllListeners();
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
    }
    ws = null;
  }

  ws = new WebSocket(`wss://ws.finnhub.io?token=${env.FINNHUB_KEY}`);

  ws.on('open', () => {
    console.log('Finnhub WebSocket connected');
    reconnectAttempts = 0;
    for (const symbol of subscribers) {
      ws!.send(JSON.stringify({ type: 'subscribe', symbol }));
    }
  });

  ws.on('message', async (rawData) => {
    try {
      const msg = JSON.parse(rawData.toString());
      if (msg.type === 'trade' && Array.isArray(msg.data)) {
        for (const trade of msg.data) {
          if (!trade.s || trade.p === undefined) continue;

          const priceData = {
            symbol: trade.s,
            price: trade.p,
            volume: trade.v || 0,
            timestamp: trade.t || Date.now(),
          };

          await redis.publish('sp:prices', JSON.stringify(priceData)).catch(() => {});
          await redis.setex(`sp:price:${trade.s}`, 60, JSON.stringify(priceData)).catch(() => {});

          for (const cb of callbacks) {
            try { cb(priceData); } catch {}
          }
        }
      }
    } catch (err) {
      console.error('Error processing Finnhub WS message:', (err as Error).message);
    }
  });

  ws.on('close', () => {
    console.log('Finnhub WebSocket disconnected');
    scheduleReconnect();
  });

  ws.on('error', (err) => {
    console.error('Finnhub WebSocket error:', err.message);
  });
}

function scheduleReconnect(): void {
  if (reconnectTimer) return;
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error(`Finnhub WS: max reconnect attempts (${MAX_RECONNECT_ATTEMPTS}) reached`);
    return;
  }

  const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 60000);
  reconnectAttempts++;
  console.log(`Finnhub WS: reconnecting in ${delay}ms (attempt ${reconnectAttempts})`);

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectFinnhubWS();
  }, delay);
}

export function disconnectFinnhubWS(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  reconnectAttempts = MAX_RECONNECT_ATTEMPTS;
  if (ws) {
    ws.removeAllListeners();
    ws.close();
    ws = null;
  }
}
