import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import { Logger } from '../../../common/domain/interfaces/logger';
import { MedicalHistory, User, UserRecord } from '../interfaces/patients';

@injectable()
export class GetConsultationUseCase {
  constructor(
    @inject(TYPES.UserRepositoryImpl)
    private readonly userRepositoryImpl: IRepository,
    @inject(TYPES.MedicalHistoryRepositoryImpl)
    private readonly medicalHistoryRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(email: string): Promise<unknown> {
    try {
      await this.userRepositoryImpl.connectDb('User');

      const userExist = (await this.userRepositoryImpl.findOne({
        email,
      })) as unknown as User;

      if (!userExist) throw Error('No se encontró al usuario');

      await this.medicalHistoryRepositoryImpl.connectDb('MedicalHistory');
      const history = (await this.medicalHistoryRepositoryImpl.getAllWhere({
        userId: userExist?.id,
      })) as unknown as MedicalHistory[];

      if (!history || !history?.length)
        throw new Error('no se encontró historial');

      return history;
    } catch (error) {
      await this.logger.error('GetUserRecordUseCase', error);
      return;
    }
  }
}
