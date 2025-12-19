<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Lista de usuarios</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-list-header>
                    <ion-label>Lista de usuarios</ion-label>
                </ion-list-header>
                <UserListCard v-for="user in users" :key="user.userId" :user="user" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItemGroup, IonItem, IonLabel, onIonViewDidEnter } from '@ionic/vue';
import { ref } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { onMounted } from 'vue';
import { IUser } from '@/interfaces/user/IUser';
import UserListCard from '@/components/Admin/UserListCard.vue';

const users = ref<IUser[]>([]);
const db = getFirestore();
const usersCollection = collection(db, 'users');
const getUsers = () => {

    getDocs(usersCollection).then((snapshot) => {
        snapshot.forEach((doc) => {
            const user = doc.data() as IUser;
            user.docId = doc.id;
            user.docRef = doc.ref;
            users.value.push(user);
        });
    });
}

onIonViewDidEnter(() => {
    getUsers();
});
</script>

<style scoped>

</style>