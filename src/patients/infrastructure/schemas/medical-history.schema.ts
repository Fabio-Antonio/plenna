import { Schema, model, Document } from 'mongoose';

export interface MedicalHistoryDocument extends Document {
  userId: string;
  doctorId: string;
  dateTime: Date;
  reason: string;
  notes: string;
}

const MedicalHistorySchema = new Schema<MedicalHistoryDocument>({
  userId: { type: String, required: true },
  doctorId: { type: String, required: true },
  dateTime: { type: Date, required: true },
  reason: { type: String, required: true },
  notes: { type: String },
});

const MedicalHistoryModel = model<MedicalHistoryDocument>(
  'MedicalHistory',
  MedicalHistorySchema
);

export default MedicalHistoryModel;
