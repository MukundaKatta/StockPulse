'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { formatLargeNumber } from '@/lib/formatters';
import { HelpCircle } from 'lucide-react';
import type { CompanyOverview } from '@/types';

interface FundamentalPanelProps {
  overview: CompanyOverview;
}

const METRIC_TOOLTIPS: Record<string, string> = {
  'P/E Ratio': 'Price-to-Earnings ratio. Compares share price to earnings per share. Lower may indicate undervaluation.',
  'Forward P/E': 'P/E based on projected future earnings. Lower than trailing P/E suggests expected growth.',
  'PEG Ratio': 'P/E divided by earnings growth rate. Below 1.0 may indicate the stock is undervalued for its growth.',
  'P/S Ratio': 'Price-to-Sales ratio. Useful for valuing companies with no earnings. Lower is generally better.',
  'P/B Ratio': 'Price-to-Book ratio. Compares market price to book value. Below 1.0 may signal undervaluation.',
  'EV/EBITDA': 'Enterprise Value to EBITDA. Used to compare companies regardless of capital structure. Lower is cheaper.',
  'Profit Margin': 'Net income as a percentage of revenue. Higher margins indicate better profitability.',
  'Operating Margin': 'Operating income as a percentage of revenue. Measures core business profitability.',
  'ROE': 'Return on Equity. Measures profit generated per dollar of shareholder equity. Higher is better.',
  'ROA': 'Return on Assets. Measures how efficiently assets generate profit. Higher is better.',
  'EPS (TTM)': 'Earnings Per Share over the trailing twelve months.',
  'Book Value': 'Net asset value per share (total assets minus liabilities divided by shares).',
  'Market Cap': 'Total market value of all outstanding shares.',
  '52W High': 'Highest price in the last 52 weeks.',
  '52W Low': 'Lowest price in the last 52 weeks.',
  'Div Yield': 'Annual dividend payment as a percentage of the stock price.',
  'Beta': 'Measures price volatility relative to the market. Beta > 1 means more volatile than S&P 500.',
  '50D SMA': '50-day Simple Moving Average. Price above SMA suggests short-term uptrend.',
};

function MetricCard({ label, value, suffix, isRatio }: { label: string; value: string; suffix?: string; isRatio?: boolean }) {
  const numVal = parseFloat(value);
  const displayVal = isRatio && !isNaN(numVal) ? numVal * 100 : numVal;
  const display = isNaN(numVal) ? value || '-' : `${displayVal.toFixed(2)}${suffix || ''}`;
  const tooltip = METRIC_TOOLTIPS[label];

  return (
    <div className="rounded-lg border border-white/[0.04] bg-[#0a0a0f] p-3">
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
        {label}
        {tooltip && (
          <Tooltip content={tooltip}>
            <HelpCircle className="h-3 w-3 text-gray-600 hover:text-gray-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      <div className="mt-1 font-mono text-sm font-semibold text-white">{display}</div>
    </div>
  );
}

export function FundamentalPanel({ overview }: FundamentalPanelProps) {
  return (
    <div className="space-y-4">
      {/* Valuation */}
      <Card hover>
        <CardHeader>
          <CardTitle>Valuation</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <MetricCard label="P/E Ratio" value={overview.PERatio} />
          <MetricCard label="Forward P/E" value={overview.ForwardPE} />
          <MetricCard label="PEG Ratio" value={overview.PEGRatio} />
          <MetricCard label="P/S Ratio" value={overview.PriceToSalesRatioTTM} />
          <MetricCard label="P/B Ratio" value={overview.PriceToBookRatio} />
          <MetricCard label="EV/EBITDA" value={overview.EVToEBITDA} />
        </div>
      </Card>

      {/* Profitability */}
      <Card hover>
        <CardHeader>
          <CardTitle>Profitability</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <MetricCard label="Profit Margin" value={overview.ProfitMargin} suffix="%" isRatio />
          <MetricCard label="Operating Margin" value={overview.OperatingMarginTTM} suffix="%" isRatio />
          <MetricCard label="ROE" value={overview.ReturnOnEquityTTM} suffix="%" isRatio />
          <MetricCard label="ROA" value={overview.ReturnOnAssetsTTM} suffix="%" isRatio />
          <MetricCard label="EPS (TTM)" value={overview.EPS} />
          <MetricCard label="Book Value" value={overview.BookValue} />
        </div>
      </Card>

      {/* Key Stats */}
      <Card hover>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <MetricCard label="Market Cap" value={formatLargeNumber(parseFloat(overview.MarketCapitalization || '0'))} />
          <MetricCard label="52W High" value={overview['52WeekHigh']} />
          <MetricCard label="52W Low" value={overview['52WeekLow']} />
          <MetricCard label="Div Yield" value={overview.DividendYield} suffix="%" isRatio />
          <MetricCard label="Beta" value={overview.Beta} />
          <MetricCard label="50D SMA" value={overview['50DayMovingAverage']} />
        </div>
      </Card>
    </div>
  );
}
