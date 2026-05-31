export class ValidationError extends Error {
  public field: string;
  public code: string;

  constructor(field: string, message: string, code = 'INVALID') {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.code = code;
  }
}

export interface ValidationRule {
  field: string;
  value: unknown;
  rules: Array<'required' | 'string' | 'number' | 'email' | 'positive' | 'integer' | { min?: number; max?: number } | { minLength?: number; maxLength?: number } | { pattern: RegExp }>;
}

export function validate(entries: ValidationRule[]): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const { field, value, rules } of entries) {
    for (const rule of rules) {
      if (rule === 'required') {
        if (value === undefined || value === null || value === '') {
          errors.push(new ValidationError(field, `${field} is required`, 'REQUIRED'));
        }
      } else if (rule === 'string') {
        if (value !== undefined && value !== null && typeof value !== 'string') {
          errors.push(new ValidationError(field, `${field} must be a string`, 'TYPE'));
        }
      } else if (rule === 'number') {
        if (value !== undefined && value !== null && (typeof value !== 'number' || isNaN(value))) {
          errors.push(new ValidationError(field, `${field} must be a number`, 'TYPE'));
        }
      } else if (rule === 'email') {
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(new ValidationError(field, `${field} must be a valid email`, 'FORMAT'));
        }
      } else if (rule === 'positive') {
        if (typeof value === 'number' && value <= 0) {
          errors.push(new ValidationError(field, `${field} must be positive`, 'RANGE'));
        }
      } else if (rule === 'integer') {
        if (typeof value === 'number' && !Number.isInteger(value)) {
          errors.push(new ValidationError(field, `${field} must be an integer`, 'TYPE'));
        }
      } else if ('min' in rule || 'max' in rule) {
        if (typeof value === 'number') {
          if (rule.min !== undefined && value < rule.min) {
            errors.push(new ValidationError(field, `${field} must be at least ${rule.min}`, 'RANGE'));
          }
          if (rule.max !== undefined && value > rule.max) {
            errors.push(new ValidationError(field, `${field} must be at most ${rule.max}`, 'RANGE'));
          }
        }
      } else if ('minLength' in rule || 'maxLength' in rule) {
        if (typeof value === 'string') {
          if (rule.minLength !== undefined && value.length < rule.minLength) {
            errors.push(new ValidationError(field, `${field} must be at least ${rule.minLength} characters`, 'LENGTH'));
          }
          if (rule.maxLength !== undefined && value.length > rule.maxLength) {
            errors.push(new ValidationError(field, `${field} must be at most ${rule.maxLength} characters`, 'LENGTH'));
          }
        }
      } else if ('pattern' in rule) {
        if (typeof value === 'string' && !rule.pattern.test(value)) {
          errors.push(new ValidationError(field, `${field} has invalid format`, 'FORMAT'));
        }
      }
    }
  }

  return errors;
}

export function assertValid(entries: ValidationRule[]): void {
  const errors = validate(entries);
  if (errors.length > 0) {
    throw errors[0];
  }
}

export function isValidSymbol(symbol: string): boolean {
  return /^[A-Z]{1,5}(\.[A-Z])?$/.test(symbol.toUpperCase());
}

export function isValidDateString(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}
