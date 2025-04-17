export interface User {
  id: string;
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address: string;
}

export interface MedicalRecord {
  userId: string;
  bloodType: string;
  allergies: string[];
  chronicDiseases: string[];
  surgeries: string[];
  currentMedications: string[];
}

export interface UserRecord {
  user: User;
  record: MedicalRecord;
}

export interface UserHistoryRequest {
  email: string;
  history: MedicalHistory;
}

export interface MedicalHistory {
  userId?: string;
  doctorId: string;
  dateTime: Date;
  reason: string;
  notes: string;
}
