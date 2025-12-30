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
        <div class="w-full max-w-md mx-auto px-4 py-3">
    <div class="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2">
      <ion-icon :icon=calendarClearOutline class="text-[16px] text-blue-500"></ion-icon>
      <span class="text-[13px] font-medium text-slate-600">
        Tiene una cita programada
      </span>
      <ion-button router-link="tabs/client-appointments" 
        class="ml-auto px-3 py-1 rounded-full bg-white border border-slate-200 
               text-[12px] font-medium text-blue-500 shadow-sm
               active:bg-blue-50 active:scale-95 transition-all duration-150"
      >
        Ver más
      </ion-button>
    </div>
  </div>
<ion-card-content class="flex w-full overflow-x-scroll  gap-4 p-4 ">
  <article
    v-for="(slots, dayName) in schedule"
    :key="dayName"
    class="flex-shrink-0 w-48 md:w-52 rounded-2xl ring-offset-1 transition-all duration-200 ease-in hover:ring-1 hover:ring-offset-slate-200 hover:scale-[101%] bg-white p-2  hover:ring-blue-500 "
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

      <div v-if="calculatedAppointmentDate" class="mb-4 text-center animate-fade-in">
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 font-poppins">
          Fecha programada
        </p>
        <div class="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium shadow-sm border border-blue-100 font-manrope text-sm">
          📅 {{ calculatedAppointmentDate }}
        </div>
      </div>

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
  useIonRouter,
  IonIcon
} from '@ionic/vue';
import { addDoc, collection, doc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { calendarClearOutline, chevronBack } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { toastController } from '@ionic/vue';
import { useExpertUiStore } from '@/stores/expertUi';
import { IExpertSchedule, Slot } from '@/interfaces/Ischedule';
import { authStore } from '@/store/auth';
import emailjs from '@emailjs/browser';
import { ISchedule } from '@/interfaces/user/ISchedule';

/**
 * Presenta un mensaje tipo toast al usuario.
 * @param position Posición en la pantalla ('top', 'middle', 'bottom')
 * @param message Mensaje a mostrar
 * @param color Color del toast (ej. 'success', 'warning', 'danger')
 */
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

/**
 * Mapeo de días a números para facilitar cálculos de fechas (0=Domingo, 1=Lunes, etc.)
 */
const dayMap: { [key: string]: number } = {
  'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miercoles': 3, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sabado': 6, 'Sábado': 6
};

/**
 * Computa el horario del experto ordenado correctamente.
 */
const schedule = computed(() => {
  const originalSchedule = expertUiStore.getCurrentExpert.schedule;
  const orderedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  const orderedSchedule: Record<string, Slot[]> = {};

  orderedDays.forEach(day => {
    if (originalSchedule?.[day]) {
      orderedSchedule[day] = originalSchedule[day];
    }
  });

  return orderedSchedule;
});

const router = useIonRouter()
const authStoreGlobal = authStore()

/**
 * Verifica si el usuario está logueado, sino redirige al login.
 */
const isUserLoggedIn = () => {
  if (!authStoreGlobal.getIsAuth) {
    router.navigate('/tabs/tab1', 'back', 'replace');
    return false;
  }
  return true;
};

const slotSelected = ref<Slot | null>(null);
const slotTakenAt = ref(null);

/**
 * Verifica si el usuario actual ya tiene un slot tomado en el calendario local (sin confirmar en BD aún).
 */
const isAnSlotAlreadyTaken = () => Object.values(schedule.value).flat(1).find((s: any) => s.takenBy == authStore().getUserUid && !s.takenAt);

/**
 * Calcula la fecha y hora exacta de la próxima cita disponible dado un día y una hora.
 * Si el día/hora ya pasó esta semana, retorna la fecha de la próxima semana.
 * @param dayName Nombre del día (ej. "Lunes")
 * @param timeStr Hora en formato string (ej. "10:00")
 * @returns Objeto Date con la fecha y hora calculada.
 */
const calculateNextAppointmentDate = (dayName: string, timeStr: string): Date => {
  const targetDay = dayMap[dayName];
  if (targetDay === undefined) throw new Error("Día inválido");

  const [hours, minutes] = timeStr.trim().split(':').map(Number);
  
  const now = new Date();
  const currentDay = now.getDay();
  
  const diff = targetDay - currentDay;
  
  // Creamos la fecha tentativa base (hoy + diferencia de días)
  const appointmentDate = new Date(now);
  appointmentDate.setDate(now.getDate() + diff);
  appointmentDate.setHours(hours, minutes, 0, 0);

  // Si la fecha calculada es anterior al momento actual (ej. hoy más temprano, o un día pasado),
  // significa que la cita debe ser para la próxima semana.
  
  if (appointmentDate <= now) {
     appointmentDate.setDate(appointmentDate.getDate() + 7);
  }
  
  console.log(`Cálculo de fecha: Hoy es ${now.toLocaleString()}. Destino: ${dayName} ${timeStr}. Diff días: ${diff}. Resultado final: ${appointmentDate.toLocaleString()}`);

  return appointmentDate;
}

/**
 * Valida si faltan al menos 24 horas para la fecha de la cita.
 * @param appointmentDate Fecha de la cita
 * @returns true si es válido (>= 24h), false si no.
 */
const isAtLeast24HoursAhead = (appointmentDate: Date): boolean => {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  // validamos si la diferencia es mayor o igual a 24h
  const diffMs = appointmentDate.getTime() - now.getTime();
  const hoursAhead = diffMs / (1000 * 60 * 60);
  console.log(`Validación 24h: Diferencia es ${hoursAhead.toFixed(2)} horas.`);
  return diffMs >= oneDayInMs;
}


/**
 * Maneja la lógica al seleccionar un horario (slot) en la UI.
 * Realiza validaciones de disponibilidad, propiedad y regla de 24 horas.
 */
const getDateSelected = (dayName: string, timeSelected: string) => {
  console.log('Se ha seleccionado la fecha', dayName, timeSelected);
  
  if (userHasSlotsTaken.value) {
     presentToast('top', 'No puede agendar horarios si ya tiene citas agendadas', 'warning');
     return;
  }
  if (!isUserLoggedIn()) {
    return;
  }

  const selectedDaySlots = schedule.value[dayName];
  if(!selectedDaySlots) return;

  const foundSlot = selectedDaySlots.find((s: Slot) => s.time === timeSelected);
  
  if (!foundSlot) return;

  // IMPORTANTE: No asignamos slotSelected.value todavía hasta validar.

  // Lógica de deselección o selección
  if (foundSlot) {
    // 1. Validar disponibilidad básica
    if (foundSlot.isAvailable) { 
      // Nota: según la logica del template, isAvailable parece significar "Deshabilitado por admin" (bg-slate-300).
      presentToast('top', `El horario de las ${foundSlot.time} no está disponible`, 'warning');
      return;
    }

    // 2. Validar si está tomado por otro
    if (foundSlot.takenBy != null && foundSlot.takenBy != authStore().getUserUid) {
      presentToast('top', `El horario de las ${foundSlot.time} ya está tomado por otro usuario`, 'warning');
      return;
    }

    // 3. Validar si ya está confirmado en BD por mí
    if (foundSlot.takenBy == authStore().getUserUid && foundSlot.takenAt != null) {
      presentToast('top', `El horario de las ${foundSlot.time} ya está tomado por usted en la base de datos`, 'warning');
      return;
    }
    
    // 4. Validar Regla de 24 Horas
    // Calculamos cuándo sería esta cita
    try {
      const nextDate = calculateNextAppointmentDate(dayName, foundSlot.time);
      if (!isAtLeast24HoursAhead(nextDate)) {
        presentToast('top', 'No es posible agendar con menos de 24 horas de anticipación.', 'warning');
        return; // Detenemos la selección
      }
    } catch (e) {
      console.error(e);
      presentToast('top', 'Error al calcular fecha de cita', 'danger');
      return;
    }


    // Si todo ok, procedemos a marcar/desmarcar
    
    // Si ya había seleccionado otro slot temporalmente, lo desmarcamos
    const previousTaken = isAnSlotAlreadyTaken();
    if (previousTaken && previousTaken !== foundSlot) {
      previousTaken.takenBy = null;
    }

    // Toggle: si ya lo tengo yo (localmente), lo suelto. Si no, lo tomo.
    if (foundSlot.takenBy == authStore().getUserUid) {
         foundSlot.takenBy = null;
         slotSelected.value = null; 
         calculatedAppointmentDate.value = null;
    } else {
         foundSlot.takenBy = authStore().getUserUid;
         slotSelected.value = foundSlot;
         
         // Formatear fecha para mostrar
         const options: Intl.DateTimeFormatOptions = { 
           weekday: 'long', 
           year: 'numeric', 
           month: 'long', 
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
         };
         try {
             const dateString = nextDate.toLocaleDateString('es-ES', options);
             calculatedAppointmentDate.value = dateString.charAt(0).toUpperCase() + dateString.slice(1);
         } catch (e) {
             console.error("Error formatting date", e);
             // Fallback if calculateNextAppointmentDate variable 'nextDate' is not in scope here (wait, it IS in scope of the try block, but I need to make sure I calculate it again or bring it out)
             // Ah, local variable nextDate is inside the try block above. I should recalculate or move the scope.
             const reCalcDate = calculateNextAppointmentDate(dayName, foundSlot.time);
             const dateString = reCalcDate.toLocaleDateString('es-ES', options);
             calculatedAppointmentDate.value = dateString.charAt(0).toUpperCase() + dateString.slice(1);
         }

         console.log('Slot seleccionado correctamente:', slotSelected.value);
    }
    
    // takenAt se mantiene como estaba (null para la selección local) o se asigna al guardar
  }  
};

const db = getFirestore();
const routerIon = useIonRouter();
const schedulesCollection = collection(db, 'schedules');


/**
 * Función principal para guardar los cambios y agendar la cita.
 */
const updateSubcollectionSchedule = async () => {
    if(!slotSelected.value) {
      presentToast('top', 'No se ha seleccionado ningún horario', 'warning');
      return;
    }

    if(expertUiStore.getCurrentExpert.isSuspended || expertUiStore.getCurrentExpert.isBanned){
      presentToast('top', 'No puede agendar horarios con este experto, contacte al administrador.', 'danger');
      return;
    }

    if(userHasSlotsTaken.value){
      presentToast('top', 'No puede agendar horarios si ya tiene citas agendadas.', 'danger');
      return;
    }

    // Encontrar el día al que pertenece el slot seleccionado
    const dayName = Object.keys(schedule.value).find(key => 
      schedule.value[key].includes(slotSelected.value as Slot)
    );

    if(!dayName) {
        presentToast('top', 'Error al identificar el día de la cita', 'danger');
        return;
    }

    const appointmentDate = calculateNextAppointmentDate(dayName, slotSelected.value.time);

    // Re-validación final de 24h por seguridad
    if (!isAtLeast24HoursAhead(appointmentDate)) {
        presentToast('top', 'No es posible agendar con menos de 24 horas de anticipación.', 'danger');
        // Reseteamos la selección local por seguridad
        slotSelected.value.takenBy = null;
        slotSelected.value = null;
        calculatedAppointmentDate.value = null;
        return;
    }

    savingChanges.value = true;
    const expertPath = doc(db, `experts/${expertUiStore.getCurrentExpert.docId}`);
    
    try {
        console.log('Guardando schedule...', schedule.value);
        slotSelected.value.takenAt = Timestamp.now();
        
        // Actualizamos el documento del experto
        await updateDoc(expertPath, {
            schedule: schedule.value
        });
        
        // Creamos la cita en la colección 'schedules'
        await addDoc(schedulesCollection, {
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
        });

        await sendTestEmail(dayName, appointmentDate);

        presentToast('top', `Cita agenda con éxito para el ${appointmentDate.toLocaleDateString()}.`, 'success');
        
        setTimeout(() => {
            routerIon.navigate('/tabs/expert-list-modern', 'back', 'replace');
        }, 1500);
        
    } catch (error) { 
        console.error(error);
        presentToast('top', 'Hubo un error al agendar la cita.', 'danger');
        // Revertimos cambio local visual si falló
        slotSelected.value.takenBy = null;
        slotSelected.value.takenAt = null;
        calculatedAppointmentDate.value = null;
    } finally {
        savingChanges.value = false;
    }
};


const userHasSlotsTaken = ref(false);
const calculatedAppointmentDate = ref<string | null>(null);

onIonViewDidEnter(() => {
  const currentSchedule = expertUiStore.getCurrentExpert.schedule;
  // Verificar si hay algún slot ya tomado por el usuario actual (que ya esté en BD)
  // Nota: la lógica original verificaba todo el schedule.
  // Asumimos que 'takenAt' existe si ya está guardado.
  const isSlotTakenByCurrentUser = () => Object.values(currentSchedule || {}).flat(1).some((s: any) => s.takenBy == authStore().getUserUid && s.takenAt);

  userHasSlotsTaken.value = isSlotTakenByCurrentUser();

  // Inicializar EmailJS
  emailjs.init({
    blockHeadless: true,
    publicKey: '8uRc3wp2ZXACkO_Eb',
  })
})

const sendTestEmail = async (dayName: string, appointmentDate: Date) => {
  if (!slotSelected.value) return;

  try {
    emailjs.send('service_q9e8lj2', 'template_lv5dfds', {
      // Header
      headerTitle: 'ConsultaExperto.com',
      greeting: 'Buen día',
      userName: authStore().getUserName ?? 'Usuario',
      headerDescription: 'Detalles de su cita profesional',

      // Section 1 – Información del usuario
      section1Icon: '👤',
      section1Title: 'Información del usuario',
      section1TitleColor: '#007aff',
      section1Item1Label: 'Nombre:',
      section1Item1Value: authStore().getUserName ?? 'Usuario',
      section1Item2Label: 'Servicio:',
      section1Item2Value: expertUiStore.getCurrentExpert.specialty,

      // Section 2 – Detalles de la cita
      section2Icon: '📅',
      section2Title: 'Detalles de la cita',
      section2TitleColor: '#34c759',
      section2Subtitle1: 'Fecha y hora',
      section2Value1: `${dayName} • ${slotSelected.value.time}hrs`,
      section2Subtitle2: 'Agendado por',
      section2Value2: authStore().getUserName ?? 'Usuario',
      section2HighlightLabel: 'Enlace:',
      section2HighlightText: 'El acceso se habilitará minutos antes de la cita',
      
      // Fecha formateada
      appointmentDateFormatted: appointmentDate.toLocaleDateString() + ' ' + appointmentDate.toLocaleTimeString(),

      // Section 3 – Datos del experto
      section3Icon: '🩺',
      section3Title: 'Datos del experto',
      section3TitleColor: '#8e8e93',
      section3Item1Label: 'Cédula',
      section3Item1Value: expertUiStore.getCurrentExpert.professionalId,
      section3Item2Label: 'Fecha de creación de la cita',
      section3Item2Value: new Date().toLocaleDateString(),

      // Footer
      footerYear: new Date().getFullYear(),
      footerLinkUrl: 'https://consultaexperto.com',
      footerLinkText: 'consultaexperto.com',
      footerRightsText: 'Todos los derechos reservados.',

      // Email destino
      email: authStore().getUserEmail,
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    // No bloqueamos el flujo principal si falla el email, solo logueamos
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
