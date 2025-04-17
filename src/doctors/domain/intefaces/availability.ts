export interface Slot {
  sourceEvent: string;
  dateTime: string; // ISO 8601 string
}

export interface SlotDate {
  date: string; // ISO 8601 string
  slots?: Slot[];
}

export interface ScheduleRequest {
  schedules: Schedule[];
}
export interface Schedule {
  idDoctor: string;
  idClinic: string;
  slotdates: SlotDate[];
}

export interface Availability {
  schedules: Schedule[];
}

export interface UnifiedSlot {
  doctorId: string;
  dateTime: string;
  sourceEvent: string;
}

export interface UnifiedSchedule {
  [clinicId: string]: {
    [dateTime: string]: UnifiedSlot;
  };
}
