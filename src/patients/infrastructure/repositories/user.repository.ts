import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';
import MongooseRepository from '../../../common/infrastructure/mongoose/mongoose.repository';
import { UserDocument } from '../schemas/user.schema';

@injectable()
export class UserRepositoryImpl extends MongooseRepository<UserDocument> {
  constructor(@inject('UserModel') userModel: Model<Document>) {
    super(userModel as unknown as Model<UserDocument>);
  }
}
