import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';
import MongooseRepository from '../../../common/infrastructure/mongoose/mongoose.repository';
import { MedicalHistoryDocument } from '../schemas/medical-history.schema';

@injectable()
export class MedicalHistoryRepositoryImpl extends MongooseRepository<MedicalHistoryDocument> {
  constructor(
    @inject('MedicalHistoryModel') medicalHistoryModel: Model<Document>
  ) {
    super(medicalHistoryModel as unknown as Model<MedicalHistoryDocument>);
  }
}
