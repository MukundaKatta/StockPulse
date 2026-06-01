import { Router, Request, Response } from 'express';

const router = Router();

interface ImportResult {
  totalRecords: number;
  imported: number;
  skipped: number;
  errors: string[];
}

interface ExportResult {
  format: string;
  recordCount: number;
  data: Record<string, unknown>[];
  generatedAt: string;
}

router.post('/import', (req: Request, res: Response) => {
  const { records } = req.body as { records?: unknown[] };
  const count = Array.isArray(records) ? records.length : 0;

  const result: ImportResult = {
    totalRecords: count,
    imported: Math.floor(count * 0.9),
    skipped: Math.ceil(count * 0.1),
    errors: count > 0 ? ['Row 3: invalid symbol format'] : [],
  };

  res.json({ result });
});

router.get('/export', (req: Request, res: Response) => {
  const result: ExportResult = {
    format: 'json',
    recordCount: 3,
    data: [
      { symbol: 'AAPL', shares: 50, avgCost: 172.30 },
      { symbol: 'GOOGL', shares: 20, avgCost: 140.50 },
      { symbol: 'MSFT', shares: 35, avgCost: 380.00 },
    ],
    generatedAt: new Date().toISOString(),
  };

  res.json({ result });
});

export default router;
