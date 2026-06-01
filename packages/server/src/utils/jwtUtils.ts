import crypto from 'crypto';

const DEFAULT_SECRET = process.env.JWT_SECRET || 'stockpulse-dev-secret';
const DEFAULT_EXPIRY_SECONDS = 3600;

interface JwtHeader {
  alg: string;
  typ: string;
}

interface JwtPayload {
  [key: string]: unknown;
  iat?: number;
  exp?: number;
  sub?: string;
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data).toString('base64url');
}

function base64UrlDecode(encoded: string): string {
  return Buffer.from(encoded, 'base64url').toString('utf-8');
}

function createSignature(header: string, payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');
}

export function signToken(
  payload: JwtPayload,
  options: { secret?: string; expiresIn?: number } = {}
): string {
  const secret = options.secret ?? DEFAULT_SECRET;
  const expiresIn = options.expiresIn ?? DEFAULT_EXPIRY_SECONDS;
  const now = Math.floor(Date.now() / 1000);

  const header: JwtHeader = { alg: 'HS256', typ: 'JWT' };
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = createSignature(encodedHeader, encodedPayload, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(
  token: string,
  options: { secret?: string } = {}
): JwtPayload {
  const secret = options.secret ?? DEFAULT_SECRET;
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const expectedSignature = createSignature(encodedHeader, encodedPayload, secret);

  const sigBuf = Buffer.from(signature, 'base64url');
  const expectedBuf = Buffer.from(expectedSignature, 'base64url');

  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtPayload;

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1])) as JwtPayload;
  } catch {
    return null;
  }
}
