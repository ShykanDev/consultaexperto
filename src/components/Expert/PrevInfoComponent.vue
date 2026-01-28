<template>
  <div :class="isBlocked || props.expertData?.isSuspended ? 'cursor-not-allowed grayscale' : 'cursor-pointer'"
    class="relative group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 p-6">

    <div v-if="isBlocked || props.expertData?.isSuspended"
      class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center p-4">
      <div
        class="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p class="text-slate-800 text-center font-medium text-sm animate-fade-up">
          Este experto no está disponible en este momento
        </p>
      </div>
    </div>

    <span v-if="isBlocked || props.expertData?.isSuspended"
      class="absolute top-4 right-4 z-20 text-[10px] uppercase tracking-widest font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
      No disponible
    </span>

    <div class="flex flex-col items-center">
      <div class="relative mb-5">
        <div
          class="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-inner flex items-center justify-center bg-slate-100">
          <img
            :src="expertData?.imgUrl || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99) + 1}.jpg`"
            alt="Expert Profile" class="w-full h-full object-cover" />
          <div v-if="!isBlocked && !props.expertData?.isSuspended"
            class="flex items-center justify-center w-full h-full" :class="isBlocked ? 'bg-slate-200' : 'bg-blue-50'">

            <v-icon v-if="isBlocked || props.expertData?.isSuspended" class="text-slate-400" name="fa-user-slash"
              scale="2" />
          </div>
        </div>
        <div v-if="!isBlocked"
          class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
      </div>

      <div class="text-center w-full">
        <h2 class="text-xl font-bold font-poppins tracking-tight mb-1"
          :class="{ 'text-slate-400': isBlocked || props.expertData?.isSuspended, 'text-slate-800': !isBlocked && !props.expertData?.isSuspended }">
          {{ expertData?.fullName || 'Experto' }}
        </h2>

        <div class="inline-block px-3 py-1 rounded-lg text-xs font-semibold tracking-wide mb-3"
          :class="{ 'bg-slate-100 text-slate-400': isBlocked || props.expertData?.isSuspended, 'bg-blue-50 text-blue-600': !isBlocked && !props.expertData?.isSuspended }">
          {{ expertData?.specialty || 'Especialidad' }}
        </div>

        <div v-if="expertData?.rating" class="flex items-center justify-center space-x-1 mb-4">
          <div class="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
            <v-icon class="text-yellow-500 mr-1" name="io-star" scale="0.8" />
            <span class="text-yellow-700 font-bold text-sm">
              {{ calcStarsValue(expertData.rating).toFixed(1) }}
            </span>
          </div>
          <span class="text-slate-400 text-[11px]">({{ expertData.rating.count }} reseñas)</span>
        </div>

        <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 px-2 mb-4 italic min-h-[40px]">
          "{{ expertData?.bio || 'Sin descripción disponible' }}"
        </p>

        <div class="border-t border-slate-50 pt-4 mb-5">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cédula Profesional</span>
          <p class="text-slate-600 text-xs font-mono">{{ expertData?.professionalId || 'N/A' }}</p>
        </div>

        <div class="mt-auto">
          <button v-if="!isBlocked && !props.expertData?.isSuspended" @click="viewSchedule(expertData?.userUid)"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] active:scale-95"
            data-cy="view-schedule-button">
            Ver Disponibilidad
          </button>

          <button v-if="props.expertData?.isSuspended"
            class="w-full py-3 px-4 bg-slate-100 text-slate-400 rounded-xl font-semibold text-sm cursor-not-allowed"
            disabled>
            Temporalmente fuera
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IExpert } from '@/interfaces/IExpert';

import { useExpertUiStore } from '@/stores/expertUi';
import { useRating } from '@/composables/stars';
import { authStore } from '@/store/auth';
import { onMounted, ref } from 'vue';



const expertUiStore = useExpertUiStore();

const props = defineProps({
  expertData: Object as () => IExpert
});

// ion routing to expert schedule view
const router = useRouter();
const viewSchedule = async (expertUid?: string) => {
  try {
    if (verifyBlockedExpert(expertUid)) {
      alert('No puedes agendar citas con este experto');
      return;
    }
    if (!props.expertData?.userUid) {
      console.error('No expert UID provided');
      return;
    }
    expertUiStore.resetExpertUid();
    expertUiStore.setExpertUid(props.expertData.userUid);
    router.push('/expert-info-fixed');
    closeCard();
  } catch (error) {
    console.error('Navigation error:', error);
  }
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

const isBlocked = ref(false);
onMounted(() => {
  isBlocked.value = verifyBlockedExpert(props.expertData?.userUid);
})

const emit = defineEmits(['closeCard']);
const closeCard = () => emit('closeCard');

//Calculate stars values
const { calcStarsValue } = useRating();


</script>

<style scoped>
/* Contenedor principal */
.ios-expert-card-container {
  width: 100%;
  padding: 0.5rem;
}

/* Tarjeta con estilo iOS */
.ios-expert-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.ios-expert-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -2px rgba(0, 0, 0, 0.03);
}

/* Avatar redondo */
.ios-expert-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  overflow: hidden;
  border: 2px solid rgba(0, 123, 255, 0.1);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-expert-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ios-expert-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007aff;
}

.ios-expert-avatar-icon {
  opacity: 0.8;
}

/* Detalles del experto */
.ios-expert-details {
  text-align: center;
  padding: 0 1rem;
}

.ios-expert-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.ios-expert-name {
  font-size: 1.375rem;
  font-weight: 600;
  color: #000;
  @apply font-sfpro-bold;
}

.ios-expert-specialty-badge {
  background: #007aff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.ios-expert-bio {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.4;
  margin-bottom: 1rem;
  @apply font-sfpro-regular;
}

/* Rating */
.ios-expert-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.ios-expert-stars {
  display: flex;
  gap: 0.125rem;
}

.ios-expert-star {
  width: 1.25rem;
  height: 1.25rem;
  color: #e5e5e5;
}

.ios-expert-star-filled {
  color: #ffc107;
}

.ios-expert-rating-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3c4858;
}

/* Botón estilo iOS */
.ios-expert-button {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: 0 auto;
  display: block;
}

.ios-expert-button:hover {
  background: #0062cc;
}

.ios-expert-button:active {
  background: #0052a3;
  transform: scale(0.98);
}

/* Tipografía SF Pro (simulada) */
@font-face {
  font-family: 'SF Pro';
  src: local('San Francisco'), local('SFPro-Regular'), sans-serif;
}

.font-sfpro-regular {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
}

.font-sfpro-bold {
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
}
</style>