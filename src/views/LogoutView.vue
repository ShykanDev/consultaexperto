<template>
  <div class="web-page min-h-screen bg-gray-50">

    <header-component :page-title="'Mi Cuenta'" />

    <section class="min-h-screen w-full bg-[#f8fafc] text-slate-900 overflow-y-auto px-6 md:px-12 py-12 mt-24">
      <div class="max-w-6xl mx-auto space-y-12">

        <header class="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-slate-200">
          <div class="relative group">
            <div
              class="w-32 h-32 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
              <span v-if="authStore.getUserName" class="text-5xl font-light text-blue-600">
                {{ authStore.getUserName.charAt(0).toUpperCase() }}
              </span>
              <v-icon v-else name="hi-user-circle" scale="4" class="text-slate-200" />
            </div>
          </div>

          <div class="text-center md:text-left flex-1">
            <h1 class="text-3xl font-semibold tracking-tight text-slate-900">
              {{ authStore.getUserName || 'Usuario' }}
            </h1>
            <p class="text-slate-500 font-normal mt-1 italic">
              {{ authStore.getUserEmail }}
            </p>
          </div>

          <button @click="handleLogout"
            class="md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm font-medium border border-transparent hover:border-rose-100">
            <v-icon name="md-logout" scale="0.9" />
            Cerrar sesión
          </button>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div class="lg:col-span-7 space-y-8">
            <div>
              <h3 class="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
                Seguridad y Acceso
              </h3>

              <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div class="max-w-md space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-slate-600 mb-2">Restablecer contraseña</label>
                    <p class="text-xs text-slate-400 mb-4">Enviaremos un enlace de verificación a tu dirección de correo
                      electrónico institucional.</p>

                    <input v-model="email" type="email" placeholder="correo@ejemplo.com" @blur="markTouched"
                      class="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300" />
                    <p v-if="emailError && isTouched" class="mt-2 text-xs text-rose-500">{{ emailError }}</p>
                  </div>

                  <button @click="handlePasswordReset" :disabled="!isValidForm || isLoading"
                    class="inline-flex items-center justify-center px-8 h-11 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all disabled:bg-slate-200 shadow-sm">
                    <span v-if="!isLoading">Actualizar credenciales</span>
                    <div v-else class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent">
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-8">
            <h3 class="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
              Información Legal
            </h3>

            <div
              class="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              <button @click="navigateTo('privacy')"
                class="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition group">
                <div class="flex items-center gap-4">
                  <div
                    class="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <v-icon name="hi-shield-check" scale="1.1" />
                  </div>
                  <span class="font-medium text-slate-700">Política de Privacidad</span>
                </div>
                <v-icon name="fa-chevron-right" scale="0.7" class="text-slate-300" />
              </button>

              <button @click="navigateTo('terms')"
                class="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition group">
                <div class="flex items-center gap-4">
                  <div
                    class="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <v-icon name="hi-document-text" scale="1.1" />
                  </div>
                  <span class="font-medium text-slate-700">Términos del Servicio</span>
                </div>
                <v-icon name="fa-chevron-right" scale="0.7" class="text-slate-300" />
              </button>
            </div>

            <button @click="handleLogout"
              class="md:hidden w-full h-12 rounded-xl border border-rose-100 text-rose-500 font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2">
              <v-icon name="md-logout" />
              Cerrar sesión
            </button>
          </div>
        </div>

        <div v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md px-4">
          <div
            class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            <header class="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h2 class="text-lg font-semibold text-slate-800">{{ modalTitle }}</h2>
              <button @click="closeModal" class="p-2 rounded-full text-slate-400 hover:bg-slate-200/50 transition">
                <v-icon name="md-close" />
              </button>
            </header>

            <div class="flex-1 overflow-y-auto px-8 py-10 text-slate-500 text-sm leading-relaxed tracking-wide">
              {{ modalContent }}
            </div>

            <footer class="px-8 py-6 border-t border-slate-100 flex justify-end bg-slate-50/50">
              <button @click="closeModal"
                class="px-8 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition shadow-lg">
                Entendido
              </button>
            </footer>
          </div>
        </div>
      </div>
    </section>

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
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';

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
    email.value = '';
    isTouched.value = false;
    isModalOpen.value = true;
    modalTitle.value = 'Restablecimiento de contraseña';
    modalContent.value = 'Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.';
  } catch (error) {
    console.error('Error al enviar correo:', error);
    isModalOpen.value = true;
    modalTitle.value = 'Error al restablecer contraseña';
    modalContent.value = 'Error enviando el correo. Verifica que la cuenta exista.';
  } finally {
    isLoading.value = false;
  }
};

// Legal Content Management
const navigateTo = (type: 'privacy' | 'terms') => {
  if (type === 'privacy') {
    router.push('/privacy-policy');
  } else {
    router.push('/terms');
  }
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