'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatLargeNumber, formatPercent, cn } from '@/lib/formatters';
import { Sparkles, TrendingUp, TrendingDown, Target, BarChart3, AlertTriangle } from 'lucide-react';
import type { StockQuote, CompanyOverview, TechnicalIndicators } from '@/types';

interface StockInsightsProps {
  quote: StockQuote;
  overview?: CompanyOverview | null;
  indicators?: TechnicalIndicators | null;
}

interface Insight {
  icon: typeof TrendingUp;
  text: string;
  type: 'bullish' | 'bearish' | 'neutral' | 'info';
}

function generateInsights(quote: StockQuote, overview?: CompanyOverview | null, indicators?: TechnicalIndicators | null): Insight[] {
  const insights: Insight[] = [];

  // Price vs 52-week range
  if (overview) {
    const high52 = parseFloat(overview['52WeekHigh']);
    const low52 = parseFloat(overview['52WeekLow']);
    if (high52 && low52) {
      const range = high52 - low52;
      const posInRange = ((quote.price - low52) / range) * 100;
      if (posInRange > 90) {
        insights.push({ icon: TrendingUp, text: `Trading near its 52-week high (${formatCurrency(high52)}), within ${((high52 - quote.price) / high52 * 100).toFixed(1)}% of the peak`, type: 'bullish' });
      } else if (posInRange < 10) {
        insights.push({ icon: TrendingDown, text: `Near 52-week low (${formatCurrency(low52)}), ${((quote.price - low52) / low52 * 100).toFixed(1)}% above the bottom`, type: 'bearish' });
      } else if (posInRange > 50) {
        insights.push({ icon: BarChart3, text: `Trading in the upper half of its 52-week range at ${posInRange.toFixed(0)}%`, type: 'neutral' });
      }
    }

    // P/E analysis
    const pe = parseFloat(overview.PERatio);
    const forwardPE = parseFloat(overview.ForwardPE);
    if (!isNaN(pe)) {
      if (pe > 40) {
        insights.push({ icon: AlertTriangle, text: `High P/E ratio of ${pe.toFixed(1)} suggests premium valuation or high growth expectations`, type: 'bearish' });
      } else if (pe < 15 && pe > 0) {
        insights.push({ icon: Target, text: `P/E of ${pe.toFixed(1)} may indicate undervaluation relative to earnings`, type: 'bullish' });
      }
      if (!isNaN(forwardPE) && forwardPE > 0 && pe > 0) {
        if (forwardPE < pe * 0.8) {
          insights.push({ icon: TrendingUp, text: `Forward P/E (${forwardPE.toFixed(1)}) significantly below trailing (${pe.toFixed(1)}), suggesting expected earnings growth`, type: 'bullish' });
        }
      }
    }

    // Dividend
    const divYield = parseFloat(overview.DividendYield);
    if (!isNaN(divYield) && divYield > 0) {
      if (divYield > 0.04) {
        insights.push({ icon: Target, text: `Strong dividend yield of ${(divYield * 100).toFixed(2)}% provides income potential`, type: 'bullish' });
      } else if (divYield > 0.02) {
        insights.push({ icon: BarChart3, text: `Pays a ${(divYield * 100).toFixed(2)}% dividend yield`, type: 'info' });
      }
    }

    // Profitability
    const profitMargin = parseFloat(overview.ProfitMargin);
    if (!isNaN(profitMargin)) {
      if (profitMargin > 0.20) {
        insights.push({ icon: TrendingUp, text: `Strong profit margin of ${(profitMargin * 100).toFixed(1)}% indicates pricing power and operational efficiency`, type: 'bullish' });
      } else if (profitMargin < 0) {
        insights.push({ icon: AlertTriangle, text: `Currently unprofitable with ${(profitMargin * 100).toFixed(1)}% net margin`, type: 'bearish' });
      }
    }

    // SMA comparison
    const sma50 = parseFloat(overview['50DayMovingAverage']);
    const sma200 = parseFloat(overview['200DayMovingAverage']);
    if (!isNaN(sma50) && !isNaN(sma200)) {
      if (quote.price > sma50 && sma50 > sma200) {
        insights.push({ icon: TrendingUp, text: `Price above both 50-day and 200-day moving averages — bullish trend alignment`, type: 'bullish' });
      } else if (quote.price < sma50 && sma50 < sma200) {
        insights.push({ icon: TrendingDown, text: `Price below both 50-day and 200-day moving averages — bearish trend alignment`, type: 'bearish' });
      } else if (sma50 > sma200 && quote.price < sma50) {
        insights.push({ icon: BarChart3, text: `Price pulled back below 50-day SMA but long-term trend remains positive (golden cross intact)`, type: 'neutral' });
      }
    }
  }

  // Technical indicators
  if (indicators) {
    const rsi = indicators.rsi.current;
    if (rsi !== null) {
      if (rsi > 70) {
        insights.push({ icon: AlertTriangle, text: `RSI at ${rsi.toFixed(1)} indicates overbought conditions — potential for pullback`, type: 'bearish' });
      } else if (rsi < 30) {
        insights.push({ icon: Target, text: `RSI at ${rsi.toFixed(1)} signals oversold conditions — potential bounce opportunity`, type: 'bullish' });
      }
    }

    const macdHist = indicators.macd.current.histogram;
    const macd = indicators.macd.current.macd;
    const signal = indicators.macd.current.signal;
    if (macd !== null && signal !== null) {
      if (macd > signal && macdHist && macdHist > 0) {
        insights.push({ icon: TrendingUp, text: `MACD is bullish with positive histogram momentum`, type: 'bullish' });
      } else if (macd < signal && macdHist && macdHist < 0) {
        insights.push({ icon: TrendingDown, text: `MACD shows bearish crossover with negative momentum`, type: 'bearish' });
      }
    }
  }

  // Daily change
  if (Math.abs(quote.changePercent) > 3) {
    const dir = quote.changePercent > 0 ? 'gained' : 'lost';
    insights.push({ icon: quote.changePercent > 0 ? TrendingUp : TrendingDown, text: `Stock ${dir} ${Math.abs(quote.changePercent).toFixed(2)}% today on ${(quote.volume / 1e6).toFixed(1)}M volume`, type: quote.changePercent > 0 ? 'bullish' : 'bearish' });
  }

  return insights.slice(0, 6);
}

function generateSummary(quote: StockQuote, overview?: CompanyOverview | null, indicators?: TechnicalIndicators | null): string {
  const parts: string[] = [];

  if (overview?.Name) {
    parts.push(`${overview.Name} (${quote.symbol}) is currently trading at ${formatCurrency(quote.price)}`);
  } else {
    parts.push(`${quote.symbol} is trading at ${formatCurrency(quote.price)}`);
  }

  const changeDir = quote.change >= 0 ? 'up' : 'down';
  parts[0] += `, ${changeDir} ${Math.abs(quote.changePercent).toFixed(2)}% today.`;

  if (overview) {
    const marketCap = parseFloat(overview.MarketCapitalization || '0');
    if (marketCap > 0) {
      parts.push(`With a ${formatLargeNumber(marketCap)} market cap`);
      const pe = parseFloat(overview.PERatio);
      if (!isNaN(pe) && pe > 0) {
        parts[parts.length - 1] += ` and ${pe.toFixed(1)}x earnings`;
      }
      parts[parts.length - 1] += `, the stock`;
    }
  }

  if (indicators?.signal) {
    const { signal, confidence } = indicators.signal;
    const signalText = signal === 'BUY' ? 'shows bullish signals' : signal === 'SELL' ? 'shows bearish signals' : 'is in a neutral stance';
    if (parts.length > 1) {
      parts[parts.length - 1] += ` ${signalText} with ${confidence}% technical confidence.`;
    } else {
      parts.push(`Technical analysis ${signalText} with ${confidence}% confidence.`);
    }
  }

  return parts.join(' ');
}

export function StockInsights({ quote, overview, indicators }: StockInsightsProps) {
  const insights = useMemo(() => generateInsights(quote, overview, indicators), [quote, overview, indicators]);
  const summary = useMemo(() => generateSummary(quote, overview, indicators), [quote, overview, indicators]);

  if (insights.length === 0) return null;

  const bullishCount = insights.filter((i) => i.type === 'bullish').length;
  const bearishCount = insights.filter((i) => i.type === 'bearish').length;
  const sentiment = bullishCount > bearishCount ? 'bullish' : bearishCount > bullishCount ? 'bearish' : 'neutral';

  return (
    <Card hover>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          AI Insights
        </CardTitle>
        <Badge variant={sentiment === 'bullish' ? 'success' : sentiment === 'bearish' ? 'danger' : 'default'}>
          {sentiment === 'bullish' ? 'Bullish' : sentiment === 'bearish' ? 'Bearish' : 'Mixed'}
          {' '}{bullishCount}B / {bearishCount}S
        </Badge>
      </CardHeader>

      <p className="text-sm text-gray-400 leading-relaxed mb-4">{summary}</p>

      <div className="space-y-2">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={cn(
                'flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm',
                insight.type === 'bullish' ? 'bg-green-500/5 text-green-300' :
                insight.type === 'bearish' ? 'bg-red-500/5 text-red-300' :
                insight.type === 'info' ? 'bg-indigo-500/5 text-indigo-300' :
                'bg-white/[0.02] text-gray-400'
              )}
            >
              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{insight.text}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
