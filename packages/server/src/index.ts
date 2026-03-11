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
import { initSocketIO } from './websocket/priceSocket';
import { connectFinnhubWS } from './services/priceStream';
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

const app = express();
const server = createServer(app);

// Middleware
app.use(helmet());
app.use(cors({ origin: env.NODE_ENV === 'production' ? false : ['http://localhost:3000'] }));
app.use(compression());
app.use(express.json());
app.use(rateLimiter(200, 60));

// Health check
app.get('/api/health', async (_req, res) => {
  const dbOk = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
  const redisOk = await redis.ping().then(() => true).catch(() => false);
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: { database: dbOk, redis: redisOk },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/stocks', technicalRoutes);
app.use('/api/stocks', fundamentalRoutes);
app.use('/api/stocks', newsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Initialize Socket.IO
initSocketIO(server);

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

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down...');
  server.close();
  await prisma.$disconnect();
  redis.disconnect();
  process.exit(0);
});
