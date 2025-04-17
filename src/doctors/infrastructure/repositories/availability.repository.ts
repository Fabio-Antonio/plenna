import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';
import MongooseRepository from '../../../common/infrastructure/mongoose/mongoose.repository';
import { DoctorAvailabilityDocument } from '../schemas/availability.schema';

@injectable()
export class AvailabilityContentRepositoryImpl extends MongooseRepository<DoctorAvailabilityDocument> {
  constructor(
    @inject('DoctorAvailabilityModel') doctorAvailabilityModel: Model<Document>
  ) {
    super(
      doctorAvailabilityModel as unknown as Model<DoctorAvailabilityDocument>
    );
  }
}
