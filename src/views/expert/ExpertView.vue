<template>
  <ion-page>
    <!--Header-->
    <ion-header class="ion-no-border font-poppins">
      <ion-toolbar>
        <ion-title class="text-center text-blue-600">Agenda Expertos</ion-title>
         <ion-buttons slot="end">
          <ion-button class="text-sm font-quicksand" color="primary" @click="getUserAppointments()" style="text-transform: none;">
            <ion-icon :icon="refresh" class="w-3 h-3" color="primary" :class="{ 'animate-spin': isLoading }"></ion-icon>
            Actualizar
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!--Content-->
    
      <ion-toolbar>
        <ion-searchbar v-model="searchQuery" placeholder="Usuario, especialidad o estado..." animated></ion-searchbar>
      </ion-toolbar>
      <ion-toolbar >
        <div class="flex flex-row justify-between px-2 gap-2">
            <ion-select aria-label="Listar por" interface="popover" placeholder="Listar por" class="w-full text-xs font-poppins border border-gray-300 rounded-lg"  @ion-change="handleFilter" v-model="sortBy">
             <ion-select-option :value="'creation'">Fecha de Creación</ion-select-option>
             <ion-select-option :value="'scheduled'">Fecha Agendada</ion-select-option>
           </ion-select>
     
           <ion-select  aria-label="Ordenar por" interface="popover" placeholder="Ordenar por" class="w-full text-xs font-poppins border border-gray-300 rounded-lg" @ion-change="handleFilter" v-model="orderBy">
             <ion-select-option :value="'Recientes'">Más recientes</ion-select-option>
             <ion-select-option :value="'Antiguas'">Más antiguas</ion-select-option>
           </ion-select>
        </div>
      </ion-toolbar>

      <ion-segment :class="segmentCustomClass" class="customSegment p-1 py-2 transition-all ease-in-out duration-200" >
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
      <ion-segment-view>
        <ion-segment-content id="Proximas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin my font-semibold text-slate-600">{{ proxAppointments.length }} Próximas citas</p> 
            <ion-spinner v-show="isLoading"></ion-spinner>
          </div>
          <div v-if="proxAppointments.length === 0" class="flex justify-center items-center h-full bg-white p-4 text-center text-gray-500 font-poppins">
            No se encontraron citas próximas
          </div>
          <ion-content v-else class="ion-padding">
             <div v-for="(appointment, index) in proxAppointments" :key="index" class="my-2">
              <CardInfo  v-if="!appointment.isFinished && !appointment.isCanceled" :data="appointment" :index="index" />
            </div>
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="Finalizadas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin font-semibold text-slate-600">{{ finishedAppointments.length }} Citas finalizadas </p> 
             <ion-spinner v-show="isLoading"></ion-spinner>
          </div>
          <div v-if="finishedAppointments.length === 0" class="flex justify-center items-center h-full bg-white p-4 text-center text-gray-500 font-poppins">
            No se encontraron citas finalizadas
          </div>
          <ion-content v-else class="ion-padding">
            <div v-for="(appointment, index) in finishedAppointments" :key="index" class="my-2">
              <CardInfo  v-if="appointment.isFinished" :data="appointment" />
            </div>
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="Canceladas">
          <div class="bg-gray-100 text-center ion-padding flex items-center gap-2 justify-center">
            <p class="font-poppins text-sm ion-no-margin font-semibold text-slate-600">{{ canceledAppointments.length }} Citas canceladas </p> 
             <ion-spinner v-show="isLoading"></ion-spinner>
          </div>
          <div v-if="canceledAppointments.length === 0" class="flex justify-center items-center h-full bg-white p-4 text-center text-gray-500 font-poppins">
            No se encontraron citas canceladas
          </div>
          <ion-content v-else class="ion-padding">
            <div v-for="(appointment, index) in canceledAppointments" :key="index" class="my-2">
              <CardInfo  v-if="appointment.isCanceled" :data="appointment" />
            </div>
          </ion-content>
        </ion-segment-content>
      </ion-segment-view>

  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentView, IonSegment, IonSegmentButton, IonSegmentContent, IonLabel, IonButtons, IonButton, IonIcon, IonSelect, IonSelectOption, IonSearchbar, IonSpinner, onIonViewDidLeave } from '@ionic/vue';
import { onIonViewDidEnter } from '@ionic/vue';
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { ref, computed } from 'vue';
import { authStore as authStoreInstance } from '@/store/auth';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { refresh } from 'ionicons/icons';
import CardInfo from '@/components/Expert/CardInfo.vue';
import { Unsubscribe } from 'firebase/auth';
import expertStore from '@/store/expert';
import { IExpert } from '@/interfaces/IExpert';


const authStore = authStoreInstance(); authStore

const userAppointments = ref<ISchedule[]>([]);
const db = getFirestore();
const expertCollection = collection(db,'schedules');
const queryCollection = query(expertCollection,where('expertUid', '==', authStore.getUserUid));
const isLoading = ref(false);

//Firebase onSnapshot data

let unsub: (() => void) | null = null;
let unsubExpertData:Unsubscribe|null = null;

onIonViewDidEnter(() => {
  unsub = onSnapshot(
    queryCollection,
    (querySnapshot) => {
      userAppointments.value = [];
      querySnapshot.forEach((doc) => {
       const schedule = doc.data() as ISchedule;
       schedule.docRef = doc.ref;
       schedule.docRefPath = doc.ref.path;
       schedule.docId = doc.id;
       userAppointments.value.push(schedule);
      });
    },
    (error) => {
      console.error(error);
    }
  );
});

onIonViewDidEnter(()=> {
const expertDocRef = doc(db, `experts/${authStore.getUserUid}`);
unsubExpertData = onSnapshot(expertDocRef, (snapshot)=> {
  if(!snapshot.exists()){
    console.log(`Expert data was not found in servers`);
    return;
  }
  expertStore().resetExpertData();
  expertStore().setExpertData(snapshot.data() as IExpert)
},(error)=> {console.log(`Error while getting snapshot expert data: ${error}`);
})
})

onIonViewDidLeave(()=> {
  userAppointments.value = [];
  if(unsub) {
    unsub();
    unsub = null;
  }
  if(unsubExpertData) {
    unsubExpertData();
    unsubExpertData = null;
  }
})






/** Filtering and Sorting Logic **/

const searchQuery = ref('');
const sortBy = ref<'creation' | 'scheduled'>('creation');
const orderBy = ref<'Recientes'| 'Antiguas'>('Recientes');
const handleFilter = () => {
    // Logic is handled by computed properties
}

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  if (!dayName) return -1;
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const getAppointmentDate = (appointment: ISchedule): Date | null => {
   if ((appointment as any).appointmentDate) {
    return new Date((appointment as any).appointmentDate.seconds * 1000);
  }

  if (!appointment.createdAt) return null;

  const createdAtDate = new Date(appointment.createdAt.seconds * 1000);
  
  const currentDayIndex = createdAtDate.getDay();
  const targetDayName = appointment.DayName || (appointment as any).dayName || '';
  const targetDayIndex = getDayIndex(targetDayName);

  if (targetDayIndex === -1) return createdAtDate;

  let daysUntil = targetDayIndex - currentDayIndex;
  
  if (daysUntil < 0) {
    daysUntil += 7;
  }
  
  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);
  
  // Try to set time from expertSchedule if available for more precision
  if (appointment.expertSchedule && appointment.expertSchedule.time) {
      const [hours, minutes] = appointment.expertSchedule.time.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
          futureDate.setHours(hours, minutes, 0, 0);
      }
  }

  return futureDate;
}

const filterAndSortAppointments = (appointments: ISchedule[]) => {
  let filtered = [...appointments];

  // Search Filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    filtered = filtered.filter(app => {
        // Search by User Name for Expert View
        const uName = (app.userName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const specialty = (app.expertSpecialty || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let status = 'programada';
        if (app.isFinished) status = 'finalizada';
        if (app.isCanceled) status = 'cancelada'; 
        
        const isPending = !app.isFinished && !app.isCanceled;
        if (isPending && (q.includes('proxima') || q.includes('pendiente'))) return true;

        return uName.includes(q) || specialty.includes(q) || status.includes(q);
    });
  }

  // Sorting
  filtered.sort((a, b) => {
      let dateA = 0;
      let dateB = 0;

      if (sortBy.value === 'creation') {
          dateA = a.createdAt?.seconds || 0;
          dateB = b.createdAt?.seconds || 0;
      } else {
          // Scheduled Data Sort
          const dA = getAppointmentDate(a);
          const dB = getAppointmentDate(b);
          dateA = dA ? dA.getTime() : 0;
          dateB = dB ? dB.getTime() : 0;
      }

      if (orderBy.value === 'Recientes') {
          return dateB - dateA;
      } else { // Antiguas
          return dateA - dateB;
      }
  });

  return filtered;
}

//canceled appintments computed
const canceledAppointments = computed(()=> {
  const cAppointments = userAppointments.value.filter((e) => e.isCanceled);
  return filterAndSortAppointments(cAppointments);
})
//finished appintments computed
const finishedAppointments = computed(()=> {
  const cAppointments = userAppointments.value.filter((e) => e.isFinished);
  return filterAndSortAppointments(cAppointments);
})
//prox appintments computed
const proxAppointments = computed(()=> {
  const cAppointments = userAppointments.value.filter((e) => !e.isFinished && !e.isCanceled);
  return filterAndSortAppointments(cAppointments);
})

/** Segment Logic **/
interface SegmentChangeEventDetail {
  value?: string;
}
interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement;
  detail: SegmentChangeEventDetail;
}

const segmentCustomClass = ref('proximas')

const customSegment = (event: SegmentCustomEvent) => {
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
  --background: rgb(241, 241, 241);
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