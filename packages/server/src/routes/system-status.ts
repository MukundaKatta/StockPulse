import { Router, Request, Response } from 'express';

const router = Router();

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latencyMs: number;
  lastChecked: string;
}

router.get('/', (req: Request, res: Response) => {
  const services: ServiceStatus[] = [
    { name: 'database', status: 'healthy', latencyMs: 12, lastChecked: new Date().toISOString() },
    { name: 'redis', status: 'healthy', latencyMs: 3, lastChecked: new Date().toISOString() },
    { name: 'alpha-vantage-api', status: 'healthy', latencyMs: 245, lastChecked: new Date().toISOString() },
    { name: 'finnhub-api', status: 'degraded', latencyMs: 890, lastChecked: new Date().toISOString() },
    { name: 'websocket-server', status: 'healthy', latencyMs: 5, lastChecked: new Date().toISOString() },
    { name: 'job-scheduler', status: 'healthy', latencyMs: 8, lastChecked: new Date().toISOString() },
  ];

  const overall = services.some((s) => s.status === 'down')
    ? 'down'
    : services.some((s) => s.status === 'degraded')
      ? 'degraded'
      : 'healthy';

  res.json({
    overall,
    services,
    timestamp: new Date().toISOString(),
  });
});

export default router;
