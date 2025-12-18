<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted, onBeforeMount } from 'vue';

console.log('App.vue script is executing...');

onBeforeMount(() => {
  console.log('App.vue: onBeforeMount hook called');
});

onMounted(() => {
  console.log('App.vue: onMounted hook called - App is now mounted!');
});
</script>
