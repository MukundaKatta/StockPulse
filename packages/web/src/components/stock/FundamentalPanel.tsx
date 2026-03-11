'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatLargeNumber } from '@/lib/formatters';
import type { CompanyOverview } from '@/types';

interface FundamentalPanelProps {
  overview: CompanyOverview;
}

function MetricCard({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  const numVal = parseFloat(value);
  const display = isNaN(numVal) ? value || '-' : `${numVal.toFixed(2)}${suffix || ''}`;

  return (
    <div className="rounded-lg border border-white/[0.04] bg-[#0a0a0f] p-3">
      <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500">{label}</div>
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
          <MetricCard label="Profit Margin" value={overview.ProfitMargin} suffix="%" />
          <MetricCard label="Operating Margin" value={overview.OperatingMarginTTM} suffix="%" />
          <MetricCard label="ROE" value={overview.ReturnOnEquityTTM} suffix="%" />
          <MetricCard label="ROA" value={overview.ReturnOnAssetsTTM} suffix="%" />
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
          <MetricCard label="Div Yield" value={overview.DividendYield} suffix="%" />
          <MetricCard label="Beta" value={overview.Beta} />
          <MetricCard label="50D SMA" value={overview['50DayMovingAverage']} />
        </div>
      </Card>
    </div>
  );
}
