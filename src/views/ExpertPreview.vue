<template>
  <div class="web-page min-h-screen bg-gray-50">

    <main class=" p-4 px-7 space-y-6 mt-24">
      <!-- Profile Header -->
      <div class="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex flex-col items-center">
        <div class="relative mb-4">
          <img class="w-32 h-32 rounded-xl  object-cover ring-4 ring-offset-4"
            :src="expertAdminStore.getCurrentExpert?.imgUrl || 'https://picsum.photos/200/300'"
            :class="expertAdminStore.getCurrentExpert?.isSuspended ? 'ring-red-500' : 'ring-blue-500'"
            alt="Profile picture" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">{{ expertAdminStore.getCurrentExpert?.fullName || 'Juan Pérez' }}
        </h1>
        <p v-if="expertAdminStore.getCurrentExpert?.isSuspended" class="text-red-600 font-bold">(Suspendido)</p>
        <p class="mt-1 text-blue-600 font-medium">{{ expertAdminStore.getCurrentExpert?.specialty || 'Especialidad' }}
        </p>
      </div>

      <!-- Information Card -->
      <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-bold text-gray-800">Información del experto</h2>
        </div>
        <div class="divide-y divide-gray-100">
          <div class="px-6 py-4 flex justify-between items-center" v-for="item in expertInfo" :key="item.label">
            <span class="text-gray-500 font-medium">{{ item.label }}</span>
            <span class="text-gray-900" :class="item.class">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div class="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-3">Biografía</h2>
        <p class="text-gray-600 leading-relaxed">{{ `${expertAdminStore.getCurrentExpert?.bio
          || 'Sin biografía disponible.'}` }}</p>
      </div>

      <!-- Schedule Section -->
      <div class="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 class="text-lg font-bold text-gray-800">Horarios Disponibles</h2>
          <div class="flex gap-2">
            <button @click="showSchedule = !showSchedule"
              class="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              :class="showSchedule ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'">
              {{ showSchedule ? 'Ocultar Horarios' : 'Ver Horarios' }}
            </button>
            <button @click="toggleConsultations" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              :class="showConsultations ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'">
              Ver Consultas
            </button>
          </div>
        </div>

        <div v-if="showSchedule" class="space-y-6 animate-fade-in">
          <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <input type="checkbox" v-model="canEdit" class="w-5 h-5 text-blue-600 rounded">
            <span class="text-sm font-medium text-blue-800">Habilitar edición de horarios</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(slots, dayName) in schedule" :key="dayName"
              class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 class="text-blue-600 font-bold mb-3 text-center border-b border-blue-100 pb-2">{{ dayName }}</h3>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="(slot, idx) in slots" :key="idx" @click="handleSlotClick(dayName, slot.time)"
                  class="py-2 px-1 text-xs font-semibold rounded-lg border transition-all"
                  :class="slot.isAvailable ? 'bg-white text-gray-700 border-gray-200' : 'bg-blue-600 text-white border-blue-600'">
                  {{ slot.time }}
                </button>
              </div>
            </div>
          </div>

          <button @click="saveSchedule" :disabled="!canEdit || saving"
            class="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all">
            {{ saving ? 'Guardando...' : 'Guardar Cambios de Horario' }}
          </button>
        </div>
      </div>

      <!-- Consultations List -->
      <section v-if="showConsultations" class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-bold text-gray-800">Consultas del Experto</h2>
        <div v-if="loadingAppointments" class="flex justify-center p-10">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
        <div v-else-if="userAppointments.length === 0" class="text-center p-10 text-gray-400">
          No hay consultas registradas.
        </div>
        <div v-else class="grid gap-4">
          <ExpertScheduleData v-for="(appointment, index) in userAppointments" :key="index" :data="appointment"
            @reloadData="getUserAppointments" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useExpertAdminStore } from '@/stores/expertAdmin';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import ExpertScheduleData from '@/components/Expert/ExpertScheduleData.vue';
import { ISchedule } from '@/interfaces/user/ISchedule';

// const router = useRouter();
const toast = useToast();
const db = getFirestore();
const expertAdminStore = useExpertAdminStore();

const showSchedule = ref(false);
const showConsultations = ref(false);
const canEdit = ref(false);
const saving = ref(false);
const loadingAppointments = ref(false);
const userAppointments = ref<ISchedule[]>([]);

const expertInfo = computed(() => [
  { label: 'Nombre', value: expertAdminStore.getCurrentExpert?.fullName || 'N/A' },
  { label: 'Email', value: expertAdminStore.getCurrentExpert?.email || 'N/A' },
  { label: 'Especialidad', value: expertAdminStore.getCurrentExpert?.specialty || 'N/A' },
  { label: 'Cédula', value: expertAdminStore.getCurrentExpert?.professionalId || 'No proporcionada' },
  {
    label: 'Estado',
    value: expertAdminStore.getCurrentExpert?.isSuspended ? 'Suspendido' : 'Activo',
    class: expertAdminStore.getCurrentExpert?.isSuspended ? 'text-red-500 font-bold' : 'text-green-600 font-bold'
  },
  {
    label: 'Motivo Suspensión',
    value: expertAdminStore.getCurrentExpert?.suspensionReason || 'Ninguno',
    class: expertAdminStore.getCurrentExpert?.isSuspended ? 'text-red-400' : 'text-gray-400'
  }
]);

const schedule = computed(() => {
  const original = expertAdminStore.getCurrentExpert?.schedule || {};
  const orderedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  const ordered: Record<string, any> = {};
  orderedDays.forEach(day => {
    if ((original as any)[day]) ordered[day] = (original as any)[day]; //dont fix this keep it as it is
  });
  return ordered;
});

const handleSlotClick = (day: string, time: string) => {
  if (!canEdit.value) {
    toast.info('Habilite la edición para modificar los horarios');
    return;
  }
  const daySchedule = (schedule.value as any)[day];
  if (daySchedule) {
    const slot = (daySchedule as any[]).find(s => s.time === time);
    if (slot) slot.isAvailable = !slot.isAvailable;
  }
};

const toggleConsultations = () => {
  showConsultations.value = !showConsultations.value;
  if (showConsultations.value && userAppointments.value.length === 0) {
    getUserAppointments();
  }
};

const getUserAppointments = async () => {
  const expertUid = expertAdminStore.getCurrentExpert?.userUid;
  if (!expertUid) return;

  loadingAppointments.value = true;
  try {
    const q = query(collection(db, 'schedules'), where('expertUid', '==', expertUid));
    const snap = await getDocs(q);
    userAppointments.value = snap.docs.map(doc => ({ ...doc.data(), docId: doc.id, docRef: doc.ref } as ISchedule));
  } catch (error) {
    console.error(error);
    toast.error('Error al cargar consultas');
  } finally {
    loadingAppointments.value = false;
  }
};

const saveSchedule = async () => {
  const expertId = expertAdminStore.getCurrentExpert?.docId;
  if (!expertId) return;

  saving.value = true;
  try {
    await updateDoc(doc(db, `experts/${expertId}`), {
      schedule: schedule.value
    });
    toast.success('Horario actualizado');
    canEdit.value = false;
  } catch (error) {
    console.error(error);
    toast.error('Error al guardar cambios');
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
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
