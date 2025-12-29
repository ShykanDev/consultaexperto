<template>
<section class="ios-appointment-section">
  <!-- Vista de tarjeta -->
  <article v-if="view === 'card'" class="ios-card rounded-3xl shadow-sm bg-white p-4 ripple-parent" @click="toggleView">
    <div class="flex flex-row items-center justify-between w-full">
      <!-- Icono de especialidad -->
      <div class="ios-icon-container" :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">
        <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.4" :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }" />
      </div>

      <!-- Contenido principal -->
      <div class="flex flex-col text-left flex-1 font-poppins">
        <span class="ios-title font-medium text-gray-950 text-base">
          {{ props.data.expertSpecialty }} con {{ props.data.expertName }}
        </span>
        <span class="ios-subtitle text-gray-600 font-quicksand text-sm font-medium">
          <v-icon name="fa-calendar-alt" class="inline mr-1" scale="0.8" /> Programada para el: {{ formattedDate }}
        </span>
        <span class="ios-subtitle text-gray-600 font-quicksand text-sm font-medium">
          <v-icon name="fa-clock" class="inline mr-1" scale="0.8" /> Hora: {{ formattedTime }} hrs
        </span>
        <span class="ios-meta text-gray-500 font-quicksand text-xs font-semibold">
          <v-icon name="fa-info-circle" class="inline mr-1" scale="0.8" /> Creada el: {{ props.data.createdAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
        </span>
        <span v-if="props.data.finishedAt && !props.data.isCanceled && props.data.isFinished" class="ios-status text-emerald-600 font-quicksand text-sm font-semibold">
          <v-icon name="fa-check-circle" class="inline mr-1" scale="0.8" /> Finalizada el: {{ props.data.finishedAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
        </span>
        <span v-if="props.data.isCanceled" class="ios-status text-red-600 font-quicksand text-sm font-semibold">
          <v-icon name="fa-times-circle" class="inline mr-1" scale="0.8" /> Cancelada el: {{ props.data.canceledAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
        </span>
      </div>

      <!-- Flecha para expandir -->
      <div class="flex items-center ml-2">
        <v-icon name="fa-chevron-right" class="text-blue-600" scale="0.9" />
      </div>
    </div>
    <ion-ripple-effect type="unbounded" class="custom-ripple"></ion-ripple-effect>
  </article>

  <!-- Vista detallada -->
  <div class="animate-fade-left" v-else>
    <!-- Encabezado -->
    <div class="ios-header p-6 w-full max-w-full mb-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <span @click="toggleView" class="flex items-center gap-2 animate-fade-left">
        <v-icon name="fa-chevron-left" class="text-blue-600" />
        <button class="flex items-center gap-2 font-base text-blue-600 font-spline animate-fade-left animate-delay-75">Volver</button>
      </span>
  
      <div class="flex flex-col items-center gap-2 mt-4">
        <div class="ios-header-icon inline-flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full animate-fade">
          <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
        </div>
        <h3 class="mb-1 text-xl font-semibold text-gray-800 font-poppins text-center">Cita con <span class="font-medium text-blue-600">{{ props.data.expertName }}</span></h3>
        <div class="flex justify-center">
          <span v-if="props.data.isCanceled" class="text-red-600 font-medium">(Cancelada)</span>
          <span v-if="props.data.isFinished" class="text-green-500 font-medium">(Finalizada)</span>
          <span v-if="!props.data.isCanceled && !props.data.isFinished" class="text-blue-600 font-medium">(Programada)</span>
        </div>
        <p class="font-medium text-gray-600 font-poppins text-center">
          Especialidad: <span class="font-medium text-blue-600">{{ props.data.expertSpecialty }}</span>
        </p>
        
      </div>
    </div>

    <!-- Datos de la cita -->
    <span class="ios-section-title p-6 w-full max-w-full mb-2 text-lg font-semibold text-gray-700">Detalles de la cita</span>
    <div class="ios-detail-card p-6 w-full flex flex-col space-y-4 mb-5 max-w-full bg-white rounded-3xl border border-gray-100 shadow-lg">
      <!-- Fecha -->
      <article class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <v-icon name="bi-calendar-event-fill" class="text-xl text-blue-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Cita programada para el día:</p>
          <p class="font-medium text-blue-600">{{ formattedDate }}</p>
        </div>
      </article>

      <!-- Hora -->
      <article class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <v-icon name="fa-clock" class="text-xl text-blue-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Hora:</p>
          <p class="font-medium text-blue-600">{{ formattedTime }} hrs</p>
        </div>
      </article>

      <!-- Usuario -->
      <article class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <v-icon name="fa-user" class="text-xl text-blue-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Agendado por:</p>
          <p class="font-medium text-blue-600">{{ props.data.userName }}</p>
        </div>
      </article>

      <!-- Enlace -->
      <article class="ios-detail-item flex items-center gap-3">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <v-icon name="co-link" class="text-xl text-blue-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Enlace:</p>
          <p v-if="props.data.appointmentLink == 'En proceso...'" class="font-medium text-yellow-600">En proceso...</p>
          <a v-else :href="props.data.appointmentLink" class="font-medium text-blue-600 break-all">{{ props.data.appointmentLink }}</a>
        </div>
      </article>
    </div>

    <!-- Datos del experto -->
    <span class="ios-section-title p-6 w-full max-w-full mb-2 text-lg font-semibold text-gray-700">Información del experto</span>
    <div class="ios-detail-card p-6 w-full flex flex-col space-y-4 max-w-full bg-white rounded-3xl border border-gray-100 shadow-lg">
      <!-- Cédula -->
      <article class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <v-icon name="fa-id-card" class="text-xl text-blue-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Cédula profesional:</p>
          <p class="font-medium text-gray-800">{{ props.data.expertProfessionalId }}</p>
        </div>
      </article>

      <!-- Estado -->
      <article class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl" :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
          <v-icon name="hi-solid-information-circle" class="text-xl" :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Estado:</p>
          <p class="font-medium" :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'">
            {{ props.data.isFinished ? 'Finalizada' : props.data.isCanceled ? 'Cancelada' : 'Reservada' }}
          </p>
        </div>
      </article>

      <!-- Fecha de finalización -->
      <article v-if="props.data.isFinished" class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-green-50">
          <v-icon name="fa-calendar-check" class="text-xl text-green-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Finalizada el:</p>
          <p class="font-medium text-green-600">{{ props.data.finishedAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
        </div>
      </article>

      <!-- Motivo de cancelación -->
      <article v-if="props.data.isCanceled" class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-red-50">
          <v-icon name="md-freecancellation-twotone" class="text-xl text-red-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Motivo:</p>
          <p class="font-medium text-red-600">'{{ props.data.cancelationReason }}'
          </p>
        </div>
      </article>

      <!-- Cancelado por -->
      <article v-if="props.data.isCanceled" class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-red-50">
          <v-icon name="fa-user-times" class="text-xl text-red-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Cancelado por:</p>
          <p class="font-medium text-red-600">{{ props.data.canceledByName }}</p>
        </div>
      </article>

      <!-- Fecha de cancelación -->
      <article v-if="props.data.isCanceled" class="ios-detail-item flex items-center gap-3">
        <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-red-50">
          <v-icon name="bi-calendar-x-fill" class="text-xl text-red-600" />
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-700">Cancelada el:</p>
          <p class="font-medium text-red-600">{{ props.data.canceledAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
        </div>
      </article>
    </div>

     <!-- Fecha de creación -->
    <div class="w-full flex justify-center mb-8">
      <span class="text-center font-poppins p-1 text-xs text-gray-500 bg-white rounded-b-2xl  border-b-2 border-x-2 border-slate-100">
        <v-icon name="fa-info-circle" class="inline mr-1" scale="0.8" /> Cita creada el {{ props.data.createdAt.toDate().toLocaleString('es-ES', { dateStyle:'long', timeStyle:'medium' }) }}
      </span>
    </div>

    <!-- Botones de acción -->
    <div v-if="!props.data.isFinished && !props.data.isCanceled" class="ios-actions w-full flex justify-center mt-4 mb-6 space-x-4">
      <ion-button mode="ios" color="danger" class="ios-button" style="text-transform: none;" @click="presentAlert">Cancelar cita</ion-button>
      <ion-button mode="ios" color="primary" class="ios-button" style="text-transform: none;" @click="finaliceAppointment">Marcar como finalizada</ion-button>
    </div>

   
  </div>
</section>

</template>

<script lang="ts" setup>
import { IExpert } from '@/interfaces/IExpert';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import { alertController, IonRippleEffect } from '@ionic/vue';
import { IonButton } from '@ionic/vue';
import { collection, doc, getDoc, getFirestore, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { computed, onMounted, ref, Slot } from 'vue';
import emailjs from '@emailjs/browser';

const experts = ref([
  {
    specialty: "Importación y Exportación",
    color: { light: "#E6F3FF", strong: "#0066CC" }, // Azul comercial
    icon: "fa-truck-moving",
    description: "Facilitamos el intercambio de bienes y servicios a nivel internacional con normativas seguras.",
  },
  {
    specialty: "Médico",
    color: { light: "#E6F7FF", strong: "#0099CC" }, // Azul médico
    icon: "gi-stethoscope",
    description: "Profesionales de la salud comprometidos en atender tus necesidades médicas de forma personalizada.",
  },
  {
    specialty: "Contador",
    color: { light: "#E6FFE6", strong: "#008000" }, // Verde financiero
    icon: "bi-calculator-fill",
    description: "Expertos en contabilidad para gestionar tus finanzas de forma precisa y confiable.",
  },
  {
    specialty: "Arquitecto",
    color: { light: "#F0E6FF", strong: "#6600CC" }, // Morado arquitectónico
    icon: "md-architecture-sharp",
    description: "Diseño y planificación de espacios con profesionalismo y creatividad.",
  },
  {
    specialty: "Servicios Web",
    color: { light: "#E6F9FF", strong: "#00BFFF" }, // Azul tecnológico
    icon: "md-web",
    description: "Desarrollo de soluciones digitales a medida para potenciar tu presencia online.",
  },
  {
    specialty: "Publicidad",
    color: { light: "#FFF0E6", strong: "#FF6600" }, // Naranja publicitario
    icon: "ri-newspaper-fill",
    description: "Estrategias creativas para difundir y potenciar la imagen de tu marca.",
  },
  {
    specialty: "Traductores",
    color: { light: "#FFF8E6", strong: "#FFD700" }, // Amarillo lingüístico
    icon: "hi-solid-translate",
    description: "Especialistas en comunicación multilingüe para romper barreras idiomáticas.",
  },
  {
    specialty: "Peritaje",
    color: { light: "#F0E6FF", strong: "#800080" }, // Morado técnico
    icon: "gi-sherlock-holmes",
    description: "Evaluaciones técnicas y profesionales con rigor y precisión.",
  },
  {
    specialty: "Ingeniería en Computación",
    color: { light: "#E6FFFA", strong: "#00CED1" }, // Turquesa tecnológico
    icon: "md-computer-twotone",
    description: "Innovación tecnológica y desarrollo de sistemas a la vanguardia.",
  },
  {
    specialty: "Gestoría en Trámites",
    color: { light: "#E6E6FF", strong: "#4B0082" }, // Índigo administrativo
    icon: "ri-newspaper-fill",
    description: "Optimiza tus gestiones administrativas con asesorías especializadas.",
  },
  {
    specialty: "Marketing",
    color: { light: "#FFE6F0", strong: "#FF1493" }, // Rosa marketing
    icon: "ri-marketing-strategy-fill",
    description: "Conecta con tu audiencia a través de estrategias innovadoras y efectivas.",
  },
  {
    specialty: "Abogado",
    color: { light: "#F5E6D3", strong: "#8B4513" }, // Café legal
    icon: "fa-balance-scale",
    description: "Conecta con un abogado especializado para recibir asesoría legal directa y resolver tus asuntos jurídicos.",
  },
  {
    specialty: "Psicólogo/a",
    color: { light: "#E6E6FF", strong: "#6A5ACD" }, // Lila psicológico
    icon: "ri-psychotherapy-fill",
    description: "Asesoría psicológica para resolver tus dudas y resolver tus problemas.",
  },
  {
    specialty: "Maestro",
    color: { light: "#F0FFF0", strong: "#2E8B57" }, // Verde educativo
    icon: "gi-teacher",
    description: "Asesoría educativa para resolver tus dudas y resolver tus problemas.",
  },
  {
    specialty: "Chef",
    color: { light: "#FFE6E6", strong: "#FF4500" }, // Rojo culinario
    icon: "gi-chef-toque",
  }
]);

const emit = defineEmits(['reload']);

const getLightBackgroundColor = (specialty: string): string => {
  if(props.data.isCanceled){
    return "#fff0f0";
  }
  if(props.data.isFinished){
    return "#f0fff0";
  }
  if(!props.data.isFinished && !props.data.isCanceled){
    return "#f0fbff";
  }    
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.light : "#E6E6E6";
};

const getStrongBackgroundColor = (specialty: string): string => {
  if(props.data.isCanceled){
    return "#ff8080";
  }
  if(props.data.isFinished){
    return "#00966A";
  }
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.strong : "#E6E6E6";
};

const getIcon = (specialty: string): string => {
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.icon : "";
};

/**Vue Props */
const props = defineProps({
  data: {
    type: Object as () => ISchedule,
    required: true,
  }
})

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const calculatedAppointmentDate = computed(() => {
  if ((props.data as any).appointmentDate) {
    return new Date((props.data as any).appointmentDate.seconds * 1000);
  }

  if (!props.data?.createdAt) return null;

  const createdAtDate = new Date(props.data.createdAt.seconds * 1000);
  // Reset time to start of day for accurate day calculation
  const currentDayIndex = createdAtDate.getDay();

  // Handle DayName property (supporting both DayName and dayName just in case)
  const targetDayName = props.data.DayName || (props.data as any).dayName || '';
  const targetDayIndex = getDayIndex(targetDayName);

  if (targetDayIndex === -1) return createdAtDate;

  let daysUntil = targetDayIndex - currentDayIndex;

  // If the day is today or in the past, add 7 days to get the next occurrence
  // Unless it's today and the time hasn't passed? 
  // For simplicity and typical booking flows:
  // If I book for "Monday" on a "Tuesday", it's next Monday (daysUntil = 1 - 2 = -1 => +7 = 6 days)
  // If I book for "Monday" on a "Monday", usually it's next week unless specifically today.
  // Assuming strict forward booking:
  if (daysUntil < 0) {
    daysUntil += 7;
  }

  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);

  return futureDate;
});

const formattedDate = computed(() => {
  if (!calculatedAppointmentDate.value) return 'Fecha no disponible';
  return calculatedAppointmentDate.value.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedTime = computed(() => {
  return props.data.expertSchedule.time;
})

const formattedDay = computed(() => {
  return calculatedAppointmentDate.value?.toLocaleDateString('es-MX', { weekday: 'long' }) || props.data.DayName;
})

const view = ref<'card' | 'modal'>('card');

onMounted(() => {
  // Inicializar EmailJS
  emailjs.init({
    blockHeadless: true,
    publicKey: '8uRc3wp2ZXACkO_Eb',
  })
})


const sendEmail = async(cancelTime: Timestamp) => {
  try {
    const dayName = (props.data as any).DayName || (props.data as any).dayName || formattedDay.value || 'Día desconocido';
    
    emailjs.send('service_q9e8lj2', 'template_lv5dfds', {
      // Header
      headerTitle: 'ConsultaExperto.com',
      greeting: 'Se ha cancelado su cita',
      userName: props.data.userName,
      headerDescription: 'Confirmación de cancelación de cita',

      // Section 1 – Usuario
      section1Icon: '👤',
      section1Title: 'Información del usuario',
      section1TitleColor: '#007aff',
      section1Item1Label: 'Nombre:',
      section1Item1Value: props.data.userName,
      section1Item2Label: 'Servicio:',
      section1Item2Value: props.data.expertSpecialty,

      // Section 2 – Detalles de la cita cancelada
      section2Icon: '📅',
      section2Title: 'Cita cancelada',
      section2TitleColor: '#ff3b30',
      section2Subtitle1: 'Cita programada para',
      section2Value1: `• ${calculatedAppointmentDate.value?.toLocaleString('es-MX', {dateStyle: 'full'} )} a las ${formattedTime.value}hrs`,
      section2Subtitle2: 'Cancelada el',
      section2Value2: cancelTime.toDate().toLocaleString('es-MX', {dateStyle: 'full', timeStyle: 'long'}),
      section2HighlightLabel: 'Cancelada por:',
      section2HighlightText: `${authStore().getUserName},  con motivo: ${cancelationReason.value || 'Motivo no proporcionado'}`,

      // Section 3 – Experto
      section3Icon: '🩺',
      section3Title: 'Datos del experto',
      section3TitleColor: '#8e8e93',
      section3Item1Label: 'Nombre',
      section3Item1Value: props.data.expertName,
      section3Item2Label: 'Cédula',
      section3Item2Value: props.data.expertProfessionalId,

      // Footer
      footerYear: new Date().getFullYear(),
      footerLinkUrl: 'https://consultaexperto.com',
      footerLinkText: 'consultaexperto.com',
      footerRightsText: 'Todos los derechos reservados.',

      email: authStore().getUserEmail,
    });

  } catch (error) {
    console.log(error);
  }
}

const toggleView = () => {
  view.value = view.value === 'card' ? 'modal' : 'card';
}

/***Firebase Values****/ 

const db = getFirestore();
const userCollection = collection(db, `users/${props.data.userUid}/schedule`);
const expertCollection = collection(db, `experts/${props.data.expertUid}/schedule`);

/***Alert Values****/ 

interface ISlot {
  isAvailable:boolean;
  takenAt: null|Timestamp;
  takenBy:string|null;
  time:string;
}

interface IUserSchedule {
   Lunes?: ISlot[];
    Martes?: ISlot[];
    Miercoles?: ISlot[];
    Jueves?: ISlot[];
    Viernes?: ISlot[];
    Sabado?: ISlot[];
    Domingo?: ISlot[];
}

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();


const cancelAppointment = async () => {

  try {
   const cancellationTime = Timestamp.now();
   //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if(!snap.exists()){
      console.log('Could not find the expert document');
      return false;
    }

    //Expert Schedule Slot Data
      const expertData = snap.data().schedule as IUserSchedule;      
      console.log(`Expert Data: ${JSON.stringify(expertData)}`);
    //Matching day from props and fetched data (E.g: Lunes)
      console.log(`Formatted Day: ${normalizeText(formattedDay.value)}`);
     
      const matchDay = Object.keys(expertData).find(d => normalizeText(d) == normalizeText(formattedDay.value));
      console.log(`Match Day: ${matchDay}`);
    //Matching expert slot finding it using maching Day 
      const expertScheduleSlot = expertData[matchDay as keyof IUserSchedule]
      console.log(`Expert Schedule Slot: ${expertScheduleSlot}`);
      const slotMatch = expertScheduleSlot?.find(e => e.takenBy == props.data.userUid); //returns the specifyc slot with matching data
      console.log(`Slot Match: ${slotMatch}`);

      //Return if slot can´t be found 
      if(!slotMatch){
        console.log(`Could not find the expert slot for this appointment`);
        return false;
      }

      //Updating the slot values to null (canceling the appointment)
      slotMatch.takenBy = null;
      slotMatch.takenAt = null
      //Ready to batch expert data firebase (BatchA1)

      //Step 2: Update the user historyAppointment to set the current appointment data as canceled

      //Return if document doesnt has a docRef
      if(!props.data.docRef){
        console.log(`Couldn't find docRef for this document `);
        return false;
      }

    //Ready to batch user data (BatchA2)

    //Batching userand expert data

    const batch = writeBatch(db);

    //Batch Update Expert Global Schedule 
    batch.update(expertDocRef, {
      schedule: expertData
    })
    
    console.log(`Document doc Ref: ${props.data.docRef}`);


    //Batching A2
    batch.update(doc(db, `schedules/${props.data.docId}`), {
      isCanceled: true,
      cancelationReason: cancelationReason.value,
      canceledAt: cancellationTime,
      canceledByUid: authStore().getUserUid || '',
      canceledByName: authStore().getUserName || ''
    })
    await batch.commit();
    await sendEmail(cancellationTime);

    console.log('Appointment canceled successfully');
    emit('reload');
    return true;


  } catch (error) {
    console.error('Error in batch function:', error);
    emit('reload');
    return false;
  }
};

const finaliceAppointment = async () => {


  try {
     const batch = writeBatch(db);
    //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if(!snap.exists()){
      console.log('Could not find the expert document');
      return false;
    }

    //Expert Schedule Slot Data
      const expertData = snap.data().schedule as IUserSchedule;      
      console.log(`Expert Data: ${JSON.stringify(expertData)}`);
    //Matching day from props and fetched data (E.g: Lunes)
      console.log(`Formatted Day: ${normalizeText(formattedDay.value)}`);
     
      const matchDay = Object.keys(expertData).find(d => normalizeText(d) == normalizeText(formattedDay.value));
      console.log(`Match Day: ${matchDay}`);
    //Matching expert slot finding it using maching Day 
      const expertScheduleSlot = expertData[matchDay as keyof IUserSchedule]
      console.log(`Expert Schedule Slot: ${expertScheduleSlot}`);
      const slotMatch = expertScheduleSlot?.find(e => e.takenBy == props.data.userUid); //returns the specifyc slot with matching data
      console.log(`Slot Match: ${slotMatch}`);

      //Return if slot can´t be found 
      if(!slotMatch){
        console.log(`Could not find the expert slot for this appointment`);
        return false;
      }

      //Updating the slot values to null (canceling the appointment)
      slotMatch.takenBy = null;
      slotMatch.takenAt = null
      //Ready to batch expert data firebase (BatchA1)

      batch.update(expertDocRef, { schedule: expertData });

      batch.update(doc(db, `schedules/${props.data.docId}`), {
      isFinished: true,
      finishedAt: Timestamp.now(),
      finishedByUid: authStore().getUserUid || '',
      finishedByName: authStore().getUserName || ''
    })
    
    await batch.commit();
    emit('reload');
  } catch (error) {
    console.error('Error finalizando la cita:', error);
    emit('reload');
  }
}

const cancelationReason = ref('');




const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'Cancelar Cita',
    message: 'Escriba el motivo de la cancelación',
    inputs: [
      {
        name: 'reason',
        type: 'text',
        placeholder: 'Motivo',
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Ok',
        handler: async (data) => {
          if (!data.reason?.trim()) return false; // no cerrar
          cancelationReason.value = data.reason.trim();
          await cancelAppointment();
        },
      },
    ],
  });

  await alert.present();
};


</script>

<style scoped>
/* Estilos para iOS */
.ios-appointment-section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.ios-card {
  min-height: 130px;
  transition: all 0.3s ease;
}

.ios-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.ios-title {
  font-size: 16px;
  font-weight: 600;
}

.ios-subtitle {
  font-size: 14px;
  margin-top: 4px;
}

.ios-meta {
  font-size: 12px;
  margin-top: 2px;
}

.ios-status {
  font-size: 13px;
  margin-top: 4px;
}

.ios-header {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.ios-header-icon {
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
}

.ios-section-title {
  font-size: 18px;
  font-weight: 600;
  padding-left: 24px;
  padding-right: 24px;
}

.ios-detail-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: none;
}

.ios-detail-item {
  padding-top: 8px;
  padding-bottom: 8px;
}

.ios-detail-icon {
  flex-shrink: 0;
}

.ios-actions {
  padding-left: 24px;
  padding-right: 24px;
}

.ios-button {
  --border-radius: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 24px;
  --padding-end: 24px;
  font-weight: 500;
}

.ripple-parent {
  position: relative;
  overflow: hidden;
}

.custom-ripple {
  color: rgb(0, 124, 220);
}
</style>