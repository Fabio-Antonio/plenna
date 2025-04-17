import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';
import MongooseRepository from '../../../common/infrastructure/mongoose/mongoose.repository';
import { MedicalRecordDocument } from '../schemas/medical-record.schema';

@injectable()
export class MedicalRecordRepositoryImpl extends MongooseRepository<MedicalRecordDocument> {
  constructor(
    @inject('MedicalRecordModel') medicalRecordModel: Model<Document>
  ) {
    super(medicalRecordModel as unknown as Model<MedicalRecordDocument>);
  }
}
