import { setDoc, doc, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export const createUserData = () => {
  const setUserData = async (
    nameParam: string,
    emailParam: string,
    phoneParam: string,
    birthDateParam: any,
    userUid: string,
  ) => {
    // Create user document in Firestore
    await setDoc(doc(db, "users", userUid), {
      name: nameParam,
      email: emailParam,
      phone: phoneParam,
      birthDate: birthDateParam,
      isBanned: false,
      terms: true,
      createdAt: Timestamp.now(),
      userId: userUid,
      freeConsultations: true,
      categoryConsultations: {}, // Initialize empty object for tracking free consultations per category
    });
  };
  return { setUserData };
};
