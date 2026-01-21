<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav class="web-toolbar h-16 flex items-center px-4">
        <div class="web-buttons">
          <button class="web-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            @click="router.back()">
            <v-icon name="md-arrowbackiosnew-round" />
          </button>
        </div>
        <h1 class="web-title ml-4 text-lg font-bold text-gray-900">Mi Cuenta</h1>
      </nav>
    </header>

    <main class="web-content overflow-y-auto p-4 space-y-8">
      <!-- Perfil Header -->
      <div class="flex flex-col items-center py-8">
        <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 shadow-md mb-4">
          <div class="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <span class="text-3xl font-bold text-gray-700" v-if="authStore.getUserName">
              {{ authStore.getUserName.charAt(0).toUpperCase() }}
            </span>
            <v-icon v-else name="hi-user-circle" scale="3" class="text-gray-300" />
          </div>
        </div>
        <h2 class="text-xl font-bold text-gray-900">{{ authStore.getUserName || 'Usuario' }}</h2>
        <p class="text-sm text-gray-500 font-medium">{{ authStore.getUserEmail }}</p>
      </div>

      <!-- Sección Seguridad -->
      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Seguridad</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <v-icon name="md-lockreset" class="text-indigo-500" scale="1.2" />
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Recuperar contraseña</label>
              <input
                class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                v-model="email" placeholder="ejemplo@correo.com" type="email" @blur="markTouched">
              <p class="mt-1 text-xs text-red-500" v-if="emailError && isTouched">{{ emailError }}</p>
            </div>
          </div>
          <button
            class="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all hover:bg-blue-700"
            :disabled="!isValidForm || isLoading" @click="handlePasswordReset">
            <span v-if="!isLoading">Enviar enlace de recuperación</span>
            <div v-else class="flex justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          </button>
        </div>
      </section>

      <!-- Sección Legal -->
      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        <div class="px-6 py-4">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Legal</h3>
        </div>
        <button @click="openModal('privacy')"
          class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <v-icon name="hi-shield-check" class="text-emerald-500" />
            <span class="font-medium text-gray-700">Política de Privacidad</span>
          </div>
          <v-icon name="fa-chevron-right" scale="0.8" class="text-gray-300" />
        </button>
        <button @click="openModal('terms')"
          class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <v-icon name="hi-document-text" class="text-blue-500" />
            <span class="font-medium text-gray-700">Términos y Condiciones</span>
          </div>
          <v-icon name="fa-chevron-right" scale="0.8" class="text-gray-300" />
        </button>
      </section>

      <!-- Sección Cerrar Sesión -->
      <button @click="handleLogout"
        class="w-full py-4 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center gap-3 text-rose-500 hover:bg-rose-50 transition-colors">
        <v-icon name="md-logout" />
        <span class="font-bold">Cerrar Sesión</span>
      </button>

      <!-- Modal Informativo -->
      <div v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <header class="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900">{{ modalTitle }}</h2>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <v-icon name="md-close" />
            </button>
          </header>
          <div class="flex-1 overflow-y-auto p-6 text-gray-600 leading-relaxed whitespace-pre-line">
            {{ modalContent }}
          </div>
          <footer class="p-6 border-t border-gray-100">
            <button @click="closeModal"
              class="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Listo
            </button>
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import {
//   chevronBackOutline, personCircleOutline,
//   lockClosedOutline, shieldCheckmarkOutline, documentTextOutline
// } from 'ionicons/icons';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';
import { useRouter } from 'vue-router';
import { authStore as authStorePinia } from '@/store/auth';

const router = useRouter();
const authStore = authStorePinia();
const auth = authFirebase;

// State
const email = ref('');
const isLoading = ref(false);
const isTouched = ref(false);
const emailError = ref('');
const isModalOpen = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

// Validation logic
const isValidEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmailInput = () => {
  if (!email.value) {
    emailError.value = 'El correo es obligatorio';
  } else if (!isValidEmailRegex.test(email.value)) {
    emailError.value = 'Ingresa un correo válido';
  } else {
    emailError.value = '';
  }
};

const markTouched = () => {
  isTouched.value = true;
  validateEmailInput();
};

const isValidForm = computed(() => {
  return email.value && !emailError.value && isValidEmailRegex.test(email.value);
});

// Actions
const handleLogout = async () => {
  try {
    await signOut(auth);
    authStore.setLogout();
    window.location.reload();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const handlePasswordReset = async () => {
  if (!isValidForm.value) {
    isTouched.value = true;
    validateEmailInput();
    return;
  }

  try {
    isLoading.value = true;
    await sendPasswordResetEmail(auth, email.value);
    // Usar alerta nativa o toast sería mejor, pero por simplicidad:
    alert('Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.');
    email.value = '';
    isTouched.value = false;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    alert('Error enviando el correo. Verifica que la cuenta exista.');
  } finally {
    isLoading.value = false;
  }
};

// Legal Content Management
const openModal = (type: 'privacy' | 'terms') => {
  if (type === 'privacy') {
    modalTitle.value = 'Política de Privacidad';
    modalContent.value = `
      **1. Recopilación de Información**
      Recopilamos información personal que usted nos proporciona voluntariamente...
      
      **2. Uso de la Información**
      Usamos su información para proporcionar y mejorar nuestros servicios...
      
      **3. Seguridad**
      Implementamos medidas de seguridad para proteger sus datos...
      
      (Este es un texto de ejemplo. Aquí iría la política real de la empresa.)
    `;
  } else {
    modalTitle.value = 'Términos y Condiciones';
    modalContent.value = `
      **1. Aceptación de los Términos**
      Al descargar o utilizar la aplicación, estos términos se aplicarán automáticamente...
      
      **2. Uso de la Aplicación**
      Usted se compromete a utilizar la aplicación solo para fines legales...
      
      **3. Limitación de Responsabilidad**
      No seremos responsables de daños directos o indirectos...
      
      (Este es un texto de ejemplo. Aquí irían los términos reales de la empresa.)
    `;
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
ion-list {
  background: transparent;
  padding-top: 0;
  padding-bottom: 0;
}

ion-item {
  --background: #ffffff;
}

/* iOS Style Animation for Error */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>