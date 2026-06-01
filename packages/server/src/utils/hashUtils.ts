import { createHash, createHmac } from 'crypto';

export function md5(input: string): string {
  return createHash('md5').update(input).digest('hex');
}

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hmac(data: string, secret: string, algorithm: string = 'sha256'): string {
  return createHmac(algorithm, secret).update(data).digest('hex');
}

export function md5Buffer(input: Buffer): string {
  return createHash('md5').update(input).digest('hex');
}

export function sha256Buffer(input: Buffer): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hmacBase64(data: string, secret: string, algorithm: string = 'sha256'): string {
  return createHmac(algorithm, secret).update(data).digest('base64');
}
