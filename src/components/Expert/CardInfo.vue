<template>
  <section class="ios-appointment-section animate__animated animate__bounceInLeft animate__faster">
    <!-- Vista de tarjeta -->
    <article v-if="view === 'card'"
      :class="{ 'animate__animated animate__bounceInLeft animate__faster': firstLoad && props.index === 0 || !firstLoad }"
      class="ios-card rounded-3xl shadow-sm  bg-white p-4 ripple-parent " @click="toggleView">
      <div class="flex flex-row items-center justify-between w-full">
        <!-- Icono de especialidad -->
        <div class="ios-icon-container"
          :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">
          <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.4"
            :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }" />
        </div>

        <!-- Contenido principal -->
        <div class="flex relative flex-col text-left flex-1 font-poppins ">
          <!--Stars-->
          <article v-if="authStore().getIsExpert && props.data.isFinished"
            class="absolute bottom-0 right-0 flex items-center gap-1 bg-slate-50 p-1 rounded-full">
            <p class="text-xs font-poppins text-slate-400">Calificación:</p>
            <v-icon v-for="(star, index) in props.data.consultRatingByExpert" :key="index" name="bi-star-fill"
              class="text-yellow-500" scale=".6" />
          </article>

          <span class="ios-title font-medium text-blue-900 text-base">
            Consulta con 
            <span
              class="font-medium text-blue-600">{{ props.data.userName }}</span>
          </span>
          <span class="ios-subtitle text-gray-600 font-quicksand text-sm font-medium">
            <v-icon name="fa-calendar-alt" class="inline mr-1" scale="0.8" /> Programada para el: {{ formattedDate }}
          </span>
          <span class="ios-subtitle text-gray-600 font-quicksand text-sm font-medium">
            <v-icon name="fa-clock" class="inline mr-1" scale="0.8" /> Hora: {{ formattedTime }} hrs
          </span>
          <span class="ios-meta text-gray-500 font-quicksand text-xs font-semibold">
            <v-icon name="fa-info-circle" class="inline mr-1" scale="0.8" /> Creada el: {{
              props.data.createdAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
          </span>
          <span v-if="props.data.finishedAt && !props.data.isCanceled && props.data.isFinished"
            class="ios-status text-emerald-600 font-quicksand text-sm font-semibold">
            <v-icon name="fa-check-circle" class="inline mr-1" scale="0.8" /> Finalizada el: {{
              props.data.finishedAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
          </span>
          <span v-if="props.data.isCanceled" class="ios-status text-red-600 font-quicksand text-sm font-semibold">
            <v-icon name="fa-times-circle" class="inline mr-1" scale="0.8" /> Cancelada el: {{
              props.data.canceledAt?.toDate().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) }}
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
    <div class="animate__animated animate__bounceInRight animate-duration-1000 animate__faster" v-else>
      <!-- Encabezado -->
      <div class="ios-header p-6 w-full max-w-full mb-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <span @click="toggleView" class="flex items-center gap-2 animate-fade-left">
          <v-icon name="fa-chevron-left" class="text-blue-600" />
          <button
            class="flex items-center gap-2 font-base text-blue-600 font-spline animate-fade-left animate-delay-75">Volver</button>
        </span>

        <div class="flex flex-col items-center gap-2 mt-4">
          <div
            class="ios-header-icon inline-flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full animate-fade">
            <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
          </div>

          <div v-if="!props.data.ratedByExpert && !props.data.isCanceled && props.data.isFinished" class="flex items-center gap-2 font-poppins text-xs bg-slate-100 p-2 rounded-full">
            <p>No ha calificado esta consulta</p>
            <ion-button size="small" mode="ios" @click="presentRatingAlert">Calificar <v-icon name="bi-star-fill" class="inline ml-1 text-white" scale="0.8" /></ion-button>
          </div>
          <div v-else-if="props.data.ratedByExpert && !props.data.isCanceled && props.data.isFinished" class="flex items-center gap-2 font-poppins text-xs bg-slate-100 p-2 rounded-full">
            <p>Usted calificó esta consulta con:</p>
            <v-icon v-for="(star, index) in props.data.consultRatingByExpert" :key="index" name="bi-star-fill" class="text-yellow-500" scale="0.8" />
          </div>

          <h3 class="mb-1 text-xl font-semibold text-gray-800 font-poppins text-center">Cita con <span
              class="font-medium text-blue-600">{{ props.data.userName }}</span></h3>
          <div class="flex justify-center">
            <span v-if="props.data.isCanceled" class="text-red-600 font-medium">(Cancelada)</span>
            <span v-if="props.data.isFinished" class="text-green-500 font-medium">(Finalizada)</span>
            <span v-if="!props.data.isCanceled && !props.data.isFinished"
              class="text-blue-600 font-medium">(Programada)</span>
          </div>
          <p class="font-medium text-gray-600 font-poppins text-center">
            Especialidad: <span class="font-medium text-blue-600">{{ props.data.expertSpecialty }}</span>
          </p>
          <p class="font-medium text-gray-600 font-poppins text-center" v-if="authStore().getIsClient">
            <v-icon v-for="(star, index) in props.data.userRating" :key="index" name="bi-star-fill"
              class="text-yellow-500" scale=".6" />
          </p>

          <p class="font-medium text-gray-600 font-poppins text-center" v-if="authStore().getIsExpert">
            <v-icon v-for="(star, index) in props.data.expertRating" :key="index" name="bi-star-fill"
              class="text-yellow-500" scale=".6" />
          </p>

        </div>
      </div>

      <!-- Datos de la cita -->
      <span class="ios-section-title p-6 w-full max-w-full mb-2 text-lg font-semibold text-gray-700">Detalles de la
        cita</span>
      <div
        class="ios-detail-card p-6 w-full flex flex-col space-y-4 mb-5 max-w-full bg-white rounded-3xl border border-gray-100 shadow-lg">
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
            <p v-if="props.data.appointmentLink == 'En proceso...'" class="font-medium text-yellow-600">En proceso...
            </p>
            <ion-button mode="ios" color="primary" v-else-if="props.data.acceptedByExpert" @click="markLinkAsOpened" class="font-medium text-blue-600 break-all cursor-pointer">Comenzar Cita</ion-button>
          </div>
        </article>
      </div>

      <!-- Datos del experto -->
      <span class="ios-section-title p-6 w-full max-w-full mb-2 text-lg font-semibold text-gray-700">Información del
        experto</span>
      <div
        class="ios-detail-card p-6 w-full flex flex-col space-y-4 max-w-full bg-white rounded-3xl border border-gray-100 shadow-lg">
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
          <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl"
            :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
            <v-icon name="hi-solid-information-circle" class="text-xl"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-700">Estado:</p>
            <p class="font-normal"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-blue-800'">
              {{ props.data.isFinished ? 'Finalizada' : props.data.isCanceled ? 'Cancelada' : '' }}
            </p>
            <p v-if="!props.data.isFinished && !props.data.isCanceled && !props.data.acceptedByExpert" class="text-xs text-blue-600">ⓘ El enlace se generará cuando usted acepte la cita.</p>
            <p v-else-if="!props.data.isFinished && !props.data.isCanceled && props.data.acceptedByExpert" class="text-xs text-blue-600">Espere el día de la cita para acceder al enlace.</p>
          </div>
        </article>

        <!-- Fecha de finalización -->
        <article v-if="props.data.isFinished"
          class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
          <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-green-50">
            <v-icon name="fa-calendar-check" class="text-xl text-green-600" />
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-700">Finalizada el:</p>
            <p class="font-medium text-green-600">{{ props.data.finishedAt?.toDate().toLocaleString('es-MX', {
              dateStyle: 'long', timeStyle: 'short' }) }}</p>
          </div>
        </article>

        <!-- Finalizada por -->
        <article v-if="props.data.isFinished"
          class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
          <div class="ios-detail-icon w-12 h-12 flex items-center justify-center rounded-xl bg-green-50">
            <v-icon name="fa-user-check" class="text-xl text-green-600" />
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-700">Finalizada por:</p>
            <p class="font-medium text-green-600">{{ props.data.finishedByName || 'Desconocido' }}</p>
          </div>
        </article>

        <!-- Motivo de cancelación -->
        <article v-if="props.data.isCanceled"
          class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
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
        <article v-if="props.data.isCanceled"
          class="ios-detail-item flex items-center gap-3 pb-3 border-b border-b-gray-100">
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
            <p class="font-medium text-red-600">{{ props.data.canceledAt?.toDate().toLocaleString('es-MX', {
              dateStyle:
                'long', timeStyle: 'short' }) }}</p>
          </div>
        </article>
      </div>

      <!-- Fecha de creación -->
      <div class="w-full flex justify-center mb-8">
        <span
          class="text-center font-poppins p-1 text-xs text-gray-500 bg-white rounded-b-2xl  border-b-2 border-x-2 border-slate-100">
          <v-icon name="fa-info-circle" class="inline mr-1" scale="0.8" /> Cita creada el {{
            props.data.createdAt.toDate().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'medium' }) }}
        </span>
      </div>

      <!-- Botones de acción -->
      <div v-if="!props.data.isFinished && !props.data.isCanceled"
        class="ios-actions w-full flex justify-center mt-4 mb-6 space-x-4">
        <ion-button v-if="!props.data.isFinished" mode="ios" color="danger" class="ios-button" style="text-transform: none;"
          @click="presentAlert">
          <div class="!flex !items-center gap-2 justify-between">
            <span>Cancelar cita</span>
            <v-icon name="gi-cancel" class="mr-1" scale="1" />
          </div>
          </ion-button>
        <ion-button v-if="props.data.acceptedByExpert && !props.data.isFinished" mode="ios" color="primary" class="ios-button flex items-center gap-2" style="text-transform: none;"
          @click="finaliceAppointment">
          <div class="!flex !items-center gap-2 justify-between">
            <span>Marcar como finalizada</span>
            <v-icon name="bi-calendar-check" class="inline mr-1" scale="1" />
          </div>
          </ion-button>
           <ion-button v-if="!props.data.acceptedByExpert" mode="ios" color="primary" class="ios-button flex items-center gap-2" style="text-transform: none;"
          @click="confirmConsult">
          <div class="!flex !items-center gap-2 justify-between">
            <span>Confirmar cita</span>
            <v-icon name="bi-calendar-check" class="inline mr-1" scale="1" />
          </div>
          </ion-button>
      </div>
      <ion-loading :is-open="loadingFirebase" :duration="3000" :message="loadingFirebaseMessage"> </ion-loading>

    </div>
  </section>

</template>

<script lang="ts" setup>
import { IExpert } from '@/interfaces/IExpert';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import { alertController, IonRippleEffect, useIonRouter } from '@ionic/vue';
import { IonButton, IonLoading } from '@ionic/vue';
import { collection, count, doc, DocumentReference, getDoc, getFirestore, increment, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { computed, onMounted, ref, Slot } from 'vue';
import emailjs from '@emailjs/browser';
import { useExpertUiStore } from '@/stores/expertUi';

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
const userCollection = collection(db, `users/${props.data.userUid}/schedule`);
const expertCollection = collection(db, `experts/${props.data.expertUid}/schedule`);

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
      finishedByExpert:true,
      finishedByUid: authStore().getUserUid || 'UID no disponible',
      finishedByName: authStore().getUserName || 'Nombre no disponible'
    })


    await batch.commit();
    loadingFirebase.value = false;

    // Call the rating alert
    try {
      await presentRatingAlert();
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
    acceptedByExpert:true,
    acceptedAt:Timestamp.now(),
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
    isOpenedLinkByExpert:true,
    openedLinkAt:Timestamp.now(),
    consultInCourse:true
  })
    loadingFirebase.value = false;
    window.open(props.data.appointmentLink, '_blank', 'noopener,noreferrer');

 } catch (error) {
  loadingFirebase.value = false;
  console.log(`Error in confirming appointment function: ${error}`);
 }
}


const presentRatingAlert = async () => {
  const isExpert = authStore().getUserUid === props.data.expertUid;
  const targetName = isExpert ? props.data.userName : props.data.expertName;
  const raterRole = isExpert ? 'Experto' : 'Usuario';

  const alert = await alertController.create({
    header: 'Calificar servicio',
    subHeader: `Califique su experiencia con ${targetName}`,
    message: 'Seleccione una calificación:',
    inputs: [
      { label: '⭐️⭐️⭐️⭐️⭐️ Excelente', type: 'radio', value: 5, checked: true },
      { label: '⭐️⭐️⭐️⭐️ Muy bueno', type: 'radio', value: 4 },
      { label: '⭐️⭐️⭐️ Bueno', type: 'radio', value: 3 },
      { label: '⭐️⭐️ Regular', type: 'radio', value: 2 },
      { label: '⭐️ Mal', type: 'radio', value: 1 },
    ],
    buttons: [
      { text: 'Omitir', role: 'cancel' },
      {
        text: 'Enviar',
        handler: async (stars) => {
          console.log(`Estrellas dejadas por ${raterRole}:`, stars);
          try {
            await updateRoleStars(stars);
            await updateConsultRating(stars);
          } catch (error) {
            console.log(`Error while trying to update ${raterRole} document with rating values: ${error}`);

          }
        }
      }
    ],
  });

  await alert.present();
};

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

const updateRoleStars = async (starsGiven: number ) => {
  
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
  let dynamicDocRef:DocumentReference;
  try {
    dynamicDocRef = doc(db,`${rolePath}/${roleUid}`);
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

const updateConsultRating = async (starsGiven: number ) => {
  
  if (starsGiven < 1 || starsGiven > 5) return false;

  if (!authStore().getUserUid || !authStore().getUserName) {
    console.log('No user data available');
    return false;
  }




  //If user is expert, update user rating, else update expert rating 
  const roleType = authStore().getIsExpert ? 'Expert' : 'User';
  let dynamicDocRef:DocumentReference;
  try {
    dynamicDocRef = doc(db,`${props.data.docRef.path}`);
    await updateDoc(dynamicDocRef, {
    [`ratedBy${roleType}`]: true,
    [`consultRatingBy${roleType}`]: starsGiven,
    })

    console.log(`${roleType} consult rating updated successfully to user with uid: ${authStore().getUserUid}`);
  } catch (error) {
    console.log(`Error trying to update ${roleType} consult rating : ${error}`);

  }
}

const ionRouter = useIonRouter();
const viewSchedule = async () => {
  try {
    if (!props.data.expertUid) {
      console.error('No expert UID provided');
      return;
    }
    useExpertUiStore().setExpertUid(props.data.expertUid);
    ionRouter.navigate('/expert-info-fixed', 'back', 'push');
  } catch (error) {
    console.error('Navigation error:', error);
  }
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