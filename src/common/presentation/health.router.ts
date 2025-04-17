import express, { Request, Response } from 'express';
import { HttpCode } from '../domain/interfaces/configuration';

const healthRouter = express.Router();

// health check
const getHealthRouter = async (req: Request, res: Response) => {
  try {
    return res.status(HttpCode.OK).json({
      ok: true,
    });
  } catch (error) {
    return res.status(HttpCode.BAD).json({
      ok: false,
      msg: 'something went wrng',
    });
  }
};

healthRouter.get('', getHealthRouter);

export { healthRouter };
