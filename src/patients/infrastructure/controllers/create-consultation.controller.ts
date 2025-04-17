import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { SaveConsultationUseCase } from '../../domain/usecases/create-consultation.usecase';

@injectable()
export class SaveConsultationController implements Controller {
  constructor(
    @inject(TYPES.SaveConsultationUseCase)
    private readonly saveConsultationUseCase: SaveConsultationUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const response = await this.saveConsultationUseCase.execute(req.body);
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
