import cron from 'node-cron';
import { prisma } from '../config/database';
import * as fmp from '../services/fmp';

export function startFundamentalSync(): void {
  // Sync fundamentals daily at 6 AM ET
  cron.schedule('0 6 * * 1-5', async () => {
    console.log('Starting daily fundamental sync...');

    try {
      // Get all unique symbols from portfolios and watchlists
      const [trades, watchlistItems] = await Promise.all([
        prisma.trade.findMany({ select: { symbol: true }, distinct: ['symbol'] }),
        prisma.watchlistItem.findMany({ select: { symbol: true }, distinct: ['symbol'] }),
      ]);

      const symbols = new Set([
        ...trades.map((t) => t.symbol),
        ...watchlistItems.map((w) => w.symbol),
      ]);

      for (const symbol of symbols) {
        try {
          const profile = await fmp.getCompanyProfile(symbol);
          if (profile) {
            await prisma.fundamentalCache.upsert({
              where: { symbol },
              create: { symbol, data: JSON.parse(JSON.stringify(profile)) },
              update: { data: JSON.parse(JSON.stringify(profile)), fetchedAt: new Date() },
            });
          }
        } catch (err) {
          console.error(`Fundamental sync failed for ${symbol}:`, (err as Error).message);
        }

        // Respect rate limits
        await new Promise((r) => setTimeout(r, 500));
      }

      console.log(`Fundamental sync complete for ${symbols.size} symbols`);
    } catch (err) {
      console.error('Fundamental sync error:', err);
    }
  });

  console.log('Fundamental sync scheduler started');
}
