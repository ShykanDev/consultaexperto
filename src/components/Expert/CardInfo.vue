<template>
  <section class="w-full animate__animated animate__fadeIn animate__faster font-sans text-slate-900">

    <article v-if="view === 'card'" @click="toggleView"
      :class="{ 'animate__animated animate__fadeInUp animate__faster': firstLoad && props.index === 0 || !firstLoad }"
      class="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer overflow-hidden">
      <div class="absolute left-0 top-0 h-full w-1.5"
        :style="{ backgroundColor: getStrongBackgroundColor(props.data.expertSpecialty) }"></div>

      <div class="flex flex-col md:flex-row md:items-center gap-5">
        <div
          class="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">
          <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.5"
            :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }" />
        </div>

        <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Paciente / Usuario</h4>
            <span class="text-base font-semibold text-slate-800">
              {{ props.data.userName }}
            </span>
            <span class="text-sm text-blue-600 font-medium">{{ props.data.expertSpecialty }}</span>
          </div>

          <div class="flex flex-col border-slate-100 lg:border-l lg:pl-6">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Programación</h4>
            <div class="flex items-center gap-2 text-slate-700 text-sm">
              <v-icon name="fa-calendar-alt" scale="0.7" />
              <span>{{ formattedDate }}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-700 text-sm font-medium mt-1">
              <v-icon name="fa-clock" scale="0.7" />
              <span>{{ formattedTime }} hrs</span>
            </div>
          </div>

          <div class="flex flex-col border-slate-100 lg:border-l lg:pl-6 justify-center">
            <div v-if="props.data.isFinished && !props.data.isCanceled"
              class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold w-fit">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              FINALIZADA
            </div>
            <div v-else-if="props.data.isCanceled"
              class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-red-50 text-red-600 text-xs font-bold w-fit">
              <v-icon name="fa-times-circle" scale="0.6" /> CANCELADA
            </div>
            <div v-else
              class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold w-fit">
              <v-icon name="fa-calendar-check" scale="0.6" /> PROGRAMADA
            </div>

            <div v-if="authStore().getIsExpert && props.data.isFinished" class="mt-2 flex items-center gap-1">
              <v-icon v-for="(star, index) in props.data.consultRatingByExpert" :key="index" name="bi-star-fill"
                class="text-yellow-400" scale="0.6" />
            </div>
          </div>
        </div>

        <div class="hidden md:flex items-center justify-center pr-2">
          <div
            class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <v-icon name="fa-chevron-right" scale="0.8" />
          </div>
        </div>
      </div>
    </article>

    <div v-if="view === 'modal'" class="animate__animated animate__fadeIn animate__faster">

      <nav class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <button @click="toggleView"
          class="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
          <v-icon name="fa-chevron-left" scale="0.8" />
          <span>Volver al listado</span>
        </button>

        <div class="flex gap-3">
          <span v-if="props.data.isCanceled"
            class="px-4 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold">CANCELADA</span>
          <span v-if="props.data.isFinished"
            class="px-4 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold">COMPLETADA</span>
        </div>
      </nav>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div class="xl:col-span-8 space-y-6">

          <header
            class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <v-icon name="fa-calendar-check" class="absolute right-[-20px] top-[-20px] opacity-10" scale="10" />
            <div class="relative z-10">
              <p class="text-blue-400 font-bold text-sm tracking-widest uppercase mb-2">{{ props.data.expertSpecialty }}
              </p>
              <h2 class="text-3xl font-bold mb-4">Consulta con {{ props.data.userName }}</h2>

              <div class="flex flex-wrap gap-6 text-slate-300">
                <div class="flex items-center gap-2">
                  <v-icon name="bi-calendar-event-fill" class="text-blue-400" />
                  <span>{{ formattedDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <v-icon name="fa-clock" class="text-blue-400" />
                  <span>{{ formattedTime }} hrs</span>
                </div>
              </div>
            </div>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section class="bg-white border border-slate-100 p-6 rounded-2xl">
              <h3 class="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Información de la Cita</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-slate-50">
                  <span class="text-slate-500">Agendado por:</span>
                  <span class="font-semibold text-slate-800">{{ props.data.userName }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-50">
                  <span class="text-slate-500">ID Profesional:</span>
                  <span class="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">{{
                    props.data.expertProfessionalId }}</span>
                </div>
                <div class="flex flex-col gap-2 pt-2">
                  <span class="text-slate-500">Enlace de la sesión:</span>
                  <div v-if="props.data.appointmentLink == 'En proceso...'" class="text-yellow-600 font-medium italic">
                    En proceso...</div>
                  <button v-else-if="props.data.acceptedByExpert" @click="markLinkAsOpened"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <v-icon name="co-link" /> Comenzar Cita
                  </button>
                </div>
              </div>
            </section>

            <section class="bg-white border border-slate-100 p-6 rounded-2xl">
              <h3 class="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Estado y Calificación</h3>

              <div class="space-y-4">
                <div v-if="authStore().getIsExpert && !props.data.isCanceled && props.data.isFinished"
                  class="bg-slate-50 p-4 rounded-xl">
                  <p class="text-xs text-slate-500 mb-2 uppercase font-bold">Tu calificación del paciente:</p>
                  <div v-if="props.data.ratedByExpert" class="flex gap-1">
                    <v-icon v-for="(star, index) in props.data.consultRatingByExpert" :key="index" name="bi-star-fill"
                      class="text-yellow-500" />
                  </div>
                  <button v-else @click="presentRatingAlert"
                    class="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1">
                    Calificar ahora <v-icon name="bi-star-fill" scale="0.7" />
                  </button>
                </div>

                <div v-if="props.data.isFinished"
                  class="text-sm p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div class="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                    <v-icon name="fa-user-check" /> Finalizada por {{ props.data.finishedByName || 'Sistema' }}
                  </div>
                  <p class="text-emerald-600 text-xs">{{ props.data.finishedAt?.toDate().toLocaleString() }}</p>
                </div>

                <div v-if="props.data.isCanceled" class="text-sm p-4 bg-red-50 rounded-xl border border-red-100">
                  <div class="flex items-center gap-2 text-red-700 font-bold mb-1">
                    <v-icon name="fa-user-times" /> Cancelado por {{ props.data.canceledByName }}
                  </div>
                  <p class="text-red-800 italic mt-1 font-medium text-xs">"{{ props.data.cancelationReason }}"</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside class="xl:col-span-4 space-y-6">

          <div v-if="!props.data.isFinished && !props.data.isCanceled"
            class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 class="text-slate-800 font-bold mb-4">Acciones de Gestión</h3>
            <div class="flex flex-col gap-3">
              <button v-if="!props.data.acceptedByExpert" @click="confirmConsult"
                class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <v-icon name="bi-calendar-check" /> Confirmar Cita
              </button>

              <button v-if="props.data.acceptedByExpert && !props.data.isFinished" @click="finaliceAppointment"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <v-icon name="bi-calendar-check" /> Finalizar Cita
              </button>

              <button @click="presentAlert"
                class="w-full bg-white border-2 border-rose-100 text-rose-500 hover:bg-rose-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <v-icon name="gi-cancel" /> Cancelar Cita
              </button>
            </div>
          </div>

          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-500">
            <h4 class="text-xs font-bold uppercase mb-3 tracking-widest">Registro de Actividad</h4>
            <div class="flex items-start gap-3 text-xs leading-relaxed">
              <v-icon name="fa-info-circle" class="mt-0.5" />
              <p>Creada el {{ props.data.createdAt?.toDate().toLocaleString('es-MX', {
                dateStyle: 'long', timeStyle:
                  'short'
              }) }}</p>
            </div>
            <div v-if="!props.data.acceptedByExpert"
              class="mt-4 p-3 bg-blue-100/50 rounded-lg text-blue-700 text-[11px] font-medium uppercase">
              ⓘ El enlace se generará una vez que aceptes la cita.
            </div>
          </div>
        </aside>

      </div>
    </div>

    <GenericModal v-model:show="showCancelModal" title="Cancelar Cita" confirmText="Confirmar Cancelación"
      @confirm="handleCancelConfirm">
      <div class="p-2">
        <p class="text-sm text-slate-500 mb-3 font-medium">Por favor, indica el motivo de la cancelación:</p>
        <textarea v-model="cancelationReason"
          class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          rows="4" placeholder="Escribe aquí el motivo..."></textarea>
      </div>
    </GenericModal>

    <GenericModal v-model:show="showRatingModal" title="Calificar servicio" confirmText="Enviar Calificación"
      @confirm="handleRatingConfirm">
      <div class="space-y-3">
        <p class="text-sm text-slate-500 mb-2">Selecciona la calificación para el usuario:</p>
        <div class="grid grid-cols-1 gap-2">
          <button v-for="star in [5, 4, 3, 2, 1]" :key="star" @click="selectedStars = star"
            class="flex items-center justify-between p-4 rounded-xl border transition-all"
            :class="selectedStars === star ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'">
            <span class="font-bold">{{ star }} Estrellas</span>
            <div class="flex gap-0.5">
              <v-icon v-for="i in star" :key="i" name="bi-star-fill" :scale="selectedStars === star ? '0.8' : '0.7'" />
            </div>
          </button>
        </div>
      </div>
    </GenericModal>

    <div v-if="loadingFirebase"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="font-bold text-slate-800 tracking-tight">{{ loadingFirebaseMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import { useRouter } from "vue-router";
// import { IExpert } from '@/interfaces/IExpert';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import GenericModal from '@/components/Common/GenericModal.vue';


import { doc, DocumentReference, getDoc, getFirestore, increment, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { computed, onMounted, ref } from 'vue';
import emailjs from '@emailjs/browser';
// import { useExpertUiStore } from '@/stores/expertUi';
import { Browser } from '@capacitor/browser';

// const router = useRouter();
const showCancelModal = ref(false);
const showRatingModal = ref(false);
const selectedStars = ref(5);
const cancelationReason = ref('');
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



//loading UI values
const loadingFirebase = ref(false);
const loadingFirebaseMessage = ref('');

const getLightBackgroundColor = (specialty: string): string => {
  if (props.data.isCanceled) {
    return "#fff0f0";
  }
  if (props.data.isFinished) {
    return "#f0fff0";
  }
  if (!props.data.isFinished && !props.data.isCanceled) {
    return "#f0fbff";
  }
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.light : "#E6E6E6";
};

const getStrongBackgroundColor = (specialty: string): string => {
  if (props.data.isCanceled) {
    return "#ff8080";
  }
  if (props.data.isFinished) {
    return "#00966A";
  }
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.strong : "#E6E6E6";
};

const getIcon = (specialty: string): string => {
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.icon : "";
};

const firstLoad = ref(true);

/**Vue Props */
const props = defineProps({
  data: {
    type: Object as () => ISchedule,
    required: true,
  },
  index: {
    type: Number,
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


const sendEmail = async (cancelTime: Timestamp) => {
  try {
    loadingFirebase.value = true;
    loadingFirebaseMessage.value = 'Enviando correo...';
    // const dayName = (props.data as any).DayName || (props.data as any).dayName || formattedDay.value || 'Día desconocido';

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
      section2Value1: `• ${calculatedAppointmentDate.value?.toLocaleString('es-MX', { dateStyle: 'full' })} a las ${formattedTime.value}hrs`,
      section2Subtitle2: 'Cancelada el',
      section2Value2: cancelTime.toDate().toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'long' }),
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
    loadingFirebase.value = false;
  } catch (error) {
    console.log(error);
    loadingFirebase.value = false;
  }
}

const toggleView = () => {
  if (firstLoad.value) {
    firstLoad.value = false;
    return;
  }
  view.value = view.value === 'card' ? 'modal' : 'card';
}

/***Firebase Values****/

const db = getFirestore();
// unused collections

/***Alert Values****/

interface ISlot {
  isAvailable: boolean;
  takenAt: null | Timestamp;
  takenBy: string | null;
  time: string;
  finalizedAt: null | Timestamp;
  finalizedBy: string | null;
  finalizedByName: string | null;
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
    loadingFirebase.value = true;
    loadingFirebaseMessage.value = 'Cancelando cita...';
    const cancellationTime = Timestamp.now();
    //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if (!snap.exists()) {
      console.log('Could not find the expert document');
      loadingFirebase.value = false;
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
    if (!slotMatch) {
      console.log(`Could not find the expert slot for this appointment`);
      loadingFirebase.value = false;
      return false;
    }

    //Updating the slot values to null (canceling the appointment)
    slotMatch.takenBy = null;
    slotMatch.takenAt = null
    //Ready to batch expert data firebase (BatchA1)

    //Step 2: Update the user historyAppointment to set the current appointment data as canceled

    //Return if document doesnt has a docRef
    if (!props.data.docRef) {
      console.log(`Couldn't find docRef for this document `);
      loadingFirebase.value = false;
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

    // ✅ FIX: Delete the guardian to free up the slot for future bookings
    const guardianId = `${props.data.expertUid}_${matchDay}_${slotMatch.time}`;
    const guardianRef = doc(db, 'bookings', guardianId);
    batch.delete(guardianRef);
    console.log(`Guardian deleted: ${guardianId}`);

    await batch.commit();
    await sendEmail(cancellationTime);
    loadingFirebase.value = false;
    console.log('Appointment canceled successfully');
    return true;


  } catch (error) {
    console.error('Error in batch function:', error);
    loadingFirebase.value = false;
    return false;
  }
};

//Updating user file to add this as finished consultation so user will not be able to book another consultation in the same category (for free) this handles the free consultation logic
/*
const updateCategoryConsultations = async () => {
...
}
*/


const finaliceAppointment = async () => {
  try {
    loadingFirebase.value = true;
    loadingFirebaseMessage.value = 'Finalizando cita...';
    const batch = writeBatch(db);
    //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if (!snap.exists()) {
      console.log('Could not find the expert document');
      loadingFirebase.value = false;
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
    if (!slotMatch) {
      console.log(`Could not find the expert slot for this appointment`);
      loadingFirebase.value = false;
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
      finishedByExpert: true,
      finishedByUid: authStore().getUserUid || 'UID no disponible',
      finishedByName: authStore().getUserName || 'Nombre no disponible'
    })

    const userDocRef = doc(db, `users/${props.data.userUid}`);
    batch.update(userDocRef, {
      [`categoryConsultations.${props.data.expertSpecialty}`]: {
        takenAt: Timestamp.now(),
        hasFreeConsult: false,
      }
    });

    // ✅ FIX: Delete the guardian to free up the slot for future bookings
    const guardianId = `${props.data.expertUid}_${matchDay}_${slotMatch.time}`;
    const guardianRef = doc(db, 'bookings', guardianId);
    batch.delete(guardianRef);
    console.log(`Guardian deleted: ${guardianId}`);

    await batch.commit();
    loadingFirebase.value = false;

    // Call the rating alert
    try {
      presentRatingAlert();
    } catch (e) {
      console.error("Error presenting rating alert", e);
    }

  } catch (error) {
    console.error('Error finalizando la cita:', error);
    loadingFirebase.value = false;
  }
}


const confirmConsult = async () => {
  try {
    loadingFirebase.value = true;
    loadingFirebaseMessage.value = 'Confirmando cita...';
    const docRef = doc(db, `${props.data.docRef.path}`)
    await updateDoc(docRef, {
      acceptedByExpert: true,
      acceptedAt: Timestamp.now(),
      appointmentLink: `https://meet.greenhost.net/${props.data.expertName}${props.data.userName}${props.data.createdAt.toDate().getTime()}`//This could be redirected to my page and then I can redirect to the link //expert should enter first and then client should be able to join
    })
    loadingFirebase.value = false;
  } catch (error) {
    loadingFirebase.value = false;
    console.log(`Error in confirming appointment function: ${error}`);
  }
}

const markLinkAsOpened = async () => {

  //if schedule is finished return
  if (props.data.isFinished) {
    console.log('Schedule is already finished');
    return;
  }
  if (props.data.isCanceled) {
    console.log('Schedule is already canceled');
    return;
  }

  try {
    loadingFirebase.value = true;
    loadingFirebaseMessage.value = 'Preparando para entrar al link...';
    const docRef = doc(db, `${props.data.docRef.path}`)
    await updateDoc(docRef, {
      isOpenedLinkByExpert: true,
      openedLinkAt: Timestamp.now(),
      consultInCourse: true
    })
    loadingFirebase.value = false;
    Browser.open({ url: props.data.appointmentLink });

  } catch (error) {
    loadingFirebase.value = false;
    console.log(`Error in confirming appointment function: ${error}`);
  }
}

const presentAlert = () => {
  showCancelModal.value = true;
};

const handleCancelConfirm = async () => {
  if (!cancelationReason.value.trim()) return;
  showCancelModal.value = false;
  await cancelAppointment();
};

const presentRatingAlert = () => {
  showRatingModal.value = true;
};

const handleRatingConfirm = async () => {
  try {
    await updateRoleStars(selectedStars.value);
    await updateConsultRating(selectedStars.value);
  } catch (error) {
    console.error("Error updating rating:", error);
  }
  showRatingModal.value = false;
};

const updateRoleStars = async (starsGiven: number) => {

  if (starsGiven < 1 || starsGiven > 5) return false;

  if (!authStore().getUserUid || !authStore().getUserName) {
    console.log('No user data available');
    return false;
  }

  console.log(`Is user Expert: ${authStore().getIsExpert}`);
  console.log(`User UID: ${authStore().getUserUid}`);
  console.log(`User Name: ${authStore().getUserName}`);


  //If user is expert, update user rating, else update expert rating 
  const rolePath = authStore().getIsExpert ? 'users' : 'experts';
  // const roleType = authStore().getIsExpert ? 'User' : 'Expert';
  const roleUid = rolePath === 'users' ? props.data.userUid : props.data.expertUid;
  let dynamicDocRef: DocumentReference;
  try {
    dynamicDocRef = doc(db, `${rolePath}/${roleUid}`);
    await updateDoc(dynamicDocRef, {
      [`rating.stars.${starsGiven}`]: increment(1),
      'rating.total': increment(starsGiven),
      'rating.count': increment(1),
    })

    console.log(`${rolePath} stars updated successfully to user with uid: ${roleUid}`);
  } catch (error) {
    console.log(`Error trying to update ${rolePath} stars : ${error}`);

  }
}

const updateConsultRating = async (starsGiven: number) => {

  if (starsGiven < 1 || starsGiven > 5) return false;

  if (!authStore().getUserUid || !authStore().getUserName) {
    console.log('No user data available');
    return false;
  }




  //If user is expert, update user rating, else update expert rating 
  const roleType = authStore().getIsExpert ? 'Expert' : 'User';
  let dynamicDocRef: DocumentReference;
  try {
    dynamicDocRef = doc(db, `${props.data.docRef.path}`);
    await updateDoc(dynamicDocRef, {
      [`ratedBy${roleType}`]: true,
      [`consultRatingBy${roleType}`]: starsGiven,
    })

    console.log(`${roleType} consult rating updated successfully to user with uid: ${authStore().getUserUid}`);
  } catch (error) {
    console.log(`Error trying to update ${roleType} consult rating : ${error}`);

  }
}

// router instance already defined
/*
const viewSchedule = async () => {
...
};
*/

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