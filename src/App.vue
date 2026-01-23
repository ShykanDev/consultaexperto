<template>
  <div id="app-container">
    <HeaderComponent v-if="showHeader" :pageTitle="currentPageTitle" />
    <router-view />
  </div>
</template>

<script setup lang="ts">

import { onMounted, onBeforeMount, watch, computed } from 'vue';
import { authStore } from './store/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import HeaderComponent from './components/Templates/HeaderComponent.vue';

import expertStore from '@/store/expert';

const router = useRouter();
const route = useRoute();
const expertStorePinia = expertStore();

const showHeader = computed(() => {
  const excludedRoutes = ['/login', '/register', '/account-suspended', '/logout'];
  return !excludedRoutes.includes(route.path);
});

const currentPageTitle = computed(() => {
  if (route.path === '/expert-info-fixed' && expertStorePinia.getExpertData?.fullName) {
    return `Perfil de ${expertStorePinia.getExpertData.fullName}`;
  }

  const titles: Record<string, string> = {
    '/home': 'Listado de Expertos',
    '/client-appointments': 'Mis citas',
    '/appointments': 'Agenda',
    '/help': 'Ayuda',
    '/expert-info-fixed': 'Detalles del Experto',
    '/account': 'Mi Cuenta',
    '/expert-appointments': 'Citas de Experto',
    '/expert-profile': 'Perfil de Experto',
    '/logout': 'Cerrar sesión'
  };
  return titles[route.path] || 'Expertos';
});
console.log('App.vue script is executing...');

onBeforeMount(() => {
  console.log('App.vue: onBeforeMount hook called');
});

onMounted(async () => {
  console.log('App.vue: onMounted hook called - App is now mounted!');
});

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is connected', user);
      // Determine collection based on stored role (Pinia persistence)
      const collection = authStore().getIsExpert ? 'experts' : 'users';
      authStore().setUserData(collection, user.uid);
    } else {
      authStore().unsuscribeListener();
      console.log('No user connected');
    }
  });
});

// Watch for changes in user data to redirect if banned/suspended
watch(() => authStore().getUserData, (userData) => {
  if (!userData) return;

  const isClient = authStore().getIsClient;
  const isExpert = authStore().getIsExpert;

  if (isClient && userData.isBanned) {
    console.log('Client is banned, redirecting...');
    authStore().setLogout();
    router.push('/account-suspended');
    return;
  }

  if (isExpert && userData.isSuspended) {
    console.log('Expert is suspended, redirecting...');
    authStore().setLogout();
    router.push('/account-suspended');
    return;
  }
}, { deep: true });

</script>

<style>
/* Global styles for the web-app */
body {
  margin: 0;
  padding: 0;
  font-family: var(--ion-font-family);
  background-color: #f3f4f6;
}
</style>
