import { injectable } from 'inversify';
import { Logger } from '../../domain/interfaces/logger';
import { LogsType } from '../../domain/interfaces/configuration';

@injectable()
export class LoggerImpl implements Logger {
  info(message: string, data?: unknown): void {
    this.log(LogsType.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogsType.WARN, message, data);
  }

  error(message: string, data?: unknown): void {
    this.log(LogsType.ERROR, message, data);
  }

  private log(level: LogsType, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;

    switch (level) {
      case LogsType.INFO:
        console.info(logMessage, data);
        break;
      case LogsType.WARN:
        console.warn(logMessage, data);
        break;
      case LogsType.ERROR:
        console.error(logMessage, data);
        break;
    }
  }
}
