import { Timestamp } from "firebase/firestore";

// interfaces/Ischedule.ts
export interface Slot {
  isAvailable: boolean;
  takenAt: Timestamp | null;
  takenBy: string | null;
  time: string;
}

export interface IExpertSchedule {
  schedule: {
    Lunes?: Slot[];
    Martes?: Slot[];
    Miercoles?: Slot[];
    Jueves?: Slot[];
    Viernes?: Slot[];
    Sabado?: Slot[];
    Domingo?: Slot[];
  };
}
