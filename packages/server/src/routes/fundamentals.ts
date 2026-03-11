import { Router, Request, Response } from 'express';
import { z } from 'zod';
import * as fmp from '../services/fmp';
import * as finnhub from '../services/finnhub';

const router = Router();

const symbolParam = z.object({ symbol: z.string().min(1).max(10).toUpperCase() });
const periodQuery = z.object({
  period: z.enum(['annual', 'quarter']).default('quarter'),
});

router.get('/:symbol/fundamentals', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const { period } = periodQuery.parse(req.query);

  const [income, balance, cashflow, metrics, profile, fhFinancials] = await Promise.allSettled([
    fmp.getIncomeStatements(symbol, period),
    fmp.getBalanceSheet(symbol, period),
    fmp.getCashFlow(symbol, period),
    fmp.getKeyMetrics(symbol),
    fmp.getCompanyProfile(symbol),
    finnhub.getBasicFinancials(symbol),
  ]);

  res.json({
    symbol,
    income: income.status === 'fulfilled' ? income.value : [],
    balance: balance.status === 'fulfilled' ? balance.value : [],
    cashflow: cashflow.status === 'fulfilled' ? cashflow.value : [],
    metrics: metrics.status === 'fulfilled' ? metrics.value : [],
    profile: profile.status === 'fulfilled' ? profile.value : null,
    finnhubMetrics: fhFinancials.status === 'fulfilled' ? fhFinancials.value : null,
  });
});

router.get('/:symbol/earnings', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const now = new Date();
  const from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split('T')[0];
  const to = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString().split('T')[0];
  const earnings = await finnhub.getEarningsCalendar(symbol, from, to);
  res.json({ symbol, earnings });
});

export default router;
