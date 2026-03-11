'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Holding } from '@/types';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

interface PortfolioPieChartProps {
  holdings: Holding[];
}

export function PortfolioPieChart({ holdings }: PortfolioPieChartProps) {
  const data = holdings.map((h) => ({
    name: h.symbol,
    value: h.totalCost,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#1a1a2e',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            color: '#f0f0f5',
          }}
          formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Value']}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
