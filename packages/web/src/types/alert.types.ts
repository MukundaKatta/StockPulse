export type AlertType = 'price_above' | 'price_below' | 'pct_change_up' | 'pct_change_down' | 'volume_spike' | 'rsi_overbought' | 'rsi_oversold' | 'ma_crossover' | 'earnings' | 'dividend';

export type AlertChannel = 'push' | 'email' | 'sms' | 'in_app';

export interface AlertConfig {
  id: string;
  symbol: string;
  type: AlertType;
  threshold: number;
  channels: AlertChannel[];
  active: boolean;
  recurring: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface AlertEvent {
  id: string;
  alertId: string;
  symbol: string;
  type: AlertType;
  message: string;
  value: number;
  triggeredAt: string;
  acknowledged: boolean;
}

export interface AlertSummary {
  total: number;
  active: number;
  triggered: number;
  byType: Record<AlertType, number>;
}
