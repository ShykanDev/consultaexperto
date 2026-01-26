<template>
  <div class="w-full mb-4 font-poppins">
    <!-- Card View -->
    <div v-if="view === 'card'" @click="toggleView"
      class="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
      <!-- Hover Accent -->
      <div
        class="absolute top-0 left-0 w-1 h-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>

      <div class="flex items-start justify-between gap-4">
        <!-- Icon & Main Info -->
        <div class="flex items-start gap-4 flex-1">
          <!-- Specialist Icon -->
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
            :style="{
              backgroundColor: getLightBackgroundColor(props.data.expertSpecialty),
              color: getStrongBackgroundColor(props.data.expertSpecialty)
            }">
            <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.5" />
          </div>

          <!-- Text Info -->
          <div class="flex flex-col min-w-0">
            <!-- Status Badge Mobile/Compact -->
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full" :class="{
                'bg-emerald-100 text-emerald-700': props.data.isFinished,
                'bg-red-100 text-red-700': props.data.isCanceled,
                'bg-blue-100 text-blue-700': !props.data.isFinished && !props.data.isCanceled
              }">
                {{ props.data.isFinished ? 'Finalizada' : props.data.isCanceled ? 'Cancelada' : 'Programada' }}
              </span>
              <span class="text-xs text-gray-400 font-medium whitespace-nowrap">
                {{ props.data.createdAt?.toDate().toLocaleDateString('es-MX') }}
              </span>
            </div>

            <h3 class="text-base font-bold text-gray-800 leading-tight truncate pr-2">
              {{ props.data.expertName }}
            </h3>
            <p class="text-sm text-gray-500 font-medium truncate mb-2">
              {{ props.data.expertSpecialty }}
            </p>

            <!-- DateTime Info -->
            <div class="flex items-center flex-wrap gap-3 mt-1 text-sm text-gray-600">
              <div class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <v-icon name="fa-calendar-alt" scale="0.8" class="text-blue-500" />
                <span class="font-semibold">{{ formattedDate }}</span>
              </div>
              <div class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <v-icon name="fa-clock" scale="0.8" class="text-blue-500" />
                <span class="font-semibold">{{ formattedTime }} hrs</span>
              </div>
            </div>

            <!-- Rating Display -->
            <div v-if="authStore().getIsClient && props.data.isFinished" class="flex items-center gap-1 mt-2">
              <v-icon class="text-yellow-400" v-for="(star, index) in props.data.consultRatingByUser" :key="index"
                name="bi-star-fill" scale="0.7" />
            </div>

          </div>
        </div>

        <!-- Chevron -->
        <div class="flex flex-col items-center justify-center h-full pl-2 border-l border-gray-50">
          <v-icon name="fa-chevron-right" class="text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </div>

    <!-- Expanded/Modal View -->
    <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">
      <!-- Header Bar -->
      <div
        class="bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center justify-between">
        <button @click="toggleView"
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm">
          <v-icon name="fa-arrow-left" scale="0.9" />
          <span>Volver</span>
        </button>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Detalles de la Cita</span>
      </div>

      <div class="p-6 space-y-8">
        <!-- Status Header -->
        <div class="text-center space-y-4">
          <div class="relative inline-block">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-sm" :class="{
              'bg-emerald-50 text-emerald-600': props.data.isFinished,
              'bg-red-50 text-red-600': props.data.isCanceled,
              'bg-blue-50 text-blue-600': !props.data.isFinished && !props.data.isCanceled
            }">
              <v-icon
                :name="props.data.isFinished ? 'fa-check-circle' : props.data.isCanceled ? 'fa-times-circle' : 'fa-calendar-check'"
                scale="2.5" />
            </div>
            <div v-if="props.data.isFinished && !props.data.ratedByUser"
              class="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm animate-bounce">
              <v-icon name="bi-star-fill" scale="0.8" />
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-800">
              {{ props.data.isFinished ? `Cita Finalizada` : (props.data.isCanceled ? `Cita Cancelada` : `Cita
              Programada`) }}
            </h2>
            <p class="text-gray-500 mt-1">
              Con <span class="font-semibold text-blue-600 cursor-pointer hover:underline" @click="viewSchedule">{{
                props.data.expertName }}</span>
            </p>
            <p class="text-sm text-gray-400 font-medium">{{ props.data.expertSpecialty }}</p>
          </div>

          <!-- Rating Action/Display -->
          <div v-if="!props.data.isCanceled && props.data.isFinished" class="flex justify-center">
            <button v-if="!props.data.ratedByUser" @click="presentRatingAlert"
              class="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-100 transition-colors flex items-center gap-2 border border-yellow-200">
              <span>Calificar Experto</span>
              <v-icon name="bi-star" scale="1" />
            </button>
            <div v-else class="flex flex-col items-center gap-1 bg-gray-50 px-4 py-2 rounded-xl">
              <span class="text-xs text-gray-400">Tu calificación</span>
              <div class="flex gap-1">
                <v-icon class="text-yellow-400" v-for="star in props.data.consultRatingByUser" :key="star"
                  name="bi-star-fill" scale="0.9" />
              </div>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Appointment Info -->
          <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h3 class="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <v-icon name="bi-calendar-event" class="text-blue-500" />
              Datos de la Cita
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <span class="text-gray-500 text-sm">Fecha</span>
                <span class="font-semibold text-gray-800 text-sm capitalize">{{ formattedDate }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <span class="text-gray-500 text-sm">Hora</span>
                <span class="font-semibold text-gray-800 text-sm">{{ formattedTime }} hrs</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                <span class="text-gray-500 text-sm">Creada</span>
                <span class="font-semibold text-gray-800 text-xs">{{
                  props.data.createdAt?.toDate().toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })
                }}</span>
              </div>

              <!-- Link info -->
              <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100"
                v-if="!props.data.isCanceled && !props.data.isFinished">
                <div class="flex items-start gap-3">
                  <div class="bg-blue-100 rounded-lg p-2 text-blue-600">
                    <v-icon name="co-link" scale="1" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-bold text-blue-900 mb-1">Enlace de video</h4>

                    <p v-if="!props.data.appointmentLink && !props.data.acceptedByExpert" class="text-xs text-blue-700">
                      Se generará cuando el experto confirme.
                    </p>

                    <p v-else-if="props.data.appointmentLink && props.data.acceptedByExpert && !props.data.isOpenedLinkByExpert"
                      class="text-xs text-blue-700 flex items-center gap-1">
                      <v-icon name="fa-check-circle" scale="0.8" /> Confirmada. Enlace disponible al iniciar.
                    </p>

                    <div
                      v-if="props.data.appointmentLink && props.data.acceptedByExpert && props.data.isOpenedLinkByExpert">
                      <p class="text-xs text-blue-800 mb-2">¡La sala está abierta!</p>
                      <button @click="joinCall"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 animate-pulse">
                        <v-icon name="bi-camera-video-fill" /> Unirse ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Expert Info / Cancellation Info -->
          <div class="space-y-6">
            <!-- Expert Card -->
            <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 class="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <v-icon name="fa-user-tie" class="text-blue-500" />
                Experto
              </h3>
              <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div
                  class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
                  {{ props.data.expertName ? props.data.expertName.charAt(0) : 'E' }}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-gray-900 font-bold text-sm truncate">{{ props.data.expertName }}</h4>
                  <p class="text-gray-500 text-xs">Cédula: {{ props.data.expertProfessionalId }}</p>
                </div>
                <button @click="viewSchedule" class="text-blue-600 hover:text-blue-700">
                  <v-icon name="fa-external-link-alt" scale="0.8" />
                </button>
              </div>

              <div class="mt-4 text-center">
                <p class="text-xs text-gray-500">
                  Calificación del experto
                </p>
                <div class="flex items-center justify-center gap-1 mt-1">
                  <v-icon class="text-yellow-400" v-for="(star, index) in props.data.expertRating" :key="index"
                    name="bi-star-fill" scale="0.7" />
                </div>
              </div>

              <!-- Promo Hiring Banner -->
              <div v-if="props.data.isFinished && authStore().getIsClient" @click="goToHiring"
                class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <v-icon name="fa-user-tie" scale="5" />
                </div>
                <div class="relative z-10 flex items-center gap-3">
                  <div class="bg-white/20 p-2 rounded-lg">
                    <v-icon name="fa-briefcase" />
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-sm">¿Te gustó el servicio?</p>
                    <p class="text-xs text-blue-100">Contrata una asesoría completa</p>
                  </div>
                  <v-icon name="fa-chevron-right" scale="0.8" class="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <!-- Cancellation Details if canceled -->
            <div v-if="props.data.isCanceled" class="bg-red-50 rounded-2xl p-5 border border-red-100">
              <h3 class="text-sm font-bold text-red-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <v-icon name="fa-info-circle" /> Cancelación
              </h3>
              <div class="space-y-2 text-sm">
                <p class="text-red-700"><span class="font-semibold">Motivo:</span> {{ props.data.cancelationReason }}
                </p>
                <p class="text-red-600 text-xs"><span class="font-semibold">Cancelado por:</span> {{
                  props.data.canceledByName }}</p>
                <p class="text-red-600 text-xs"><span class="font-semibold">Fecha:</span> {{
                  props.data.canceledAt?.toDate().toLocaleString('es-MX') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div v-if="!props.data.isFinished && !props.data.isCanceled"
          class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
          <!-- Expert Action: Finalize -->
          <button v-if="props.data.acceptedByExpert && authStore().getIsExpert" @click="finaliceAppointment"
            class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loadingFirebase">
            <v-icon name="bi-calendar-check" />
            {{ loadingFirebase ? loadingFirebaseMessage : 'Marcar como Finalizada' }}
          </button>

          <!-- User/Expert Action: Cancel -->
          <button v-if="!props.data.acceptedByExpert || (props.data.acceptedByExpert && !loadingFirebase)"
            @click="presentAlert"
            class="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <v-icon name="bi-calendar-x-fill" />
            Cancelar Cita
          </button>
          <button
            class="flex-1 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            @click="router.push('/help')">
            <v-icon name="md-supportagent-outlined" />
            Reportar Problema
          </button>
        </div>

      </div>
    </div>

    <!-- Modals (kept same logic, updated UI container if needed, but they are generic modals so just the content) -->
    <GenericModal v-model:show="showCancelModal" title="Cancelar Cita" confirmText="Confirmar Cancelación"
      @confirm="handleCancelConfirm">
      <div class="space-y-4">
        <p class="text-sm text-gray-500">Por favor, indique el motivo de la cancelación:</p>
        <textarea v-model="cancelationReason"
          class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
          rows="3" placeholder="Escribe el motivo aquí..."></textarea>
      </div>
    </GenericModal>

    <GenericModal v-model:show="showRatingModal" title="Calificar servicio" confirmText="Enviar Calificación"
      @confirm="handleRatingConfirm">
      <div class="space-y-6 text-center">
        <p class="text-sm text-gray-500">
          ¿Cómo calificarías tu experiencia con <span class="font-semibold text-gray-800">{{ authStore().getIsExpert ?
            props.data.userName : props.data.expertName }}</span>?
        </p>
        <div class="flex flex-col gap-3">
          <button v-for="star in [5, 4, 3, 2, 1]" :key="star" @click="selectedStars = star"
            class="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer group"
            :class="selectedStars === star ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-blue-200 bg-white'">
            <span class="font-bold text-sm" :class="selectedStars === star ? 'text-blue-600' : 'text-gray-600'">{{ star
            }} Estrellas</span>
            <div class="flex gap-1 text-lg group-hover:scale-110 transition-transform">
              <v-icon v-for="i in star" :key="i" name="bi-star-fill" class="text-yellow-400" />
            </div>
          </button>
        </div>
      </div>
    </GenericModal>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import GenericModal from '@/components/Common/GenericModal.vue';


import { doc, DocumentReference, getDoc, getFirestore, increment, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { computed, onMounted, ref } from 'vue';
import emailjs from '@emailjs/browser';
import { useExpertUiStore } from '@/stores/expertUi';
import { useHiringStore } from '@/store/hiring';
import { Browser } from '@capacitor/browser';

const router = useRouter();
const showCancelModal = ref(false);
const showRatingModal = ref(false);
const selectedStars = ref(5);


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

  } catch (error) {
    console.log(error);
  }
}

const toggleView = () => {
  view.value = view.value === 'card' ? 'modal' : 'card';
}

const joinCall = () => {
  if (props.data.isCanceled || props.data.isFinished) {
    console.log('La cita ya fue cancelada o finalizada');
    return;
  }
  if (!props.data.isOpenedLinkByExpert) {
    console.log('El experto no ha abierto la cita');
    return;
  }
  try {
    Browser.open({ url: props.data.appointmentLink });
  } catch (error) {
    console.log(error);
  }
}

/***Firebase Values****/

const db = getFirestore();
// const userCollection = collection(db, `users/${props.data.userUid}/schedule`);
// const expertCollection = collection(db, `experts/${props.data.expertUid}/schedule`);

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
    const cancellationTime = Timestamp.now();
    //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if (!snap.exists()) {
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
    if (!slotMatch) {
      console.log(`Could not find the expert slot for this appointment`);
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

    console.log('Appointment canceled successfully');
    return true;


  } catch (error) {
    console.error('Error in batch function:', error);
    return false;
  }
};

const loadingFirebase = ref(false);
const loadingFirebaseMessage = ref('');

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
      finishedByUid: authStore().getUserUid || 'UID no disponible',
      finishedByName: authStore().getUserName || 'Nombre no disponible'
    })

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
  const roleType = authStore().getIsExpert ? 'User' : 'Expert';
  const roleUid = rolePath === 'users' ? props.data.userUid : props.data.expertUid;
  let dynamicDocRef: DocumentReference;
  try {
    dynamicDocRef = doc(db, `${rolePath}/${roleUid}`);
    await updateDoc(dynamicDocRef, {
      [`rating.stars.${starsGiven}`]: increment(1),
      'rating.total': increment(starsGiven),
      'rating.count': increment(1),
      [`ratedBy${roleType}`]: true,
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

const cancelationReason = ref('');

const presentAlert = () => {
  showCancelModal.value = true;
};

const handleCancelConfirm = async () => {
  if (!cancelationReason.value.trim()) return;
  showCancelModal.value = false;
  await cancelAppointment();
};



// router instance is already defined as 'router' above.
const viewSchedule = async () => {
  const isBlocked = verifyBlockedExpert(props.data.expertUid);
  if (isBlocked) return;

  try {
    if (!props.data.expertUid) {
      console.error('No expert UID provided');
      return;
    }
    useExpertUiStore().setExpertUid(props.data.expertUid);
    router.push('/expert-info-fixed');
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

const hiringStore = useHiringStore();
const goToHiring = () => {
  if (!props.data.expertName || !props.data.expertSpecialty || !props.data.expertUid) return;
  hiringStore.setExpertHiringData(props.data.expertName, props.data.expertSpecialty, props.data.expertUid);
  router.push('/hiring');
};

const verifyBlockedExpert = (expertUid?: string): boolean => {
  if (!expertUid) return false;
  const expertsBlockedList = authStore().getUserData?.expertsBlocked;
  if (!expertsBlockedList) return false;

  if (expertsBlockedList[expertUid]) {
    console.log(`Expert ${expertUid} is blocked`);
    return true;
  }
  console.log(`Expert ${expertUid} is not blocked`);
  return false;




};

const isBlockedExpert = ref(false);
if (view.value === 'modal') {
  isBlockedExpert.value = verifyBlockedExpert(props.data.expertUid);
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>