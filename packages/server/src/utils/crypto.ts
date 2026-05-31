import { createHash, randomBytes, createHmac } from 'crypto';

export function hashSHA256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

export function generateApiKey(): string {
  const prefix = 'sp_';
  const key = randomBytes(24).toString('base64url');
  return `${prefix}${key}`;
}

export function hmacSign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function hmacVerify(payload: string, signature: string, secret: string): boolean {
  const expected = hmacSign(payload, secret);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export function hashPassword(password: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

export function generateSalt(): string {
  return randomBytes(16).toString('hex');
}

export function maskApiKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}
