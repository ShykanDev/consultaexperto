<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title class="font-poppins text-center" color="primary">Lista de usuarios</ion-title>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/expert-list-admin" color="primary" :icon="chevronBack" text="Atrás"
                        style="text-transform: none;"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="font-poppins">
            <ion-refresher slot="fixed" @ion-refresh="handleRefresh">
              
                   <ion-refresher-content
        :pulling-icon="chevronDownOutline"
        pulling-text="Deslice para actualizar"
        refreshing-spinner="lines-sharp-small"
        refreshing-text="Actualizando..."
      >
                   </ion-refresher-content>
            </ion-refresher>    
  
            <ion-list>
                <UserListCard v-for="user in users" :key="user.userId" :user="user" @userUpdated="getUsers()" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, onIonViewDidEnter, IonButtons, IonBackButton, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { ref } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { IUser } from '@/interfaces/user/IUser';
import UserListCard from '@/components/Admin/UserListCard.vue';
import { chevronBack, chevronDownOutline } from 'ionicons/icons';

const users = ref<IUser[]>([]);
const db = getFirestore();
const usersCollection = collection(db, 'users');
const getUsers = () => {
    users.value = [];
    getDocs(usersCollection).then((snapshot) => {
        snapshot.forEach((doc) => {
            const user = doc.data() as IUser;
            user.docId = doc.id;
            user.docRef = doc.ref;
            users.value.push(user);
        });
    });
}

const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      getUsers();
      event.target.complete();
    }, 2000);
};

onIonViewDidEnter(() => {
    getUsers();
});
</script>

<style scoped>
ion-content{
    --background: #f5f5f5;
}
</style>