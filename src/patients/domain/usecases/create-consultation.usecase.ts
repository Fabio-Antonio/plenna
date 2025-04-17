import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import { Logger } from '../../../common/domain/interfaces/logger';
import { User, UserHistoryRequest, UserRecord } from '../interfaces/patients';

@injectable()
export class SaveConsultationUseCase {
  constructor(
    @inject(TYPES.UserRepositoryImpl)
    private readonly userRepositoryImpl: IRepository,
    @inject(TYPES.MedicalHistoryRepositoryImpl)
    private readonly medicalHistoryRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(historyRequest: UserHistoryRequest): Promise<unknown> {
    try {
      await this.userRepositoryImpl.connectDb('User');

      const email = historyRequest?.email;
      const history = historyRequest?.history;

      if (!email || !history) throw Error('Datos faltantes');

      const userExist = (await this.userRepositoryImpl.findOne({
        email,
      })) as unknown as User;

      if (!userExist) throw Error('No se encontró el usuario');

      const registerHistory = { ...history, userId: userExist?.id };

      await this.medicalHistoryRepositoryImpl.connectDb('MedicalHistory');
      await this.medicalHistoryRepositoryImpl.register(registerHistory);

      return 'Guardado correctamente';
    } catch (error) {
      await this.logger.error('SaveConsultationUseCase', error);
      return;
    }
  }
}
