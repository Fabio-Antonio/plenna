import express, { Request, Response } from 'express';

import { container } from '../../common/infrastructure/di/container';
import { TYPES } from '../../types';
import { HttpCode } from '../../common/domain/interfaces/configuration';
import { GetUnifyAvailabilityController } from '../infrastructure/controllers/get-unify-availability.controller';
import { validationRequest } from '../../common/presentation/middleware';
import { SaveMassiveAvailabilityController } from '../infrastructure/controllers/save-masive-availability.controller';

const doctorRouter = express.Router();

const getAvailabilityRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<GetUnifyAvailabilityController>(
      TYPES.GetUnifyAvailabilityController
    );
    const { status, response } = await controller.run(req);
    return res.status(status).json({
      ok: true,
      response,
    });
  } catch (error) {
    console.info(error);
    return res.status(HttpCode.BAD).json({
      ok: false,
      msg: 'something went wrng',
    });
  }
};

const saveMassiveAvailabilityRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<SaveMassiveAvailabilityController>(
      TYPES.SaveMassiveAvailabilityController
    );
    const { status, response } = await controller.run(req);
    return res.status(status).json({
      ok: true,
      response,
    });
  } catch (error) {
    return res.status(HttpCode.BAD).json({
      ok: false,
      msg: 'something went wrng',
    });
  }
};

doctorRouter.get('/availability', validationRequest, getAvailabilityRouter);
doctorRouter.post(
  '/massive-availability',
  validationRequest,
  saveMassiveAvailabilityRouter
);

export { doctorRouter };
