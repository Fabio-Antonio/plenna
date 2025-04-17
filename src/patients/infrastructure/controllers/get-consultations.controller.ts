import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { GetConsultationUseCase } from '../../domain/usecases/get-consultatios.usecase';

@injectable()
export class GetConsultationController implements Controller {
  constructor(
    @inject(TYPES.GetConsultationUseCase)
    private readonly getConsultationUseCase: GetConsultationUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const email = req?.query?.email as string;
    const response = await this.getConsultationUseCase.execute(email);
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
