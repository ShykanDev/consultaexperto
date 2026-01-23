<template>
  <div
    class="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 overflow-hidden h-full flex flex-col"
    :class="{ 'ring-2 ring-red-100 bg-red-50/40': props.expertData.isSuspended }">

    <!-- Status Badge (Mobile focus) -->
    <div v-if="props.expertData.isSuspended"
      class="absolute top-4 right-4 z-10 px-3 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full md:hidden animate-pulse">
      Suspendido
    </div>

    <div class="flex flex-col md:flex-row flex-1">

      <!-- Left Section: Profile Info -->
      <div
        class="w-full md:w-[38%] p-6 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gray-50 bg-gradient-to-br from-white to-gray-50/30"
        :class="{ 'from-red-50/50 to-white': props.expertData.isSuspended }">

        <div class="relative mb-5 group-hover:scale-105 transition-transform duration-500">
          <div class="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white relative">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :src="props.expertData.profilePicture || 'https://picsum.photos/200/300'" alt="Profile picture" />
            <div v-if="props.expertData.isSuspended"
              class="absolute inset-0 bg-red-900/20 backdrop-blur-[1px] flex items-center justify-center">
              <v-icon name="ri-error-warning-line" class="text-white" scale="1.5" />
            </div>
          </div>
          <div v-if="!props.expertData.isSuspended"
            class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
          <div v-else
            class="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 border-4 border-white rounded-full shadow-lg"></div>
        </div>

        <div class="space-y-1 w-full">
          <h3
            class="text-xl md:text-2xl font-black text-gray-800 leading-tight font-manrope tracking-tight break-words">
            {{ props.expertData.fullName || 'Nombre del experto' }}
          </h3>

          <p class="text-blue-600 font-extrabold text-sm tracking-wide uppercase">
            {{ props.expertData.specialty ?? 'Especialidad' }}
          </p>
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <div
            class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 transition-colors group-hover:border-blue-50"
            v-if="props.expertData.rating">
            <v-icon name="io-star" scale="0.8" class="text-yellow-400" />
            <span class="text-sm font-black text-gray-700">{{ calcStarsValue(props.expertData.rating) }}</span>
            <span class="text-[10px] text-gray-400 font-bold">({{ props.expertData.rating.count ?? 0 }})</span>
          </div>

          <div class="hidden md:block">
            <span v-if="props.expertData.isBanned"
              class="bg-gray-900 text-white border-gray-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border">
              Bloqueado
            </span>
            <span v-else
              :class="props.expertData.isSuspended ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'"
              class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border">
              {{ props.expertData.isSuspended ? 'Suspendido' : 'Activo' }}
            </span>
          </div>
        </div>

        <div class="mt-4 flex items-center gap-2 text-gray-400">
          <v-icon name="hi-identification" scale="0.7" />
          <p class="text-[10px] font-bold uppercase tracking-tighter">
            ID: {{ props.expertData.professionalId || 'No Registrado' }}
          </p>
        </div>
      </div>

      <!-- Right Section: Details & Actions -->
      <div class="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white">
        <div class="space-y-6">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-6 h-1 bg-blue-500 rounded-full"></div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">Biografía
                Profesional</label>
            </div>
            <div class="relative">
              <v-icon name="ri-zhihu-fill" scale="1.5" class="absolute -top-2 -left-2 text-blue-50/50 -z-0" />
              <p
                class="text-sm text-gray-600 leading-relaxed line-clamp-4 italic bg-gray-50/30 p-4 rounded-2xl border border-gray-50 relative z-10">
                "{{ props.expertData.bio || 'Este experto aún no ha redactado su biografía profesional.' }}"
              </p>
            </div>
          </div>

          <div v-if="props.expertData.isSuspended"
            class="p-5 bg-red-50/50 rounded-2xl border border-red-100/50 transition-all hover:bg-red-50">
            <div class="flex items-center gap-2 mb-2">
              <v-icon name="ri-error-warning-line" class="text-red-600" scale="0.9" />
              <span class="text-[10px] font-black text-red-800 uppercase tracking-widest">Alerta Administrativa</span>
            </div>
            <div class="bg-white/80 p-3 rounded-xl border border-red-100 shadow-sm">
              <p class="text-xs font-bold text-red-900 mb-1">Motivo de suspensión:</p>
              <p class="text-sm text-red-700 leading-snug font-medium">
                {{ props.expertData.suspensionReason || 'Incumplimiento de las políticas de la plataforma.' }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-8">
          <button v-if="props.expertData.isSuspended"
            class="px-5 py-4 bg-white text-emerald-600 border-2 border-emerald-100 rounded-2xl font-black hover:bg-emerald-50 hover:border-emerald-200 transition-all text-sm active:scale-95 shadow-sm flex items-center justify-center gap-2"
            @click="handleUnsuspend">
            <v-icon name="ri-shield-check-fill" scale="0.9" />
            <span>Reactivar</span>
          </button>

          <button v-else
            class="px-5 py-4 bg-white text-rose-500 border-2 border-rose-50 rounded-2xl font-black hover:bg-rose-50 hover:border-rose-100 transition-all text-sm active:scale-95 shadow-sm flex items-center justify-center gap-2"
            @click="toggleModal">
            <v-icon name="fa-user-slash" scale="0.8" />
            <span>Suspender</span>
          </button>

          <button
            class="px-5 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 hover:shadow-blue-200 transition-all shadow-xl shadow-blue-100 text-sm active:scale-95 flex items-center justify-center gap-2"
            @click="goToProfile">
            <span>Ver Perfil</span>
            <v-icon name="fa-chevron-right" scale="0.7" />
          </button>
        </div>
      </div>

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