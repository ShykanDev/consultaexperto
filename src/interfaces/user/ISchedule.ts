import { Timestamp } from "firebase/firestore";
import { Slot } from "../Ischedule";

export interface ISchedule {
  DocId: string;
  createdAt: Timestamp;
  expertName: string;
  expertUid: string;
  userName: string;
  userUid: string;
  isAvailable: boolean;
  takenAt: Timestamp | null;
  takenBy: string | null;
  expertSchedule: Slot;
  isFinished: boolean;
}
