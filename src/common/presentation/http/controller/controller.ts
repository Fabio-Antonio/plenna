import express from 'express';
export interface Controller {
  run(req: express.Request): Promise<{ status: number; response: unknown }>;
}
