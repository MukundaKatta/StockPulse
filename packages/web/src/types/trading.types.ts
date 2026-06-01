export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop';
export type OrderStatus = 'pending' | 'filled' | 'partial' | 'cancelled' | 'rejected' | 'expired';
export type TimeInForce = 'day' | 'gtc' | 'ioc' | 'fok';

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  quantity: number;
  filledQuantity: number;
  price?: number;
  stopPrice?: number;
  trailPct?: number;
  avgFillPrice?: number;
  timeInForce: TimeInForce;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  symbol: string;
  side: 'long' | 'short';
  quantity: number;
  avgEntry: number;
  currentPrice: number;
  unrealizedPnl: number;
  realizedPnl: number;
  openedAt: string;
}

export interface TradeExecution {
  id: string;
  orderId: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  timestamp: string;
  fees: number;
}

export interface TradeSignal {
  symbol: string;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  source: string;
  timestamp: string;
  reason: string;
}
