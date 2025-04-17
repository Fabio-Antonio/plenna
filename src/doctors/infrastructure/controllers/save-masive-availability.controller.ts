import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { SaveMassiveAvailabilityUseCase } from '../../domain/usecases/save-masive-availability.usecase';

@injectable()
export class SaveMassiveAvailabilityController implements Controller {
  constructor(
    @inject(TYPES.SaveMassiveAvailabilityUseCase)
    private readonly saveMassiveAvailabilityUseCase: SaveMassiveAvailabilityUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const response = await this.saveMassiveAvailabilityUseCase.execute(
      req.body
    );
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
