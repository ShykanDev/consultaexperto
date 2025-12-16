
export interface IExpertProfile {
  bio: string;
  completedSessions: number;
  email: string;
  experienceYears: string; // keep string if it comes from Firestore like this
  fullName: string;
  imgUrl: string;
  isBanned: boolean;
  isSuspended: boolean;
  professionalId: string;
  rating: number;
  schedule: any;
  specialty: string;
  suspensionReason: string;
  totalRatings: number;
  userUid: string;
}
