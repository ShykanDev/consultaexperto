<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header
      class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm border-none shadow-none">
      <nav class="web-toolbar h-16 flex items-center px-4 justify-between">
        <h1 class="web-title text-lg font-bold text-gray-900 text-blue-600 font-poppins">Mi Perfil</h1>
        <div class="web-buttons">
          <button
            class="web-btn inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50"
            @click="loadExpertData">
            <div
              class="w-6 h-6 flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 rounded-full flex items-center justify-center"
              :class="{ 'animate-spin': isLoading }">
              <v-icon name="md-refresh" />
            </div>
          </button>
        </div>
      </nav>
    </header>

    <main class="web-content overflow-y-auto bg-slate-50 pb-24">

      <!-- Loading State -->
      <div class="flex flex-col items-center justify-center py-20 gap-3" v-if="isLoading">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="text-gray-500 font-quicksand text-sm">Cargando perfil...</p>
      </div>

      <!-- Error State -->
      <div class="flex flex-col items-center justify-center py-20 gap-4 px-6" v-else-if="!expertData">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
          <v-icon name="md-erroroutline" scale="2" />
        </div>
        <p class="text-gray-600 font-poppins text-center">No se pudo cargar la información del perfil.</p>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md active:scale-95"
          @click="loadExpertData">Reintentar</button>
      </div>

      <!-- Content -->
      <div v-else class="flex flex-col pb-10">

        <!-- Header Profile Card -->
        <article
          class="relative bg-white pt-8 pb-6 px-4 rounded-b-[2.5rem] shadow-sm mb-6 flex flex-col items-center border-b border-gray-100">

          <!-- Avatar -->
          <div class="relative mb-4 w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-blue-600 shadow-xl">
            <img class="w-full h-full object-cover rounded-full bg-white"
              :src="expertData.profilePicture || expertData.imgUrl || 'https://via.placeholder.com/150'"
              alt="Profile" />
            <div class="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <!-- Name & Role -->
          <h1 class="text-2xl font-bold text-gray-800 font-poppins text-center mb-1">{{ expertData.fullName }}</h1>
          <span class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold font-quicksand">
            {{ expertData.specialty }}
          </span>
          <!-- <span class="text-xs text-gray-500 font-medium mt-2">Data: {{ expertStore().getExpertData ?? 'No data' }}</span> -->

          <!-- Stats Row -->
          <div class="flex items-center justify-center gap-8 mt-6 w-full max-w-xs">
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold text-gray-800 font-poppins">{{ expertData.experienceYears || 0 }}</span>
              <span class="text-xs text-gray-500 font-medium">Años Exp.</span>
            </div>
            <div class="w-[1px] h-8 bg-gray-200"></div>
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold text-gray-800 font-poppins">{{ expertData.completedSessions || 0 }}</span>
              <span class="text-xs text-gray-500 font-medium">Sesiones</span>
            </div>
            <div class="w-[1px] h-8 bg-gray-200"></div>
            <div class="flex flex-col items-center">
              <span class="text-lg font-bold text-gray-800 font-poppins flex items-center gap-1">
                {{ calcStarsValue(expertData.rating!).toFixed(1) }} <v-icon name="io-star" class="text-yellow-400"
                  scale="0.8" />
              </span>
              <span class="text-xs text-gray-500 font-medium">Rating</span>
            </div>
          </div>
        </article>

        <!-- General Info Section -->
        <section class="px-5 space-y-4">
          <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Información General</h3>

          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-4">
            <!-- Email -->
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <v-icon name="md-email-outlined" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Correo Electrónico</span>
                <span class="text-sm font-medium text-gray-800 mt-0.5 break-all">{{ expertData.email }}</span>
              </div>
            </div>

            <div class="h-[1px] w-full bg-gray-50"></div>

            <!-- Professional ID -->
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                <v-icon name="fa-id-card" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Cédula Profesional</span>
                <span class="text-sm font-medium text-gray-800 mt-0.5">{{ expertData.professionalId || 'No registrada'
                  }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Bio Section -->
        <section class="px-5 mt-6 space-y-4">
          <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Biografía</h3>
          <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
            <p class="text-sm text-gray-600 leading-relaxed font-quicksand">
              {{ expertData.bio || 'Sin biografía disponible.' }}
            </p>
          </div>
        </section>

        <!-- Account Status -->
        <section class="px-5 mt-6 space-y-4 mb-4">
          <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Estado de la cuenta</h3>
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-3">
            <div class="w-3 h-3 rounded-full"
              :class="{ 'bg-green-500': !expertData.isBanned && !expertData.isSuspended, 'bg-red-500': expertData.isBanned, 'bg-orange-500': expertData.isSuspended }">
            </div>
            <span class="text-sm font-medium text-gray-700">
              {{ expertData.isBanned ? 'Baneada' : (expertData.isSuspended ? 'Suspendida' : 'Activa y Verificada') }}
            </span>
          </div>
        </section>

        <div class="px-5 mt-4">
          <router-link to="/logout"
            class="flex items-center justify-center w-full bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 h-12 rounded-xl font-bold transition-all active:scale-95">
            Cerrar Sesión
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { authStore as useAuthStore } from '@/store/auth';
import { IExpert } from '@/interfaces/IExpert';
import { useRating } from '@/composables/stars';

const authStore = useAuthStore();
const db = getFirestore();

const expertData = ref<IExpert | null>(null);
const isLoading = ref(true);

const loadExpertData = async () => {
  const uid = authStore.getUserUid;
  if (!uid) {
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  try {
    const docRef = doc(db, 'experts', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      expertData.value = docSnap.data() as IExpert;
    } else {
      console.error("No expert document found!");
      expertData.value = null;
    }
  } catch (error) {
    console.error("Error loading expert data:", error);
    expertData.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadExpertData();
});

const { calcStarsValue } = useRating();
</script>

<style scoped>
/* Scoped styles */
</style>
