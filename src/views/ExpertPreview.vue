<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="text-sm" :default-href="'/expert-list-admin'" :icon="chevronBack" color="primary" text="Volver" style="text-transform: none;" />
        </ion-buttons>
        <ion-title class="text-sm text-center font-manrope" color="primary">Perfil de {{ expertAdminStore.getCurrentExpert?.fullName?.split(' ')[0] || 'Usuario' }}</ion-title>
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
            <img
            src="https://picsum.photos/200/300"
              alt="Profile picture of Jordan Smith"
              class="w-24 h-24 ring ring-offset-2 ring-offset-white"
              :class="{'ring-red-600': expertAdminStore.getCurrentExpert?.isSuspended, 'ring-blue-500': !expertAdminStore.getCurrentExpert?.isSuspended}"
            />
          </ion-avatar>
          <ion-text class="text-center">
            <h1 class="text-2xl font-bold font-manrope">
              {{ expertAdminStore.getCurrentExpert?.fullName || 'Juan Pérez' }}
            </h1>
            <h3 v-if="expertAdminStore.getCurrentExpert.isSuspended" :class="{'text-red-600 font-poppins font-bold': expertAdminStore.getCurrentExpert?.isSuspended}"> (Suspendido)</h3>
            <p class="mt-1 text-base text-blue-700 font-poppins">
              {{ expertAdminStore.getCurrentExpert?.specialty || 'Specialty' }}
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
              <p class="">{{ expertAdminStore.getCurrentExpert?.fullName ?? 'Juan Perez' }} </p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Email</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.email ?? 'correo@usuario.com' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Especialidad</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.specialty ?? 'Médico' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label >
              <p class=" !font-poppins !text-blue-700" >Suspendido </p>
              <p class="!font-poppins" :class="{ '!text-red-500': expertAdminStore.getCurrentExpert?.isSuspended }">{{ expertAdminStore.getCurrentExpert?.isSuspended ? 'El usuario está suspendido' : 'El usuario no está suspendido temporalmente' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Motivo de la suspension</p>
              <p class="!font-poppins" :class="{ '!text-red-500': expertAdminStore.getCurrentExpert?.isSuspended }">{{ expertAdminStore.getCurrentExpert?.suspensionReason ?? 'El usuario no tiene un motivo de suspension' }}</p>
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
            {{ expertAdminStore.getCurrentExpert?.bio ?? 'Biografía de ejemplo' }}
          </p>
        </ion-card-content>
      </ion-card>

     <!-- Professional Bio -->
<ion-card-content>
  <h2 class="p-1 w-full font-medium text-center text-blue-600 bg-white rounded-xl shadow-sm font-poppins">
    Horarios del experto
  </h2>
  <div class="ion-margin-vertical">
    <ion-toggle v-model="toggleValue" mode="ios" enable-on-off-labels color="primary">Habilitar Cambios</ion-toggle>
  </div>
  <article class="grid grid-cols-2 gap-2">
    <div v-for="(slots, dayName) in expertAdminStore.getCurrentExpert.schedule" :key="dayName" class="p-1 rounded-md ring-offset-1 transition-all duration-200 ease-in hover:ring-1 hover:ring-offset-slate-200 hover:scale-[101%] hover:ring-blue-500">
      <span class="text-center text-blue-500">
        {{ dayName }}
      </span>
      <div
        v-for="(slot, slotIndex) in slots"
        :key="slotIndex"
        class="mb-2 font-medium text-center text-white rounded-md ring-1 ring-gray-200 cursor-pointer font-poppins"
        :class="{ 'bg-white text-slate-800': slot.isAvailable, 'bg-[#2C7CEE] rounded-md text-white': !slot.isAvailable }"
        @click="toggleValue ? getDateSelected(dayName, slot.time) : null"
      >
        {{ slot.time }}
      </div>
    </div>
  </article>
</ion-card-content>

   
    </ion-content>


  </ion-page>
</template>

<script setup lang="ts">

import { useExpertAdminStore } from '@/stores/expertAdmin';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
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
  IonToggle,
  onIonViewDidEnter

} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';


const expertAdminStore = useExpertAdminStore();



onIonViewDidLeave(()=> {
  expertAdminStore.resetCurrentExpert();
})


const getDateSelected = (dayName: string, timeSelected: string) => {
  const expert = expertAdminStore.getCurrentExpert;
  if (!expert?.schedule) return;

  const slots = expert.schedule[dayName]; // ✅ Obtener los slots del día
  if (!slots) return;

  const slot = slots.find(slot => slot.time === timeSelected); // ✅ Buscar el slot por tiempo
  if (slot) {
    slot.isAvailable = !slot.isAvailable;
  }
};


const toggleValue = ref(false);

onIonViewDidEnter(()=> {
  console.log(expertAdminStore.getCurrentExpert.schedule);
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




ion-content{
  --background: #eeeeee;
}

</style>
