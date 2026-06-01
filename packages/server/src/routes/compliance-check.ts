import { Router, Request, Response } from 'express';

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'position_limit' | 'concentration' | 'restricted' | 'wash_sale' | 'insider';
  status: 'active' | 'inactive';
  threshold: number | null;
}

interface ComplianceViolation {
  id: string;
  ruleId: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  detectedAt: string;
  resolved: boolean;
}

interface TradeValidationRequest {
  symbol: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  accountId?: string;
}

interface TradeValidationResult {
  approved: boolean;
  trade: TradeValidationRequest;
  violations: string[];
  warnings: string[];
  checkedRules: string[];
}

const rules: ComplianceRule[] = [
  {
    id: 'rule-001',
    name: 'Single Position Limit',
    description: 'No single position may exceed 25% of portfolio value',
    category: 'concentration',
    status: 'active',
    threshold: 25,
  },
  {
    id: 'rule-002',
    name: 'Maximum Order Size',
    description: 'Individual orders cannot exceed $500,000',
    category: 'position_limit',
    status: 'active',
    threshold: 500000,
  },
  {
    id: 'rule-003',
    name: 'Restricted Securities',
    description: 'Trading restricted securities is prohibited',
    category: 'restricted',
    status: 'active',
    threshold: null,
  },
  {
    id: 'rule-004',
    name: 'Wash Sale Prevention',
    description: 'Warn on potential wash sale violations within 30-day window',
    category: 'wash_sale',
    status: 'active',
    threshold: 30,
  },
  {
    id: 'rule-005',
    name: 'Insider Trading Blackout',
    description: 'Block trades during blackout periods for insider accounts',
    category: 'insider',
    status: 'active',
    threshold: null,
  },
];

const recentViolations: ComplianceViolation[] = [
  {
    id: 'viol-001',
    ruleId: 'rule-001',
    severity: 'warning',
    message: 'NVDA position approaching 25% concentration limit (currently 22.8%)',
    detectedAt: '2026-05-30T14:30:00Z',
    resolved: false,
  },
  {
    id: 'viol-002',
    ruleId: 'rule-004',
    severity: 'info',
    message: 'Potential wash sale detected: TSLA sold on 05/15, repurchased within 30 days',
    detectedAt: '2026-05-28T10:15:00Z',
    resolved: true,
  },
];

const restrictedSymbols = new Set(['ENRON', 'LMND', 'SPCE']);

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const activeRules = rules.filter((r) => r.status === 'active');
  const unresolvedViolations = recentViolations.filter((v) => !v.resolved);

  res.json({
    success: true,
    data: {
      overallStatus: unresolvedViolations.some((v) => v.severity === 'critical')
        ? 'non_compliant'
        : unresolvedViolations.length > 0
          ? 'warnings'
          : 'compliant',
      rules: {
        total: rules.length,
        active: activeRules.length,
        items: rules,
      },
      violations: {
        total: recentViolations.length,
        unresolved: unresolvedViolations.length,
        items: recentViolations,
      },
      lastChecked: new Date().toISOString(),
    },
  });
});

router.post('/validate', (req: Request, res: Response) => {
  const trade: TradeValidationRequest = req.body;

  if (!trade.symbol || !trade.action || !trade.quantity || !trade.price) {
    res.status(400).json({
      success: false,
      error: 'symbol, action, quantity, and price are required',
    });
    return;
  }

  const violations: string[] = [];
  const warnings: string[] = [];
  const checkedRules: string[] = [];

  // Check restricted securities
  checkedRules.push('Restricted Securities');
  if (restrictedSymbols.has(trade.symbol.toUpperCase())) {
    violations.push(`${trade.symbol} is a restricted security and cannot be traded`);
  }

  // Check maximum order size
  checkedRules.push('Maximum Order Size');
  const orderValue = trade.quantity * trade.price;
  if (orderValue > 500000) {
    violations.push(
      `Order value ($${orderValue.toLocaleString()}) exceeds maximum of $500,000`
    );
  } else if (orderValue > 400000) {
    warnings.push(
      `Order value ($${orderValue.toLocaleString()}) is approaching maximum of $500,000`
    );
  }

  // Check concentration
  checkedRules.push('Single Position Limit');
  if (orderValue > 250000) {
    warnings.push('Large order may cause concentration limit breach; review portfolio allocation');
  }

  // Wash sale check
  checkedRules.push('Wash Sale Prevention');
  if (trade.action === 'BUY') {
    warnings.push(`Verify no wash sale: check for ${trade.symbol} sales in the past 30 days`);
  }

  const result: TradeValidationResult = {
    approved: violations.length === 0,
    trade,
    violations,
    warnings,
    checkedRules,
  };

  res.json({
    success: true,
    data: result,
  });
});

export default router;
