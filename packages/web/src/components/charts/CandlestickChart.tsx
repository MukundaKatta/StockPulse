'use client';

import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import type { IChartApi, Time } from 'lightweight-charts';
import { CHART_COLORS, TIMEFRAMES } from '@/lib/constants';
import type { OHLCV } from '@/types';
import { cn } from '@/lib/formatters';

interface CandlestickChartProps {
  data: OHLCV[];
  onTimeframeChange?: (timeframe: string) => void;
  currentTimeframe?: string;
  height?: number;
}

export function CandlestickChart({ data, onTimeframeChange, currentTimeframe = 'daily', height = 400 }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: CHART_COLORS.textMuted,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: 'rgba(99, 102, 241, 0.3)',
          width: 1,
          style: 2,
          labelBackgroundColor: '#6366f1',
        },
        horzLine: {
          color: 'rgba(99, 102, 241, 0.3)',
          width: 1,
          style: 2,
          labelBackgroundColor: '#6366f1',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.06)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.06)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: CHART_COLORS.green,
      downColor: CHART_COLORS.red,
      borderUpColor: CHART_COLORS.green,
      borderDownColor: CHART_COLORS.red,
      wickUpColor: CHART_COLORS.green,
      wickDownColor: CHART_COLORS.red,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });

    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    });

    // Set data
    if (data.length > 0) {
      const candleData = data.map((d) => ({
        time: d.timestamp.split(' ')[0] as Time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));

      const volumeData = data.map((d) => ({
        time: d.timestamp.split(' ')[0] as Time,
        value: d.volume,
        color: d.close >= d.open ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
      }));

      candleSeries.setData(candleData);
      volumeSeries.setData(volumeData);
      chart.timeScale().fitContent();
    }

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [height, data]);

  return (
    <div className="space-y-2">
      {/* Timeframe buttons */}
      <div className="flex gap-1">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.label}
            onClick={() => onTimeframeChange?.(tf.value)}
            className={cn(
              'rounded-md px-3 py-1 text-xs font-medium transition-all',
              currentTimeframe === tf.value
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
            )}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div ref={chartContainerRef} className="rounded-lg" />
    </div>
  );
}
