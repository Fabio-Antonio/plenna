// models/medicalRecord.model.ts
import { Schema, model, Document } from 'mongoose';

export interface MedicalRecordDocument extends Document {
  userId: string;
  bloodType: string;
  allergies: string[];
  chronicDiseases: string[];
  surgeries: string[];
  currentMedications: string[];
}

const MedicalRecordSchema = new Schema<MedicalRecordDocument>({
  userId: { type: String, required: true },
  bloodType: { type: String },
  allergies: [String],
  chronicDiseases: [String],
  surgeries: [String],
  currentMedications: [String],
});

const MedicalRecordModel = model<MedicalRecordDocument>(
  'MedicalRecord',
  MedicalRecordSchema
);

export default MedicalRecordModel;
