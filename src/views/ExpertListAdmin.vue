<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title color="primary" class="text-sm tracking-tight font-poppins">
          Expertos
        </ion-title>
        <ion-buttons slot="start">
          <ion-back-button color="primary" :icon="chevronBack" default-href="/tabs/tab1" text="Salir" style="text-transform: none; " >
          </ion-back-button>
        </ion-buttons>
        <ion-buttons  slot="end">
          <ion-button  routerLink="/create-expert" routerDirection="forward" class="!text-sm create-expert font-poppins" style="text-transform: none; padding-right: 2px; font-size: small!important;">Crear Experto</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar class="px-2 py-1 searchbar">
          <p class="py-1 ml-3 font-medium text-center text-blue-500">
            Ver  y administrar expertos registrados
          </p>
        <ion-searchbar
          placeholder="Nombre, Especialidad, Correo, etc..."
          class="ion-margin-vertical custom"
          :debounce="300"
          enterkeyhint="search"
          v-model="searchQuery"
          @ion-input="searchExpertByName(searchQuery)"
    ></ion-searchbar>
      </ion-toolbar>

    </ion-header>

    <ion-content class="ion-padding">
      <ion-button router-link="/users-list-admin" mode="ios" color="primary" >Ver usuarios</ion-button>
      <ion-refresher slot="fixed"  @ionRefresh="handleRefresh($event)">
      <ion-refresher-content refreshing-spinner="circles"></ion-refresher-content>
      </ion-refresher>
      <div class="flex justify-center items-center w-full">
        <ion-spinner name="lines-sharp-small" v-if="loading"></ion-spinner>
        <p v-if="experts.length == 0 && !loading" class="font-poppins">No se ha encontrado ningún experto</p>
      </div>

          <ExpertCard v-for="(expert, index) in experts" :key="index" :expert-data="expert" @reload="getAllExperts" @callOpenModal="openModal"/>
<!--4:50 PM Edited dissmis on click backdrop now is mow set to true -->
          <ion-modal ref="modale" :is-open="isOpenModal" backdrop-dismiss :initial-breakpoint="0.50" :breakpoints="[0, 0.25, 0.5, 0.75, 1]">
            <ion-header mode="ios" class="rounded-header">
              <ion-toolbar class="rounded-header" >
                <ion-title color="primary" class="text-sm font-medium tracking-tight font-poppins">
                  Suspender Experto
                </ion-title>

              </ion-toolbar>

            </ion-header>
      <ion-content class="ion-padding">
        <ion-text color="medium">
          <p class="ml-3 font-medium text-left text-blue-500">
            ¿Está seguro de suspender a <span class="font-bold font-montserrat">{{ expertSelectedData.specialty }}</span> {{expertSelectedData.fullName}}?
          </p>
          <ion-textarea @click="$refs.modale.$el.setCurrentBreakpoint(1)" auto-grow  class="ion-margin-vertical suspension-reason" v-model="suspensionReason" placeholder="Ej: El experto contactó con el usuario sin permiso"></ion-textarea>
        </ion-text>
        <div class="flex justify-around">
          <ion-button @click="suspendUser" button-type="button" class="w-full" mode="ios" color="danger" style="text-transform: none;">Suspender</ion-button>
          <ion-button @click="closeModal" button-type="button" class="w-full" mode="ios" color="light" style="text-transform: none;">Cancelar</ion-button>
        </div>
      </ion-content>
    </ion-modal>
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
  IonButton,
  IonModal, 
  IonTextarea,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/vue';
import { collection, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
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



const allExperts = ref<IExpert[]>([])
const experts = ref<IExpert[]>([])
const db = getFirestore();
const expertsCollection = collection(db, 'experts');
const loading = ref(false);
const isOpenModal = ref(false);
const suspensionReason = ref(''); 
const getAllExperts = () => {
  experts.value = [];
  allExperts.value = [];
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
  allExperts.value.push(expert);
  console.log("Expert data:", expert);
});

  }).catch(err=>{
    console.error('Error al cargar los expertos:', err);
    presentToast('top', 'Error al cargar los expertos: ' + err.message, 'danger');
  }).finally(() => {
    loading.value = false;
  })
}

const searchExpertByName = (query: string) => {
  const q = query.toLowerCase()

  experts.value = allExperts.value.filter(expert => {
    return [
      expert.fullName,
      expert.professionalId,
      expert.email,
      expert.specialty,
      expert.suspensionReason
    ].some(field => field?.toLowerCase().includes(q))
  })
}


onIonViewDidEnter(()=> {
  getAllExperts()
})

const searchQuery = ref('');

const expertSelectedData = ref<IExpert>({})

const openModal = (expertData:IExpert) => {
  expertSelectedData.value = expertData;
  isOpenModal.value = true;
}
const closeModal = () => {
  suspensionReason.value = '';
  expertSelectedData.value = {};
  isOpenModal.value = false;
}

const suspendUser = () => {
  if (!suspensionReason.value) {
    presentToast('top', 'Error: No se proporcionó un motivo de suspensión', 'danger');
    return;
  }
    if (!expertSelectedData.value.docRef) {
        presentToast('top', 'Error: No se encontró el experto', 'danger');
        console.log('ERROR: expertSelectedData.value.docRef is undefined');
        console.log('Current expert:', expertSelectedData.value);
        return;
    }
    
    updateDoc(expertSelectedData.value.docRef!, {
        isSuspended: true,
        suspensionReason: suspensionReason.value
    })
    .then(() => {
        getAllExperts();
        presentToast('top', 'Experto suspendido exitosamente', 'success');
        closeModal();
    })
    .catch((error) => {
        console.error('Error suspending expert:', error);
        presentToast('top', 'Error al suspender al experto', 'danger');
    });
}


 const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      getAllExperts();
      event.target.complete();
    }, 2000);
  };
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
  --background:#f4f3f3 !important;
}

ion-toolbar.searchbar {
  --background: #fbfbfb !important;
  --color: white !important;
  --border-radius: 11px !important;
}

ion-button.create-expert{
  --background: var(--ion-color-primary);
  --color:white;
  --border-radius:11px;
}
ion-searchbar.custom{
  --background: #ffffff ;
  --color: rgb(0, 64, 183) ;
  --placeholder-color: #3e6bbf ;
  --border-radius: 11px !important;
}
ion-modal{
  --border-radius: 19px !important;
}
ion-textarea.suspension-reason{
  --background: #fdfdfd ;
  --color: rgb(0, 64, 183) ;
  --placeholder-color: #3e6bbf ;
  --border-radius: 11px !important;
}
</style>