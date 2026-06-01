import { Request, Response, NextFunction } from 'express';

type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
}

interface CircuitBreakerState {
  state: CircuitState;
  failures: number;
  lastFailureTime: number;
}

const circuits: Map<string, CircuitBreakerState> = new Map();

export function circuitBreaker(
  name: string,
  options: CircuitBreakerOptions = { failureThreshold: 5, resetTimeoutMs: 30000 }
) {
  if (!circuits.has(name)) {
    circuits.set(name, { state: 'closed', failures: 0, lastFailureTime: 0 });
  }

  return (req: Request, res: Response, next: NextFunction): void => {
    const circuit = circuits.get(name)!;

    if (circuit.state === 'open') {
      const elapsed = Date.now() - circuit.lastFailureTime;
      if (elapsed >= options.resetTimeoutMs) {
        circuit.state = 'half-open';
      } else {
        res.status(503).json({ error: 'Service temporarily unavailable', circuit: name });
        return;
      }
    }

    const originalEnd = res.end.bind(res);
    res.end = function (...args: Parameters<typeof res.end>) {
      if (res.statusCode >= 500) {
        circuit.failures++;
        circuit.lastFailureTime = Date.now();
        if (circuit.failures >= options.failureThreshold) {
          circuit.state = 'open';
        }
      } else {
        if (circuit.state === 'half-open') {
          circuit.state = 'closed';
          circuit.failures = 0;
        }
      }
      return originalEnd(...args);
    } as typeof res.end;

    next();
  };
}
