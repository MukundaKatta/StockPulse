import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// Export all portfolio data as JSON
router.get('/portfolio', async (req: Request, res: Response) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userId: req.user!.userId },
    include: {
      trades: { orderBy: { date: 'desc' } },
    },
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="portfolio-export-${new Date().toISOString().split('T')[0]}.json"`);
  res.json({
    exportDate: new Date().toISOString(),
    portfolios: portfolios.map((p) => ({
      name: p.name,
      trades: p.trades.map((t) => ({
        symbol: t.symbol,
        type: t.type,
        quantity: t.quantity,
        price: t.price,
        fee: t.fee,
        date: t.date.toISOString(),
        notes: t.notes,
      })),
    })),
  });
});

// Export watchlists as JSON
router.get('/watchlists', async (req: Request, res: Response) => {
  const watchlists = await prisma.watchlist.findMany({
    where: { userId: req.user!.userId },
    include: { items: true },
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="watchlists-export-${new Date().toISOString().split('T')[0]}.json"`);
  res.json({
    exportDate: new Date().toISOString(),
    watchlists: watchlists.map((wl) => ({
      name: wl.name,
      symbols: wl.items.map((i) => i.symbol),
    })),
  });
});

// Export trades as CSV
router.get('/trades/csv', async (req: Request, res: Response) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userId: req.user!.userId },
    include: {
      trades: { orderBy: { date: 'desc' } },
    },
  });

  const headers = 'Portfolio,Symbol,Type,Quantity,Price,Fee,Date,Notes\n';
  const rows = portfolios.flatMap((p) =>
    p.trades.map((t) =>
      [
        `"${p.name}"`,
        t.symbol,
        t.type,
        t.quantity.toFixed(4),
        t.price.toFixed(2),
        t.fee.toFixed(2),
        t.date.toISOString().split('T')[0],
        `"${(t.notes || '').replace(/"/g, '""')}"`,
      ].join(',')
    )
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="trades-${new Date().toISOString().split('T')[0]}.csv"`);
  res.send(headers + rows.join('\n'));
});

export default router;
