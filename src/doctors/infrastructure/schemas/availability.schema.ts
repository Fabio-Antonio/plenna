import mongoose, { Schema, model, Document } from 'mongoose';
import { Schedule, Slot, SlotDate } from '../../domain/intefaces/availability';

export interface DoctorAvailabilityDocument extends Document, Schedule {}

const SlotSchema = new Schema<Slot>(
  {
    sourceEvent: { type: String, required: true },
    dateTime: { type: Date, required: true },
  },
  { _id: false }
);

const SlotDateSchema = new Schema<SlotDate>(
  {
    date: { type: Date, required: true },
    slots: { type: [SlotSchema], default: [] },
  },
  { _id: false }
);

const ScheduleSchema = new Schema<Schedule>(
  {
    idDoctor: { type: String, required: true },
    idClinic: { type: String, required: true },
    slotdates: { type: [SlotDateSchema], required: true },
  },
  { _id: true }
);

const DoctorAvailabilityModel = mongoose.model<DoctorAvailabilityDocument>(
  'Availability',
  ScheduleSchema
);

export default DoctorAvailabilityModel;
