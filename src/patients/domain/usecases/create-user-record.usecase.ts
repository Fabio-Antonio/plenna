import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { IRepository } from '../../../common/domain/interfaces/repository';
import { Logger } from '../../../common/domain/interfaces/logger';
import { UserRecord } from '../interfaces/patients';

@injectable()
export class SaveUserRecordUseCase {
  constructor(
    @inject(TYPES.UserRepositoryImpl)
    private readonly userRepositoryImpl: IRepository,
    @inject(TYPES.MedicalRecordRepositoryImpl)
    private readonly medicalRecordRepositoryImpl: IRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger
  ) {}

  public async execute(userRecordRequest: UserRecord): Promise<unknown> {
    try {
      await this.userRepositoryImpl.connectDb('User');

      const user = userRecordRequest?.user;
      const record = userRecordRequest?.record;

      if (!user || !record) throw Error('Datos faltantes');

      const userExist = await this.userRepositoryImpl.findOne({
        email: user?.email,
      });

      if (userExist) throw Error('Ya existe un usuario');

      const userRegister = await this.userRepositoryImpl.register(user);
      record.userId = userRegister.id;

      await this.medicalRecordRepositoryImpl.connectDb('MedicalRecord');
      await this.medicalRecordRepositoryImpl.register(record);

      return 'Guardado correctamente';
    } catch (error) {
      await this.logger.error('SaveUserRecordUseCase', error);
      return;
    }
  }
}
