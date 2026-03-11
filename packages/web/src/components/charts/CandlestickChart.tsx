'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import { CHART_COLORS, TIMEFRAMES } from '@/lib/constants';
import type { OHLCV, TechnicalIndicators } from '@/types';
import { cn } from '@/lib/formatters';

interface CandlestickChartProps {
  data: OHLCV[];
  onTimeframeIdxChange?: (idx: number) => void;
  currentTimeframeIdx?: number;
  indicators?: TechnicalIndicators;
  height?: number;
}

const OVERLAYS = [
  { key: 'sma20' as const, label: 'SMA 20', color: '#f59e0b' },
  { key: 'sma50' as const, label: 'SMA 50', color: '#6366f1' },
  { key: 'sma200' as const, label: 'SMA 200', color: '#ec4899' },
  { key: 'bbands' as const, label: 'Bollinger', color: '#8b5cf6' },
];

type OverlayKey = 'sma20' | 'sma50' | 'sma200' | 'bbands';

export function CandlestickChart({ data, onTimeframeIdxChange, currentTimeframeIdx = 4, indicators, height = 400 }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const overlaySeriesRef = useRef<ISeriesApi<'Line'>[]>([]);
  const [activeOverlays, setActiveOverlays] = useState<Set<OverlayKey>>(new Set());

  const toggleOverlay = (key: OverlayKey) => {
    setActiveOverlays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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

    if (data.length > 0) {
      const timestamps = data.map((d) => d.timestamp.split(' ')[0] as Time);

      const candleData = data.map((d, i) => ({
        time: timestamps[i],
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));

      const volumeData = data.map((d, i) => ({
        time: timestamps[i],
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
      chartRef.current = null;
    };
  }, [height, data]);

  // Separate effect for overlay toggling — avoids recreating the chart
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !indicators?.timestamps?.length) return;

    // Remove old overlay series
    for (const s of overlaySeriesRef.current) {
      try { chart.removeSeries(s); } catch { /* already removed */ }
    }
    overlaySeriesRef.current = [];

    const indTimes = indicators.timestamps.map((t) => t.split(' ')[0] as Time);

    const addLineSeries = (values: (number | null)[], color: string, lineStyle?: number) => {
      const series = chart.addSeries(LineSeries, {
        color,
        lineWidth: 1,
        lineStyle: lineStyle ?? 0,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      const lineData = values
        .map((v, i) => v !== null ? { time: indTimes[i], value: v } : null)
        .filter(Boolean) as { time: Time; value: number }[];
      if (lineData.length > 0) series.setData(lineData);
      overlaySeriesRef.current.push(series);
    };

    if (activeOverlays.has('sma20') && indicators.sma?.sma20) {
      addLineSeries(indicators.sma.sma20, '#f59e0b');
    }
    if (activeOverlays.has('sma50') && indicators.sma?.sma50) {
      addLineSeries(indicators.sma.sma50, '#6366f1');
    }
    if (activeOverlays.has('sma200') && indicators.sma?.sma200) {
      addLineSeries(indicators.sma.sma200, '#ec4899');
    }
    if (activeOverlays.has('bbands') && indicators.bollingerBands) {
      addLineSeries(indicators.bollingerBands.upper, 'rgba(139, 92, 246, 0.5)', 2);
      addLineSeries(indicators.bollingerBands.middle, 'rgba(139, 92, 246, 0.3)');
      addLineSeries(indicators.bollingerBands.lower, 'rgba(139, 92, 246, 0.5)', 2);
    }
  }, [activeOverlays, indicators]);

  return (
    <div className="space-y-2">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Timeframe buttons */}
        <div className="flex gap-1">
          {TIMEFRAMES.map((tf, idx) => (
            <button
              key={tf.label}
              onClick={() => onTimeframeIdxChange?.(idx)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-all',
                currentTimeframeIdx === idx
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              )}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Overlay toggles */}
        <div className="flex gap-1">
          {OVERLAYS.map((overlay) => (
            <button
              key={overlay.key}
              onClick={() => toggleOverlay(overlay.key)}
              className={cn(
                'rounded-md px-2 py-1 text-[10px] font-medium transition-all border',
                activeOverlays.has(overlay.key)
                  ? 'border-white/20 text-white bg-white/10'
                  : 'border-transparent text-gray-600 hover:text-gray-400'
              )}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: overlay.color }} />
              {overlay.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div ref={chartContainerRef} className="rounded-lg" />
    </div>
  );
}
