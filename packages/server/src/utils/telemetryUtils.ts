export interface TelemetryEvent {
  id: string;
  name: string;
  category: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

export interface TelemetryMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
}

export interface TelemetrySpan {
  id: string;
  name: string;
  traceId: string;
  parentSpanId: string | null;
  startTime: string;
  endTime: string | null;
  durationMs: number | null;
  status: 'ok' | 'error' | 'in_progress';
  attributes: Record<string, unknown>;
}

const eventBuffer: TelemetryEvent[] = [];
const metricBuffer: TelemetryMetric[] = [];
const spanBuffer: TelemetrySpan[] = [];
const MAX_BUFFER_SIZE = 5000;

let idCounter = 0;

function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${(++idCounter).toString(36)}`;
}

/**
 * Track a telemetry event.
 */
export function trackEvent(
  name: string,
  category: string,
  properties: Record<string, unknown> = {}
): TelemetryEvent {
  const event: TelemetryEvent = {
    id: generateId('evt'),
    name,
    category,
    properties,
    timestamp: new Date().toISOString(),
  };

  eventBuffer.push(event);

  if (eventBuffer.length > MAX_BUFFER_SIZE) {
    eventBuffer.splice(0, eventBuffer.length - MAX_BUFFER_SIZE);
  }

  return event;
}

/**
 * Track a numeric metric.
 */
export function trackMetric(
  name: string,
  value: number,
  unit = 'count',
  tags: Record<string, string> = {}
): TelemetryMetric {
  const metric: TelemetryMetric = {
    id: generateId('mtc'),
    name,
    value,
    unit,
    tags,
    timestamp: new Date().toISOString(),
  };

  metricBuffer.push(metric);

  if (metricBuffer.length > MAX_BUFFER_SIZE) {
    metricBuffer.splice(0, metricBuffer.length - MAX_BUFFER_SIZE);
  }

  return metric;
}

/**
 * Create a new tracing span. Call endSpan() when the operation completes.
 */
export function createSpan(
  name: string,
  traceId?: string,
  parentSpanId?: string | null,
  attributes: Record<string, unknown> = {}
): TelemetrySpan {
  const span: TelemetrySpan = {
    id: generateId('spn'),
    name,
    traceId: traceId || generateId('trc'),
    parentSpanId: parentSpanId || null,
    startTime: new Date().toISOString(),
    endTime: null,
    durationMs: null,
    status: 'in_progress',
    attributes,
  };

  spanBuffer.push(span);

  if (spanBuffer.length > MAX_BUFFER_SIZE) {
    spanBuffer.splice(0, spanBuffer.length - MAX_BUFFER_SIZE);
  }

  return span;
}

/**
 * End a span and record its duration.
 */
export function endSpan(
  spanId: string,
  status: 'ok' | 'error' = 'ok',
  attributes?: Record<string, unknown>
): TelemetrySpan | null {
  const span = spanBuffer.find((s) => s.id === spanId);
  if (!span) return null;

  span.endTime = new Date().toISOString();
  span.durationMs = new Date(span.endTime).getTime() - new Date(span.startTime).getTime();
  span.status = status;

  if (attributes) {
    Object.assign(span.attributes, attributes);
  }

  return span;
}

/**
 * Flush all buffered telemetry data and return it.
 * Clears the internal buffers after flush.
 */
export function flushTelemetry(): {
  events: TelemetryEvent[];
  metrics: TelemetryMetric[];
  spans: TelemetrySpan[];
  flushedAt: string;
} {
  const result = {
    events: [...eventBuffer],
    metrics: [...metricBuffer],
    spans: [...spanBuffer],
    flushedAt: new Date().toISOString(),
  };

  eventBuffer.length = 0;
  metricBuffer.length = 0;
  spanBuffer.length = 0;

  return result;
}

/**
 * Get current buffer sizes for monitoring.
 */
export function getBufferStats(): {
  events: number;
  metrics: number;
  spans: number;
  maxBufferSize: number;
} {
  return {
    events: eventBuffer.length,
    metrics: metricBuffer.length,
    spans: spanBuffer.length,
    maxBufferSize: MAX_BUFFER_SIZE,
  };
}
