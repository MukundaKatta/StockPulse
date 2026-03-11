import cron from 'node-cron';
import { prisma } from '../config/database';
import * as finnhub from '../services/finnhub';

export function startNewsPoller(): void {
  // Poll news every 15 minutes during market hours
  cron.schedule('*/15 * * * 1-5', async () => {
    try {
      const watchlistItems = await prisma.watchlistItem.findMany({
        select: { symbol: true },
        distinct: ['symbol'],
      });

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const from = weekAgo.toISOString().split('T')[0];
      const to = now.toISOString().split('T')[0];

      for (const { symbol } of watchlistItems.slice(0, 10)) {
        try {
          await finnhub.getCompanyNews(symbol, from, to);
        } catch {
          // Cached fetch — errors are handled internally
        }
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.error('News poller error:', err);
    }
  });

  console.log('News poller started');
}
