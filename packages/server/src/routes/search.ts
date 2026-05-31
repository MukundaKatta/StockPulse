import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

interface SearchResult {
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto' | 'index';
  exchange: string;
}

const SYMBOLS: SearchResult[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'stock', exchange: 'NYSE' },
  { symbol: 'V', name: 'Visa Inc.', type: 'stock', exchange: 'NYSE' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock', exchange: 'NYSE' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', type: 'etf', exchange: 'NYSE' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'etf', exchange: 'NASDAQ' },
  { symbol: 'IWM', name: 'iShares Russell 2000', type: 'etf', exchange: 'NYSE' },
  { symbol: 'DIA', name: 'SPDR Dow Jones ETF', type: 'etf', exchange: 'NYSE' },
  { symbol: 'BTC-USD', name: 'Bitcoin USD', type: 'crypto', exchange: 'CRYPTO' },
  { symbol: 'ETH-USD', name: 'Ethereum USD', type: 'crypto', exchange: 'CRYPTO' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'DIS', name: 'Walt Disney Company', type: 'stock', exchange: 'NYSE' },
  { symbol: 'BA', name: 'Boeing Company', type: 'stock', exchange: 'NYSE' },
  { symbol: 'CRM', name: 'Salesforce Inc.', type: 'stock', exchange: 'NYSE' },
  { symbol: 'PYPL', name: 'PayPal Holdings', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'INTC', name: 'Intel Corporation', type: 'stock', exchange: 'NASDAQ' },
  { symbol: 'COIN', name: 'Coinbase Global', type: 'stock', exchange: 'NASDAQ' },
];

router.get('/suggestions', authMiddleware, (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string' || q.length < 1) {
    return res.json([]);
  }

  const query = q.toUpperCase();
  const results = SYMBOLS
    .filter((s) => s.symbol.includes(query) || s.name.toUpperCase().includes(query))
    .slice(0, 8);

  res.json(results);
});

router.get('/popular', authMiddleware, (_req, res) => {
  const popular = SYMBOLS.filter((s) => ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'SPY', 'QQQ'].includes(s.symbol));
  res.json(popular);
});

export default router;
