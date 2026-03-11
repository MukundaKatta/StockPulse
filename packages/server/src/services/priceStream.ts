import WebSocket from 'ws';
import { env } from '../config/env';
import { redis } from '../config/redis';

type PriceCallback = (data: { symbol: string; price: number; volume: number; timestamp: number }) => void;

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
const subscribers = new Set<string>();
const callbacks: PriceCallback[] = [];

export function onPriceUpdate(callback: PriceCallback): void {
  callbacks.push(callback);
}

export function subscribeSymbol(symbol: string): void {
  subscribers.add(symbol);
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'subscribe', symbol }));
  }
}

export function unsubscribeSymbol(symbol: string): void {
  subscribers.delete(symbol);
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
  }
}

export function connectFinnhubWS(): void {
  if (!env.FINNHUB_KEY) {
    console.warn('Finnhub API key not set — WebSocket price stream disabled');
    return;
  }

  ws = new WebSocket(`wss://ws.finnhub.io?token=${env.FINNHUB_KEY}`);

  ws.on('open', () => {
    console.log('Finnhub WebSocket connected');
    for (const symbol of subscribers) {
      ws!.send(JSON.stringify({ type: 'subscribe', symbol }));
    }
  });

  ws.on('message', async (rawData) => {
    try {
      const msg = JSON.parse(rawData.toString());
      if (msg.type === 'trade' && Array.isArray(msg.data)) {
        for (const trade of msg.data) {
          const priceData = {
            symbol: trade.s,
            price: trade.p,
            volume: trade.v,
            timestamp: trade.t,
          };

          // Publish to Redis pub/sub for Socket.IO distribution
          await redis.publish('sp:prices', JSON.stringify(priceData));

          // Cache latest price
          await redis.setex(
            `sp:price:${trade.s}`,
            60,
            JSON.stringify(priceData)
          );

          for (const cb of callbacks) {
            cb(priceData);
          }
        }
      }
    } catch (err) {
      console.error('Error processing Finnhub WS message:', err);
    }
  });

  ws.on('close', () => {
    console.log('Finnhub WebSocket disconnected — reconnecting in 5s');
    scheduleReconnect();
  });

  ws.on('error', (err) => {
    console.error('Finnhub WebSocket error:', err.message);
  });
}

function scheduleReconnect(): void {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectFinnhubWS();
  }, 5000);
}

export function disconnectFinnhubWS(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (ws) {
    ws.close();
    ws = null;
  }
}
