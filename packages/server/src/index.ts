import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';

import { env } from './config/env';
import { prisma } from './config/database';
import { redis } from './config/redis';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { initSocketIO, closeSocketIO } from './websocket/priceSocket';
import { connectFinnhubWS, disconnectFinnhubWS } from './services/priceStream';
import { startPricePoller } from './jobs/pricePoller';
import { startFundamentalSync } from './jobs/fundamentalSync';
import { startNewsPoller } from './jobs/newsPoller';

import authRoutes from './routes/auth';
import stockRoutes from './routes/stocks';
import technicalRoutes from './routes/technicals';
import fundamentalRoutes from './routes/fundamentals';
import portfolioRoutes from './routes/portfolio';
import watchlistRoutes from './routes/watchlist';
import newsRoutes from './routes/news';
import settingsRoutes from './routes/settings';

const app = express();
const server = createServer(app);

// CORS origins
const corsOrigin = env.NODE_ENV === 'production'
  ? env.FRONTEND_URL
  : ['http://localhost:3000', 'http://localhost:5173'];

// Middleware
app.use(helmet());
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(rateLimiter(200, 60));

// Health check
app.get('/api/health', async (_req, res) => {
  const dbOk = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
  const redisOk = await redis.ping().then(() => true).catch(() => false);
  const allHealthy = dbOk && redisOk;
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: { database: dbOk, redis: redisOk },
  });
});

// Readiness check (for load balancers)
app.get('/api/ready', async (_req, res) => {
  const dbOk = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
  if (dbOk) return res.status(200).json({ ready: true });
  return res.status(503).json({ ready: false });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/stocks', technicalRoutes);
app.use('/api/stocks', fundamentalRoutes);
app.use('/api/stocks', newsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/settings', settingsRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Initialize Socket.IO (reuse corsOrigin)
const io = initSocketIO(server, corsOrigin);

// Start server
server.listen(env.PORT, () => {
  console.log(`StockPulse server running on port ${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);

  // Start background jobs
  connectFinnhubWS();
  startPricePoller();
  startFundamentalSync();
  startNewsPoller();
});

// Graceful shutdown handler
async function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down...`);
  disconnectFinnhubWS();
  closeSocketIO();
  io.close();
  server.close(async () => {
    await prisma.$disconnect();
    redis.disconnect();
    process.exit(0);
  });
  // Force exit after 10s if graceful shutdown fails
  setTimeout(() => process.exit(1), 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
