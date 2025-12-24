import { DocumentReference, Timestamp } from "firebase/firestore";
import { Slot } from "../Ischedule";

export interface ISchedule {
 docId?: string;
 docRef?: string;
createdAt: Timestamp;
DayName: string;
expertName: string;
expertSchedule: Slot;
expertSpecialty: string;
expertUid: string;
expertProfessionalId: string;
userName: string;
userUid: string;
appointmentLink: string;
isFinished: boolean;
isCancelled?: boolean;
cancelationReason?:string;
canceledAt?:Timestamp;
canceledByName?:string;
canceledByUid?:string;
}
