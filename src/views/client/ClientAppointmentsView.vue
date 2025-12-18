<template>
  <ion-page>
    <!--Header-->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="text-center text-blue-600">Agenda</ion-title>
      </ion-toolbar>
    </ion-header>

    <!--Content-->
   
 
  
      <ion-segment class="p-1">
        <ion-segment-button value="Proximas" content-id="Proximas">
          <ion-label>Próximas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Pasadas" content-id="Pasadas">
          <ion-label>Pasadas</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment-view>
        <ion-segment-content id="Proximas">
          <div class="bg-gray-100 text-center ion-padding">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">Próximas citas</p> 
          </div>
          <div v-if="userAppointments.every(appointment => appointment.isFinished)" class="flex justify-center items-center h-full">
            No tiene citas futuras
          </div>
          <div v-else class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo v-if="!appointment.isFinished" :data="appointment" />
            </div>
          </div>
        </ion-segment-content>
        <ion-segment-content id="Pasadas">
          <div class="bg-gray-100 text-center ion-padding">
            <p class="font-poppins text-sm ion-no-margin font-semibold text-slate-600">Citas pasadas </p> 
          </div>
          <div v-if="userAppointments.every(appointment => !appointment.isFinished)" class="flex justify-center items-center h-full">
            No tiene citas pasadas
          </div>
          <div v-else class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo v-if="appointment.isFinished" :data="appointment" />
            </div>
          </div>
        </ion-segment-content>
        <ion-segment-content id="third">Third</ion-segment-content>
      </ion-segment-view>

  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonSegmentView, IonSegment, IonSegmentButton, IonSegmentContent, IonLabel } from '@ionic/vue';
import { onIonViewDidEnter } from '@ionic/vue';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { authStore as authStoreInstance } from '@/store/auth';
import CardInfo from '@/components/Client/CardInfo.vue';
import { ISchedule } from '@/interfaces/user/ISchedule';


const authStore = authStoreInstance(); authStore

const userAppointments = ref<ISchedule[]>([]);
const db = getFirestore();
const q = query(collection(db, `users/${authStoreInstance().getUserUid}/schedule`), where('userUid', '==', authStoreInstance().getUserUid));
const getUserAppointments = async () => {
  try {
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
      userAppointments.value = [];
      console.log('No hay citas futuras');
      return;
    }
    userAppointments.value = querySnapshot.docs.map((doc) => doc.data() as ISchedule).filter((appointment) => appointment.expertName !== null);
    console.log(userAppointments.value);
  } catch (error) {
    console.log(error);
  }
}

onIonViewDidEnter(() => {
  getUserAppointments();
})

</script>

<style scoped></style>