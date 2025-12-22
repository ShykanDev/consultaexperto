<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="text-sm" :default-href="'/tabs/expert-list-modern'" :icon="chevronBack" color="primary"
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
      <h6 class="p-1 w-full font-medium text-center text-blue-600 bg-white rounded-xl shadow-sm font-poppins">
        Horarios del experto 
      </h6>
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
            class="mb-2 py-[9px] font-semibold text-center rounded-lg ring-1 ring-gray-200 cursor-pointer font-poppins"
            :class="{
              '!bg-green-50 !text-green-600': slot.takenBy != null && slot.takenBy == authStore().getUserUid,
              '!bg-yellow-50 !text-yellow-600': slot.takenBy != null && slot.takenBy != authStore().getUserUid,
              'bg-blue-500 ring-1 ring-offset-1 ring-offset-blue-500 ring-blue-500 text-white': !slot.isAvailable && slot.takenBy == null,//Slots enabled by administator 
              'bg-slate-300 line-through rounded-md text-slate-500': slot.isAvailable,//Slots disabled by administrator
            }" @click="getDateSelected(dayName, slot.time)">
            {{ slot.time }} 
            <span v-if="!slot.isAvailable && slot.takenBy == null" class="!text-[10px]">Disponible</span>
            <span class="!text-[10px]" v-if="slot.takenBy != null && slot.takenBy != authStore().getUserUid">
              Ocupado
            </span>
            <p class="!text-[10px]" v-if="slot.takenBy == authStore().getUserUid">
              Agendado por usted
            </p>

          </div>
        </article>
      </ion-card-content>
      <ion-button v-if="!userHasSlotsTaken" class="ion-margin-vertical" :disabled="userHasSlotsTaken" mode="ios" color="primary" expand="block"
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
import { addDoc, collection, doc, getDoc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { chevronBack } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { toastController } from '@ionic/vue';
import { useExpertUiStore } from '@/stores/expertUi';
import { IExpertSchedule } from '@/interfaces/Ischedule';
import { authStore } from '@/store/auth';
import emailjs from '@emailjs/browser';




const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
  const toast = await toastController.create({
    message: message,
    duration: 4500,
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

const router = useIonRouter()

const authStoreGlobal = authStore()
const isUserLoggedIn = () => {
  if (!authStoreGlobal.getIsAuth) {
    router.navigate('/tabs/tab1', 'back', 'replace');
    return false;
  }
  return true;
};

const slotSelected = ref();
const slotTakenAt = ref(null);
const isAnSlotAlreadyTaken = () => Object.values(schedule.value).flat(1).find(s => s.takenBy == authStore().getUserUid && !s.takenAt);





const getDateSelected = (dayName: number, timeSelected: string) => {
   if(userHasSlotsTaken.value){
     presentToast('top', 'No puede agendar horarios si ya tiene citas agendadas', 'warning');
     return;
 }
  if (!isUserLoggedIn()) {
    return;
  }

  slotSelected.value = schedule.value[dayName].find((s: any) => s.time === timeSelected);

  
  //Verify if slot taken is already taken if is taken but takenAt is null means that the slot is not taken in firebase yet so it can be diselected or selected again
  console.log(slotSelected.value);
  if(slotSelected.value){
    if(slotSelected.value.isAvailable){
      presentToast('top', `El horario de las ${slotSelected.value.time} no esta disponible`, 'warning');
      return;
    }
    if(slotSelected.value.takenBy != null && slotSelected.value.takenBy != authStore().getUserUid){ // If slot is taken by another user and different from current user
      presentToast('top', `El horario de las ${slotSelected.value.time} ya esta tomado por otro usuario`, 'warning');
      return;
    }
    if(slotSelected.value.takenBy == authStore().getUserUid && slotSelected.value.takenAt != null){ // If slot is taken by current user but takenAt is not null means that the slot is taken in firebase so it cannot be diselected or selected again
      presentToast('top', `El horario de las ${slotSelected.value.time} ya esta tomado por usted en la base de datos`, 'warning');
      return;
    }
    if(isAnSlotAlreadyTaken()){
      isAnSlotAlreadyTaken().takenBy = null;
    }
    slotSelected.value.takenBy = slotSelected.value.takenBy == null ? authStore().getUserUid : null;
    slotSelected.value.takenAt = slotTakenAt.value;
  }  
};

const db = getFirestore();
const routerIon = useIonRouter();
const userSelfCollection = doc(db, 'users/'+authStore().getUserUid);
const userScheduleCollection = collection(db, 'users/'+authStore().getUserUid+'/schedule');
const expertScheduleCollection = collection(db, 'experts/'+expertUiStore.getCurrentExpert.userUid+'/schedule');

const verifyUserHasFreeConsultations = async () => {
  const userSelfSnapshot = await getDoc(userSelfCollection);
  const userSelfData = userSelfSnapshot.data();
  console.log(`User hasf free consultations: ${userSelfData?.freeConsultations}`);
  if(userSelfData?.freeConsultations){
    return true;
  }
  return false;
}

const calculateAppointmentDate = (dayName: string) => {
  const dayMap: { [key: string]: number } = {
    'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miercoles': 3, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sabado': 6, 'Sábado': 6
  };
  const targetDay = dayMap[dayName];
  const now = new Date();
  const currentDay = now.getDay();
  let diff = targetDay - currentDay;

  // Si el día seleccionado es hoy (diff === 0), se queda en 0.
  // Si ya pasó (diff < 0), se suma 7 para la próxima semana.
  if (diff < 0) {
    diff += 7;
  }
  
  const appointmentDate = new Date(now);
  appointmentDate.setDate(now.getDate() + diff);
  return appointmentDate;
};

const updateSubcollectionSchedule = async () => {
if(expertUiStore.getCurrentExpert.isSuspended || expertUiStore.getCurrentExpert.isBanned){
  presentToast('top', 'No puede agendar horarios con este experto, contacte al administrador si tiene alguna duda', 'danger');
  return;
}
if(!schedule.value){
  presentToast('top', 'No se ha seleccionado ningun horario', 'warning');
  return;
}
if(userHasSlotsTaken.value){
  presentToast('top', 'No puede agendar horarios si ya tiene citas agendadas', 'danger');
  return;
}

  savingChanges.value = true;
  const expertPath = doc(db, `experts/${expertUiStore.getCurrentExpert.docId}`);
  try {
    console.log(schedule.value);
    slotSelected.value.takenAt = Timestamp.now();
    //find the day name of the slot selected
    const dayName = Object.keys(schedule.value).find(key => schedule.value[key].includes(slotSelected.value));
    
    // Calculate validity based on the logic: if today is the day, use today.
    const appointmentDate = calculateAppointmentDate(dayName as string);

    await updateDoc(expertPath, {
      schedule: schedule.value
    });
    await addDoc(userScheduleCollection, {
      userName: authStore().getUserName,
      userUid: authStore().getUserUid,
      expertUid: expertUiStore.getCurrentExpert.userUid,
      expertName: expertUiStore.getCurrentExpert.fullName,
      expertSchedule: slotSelected.value,
      expertSpecialty: expertUiStore.getCurrentExpert.specialty,
      expertProfessionalId: expertUiStore.getCurrentExpert.professionalId,
      appointmentLink: '',
      isFinished: false,
      dayName: dayName,
      appointmentDate: Timestamp.fromDate(appointmentDate),
      createdAt: Timestamp.now(),
    })
    //todo: create a copy of the schedule and update the schedule in the expert collection
    await addDoc(expertScheduleCollection, {
      userName: authStore().getUserName,
      userUid: authStore().getUserUid,
      expertUid: expertUiStore.getCurrentExpert.userUid,
      expertName: expertUiStore.getCurrentExpert.fullName,
      expertSchedule: slotSelected.value,
      expertSpecialty: expertUiStore.getCurrentExpert.specialty,
      expertProfessionalId: expertUiStore.getCurrentExpert.professionalId,
      appointmentLink: '',
      isFinished: false,
      dayName: dayName,
      appointmentDate: Timestamp.fromDate(appointmentDate),
      createdAt: Timestamp.now(),
    })
    await sendTestEmail();

    presentToast('top', 'Se ha agendado su cita con exito, se ha enviado un correo con los detalles de la cita', 'success');
    setTimeout(() => {
      routerIon.navigate('/tabs/tab1', 'back', 'replace');
    }, 1500);
    savingChanges.value = false;
  } catch (error) { 
    console.log(error);
    presentToast('top', 'Hubo un error al agendar la cita', 'danger');
    savingChanges.value = false;
  }
};

//vrify if user has an slot already taken (before firebase update) if so then later use this function to deny the user to select another slot

const userHasSlotsTaken = ref(false);
const toggleValue = ref(false);

onIonViewDidEnter(() => {
  console.clear();
  
  const currentSchedule = expertUiStore.getCurrentExpert.schedule;
  const isSlotTakenByCurrentUser = () => Object.values(currentSchedule).flat(1).some(s => s.takenBy == authStore().getUserUid);

  userHasSlotsTaken.value = isSlotTakenByCurrentUser();

  // Inicializar EmailJS
  emailjs.init({
    blockHeadless: true,
    publicKey: '8uRc3wp2ZXACkO_Eb',
  })
})

const sendTestEmail = async () => {
  // Validar que haya un slot seleccionado
  if (!slotSelected.value) {
    presentToast('top', 'Debes seleccionar un horario primero', 'warning');
    return;
  }

  const dayName = Object.keys(schedule.value).find(key => schedule.value[key].includes(slotSelected.value));
  
  // Validar que se encontró el día
  if (!dayName) {
    presentToast('top', 'No se pudo determinar el día del horario', 'danger');
    return;
  }

  try {
    // Calcular la fecha correcta de la cita
    const appointmentDate = calculateAppointmentDate(dayName);

    emailjs.send('service_q9e8lj2', 'template_lv5dfds', {
    userName: authStore().getUserName ?? 'Usuario',
    expertName: expertUiStore.getCurrentExpert.fullName,
    expertSpecialty: expertUiStore.getCurrentExpert.specialty,
    expertProfessionalId: expertUiStore.getCurrentExpert.professionalId,
    time: slotSelected.value.time, // ✅ Solo enviar el string del tiempo
    dayName: dayName,
    email: authStore().getUserEmail,
    dateCreated: new Date(Timestamp.now().toDate()).toDateString(),
    appointmentDate: appointmentDate.toDateString(), // Fecha calculada de la cita
  })
}
catch (error) {
  console.log(error);
  presentToast('top', 'Hubo un error al enviar el correo', 'danger');
}
}
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
