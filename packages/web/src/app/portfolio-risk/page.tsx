'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { Shield, AlertTriangle, TrendingDown } from 'lucide-react';

interface RiskMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'danger';
  description: string;
}

const RISK_METRICS: RiskMetric[] = [
  { name: 'Portfolio Beta', value: '1.25', status: 'warning', description: 'Higher volatility than market' },
  { name: 'Value at Risk (95%)', value: '-$4,250', status: 'warning', description: '5% chance of losing more in a day' },
  { name: 'Max Drawdown', value: '-12.4%', status: 'warning', description: 'Largest peak-to-trough decline' },
  { name: 'Sharpe Ratio', value: '1.45', status: 'good', description: 'Risk-adjusted return above average' },
  { name: 'Sortino Ratio', value: '1.82', status: 'good', description: 'Downside risk-adjusted return' },
  { name: 'Concentration', value: '42%', status: 'danger', description: 'Top 3 holdings exceed 40%' },
  { name: 'Sector Exposure', value: '65% Tech', status: 'danger', description: 'Overweight in technology' },
  { name: 'Correlation', value: '0.78', status: 'warning', description: 'High correlation between holdings' },
];

const STRESS_TESTS = [
  { scenario: '2008 Financial Crisis', impact: -38.5, probability: 'Low' },
  { scenario: '2020 COVID Crash', impact: -28.2, probability: 'Low' },
  { scenario: 'Interest Rate +2%', impact: -12.8, probability: 'Medium' },
  { scenario: 'Tech Sector -20%', impact: -15.4, probability: 'Medium' },
  { scenario: 'Mild Recession', impact: -18.5, probability: 'Medium' },
  { scenario: 'Inflation Spike', impact: -8.2, probability: 'High' },
];

export default function PortfolioRiskPage() {
  const overallRisk = RISK_METRICS.filter((m) => m.status === 'danger').length > 0 ? 'High' :
    RISK_METRICS.filter((m) => m.status === 'warning').length > 2 ? 'Moderate' : 'Low';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Portfolio Risk Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">Comprehensive risk assessment and stress testing</p>
        </div>
        <Badge variant={overallRisk === 'High' ? 'danger' : overallRisk === 'Moderate' ? 'warning' : 'success'}>
          <Shield className="h-3 w-3 mr-1" /> Risk: {overallRisk}
        </Badge>
      </div>

      {/* Risk Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RISK_METRICS.map((metric) => (
          <Card key={metric.name} className="!p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-gray-500 uppercase">{metric.name}</p>
              <div className={cn('w-2 h-2 rounded-full', metric.status === 'good' ? 'bg-green-500' : metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500')} />
            </div>
            <p className={cn('text-sm font-bold font-mono', metric.status === 'good' ? 'text-green-400' : metric.status === 'warning' ? 'text-amber-400' : 'text-red-400')}>
              {metric.value}
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">{metric.description}</p>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      {RISK_METRICS.filter((m) => m.status === 'danger').length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-400">Risk Warnings</p>
            <ul className="mt-1 space-y-1 text-xs text-gray-400">
              <li>Portfolio concentration exceeds safe limits. Consider diversifying top holdings.</li>
              <li>Technology sector overweight. Add exposure to defensive sectors.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Stress Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-400" />
            Stress Test Scenarios
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {STRESS_TESTS.map((test) => (
            <div key={test.scenario} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/[0.02]">
              <div className="flex-1">
                <p className="text-sm text-white">{test.scenario}</p>
                <p className="text-[10px] text-gray-600">Probability: {test.probability}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-red-400">{test.impact.toFixed(1)}%</p>
                <p className="text-[10px] text-gray-600">{formatCurrency(100000 * test.impact / 100)} on $100K</p>
              </div>
              <div className="w-16">
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-red-500/60" style={{ width: `${Math.abs(test.impact) / 40 * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
