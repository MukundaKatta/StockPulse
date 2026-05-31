import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

let io: Server;
let redisSub: Redis | null = null;

const SYMBOL_REGEX = /^[A-Z]{1,10}$/;
const MAX_SUBSCRIPTIONS_PER_CLIENT = 50;

export function initSocketIO(httpServer: HttpServer, corsOrigin: string | string[]): Server {
  io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  // Optional auth middleware - allows unauthenticated but tracks user
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
        socket.data.userId = payload.userId;
      } catch {
        // Allow connection but mark as unauthenticated
      }
    }
    next();
  });

  redisSub = new Redis(env.REDIS_URL);
  redisSub.subscribe('sp:prices', (err) => {
    if (err) console.error('Redis subscribe error:', err);
  });

  redisSub.on('message', (_channel, message) => {
    try {
      const data = JSON.parse(message);
      if (data.symbol) {
        io.to(`stock:${data.symbol}`).emit('price-update', data);
      }
    } catch {}
  });

  io.on('connection', (socket: Socket) => {
    let subscriptionCount = 0;

    socket.on('subscribe', (symbols: unknown) => {
      if (!Array.isArray(symbols)) return;
      for (const symbol of symbols) {
        if (typeof symbol !== 'string') continue;
        const upper = symbol.toUpperCase();
        if (!SYMBOL_REGEX.test(upper)) continue;
        if (subscriptionCount >= MAX_SUBSCRIPTIONS_PER_CLIENT) break;
        socket.join(`stock:${upper}`);
        subscriptionCount++;
      }
    });

    socket.on('unsubscribe', (symbols: unknown) => {
      if (!Array.isArray(symbols)) return;
      for (const symbol of symbols) {
        if (typeof symbol !== 'string') continue;
        const upper = symbol.toUpperCase();
        if (socket.rooms.has(`stock:${upper}`)) {
          socket.leave(`stock:${upper}`);
          subscriptionCount = Math.max(0, subscriptionCount - 1);
        }
      }
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
    redisSub.unsubscribe('sp:prices');
    redisSub.disconnect();
    redisSub = null;
  }
}
