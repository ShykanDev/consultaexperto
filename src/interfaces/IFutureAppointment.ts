import { DocumentReference, Timestamp } from "firebase/firestore"

export interface IFutureAppointment {
  id: string
  userId: string
  userName:string
  proffession: string
  dayNumber: number
  month: string
  hour: string
  day: string
  year: string
  createdAt: Timestamp
  docRef:DocumentReference
  status: string
}
