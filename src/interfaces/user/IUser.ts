import { DocumentReference, Timestamp } from "firebase/firestore";

export interface IUser {
  userId: string;               // Example: "lQk78CrcenUc8NvQVCgPc61Bd7q1"
  name: string;                 // Example: "Alejandro Carbajal"
  email: string;                // Example: "shykandev@gmail.com"
  phone: string;                // Example: "525535752789"
  userAge: Timestamp;                // Example: new Date("2001-05-05T15:14:00-06:00")
  createdAt: Date;              // Example: new Date("2025-12-19T15:15:34-06:00")
  isBanned: boolean;            // Example: false
  isSuspended: boolean;         // Example: false
  banReason: string | null;     // Example: null
  bannedAt: Date | null;        // Example: null
  bannedBy: string | null;      // Example: null
  suspendedAt: Timestamp | null;     // Example: null
  suspendedBy: string | null;   // Example: null
  suspendedReason: string | null; // Example: null
  freeConsultations: boolean;   // Example: true
  terms: boolean;               // Example: true
  docRef?: DocumentReference;    // Example: DocumentReference
  docId?: string;                // Example: "lQk78CrcenUc8NvQVCgPc61Bd7q1"
  expertsBlocked:{
    [key: string]: {
      blockedAt: Timestamp;
      blockedBy: string;
      reason: string;
    };
  };
  categoryConsultations:{
    [key: string]: {
      isTaken: boolean;
      lastTakenAt: Timestamp;
      hasFreeConsult: boolean;
      reactivatedAt:Timestamp;
      reactivatedBy:string;
      reactivatedByName:string;
    };
  };
}
