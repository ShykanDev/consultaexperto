<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="text-sm" :default-href="'/expert-list-admin'" :icon="chevronBack" color="primary"
            text="Volver" style="text-transform: none;" />
        </ion-buttons>
        <ion-title class="text-sm text-center font-manrope" color="primary">Perfil de {{
          expertUiStore.getCurrentExpert?.fullName?.split(' ')[0] || 'Usuario' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button style="width: 4rem;"></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Profile Header -->
      <ion-card class="ion-no-margin" style="background-color: #fff;">
        <ion-card-content class="flex flex-col items-center p-6">
          <ion-avatar class="mb-4 w-24 h-24">
            <img src="https://picsum.photos/200/300" alt="Profile picture of Jordan Smith"
              class="w-24 h-24 ring ring-offset-2 ring-offset-white"
              :class="{ 'ring-red-600': expertUiStore.getCurrentExpert?.isSuspended, 'ring-blue-500': !expertUiStore.getCurrentExpert?.isSuspended }" />
          </ion-avatar>
          <ion-text class="text-center">
            <h1 class="text-2xl font-bold font-manrope">
              {{ expertUiStore.getCurrentExpert?.fullName || 'Juan Pérez' }}
            </h1>
            <h3 v-if="expertUiStore.getCurrentExpert.isSuspended"
              :class="{ 'text-red-600 font-poppins font-bold': expertUiStore.getCurrentExpert?.isSuspended }">
              (Suspendido)</h3>
            <p class="mt-1 text-base text-blue-700 font-poppins">
              {{ expertUiStore.getCurrentExpert?.specialty || 'Specialty' }}
            </p>
          </ion-text>
        </ion-card-content>
      </ion-card>

      <!-- Contact Information -->
      <ion-card class="ion-no-margin ion-margin-top" style="background-color: #fff;">
        <ion-card-header style="background-color: #fafafa">
          <ion-card-title class="px-4 pt-4 pb-2 text-lg font-bold" color="primary">
            Información del experto
          </ion-card-title>
        </ion-card-header>
        <ion-list lines="none" class="px-4">
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label color="primary">
              <p class="!text-blue-600">Nombre</p>
              <p class="">{{ expertUiStore.getCurrentExpert?.fullName ?? 'Juan Perez' }} </p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Especialidad</p>
              <p class="!font-poppins">{{ expertUiStore.getCurrentExpert?.specialty ?? 'Médico' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Cédula profesional</p>
              <p class="!font-poppins">{{ expertUiStore.getCurrentExpert?.professionalId ?? 'No se proporcionó cédula profesional' }}</p>
            </ion-label>
          </ion-item>


        </ion-list>
      </ion-card>

      <!-- Professional Bio -->
      <ion-card class="" style="background-color: #fff;">
        <ion-card-header style="background-color: #fafafa">
          <ion-card-title class="mb-2 text-lg font-bold" color="primary">
            Biografía
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p class="text-sm leading-relaxed">
            {{ expertUiStore.getCurrentExpert?.bio ?? 'Biografía de ejemplo' }}
          </p>
        </ion-card-content>
      </ion-card>

      <!-- Professional Bio -->
      <h2 class="p-1 w-full font-medium text-center text-blue-600 bg-white rounded-xl shadow-sm font-poppins">
        Horarios del experto {{ expertUiStore.getCurrentExpert?.fullName?.split(' ')[0] ?? 'Experto' }}
      </h2>
      <h6 class="text-center  text-gray-500 font-poppins">Estos son los horarios disponibles para citas</h6>
<ion-card-content class="flex w-full overflow-x-scroll  gap-4 p-4 ">
  <article
    v-for="(slots, dayName) in schedule"
    :key="dayName"
    class="flex-shrink-0 w-48 md:w-52 rounded-2xl ring-offset-1 transition-all duration-200 ease-in hover:ring-1 hover:ring-offset-slate-200 hover:scale-[101%] bg-white p-2  hover:ring-blue-500 animate-fade-left animate-delay-1000"
  >
          <span class="text-center text-blue-500">
            {{ dayName }}
          </span>

          <div v-for="(slot, slotIndex) in slots as IExpertSchedule['schedule'][keyof IExpertSchedule['schedule']]"
            :key="slotIndex"
            class="mb-2 py-[3px] font-semibold text-center rounded-md ring-1 ring-gray-200 cursor-pointer font-poppins"
            :class="{
              '!bg-blue-500 text-white': slot.takenBy != null,
              'bg-white ring-1 ring-offset-1 ring-offset-blue-500 ring-blue-500 text-slate-700': !slot.isAvailable,//Slots enabled by administator 
              'bg-slate-100 rounded-md text-slate-500': slot.isAvailable,//Slots disabled by administrator
            }" @click="getDateSelected(dayName, slot.time)">
            {{ slot.time }} 
            <small class="!text-[7px] " :class="{'text-slate-500': !slot.isAvailable && slot.takenBy != authStore().getUserUid, 'text-red-500': slot.isAvailable && slot.takenBy != authStore().getUserUid}"  v-if="slot.isAvailable">
             (No disponible)
            </small>
            <span class="!text-[10px]" v-if="slot.takenBy != null && slot.takenBy != authStore().getUserUid">
              Ocupado
            </span>
            <p class="!text-[10px]" v-if="slot.takenBy == authStore().getUserUid">
              Agendado por usted
            </p>

          </div>
        </article>
      </ion-card-content>
      <ion-button class="ion-margin-vertical" mode="ios" color="primary" expand="block"
        @click="updateSubcollectionSchedule()">{{
          !savingChanges ? 'Guardar cambios' : 'Guardando Cambios'

        }}
        <ion-spinner v-show="savingChanges" name="lines-sharp-small"></ion-spinner>
      </ion-button>


    </ion-content>


  </ion-page>
</template>

<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSpinner,
  IonLabel,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonText,
  IonList,
  IonItem,
  IonBackButton,
  onIonViewDidLeave,
  onIonViewDidEnter,
  useIonRouter

} from '@ionic/vue';
import { doc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { chevronBack } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { toastController } from '@ionic/vue';
import { useExpertUiStore } from '@/stores/expertUi';
import { IExpertSchedule } from '@/interfaces/Ischedule';
import { authStore } from '@/store/auth';



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



const expertUiStore = useExpertUiStore()
const savingChanges = ref(false);


onIonViewDidLeave(() => {
  expertUiStore.resetCurrentExpert();
})

const daysOrdered = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

const schedule = computed(() => {
  const originalSchedule = expertUiStore.getCurrentExpert.schedule;
  const orderedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  const orderedSchedule: Record<string, any> = {};

  orderedDays.forEach(day => {
    if (originalSchedule?.[day]) {
      orderedSchedule[day] = originalSchedule[day];
    }
  });

  return orderedSchedule;
});

onIonViewDidEnter(() => {
  console.log(schedule);
  
})
const router = useIonRouter()

const authStoreGlobal = authStore()
const isUserLoggedIn = () => {
  if (!authStoreGlobal.getIsAuth) {
    router.navigate('/tabs/tab1', 'back', 'replace');
    return false;
  }
  return true;
};


const slotTakenAt = ref(null);

const getDateSelected = (dayName: number, timeSelected: string) => {
   if(userHasSlotsTaken.value){
     presentToast('top', 'No puede agendar horarios si ya tiene citas agendadas', 'warning');
     return;
 }
  if (!isUserLoggedIn()) {
    return;
  }

  const slot = schedule.value[dayName].find((s: any) => s.time === timeSelected);
  //Verify if slot taken is already taken if is taken but takenAt is null means that the slot is not taken in firebase yet so it can be diselected or selected again
  console.log(slot);
  if(slot){
    if(slot.takenBy != null){ // If slot is taken by another user
      presentToast('top', 'El horario seleccionado ya esta tomado', 'warning');
      return;
    }
    if(slot.takenBy == authStore().getUserUid){ // If slot is taken by current user
      presentToast('top', 'El horario seleccionado ya esta tomado por usted', 'warning');
      return;
    }
    slot.takenBy = slot.takenBy == null ? authStore().getUserUid : null;
    slot.takenAt = Timestamp.now();
  }  

};

const db = getFirestore();
const routerIon = useIonRouter();
const updateSubcollectionSchedule = async () => {


  if (!toggleValue.value) {
    presentToast('top', 'Debe habilitar el boton de cambios para poder editar los datos', 'danger');
    return;
  }

  savingChanges.value = true;
  const expertPath = doc(db, `experts/${expertUiStore.getCurrentExpert.docId}`);
  try {
    await updateDoc(expertPath, {
      schedule: schedule
    });
    presentToast('top', 'Se ha actualizado el horario con exito', 'success');
    setTimeout(() => {
      routerIon.back();
    }, 1500);
    savingChanges.value = false;
  } catch (error) {
    console.log(error);
    presentToast('top', 'Hubo un error al actualizar el horario', 'danger');
    savingChanges.value = false;
  }
};


const userHasSlotsTaken = ref(false);
const toggleValue = ref(false);

onIonViewDidEnter(() => {
  console.clear();
  
  
  const currentSchedule = expertUiStore.getCurrentExpert.schedule;


const isSlotTakenByCurrentUser = () => Object.values(currentSchedule).flat(1).some(s => s.takenBy == authStore().getUserUid);

userHasSlotsTaken.value = isSlotTakenByCurrentUser();
})



</script>

<style scoped>
/* Custom styles to match your design */
ion-card {
  --background: var(--ion-color-content-light);
  --color: var(--ion-color-text-primary-light);
  border-radius: 1rem;
}



ion-chip {
  --background: rgba(var(--ion-color-primary-rgb), 0.1);
  --color: var(--ion-color-primary);
  border-radius: 9999px;
}




ion-content {
  --background: #eeeeee;
}
</style>
