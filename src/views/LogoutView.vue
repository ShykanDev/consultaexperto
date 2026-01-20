<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="router.back()">
            <ion-icon :icon="chevronBackOutline" slot="start"></ion-icon>
            Atrás
          </ion-button>
        </ion-buttons>
        <ion-title class="font-bold">Mi Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <!-- Perfil Header -->
      <div class="flex flex-col items-center pt-8 pb-6">
        <div class="relative w-24 h-24 mb-3">
          <div class="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-[2px] shadow-md">
            <div class="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <span v-if="authStorePinia().getUserName" class="text-3xl font-bold text-gray-700">
                {{ authStorePinia().getUserName?.charAt(0).toUpperCase() }}
              </span>
              <ion-icon v-else :icon="personCircleOutline" class="text-6xl text-gray-300"></ion-icon>
            </div>
          </div>
        </div>
        <h2 class="text-xl font-bold text-gray-900">{{ authStorePinia().getUserName || 'Usuario' }}</h2>
        <p class="text-sm text-gray-500 font-medium">{{ authStorePinia().getUserEmail }}</p>
        <p>Data: {{ authStorePinia().getUserData?.isBanned }}</p>
      </div>

      <!-- Sección Seguridad -->
      <ion-list :inset="true" class="rounded-xl overflow-hidden shadow-sm">
        <ion-list-header>
          <ion-label class="text-sm font-semibold text-gray-500 uppercase tracking-wider pl-4 mb-1">Seguridad</ion-label>
        </ion-list-header>
        
        <ion-item lines="full">
          <ion-icon :icon="lockClosedOutline" slot="start" class="text-indigo-500"></ion-icon>
          <ion-input 
            v-model="email" 
            label="Recuperar contraseña" 
            label-placement="stacked"
            placeholder="ejemplo@correo.com"
            type="email"
            @ionInput="validateEmailInput"
            @ionBlur="markTouched"
            class="custom-input"
          ></ion-input>
        </ion-item>
        
        <div v-if="emailError && isTouched" class="px-5 pt-1 pb-2 text-xs text-red-500 animate-fade-in">
           {{ emailError }}
        </div>

        <div class="p-3 bg-white">
          <ion-button 
            expand="block" 
            color="primary"
            :disabled="!isValidForm || isLoading"
            @click="handlePasswordReset"
            class="h-12 font-semibold shadow-none"
            style="--border-radius: 10px;"
          >
            <span v-if="!isLoading">Enviar enlace de recuperación</span>
            <ion-spinner v-else name="crescent"></ion-spinner>
          </ion-button>
        </div>
      </ion-list>

      <!-- Sección Legal -->
      <ion-list :inset="true" class="mt-6 rounded-xl overflow-hidden shadow-sm">
        <ion-list-header>
          <ion-label class="text-sm font-semibold text-gray-500 uppercase tracking-wider pl-4 mb-1">Legal</ion-label>
        </ion-list-header>

        <ion-item button :detail="true" @click="openModal('privacy')">
          <ion-icon :icon="shieldCheckmarkOutline" slot="start" class="text-emerald-500"></ion-icon>
          <ion-label class="font-medium text-gray-700">Política de Privacidad</ion-label>
        </ion-item>
        
        <ion-item button :detail="true" lines="none" @click="openModal('terms')">
          <ion-icon :icon="documentTextOutline" slot="start" class="text-blue-500"></ion-icon>
          <ion-label class="font-medium text-gray-700">Términos y Condiciones</ion-label>
        </ion-item>
      </ion-list>

      <!-- Sección Cerrar Sesión -->
      <ion-list :inset="true" class="mt-6 mb-12 rounded-xl overflow-hidden shadow-sm">
        <ion-item button @click="handleLogout" lines="none" :detail="false">
          <ion-label color="danger" class="text-center font-semibold text-lg">Cerrar Sesión</ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal Informativo -->
      <ion-modal :is-open="isModalOpen" @didDismiss="closeModal" :initial-breakpoint="0.75" :breakpoints="[0, 0.75, 1]">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ modalTitle }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal" color="primary" class="font-bold">Listo</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="prose max-w-none px-2 pb-10 text-gray-600 leading-relaxed whitespace-pre-line">
            {{ modalContent }}
          </div>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonInput, IonItem, IonIcon, IonList, IonListHeader, 
  IonLabel, IonButtons, IonSpinner, IonModal
} from '@ionic/vue';
import { 
  chevronBackOutline, personCircleOutline, 
  lockClosedOutline, shieldCheckmarkOutline, documentTextOutline 
} from 'ionicons/icons';
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
    router.push('/tabs/tab1');
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
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>