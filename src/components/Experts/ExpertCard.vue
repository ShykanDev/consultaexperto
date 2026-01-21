<template>
  <div class="flex overflow-hidden relative flex-col my-3 rounded-xl shadow-md font-poppins gap-4 items-start p-4"
    :class="{ 'bg-red-100 ring-2 ring-red-300': props.expertData.isSuspended, 'bg-white': !props.expertData.isSuspended }">

    <img class="object-cover w-14 h-14 rounded-full shrink-0"
      :src="props.expertData.profilePicture || 'https://picsum.photos/200/300'" alt="Profile picture" />
    <div class="flex-grow flex justify-between items-center w-full">
      <p class="text-lg font-bold leading-tight text-blue-600 font-poppins">{{ props.expertData.fullName || `Nombre del
        experto` }}</p>
      <p class="text-sm font-medium leading-tight text-red-700 font-poppins" v-if="props.expertData.isSuspended">
        (Suspendido)</p>
    </div>
    <p class="text-sm text-neutral-600">{{ props.expertData.specialty ?? 'Especialidad' }}</p>
    <div class="flex gap-1 items-center mt-1 text-yellow-400" v-if="props.expertData.rating">
      <v-icon name="io-star" scale="0.8" />
      <p class="ml-1 text-xs text-neutral-500">{{ calcStarsValue(props.expertData.rating) }}</p>
      <span class="text-xs text-neutral-500">
        ({{ props.expertData.rating.count ?? 0 }} valoraciones)
      </span>
    </div>
    <p class="text-xs text-gray-500">{{ props.expertData.isBanned ? 'Bloqueado' : 'Activo' }}</p>
  </div>

  <div class="flex relative flex-col gap-3 px-4 pb-4">
    <p class="text-sm leading-relaxed text-neutral-600">{{ props.expertData.bio || 'Biografía del experto' }}</p>
    <div class="p-2 mt-1 bg-red-50 rounded-lg border border-red-200" v-if="props.expertData.isSuspended">
      <p class="text-xs font-bold text-red-800 !font-poppins">Motivo de la suspension:</p>
      <p class="text-sm text-red-800 !font-poppins">{{ props.expertData.suspensionReason || `Este experto ha sido
        suspendido por violar las normas de la comunidad.` }}</p>
    </div>

    <div class="grid grid-cols-3 gap-1 p-1 mt-2">
      <button v-if="props.expertData.isSuspended"
        class="col-span-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-semibold hover:bg-emerald-100 transition-all text-sm"
        @click="handleUnsuspend">
        Desbloquear
      </button>

      <button v-else
        class="col-span-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all text-sm"
        @click="toggleModal">
        Suspender
      </button>

      <button class="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm"
        @click="goToProfile">
        Ver perfil
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { IExpert } from '@/interfaces/IExpert';
import { useExpertAdminStore } from '@/stores/expertAdmin';
import { updateDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRating } from '@/composables/stars';

const props = defineProps({
  expertData: {
    type: Object as () => IExpert,
    default: () => ({} as IExpert)
  }
});

const emit = defineEmits(['reload', 'callOpenModal']);

const router = useRouter();
const toast = useToast();
const expertAdminStore = useExpertAdminStore();
const { calcStarsValue } = useRating();

const goToProfile = () => {
  expertAdminStore.setExpertData(props.expertData)
  router.push(`/expert-preview`);
};

const toggleModal = () => {
  emit('callOpenModal', props.expertData)
}

const handleUnsuspend = async () => {
  if (confirm('¿Está seguro de desbloquear a este experto?')) {
    await unsuspendUser();
  }
};

const unsuspendUser = async () => {
  if (!props.expertData.docRef) {
    toast.error('Error: No se encontró el experto');
    return;
  }

  try {
    await updateDoc(props.expertData.docRef!, {
      isSuspended: false,
      suspensionReason: null
    });
    emit('reload');
    toast.success('Experto reactivado exitosamente');
  } catch (error) {
    console.error('Error reactivating expert:', error);
    toast.error('Error al reactivar al experto');
  }
}
</script>