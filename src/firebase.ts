import { initializeApp } from "firebase/app";
import { Auth, getAuth, indexedDBLocalPersistence, initializeAuth, setPersistence } from 'firebase/auth';
import { isPlatform } from '@ionic/vue'; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaC-rl6w3801e6uyzppr1uM8XEWel4vdg",
  authDomain: "consulta-experto.firebaseapp.com",
  projectId: "consulta-experto",
  storageBucket: "consulta-experto.firebasestorage.app",
  messagingSenderId: "219532409032",
  appId: "1:219532409032:web:f85784b3f1e7a825234dfd",
  measurementId: "G-K0T9YMG4VK"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(appFirebase);

let auth: Auth;
//Add firestore if fetch data on ios shows an error
//let db: Firestore;
if (isPlatform('hybrid')) {
  auth = initializeAuth(appFirebase, { persistence: indexedDBLocalPersistence });
  //db = initializeFirestore(firebaseApp, { localCache: persistentLocalCache() });
} else {
  auth = getAuth(appFirebase);
  setPersistence(auth, indexedDBLocalPersistence);
}

export { auth };
