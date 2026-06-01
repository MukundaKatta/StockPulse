/**
 * Currency conversion and formatting utilities.
 */

export interface ExchangeRates {
  [currency: string]: number;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  KRW: '₩',
  INR: '₹',
  BRL: 'R$',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
};

/** Convert an amount from one currency to another using provided rates. */
export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: ExchangeRates
): number {
  const fromRate = rates[from];
  const toRate = rates[to];

  if (fromRate === undefined) throw new Error(`Unknown currency: ${from}`);
  if (toRate === undefined) throw new Error(`Unknown currency: ${to}`);

  // Rates are relative to a base (e.g., USD=1)
  return (amount / fromRate) * toRate;
}

/** Get the symbol for a currency code. */
export function getCurrencySymbol(currencyCode: string): string {
  return currencySymbols[currencyCode.toUpperCase()] ?? currencyCode;
}

/** Format a number with a currency symbol and locale-aware formatting. */
export function formatWithCurrency(
  amount: number,
  currencyCode: string,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Parse a currency string like "$1,234.56" or "1.234,56 EUR" into a number. */
export function parseCurrencyString(value: string): number {
  // Remove currency symbols and whitespace
  const cleaned = value.replace(/[^\d.,-]/g, '');

  // Handle European format (1.234,56) vs US format (1,234.56)
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');

  let normalized: string;
  if (lastComma > lastDot) {
    // European format: dots are thousand separators, comma is decimal
    normalized = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    // US format: commas are thousand separators
    normalized = cleaned.replace(/,/g, '');
  }

  const result = parseFloat(normalized);
  if (isNaN(result)) throw new Error(`Cannot parse currency string: ${value}`);
  return result;
}
