import * as crypto from 'crypto';

const SALT_LENGTH = 32;
const HASH_ITERATIONS = 100000;
const HASH_KEY_LENGTH = 64;
const HASH_DIGEST = 'sha512';
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Generate a cryptographically secure random salt.
 */
export function generateSalt(length: number = SALT_LENGTH): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash a password using PBKDF2 with the given salt.
 * Returns a string in the format: iterations:salt:hash
 */
export function hashPassword(password: string, salt?: string): string {
  const useSalt = salt || generateSalt();
  const hash = crypto
    .pbkdf2Sync(password, useSalt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)
    .toString('hex');

  return `${HASH_ITERATIONS}:${useSalt}:${hash}`;
}

/**
 * Compare a plain-text password against a hashed password string.
 */
export function comparePassword(password: string, hashedPassword: string): boolean {
  const parts = hashedPassword.split(':');
  if (parts.length !== 3) return false;

  const [iterationsStr, salt, originalHash] = parts;
  const iterations = parseInt(iterationsStr, 10);

  if (isNaN(iterations) || !salt || !originalHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, HASH_KEY_LENGTH, HASH_DIGEST)
    .toString('hex');

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
}

/**
 * Encrypt a string using AES-256-GCM.
 * Returns a string in the format: iv:authTag:encryptedData (all hex-encoded).
 */
export function encrypt(plaintext: string, key: string): string {
  const keyBuffer = normalizeKey(key);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, keyBuffer, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt a string that was encrypted with the encrypt function.
 */
export function decrypt(encryptedData: string, key: string): string {
  const parts = encryptedData.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format');
  }

  const [ivHex, authTagHex, data] = parts;
  const keyBuffer = normalizeKey(key);
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, keyBuffer, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Generate a random token of the specified length (hex string).
 */
export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Create a SHA-256 hash of the given data.
 */
export function sha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Create an HMAC-SHA256 signature.
 */
export function hmacSign(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Verify an HMAC-SHA256 signature.
 */
export function hmacVerify(data: string, secret: string, signature: string): boolean {
  const expected = hmacSign(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(signature, 'hex')
  );
}

function normalizeKey(key: string): Buffer {
  const hash = crypto.createHash('sha256').update(key).digest();
  return hash;
}
