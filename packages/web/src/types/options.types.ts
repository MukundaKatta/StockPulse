export type OptionType = 'call' | 'put';

export interface OptionContract {
  symbol: string;
  underlying: string;
  type: OptionType;
  strike: number;
  expiration: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  inTheMoney: boolean;
}

export interface OptionChain {
  underlying: string;
  underlyingPrice: number;
  expirations: string[];
  calls: OptionContract[];
  puts: OptionContract[];
}

export interface OptionStrategy {
  name: string;
  legs: OptionLeg[];
  maxProfit: number | 'unlimited';
  maxLoss: number | 'unlimited';
  breakeven: number[];
  netDebit: number;
}

export interface OptionLeg {
  type: OptionType;
  side: 'buy' | 'sell';
  strike: number;
  expiration: string;
  quantity: number;
  premium: number;
}

export interface GreeksSnapshot {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  iv: number;
}
