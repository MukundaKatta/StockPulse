import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import { env } from '../config/env';

let io: Server;
let redisSub: Redis | null = null;

export function initSocketIO(httpServer: HttpServer, corsOrigin: string | string[]): Server {
  io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Subscribe to Redis pub/sub for price updates
  redisSub = new Redis(env.REDIS_URL);
  redisSub.subscribe('sp:prices', (err) => {
    if (err) console.error('Redis subscribe error:', err);
    else console.log('Subscribed to sp:prices channel');
  });

  redisSub.on('message', (_channel, message) => {
    try {
      const data = JSON.parse(message);
      io.to(`stock:${data.symbol}`).emit('price-update', data);
    } catch {
      // ignore parse errors
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('subscribe', (symbols: string[]) => {
      if (!Array.isArray(symbols)) return;
      for (const symbol of symbols.slice(0, 50)) {
        if (typeof symbol === 'string') {
          socket.join(`stock:${symbol.toUpperCase()}`);
        }
      }
    });

    socket.on('unsubscribe', (symbols: string[]) => {
      if (!Array.isArray(symbols)) return;
      for (const symbol of symbols) {
        if (typeof symbol === 'string') {
          socket.leave(`stock:${symbol.toUpperCase()}`);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.IO not initialized — call initSocketIO first');
  }
  return io;
}

export function closeSocketIO(): void {
  if (redisSub) {
    redisSub.disconnect();
    redisSub = null;
  }
}
