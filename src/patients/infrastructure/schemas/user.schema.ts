import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;
