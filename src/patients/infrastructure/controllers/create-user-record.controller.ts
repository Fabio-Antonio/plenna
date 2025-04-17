import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { SaveUserRecordUseCase } from '../../domain/usecases/create-user-record.usecase';

@injectable()
export class SaveUserRecordController implements Controller {
  constructor(
    @inject(TYPES.SaveUserRecordUseCase)
    private readonly saveUserRecordUseCase: SaveUserRecordUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const response = await this.saveUserRecordUseCase.execute(req.body);
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
