import { inject, injectable } from 'inversify';

import { Request } from 'express';
import { Controller } from '../../../common/presentation/http/controller/controller';
import { TYPES } from '../../../types';
import { HttpCode } from '../../../common/domain/interfaces/configuration';
import { GetUnifyAvailabilityUseCase } from '../../domain/usecases/get-unify-availability.usecase';

@injectable()
export class GetUnifyAvailabilityController implements Controller {
  constructor(
    @inject(TYPES.GetUnifyAvailabilityUseCase)
    private readonly getUnifyAvailabilityUseCase: GetUnifyAvailabilityUseCase
  ) {}

  async run(req: Request): Promise<{ status: number; response: unknown }> {
    const response = await this.getUnifyAvailabilityUseCase.execute();
    return {
      status: HttpCode.OK,
      response,
    };
  }
}
