<template>
  <div id="app-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">

import { onMounted, onBeforeMount, watch } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { authStore } from './store/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
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
