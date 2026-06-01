/**
 * Form validation utility functions.
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

type Validator = (value: string) => ValidationResult;

const ok: ValidationResult = { valid: true };
const fail = (error: string): ValidationResult => ({ valid: false, error });

/** Validate that a string is a valid email address. */
export function validateEmail(value: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? ok : fail('Invalid email address');
}

/** Validate that a string is a valid phone number. */
export function validatePhone(value: string): ValidationResult {
  const phoneRegex = /^\+?[\d\s\-().]{7,15}$/;
  return phoneRegex.test(value) ? ok : fail('Invalid phone number');
}

/** Validate that a string is a valid URL. */
export function validateUrl(value: string): ValidationResult {
  try {
    new URL(value);
    return ok;
  } catch {
    return fail('Invalid URL');
  }
}

/** Validate that a value is not empty. */
export function required(value: string): ValidationResult {
  return value.trim().length > 0 ? ok : fail('This field is required');
}

/** Validate that a value meets a minimum length. */
export function minLength(min: number): Validator {
  return (value: string) =>
    value.length >= min ? ok : fail(`Must be at least ${min} characters`);
}

/** Validate that a value does not exceed a maximum length. */
export function maxLength(max: number): Validator {
  return (value: string) =>
    value.length <= max ? ok : fail(`Must be at most ${max} characters`);
}

/** Validate that a value matches a regex pattern. */
export function pattern(regex: RegExp, message?: string): Validator {
  return (value: string) =>
    regex.test(value) ? ok : fail(message ?? 'Invalid format');
}
