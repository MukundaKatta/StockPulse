import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import { env } from '../config/env';

let io: Server;

export function initSocketIO(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });

  // Subscribe to Redis pub/sub for price updates
  const sub = new Redis(env.REDIS_URL);
  sub.subscribe('sp:prices', (err) => {
    if (err) console.error('Redis subscribe error:', err);
    else console.log('Subscribed to sp:prices channel');
  });

  sub.on('message', (_channel, message) => {
    try {
      const data = JSON.parse(message);
      // Emit to room for this specific symbol
      io.to(`stock:${data.symbol}`).emit('price-update', data);
    } catch {
      // ignore parse errors
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('subscribe', (symbols: string[]) => {
      for (const symbol of symbols) {
        socket.join(`stock:${symbol.toUpperCase()}`);
      }
    });

    socket.on('unsubscribe', (symbols: string[]) => {
      for (const symbol of symbols) {
        socket.leave(`stock:${symbol.toUpperCase()}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): Server {
  return io;
}
