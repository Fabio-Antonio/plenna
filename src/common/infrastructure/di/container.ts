import 'reflect-metadata';
import { Model } from 'mongoose';

import { Container } from 'inversify';
import { TYPES } from '../../../types';
import { Logger } from '../../domain/interfaces/logger';
import { LoggerImpl } from '../logger/logger';
import { AvailabilityContentRepositoryImpl } from '../../../doctors/infrastructure/repositories/availability.repository';
import { IRepository } from '../../domain/interfaces/repository';
import DoctorAvailabilityModel, {
  DoctorAvailabilityDocument,
} from '../../../doctors/infrastructure/schemas/availability.schema';
import { GetUnifyAvailabilityUseCase } from '../../../doctors/domain/usecases/get-unify-availability.usecase';
import { SaveMassiveAvailabilityUseCase } from '../../../doctors/domain/usecases/save-masive-availability.usecase';
import { SaveMassiveAvailabilityController } from '../../../doctors/infrastructure/controllers/save-masive-availability.controller';
import { GetUnifyAvailabilityController } from '../../../doctors/infrastructure/controllers/get-unify-availability.controller';
import { UserRepositoryImpl } from '../../../patients/infrastructure/repositories/user.repository';
import { MedicalRecordRepositoryImpl } from '../../../patients/infrastructure/repositories/medical-record.repository';
import { MedicalHistoryRepositoryImpl } from '../../../patients/infrastructure/repositories/medical-history.repository';
import MedicalHistoryModel, {
  MedicalHistoryDocument,
} from '../../../patients/infrastructure/schemas/medical-history.schema';
import MedicalRecordModel, {
  MedicalRecordDocument,
} from '../../../patients/infrastructure/schemas/medical-record.schema';
import UserModel, {
  UserDocument,
} from '../../../patients/infrastructure/schemas/user.schema';
import { SaveConsultationUseCase } from '../../../patients/domain/usecases/create-consultation.usecase';
import { SaveUserRecordUseCase } from '../../../patients/domain/usecases/create-user-record.usecase';
import { GetUserRecordUseCase } from '../../../patients/domain/usecases/get-user-record.usecase';
import { GetConsultationUseCase } from '../../../patients/domain/usecases/get-consultatios.usecase';
import { SaveUserRecordController } from '../../../patients/infrastructure/controllers/create-user-record.controller';
import { SaveConsultationController } from '../../../patients/infrastructure/controllers/create-consultation.controller';
import { GetConsultationController } from '../../../patients/infrastructure/controllers/get-consultations.controller';
import { GetUserRecordController } from '../../../patients/infrastructure/controllers/get-user-record.controller';

const container = new Container();

container.bind<Logger>(TYPES.Logger).to(LoggerImpl);

container
  .bind<GetUnifyAvailabilityUseCase>(TYPES.GetUnifyAvailabilityUseCase)
  .to(GetUnifyAvailabilityUseCase);

container
  .bind<SaveMassiveAvailabilityUseCase>(TYPES.SaveMassiveAvailabilityUseCase)
  .to(SaveMassiveAvailabilityUseCase);

container
  .bind<SaveConsultationUseCase>(TYPES.SaveConsultationUseCase)
  .to(SaveConsultationUseCase);

container
  .bind<SaveUserRecordUseCase>(TYPES.SaveUserRecordUseCase)
  .to(SaveUserRecordUseCase);

container
  .bind<GetUserRecordUseCase>(TYPES.GetUserRecordUseCase)
  .to(GetUserRecordUseCase);
container
  .bind<GetConsultationUseCase>(TYPES.GetConsultationUseCase)
  .to(GetConsultationUseCase);

container
  .bind<SaveMassiveAvailabilityController>(
    TYPES.SaveMassiveAvailabilityController
  )
  .to(SaveMassiveAvailabilityController);

container
  .bind<GetUnifyAvailabilityController>(TYPES.GetUnifyAvailabilityController)
  .to(GetUnifyAvailabilityController);

container
  .bind<SaveUserRecordController>(TYPES.SaveUserRecordController)
  .to(SaveUserRecordController);
container
  .bind<SaveConsultationController>(TYPES.SaveConsultationController)
  .to(SaveConsultationController);
container
  .bind<GetConsultationController>(TYPES.GetConsultationController)
  .to(GetConsultationController);
container
  .bind<GetUserRecordController>(TYPES.GetUserRecordController)
  .to(GetUserRecordController);

container
  .bind<IRepository>(TYPES.AvailabilityContentRepositoryImpl)
  .to(AvailabilityContentRepositoryImpl);

container.bind<IRepository>(TYPES.UserRepositoryImpl).to(UserRepositoryImpl);
container
  .bind<IRepository>(TYPES.MedicalRecordRepositoryImpl)
  .to(MedicalRecordRepositoryImpl);
container
  .bind<IRepository>(TYPES.MedicalHistoryRepositoryImpl)
  .to(MedicalHistoryRepositoryImpl);

container
  .bind<Model<DoctorAvailabilityDocument>>('DoctorAvailabilityModel')
  .toConstantValue(DoctorAvailabilityModel);

container.bind<Model<UserDocument>>('UserModel').toConstantValue(UserModel);
container
  .bind<Model<MedicalRecordDocument>>('MedicalRecordModel')
  .toConstantValue(MedicalRecordModel);
container
  .bind<Model<MedicalHistoryDocument>>('MedicalHistoryModel')
  .toConstantValue(MedicalHistoryModel);

export { container };
