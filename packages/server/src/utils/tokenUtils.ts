import crypto from 'crypto';

export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateApiKey(prefix = 'sk'): string {
  const token = crypto.randomBytes(24).toString('base64url');
  return `${prefix}_${token}`;
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateOTP(digits = 6): string {
  const max = 10 ** digits;
  const num = crypto.randomInt(0, max);
  return num.toString().padStart(digits, '0');
}

export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return crypto.timingSafeEqual(bufA, bufB);
}

export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(16).toString('base64url');
  return `sess_${timestamp}_${random}`;
}
