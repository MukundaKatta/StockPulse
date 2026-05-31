'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, cn } from '@/lib/formatters';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

interface PeerComparisonProps {
  symbol: string;
  sector?: string;
}

const SECTOR_PEERS: Record<string, string[]> = {
  'TECHNOLOGY': ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMZN'],
  'HEALTHCARE': ['UNH', 'JNJ', 'LLY', 'PFE', 'ABBV', 'MRK'],
  'FINANCIAL SERVICES': ['JPM', 'V', 'MA', 'BAC', 'GS', 'MS'],
  'CONSUMER CYCLICAL': ['AMZN', 'TSLA', 'HD', 'NKE', 'MCD', 'SBUX'],
  'ENERGY': ['XOM', 'CVX', 'COP', 'SLB', 'EOG', 'MPC'],
};

export function PeerComparison({ symbol, sector }: PeerComparisonProps) {
  const peers = Object.entries(SECTOR_PEERS).find(
    ([key]) => sector?.toUpperCase().includes(key) || key.includes(sector?.toUpperCase() || '')
  )?.[1]?.filter((s) => s !== symbol).slice(0, 4) || [];

  const { data: peerData = [] } = useQuery({
    queryKey: ['peers', symbol, peers.join(',')],
    queryFn: async () => {
      const results = await Promise.allSettled(
        peers.map(async (sym) => {
          const { data } = await api.get(`/api/stocks/${sym}/quote`);
          return { symbol: sym, ...data.quote };
        })
      );
      return results
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .map((r) => r.value);
    },
    enabled: peers.length > 0,
    staleTime: 60000,
  });

  if (peers.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Users className="mr-1 inline h-4 w-4" />
          Peers
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {peerData.map((peer: any) => {
          const isPositive = (peer.changePercent || 0) >= 0;
          return (
            <Link
              key={peer.symbol}
              href={`/stock/${peer.symbol}`}
              className="rounded-lg border border-white/[0.06] p-2.5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-white">{peer.symbol}</span>
                {isPositive
                  ? <TrendingUp className="h-3 w-3 text-green-400" />
                  : <TrendingDown className="h-3 w-3 text-red-400" />
                }
              </div>
              <div className="font-mono text-sm text-gray-300">{formatCurrency(peer.price || 0)}</div>
              <div className={cn('text-[10px] font-mono', isPositive ? 'text-green-400' : 'text-red-400')}>
                {formatPercent(peer.changePercent || 0)}
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
