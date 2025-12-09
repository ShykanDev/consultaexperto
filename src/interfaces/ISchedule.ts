import { Timestamp } from "firebase/firestore"
interface slots {
    isAvailable:boolean;
    takenAt:Timestamp | null;
    takenBy:string | null;
    time:string;
}
export interface Ischedule {
    day:string;
    slots:Array<slots>,
}