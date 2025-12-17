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
            <ion-label>
              <p class="!text-blue-700 !font-poppins">Cédula profesional</p>
              <p class="!font-poppins">{{ expertAdminStore.getCurrentExpert?.professionalId ?? 'No se proporcionó cédula profesional' }}</p>
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
    Horarios del experto {{ expertAdminStore.getCurrentExpert?.fullName?.split(' ')[0] ?? 'Experto' }}
  </h2>
  <div class="flex flex-col gap-0 p-1 bg-white rounded-xl ring-1 ring-offset-1 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out bg-white/70 ion-margin-vertical font-poppins" :class="{'ring-[#0054E9]': toggleValue, 'ring-gray-200': !toggleValue}">

    <ion-toggle class="text-blue-600 ion-margin-vertical"  v-model="showSchedule" mode="ios" enable-on-off-labels color="primary">{{ showSchedule ? 'Ocultar' : 'Mostrar' }} horario</ion-toggle>

    <ion-toggle @click="getConsultations" class="text-blue-600 ion-margin-vertical"  v-model="showConsultations" mode="ios" enable-on-off-labels color="primary">{{ showConsultations ? 'Ocultar' : 'Mostrar' }} consultas</ion-toggle>

    <ion-toggle v-if="showSchedule" class="text-blue-600"  v-model="toggleValue" mode="ios" enable-on-off-labels color="primary">Cambios {{ toggleValue ? 'Activados' : 'Desactivados' }}</ion-toggle>

    <span v-if="showSchedule" class="text-xs text-center text-gray-500">{{ toggleValue ? 'Ahora puede editar el horario' : 'No podrá actualizar el horario hasta activarlos' }}</span>
  </div>

<!-- Schedule Time -->
  <section v-if="showSchedule" >
   <article
  v-for="(slots, dayName) in schedule"
  :key="dayName"
  class="p-1 rounded-md ring-offset-1 transition-all duration-200 ease-in hover:ring-1 hover:ring-offset-slate-200 hover:scale-[101%] hover:ring-blue-500">
  
  <span class="text-center text-blue-500">
    {{ dayName }}
  </span>

  <div
    v-for="(slot, slotIndex) in slots"
    :key="slotIndex"
    class="mb-2 py-[3px] font-semibold text-center rounded-md ring-1 ring-gray-200 cursor-pointer font-poppins"
    :class="{ 'bg-white text-slate-700': slot.isAvailable, 'bg-[#2C7CEE] rounded-md text-white': !slot.isAvailable }"
    @click="getDateSelected(dayName, slot.time)"
  >
    {{ slot.time }}
  </div>
   </article>
  </section>

  <ion-button v-if="showSchedule" class="ion-margin-vertical" mode="ios" color="primary" expand="block" @click="updateSubcollectionSchedule()">{{ 
  !savingChanges ? 'Guardar cambios' : 'Guardando Cambios'
    
    }}
    <ion-spinner v-show="savingChanges" name="lines-sharp-small"></ion-spinner>
  </ion-button>

  <div v-if="loadingAppointments" class="w-full flex justify-center items-center">
    <ion-spinner name="lines-sharp-small"></ion-spinner>
  </div>

  <section v-if="userAppointments && userAppointments.length > 0 && showConsultations">

        <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
              <CardInfo :data="appointment" />
            </div>
  </section>
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
  IonToggle,
  useIonRouter

} from '@ionic/vue';
import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { chevronBack } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { toastController } from '@ionic/vue';
import CardInfo from '@/components/Client/CardInfo.vue';
import { ISchedule } from '@/interfaces/user/ISchedule';
const db = getFirestore();

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


const showSchedule = ref(false);
const toggleShowSchedule = () => showSchedule.value = !showSchedule.value;

const showConsultations = ref(false);
const getConsultations = () => {
  
  if(!showConsultations.value){
    getUserAppointments();
  }

};

const expertAdminStore = useExpertAdminStore();
const savingChanges = ref(false);


//Get expert appointments
const userAppointments = ref<ISchedule[]>([]);
const collectionRef = collection(db, `experts/${expertAdminStore.getCurrentExpert.userUid}/schedule`);
const loadingAppointments = ref(false);

const getUserAppointments = () => {
  console.log('Getting appointments');
  userAppointments.value = [];
  loadingAppointments.value = true;
  getDocs(collectionRef)
    .then((querySnapshot) => {
      if(querySnapshot.empty){
        console.log('No appointments found');
        return;
      }
      querySnapshot.forEach((doc) => {
        userAppointments.value.push(doc.data() as ISchedule);
      });
      console.log(userAppointments.value);
      loadingAppointments.value = false;
    })
    .catch((error) => {
      console.error('Error al obtener las citas:', error);
      loadingAppointments.value = false;
    });
}


onIonViewDidLeave(()=> {
  expertAdminStore.resetCurrentExpert();
})

const schedule = computed(() => {
  const originalSchedule = expertAdminStore.getCurrentExpert?.schedule;
  const orderedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  const orderedSchedule: Record<string, any> = {};

  orderedDays.forEach(day => {
    if (originalSchedule?.[day]) {
      orderedSchedule[day] = originalSchedule[day];
    }
  });

  return orderedSchedule;
});

const getDateSelected = (dayName: number, timeSelected: string) => {
    if(!toggleValue.value){
      presentToast('top', 'Debe habilitar el boton de cambios para editar los horarios', 'warning');
      return;
  }
  // Add a check to ensure schedule[dayName] is not undefined before trying to call find
  if (!schedule.value || !schedule.value[dayName]) {
    console.error(`Schedule or schedule for day ${dayName} is undefined.`);
    // Optionally, handle this case by returning or throwing an error
    return;
  }
  const slot = schedule.value[dayName].find(s => s.time === timeSelected);
  if (slot) slot.isAvailable = !slot.isAvailable;
};


const routerIon = useIonRouter();
const updateSubcollectionSchedule = async () => {

  
  if(!toggleValue.value){
      presentToast('top', 'Debe habilitar el boton de cambios para poder editar los datos', 'danger');
      return;
  }

  savingChanges.value = true;
  const expertPath = doc(db, `experts/${expertAdminStore.getCurrentExpert.docId}`);
  try {
      await updateDoc(expertPath, {
        schedule: schedule.value
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


const toggleValue = ref(false);

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
