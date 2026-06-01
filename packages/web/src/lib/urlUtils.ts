export function buildQueryString(params: Record<string, string | number | boolean | undefined | null>): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return entries.length > 0 ? `?${entries.join('&')}` : '';
}

export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  const search = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!search) return result;
  for (const pair of search.split('&')) {
    const [key, value] = pair.split('=');
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
  }
  return result;
}

export function updateQueryParam(url: string, key: string, value: string | null): string {
  const [base, qs] = url.split('?');
  const params = parseQueryString(qs ?? '');
  if (value === null) delete params[key];
  else params[key] = value;
  const newQs = buildQueryString(params);
  return `${base}${newQs}`;
}

export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function joinPath(...parts: string[]): string {
  return parts
    .map((p, i) => (i === 0 ? p.replace(/\/+$/, '') : p.replace(/^\/+|\/+$/g, '')))
    .filter(Boolean)
    .join('/');
}
