import { IUser } from "@/interfaces/user/IUser";
import { doc, getFirestore, onSnapshot, Unsubscribe } from "firebase/firestore";
import { defineStore } from "pinia";

export const authStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        userName: null as string | null,
        userUid: null as string | null,
        userEmail: null as string | null,
        isClient: false,
        isExpert: false,
        isAdmin: false,
        userData: null as IUser | null,
        userListenerUnsuscribe: null as  Unsubscribe | null
    }),
    actions: {
        setUserName(userName: string) {
            this.userName = userName;
        },
        setUserUid(userUid: string) {
            this.userUid = userUid;
        },
        setIsAuth(isAuth: boolean) {
            this.isAuth = isAuth;
        },
        setUserEmail(userEmail: string) {
            this.userEmail = userEmail;
        },
        setIsClient(isClient: boolean) {
            this.isClient = isClient;
        },
        setIsExpert(isExpert: boolean) {
            this.isExpert = isExpert;
        },
        setIsAdmin(isAdmin: boolean) {
            this.isAdmin = isAdmin;
        },
        setUserData(collectionDb:string, userUid:string,){
            if(this.userListenerUnsuscribe){
                this.userListenerUnsuscribe();
            }

            const db = getFirestore();
            const userDocRef = doc(db,`${collectionDb}/${userUid}`);
            
            this.userListenerUnsuscribe = onSnapshot(userDocRef, snapshot => {        
                if(!snapshot.exists()){
                    console.log(`Could not load user data from pinia snapshot`)
                    return; 
                }
                this.userData = null;
                const userDataSnapshot = snapshot.data() as IUser;
                this.userData = userDataSnapshot;
            },(error)=> {
                this.userData = null;
                console.log(`Error while loading user data from pinia snapshot`,error);
            })
        },
        unsuscribeListener(){
            if(this.userListenerUnsuscribe){
                this.userListenerUnsuscribe();
                this.userListenerUnsuscribe = null;
            }
            this.userData = null;
        },
        setLogout() {
            this.unsuscribeListener();
            this.isAuth = false;
            this.userName = null;
            this.userUid = null;
            this.userEmail = null;
            this.isClient = false;
            this.isExpert = false;
            this.isAdmin = false;
        },
        resetAuth() {
            this.unsuscribeListener();
            this.isAuth = false;
            this.userName = null;
            this.userUid = null;
            this.userEmail = null;
            this.isClient = false;
            this.isExpert = false;
            this.isAdmin = false;
        }
    },
    getters: {
        getUserName: (state) => state.userName,
        getUserUid: (state) => state.userUid,
        getIsAuth: (state) => state.isAuth,
        getUserEmail: (state) => state.userEmail,
        getIsClient: (state) => state.isClient,
        getIsExpert: (state) => state.isExpert,
        getIsAdmin: (state) => state.isAdmin,
        getUserData: (state) => state.userData,
        getIsUserBanned: (state) => state.userData?.isBanned,
    },
    persist:true
})