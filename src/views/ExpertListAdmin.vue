<template>
  <div class="web-page min-h-screen bg-gray-50 flex flex-col w-full">
    <header class="sticky top-28 z-40 border-b border-gray-100 shadow-md bg-white rounded-3xl px-12 mx-12">
      <nav class="h-16 flex items-center px-4 justify-between">
        <h1 class="text-xl font-bold text-blue-700 font-manrope">Administrar Expertos</h1>
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm"
            @click="router.push('/create-expert')">
            Crear Experto
          </button>
          <button
            class="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 text-sm"
            @click="router.push('/users-list-admin')">
            Ver Usuarios
          </button>
        </div>
      </nav>

      <div class="max-w-5xl mx-auto w-full px-4 py-3 bg-gray-50/50">
        <div class="relative">
          <v-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" name="fa-search" />
          <input
            class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-gray-700 shadow-sm"
            placeholder="Buscar por nombre, especialidad, correo..." v-model="searchQuery"
            @input="searchExpertByName(searchQuery)">
        </div>
      </div>
    </header>

    <main class="flex-1  w-full p-4 overflow-y-auto mt-32">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-500 font-medium">Cargando expertos...</p>
      </div>

      <div v-else-if="experts.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <v-icon name="ri-user-smile-line" scale="3" class="text-gray-300" />
        <p class="text-gray-500 font-medium">No se ha encontrado ningún experto</p>
      </div>

      <div v-else class="grid gap-4 lg:grid-cols-2">
        <ExpertCard v-for="(expert, index) in experts" :key="index" :expert-data="expert" @reload="getAllExperts"
          @callOpenModal="openModal" />
      </div>

      <!-- Suspension Modal -->
      <GenericModal v-model:show="isOpenModal" title="Suspender Experto" confirmText="Suspender" @confirm="suspendUser"
        @cancel="closeModal">
        <div class="space-y-4">
          <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <p class="text-rose-900 font-medium">
              ¿Está seguro de suspender a <span class="font-bold">{{ expertSelectedData.fullName }}</span> ({{
                expertSelectedData.specialty }})?
            </p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-bold text-gray-700 ml-1">Motivo de la suspensión</label>
            <textarea
              class="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all font-medium text-gray-700 resize-none"
              v-model="suspensionReason" placeholder="Ej: El experto contactó con el usuario sin permiso"></textarea>
          </div>
        </div>
      </GenericModal>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import ExpertCard from '@/components/Experts/ExpertCard.vue';
import GenericModal from '@/components/Common/GenericModal.vue';
import { IExpert } from '@/interfaces/IExpert';
import { collection, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

const router = useRouter();
const toast = useToast();
const db = getFirestore();

const allExperts = ref<IExpert[]>([]);
const experts = ref<IExpert[]>([]);
const loading = ref(false);
const isOpenModal = ref(false);
const suspensionReason = ref('');
const searchQuery = ref('');
const expertSelectedData = ref<Partial<IExpert>>({});

const getAllExperts = async () => {
  loading.value = true;
  try {
    const querySnapshot = await getDocs(collection(db, 'experts'));
    if (querySnapshot.empty) {
      toast.warning('No hay expertos registrados');
      loading.value = false;
      return;
    }

    const fetchedExperts: IExpert[] = [];
    querySnapshot.forEach(doc => {
      fetchedExperts.push({
        ...doc.data(),
        docId: doc.id,
        docRef: doc.ref,
      } as IExpert);
    });

    allExperts.value = fetchedExperts;
    experts.value = fetchedExperts;
  } catch (err: any) {
    console.error('Error al cargar los expertos:', err);
    toast.error('Error al cargar los expertos: ' + err.message);
  } finally {
    loading.value = false;
  }
};

const searchExpertByName = (queryText: string) => {
  const q = queryText.toLowerCase();
  experts.value = allExperts.value.filter(expert => {
    return [
      expert.fullName,
      expert.professionalId,
      expert.email,
      expert.specialty,
      expert.suspensionReason
    ].some(field => field?.toLowerCase().includes(q));
  });
};

const openModal = (expertData: IExpert) => {
  expertSelectedData.value = expertData;
  isOpenModal.value = true;
};

const closeModal = () => {
  suspensionReason.value = '';
  expertSelectedData.value = {};
  isOpenModal.value = false;
};

const suspendUser = async () => {
  if (!suspensionReason.value.trim()) {
    toast.error('Error: No se proporcionó un motivo de suspensión');
    return;
  }

  if (!expertSelectedData.value.docRef) {
    toast.error('Error: No se encontró el experto');
    return;
  }

  try {
    await updateDoc(expertSelectedData.value.docRef, {
      isSuspended: true,
      suspensionReason: suspensionReason.value.trim()
    });

    toast.success('Experto suspendido exitosamente');
    await getAllExperts();
    closeModal();
  } catch (error) {
    console.error('Error suspending expert:', error);
    toast.error('Error al suspender al experto');
  }
};

onMounted(() => {
  getAllExperts();
});
</script>

<style scoped>
.web-search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>