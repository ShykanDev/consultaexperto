<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="'/expert-list-admin'" :icon="chevronBack" color="primary" text="Volver" style="text-transform: none;" />
        </ion-buttons>
        <ion-title class="text-sm text-center font-manrope" color="primary">Perfil de {{ expertAdminStore.getCurrentExpert?.fullName || 'Juan Perez' }}</ion-title>
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
              class="w-24 h-24 ring ring-blue-500 ring-offset-2 ring-offset-white"
            />
          </ion-avatar>
          <ion-text class="text-center">
            <h1 class="text-2xl font-bold font-manrope">
              {{ expertAdminStore.getCurrentExpert?.fullName || 'Juan Pérez' }}
            </h1>
            <p class="mt-1 text-base text-blue-700 font-poppins">
              {{ expertAdminStore.getCurrentExpert?.specialty || 'Specialty' }}
            </p>
          </ion-text>
        </ion-card-content>
      </ion-card>

      <!-- Contact Information -->
      <ion-card  style="background-color: #fff;">
        <ion-card-header style="background-color: #fafafa">
          <ion-card-title class="px-4 pt-4 pb-2 text-lg font-bold" color="primary">
            Información del experto
          </ion-card-title>
        </ion-card-header>
        <ion-list lines="none" class="px-4">
          <ion-item class="py-3.5 border-t border-gray-200 dark:border-gray-700">
            <ion-label color="primary">
              <p class="!text-blue-600">Nombre</p>
              <p class="">{{ expertAdminStore.getCurrentExpert?.fullName ?? 'Juan Perez' }} </p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200 dark:border-gray-700">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Email</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.email ?? 'correo@usuario.com' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200 dark:border-gray-700">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Especialidad</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.specialty ?? 'Médico' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200 dark:border-gray-700">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Suspendido Temporalmente</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.isBanned ? 'El usuario está suspendido temporalmente' : 'El usuario no está suspendido temporalmente' }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="py-3.5 border-t border-gray-200 dark:border-gray-700">
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Bloqueado</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.isBanned ? 'El usuario está bloqueado' : 'El usuario no está bloqueado' }}</p>
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

} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';


const expertAdminStore = useExpertAdminStore();



onIonViewDidLeave(()=> {
  expertAdminStore.resetCurrentExpert();
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


ion-toolbar {
  --background: rgba(var(--ion-color-content-light-rgb), 0.8);
  --border-color: rgba(var(--ion-color-gray-rgb), 0.8);
  backdrop-filter: blur(8px);
}


ion-footer ion-toolbar {
  --background: rgba(var(--ion-color-content-light-rgb), 0.8);
  --border-color: rgba(var(--ion-color-gray-rgb), 0.8);
}


ion-content{
  --background: #eeeeee;
}

</style>
