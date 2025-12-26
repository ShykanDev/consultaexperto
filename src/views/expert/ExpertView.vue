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
        <ion-segment-button value="Finalizadas" content-id="Finalizadas">
          <ion-label>Finalizadas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Canceladas" content-id="Canceladas">
          <ion-label>Canceladas</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment-view>
        <ion-segment-content id="Proximas">
          <div class="bg-gray-100 text-center ion-padding">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">Próximas citas</p> 
          </div>
          <div v-if="userAppointments.every(appointment => appointment.isFinished || appointment.isCanceled)" class="flex justify-center items-center h-full">
            No tiene citas futuras
          </div>
          <div v-if="userAppointments.some(appointment => !appointment.isFinished && !appointment.isCanceled)" class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo v-if="!appointment.isFinished && !appointment.isCanceled" :data="appointment" />
            </div>
          </div>
        </ion-segment-content>
        <ion-segment-content id="Finalizadas">
          <div class="bg-gray-100 text-center ion-padding">
            <p class="font-poppins text-sm ion-no-margin font-semibold text-slate-600">Citas finalizadas </p> 
          </div>
          <div v-if="userAppointments.every(appointment => !appointment.isFinished)" class="flex justify-center items-center h-full">
            No tiene citas finalizadas
          </div>
          <div v-else class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo v-if="appointment.isFinished" :data="appointment" />
            </div>
          </div>
        </ion-segment-content>
        <ion-segment-content id="Canceladas">
          <div class="bg-gray-100 text-center ion-padding">
            <p class="font-poppins text-sm ion-no-margin font-semibold text-slate-600">Citas canceladas </p> 
          </div>
          <div v-if="userAppointments.every(appointment => !appointment.isCanceled)" class="flex justify-center items-center h-full">
            No tiene citas canceladas
          </div>
          <div v-else class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo v-if="appointment.isCanceled" :data="appointment" />
            </div>
          </div>
        </ion-segment-content>
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

const handleRefresh = (event: any) => {
  getUserAppointments();
  event.target.complete();
}

const authStore = authStoreInstance(); authStore

const userAppointments = ref<ISchedule[]>([]);
const db = getFirestore();
const expertCollection = collection(db,'schedules');
const queryCollection = query(expertCollection,where('expertUid', '==', authStore.getUserUid));
const getUserAppointments = async () => {
  try {
    const querySnapshot = await getDocs(queryCollection);
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