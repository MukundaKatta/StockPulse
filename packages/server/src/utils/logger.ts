type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatEntry(entry: LogEntry): string {
  const { level, message, timestamp, context } = entry;
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  const ctx = context ? ` ${JSON.stringify(context)}` : '';
  return `${prefix} ${message}${ctx}`;
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    if (!shouldLog('debug')) return;
    const entry: LogEntry = { level: 'debug', message, timestamp: new Date().toISOString(), context };
    console.debug(formatEntry(entry));
  },

  info(message: string, context?: Record<string, unknown>) {
    if (!shouldLog('info')) return;
    const entry: LogEntry = { level: 'info', message, timestamp: new Date().toISOString(), context };
    console.info(formatEntry(entry));
  },

  warn(message: string, context?: Record<string, unknown>) {
    if (!shouldLog('warn')) return;
    const entry: LogEntry = { level: 'warn', message, timestamp: new Date().toISOString(), context };
    console.warn(formatEntry(entry));
  },

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    if (!shouldLog('error')) return;
    const errorContext = error instanceof Error
      ? { ...context, errorName: error.name, errorMessage: error.message, stack: error.stack }
      : { ...context, error };
    const entry: LogEntry = { level: 'error', message, timestamp: new Date().toISOString(), context: errorContext };
    console.error(formatEntry(entry));
  },
};
