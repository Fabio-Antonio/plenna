import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import { Schedule, ScheduleRequest } from '../intefaces/availability';
import { Logger } from '../../../common/domain/interfaces/logger';

@injectable()
export class SaveMassiveAvailabilityUseCase {
  constructor(
    @inject(TYPES.AvailabilityContentRepositoryImpl)
    private readonly availabilityContentRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(scheduleRequest: ScheduleRequest): Promise<unknown> {
    try {
      await this.availabilityContentRepositoryImpl.connectDb('Availability');

      if (!scheduleRequest?.schedules || !scheduleRequest?.schedules?.length)
        return;

      for (const schedule of scheduleRequest.schedules) {
        await this.logger.info('SaveMassiveAvailabilityUseCase', {
          data: JSON.stringify(schedule),
        });
        await this.availabilityContentRepositoryImpl.register(schedule);
      }
      return 'Guardado correctamente';
    } catch (error) {
      await this.logger.error('SaveMassiveAvailabilityUseCase', error);
      return;
    }
  }
}
