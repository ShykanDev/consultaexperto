<template>
  <ion-page>
    <!--Header-->
    <ion-header class="ion-no-border font-poppins">
      <ion-toolbar>
        <ion-title class="text-center text-blue-600">Agenda</ion-title>
        <ion-buttons slot="end">
          <ion-button class="text-sm font-quicksand" color="primary" @click="getUserAppointments()" style="text-transform: none;">
            <ion-icon :icon="refresh" class="w-4 h-4" color="primary"></ion-icon>
            Actualizar
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!--Content-->
   
 
  
      <ion-segment  :class="segmentCustomClass" class="customSegment p-1 transition-all ease-in-out duration-200"   >
        <ion-segment-button @click="customSegment($event)" @ionSelect="customSegment($event)" value="Proximas" content-id="Proximas">
          <ion-label style="text-transform: none;">Próximas</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="customSegment($event)" @ionSelect="customSegment($event)" value="Finalizadas" content-id="Finalizadas">
          <ion-label style="text-transform: none;">Finalizadas</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="customSegment($event)" @ionSelect="customSegment($event)" value="Canceladas" content-id="Canceladas">
          <ion-label style="text-transform: none;">Canceladas</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment-view >
        <ion-segment-content id="Proximas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">Próximas citas</p>  
            <ion-spinner v-show="isLoading" ></ion-spinner>
          </div>
          <ion-content v-if="userAppointments.every(appointment => appointment.isFinished || appointment.isCanceled)" class="flex justify-center items-center h-full">
            No tiene citas futuras
          </ion-content>
          <ion-content class="ion-padding" v-else >
            <div v-for="(appointment, index) in userAppointments" :key="index" class="my-2">
              <CardInfo @reload="getUserAppointments()" v-if="!appointment.isFinished && !appointment.isCanceled" :data="appointment" />
            </div>
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="Finalizadas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">Citas finalizadas </p> 
            <ion-spinner v-show="isLoading"></ion-spinner>
          </div>
          <ion-content v-if="userAppointments.every(appointment => !appointment.isFinished)" class="flex justify-center items-center h-full">
            No tiene citas finalizadas
          </ion-content>
          <ion-content class="ion-padding " v-else>
            <div v-for="(appointment, index) in userAppointments" :key="index" class="my-2">
              <CardInfo @reload="getUserAppointments()" v-if="appointment.isFinished" :data="appointment" />
            </div>
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="Canceladas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">Citas canceladas </p> 
            <ion-spinner v-show="isLoading"></ion-spinner>
          </div>
          <ion-content v-if="userAppointments.every(appointment => !appointment.isCanceled)" class="flex justify-center items-center h-full">
            No tiene citas canceladas
          </ion-content>
          <ion-content v-else class="ion-padding ">
            <div v-for="(appointment, index) in userAppointments" :key="index" class="my-2">
              <CardInfo @reload="getUserAppointments()" v-if="appointment.isCanceled" :data="appointment" />
            </div>
          </ion-content>
        </ion-segment-content>
      </ion-segment-view>

  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle,  IonSpinner, IonSegmentView, IonSegment, IonSegmentButton, IonSegmentContent, IonContent, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { onIonViewDidEnter } from '@ionic/vue';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { authStore as authStoreInstance } from '@/store/auth';
import CardInfo from '@/components/Client/CardInfo.vue';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { refresh } from 'ionicons/icons';


const authStore = authStoreInstance(); authStore

const userAppointments = ref<ISchedule[]>([]);
const db = getFirestore();
const collectionRef = collection(db, 'schedules');
const q = query(collectionRef, where('userUid', '==', authStoreInstance().getUserUid));
const isLoading = ref(false);
const getUserAppointments = async () => {
  userAppointments.value = [];
  try {
    isLoading.value = true;
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
      userAppointments.value = [];
      console.log('No hay citas futuras');
      return;
    }
    //Change this to a variable and then update it using $variable.docRef = doc.ref;
    querySnapshot.forEach(doc =>{
      const userAppointment = doc.data() as ISchedule;
      userAppointment.docId = doc.id;
      userAppointment.docRef = doc.ref.path;
      userAppointments.value.push(userAppointment)
    })
    //Restore 1 const userData = querySnapshot.docs.map((doc) => doc.data() as ISchedule).filter((appointment) => appointment.expertName !== null);
    //Restore 2  userAppointments.value = userData;
    console.log(userAppointments.value);
  } catch (error) {
    console.log(error);
  }finally{
    isLoading.value = false;
  }
}

onIonViewDidEnter(() => {
  getUserAppointments();
})

interface SegmentChangeEventDetail {
  value?: string;
}
interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement;
  detail: SegmentChangeEventDetail;
}

const segmentCustomClass = ref('proximas')

const customSegment = (event: SegmentCustomEvent) => {
  
  console.log(event.target.value);
  switch (event.target.value) {
    case 'Proximas':
      segmentCustomClass.value = 'proximas';
      break;
    case 'Finalizadas':
      segmentCustomClass.value = 'finalizadas';
      break;
    case 'Canceladas':
      segmentCustomClass.value = 'canceladas';
      break;
    default:
      break;
  }
}

</script>

<style scoped>
ion-content{
  --background: rgb(249, 249, 249);
  --padding-bottom: 100px;
}
ion-segment.proximas{
  background-color: #f7fbff;
}
ion-segment.finalizadas{
  background-color: #fafffadb;
}
ion-segment.canceladas{
  background-color: #fffafa;
}

</style>