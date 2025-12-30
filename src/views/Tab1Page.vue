<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title slot="start" class="text-base font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 font-quicksand">
          Login
        </ion-title>
        <div slot="end" class="flex items-center">
          <span class="text-xs font-poppins" v-html="currentName" :key="currentName"></span>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="login">
      <LoginComponent />
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginComponent from '@/components/Login/LoginComponent.vue';
import { ref, onUnmounted } from 'vue';
import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';

import { auth as authFirebase } from '@/firebase';
import { authStore } from '@/store/auth';

console.log('Tab1Page.vue script is executing...');

const names = [
  '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
  '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
  '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
  '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-500">.com</span>',

  '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
  '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-300">.com</span>',

  '<span class="animate-fade-down animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-delay-200">especializada</span>' +
  '<span class="text-sky-500 animate-fade animate-delay-300">.com</span>'
];

let timeoutId: NodeJS.Timeout | null = null;
const currentName = ref<string>(names[0]);

const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
};

onIonViewDidEnter(() => {
  animateNames();
      const authStorePinia = authStore();
      logout()
     authStorePinia.resetAuth();
      
  
});

onIonViewDidLeave(() => {
  if (timeoutId) {
    clearInterval(timeoutId);
    timeoutId = null;
  }
});

onUnmounted(() => {
  if (timeoutId) {
    clearInterval(timeoutId);
  }
});

const auth = authFirebase;
const logout = async () => {
  await auth.signOut();
};


</script>

<style scoped>
/* Asegúrate de que las animaciones funcionen */
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade {
  animation-name: fade;
}

.animate-fade-down {
  animation-name: fade;
  transform: translateY(-10px);
}
ion-content.login {
  --background: #fafafa !important;
}
</style>
