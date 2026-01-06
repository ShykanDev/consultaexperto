import { DocumentReference, Timestamp } from "firebase/firestore";
import { Slot } from "../Ischedule";

export interface ISchedule {
 docId?: string;
 docRef: DocumentReference;
 docRefPath: string;
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
isCanceled?: boolean;
cancelationReason?:string;
canceledAt?:Timestamp;
canceledByName?:string;
canceledByUid?:string;
finishedAt?:Timestamp;
finishedByName?:string;
finishedByUid?:string;
acceptedAt?:Timestamp;
acceptedByExpert?:boolean;
expertRating?:number;
userRating?:number;
}
