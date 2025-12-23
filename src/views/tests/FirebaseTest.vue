<template>
  <ion-page>
<ion-segment>
    <ion-segment-button value="users" content-id="users">
      <ion-label>Users</ion-label>
    </ion-segment-button>
    <ion-segment-button value="experts" content-id="experts">
      <ion-label>Experts</ion-label>
    </ion-segment-button>
    <ion-segment-button value="third" content-id="third">
      <ion-label>Third</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment-view>
    <ion-segment-content id="users">
        <ion-content>
            <div>Testing Get Users (When user is auth)</div>
            <ion-button @click="getUsers">Get Users</ion-button>
            <ion-button @click="getSelfUser">Get Self User</ion-button>
            <div>
              <p>Users Data</p>
              <p class="text-red-600">If data is present here, then firebase is still allowing user to fetch info that is not allowed (error is expected)</p>
              <p v-if="usersData.length > 0" class="text-white bg-red-600 p-2 rounded-2xl">Users found: You should not be able to see this, check firebase rules </p>
              <ul v-if="usersData.length > 0">
                <li v-for="user in usersData" :key="user.docId">
                  {{ user.name }} - {{ user.email }}
                </li>
              </ul>
            </div>

            <div class="mt-4">
              <p>Self User Data</p>
              <p class="text-red-600">If user can't fetch this data, then firebase is not allowing user to fetch info that is not allowed (info is expected)</p>
              <p v-if="!userSelfData" class="text-white bg-green-600 p-2 rounded-2xl">User Data: You should be able to see this, if you see this firebase rules are working correctly </p>
             <p v-if="userSelfData" class="text-white bg-red-600 p-2 rounded-2xl">User Data: {{ userSelfData }}</p>
            </div>
        </ion-content>
    </ion-segment-content>
    <ion-segment-content id="experts">Experts</ion-segment-content>
  </ion-segment-view>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonContent
} from '@ionic/vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { toastController } from '@ionic/vue';

console.log('LoginComponent.vue script is executing...');

const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: position,
    color: color,
    swipeGesture: 'vertical',
    translucent: true,
    buttons: [
      {
        text: 'cerrar',
        role: 'cancel',
      }
    ]
  });

  await toast.present();
};
import { ref } from 'vue';
import { IUser } from '@/interfaces/user/IUser';

const usersData = ref<IUser[]>([]);

const db = getFirestore();

const usersCollection = collection(db, 'users');


const getUsers=()=>{
  usersData.value = [];
  const usersSnapshot = getDocs(usersCollection).then((snapshot)=>{
    usersData.value = snapshot.docs.map((doc)=>doc.data() as IUser);
    console.log(usersData.value);
    presentToast('bottom', 'Usuarios obtenidos correctamente', 'success');
  }).catch((error)=>{
    console.log(`Error al obtener los usuarios: ${error}`);
    presentToast('bottom', 'Error al obtener los usuarios' + error, 'danger');
  }); 
}

const userSelfData = ref<IUser|null>(null);
const getSelfUser=()=>{
  userSelfData.value = null;
  const usersSnapshot = getDocs(usersCollection).then((snapshot)=>{
    console.log(userSelfData.value);
    presentToast('bottom', 'Usuarios obtenidos correctamente', 'success');
  }).catch((error)=>{
    console.log(`Error al obtener los usuarios: ${error}`);
    presentToast('bottom', 'Error al obtener los usuarios' + error, 'danger');
  }); 
}
</script>
