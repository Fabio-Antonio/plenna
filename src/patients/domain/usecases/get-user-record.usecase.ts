import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import { Logger } from '../../../common/domain/interfaces/logger';
import { User, UserRecord } from '../interfaces/patients';

@injectable()
export class GetUserRecordUseCase {
  constructor(
    @inject(TYPES.UserRepositoryImpl)
    private readonly userRepositoryImpl: IRepository,
    @inject(TYPES.MedicalRecordRepositoryImpl)
    private readonly medicalRecordRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(email: string): Promise<unknown> {
    try {
      console.info('email recibido', email);
      await this.userRepositoryImpl.connectDb('User');

      const userExist = (await this.userRepositoryImpl.findOne({
        email,
      })) as unknown as User;

      if (!userExist) throw Error('No se encontró al usuario');

      await this.medicalRecordRepositoryImpl.connectDb('MedicalRecord');
      const record = await this.medicalRecordRepositoryImpl.findOne({
        userId: userExist?.id,
      });

      if (!record) throw new Error('no se encontró expediente');

      return {
        user: userExist,
        record,
      };
    } catch (error) {
      await this.logger.error('GetUserRecordUseCase', error);
      return;
    }
  }
}
