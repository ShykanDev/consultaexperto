<template>
  <div class="web-page min-h-screen bg-gray-50">
    <!-- Header -->
    <header
      class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm font-poppins">
      <nav class="web-toolbar h-16 flex items-center px-4 justify-between">
        <h1 class="web-title text-lg font-bold text-blue-600">Agenda Expertos</h1>
        <div class="web-buttons flex items-center space-x-2">
          <button
            class="web-btn flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 hover:bg-blue-700 shadow-md shadow-blue-200"
            @click="refreshData">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              :class="{ 'animate-spin': isLoading }" v-if="isLoading"></div>
            <v-icon name="md-refresh" v-else />
            Actualizar
          </button>
        </div>
      </nav>
    </header>

    <!-- Content -->
    <main class="web-content p-4 space-y-4">
      <!-- Search -->
      <div class="relative w-full">
        <v-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" name="fa-search" />
        <input
          class="web-search-input w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          v-model="searchQuery" placeholder="Usuario, especialidad o estado...">
      </div>

      <!-- Filters -->
      <div class="flex gap-2">
        <select
          class="web-select flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-poppins"
          v-model="sortBy">
          <option value="creation">Fecha de Creación</option>
          <option value="scheduled">Fecha Agendada</option>
        </select>
        <select
          class="web-select flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-poppins"
          v-model="orderBy">
          <option value="Recientes">Más recientes</option>
          <option value="Antiguas">Más antiguas</option>
        </select>
      </div>

      <!-- Segments -->
      <div class="flex p-1 bg-gray-100 rounded-xl">
        <button class="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
          v-for="tab in ['Proximas', 'Finalizadas', 'Canceladas']" :key="tab" @click="activeTab = tab"
          :class="activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
          {{ tab }}
        </button>
      </div>

      <!-- Appointments List -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 justify-center py-2 text-gray-500 text-sm font-bold bg-gray-50 rounded-lg">
          {{ currentAppointments.length }} Citas {{ activeTab.toLowerCase() }}
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"
            v-show="isLoading"></div>
        </div>

        <div
          class="flex justify-center items-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 font-poppins"
          v-if="currentAppointments.length === 0">
          No se encontraron citas
        </div>

        <div class="space-y-3">
          <div v-for="(appointment, index) in currentAppointments" :key="appointment.docId || index">
            <CardInfo :data="appointment" :index="index" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { collection, doc, getFirestore, onSnapshot, query, where, Unsubscribe } from 'firebase/firestore';
import { authStore as authStoreInstance } from '@/store/auth';
import { ISchedule } from '@/interfaces/user/ISchedule';
import CardInfo from '@/components/Expert/CardInfo.vue';
import expertStore from '@/store/expert';
import { IExpert } from '@/interfaces/IExpert';

const authStore = authStoreInstance();
const userAppointments = ref<ISchedule[]>([]);
const isLoading = ref(false);
const activeTab = ref('Proximas');
const searchQuery = ref('');
const sortBy = ref<'creation' | 'scheduled'>('creation');
const orderBy = ref<'Recientes' | 'Antiguas'>('Recientes');

const db = getFirestore();
let unsub: Unsubscribe | null = null;
let unsubExpertData: Unsubscribe | null = null;

const refreshData = () => {
  // refresh logic
};

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
  if (daysUntil < 0) daysUntil += 7;
  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);
  return futureDate;
}

const filteredAppointments = computed(() => {
  let filtered = [...userAppointments.value];

  // Tab filtering
  if (activeTab.value === 'Proximas') {
    filtered = filtered.filter(app => !app.isFinished && !app.isCanceled);
  } else if (activeTab.value === 'Finalizadas') {
    filtered = filtered.filter(app => app.isFinished);
  } else if (activeTab.value === 'Canceladas') {
    filtered = filtered.filter(app => app.isCanceled);
  }

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(app =>
      (app.userName || '').toLowerCase().includes(q) ||
      (app.expertSpecialty || '').toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    let valA = 0, valB = 0;
    if (sortBy.value === 'creation') {
      valA = a.createdAt?.seconds || 0;
      valB = b.createdAt?.seconds || 0;
    } else {
      valA = getAppointmentDate(a)?.getTime() || 0;
      valB = getAppointmentDate(b)?.getTime() || 0;
    }
    return orderBy.value === 'Recientes' ? valB - valA : valA - valB;
  });

  return filtered;
});

const currentAppointments = computed(() => filteredAppointments.value);

onMounted(() => {
  const expertCollection = collection(db, 'schedules');
  const q = query(expertCollection, where('expertUid', '==', authStore.getUserUid));

  unsub = onSnapshot(q, (snapshot) => {
    userAppointments.value = snapshot.docs.map(doc => ({
      ...doc.data() as ISchedule,
      docId: doc.id,
      docRef: doc.ref
    }));
  });

  const expertDocRef = doc(db, `experts/${authStore.getUserUid}`);
  unsubExpertData = onSnapshot(expertDocRef, (snapshot) => {
    if (snapshot.exists()) {
      expertStore().setExpertData(snapshot.data() as IExpert);
    }
  });
});

onUnmounted(() => {
  if (unsub) unsub();
  if (unsubExpertData) unsubExpertData();
});
</script>