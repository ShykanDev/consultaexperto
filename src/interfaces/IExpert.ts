import { DocumentReference } from "firebase/firestore";
import { IExpertSchedule } from "./Ischedule"; 

export interface IExpert {
    userUid?: string;
    fullName?: string;
    specialty?: string;
    email?: string;
    bio?: string;

    imgUrl?: string;
    profilePicture?: string;

    experienceYears?: number;
    rating?: {
        count?: number;
        stars:{
            1?: number;
            2?: number;
            3?: number;
            4?: number;
            5?: number;
        };
        total?: number;
    };
    completedSessions?: number;

    isSuspended?: boolean;
    isBanned?: boolean;
    suspensionReason?: string;

    professionalId?: string;

    createdAt?: any;

    docId?: string;
    docRef?: DocumentReference;

    schedule: IExpertSchedule

    
}

