import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { GetUserRecordUseCase } from '../../domain/usecases/get-user-record.usecase';

@injectable()
export class GetUserRecordController implements Controller {
  constructor(
    @inject(TYPES.GetUserRecordUseCase)
    private readonly getUserRecordUseCase: GetUserRecordUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const email = req?.query?.email as string;
    const response = await this.getUserRecordUseCase.execute(email);
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
