<template>
  <div class="ios-expert-card-container">
    <div class="ios-expert-card">
      <!-- Imagen de perfil o icono -->
      <div class="ios-expert-avatar">
        <img
          v-if="expertData?.imgUrl"
          :src="expertData.imgUrl"
          alt="Expert Profile"
          class="ios-expert-avatar-image"
        />
        <div v-else class="ios-expert-avatar-placeholder">
          <v-icon name="la-user-tie-solid" scale="2.2" class="ios-expert-avatar-icon" />
        </div>
      </div>

      <!-- Detalles del experto -->
      <div class="ios-expert-details">
        <div class=" flex items-center justify-around flex-col">
          <h2 class="!text-xl font-normal font-poppins text-blue-600">
            {{ expertData?.fullName || 'Experto' }}
          </h2>
          <span class="bg-blue-500 text-white px-2 py-1 rounded-full">
            {{ expertData?.specialty || 'Especialidad' }}
          </span>
          <div v-if="expertData?.rating">
            <article class="flex items-center my-2">
              <span class="text-slate-500 font-manrope font-semibold mr-1">
                {{ calcStarsValue(expertData.rating).toFixed(1) }}
              </span>
              <v-icon name="io-star" scale="1" class="text-yellow-500" />  
              <p class="text-slate-500 text-xs">({{ expertData.rating.count }} calificaciones) </p>

            </article>
          </div>
        </div>

        <p class="ios-expert-bio">
          {{ expertData?.bio || 'Sin descripción disponible' }}
        </p>

        <!-- Rating con estrellas -->
        <div class="w-full my-2">
          <span class="text-gray-500">Cédula: {{ expertData?.professionalId }}</span>
        </div>
      </div>

      <!-- Botón de acción -->
      <button @click="viewSchedule" class="ios-expert-button" data-cy="view-schedule-button">
        Ver disponibilidad
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IExpert } from '@/interfaces/IExpert';
import { useExpertUiStore } from '@/stores/expertUi';
import { FcRating } from 'oh-vue-icons/icons';
import { useRating } from '@/composables/stars';


const expertUiStore = useExpertUiStore();

const props = defineProps({
 expertData:Object as () => IExpert
});

// ion routing to expert schedule view
const router = useRouter();
const viewSchedule = async () => {
  try {
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

const emit = defineEmits(['closeCard']);
const closeCard = () => emit('closeCard');

//Calculate stars values
const {calcStarsValue} = useRating();


</script>

<style scoped>
/* Contenedor principal */
.ios-expert-card-container {
  width: 95%;
  margin: 1rem auto;
  padding: 0.5rem;
  @apply sm:w-auto;
}

/* Tarjeta con estilo iOS */
.ios-expert-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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