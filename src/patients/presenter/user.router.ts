import express, { Request, Response } from 'express';

import { container } from '../../common/infrastructure/di/container';
import { TYPES } from '../../types';
import { HttpCode } from '../../common/domain/interfaces/configuration';
import { validationRequest } from '../../common/presentation/middleware';
import { GetConsultationController } from '../infrastructure/controllers/get-consultations.controller';
import { GetUserRecordController } from '../infrastructure/controllers/get-user-record.controller';
import { SaveConsultationController } from '../infrastructure/controllers/create-consultation.controller';
import { SaveUserRecordController } from '../infrastructure/controllers/create-user-record.controller';

const userRouter = express.Router();

const getConsultationsRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<GetConsultationController>(
      TYPES.GetConsultationController
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

const getUserRecordRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<GetUserRecordController>(
      TYPES.GetUserRecordController
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

const saveConsultationRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<SaveConsultationController>(
      TYPES.SaveConsultationController
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

const saveUserRecordRouter = async (req: Request, res: Response) => {
  try {
    const controller = container.get<SaveUserRecordController>(
      TYPES.SaveUserRecordController
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

userRouter.get('/consultation', validationRequest, getConsultationsRouter);
userRouter.get('/user-record', validationRequest, getUserRecordRouter);

userRouter.post('/add-user-record', validationRequest, saveUserRecordRouter);

userRouter.post('/add-consultation', validationRequest, saveConsultationRouter);

export { userRouter };
