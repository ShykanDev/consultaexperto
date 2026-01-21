<template>
  <div class="web-page min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full text-center space-y-8 animate-fade-in">

      <!-- Icon Container -->
      <div
        class="mx-auto w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center shadow-inner ring-4 ring-blue-100 relative">
        <v-icon name="ri-shield-user-fill" scale="3" class="text-blue-600" />
        <div
          class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
          <v-icon name="ri-error-warning-line" scale="1.5" class="text-red-500" />
        </div>
      </div>

      <!-- Text Content -->
      <div class="space-y-4">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight font-manrope">Cuenta Suspendida</h1>
        <div class="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        <p class="text-lg text-gray-600 font-medium leading-relaxed font-poppins">
          Se ha detectado un incumplimiento de nuestras
          <span class="text-blue-600 font-bold">Políticas de Privacidad</span>
          y términos de servicio.
        </p>
        <p class="text-sm text-gray-400 font-manrope">
          Como medida de seguridad, el acceso a tu cuenta ha sido restringido indefinidamente.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <router-link to="/help"
          class="block w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all text-center">
          Contactar Soporte
        </router-link>

        <button @click="handleReturn"
          class="block w-full py-4 bg-transparent text-gray-500 font-semibold hover:text-blue-600 transition-all">
          Volver al inicio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';

const router = useRouter();

const handleReturn = async () => {
  await auth.signOut();
  router.replace('/login');
};
</script>

<style scoped>
.font-manrope {
  font-family: 'Manrope', sans-serif;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
