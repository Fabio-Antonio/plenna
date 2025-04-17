import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import {
  Schedule,
  UnifiedSchedule,
  UnifiedSlot,
} from '../intefaces/availability';
import { Logger } from '../../../common/domain/interfaces/logger';
import { DateFormatter } from '../../../common/domain/shared/date-formatter';

@injectable()
export class GetUnifyAvailabilityUseCase {
  constructor(
    @inject(TYPES.AvailabilityContentRepositoryImpl)
    private readonly availabilityContentRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(): Promise<unknown> {
    try {
      // Conexión a la base de datos
      await this.availabilityContentRepositoryImpl.connectDb('Availability');

      const schedules: Schedule[] =
        await this.availabilityContentRepositoryImpl.getAll();

      if (!schedules || schedules.length === 0) {
        return;
      }

      const result = schedules?.reduce(
        (acc, { idDoctor, idClinic, slotdates }) => {
          slotdates.forEach(({ slots = [] }) => {
            slots.forEach((slot) => {
              const unifiedSlot: UnifiedSlot = {
                doctorId: idDoctor,
                dateTime: slot.dateTime,
                sourceEvent: slot.sourceEvent,
              };

              const formattedDate = DateFormatter.formatDay(
                new Date(slot.dateTime)
              );

              const clinic = acc[idClinic] ?? {};
              const current = clinic[formattedDate];

              if (!current || Math.random() > 0.5) {
                clinic[formattedDate] = unifiedSlot;
              }

              acc[idClinic] = clinic;
            });
          });

          return acc;
        },
        {} as UnifiedSchedule
      );

      return result;
    } catch (error) {
      await this.logger.error('GetUnifyAvailabilityUseCase', error);
      return;
    }
  }
}
