const SYMBOL_REGEX = /^[A-Z]{1,5}(\.[A-Z]{1,2})?$/;

export function isValidSymbol(symbol: string): boolean {
  return SYMBOL_REGEX.test(symbol.toUpperCase());
}

export function sanitizeSymbol(symbol: string): string {
  return symbol.toUpperCase().replace(/[^A-Z.]/g, '').slice(0, 10);
}

export function normalizeSymbols(symbols: string[]): string[] {
  return [...new Set(
    symbols
      .map(sanitizeSymbol)
      .filter(isValidSymbol)
  )];
}
