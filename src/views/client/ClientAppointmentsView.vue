<template>
  <div class="web-page min-h-screen bg-gradient-to-br from-blue-50 via-blue-50/50 to-white">
    <!--Header-->


    <!--Content-->
    <div class="mt-28 ">

      <nav class="web-toolbar h-16 flex items-center px-4 mt-2">
        <div class="relative w-full">
          <v-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" name="fa-search" />
          <input
            class="web-search-input w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            v-model="searchQuery" placeholder="Experto, especialidad o estado...">
        </div>
      </nav>

      <nav class="web-toolbar h-auto flex flex-col sm:flex-row items-center px-4 gap-3 mb-4">
        <div class="flex-1 w-full flex flex-row gap-2">
          <select
            class="web-select w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-xs font-poppins"
            aria-label="Listar por" v-model="sortBy">
            <option value="creation">Fecha de Creación</option>
            <option value="scheduled">Fecha Agendada</option>
          </select>

          <select
            class="web-select w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-xs font-poppins"
            aria-label="Ordenar por" v-model="orderBy">
            <option value="Recientes">Más recientes</option>
            <option value="Antiguas">Más antiguas</option>
          </select>
        </div>
      </nav>

      <!-- Segment Control -->
      <div class="flex px-4 py-2 gap-2">
        <button v-for="tab in tabs" :key="tab.id" @click="customSegment(tab.id)"
          class="flex-1 py-2 text-sm font-bold rounded-lg transition-all border border-transparent"
          :class="segmentCustomClass === tab.id ? 'bg-white text-blue-600 shadow-sm border-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Proximas -->
      <div v-show="segmentCustomClass === 'proximas'" class="animate-fade-in">
        <div class="text-center px-4 py-2 flex items-center gap-2 justify-center bg-gray-50 mb-2 rounded-xl mx-4">
          <p class="font-poppins text-sm font-semibold text-slate-600">{{ proxAppointments.length }} Próximas citas</p>
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"
            v-show="isLoading"></div>
        </div>

        <div
          class="flex flex-col items-center justify-center p-8 text-center text-gray-500 font-poppins bg-white mx-4 rounded-xl border border-dashed border-gray-200"
          v-if="proxAppointments.length === 0">
          <v-icon name="md-eventbusy" scale="2" class="mb-2 text-gray-300" />
          No se encontraron citas próximas
        </div>

        <div class="px-4 space-y-3 pb-4">
          <div v-for="(appointment, index) in proxAppointments" :key="appointment.docId || index">
            <CardInfo :data="appointment" :index="index" />
          </div>
        </div>
      </div>

      <!-- Finalizadas -->
      <div v-show="segmentCustomClass === 'finalizadas'" class="animate-fade-in">
        <div class="text-center px-4 py-2 flex items-center gap-2 justify-center bg-gray-50 mb-2 rounded-xl mx-4">
          <p class="font-poppins text-sm font-semibold text-slate-600">{{ finishedAppointments.length }} Citas
            finalizadas </p>
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"
            v-show="isLoading"></div>
        </div>

        <div
          class="flex flex-col items-center justify-center p-8 text-center text-gray-500 font-poppins bg-white mx-4 rounded-xl border border-dashed border-gray-200"
          v-if="finishedAppointments.length === 0">
          <v-icon name="md-assignmentturnedin" scale="2" class="mb-2 text-gray-300" />
          No se encontraron citas finalizadas
        </div>

        <div class="px-4 space-y-3 pb-4">
          <div v-for="(appointment, index) in finishedAppointments" :key="appointment.docId || index">
            <CardInfo :data="appointment" :index="index" />
          </div>
        </div>
      </div>

      <!-- Canceladas -->
      <div v-show="segmentCustomClass === 'canceladas'" class="animate-fade-in">
        <div class="text-center px-4 py-2 flex items-center gap-2 justify-center bg-gray-50 mb-2 rounded-xl mx-4">
          <p class="font-poppins text-sm font-semibold text-slate-600">{{ canceledAppointments.length }} Citas
            canceladas </p>
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"
            v-show="isLoading"></div>
        </div>

        <div
          class="flex flex-col items-center justify-center p-8 text-center text-gray-500 font-poppins bg-white mx-4 rounded-xl border border-dashed border-gray-200"
          v-if="canceledAppointments.length === 0">
          <v-icon name="md-cancel-outlined" scale="2" class="mb-2 text-gray-300" />
          No se encontraron citas canceladas
        </div>

        <div class="px-4 space-y-3 pb-4">
          <div v-for="(appointment, index) in canceledAppointments" :key="appointment.docId || index">
            <CardInfo :data="appointment" :index="index" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { authStore as authStoreInstance } from '@/store/auth';
import CardInfo from '@/components/Client/CardInfo.vue';
import { ISchedule } from '@/interfaces/user/ISchedule';
import 'animate.css';


const authStore = authStoreInstance();
const db = getFirestore();
const collectionRef = collection(db, 'schedules');
const q = query(collectionRef, where('userUid', '==', authStore.getUserUid));
const isLoading = ref(false);

const userAppointments = ref<ISchedule[]>([]);
let unsub: (() => void) | null = null;

const refreshData = () => {
  // Re-trigger load if needed, mostly handled by realtime listener
  isLoading.value = true;
  setTimeout(() => isLoading.value = false, 500);
}

onMounted(() => {
  isLoading.value = true;
  unsub = onSnapshot(q, (querySnapshot) => {
    userAppointments.value = [];
    if (querySnapshot.empty) {
      isLoading.value = false;
      return;
    }
    querySnapshot.forEach((doc) => {
      const userAppointment = doc.data() as ISchedule;
      userAppointment.docId = doc.id;
      userAppointment.docRef = doc.ref;
      userAppointment.docRefPath = doc.ref.path;
      userAppointments.value.push(userAppointment);
    });
    isLoading.value = false;
  },
    (error) => {
      console.error(error);
      isLoading.value = false;
    }
  );
});

onUnmounted(() => {
  if (unsub) {
    unsub();
    unsub = null;
  }
  userAppointments.value = [];
});

const tabs = [
  { id: 'proximas', label: 'Próximas' },
  { id: 'finalizadas', label: 'Finalizadas' },
  { id: 'canceladas', label: 'Canceladas' }
];

const segmentCustomClass = ref('proximas');
const customSegment = (id: string) => {
  segmentCustomClass.value = id;
}

const searchQuery = ref('');
const sortBy = ref<'creation' | 'scheduled'>('creation');
const orderBy = ref<'Recientes' | 'Antiguas'>('Recientes');

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  if (!dayName) return -1;
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const getAppointmentDate = (appointment: ISchedule): Date | null => {
  if ((appointment as any).appointmentDate) {
    return new Date((appointment as any).appointmentDate.seconds * 1000);
  }

  if (!appointment.createdAt) return null;

  const createdAtDate = new Date(appointment.createdAt.seconds * 1000);
  const currentDayIndex = createdAtDate.getDay();
  const targetDayName = appointment.DayName || (appointment as any).dayName || '';
  const targetDayIndex = getDayIndex(targetDayName);

  if (targetDayIndex === -1) return createdAtDate;

  let daysUntil = targetDayIndex - currentDayIndex;

  if (daysUntil < 0) {
    daysUntil += 7;
  }

  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);

  if (appointment.expertSchedule && appointment.expertSchedule.time) {
    const [hours, minutes] = appointment.expertSchedule.time.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      futureDate.setHours(hours, minutes, 0, 0);
    }
  }

  return futureDate;
}

const filterAndSortAppointments = (appointments: ISchedule[]) => {
  let filtered = [...appointments];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    filtered = filtered.filter(app => {
      const expertName = (app.expertName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const specialty = (app.expertSpecialty || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      let status = 'programada';
      if (app.isFinished) status = 'finalizada';
      if (app.isCanceled) status = 'cancelada';

      const isPending = !app.isFinished && !app.isCanceled;
      if (isPending && (q.includes('proxima') || q.includes('pendiente'))) return true;

      return expertName.includes(q) || specialty.includes(q) || status.includes(q);
    });
  }

  filtered.sort((a, b) => {
    let dateA = 0;
    let dateB = 0;

    if (sortBy.value === 'creation') {
      dateA = a.createdAt?.seconds || 0;
      dateB = b.createdAt?.seconds || 0;
    } else {
      const dA = getAppointmentDate(a);
      const dB = getAppointmentDate(b);
      dateA = dA ? dA.getTime() : 0;
      dateB = dB ? dB.getTime() : 0;
    }

    if (orderBy.value === 'Recientes') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return filtered;
}

const canceledAppointments = computed(() => {
  const cAppointments = userAppointments.value.filter((e) => e.isCanceled);
  return filterAndSortAppointments(cAppointments);
})

const finishedAppointments = computed(() => {
  const cAppointments = userAppointments.value.filter((e) => e.isFinished);
  return filterAndSortAppointments(cAppointments);
})

const proxAppointments = computed(() => {
  const cAppointments = userAppointments.value.filter((e) => !e.isFinished && !e.isCanceled);
  return filterAndSortAppointments(cAppointments);
})
</script>

<style scoped>
/* style adjustments */
</style>