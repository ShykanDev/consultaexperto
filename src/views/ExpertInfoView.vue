<template>
  <div class="web-page min-h-screen bg-gray-50">
    <main class="web-content overflow-y-auto">

      <header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
        <nav class="web-toolbar h-16 flex items-center px-4 justify-between">
          <div class="flex items-center gap-4 cursor-pointer" @click="router.back()">
            <button
              class="flex items-center py-1 font-semibold text-sky-600 font-quicksand hover:bg-sky-50 rounded-lg px-2 transition-colors">
              <v-icon class="animate-fade-left" name="md-arrowbackiosnew-round" />
              <span class="text-base animate-fade-left animate-delay-100 ml-1">atras</span>
            </button>
          </div>

          <h1 class="web-title text-lg font-bold text-gray-900 text-blue-500 font-quicksand text-center">
            Agendar Cita
          </h1>

          <div class="order-last flex animate animate-fade animate-delay-[3000ms]">
            <span class="text-xs" v-html="currentName" :key="currentName"></span>
          </div>
        </nav>
      </header>

      <div class="flex fixed right-0 bottom-0 left-0 top-14 z-50 justify-center items-center bg-black/45"
        v-if="isLoading">
        <LoaderBlue />
      </div>

      <!-- Section about expert -->
      <InfoUserLoader v-if="isLoadingExpertInfo" />
      <section class="relative px-4 pt-14 pb-20 text-white bg-gradient-to-r from-blue-600 to-sky-700">
        <div class="mx-auto max-w-6xl flex flex-col items-center md:flex-row md:items-end">

          <div class="relative -mt-16 md:mr-8">
            <img class="object-cover w-32 h-32 rounded-full border-4 shadow-xl md:w-40 md:h-40 border-white/30 bg-white"
              :src="data.imgUrl" alt="Foto de perfil">
            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
              v-if="data.isBanned || data.isSuspended">
              <span
                class="flex items-center px-4 py-1 text-sm font-bold text-white bg-red-500 rounded-full whitespace-nowrap">
                <v-icon class="mr-1" name="ri-shield-user-fill" />
                {{ data.isBanned ? 'BANEADO' : 'SUSPENDIDO' }}
              </span>
            </div>
          </div>

          <div class="mt-4 text-center md:mt-0 md:text-left text-3xl font-bold animate-fade-up animate-delay-100">
            <div>{{ data.name }}</div>
            <p class="mb-2 text-xl text-blue-200 animate-fade-up animate-delay-300">{{ data.specialty }}</p>

            <div class="flex justify-center items-center space-x-4 md:justify-start animate-fade-up animate-delay-500">
              <v-icon class="mr-1 text-yellow-400" name="io-star" />
              <span class="font-bold">{{ data.rating }}</span>
              <span class="ml-1 text-blue-200">({{ data.totalRatings }})</span>
            </div>
            <div class="flex items-center justify-center md:justify-start text-sm mt-1">
              <v-icon class="mr-1 text-blue-200" name="bi-briefcase" />
              <span>{{ data.experienceYears }} años de experiencia</span>
            </div>
          </div>

        </div>
      </section>

      <div class="flex justify-center mt-20 w-full" v-if="isLoadingExpertInfo">
        <ContentLoader />
      </div>

      <!-- Main Content -->
      <div class="px-2 mx-auto -mt-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 bg-transparent">

        <!-- Basic Info -->
        <div class="space-y-3 md:space-y-6">
          <div class="flex flex-col p-3 bg-white rounded-xl shadow-sm md:p-6">
            <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
              <v-icon class="mr-2 text-indigo-600" name="md-info" />
              Información básica
            </h2>
            <div class="space-y-2 md:space-y-4">
              <div>
                <p class="text-xs text-gray-500 md:text-sm">Cédula profesional</p>
                <p class="text-sm md:font-medium">{{ data.profesionalId }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 md:text-sm">Miembro desde</p>
                <p class="text-sm md:font-medium">{{ data.formattedDate }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="md:col-span-2 space-y-3 md:space-y-6">
          <div class="p-3 bg-white rounded-xl shadow-sm md:p-6">
            <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
              <v-icon class="mr-2 text-indigo-600" name="bi-person-lines-fill" />
              Sobre mí
            </h2>
            <p class="text-sm text-gray-700 md:leading-relaxed">
              {{ data.bio }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <section class="max-w-6xl mx-auto px-4 mt-6">
        <div class="bg-white rounded-xl shadow-sm p-3 md:p-6">
          <h2 class="flex items-center mb-4 text-lg font-bold text-gray-800 md:text-xl">
            <v-icon class="mr-2 text-indigo-600" name="bi-graph-up" />
            Estadísticas
          </h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 text-center bg-blue-50 rounded-lg">
              <p class="text-lg font-bold text-indigo-700 md:text-2xl">{{ data.experienceYears }}+</p>
              <p class="text-xs text-gray-600 md:text-sm">Años de experiencia</p>
            </div>
            <div class="p-4 text-center bg-blue-50 rounded-lg">
              <p class="text-lg font-bold text-indigo-700 md:text-2xl">{{ data.completedSessions }}</p>
              <p class="text-xs text-gray-600 md:text-sm">Sesiones completadas</p>
            </div>
            <div class="p-4 text-center bg-blue-50 rounded-lg">
              <p class="text-lg font-bold text-indigo-700 md:text-2xl flex items-center justify-center gap-1">
                {{ data.rating }}
                <v-icon class="text-indigo-600" name="io-star" scale="0.8" />
              </p>
              <p class="text-xs text-gray-600 md:text-sm">({{ data.totalRatings }} reseñas)</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Scheduling Section -->
      <section class="py-2 bg-gradient-to-b from-gray-50 to-white max-w-6xl mx-auto px-4 mt-6">

        <div v-if="expertInfo.length > 0">
          <ExpertInfoCard :expert="expertInfo[0]" />
        </div>

        <!-- Existing Appointment Warning -->
        <div v-if="clientStore().getClientUid && userAppointmentsFb.length > 0"
          class="mt-6 bg-indigo-50 rounded-xl border border-indigo-600 p-6">
          <div class="flex flex-col gap-4 items-center md:flex-row">
            <v-icon class="text-2xl text-indigo-600" name="bi-calendar2-check" />
            <h3 class="text-lg font-semibold text-indigo-900">
              Usted tiene una cita programada: {{ userAppointmentsFb[0].day }} {{ userAppointmentsFb[0].dayNumber }} {{
                userAppointmentsFb[0].month }} {{ userAppointmentsFb[0].year }}
            </h3>
          </div>
        </div>

        <!-- Time Slot Selector -->
        <div v-if="availableTimeData && availableTimeData.length > 0"
          class="px-3 py-6 mt-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 class="flex gap-2 items-center mb-6 text-xl font-semibold text-gray-900">
            <v-icon class="text-gray-600" name="bi-clock-history" />
            Seleccione su horario preferido
          </h3>

          <div class="flex overflow-auto gap-2 pb-4">
            <div class="animate-fade-up min-w-[100px]" v-for="(weekDay, index) in weekDays" :key="index"
              :style="{ animationDelay: `${index * 100}ms` }">
              <DateSquare v-if="availableTimeData[0]?.days"
                @hour-selected="(hour) => getUserSelection(weekDay.day, hour, index)" :day-info="{
                  day: weekDay.day,
                  dayNumber: weekDay.dateNumber,
                  availableDay: availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.availableDay || false,
                  slots: availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.slots || []
                }"
                :available-for-appointment="availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.availableDay || false"
                :selected-day="userDateSelection" :selected-hour="userHourSelection" :index="index" />
            </div>
          </div>
        </div>

        <!-- Confirmation -->
        <article class="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl p-6"
          v-if="useAppointmentStore().getSelectedHour">
          <div class="flex flex-col gap-6 items-center md:flex-row justify-between animate-fade-down">
            <div class="text-white">
              <h3 class="flex gap-3 items-center text-2xl font-semibold">
                <v-icon class="text-white" name="bi-calendar" />
                <span>Confirmación de cita</span>
              </h3>
              <p class="mt-2 text-blue-100 text-lg">
                {{ useAppointmentStore().getFormattedDate }} a las <span class="font-bold">{{
                  useAppointmentStore().getSelectedHour }}hrs</span>
              </p>
              <p class="text-xs text-blue-200 mt-1">Por favor revise los detalles antes de confirmar</p>
            </div>

            <button
              class="flex items-center px-8 py-3 space-x-2 font-semibold text-blue-900 bg-white rounded-xl transition-all hover:bg-blue-50 shadow-lg active:scale-95"
              @click="scheduleAppointment">
              <v-icon class="text-blue-600" name="bi-send-check" />
              <span>Confirmar cita</span>
            </button>
          </div>
        </article>

      </section>

      <!-- Contact Form (Hidden / Optional) -->
      <section class="py-8 bg-gray-50 hidden">
        <div class="container px-4 mx-auto max-w-7xl">
          <div class="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Formulario de contacto</h2>
            <!-- Placeholder for form if needed -->
          </div>
        </div>
      </section>

    </main>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, collection, doc, getDocs, query, where, addDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import '@vuepic/vue-datepicker/dist/main.css';

// Components
import DateSquare from '@/ExpertoInfoView/DateSquare.vue';
import ExpertInfoCard from '@/components/Expert/ExpertInfoCard.vue';
import LoaderBlue from '@/animations/LoaderBlue.vue';
import InfoUserLoader from '@/animations/InfoUserLoader.vue';
import ContentLoader from '@/animations/ContentLoader.vue';

// Stores
import clientStore from '@/store/client';
import { authStore } from '@/store/auth';
import { experts } from '@/store/experts';
import expertStore from '@/store/expert';
import systemStore from '@/store/system';
import { useAppointmentStore } from '@/store/appointment';

// Define Props
const props = defineProps({
  title: {
    type: String,
    default: 'Profesionales y Expertos en CONTADURÍA',
    required: false
  },
  area: {
    type: String,
    default: 'Ciencias Sociales',
    required: false
  },
  expertType: {
    type: String,
    default: 'Contadores'
  },
  dataInfo: {
    type: Object,
    required: false
  },
});

const router = useRouter();
// const route = useRoute(); // Unused

// Instances
const notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  ripple: true,
  position: { x: 'center', y: 'top' }
});

const db = getFirestore();
const client = clientStore();
const sysStore = systemStore();
// const expert = expertStore(); // Unused directly, used in template via expertStore()
const appointmentStore = useAppointmentStore(); // Used in script

// State
const isLoading = ref(true);
const isLoadingExpertInfo = ref(true);
const availableTimeData = ref<any[]>([]);
const userAppointmentsFb = ref<any[]>([]); // IFutureAppointment?
const userHasScheduled = ref(false);

// Reactive Data for User Profile
const data = reactive({
  name: '',
  specialty: '',
  rating: 0,
  totalRatings: 0,
  bio: '',
  experienceYears: 0,
  completedSessions: 0,
  profesionalId: '',
  email: '',
  isBanned: false,
  isSuspended: false,
  suspensionReason: '',
  formattedDate: '',
  imgUrl: ''
});

// Selection State
const userDateSelection = ref('');
const userHourSelection = ref('');
const userDayNumber = ref<number | string>('');
const userMonth = ref('');

// Interfaces
interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

interface IExpert {
  name: string;
  profesionalId: string;
  userUid: string;
  suspensionReason: string;
  experienceYears: number;
  specialty: string;
  totalRatings: number;
  isSuspended: boolean;
  bio: string;
  createdAt: ITimestamp;
  email: string;
  rating: number;
  completedSessions: number;
  isBanned: boolean;
  imgUrl?: string; // Add this
}

const expertInfo = ref<IExpert[]>([]);

// Firebase Collections
const collectionMockExperts = collection(db, `experts/${sysStore.getSelectedExpertUid}/schedule`);
// Note: Logic suggests fetching from MockExperts collection but variable name is collectionMockExperts, path is experts/.../schedule?
// In getExpertData, it uses 'MockExperts'. In scheduleAppointment, it uses 'MockExperts'.
// Lines 353 in original defined `experts/${sysStore.getSelectedExpertUid}/schedule`
// Lines 880 defined `MockExperts`.
// The schedule logic seems to rely on `getDates` using `collectionMockExperts`.

// Helper: Get Week Days
const getWeekDays = () => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = new Date();
  const currentDay = today.getDay();
  const reorderedDays = [...days.slice(currentDay), ...days.slice(0, currentDay)];
  return reorderedDays.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return {
      day,
      dateNumber: date.getDate(),
      fullDate: date
    };
  });
};
const weekDays = ref(getWeekDays());

// --- Functions ---

// Get Dates (Schedule)
const getDates = async () => {
  isLoading.value = true;
  availableTimeData.value = [];
  try {
    const querySnapshot = await getDocs(collectionMockExperts);
    querySnapshot.forEach((doc) => {
      // console.log('Schedule:', doc.data());
      availableTimeData.value.push(doc.data());
    });
    getClientAppointments();
  } catch (error) {
    console.error('Error al obtener fechas:', error);
    notyf.error('Error al cargar el horario');
  } finally {
    isLoading.value = false;
  }
};

// Get Client Appointments
const getClientAppointments = async () => {
  try {
    if (client.getClientUid) {
      const clientCollectionFutureAppointments = collection(db, `users/${client.getClientUid}/FutureAppointments`);
      const querySnapshot = await getDocs(clientCollectionFutureAppointments);
      userAppointmentsFb.value = [];
      querySnapshot.forEach((doc) => {
        userAppointmentsFb.value.push({ id: doc.id, ...doc.data() });
      });
    }
  } catch (error) {
    console.error(`Error getting client appointments: ${error}`);
  }
};

// Get Expert Data (Profile)
const expertMockCollection = collection(db, 'MockExperts');
const getExpertData = async () => {
  try {
    const qGetExpertMatch = query(expertMockCollection, where('userUid', '==', sysStore.getSelectedExpertUid));
    const expertMockSnapshot = await getDocs(qGetExpertMatch);
    if (expertMockSnapshot.empty) return;

    const val = expertMockSnapshot.docs[0].data();
    data.name = val.name;
    data.specialty = val.specialty;
    data.rating = val.rating;
    data.totalRatings = val.totalRatings;
    data.bio = val.bio;
    data.experienceYears = val.experienceYears;
    data.completedSessions = val.completedSessions;
    data.profesionalId = val.profesionalId;
    data.email = val.email;
    data.isBanned = val.isBanned;
    data.isSuspended = val.isSuspended;
    data.suspensionReason = val.suspensionReason;
    data.formattedDate = val.createdAt?.toDate().toLocaleDateString() || '';
    data.imgUrl = val.imgUrl;

    // Also Populate expertInfo array which is used in template:
    expertInfo.value = [val as IExpert];

    isLoadingExpertInfo.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingExpertInfo.value = false;
  }
}

// NOTE: getExpertInfo in original script was separate but fetched same data. I merged logic above or keep it simple.
const getExpertInfo = async () => {
  // Redundant if getExpertData does the job, but let's keep it safe
  await getExpertData();
};

// User Selection
const getUserSelection = (day: string, hour: string, index: number) => {
  userDateSelection.value = day;
  userHourSelection.value = hour;
  appointmentStore.dayName = day; // Update store as well if needed?
  appointmentStore.selectedHour = hour;
};

// Check if User Scheduled
const getIsUserScheduled = async () => {
  try {
    const currentUserId = authStore().getUserUid;
    if (!availableTimeData.value || availableTimeData.value.length === 0) {
      await getDates();
    }
    const hasAppointment = availableTimeData.value.some((week: any) =>
      week.days.some((day: any) =>
        day.slots.some((slot: any) =>
          slot.takenBy === currentUserId
        )
      )
    );
    return hasAppointment;
  } catch (error) {
    console.error('Error al verificar citas existentes:', error);
    return true;
  }
};

// Add Appointment to Client Collection
const addAppointmentToClient = async () => {
  try {
    const customId = doc(db, `users/${authStore().getUserUid}/FutureAppointments/${sysStore.getSelectedExpertUid}`)
    await setDoc(customId, {
      hour: appointmentStore.selectedHour,
      day: appointmentStore.dayName,
      formattedDate: appointmentStore.formattedDate,
      expertUid: sysStore.getSelectedExpertUid,
      userId: authStore().getUserUid,
      createdAt: Timestamp.now(),
      expertName: data.name,
      specialty: data.specialty,
      professionalId: data.profesionalId,
      appointmentLink: ''
    })
  } catch (error) {
    console.error(error);
  }
}

// Schedule Appointment
const scheduleAppointment = async () => {
  if (!authStore().getUserUid || !client.getClientUid || !authStore().isAuth) {
    notyf.error('Por favor inicie sesión para programar una cita');
    authStore().isAuth = false;
    authStore().setUserUid('');
    client.setClientUid('');
    router.push('/login');
    return;
  }

  if (!appointmentStore.dayName || !appointmentStore.selectedHour) {
    alert('Por favor selecciona una fecha y hora');
    return;
  }

  isLoading.value = true;

  try {
    await getDates();
    const hasExistingAppointment = await getIsUserScheduled();
    if (hasExistingAppointment) {
      notyf.error('Ya tiene una cita programada con este experto');
      isLoading.value = false;
      return;
    }

    const expertRef = doc(db, 'MockExperts', sysStore.getSelectedExpertUid);
    const scheduleRef = collection(expertRef, 'Schedule');
    const q = query(scheduleRef, where('userUid', '!=', 'testing'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      notyf.error('No se encontró el horario del experto');
      isLoading.value = false;
      return;
    }

    const docRef = querySnapshot.docs[0].ref;
    const docData = querySnapshot.docs[0].data();
    const updatedDays = [...docData.days];

    const dayIndex = updatedDays.findIndex(day =>
      day.day.toLowerCase() === appointmentStore.dayName.toLowerCase()
    );

    if (dayIndex !== -1) {
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        slots: updatedDays[dayIndex].slots.map((slot: any) =>
          slot.hour === appointmentStore.selectedHour
            ? { ...slot, takenBy: client.getClientUid, isConfirmed: false }
            : slot
        )
      };

      await updateDoc(docRef, { days: updatedDays });
      console.log('Horario actualizado exitosamente');

      addAppointmentToClient();
      appointmentStore.setAppointment('', '', '');
      availableTimeData.value = [];
      userHasScheduled.value = true;
      getDates();

    } else {
      notyf.error('Día no encontrado en el horario');
      isLoading.value = false;
    }
  } catch (error) {
    console.error('Error al actualizar el horario en Firebase:', error);
    notyf.error(`Error al actualizar el horario en Firebase: ${error}`);
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  console.log('Component ViewDidEnter (similar to mounted)');
  userHasScheduled.value = false;
  getDates();
  getExpertData();
  animateNames();
});

onUnmounted(() => {
  availableTimeData.value = [];
  data.formattedDate = '';
  // Reset other necessary values
  if (timeoutId) {
    clearInterval(timeoutId);
    timeoutId = null;
  }
});

// Name Animation
const names = [
  ['<span class="text-sm animate-fade-down animate-duration-300 animate-delay-100">consulta</span><span class="text-sm text-blue-700 animate-fade animate-duration-300 animate-delay-200">gratis</span><span class="text-sm animate-fade animate-duration-300 animate-delay-300">en</span><span class="text-sm animate-fade animate-duration-300 animate-delay-500">linea</span><span class="text-sm text-blue-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'],
  ['<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span><span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">experto</span><span class="text-blue-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'],
  ['<span class="text-sm animate-fade-down animate-delay-100">consulta</span><span class="text-sm text-blue-700 animate-fade animate-delay-200">especializada</span><span class="text-sm text-blue-500 animate-fade animate-delay-300">.com</span>']
];
let timeoutId: NodeJS.Timeout | null = null;
const currentName = ref<string[]>(names[0]);
const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
}

</script>

<style scoped>
/* Scoped styles */
</style>
