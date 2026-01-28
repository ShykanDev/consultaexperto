<template>
  <div class="web-page min-h-screen bg-gray-50">
    <HeaderComponent pageTitle="Iniciar sesión" />
    <main class="web-content overflow-y-auto login ">
      <LoginComponent />
    </main>
  </div>
</template>

<script setup lang="ts">
import LoginComponent from '@/components/Login/LoginComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { auth as authFirebase } from '@/firebase';
import { authStore } from '@/store/auth';
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';

console.log('Tab1Page.vue script is executing...');

onMounted(() => {
  //animateNames();
  const authStorePinia = authStore();
  logout();
  authStorePinia.resetAuth();
});

/*onUnmounted(() => {
  if (timeoutId) {
    clearInterval(timeoutId);
    timeoutId = null;
  }
});*/

const auth = authFirebase;
const logout = async () => {
  await auth.signOut();
};
</script>

<style scoped>
@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade {
  animation-name: fade;
}

.animate-fade-down {
  animation-name: fade;
  transform: translateY(-10px);
}

.login {
  background-color: #fafafa !important;
}
</style>
