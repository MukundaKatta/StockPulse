import { Request, Response, NextFunction } from 'express';

interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedEnd: string | null;
  allowedPaths: string[];
  allowedIPs: string[];
  retryAfterSeconds: number;
}

const maintenanceConfig: MaintenanceConfig = {
  enabled: false,
  message: 'The system is currently undergoing scheduled maintenance. Please try again later.',
  estimatedEnd: null,
  allowedPaths: ['/health', '/api/health', '/api/status'],
  allowedIPs: [],
  retryAfterSeconds: 300,
};

export function setMaintenanceMode(config: Partial<MaintenanceConfig>): void {
  Object.assign(maintenanceConfig, config);
}

export function getMaintenanceConfig(): Readonly<MaintenanceConfig> {
  return { ...maintenanceConfig };
}

export function maintenanceMode(req: Request, res: Response, next: NextFunction): void {
  if (!maintenanceConfig.enabled) {
    next();
    return;
  }

  // Allow health-check and status paths through
  const isAllowedPath = maintenanceConfig.allowedPaths.some((path) =>
    req.path.startsWith(path)
  );
  if (isAllowedPath) {
    next();
    return;
  }

  // Allow specific IPs through (e.g., admin IPs)
  const clientIp = req.socket.remoteAddress || '';
  if (maintenanceConfig.allowedIPs.includes(clientIp)) {
    next();
    return;
  }

  res.setHeader('Retry-After', String(maintenanceConfig.retryAfterSeconds));
  res.status(503).json({
    success: false,
    error: 'Service Unavailable',
    message: maintenanceConfig.message,
    estimatedEnd: maintenanceConfig.estimatedEnd,
    retryAfter: maintenanceConfig.retryAfterSeconds,
  });
}

export default maintenanceMode;
