interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

interface HttpResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export async function httpGet<T>(url: string, config: RequestConfig = {}): Promise<HttpResponse<T>> {
  return httpRequest<T>(url, { ...config, method: 'GET' });
}

export async function httpPost<T>(url: string, body: unknown, config: RequestConfig = {}): Promise<HttpResponse<T>> {
  return httpRequest<T>(url, { ...config, method: 'POST', body });
}

async function httpRequest<T>(url: string, config: RequestConfig): Promise<HttpResponse<T>> {
  const controller = new AbortController();
  const timeoutId = config.timeout ? setTimeout(() => controller.abort(), config.timeout) : null;

  try {
    const response = await fetch(url, {
      method: config.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: controller.signal,
    });

    const data = await response.json() as T;
    return { data, status: response.status, ok: response.ok };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1000): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, i)));
    }
  }
  throw new Error('Retry exhausted');
}
