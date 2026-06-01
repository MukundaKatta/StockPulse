import { Request, Response, NextFunction } from 'express';

interface IpFilterOptions {
  mode: 'whitelist' | 'blacklist';
  ips: string[];
  trustProxy?: boolean;
  onDenied?: (req: Request, res: Response) => void;
}

function getClientIp(req: Request, trustProxy: boolean): string {
  if (trustProxy) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
  }
  return req.socket.remoteAddress || '0.0.0.0';
}

function matchesIp(clientIp: string, pattern: string): boolean {
  if (pattern === '*') return true;

  // CIDR notation support (e.g., 192.168.1.0/24)
  if (pattern.includes('/')) {
    const [subnet, bits] = pattern.split('/');
    const subnetParts = subnet.split('.').map(Number);
    const clientParts = clientIp.split('.').map(Number);
    const mask = parseInt(bits, 10);

    if (subnetParts.length !== 4 || clientParts.length !== 4) return false;

    const subnetNum =
      (subnetParts[0] << 24) | (subnetParts[1] << 16) | (subnetParts[2] << 8) | subnetParts[3];
    const clientNum =
      (clientParts[0] << 24) | (clientParts[1] << 16) | (clientParts[2] << 8) | clientParts[3];
    const maskNum = ~((1 << (32 - mask)) - 1);

    return (subnetNum & maskNum) === (clientNum & maskNum);
  }

  // Wildcard support (e.g., 192.168.1.*)
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '\\d+') + '$');
    return regex.test(clientIp);
  }

  return clientIp === pattern;
}

export function ipFilter(options: IpFilterOptions) {
  const { mode, ips, trustProxy = false, onDenied } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp = getClientIp(req, trustProxy);
    const isMatch = ips.some((pattern) => matchesIp(clientIp, pattern));

    const allowed =
      (mode === 'whitelist' && isMatch) || (mode === 'blacklist' && !isMatch);

    if (!allowed) {
      if (onDenied) {
        onDenied(req, res);
        return;
      }

      res.status(403).json({
        success: false,
        error: 'Access denied',
        message: 'Your IP address is not authorized to access this resource',
      });
      return;
    }

    next();
  };
}

export default ipFilter;
