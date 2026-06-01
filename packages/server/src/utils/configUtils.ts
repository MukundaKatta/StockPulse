import { getOptional, getNumber, getBoolean } from './envUtils';

export interface AppConfig {
  port: number;
  host: string;
  nodeEnv: string;
  logLevel: string;
  corsOrigin: string;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  enableWebSocket: boolean;
  enableJobScheduler: boolean;
  dbUrl: string;
  redisUrl: string;
  jwtSecret: string;
  apiKeyHeader: string;
}

const defaults: AppConfig = {
  port: 3001,
  host: '0.0.0.0',
  nodeEnv: 'development',
  logLevel: 'info',
  corsOrigin: '*',
  rateLimitMax: 100,
  rateLimitWindowMs: 60000,
  enableWebSocket: true,
  enableJobScheduler: true,
  dbUrl: 'postgresql://localhost:5432/stockpulse',
  redisUrl: 'redis://localhost:6379',
  jwtSecret: 'dev-secret-change-in-production',
  apiKeyHeader: 'x-api-key',
};

export function loadConfig(): AppConfig {
  return {
    port: getNumber('PORT', defaults.port),
    host: getOptional('HOST', defaults.host),
    nodeEnv: getOptional('NODE_ENV', defaults.nodeEnv),
    logLevel: getOptional('LOG_LEVEL', defaults.logLevel),
    corsOrigin: getOptional('CORS_ORIGIN', defaults.corsOrigin),
    rateLimitMax: getNumber('RATE_LIMIT_MAX', defaults.rateLimitMax),
    rateLimitWindowMs: getNumber('RATE_LIMIT_WINDOW_MS', defaults.rateLimitWindowMs),
    enableWebSocket: getBoolean('ENABLE_WEBSOCKET', defaults.enableWebSocket),
    enableJobScheduler: getBoolean('ENABLE_JOB_SCHEDULER', defaults.enableJobScheduler),
    dbUrl: getOptional('DATABASE_URL', defaults.dbUrl),
    redisUrl: getOptional('REDIS_URL', defaults.redisUrl),
    jwtSecret: getOptional('JWT_SECRET', defaults.jwtSecret),
    apiKeyHeader: getOptional('API_KEY_HEADER', defaults.apiKeyHeader),
  };
}

let cachedConfig: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}

export function resetConfig(): void {
  cachedConfig = null;
}
