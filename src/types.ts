const TYPES = {
  Logger: Symbol.for('Logger'),
  AvailabilityContentRepositoryImpl: Symbol.for(
    'AvailabilityContentRepositoryImpl'
  ),
  GetUnifyAvailabilityUseCase: Symbol.for('GetUnifyAvailabilityUseCase'),
  SaveMassiveAvailabilityUseCase: Symbol.for('SaveMassiveAvailabilityUseCase'),
  SaveMassiveAvailabilityController: Symbol.for(
    'SaveMassiveAvailabilityController'
  ),
  GetUnifyAvailabilityController: Symbol.for('GetUnifyAvailabilityController'),
  UserRepositoryImpl: Symbol.for('UserRepositoryImpl'),
  MedicalRecordRepositoryImpl: Symbol.for('MedicalRecordRepositoryImpl'),
  MedicalHistoryRepositoryImpl: Symbol.for('MedicalHistoryRepositoryImpl'),
  GetUserRecordUseCase: Symbol.for('GetUserRecordUseCase'),
  GetConsultationUseCase: Symbol.for('GetConsultationUseCase'),
  SaveUserRecordUseCase: Symbol.for('SaveUserRecordUseCase'),
  SaveConsultationUseCase: Symbol.for('SaveConsultationUseCase '),
  GetConsultationController: Symbol.for('GetConsultationController'),
  GetUserRecordController: Symbol.for('GetUserRecordController'),
  SaveConsultationController: Symbol.for('SaveConsultationController'),
  SaveUserRecordController: Symbol.for('SaveUserRecordController'),
};

export { TYPES };
