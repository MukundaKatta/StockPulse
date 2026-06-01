export interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface LineSeriesData {
  date: string;
  value: number;
}

export interface AreaSeriesData {
  date: string;
  value: number;
  upperBound?: number;
  lowerBound?: number;
}

export interface BarSeriesData {
  label: string;
  value: number;
  color?: string;
}

export interface PieSlice {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  size?: number;
  color?: string;
}

export interface ChartConfig {
  type: 'candle' | 'line' | 'area' | 'bar' | 'pie' | 'scatter';
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
}

export interface ChartAnnotation {
  type: 'line' | 'rect' | 'text';
  x?: number | string;
  y?: number;
  x2?: number | string;
  y2?: number;
  label?: string;
  color?: string;
}
