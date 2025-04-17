import { injectable } from 'inversify';

@injectable()
export abstract class Logger {
  abstract info(message: string, data?: unknown): void;
  abstract warn(message: string, data?: unknown): void;
  abstract error(message: string, data?: unknown): void;
}
