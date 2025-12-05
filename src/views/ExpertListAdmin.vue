<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar>
        <ion-title color="primary" class="font-medium tracking-tight font-poppins dark:text-neutral-200">
          Gestión de Expertos
        </ion-title>
        <ion-buttons slot="start">
          <ion-back-button :icon="chevronBack" default-href="/tabs/tab1" text="Inicio" style="text-transform: none;" >

          </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar class="ion-padding">
        <ion-text color="medium">
          <p>Ver  y gestionar expertos registrados</p>
        </ion-text>
        <ion-searchbar
          placeholder="Buscar por nombre, especialidad o correo"
          class="ion-margin-vertical"
          :debounce="500"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button routerLink="/create-expert" routerDirection="forward">Crear Nuevo Experto</ion-button>
      <div class="flex justify-center items-center w-full">
        <ion-spinner name="lines-sharp-small" v-if="loading"></ion-spinner>
      </div>
          <ExpertCard v-for="(expert, index) in experts" :key="index" :expert-data="expert" @reload="getAllExperts"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ExpertCard from '@/components/Experts/ExpertCard.vue';
import { IExpert } from '@/interfaces/IExpert';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,   
  IonText,
  IonSearchbar,
  IonContent,
  IonBackButton,
  onIonViewDidEnter,
  IonSpinner,
  IonButton
} from '@ionic/vue';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import {
  chevronBack,
} from 'ionicons/icons';
import { ref } from 'vue';

import { toastController } from '@ionic/vue';

const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
    const toast = await toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color,
      swipeGesture:'vertical',
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




const experts = ref<IExpert[]>([])
const db = getFirestore();
const expertsCollection = collection(db, 'experts');
const loading = ref(false);

const getAllExperts = () => {
  experts.value = [];
  loading.value = true;
  
  getDocs(expertsCollection).then(querySnapshot => {
    if (querySnapshot.empty) {
      console.log('No hay expertos registrados');
      presentToast('top', 'No hay expertos registrados', 'warning');
      return;
    }
    querySnapshot.forEach(doc => {
  const data = doc.data();

  const expert: IExpert = {
    ...data,
    docId: doc.id,
    docRef: doc.ref,
  };

  experts.value.push(expert);

  console.log("Expert data:", expert);
});

  }).catch(err=>{
    console.error('Error al cargar los expertos:', err);
    presentToast('top', 'Error al cargar los expertos: ' + err.message, 'danger');
  }).finally(() => {
    loading.value = false;
  })
}

onIonViewDidEnter(()=> {
  getAllExperts()
})
</script>

<style scoped>
/* Custom styles for dark/light mode and card overlays */
ion-card {
  --background: white;
  --border-radius: 1rem;
  --box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.dark ion-card {
  --background: rgba(27, 38, 54, 0.5);
}

ion-badge {
  --border-radius: 9999px;
  --padding-top: 0.25rem;
  --padding-bottom: 0.25rem;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
}

ion-chip {
  --border-radius: 9999px;
  --padding-top: 0.25rem;
  --padding-bottom: 0.25rem;
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
}
ion-content{
  --background:#f1f1f1;
}

ion-header {
  --background: #ffffff;
}

</style>
