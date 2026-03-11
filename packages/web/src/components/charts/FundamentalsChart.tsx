'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { formatLargeNumber } from '@/lib/formatters';
import type { IncomeStatement } from '@/types';

interface FundamentalsChartProps {
  data: IncomeStatement[];
  type?: 'revenue' | 'eps' | 'margins';
}

export function FundamentalsChart({ data, type = 'revenue' }: FundamentalsChartProps) {
  const chartData = [...data].reverse().map((d) => ({
    date: d.date.slice(0, 7),
    revenue: d.revenue,
    netIncome: d.netIncome,
    eps: d.epsdiluted,
    grossMargin: (d.grossProfitRatio * 100),
    operatingMargin: (d.operatingIncomeRatio * 100),
    netMargin: (d.netIncomeRatio * 100),
  }));

  if (type === 'eps') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#f0f0f5' }}
          />
          <Bar dataKey="eps" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'margins') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
            labelStyle={{ color: '#9ca3af' }}
            formatter={(value) => `${Number(value).toFixed(1)}%`}
          />
          <Line type="monotone" dataKey="grossMargin" stroke="#22c55e" name="Gross" dot={false} />
          <Line type="monotone" dataKey="operatingMargin" stroke="#6366f1" name="Operating" dot={false} />
          <Line type="monotone" dataKey="netMargin" stroke="#8b5cf6" name="Net" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
        <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} tickFormatter={(v) => formatLargeNumber(v)} />
        <Tooltip
          contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
          labelStyle={{ color: '#9ca3af' }}
          formatter={(value) => formatLargeNumber(Number(value))}
        />
        <Bar dataKey="revenue" fill="rgba(99, 102, 241, 0.3)" radius={[4, 4, 0, 0]} name="Revenue" />
        <Line type="monotone" dataKey="netIncome" stroke="#22c55e" name="Net Income" dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
