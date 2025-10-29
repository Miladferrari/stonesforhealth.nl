// Centralized logging utility with environment-aware levels

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
  prefix?: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;

  constructor(prefix: string = '') {
    this.config = {
      enabled: process.env.NODE_ENV === 'development',
      minLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      prefix: prefix ? `[${prefix}]` : '',
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.minLevel];
  }

  private formatMessage(message: string): string {
    return this.config.prefix ? `${this.config.prefix} ${message}` : message;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage(message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage(message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage(message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage(message), ...args);
    }
  }
}

// Export pre-configured loggers for different modules
export const wooLogger = new Logger('WooCommerce API');
export const cartLogger = new Logger('Cart');
export const paymentLogger = new Logger('Payment');
export const generalLogger = new Logger();

export default Logger;
